import { useState, useRef, useEffect } from "react";
import styles from "./ChatInput.module.css";

const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(
    localStorage.getItem("nayepankh_voice_output") === "true"
  );
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim(), voiceOutputEnabled);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Please use Chrome.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleVoiceOutput = () => {
    const newValue = !voiceOutputEnabled;
    setVoiceOutputEnabled(newValue);
    localStorage.setItem("nayepankh_voice_output", String(newValue));
  };

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className={styles.container}>
      <div className={styles.statsBar}>
        <span className={styles.stat}>
          {charCount}/2000 chars
        </span>
        <span className={styles.stat}>{wordCount} words</span>
        <button
          className={`${styles.voiceToggle} ${voiceOutputEnabled ? styles.voiceActive : ""}`}
          onClick={toggleVoiceOutput}
          title={voiceOutputEnabled ? "Disable voice output" : "Enable voice output"}
          aria-label={voiceOutputEnabled ? "Disable AI voice output" : "Enable AI voice output"}
        >
          {voiceOutputEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
        </button>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            id="chat-input"
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 2000))}
            onKeyDown={handleKeyDown}
            placeholder="Ask NayePankh AI anything... (Enter to send, Shift+Enter for new line)"
            rows={1}
            disabled={isLoading || disabled}
            aria-label="Chat message input"
            aria-multiline="true"
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.micBtn} ${isListening ? styles.listening : ""}`}
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop listening" : "Voice input"}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            disabled={isLoading}
            type="button"
          >
            {isListening ? (
              <span className={styles.micWave}>⏹</span>
            ) : (
              "🎤"
            )}
          </button>

          <button
            className={`${styles.sendBtn} ${!input.trim() || isLoading ? styles.sendDisabled : ""}`}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            type="button"
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isListening && (
        <div className={styles.listeningIndicator} aria-live="polite">
          <span className={styles.listeningDot}></span>
          <span className={styles.listeningDot}></span>
          <span className={styles.listeningDot}></span>
          <span>Listening... Speak now</span>
        </div>
      )}

      <p className={styles.hint}>
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

export default ChatInput;
