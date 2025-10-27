from flask import Flask, request, Response
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)  # Allow your website to connect to this backend

# Initialize Groq client (replace with your key if needed)
client = Groq(api_key="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")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    def generate():
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": user_message}
            ],
            temperature=1,
            max_completion_tokens=512,
            top_p=1,
            reasoning_effort="medium",
            stream=True
        )

        for chunk in completion:
            content = chunk.choices[0].delta.content
            if content:
                yield content

    return Response(generate(), mimetype="text/plain")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
