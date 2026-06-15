import { useState, useEffect, useRef } from "react";
import styles from "./ChatMessage.module.css";

const ChatMessage = ({ message, isLast }) => {
  const { role, content, timestamp, isFavorite, wordCount, id } = message;
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite || false);
  const [visible, setVisible] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    const stored = JSON.parse(localStorage.getItem("nayepankh_favorites") || "[]");
    if (!favorite) {
      localStorage.setItem("nayepankh_favorites", JSON.stringify([...stored, { id, content, timestamp }]));
    } else {
      localStorage.setItem("nayepankh_favorites", JSON.stringify(stored.filter((f) => f.id !== id)));
    }
  };

  const formatContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h3 key={i} className={styles.heading}>{line.replace("## ", "")}</h3>;
      if (line.startsWith("# ")) return <h2 key={i} className={styles.heading}>{line.replace("# ", "")}</h2>;
      if (line.startsWith("**") && line.endsWith("**")) {
        return <strong key={i} className={styles.bold}>{line.replace(/\*\*/g, "")}</strong>;
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <li key={i} className={styles.listItem}>
            {line.replace(/^[-•]\s/, "")}
          </li>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      // Handle inline bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      if (parts.length > 1) {
        return (
          <p key={i} className={styles.paragraph}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      return <p key={i} className={styles.paragraph}>{line}</p>;
    });
  };

  const time = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div
      ref={messageRef}
      className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.aiWrapper} ${visible ? styles.visible : ""}`}
      aria-label={`${isUser ? "Your message" : "AI response"}: ${content}`}
    >
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          🪶
        </div>
      )}

      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {!isUser && (
          <div className={styles.aiLabel}>
            <span className={styles.aiName}>NayePankh AI</span>
            <span className={styles.aiTag}>Assistant</span>
          </div>
        )}

        <div className={styles.content}>
          {isUser ? (
            <p>{content}</p>
          ) : (
            <ul className={styles.formattedContent}>{formatContent(content)}</ul>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.time}>{time}</span>
          {!isUser && (
            <span className={styles.wordCount}>{wordCount || content.split(" ").length} words</span>
          )}
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${favorite ? styles.favoriteActive : ""}`}
              onClick={toggleFavorite}
              title={favorite ? "Remove from favorites" : "Add to favorites"}
              aria-label={favorite ? "Remove from favorites" : "Save as favorite"}
            >
              {favorite ? "⭐" : "☆"}
            </button>
            {!isUser && (
              <button
                className={`${styles.actionBtn} ${speaking ? styles.speakingActive : ""}`}
                onClick={handleSpeak}
                title={speaking ? "Stop speaking" : "Read aloud"}
                aria-label={speaking ? "Stop reading aloud" : "Read message aloud"}
              >
                {speaking ? "🔇" : "🔊"}
              </button>
            )}
            <button
              className={`${styles.actionBtn} ${copied ? styles.copied : ""}`}
              onClick={handleCopy}
              title="Copy message"
              aria-label="Copy message to clipboard"
            >
              {copied ? "✓" : "📋"}
            </button>
          </div>
        </div>
      </div>

      {isUser && (
        <div className={styles.userAvatar} aria-hidden="true">
          👤
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
