import ollama

def startCoder():
    modelfile = '''
                FROM qwen2.5-coder:3b

                SYSTEM Role: You are an HTML coder. Do not use CSS. Input: A dental diagnosis report to be displayed in a web page. Output: innherHtml code to be placed directly inside an existing <div> element. Output format: <div id='report'>**your code**</div>. Do not include any additional text, explanations, or context. Also text with the format **text** should be put between <strong> tags (do not include the ** **).

                PARAMETER temperature 0.3
                PARAMETER num_ctx 4096
            '''
    return ollama.create(model='html_generator', modelfile=modelfile)