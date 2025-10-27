async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  chatBox.innerHTML += `<div class="message user">${message}</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add bot message placeholder
  const botDiv = document.createElement("div");
  botDiv.className = "message bot";
  botDiv.textContent = "Thinking...";
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are a helpful assistant for a website." },
          { role: "user", content: message }
        ],
        temperature: 1,
        max_tokens: 256
      })
    });

    const data = await response.json();
    console.log(data);

    botDiv.textContent =
      data.choices?.[0]?.message?.content || "⚠️ No response received.";

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    botDiv.textContent = "❌ Error: " + error.message;
  }
}
