import os
from ..diagnosis.detection import YOLOInference

def startYolo():
    model_path = os.path.join('media', 'models', 'best.pt')
    yolo_model = YOLOInference(model_path)
    print("\n\nLoaded Yolo")
    return yolo_model