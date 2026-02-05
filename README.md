# Smart OCR

![Smart OCR Logo](frontend/src/assets/TSM-Logo.png)

**Smart OCR** is a robust, AI-powered web application that transforms static PDF documents and images into editable Microsoft Word (`.docx`) files. It features a modern, responsive UI and leverages GPU acceleration for high-performance text extraction.

## 🚀 Key Features

*   **GPU-Accelerated OCR**: Utilizes NVIDIA CUDA cores via `EasyOCR` for fast and accurate text extraction.
*   **Format Preservation**: Converting scanned PDFs and Images directly into formatted Word documents.
*   **Text Preview**: View extracted text directly in the browser before downloading.
*   **Modern UI**: Built with React and Tailwind CSS, featuring a vibrant, glassmorphism-inspired design.
*   **Drag & Drop**: Intuitive file upload interface supporting PDF, JPG, PNG, and JPEG.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons
*   **Backend**: Python, FastAPI, EasyOCR (PyTorch), PyMuPDF, python-docx
*   **Infrastructure**: Docker, Docker Compose

## ⚡ Quick Start

### Prerequisites
*   Node.js (v18+)
*   Python (3.11 recommended for GPU support)
*   NVIDIA GPU (Optional, for acceleration)

### Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/surindergiri/smart-ocr.git
    cd smart-ocr
    ```

2.  **Start the Backend**
    ```bash
    cd backend
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    
    # Run server
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

3.  **Start the Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App**
    *   Frontend: `http://localhost:5173`
    *   Backend API: `http://localhost:8000`

## 📦 Deployment

For detailed deployment instructions (Docker, Render, Vercel), please verify the [DEPLOYMENT.md](DEPLOYMENT.md) file included in this repository.

## 📄 License

This project is licensed under the MIT License.
