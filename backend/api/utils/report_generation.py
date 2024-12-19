from ollama import chat

def generate_report(request):
    response = chat(
        model="report_generator",
        messages=[{'role': 'user', 'content': request}]
    )
    
    response2 = chat(
        model="html_generator",
        messages=[{'role': 'user', 'content': response['message']['content']}]
    )
    return response2['message']['content']