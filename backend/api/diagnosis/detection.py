import os
from ultralytics import YOLO

class YOLOInference:
    def __init__(self, model_path):
        self.model = YOLO(model_path, task='detect')
        print("Model loaded successfully!")

    def predict(self, image_path):
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image path '{image_path}' does not exist.")

        results = self.model.predict(image_path, conf=0.65)

        xywhn = results[0].boxes.xywhn

        bboxes = [
            {
                "id": index + 1, 
                "x": round(float(bbox[0]), 3),
                "y": round(float(bbox[1]), 3),  
                "w": round(float(bbox[2]), 3),
                "h": round(float(bbox[3]), 3),
            }
            for index, bbox in enumerate(xywhn)
        ]
        return bboxes
