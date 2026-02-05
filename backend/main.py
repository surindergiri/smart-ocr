from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import shutil
import uuid
import logging
from dotenv import load_dotenv

# Import our services
from file_processing import process_file
from ocr_service import extract_text
from docx_generator import create_word_doc

# Load env
load_dotenv()

app = FastAPI(title="OCR Web App")

# Config
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
OUTPUT_DIR = os.getenv("OUTPUT_DIR", "outputs")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

# Setup Directories
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "OCR Backend is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Accepts a file (PDF or Image), performs OCR, and returns a download link ID.
    """
    job_id = str(uuid.uuid4())
    logger.info(f"Processing job {job_id} for file {file.filename}")
    
    try:
        # Read file contents
        contents = await file.read()
        
        # 1. Convert to Images
        logger.info("- Converting file to images...")
        images = process_file(contents, file.filename)
        logger.info(f"  - Generated {len(images)} images.")
        
        # 2. Perform OCR on each image
        extracted_pages = []
        for idx, img in enumerate(images):
            logger.info(f"  - OCR Processing page {idx+1}/{len(images)}...")
            text_lines = extract_text(img)
            extracted_pages.append(text_lines)
            
        # 3. Generate Word Doc
        output_filename = f"{job_id}.docx"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        logger.info(f"- Generating Docx at {output_path}...")
        create_word_doc(extracted_pages, output_path)
        
        return {
            "job_id": job_id,
            "filename": output_filename,
            "message": "OCR completed successfully",
            "page_count": len(images),
            "text": extracted_pages  # Returns list of lists (pages -> lines)
        }
        
    except Exception as e:
        logger.error(f"Error processing job {job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{job_id}")
async def download_file(job_id: str):
    filename = f"{job_id}.docx"
    file_path = os.path.join(OUTPUT_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(
        path=file_path, 
        filename="converted_text.docx",
        media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
