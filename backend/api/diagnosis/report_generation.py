from ollama import chat
import time

def generate_report(request):
    start_time_1 = time.time()
    response = chat(
        model="report_generator",
        messages=[{'role': 'user', 'content': request}]
    )
    end_time_1 = time.time()
    time_taken_1 = end_time_1 - start_time_1
    print(f"Time taken for report generation: {time_taken_1:.4f} seconds")
    
    start_time_2 = time.time()
    response2 = chat(
        model="html_generator",
        messages=[{'role': 'user', 'content': response['message']['content']}]
    )
    end_time_2 = time.time()
    time_taken_2 = end_time_2 - start_time_2
    print(f"Time taken for HTML generation: {time_taken_2:.4f} seconds")
    
    return response2['message']['content']