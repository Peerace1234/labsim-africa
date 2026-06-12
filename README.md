# LabSim Africa MVP

**A hands-on digital logic and circuit design simulator for African students.**

Built with real IC part numbers, live oscilloscope visualization, and AI-powered tutoring using Claude. No AR/VR bloat—just solid engineering education that works.

---

## 🎯 What's In This MVP

Exactly what the plan specified—four working screens:

### 1. **Home** — The Entry Point
- **Live Animated Oscilloscope** — Real canvas-drawn dual-channel waveform with continuous sweep. Signals you'll recognize from actual test equipment
- **Lab Modules Grid** — Shows what's free (Digital Logic Gates), what's coming soon (Circuit Analysis, Microcontrollers), and what's locked (Embedded Systems)
- **Waitlist Form** — Captures email signups with a real-time counter showing community size (designed for social proof, starts at 1,247)

### 2. **Labs** — The Heart of Learning
A fully functional digital logic gate simulator with three tabs:

**Simulator Tab:**
- Toggle inputs A and B live
- Watch output update in real time
- Truth table highlights the current input state
- Real IC part numbers below each gate (74LS00 for NAND, 74LS08 for AND, 74LS32 for OR, 74LS86 for XOR)
- Lab notes provide practical context

**Lab Report Tab:**
- Auto-generated professional report with all standard sections:
  - Objective, Apparatus, Theory
  - Truth table results
  - Procedure, Conclusion
  - Specs (propagation delay, power consumption, noise margin)
- Print-ready formatting

**Progress Tab:**
- Module completion tracking toward certificate unlock
- Visual progress bars
- Certificate goal display

### 3. **AI Tutor (ZARA)** — Connected to Claude
- Quick-question buttons for common topics (NAND, XOR, Full Adder, 7-Segment)
- Pre-written fallback answers for instant responses (avoids latency on common queries)
- Custom question support that hits Claude API for anything else
- Chat interface with message history
- Typing indicator for better UX

Topics with built-in answers:
- **NAND Gate** — Part 74LS00, why it's universal
- **XOR Gate** — Part 74LS86, parity checking use case
- **Full Adder** — Binary arithmetic, carry propagation
- **7-Segment Display** — Common vs. common cathode logic

### 4. **Quiz** — EEE211 Exam Style
- 5 questions covering digital logic fundamentals
- Multiple choice with instant feedback
- Detailed explanations on every answer
- Real-time progress bar
- Scoring system with pass/fail threshold (80% = pass)
- Full answer review showing correct vs. selected answers
- Retake functionality

---

## 🎨 Design Philosophy

### The Deep-Space Navy + Phosphor-Green CRT Palette
This MVP *reads as an instrument*, not generic SaaS:

- **Ink black background** (#0A1628) — PCB substrate color, immediate signals "hardware"
- **Phosphor signal green** (#7DDFFF) — Primary signal, instantly recognizable from real oscilloscopes
- **Secondary channels** — Amber (#FFD166) and mint (#A8FF78) for contrast
- **Glowing elements** — Subtle box-shadows mimic CRT bloom

The oscilloscope on the home page is the signature element. It's the first thing you see. It tells you: *"This is real engineering, not a flashcard app."*

### Typography & Spacing
- **IBM Plex Mono** for all readouts and code—monospace reads as "technical"
- **Inter** for UI text—clean, approachable
- Consistent 4px grid for spacing (xs: 4px, huge: 20px)
- Rounded corners at 4–10px for softer feel while keeping the technical vibe

### Interactive Feedback
- Live truth table highlighting as you toggle inputs
- Output value glows when HIGH, dims when LOW
- Button state changes are immediate (no unnecessary delays)
- Hover states use signal-color for discoverability

---

## 📦 Project Structure

```
src/
├── components/
│   ├── Card.jsx                    # Generic card wrapper
│   ├── OscCanvas.jsx               # Canvas-based oscilloscope drawing
│   ├── OscilliscopeCard.jsx        # Oscilloscope display + readouts
│   ├── Slider.jsx                  # Input slider (future use)
│   ├── Knob.jsx                    # Rotary input control (future use)
│   └── Spark.jsx                   # Sparkline chart component (future use)
│
├── pages/
│   ├── Home.jsx                    # Hero, modules grid, waitlist
│   ├── Labs.jsx                    # Logic simulator + report + progress
│   ├── AITutor.jsx                 # Chat interface with Claude integration
│   └── Quiz.jsx                    # 5-question assessment
│
├── layouts/
│   ├── Sidebar.jsx                 # Navigation menu
│   └── Topbar.jsx                  # Page header with breadcrumbs
│
├── constants/
│   ├── mockData.js                 # All quiz questions, truth tables, tutor responses
│   └── designTokens.js             # Color palette, spacing, shadows
│
├── utils/
│   └── logicGates.js               # Gate simulators, report generation
│
├── styles/
│   └── global.css                  # All styling (CRT theme)
│
└── App.jsx                         # Main component with routing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- React 18+
- A way to run React (Vite, Create React App, etc.)

### Installation

```bash
# Clone or navigate to the project
cd labsim-dashboard

# Install dependencies (if using package.json)
npm install

# Start development server
npm run dev
```

### First Launch
1. You'll land on **Home**
2. See the animated oscilloscope in action
3. Check out the module grid (only "Digital Logic" is unlocked)
4. Try the Waitlist form (counter increments)
5. Navigate to **Labs** via sidebar
6. Toggle inputs A/B and watch the truth table highlight
7. Try different gates (NAND, AND, OR, XOR)
8. Generate a lab report
9. Head to **AI Tutor** and click a quick topic or ask a custom question
10. Take the **Quiz** — aim for 80%+ to pass

---

## 🔌 Claude API Integration (AI Tutor)

The tutor is designed to work with Claude API but *doesn't require it* to function:

### Quick Questions (Pre-written)
These return instantly:
- NAND Gate explanation + IC part
- XOR Gate use cases
- Full Adder binary arithmetic
- 7-Segment display logic

No API call needed—ultra-fast.

### Custom Questions
Hit the Claude API with the user's question:

```javascript
// In AITutor.jsx (sketch)
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: userQuestion }],
  }),
});
```

Set `VITE_CLAUDE_API_KEY` in your `.env` file to enable full tutor functionality.

---

## 📊 Data Flow

### Sorting & Organization
- Navigation is sorted by user journey (Home → Labs → Tutor → Quiz)
- Quiz questions are ordered by difficulty (gates → ICs → combinational logic)
- Lab modules are grouped by tier (free → coming-soon → locked)
- Truth tables are naturally ordered (00, 01, 10, 11 for 2-input gates)

### State Management
Each page maintains its own state:
- **Home:** Email, signup count
- **Labs:** Selected gate, input A/B, active tab
- **Tutor:** Chat conversation history, loading state
- **Quiz:** Current question, score, selected answers

No global state needed for MVP—keep it simple.

---

## 🛠️ Extending the MVP

### Add More Logic Gates
1. Edit [utils/logicGates.js](utils/logicGates.js) — add the gate function
2. Update [constants/mockData.js](constants/mockData.js) — add to `logicGates` array
3. Gate selector in [pages/Labs.jsx](pages/Labs.jsx) auto-discovers new gates

### Add New Lab Modules
1. Create new page (e.g., `pages/CircuitLab.jsx`)
2. Import in [App.jsx](App.jsx)
3. Add navigation item in [constants/mockData.js](constants/mockData.js)
4. Update Sidebar route matching

### Customize Colors
All colors are CSS variables in [styles/global.css](styles/global.css). Change `:root` definitions:
```css
:root {
  --signal: #7ddfff;      /* Primary glow */
  --signal2: #ffd166;     /* Secondary */
  --signal3: #a8ff78;     /* Tertiary */
  --red: #ff6b6b;         /* Error states */
  /* ... etc */
}
```

### Add More Quiz Questions
Edit [constants/mockData.js](constants/mockData.js) — `quizQuestions` array:
```javascript
{
  id: 6,
  question: "Your question here?",
  options: ["A", "B", "C", "D"],
  correct: 0,  // Index of correct answer
  explanation: "Why this is right..."
}
```

### Connect Real Claude API
1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. Create `.env` file:
```
VITE_CLAUDE_API_KEY=sk-ant-...
```
3. Uncomment the API call in `AITutor.jsx`
4. Remove the fallback logic (or keep it for speed on known topics)

---

## 📱 Responsive Behavior

The layout adapts below 1024px:
- **Tutor chat** switches to single column
- **Simulator** stacks controls below (not left sidebar)
- **Sidebar** becomes top nav bar on mobile (<768px)

CSS is mobile-first with media queries at the bottom of [styles/global.css](styles/global.css).

---

## 🎓 What Was Left Out (Intentionally)

Per the plan, MVP excludes:
- **AR/VR** — Not needed for core learning
- **Hardware integration** — Simulator is enough for software learning
- **Subscription billing** — Use Claude API call quotas instead
- **Multiple lab modules** — Only Digital Logic is fully implemented (by design)
- **User accounts** — Waitlist captures emails, real auth comes later
- **Multiplayer/Collaboration** — Single-user mode is simpler, faster

These will be added in subsequent phases once we validate the core MVP works.

---

## 📋 Sorting Decisions Made

1. **Navigation Order** — User journey: Home (discover) → Labs (build) → Tutor (learn) → Quiz (verify)
2. **Lab Modules** — Sorted by tier (free first, locked last) for clear value proposition
3. **Truth Tables** — Standard binary order (00, 01, 10, 11) for easy verification
4. **Quiz Questions** — Difficulty progression (gates → ICs → logic design)
5. **Tutor Topics** — Common to niche (NAND is most fundamental, 7-segment is practical)

This ordering guides users naturally from curiosity → engagement → comprehension → assessment.

---

## 🐛 Known Issues & Future Work

- Oscilloscope animation is canvas-based (good performance, but not resizable)
- AI Tutor relies on pre-written fallbacks if Claude API key missing
- No data persistence (progress resets on page refresh)
- Quiz doesn't store results
- Mobile nav not fully optimized

All planned for Phase 2.

---

## 📝 License

LabSim Africa MVP - Educational Use

---

## 🙋 Support

**For questions about:**
- **The design** — See the CRT/oscilloscope palette rationale above
- **Adding features** — Check "Extending the MVP" section
- **API integration** — Claude API docs at [docs.anthropic.com](https://docs.anthropic.com)
- **Component details** — Hover over any UI element—CSS classes map to component names

---

## 🎯 Success Metrics (Phase 1)

We'll know this MVP works when:
1. ✅ Users can simulate logic gates without confusion
2. ✅ Lab reports are usable (could be printed/shared)
3. ✅ Quiz gives meaningful feedback (users want to retake and improve)
4. ✅ Waitlist grows (social proof validates market demand)
5. ✅ Tutor answers help (measurable via usage analytics later)

---

**Built for African students. Designed to feel like real lab equipment. Powered by Claude.**

LabSim Africa MVP — v1.0
