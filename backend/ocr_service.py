import easyocr
import numpy as np
from PIL import Image

# Initialize reader once (global or singleton) to avoid reloading model
# Using English by default. gpu=True if CUDA is available.
reader = easyocr.Reader(['en'], gpu=True)

def extract_text(image: Image.Image) -> list[str]:
    """
    Takes a PIL Image, converts to numpy array, and extracts text lines using EasyOCR.
    """
    # Convert PIL Image to numpy array (EasyOCR expects numpy)
    img_np = np.array(image)
    
    # detail=0 returns just the text list
    # detail=1 returns (bbox, text, conf)
    results = reader.readtext(img_np, detail=0)
    
    return results
