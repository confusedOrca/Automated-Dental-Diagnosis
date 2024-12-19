from django.apps import AppConfig
import ollama

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    
    def ready(self):
        try:
            modelfile='''
                FROM llama3.2
                SYSTEM You are a report generator. Report should be readable. So use bold or italic text wherever necessary. Make sections, bullet points, numbered list and paragraphs wherever appropriate.
                '''
            self.report_generator = ollama.create(model='report_generator', modelfile=modelfile)
            
            
            modelfile2='''
                FROM llama3.2
                SYSTEM You are html only coder. Do not use CSS!. Any input you get turn it into inner HTML code.
                '''
            self.html_generator = ollama.create(model='html_generator', modelfile=modelfile2)
            
            
        except Exception as e:
            print(f"Error initializing Llama3.2 model: {e}")
    
