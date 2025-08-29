# 📄 Document Summary Assistant

Live Demo: [Your Live Application URL Will Go Here]

A modern, responsive web application that generates intelligent summaries from PDF and image documents using AI.
![App Screenshot]()

---

✨ Core Features

This application was built to meet all the requirements outlined in the project specification:

* [cite_start]**Intuitive Document Upload** [cite: 61][cite_start]: A clean user interface allows for easy uploading of PDF and image files (PNG, JPG)[cite: 62]. [cite_start]It supports both a file picker and a full drag-and-drop area for a seamless user experience[cite: 63].

* [cite_start]**Advanced Text Extraction**[cite: 64]:
    * [cite_start]**PDF Parsing**: Utilizes PDF.js to accurately extract text content from multi-page PDF documents[cite: 65].
    * [cite_start]**Optical Character Recognition (OCR)**: Integrates Tesseract.js to extract text from image-based documents, such as scans or photographs[cite: 66].

* [cite_start]**AI-Powered Summary Generation**[cite: 67]:
    * [cite_start]**Smart Summaries**: Leverages a powerful AI/ML service (the Cohere API) to generate high-quality, abstractive summaries that are context-aware and human-readable[cite: 68, 83].
    * [cite_start]**Customizable Length**: Provides options for short, medium, and long summaries to fit the user's needs[cite: 69].
    * [cite_start]**Key Point Highlighting**: The summary is presented as a clean, bulleted list to highlight the main ideas and ensure the output is scannable and captures essential information[cite: 70].

* [cite_start]**Excellent User Experience (UI/UX)**[cite: 72]:
    * [cite_start]The application features a simple, modern, and intuitive interface designed for ease of use[cite: 73].
    * [cite_start]It includes clear loading states during processing and provides user-friendly error handling for a robust experience[cite: 78, 79].
    * [cite_start]The design is fully mobile-responsive and functional across all devices[cite: 73].

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Libraries:**
    * [cite_start]**PDF.js:** For client-side PDF text extraction[cite: 65].
    * [cite_start]**Tesseract.js:** For client-side Optical Character Recognition (OCR)[cite: 66].
* **Services:**
    * [cite_start]**Cohere API:** For AI-powered summary generation[cite: 83].
* **Deployment:**
    * [cite_start]Hosted on a reliable, scalable service like Netlify or Vercel[cite: 75].

---

## 🧠 Technical Approach & Problem-Solving

[cite_start]This project demonstrates a thoughtful problem-solving approach.

The initial development began with a client-side extractive summarization algorithm built in pure JavaScript. This approach worked well for simple, single-column text documents. However, during testing with complex, multi-column layouts (like resumes), it became clear that the client-side text extraction and simple scoring logic could not reliably maintain the correct reading order, leading to poor summary quality.

Recognizing this limitation, I pivoted to a more robust, professional solution. The final version of the application uses a powerful combination of client-side extraction and a server-side AI model. The text is extracted locally using PDF.js or Tesseract.js and then sent to the Cohere API. This leverages a sophisticated AI to parse the (potentially messy) extracted text and generate a high-quality abstractive summary.

This decision reflects an understanding of trade-offs and the ability to choose the right tool for the job, resulting in a much more powerful and reliable application that successfully handles a wider variety of real-world documents.

---

### 🚀 How to Run Locally

1.  Clone this repository to your local machine.
2.  Ensure you have the "Live Server" extension installed in VS Code.
3.  Right-click on the `index.html` file and select "Open with Live Server".
