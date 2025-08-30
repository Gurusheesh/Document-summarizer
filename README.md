📄 Document Summary Assistant

Live Demo: [document-summarizer-ten.vercel.app](https://document-summarizer-ten.vercel.app/)

A modern, responsive web application that generates intelligent summaries from PDF and image documents using AI.
![App Screenshot]()

---

✨ Core Features

 📄 Document Upload
- Drag & Drop Interface - Intuitive file upload with visual feedback
- File Type Support - PDF documents and image files (PNG, JPEG, JPG)
- **File Validation** - Real-time validation with user-friendly error messages

### 🔍 Text Extraction
- **PDF Processing** - Advanced text extraction using PDF.js library
- **OCR Technology** - Image-to-text conversion using Tesseract.js for scanned documents
- **Multi-page Support** - Handles complex PDF documents with multiple pages

### 🤖 AI-Powered Summarization
- **Smart Summaries** - Powered by Cohere AI API for intelligent content analysis
- **Customizable Length** - Three options: Short, Medium, and Long summaries
- **Bullet Format** - Clean, structured output for easy reading
- **Copy Functionality** - One-click summary copying to clipboard

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Loading States** - Real-time progress feedback during processing
- **Error Handling** - Comprehensive error management with helpful messages
- **Clean UI** - Modern, professional interface with smooth animations
---

## How It Works

1. **Upload** - Drag and drop or select a PDF/image file
2. **Choose Length** - Select your preferred summary length (short/medium/long)
3. **Process** - The app extracts text and generates an AI summary
4. **Review** - Copy or use the generated bullet-point summary

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Libraries:**
    * **PDF.js:** For client-side PDF text extraction[cite: 65].
    * [cite_start]**Tesseract.js:** For client-side Optical Character Recognition (OCR)[cite: 66].
* **Services:**
    * [cite_start]**Cohere API:** For AI-powered summary generation[cite: 83].
* **Deployment:**
    * [cite_start]Hosted on a reliable, scalable service like Netlify or Vercel[cite: 75].

---


## Technical Approach (200 words)

**Problem-Solving Strategy**: Built a client-side solution to minimize complexity while maximizing functionality. Used established libraries (PDF.js, Tesseract.js) for reliable text extraction and integrated AI services for intelligent summarization.

**Architecture**: Single-page application with progressive enhancement - starts with basic upload, adds processing capabilities, and culminates in AI-powered analysis. The two-step interface guides users through the process while maintaining simplicity.

**UX Focus**: Prioritized user feedback with loading states, error handling, and responsive design to ensure accessibility across devices. The drag-and-drop interface provides immediate visual feedback, while the clean typography hierarchy makes the interface scannable.

**Technical Decisions**: Chose vanilla JavaScript over frameworks to keep the bundle size minimal and deployment simple. PDF.js handles complex document parsing, while Tesseract.js enables OCR for images. Cohere API provides reliable summarization with customizable parameters.

**Performance Considerations**: Implemented progressive loading states and error boundaries to handle large files gracefully. The application processes documents entirely client-side, ensuring user privacy and reducing server costs.

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Mobile browsers

## API Integration

The application uses **Cohere's Summarization API** to generate intelligent summaries. Key features:
- Automatic content analysis
- Extractiveness control
- Multiple length options
- Bullet-point formatting


## Performance Features

- **Client-side Processing** - No server uploads required, ensuring privacy
- **Progressive Loading** - Real-time feedback during text extraction and summarization
- **Error Recovery** - Graceful handling of unsupported files or processing errors
- **Responsive Design** - Optimized for all screen sizes and devices



---



---
Note on Security: For this demonstration, the API key is included in the client-side code for ease of deployment. In a production environment, this key would be secured on a backend server and accessed via a serverless function proxy to protect it.

### 🚀 How to Run Locally

1.  Clone this repository to your local machine.
2.  Ensure you have the "Live Server" extension installed in VS Code.
3.  Right-click on the `index.html` file and select "Open with Live Server".
