# Re-Level 🎓✨

> **One-line pitch:** Instantly translate complex textbook passages into simple, easy-to-read language that matches your exact reading level.

---

## 🎯 The Problem & Who It's For

Modern textbooks and academic papers are filled with dense, academic jargon and walls of text. When students turn to standard translation tools, they get literal translations that fail to capture context, or they are forced to spend hours rereading the same paragraph. 

**Re-Level is built for:**
- **ESL Students:** Who need content delivered in simplified English that helps them learn naturally without losing the core context.
- **K-12 Students with Reading Gaps:** Who want to adjust any complex reading assignment down to a reading level they are comfortable with.
- **College Students & Self-Learners:** Who need to break down overwhelming walls of text into punchy, easy-to-digest explanations.

## 🛠 Tech Stack

Re-Level is built with modern, fast, and privacy-conscious web technologies:

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **LLM Integration:** Featherless AI (via OpenAI-compatible API) running `meta-llama/Meta-Llama-3-8B-Instruct`
- **OCR (Optical Character Recognition):** Tesseract.js (Runs 100% Client-side in Browser WebAssembly for speed and privacy)
- **Text-to-Speech (TTS):** Native Browser Web Speech API (Free, client-side, offline capable)
- **State & Storage:** React Context API + LocalStorage 

## 🚀 Setup Instructions

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/re-level.git
   cd re-level
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_FEATHERLESS_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173`

## ⚖️ Hackathon Scope: What's Built vs. What's Mocked

To adhere to the hackathon timeline and prioritize the core problem, we made deliberate decisions on what to fully engineer versus what to simulate.

### ✅ Fully Built (The Core Engine)
- **Image-to-Text Pipeline:** Fully functional client-side OCR using Tesseract.js.
- **LLM Re-leveling Engine:** Advanced zero-shot prompt engineering that accurately adjusts text to specific Grade levels (K-12) or ESL proficiencies while retaining factual accuracy.
- **Text-to-Speech:** Full Web Speech API integration with language-matching and playback controls.
- **Session History:** A robust, local-storage-backed history system that saves and restores previous translations.
- **Responsive & Accessible UI:** WCAG AA compliant contrast, ARIA labels, and a mobile-first responsive layout with dynamic loading skeletons.
- **Error Handling:** Complete React Error Boundaries and graceful API degradation.

### 🚧 Mocked / Simplified (For the Demo)
- **User Authentication:** The "Sign In" flow is bypassed. Clicking "Sign In" drops the user directly into the main application to remove friction for judges.
- **Backend Database:** Instead of setting up Supabase/Firebase, all user history and state is persisted via `localStorage`. This perfectly simulates the UX of a real database without the deployment overhead.
- **Analytics Dashboard:** The `/dashboard` route is currently a placeholder structure intended to demonstrate where future Teacher/Student analytics (e.g., average classroom reading level, assignment tracking) will live.

## 🔗 Live Demo
[View Live Demo](https://your-live-demo-link.vercel.app/) *(Placeholder)*

---

*Built with ❤️ for the Hackathon.*
