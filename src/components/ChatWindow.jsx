import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { predefinedQuestions } from "../data/predefinedQuestions";
import { sendMessage, resetChat } from "../services/geminiService";
import styles from "./ChatWindow.module.css";

const STORAGE_KEY = "nayepankh_chat_history";

const TypingIndicator = () => (
  <div className={styles.typingWrapper}>
    <div className={styles.typingAvatar}>🪶</div>
    <div className={styles.typingBubble}>
      <div className={styles.typingDots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className={styles.typingLabel}>NayePankh AI is thinking...</span>
    </div>
  </div>
);

const ErrorMessage = ({ error, onDismiss }) => {
  const errorMessages = {
    INVALID_API_KEY: {
      icon: "🔑",
      title: "Invalid API Key",
      message: "Your Groq API key is invalid or missing. Get a free key at console.groq.com and add it to your .env file as VITE_GROQ_API_KEY=gsk_...",
      color: "#f59e0b",
    },
    RATE_LIMIT: {
      icon: "⏱️",
      title: "Rate Limit Reached",
      message: "Too many requests. Please wait a moment before sending another message.",
      color: "#6366f1",
    },
    NETWORK_ERROR: {
      icon: "📡",
      title: "Connection Error",
      message: "Unable to connect. Please check your internet connection and try again.",
      color: "#ef4444",
    },
    EMPTY_PROMPT: {
      icon: "✏️",
      title: "Empty Message",
      message: "Please type a message before sending.",
      color: "#8b5cf6",
    },
  };

  const errorType = Object.keys(errorMessages).find((key) =>
    error.includes(key)
  );
  // Show raw error detail after the colon for debugging
  const rawDetail = error.includes(":") ? error.split(":").slice(1).join(":").trim() : "";
  const config = errorMessages[errorType] || {
    icon: "⚠️",
    title: "Something went wrong",
    message: error,
    color: "#ef4444",
  };
  // Override message with raw detail if available for INVALID_API_KEY
  if (errorType === "INVALID_API_KEY" && rawDetail) {
    config.message = rawDetail;
  }

  return (
    <div className={styles.errorBanner} style={{ "--error-color": config.color }}>
      <span className={styles.errorIcon}>{config.icon}</span>
      <div className={styles.errorContent}>
        <strong>{config.title}</strong>
        <p>{config.message}</p>
      </div>
      <button onClick={onDismiss} className={styles.errorClose} aria-label="Dismiss error">
        ✕
      </button>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      console.warn("Could not save chat history to localStorage");
    }
    if (messages.length > 0) setShowWelcome(false);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (userMessage, voiceOutputEnabled = false) => {
    if (isLoading) return;
    setError(null);
    setShowWelcome(false);

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyForAPI = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendMessage(userMessage, historyForAPI);

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: response,
        timestamp: new Date().toISOString(),
        wordCount: response.trim().split(/\s+/).length,
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (voiceOutputEnabled && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.9;
        utterance.lang = "en-IN";
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSend(question);
  };

  const clearHistory = () => {
    setMessages([]);
    resetChat();
    localStorage.removeItem(STORAGE_KEY);
    setShowWelcome(true);
    setError(null);
  };

  const exportAsPDF = async () => {
    if (messages.length === 0) return;
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor(99, 102, 241);
      doc.text("NayePankh AI Assistant - Chat Export", 20, 20);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Exported on ${new Date().toLocaleString()}`, 20, 30);

      let y = 45;
      doc.setFontSize(11);

      messages.forEach((msg) => {
        const isUser = msg.role === "user";
        const prefix = isUser ? "You:" : "NayePankh AI:";

        if (y + 20 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.setTextColor(isUser ? 99 : 16, isUser ? 102 : 185, isUser ? 241 : 129);
        doc.text(prefix, 20, y);
        doc.setTextColor(60, 60, 60);
        const contentLines = doc.splitTextToSize(msg.content, 165);
        doc.text(contentLines, 25, y + 7);
        y += contentLines.length * 7 + 12;
      });

      doc.save(`nayepankh-chat-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    }
  };

  return (
    <section id="chat" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleGradient}>AI Chat</span> Assistant
        </h2>
        <p className={styles.sectionSubtitle}>
          Ask anything about NayePankh Foundation — our AI is here to help 24/7
        </p>
      </div>

      <div className={styles.chatContainer} ref={chatContainerRef}>
        {error && (
          <ErrorMessage error={error} onDismiss={() => setError(null)} />
        )}

        <div className={styles.messagesArea}>
          {showWelcome || messages.length === 0 ? (
            <div className={styles.welcome}>
              <div className={styles.welcomeIcon}>🪶</div>
              <h3 className={styles.welcomeTitle}>Welcome to NayePankh AI!</h3>
              <p className={styles.welcomeText}>
                I'm your AI assistant for NayePankh Foundation. Ask me about volunteering,
                internships, social initiatives, donations, or anything else!
              </p>
              <div className={styles.suggestedGrid}>
                {predefinedQuestions.map((q) => (
                  <button
                    key={q.id}
                    className={styles.suggestedCard}
                    onClick={() => handleSuggestedQuestion(q.question)}
                    style={{ "--card-color": q.color }}
                    aria-label={`Ask: ${q.question}`}
                  >
                    <span className={styles.cardIcon}>{q.icon}</span>
                    <span className={styles.cardCategory}>{q.category}</span>
                    <span className={styles.cardQuestion}>{q.question}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className={styles.chatToolbar}>
                <span className={styles.chatCount}>
                  {messages.length} message{messages.length !== 1 ? "s" : ""}
                </span>
                <button className={styles.exportPdfBtn} onClick={exportAsPDF} title="Export chat as PDF">
                  📄 Export PDF
                </button>
                <button className={styles.clearBtn} onClick={clearHistory} title="Clear all messages">
                  🗑️ Clear
                </button>
              </div>

              {messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isLast={idx === messages.length - 1}
                />
              ))}

              {messages.length > 0 && messages.length % 5 === 0 && !isLoading && (
                <div className={styles.suggestedInline}>
                  <p className={styles.suggestedHint}>💡 Suggested follow-ups:</p>
                  <div className={styles.suggestedTags}>
                    {predefinedQuestions.slice(0, 3).map((q) => (
                      <button
                        key={q.id}
                        className={styles.tagBtn}
                        onClick={() => handleSuggestedQuestion(q.question)}
                      >
                        {q.icon} {q.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={false}
        />
      </div>
    </section>
  );
};

export default ChatWindow;
