import os
from django.conf import settings
from .report_generation import generate_report
from django.apps import apps
from urllib.parse import urlparse
from .labeler import label
from .diagnoser import diagnose
from .summarizer import summarize
from .segmentation import segment
from .tooth_detector import detect_tooth

def makeMediaDir():
    masks_folder = os.path.join(settings.MEDIA_ROOT, 'masks')
    reports_folder = os.path.join(settings.MEDIA_ROOT, 'reports')
    os.makedirs(masks_folder, exist_ok=True)
    os.makedirs(reports_folder, exist_ok=True)
    return masks_folder, reports_folder

def process(image_path):
    print(f"Processing image at {image_path}")
    masks_folder, reports_folder = makeMediaDir()
    image_path = os.path.join(os.getcwd(), urlparse(image_path).path.lstrip('/'))
    mask_filename = os.path.basename(image_path).replace('.jpg', '.png')
    mask_image_path = os.path.join(masks_folder, mask_filename)
    report_filename = os.path.basename(image_path).replace('.jpg', '.txt')
    report_path = os.path.join(reports_folder, report_filename)
    
    bboxes = detect_tooth(image_path)
    if len(bboxes) == 0:
        mask_image_path = "na.png"
        report = "<h3><strong>No tooth detected.</strong></h3>"
        
    else:
        mask = segment(image_path)
        mask.save(mask_image_path, "PNG")
        
        bboxes = diagnose(bboxes, mask_image_path)
        label(image_path=image_path, bboxes=bboxes)

        try:
            summary = summarize(bboxes)
            report = generate_report(summary)
        except Exception as e:
            report = f"Error generating report: {e}"

    with open(report_path, 'w') as f:
        f.write(report)

    return mask_image_path, report_path
