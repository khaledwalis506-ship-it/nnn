import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { message } = req.body;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // keep it secret
  });

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "system", content: "You are a helpful website assistant." },
      { role: "user", content: message }
    ],
  });

  res.status(200).json({ reply: completion.choices[0].message.content });
}
