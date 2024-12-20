from django.apps import AppConfig
import os
import ollama
from .utils.detection import YOLOInference
import subprocess
import torch
from transformers import SegformerFeatureExtractor, SegformerForSemanticSegmentation


def startOllama():
    subprocess.Popen(["ollama", "serve"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print("\n\nOllama server started...")
    
def loadSegformerFeatureExtractor():
    feature_extractor = SegformerFeatureExtractor.from_pretrained("nvidia/segformer-b3-finetuned-ade-512-512")
    feature_extractor.do_reduce_labels = False
    feature_extractor.size = 256
    print("\n\nLoaded Segformer Feature Extractor")
    return feature_extractor

def loadSegformer():
    model = SegformerForSemanticSegmentation.from_pretrained(
                "nvidia/segformer-b3-finetuned-ade-512-512",
                return_dict=False,
                num_labels=6,
                id2label={0: 'background', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'},
                label2id={'background': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5},
                ignore_mismatched_sizes=True,
            )
    model.load_state_dict(torch.load("media/models/model.pt", map_location="cpu"))
    print("\n\nLoaded Segformer")
    return model
    
def loadYolo():
    model_path = os.path.join('media', 'models', 'best.pt')
    yolo_model = YOLOInference(model_path)
    print("\n\nLoaded Yolo")
    return yolo_model

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    
    def ready(self):
        try:
            startOllama()
            self.feature_extractor = loadSegformerFeatureExtractor()
            self.model = loadSegformer()
            self.model.eval()
            self.yolo_model = loadYolo()
                    
            modelfile = '''
                FROM llama3.2

                SYSTEM Role: You are a dentist who will write a report. Input: Data about diseases of a list of tooth. Output: A human-readable report. Report Template: Diagnosis: here list all tooth & describe the state of their diseases. Recommendations: here list all tooth & recommend actionable steps to combat their diseases. Instruction: to mark important or highlight text use the format: **text here...**

                PARAMETER temperature 0.5  
                PARAMETER num_ctx 4096
            '''
            self.report_generator = ollama.create(model='report_generator', modelfile=modelfile)
            
            print("\n\nReporter ready")
            
            modelfile2 = '''
                FROM qwen2.5-coder:3b

                SYSTEM Role: You are an HTML coder. Do not use CSS. Input: A dental diagnosis report to be displayed in a web page. Output: innherHtml code to be placed directly inside an existing <div> element. Output format: <div id='report'>**your code**</div>. Do not include any additional text, explanations, or context. Also text with the format **text** should be put between <strong> tags (do not include the ** **).

                PARAMETER temperature 0.3
                PARAMETER num_ctx 4096
            '''
            self.html_generator = ollama.create(model='html_generator', modelfile=modelfile2)
            
            print("\n\nCoder ready")
            
        except Exception as e:
            print(f"Error initializing models: {e}")
