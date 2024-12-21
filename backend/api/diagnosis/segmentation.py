import torch
import torch.nn as nn
import numpy as np
from PIL import Image
from django.apps import apps

color_map = {
    0: (0, 0, 0),
    1: (0, 100, 100),
    2: (0, 255, 0),
    3: (0, 0, 255),
    4: (100, 100, 100),
    5: (255, 0, 0)
}

def prediction_to_vis(prediction):
    vis_shape = prediction.shape + (3,)
    vis = np.zeros(vis_shape, dtype=np.uint8)
    for i, c in color_map.items():
        vis[prediction == i] = color_map[i]
    return Image.fromarray(vis)

def segment(image_path):
    feature_extractor = apps.get_app_config('api').feature_extractor
    model = apps.get_app_config('api').model
    
    image = Image.open(image_path).convert("RGB")
    encoded_inputs = feature_extractor(image, return_tensors="pt").to("cpu")

    with torch.no_grad():
        outputs = model(**encoded_inputs)

    logits = outputs[0]
    upsampled_logits = nn.functional.interpolate(
        logits,
        size=(512, 512),
        mode="bilinear",
        align_corners=False
    )

    predicted_mask = upsampled_logits.argmax(dim=1).cpu().numpy()
    visualized_mask = prediction_to_vis(predicted_mask[0])
    print("Image Segmented")
    return visualized_mask
