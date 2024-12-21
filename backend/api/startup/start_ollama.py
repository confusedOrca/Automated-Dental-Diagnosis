import subprocess

def startOllama():
    try:
        process = subprocess.Popen(
            ["ollama", "serve"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE
        )
        print("\n\nOllama server started...")
        
    except Exception as e:
        raise RuntimeError("Failed to start Ollama server.") from e
