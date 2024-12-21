import numpy as np
from PIL import Image
import string

color_map = {
    "background": (0, 0, 0),
    "tooth": (0, 100, 100),
    "non carious lesion": (0, 255, 0),
    "stain": (0, 0, 255),
    "calculus": (100, 100, 100),
    "cavity": (255, 0, 0)
}

def remove_unaffected(bboxes):
    
    filtered_bboxes = [
        bbox for bbox in bboxes 
        if not (
            bbox["stain"] == 0 and 
            bbox["calculus"] == 0 and 
            bbox["non carious lesion"] == 0 and 
            bbox["cavity"] == 0
        )
    ]
    
    for index, bbox in enumerate(filtered_bboxes):
        bbox["id"] = string.ascii_uppercase[index]
    
    return filtered_bboxes

def diagnose(bboxes, mask_path):
    mask_image = Image.open(mask_path)
    mask_image = mask_image.convert("RGB")  
    mask_array = np.array(mask_image)

    image_width = 512
    image_height = 512

    for bbox in bboxes:
        x_center = bbox['x'] * image_width
        y_center = bbox['y'] * image_height
        width = bbox['w'] * image_width
        height = bbox['h'] * image_height

        xmin = int(x_center - width / 2)
        ymin = int(y_center - height / 2)
        xmax = int(x_center + width / 2)
        ymax = int(y_center + height / 2)

        xmin = max(0, xmin)
        ymin = max(0, ymin)
        xmax = min(image_width, xmax)
        ymax = min(image_height, ymax)

        cropped_mask = mask_array[ymin:ymax, xmin:xmax]

        tooth_pixels = 0
        stain_pixels = 0
        calculus_pixels = 0
        non_carious_lesion_pixels = 0
        cavity_pixels = 0

        for row in cropped_mask:
            for pixel in row:
                if np.array_equal(pixel, color_map["tooth"]):
                    tooth_pixels += 1
                elif np.array_equal(pixel, color_map["stain"]):
                    stain_pixels += 1
                elif np.array_equal(pixel, color_map["calculus"]):
                    calculus_pixels += 1
                elif np.array_equal(pixel, color_map["non carious lesion"]):
                    non_carious_lesion_pixels += 1
                elif np.array_equal(pixel, color_map["cavity"]):
                    cavity_pixels += 1

        bbox.update({
            "tooth": tooth_pixels,
            "stain": stain_pixels,
            "calculus": calculus_pixels,
            "non carious lesion": non_carious_lesion_pixels,
            "cavity": cavity_pixels,
        })

    return remove_unaffected(bboxes)


