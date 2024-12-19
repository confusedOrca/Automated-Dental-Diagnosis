import os
import uuid
from PIL import Image
from django.conf import settings

def save_uploaded_image(image):
    image_folder = os.path.join(settings.MEDIA_ROOT, 'images')
    os.makedirs(image_folder, exist_ok=True)
    img = Image.open(image).resize((512, 512), Image.Resampling.LANCZOS).convert("RGB")

    file_path = os.path.join(image_folder, f"{uuid.uuid4()}.jpg")
    img.save(file_path, format="JPEG")

    return file_path
