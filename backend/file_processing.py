import fitz  # pymupdf
from PIL import Image
import os
import io

def convert_pdf_to_images(pdf_bytes: bytes):
    """
    Converts a PDF file (bytes) into a list of PIL Images.
    """
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    images = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        # 2.0 zoom factor for better quality OCR (approx 144 DPI)
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to PIL Image
        img_data = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_data))
        images.append(img)
        
    return images

def process_file(file_bytes: bytes, filename: str) -> list[Image.Image]:
    """
    Detects file type and converts to list of PIL Images.
    """
    if filename.lower().endswith('.pdf'):
        return convert_pdf_to_images(file_bytes)
    else:
        # Assume image
        return [Image.open(io.BytesIO(file_bytes))]
