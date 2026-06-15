# 🪶 NayePankh AI Assistant

> **An intelligent AI-powered assistant for NayePankh Foundation — Empowering Lives, Creating New Wings.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Groq AI](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?logo=groq&logoColor=white)](https://console.groq.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e)](LICENSE)

---

## 📖 Overview

NayePankh AI Assistant is a production-ready, full-featured React + Vite web application that provides an intelligent conversational interface for NayePankh Foundation. Visitors can instantly learn about volunteering opportunities, internship programs, social initiatives, donation pathways, and more — powered by **Groq AI** running **LLaMA 3.3 70B** for lightning-fast, accurate responses.

**Live Demo:** [Deploy on Vercel →](#-deployment)

---

## ✨ Features

### 🤖 AI-Powered Chat
- **ChatGPT-style interface** — user messages on right, AI on left
- **Groq + LLaMA 3.3 70B** backend — fastest AI inference available
- **NayePankh system context** — AI always knows about the NGO's programs
- **Multi-turn conversations** — full chat history sent with every request
- **Typing indicator** with animated bouncing dots
- **Auto-scroll** to latest message
- **Enter to send**, Shift+Enter for new line

### 🎤 Voice Features
- **Speech-to-text** — microphone button using Web Speech API (`en-IN` locale)
- **Text-to-speech** — toggle voice output for AI responses
- Visual listening indicator with pulse animation

### 💾 Data & Export
- **Auto-save** conversations to `localStorage`
- **Restore** chat on page refresh
- **Clear history** button
- **Export as PDF** — formatted with jsPDF
- **Export as TXT** — plain text download

### ⭐ Message Actions
- **Favorite** ⭐ messages (saved to localStorage)
- **Copy** any message to clipboard
- **Read aloud** 🔊 individual AI responses
- **Word count** per AI message

### 🌓 Dark / Light Mode
- Dark theme by default (premium look)
- Clean light theme
- Preference **persisted** in localStorage

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop: sidebar + main split layout

### 🗂️ Sidebar Panels
- **FAQ** — accordion with 6 common questions answered
- **About** — NayePankh mission, vision, focus areas, social links
- **Contact** — direct links + volunteer & donate CTAs

### ♿ Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Visible focus states
- `aria-live` for dynamic content

### 🔒 Error Handling
- Invalid/missing API key detection
- Rate limit messaging
- Network error handling
- Empty prompt prevention

---

## 📸 Screenshots

| Section | Preview |
|---|---|
| Hero | Particle animation, gradient title, stats |
| Features | 8 glassmorphism cards |
| Chat | AI responses with copy/favorite/speak |
| Sidebar | FAQ, About, Contact tabs |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- A free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/Sanjeevikumar038/Nayepankh.git
cd Nayepankh
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key
```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` and paste your Groq API key:
```env
VITE_GROQ_API_KEY=gsk_your_actual_groq_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_GROQ_API_KEY` | Your Groq API Key (starts with `gsk_`) | ✅ Yes |

**Get a free Groq API key:**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign in with Google or GitHub
3. Click **API Keys → Create API Key**
4. Copy the key (shown only once!)

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

---

## 🏗️ Project Structure

```
Nayepankh/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky nav, theme toggle, TXT export
│   │   ├── Header.module.css
│   │   ├── ChatWindow.jsx      # Chat logic, PDF/TXT export, error handling
│   │   ├── ChatWindow.module.css
│   │   ├── ChatMessage.jsx     # Message bubble with copy/favorite/speak
│   │   ├── ChatMessage.module.css
│   │   ├── ChatInput.jsx       # Textarea, voice input, char count
│   │   ├── ChatInput.module.css
│   │   ├── Sidebar.jsx         # FAQ/About/Contact tabbed panel
│   │   ├── Sidebar.module.css
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   ├── data/
│   │   └── predefinedQuestions.js   # Questions, FAQs, system prompt
│   ├── services/
│   │   └── geminiService.js    # Groq API integration (fetch-based)
│   ├── styles/
│   │   └── app.css             # CSS variables, hero, animations
│   ├── App.jsx                 # Root: hero, features, layout
│   └── main.jsx
├── index.html                  # SEO meta tags, Open Graph
├── .env                        # API key (gitignored)
├── .env.example                # Template
├── vite.config.js
└── package.json
```

---

## 🚀 Deployment

### Vercel (Recommended — Free)
1. Push to GitHub ✅
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import `Nayepankh`
3. Add Environment Variable: `VITE_GROQ_API_KEY` = your key
4. Click **Deploy** ✅

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com) → **New site from Git**
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add env var: `VITE_GROQ_API_KEY` = your key
5. Deploy ✅

### Manual Build
```bash
npm run build
# Output in /dist — deploy to any static host
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 8 | Build Tool & Dev Server |
| Groq AI (LLaMA 3.3 70B) | AI Chat Backend |
| CSS Modules | Scoped Component Styling |
| Web Speech API | Voice Input/Output (browser-native) |
| jsPDF | PDF Chat Export |
| localStorage | Chat History & Settings Persistence |

---

## 🔮 Future Enhancements

- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Volunteer registration form integration
- [ ] Real-time events calendar
- [ ] Impact statistics dashboard
- [ ] Admin panel for FAQ management
- [ ] WhatsApp chat integration
- [ ] PWA support (offline mode)
- [ ] Analytics dashboard

---

## 👨‍💻 Developer

**Developed with ❤️ by Sanjeevikumar D**

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  Made with ❤️ for <strong>NayePankh Foundation</strong><br>
  🪶 <em>Empowering Lives, Creating New Wings</em>
</div>
