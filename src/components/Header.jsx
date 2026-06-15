import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({ theme, toggleTheme, chatHistory, clearHistory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const exportAsText = () => {
    if (chatHistory.length === 0) return;
    const text = chatHistory
      .map(
        (msg) =>
          `[${msg.role === "user" ? "You" : "NayePankh AI"}] ${new Date(msg.timestamp).toLocaleString()}\n${msg.content}\n`
      )
      .join("\n---\n\n");
    const blob = new Blob([`NayePankh AI Assistant - Chat Export\n${"=".repeat(50)}\n\n${text}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nayepankh-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoWing}>🪶</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>NayePankh</span>
            <span className={styles.logoSub}>AI Assistant</span>
          </div>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <a href="#home" className={styles.navLink} onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" className={styles.navLink} onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#chat" className={styles.navLink} onClick={() => setMenuOpen(false)}>Chat</a>
          <a href="#faq" className={styles.navLink} onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#about" className={styles.navLink} onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <div className={styles.headerActions}>
          {chatHistory.length > 0 && (
            <>
              <button
                className={styles.actionBtn}
                onClick={exportAsText}
                title="Export chat as TXT"
                aria-label="Export chat as text file"
              >
                📥
              </button>
              <button
                className={`${styles.actionBtn} ${styles.clearBtn}`}
                onClick={clearHistory}
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                🗑️
              </button>
            </>
          )}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}></span>
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}></span>
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
