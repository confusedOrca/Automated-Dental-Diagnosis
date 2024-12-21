import ollama

def startDentist():
    modelfile = '''
                FROM llama3.2

                SYSTEM Role: You are a dentist who will write a report. Input: Data about diseases of a list of tooth. Output: A human-readable report. Report Template: Diagnosis: here list all tooth & describe the state of their diseases. Recommendations: here list all tooth & recommend actionable steps to combat their diseases. Instruction: to mark important or highlight text use the format: **text here...**

                PARAMETER temperature 0.5  
                PARAMETER num_ctx 4096
                '''
    return ollama.create(model='report_generator', modelfile=modelfile)