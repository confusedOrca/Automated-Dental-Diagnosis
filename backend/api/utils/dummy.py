import os
import time
import requests
from urllib.parse import urlparse
from django.conf import settings

def dummy_processing(image_path):
    print(f"Processing image at {image_path}")
    time.sleep(5)
    
    mask_url = "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
    
    report = """<h1>The Fascinating World of Siamese Cats</h1><br><p>Cats, one of the most beloved pets in the world, have been companions to humans for thousands of years. They are known for their independent nature, yet many cats enjoy the company of their human owners, forming strong bonds of affection. Domestic cats belong to the species <em>Felis catus</em>, and while they come in a variety of shapes, sizes, and colors, each cat exhibits unique behaviors that make them stand out. In fact, the domestic cat has been a subject of fascination for centuries, with people often admiring their graceful movements, playful antics, and mysterious ways.</p><br><p>One of the most popular cat breeds is the Siamese cat, a breed known for its striking appearance and vocal personality. Siamese cats are typically recognized for their slender bodies, large ears, and almond-shaped blue eyes. Their coat is short and sleek, often in a light cream or fawn color with darker points on the ears, face, paws, and tail. Their personalities are as striking as their appearance - Siamese cats are often described as talkative and highly social, seeking interaction with their human families.</p>"""

    masks_folder = os.path.join(settings.MEDIA_ROOT, 'masks')
    reports_folder = os.path.join(settings.MEDIA_ROOT, 'reports')
    os.makedirs(masks_folder, exist_ok=True)
    os.makedirs(reports_folder, exist_ok=True)

    mask_image = requests.get(mask_url)
    mask_filename = os.path.basename(image_path).replace('.jpg', '.png')
    mask_image_path = os.path.join(masks_folder, mask_filename)
    
    with open(mask_image_path, 'wb') as f:
        f.write(mask_image.content)

    report_filename = os.path.basename(image_path).replace('.jpg', '.txt')
    report_path = os.path.join(reports_folder, report_filename)
    
    with open(report_path, 'w') as f:
        f.write(report)

    return mask_image_path, report_path
