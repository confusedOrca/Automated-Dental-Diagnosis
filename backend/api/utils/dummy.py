import os
import requests
from django.conf import settings
from .report_generation import generate_report
from django.apps import apps
from urllib.parse import urlparse
from .labeler import label

def dummy_processing(image_path):
    print(f"Processing image at {image_path}")
    
    api_config = apps.get_app_config('api')
    yolo_model = api_config.yolo_model
    
    inf_path = os.path.join(os.getcwd(), urlparse(image_path).path.lstrip('/'))
    
    bboxes = yolo_model.predict(inf_path)
    label(image_path=inf_path, bboxes=bboxes)
    
    mask_url = "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
    question = "Siamese cat under 100 words."

    masks_folder = os.path.join(settings.MEDIA_ROOT, 'masks')
    reports_folder = os.path.join(settings.MEDIA_ROOT, 'reports')
    os.makedirs(masks_folder, exist_ok=True)
    os.makedirs(reports_folder, exist_ok=True)

    mask_image = requests.get(mask_url)
    mask_filename = os.path.basename(image_path).replace('.jpg', '.png')
    mask_image_path = os.path.join(masks_folder, mask_filename)
    
    with open(mask_image_path, 'wb') as f:
        f.write(mask_image.content)

    try:
        report = generate_report(question)
    except Exception as e:
        report = f"Error generating report: {e}"

    report_filename = os.path.basename(image_path).replace('.jpg', '.txt')
    report_path = os.path.join(reports_folder, report_filename)
    
    with open(report_path, 'w') as f:
        f.write(report)

    return mask_image_path, report_path
