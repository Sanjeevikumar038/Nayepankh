import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./styles/app.css";

const FEATURES = [
  {
    icon: "🤖",
    title: "Gemini-Powered AI",
    desc: "Powered by Google's Gemini AI, delivering intelligent, context-aware answers about NayePankh Foundation.",
    bg: "rgba(99, 102, 241, 0.1)",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    icon: "🎤",
    title: "Voice Interaction",
    desc: "Speak your questions with speech-to-text and listen to AI responses with built-in text-to-speech.",
    bg: "rgba(6, 182, 212, 0.1)",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
  {
    icon: "💾",
    title: "Chat History",
    desc: "Your conversations are automatically saved locally and restored when you return, never losing context.",
    bg: "rgba(16, 185, 129, 0.1)",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
  },
  {
    icon: "🌓",
    title: "Dark / Light Mode",
    desc: "Switch between elegant dark and clean light themes — your preference is saved for next time.",
    bg: "rgba(139, 92, 246, 0.1)",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    icon: "📄",
    title: "Export Chats",
    desc: "Download your conversations as a professional PDF or plain text file for future reference.",
    bg: "rgba(245, 158, 11, 0.1)",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    icon: "⭐",
    title: "Favorite Messages",
    desc: "Star important AI responses to save them as favorites and revisit them anytime.",
    bg: "rgba(250, 204, 21, 0.1)",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    desc: "Optimized for every device — mobile, tablet, and desktop — with a fluid, adaptive layout.",
    bg: "rgba(239, 68, 68, 0.1)",
    gradient: "linear-gradient(135deg, #ef4444, #f97316)",
  },
  {
    icon: "♿",
    title: "Accessible Design",
    desc: "Built with keyboard navigation, ARIA labels, focus states, and screen reader support.",
    bg: "rgba(16, 185, 129, 0.1)",
    gradient: "linear-gradient(135deg, #10b981, #6366f1)",
  },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${6 + Math.random() * 8}s`,
  delay: `${Math.random() * 5}s`,
  size: `${3 + Math.random() * 5}px`,
}));

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("nayepankh_theme") || "dark"
  );
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nayepankh_chat_history") || "[]");
    } catch {
      return [];
    }
  });
  const featuresRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nayepankh_theme", theme);
  }, [theme]);

  // Sync chat history from localStorage
  useEffect(() => {
    const syncHistory = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("nayepankh_chat_history") || "[]");
        setChatHistory(stored);
      } catch {
        setChatHistory([]);
      }
    };
    window.addEventListener("storage", syncHistory);
    const interval = setInterval(syncHistory, 1000);
    return () => {
      window.removeEventListener("storage", syncHistory);
      clearInterval(interval);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("nayepankh_chat_history");
  };

  return (
    <div className="app">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        chatHistory={chatHistory}
        clearHistory={clearHistory}
      />

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="hero">
        <div className="heroParticles">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                "--duration": p.duration,
                "--delay": p.delay,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>

        <div className="heroContent">
          <div className="heroBadge">
            <span className="heroBadgeDot"></span>
            Powered by Google Gemini AI
          </div>

          <h1 className="heroTitle">
            Meet{" "}
            <span className="heroTitleGradient">NayePankh AI</span>
            <br />
            Your Smart Assistant
          </h1>

          <p className="heroSubtitle">
            An intelligent AI assistant for NayePankh Foundation. Get instant answers
            about volunteering, internships, social initiatives, donations, and more — 24/7.
          </p>

          <div className="heroButtons">
            <a href="#chat" className="heroBtnPrimary">
              💬 Start Chatting
            </a>
            <a href="#features" className="heroBtnSecondary">
              ✨ Explore Features
            </a>
          </div>

          <div className="heroStats">
            <div className="heroStat">
              <div className="heroStatNum">24/7</div>
              <div className="heroStatLabel">Available</div>
            </div>
            <div className="heroStat">
              <div className="heroStatNum">100%</div>
              <div className="heroStatLabel">Free to Use</div>
            </div>
            <div className="heroStat">
              <div className="heroStatNum">AI</div>
              <div className="heroStatLabel">Powered</div>
            </div>
            <div className="heroStat">
              <div className="heroStatNum">∞</div>
              <div className="heroStatLabel">Questions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="features" ref={featuresRef}>
        <div className="featuresHeader reveal">
          <span className="sectionLabel">✨ What We Offer</span>
          <h2 className="sectionTitle">
            Packed with <span className="titleAccent">Powerful Features</span>
          </h2>
          <p className="sectionSubtitle">
            Everything you need for a seamless AI conversation experience
          </p>
        </div>

        <div className="featuresGrid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="featureCard reveal"
              style={{
                "--card-gradient": f.gradient,
                "--icon-bg": f.bg,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <div className="featureIcon">{f.icon}</div>
              <h3 className="featureTitle">{f.title}</h3>
              <p className="featureDesc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MAIN CHAT LAYOUT ===== */}
      <div className="mainLayout">
        <main>
          <ChatWindow />
        </main>
        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}

export default App;
