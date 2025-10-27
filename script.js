async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  chatBox.innerHTML += `<div class="message user">${userMessage}</div>`;
  input.value = "";

  // Scroll down
  chatBox.scrollTop = chatBox.scrollHeight;

  // Call Groq API
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: "You are a helpful chatbot assistant." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  // Show bot reply
  chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
