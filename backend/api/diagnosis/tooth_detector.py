from django.apps import apps

def detect_tooth(image_path):
    model = apps.get_app_config('api').yolo_model
    return model.predict(image_path)