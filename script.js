let selectedFile = null;
let selectedLength = 'medium';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;


const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');


const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const generateBtn = document.getElementById('generateBtn');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const lengthBtns = document.querySelectorAll('.length-btn');
const summarySection = document.getElementById('summarySection');
const summaryContent = document.getElementById('summaryContent');
const summaryLengthBadge = document.getElementById('summaryLengthBadge');
const copyBtn = document.getElementById('copyBtn');
const newDocBtnTop = document.getElementById('newDocBtnTop');


//   EVENT LISTENERS 
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
});
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
});

lengthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        lengthBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedLength = btn.dataset.length;
    });
});

generateBtn.addEventListener('click', async () => {
    if (!selectedFile) { showError('Please upload a document first.'); return; }
    
    loading.innerHTML = 'Analyzing document...'; 
    loading.style.display = 'block';
    generateBtn.style.display = 'none'; 
    summarySection.style.display = 'none';
    hideError();

    try {
        let extractedText = '';
        loading.innerHTML = 'Extracting text...';
        if (selectedFile.type === 'application/pdf') {
            extractedText = await extractTextFromPDF(selectedFile);
        } else if (selectedFile.type.startsWith('image/')) {
            extractedText = await extractTextFromImage(selectedFile);
        } else { throw new Error('Unsupported file type.'); }

        if (!extractedText || extractedText.trim().length < 50) {
            throw new Error('Could not extract enough readable text.');
        }

        loading.innerHTML = 'Generating summary...';
        const summary = await getSummaryFromAPI(extractedText, selectedLength);
        displaySummary(summary);

    } catch (error) {
        showError(error.message);
        console.error(error);
    } finally {
        loading.style.display = 'none';
        generateBtn.style.display = 'block';
        generateBtn.disabled = false;
    }
});

copyBtn.addEventListener('click', () => {
    const listItems = summaryContent.querySelectorAll('li');
    const textToCopy = Array.from(listItems).map(li => `• ${li.textContent}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = '📋 Copy Summary'; }, 2000);
    }).catch(err => showError('Failed to copy text.'));
});

newDocBtnTop.addEventListener('click', resetToStep1);

//  CORE FUNCTIONS

function handleFileSelect(file) {
    selectedFile = file;
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
        showError('Please upload a PDF or image file.'); return;
    }
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    generateBtn.disabled = false;
    hideError();
    
    step1.style.display = 'none';
    step2.style.display = 'block';
}

function resetToStep1() {
    selectedFile = null;
    fileInput.value = '';
    summarySection.style.display = 'none';
    hideError();
    
    step2.style.display = 'none';
    step1.style.display = 'block';
}

async function extractTextFromPDF(file) {
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
}

async function extractTextFromImage(file) {
    const worker = await Tesseract.createWorker('eng', 1, { logger: m => console.log(m) });
    const ret = await worker.recognize(file);
    await worker.terminate();
    return ret.data.text;
}

async function getSummaryFromAPI(text, length) {
    const API_KEY = "3QR5s5TCT16rYP68dRS16eCaib7NMMuzrfTJOtTl"; //replace with your actual API key
    const API_URL = "https://api.cohere.ai/v1/summarize";
    let apiLength;
    switch(length) {
        case 'short':   apiLength = 'short'; break;
        case 'long':    apiLength = 'long'; break;
        default:        apiLength = 'medium'; break;
    }
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ text, length: apiLength, format: 'bullets', extractiveness: 'medium' }),
    });
    if (!response.ok) { throw new Error(`API error: ${response.statusText}`); }
    const data = await response.json();
    return data.summary.split('\n').filter(point => point.trim().length > 0);
}

function displaySummary(bulletPoints) {
    summaryContent.innerHTML = '';
    const ul = document.createElement('ul');
    bulletPoints.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point.trim();
        ul.appendChild(li);
    });
    summaryContent.appendChild(ul);
    summaryLengthBadge.textContent = selectedLength;
    summarySection.style.display = 'block';
}


function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
}
function showError(message) { errorMessage.textContent = message; errorMessage.style.display = 'block'; }
function hideError() { errorMessage.style.display = 'none'; }

