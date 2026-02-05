FROM python:3.11-slim

# Install system dependencies required for cv2 (EasyOCR dependency)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directories
RUN mkdir -p uploads outputs

# Render provides the PORT environment variable
ENV PORT=8000
EXPOSE 8000

# Use shell form to allow variable expansion
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"
