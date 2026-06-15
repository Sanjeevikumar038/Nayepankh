import { systemPrompt } from "../data/predefinedQuestions";

const API_KEY = (import.meta.env.VITE_GROQ_API_KEY || "").trim();
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export const sendMessage = async (message, previousHistory = []) => {
  if (!message || !message.trim()) {
    throw new Error("EMPTY_PROMPT: Please enter a message before sending.");
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...previousHistory
      .filter((m) => m.role === "user" || m.role === "model")
      .map((m) => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.content,
      })),
    { role: "user", content: message.trim() },
  ];

  let response;
  try {
    response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
  } catch (err) {
    throw new Error("NETWORK_ERROR: Could not reach Groq. Check your internet connection.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg = data?.error?.message || data?.error?.code || `HTTP ${response.status}`;
    console.error("🔴 Groq error:", response.status, JSON.stringify(data));

    if (response.status === 401) {
      throw new Error(`INVALID_API_KEY: Groq says: "${errMsg}"`);
    } else if (response.status === 429) {
      throw new Error("RATE_LIMIT: Too many requests. Please wait a moment.");
    } else {
      throw new Error(`API_ERROR: ${response.status} — ${errMsg}`);
    }
  }

  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("API_ERROR: Empty response from Groq.");
  return text;
};

export const resetChat = () => {};

export const isApiKeyConfigured = () => API_KEY.length > 10;
