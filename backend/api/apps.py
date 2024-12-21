from django.apps import AppConfig
from .startup.start_ollama import startOllama
from .startup.start_segformer import startSegformer
from .startup.start_yolo import startYolo
from .startup.start_dentist import startDentist
from .startup.start_coder import startCoder

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    
    def ready(self):
        try:
            startOllama()
            self.feature_extractor, self.model = startSegformer()
            self.model.eval()
            self.yolo_model = startYolo()
            self.report_generator = startDentist() 
            print("\n\nReporter ready")
            self.html_generator = startCoder()
            print("\n\nCoder ready")
            
        except Exception as e:
            print(f"Error initializing models: {e}")
