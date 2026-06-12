// Mock Data for LabSim Africa MVP

export const navigationItems = [
  { id: "home", icon: "🏠", label: "Home", badge: null },
  { id: "labs", icon: "⚗", label: "Labs", badge: null },
  { id: "tutor", icon: "🧠", label: "AI Tutor (ZARA)", badge: null },
  { id: "quiz", icon: "❓", label: "Quiz", badge: null },
];

export const labModules = [
  // Electronics & Digital Systems
  {
    id: "digital-logic",
    title: "Digital Logic Gates",
    description: "NAND, AND, OR, XOR gate simulator with real IC part numbers",
    tier: "free",
    icon: "⚡",
    progress: 0,
    category: "electronics",
  },
  {
    id: "circuits-101",
    title: "Circuit Analysis",
    description: "Build and analyze circuits with real-time measurements",
    tier: "coming-soon",
    icon: "🔌",
    progress: 0,
    category: "electronics",
  },
  {
    id: "microcontrollers",
    title: "Microcontrollers",
    description: "Program and simulate microcontroller behavior",
    tier: "locked",
    icon: "💻",
    progress: 0,
    category: "electronics",
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    description: "Full embedded system design and testing",
    tier: "locked",
    icon: "🤖",
    progress: 0,
    category: "electronics",
  },

  // Physics Practicals - High School
  {
    id: "physics-mechanics-hs",
    title: "Mechanics & Motion (High School)",
    description:
      "Newton's laws, projectile motion, simple machines, and forces simulation",
    tier: "free",
    icon: "⚙️",
    progress: 0,
    category: "physics",
    level: "high-school",
  },
  {
    id: "physics-waves-hs",
    title: "Waves & Sound (High School)",
    description:
      "Light waves, sound properties, reflection, refraction, and interference",
    tier: "free",
    icon: "〰️",
    progress: 0,
    category: "physics",
    level: "high-school",
  },
  {
    id: "physics-electricity-hs",
    title: "Electricity & Magnetism (High School)",
    description:
      "Ohm's law, circuits, electromagnetic fields, and induction experiments",
    tier: "coming-soon",
    icon: "🔋",
    progress: 0,
    category: "physics",
    level: "high-school",
  },
  {
    id: "physics-thermodynamics-hs",
    title: "Heat & Thermodynamics (High School)",
    description:
      "Temperature, heat transfer, specific heat, and thermal equilibrium",
    tier: "coming-soon",
    icon: "🌡️",
    progress: 0,
    category: "physics",
    level: "high-school",
  },

  // Physics Practicals - Undergraduate
  {
    id: "physics-optics-uni",
    title: "Optics & Modern Physics (University)",
    description:
      "Quantum mechanics, photonics, laser experiments, and relativistic effects",
    tier: "locked",
    icon: "🔬",
    progress: 0,
    category: "physics",
    level: "undergraduate",
  },
  {
    id: "physics-advanced-hs",
    title: "Advanced Mechanics (University)",
    description:
      "Rotational dynamics, energy methods, oscillations, and wave phenomena",
    tier: "locked",
    icon: "📐",
    progress: 0,
    category: "physics",
    level: "undergraduate",
  },

  // Chemistry Reactions - High School
  {
    id: "chemistry-reactions-hs",
    title: "Chemical Reactions (High School)",
    description:
      "Acid-base reactions, redox, combustion, and displacement reactions with visualization",
    tier: "free",
    icon: "⚗️",
    progress: 0,
    category: "chemistry",
    level: "high-school",
  },
  {
    id: "chemistry-bonding-hs",
    title: "Atomic Structure & Bonding (High School)",
    description:
      "Electron configuration, ionic & covalent bonding, molecular geometry simulation",
    tier: "free",
    icon: "⚛️",
    progress: 0,
    category: "chemistry",
    level: "high-school",
  },
  {
    id: "chemistry-stoichiometry-hs",
    title: "Stoichiometry & Solutions (High School)",
    description:
      "Molar calculations, titration experiments, concentration, and dilution",
    tier: "coming-soon",
    icon: "📊",
    progress: 0,
    category: "chemistry",
    level: "high-school",
  },
  {
    id: "chemistry-organic-hs",
    title: "Organic Chemistry Basics (High School)",
    description:
      "Alkanes, alkenes, functional groups, and simple organic reactions",
    tier: "coming-soon",
    icon: "🧬",
    progress: 0,
    category: "chemistry",
    level: "high-school",
  },

  // Chemistry Reactions - Undergraduate
  {
    id: "chemistry-mechanisms-uni",
    title: "Reaction Mechanisms (University)",
    description:
      "SN1, SN2, E1, E2 mechanisms, activation energy, and transition states",
    tier: "locked",
    icon: "🔄",
    progress: 0,
    category: "chemistry",
    level: "undergraduate",
  },
  {
    id: "chemistry-kinetics-uni",
    title: "Kinetics & Equilibrium (University)",
    description:
      "Rate laws, reaction orders, equilibrium constants, Le Chatelier's principle",
    tier: "locked",
    icon: "⚖️",
    progress: 0,
    category: "chemistry",
    level: "undergraduate",
  },
  {
    id: "chemistry-spectroscopy-uni",
    title: "Analytical Chemistry (University)",
    description:
      "IR, NMR, Mass spec interpretation, and chromatography techniques",
    tier: "locked",
    icon: "🌈",
    progress: 0,
    category: "chemistry",
    level: "undergraduate",
  },
  {
    id: "chemistry-thermodynamics-uni",
    title: "Thermochemistry & Electrochemistry (University)",
    description:
      "Enthalpy, entropy, Gibbs energy, electrodes, and redox potentials",
    tier: "locked",
    icon: "⚡",
    progress: 0,
    category: "chemistry",
    level: "undergraduate",
  },

  // Hardware & Computing - IC Design & Digital Systems
  {
    id: "ic-design-magic",
    title: "IC Design with MAGIC (High School)",
    description:
      "Learn chip layout design, transistor placement, CMOS technology, and IC fabrication basics",
    tier: "free",
    icon: "✨",
    progress: 0,
    category: "hardware",
    level: "high-school",
  },
  {
    id: "fpga-basics",
    title: "FPGA Programming Basics (High School)",
    description:
      "Configure FPGA boards, Verilog fundamentals, and implement digital circuits in hardware",
    tier: "free",
    icon: "🔧",
    progress: 0,
    category: "hardware",
    level: "high-school",
  },
  {
    id: "pcb-design",
    title: "PCB Design Fundamentals (High School)",
    description:
      "Circuit layout, trace routing, layer management, and manufacturing considerations",
    tier: "coming-soon",
    icon: "🧩",
    progress: 0,
    category: "hardware",
    level: "high-school",
  },
  {
    id: "microprocessor-architecture",
    title: "Microprocessor Architecture (University)",
    description:
      "CPU design, instruction sets, pipelining, cache systems, and performance optimization",
    tier: "coming-soon",
    icon: "⚙️",
    progress: 0,
    category: "hardware",
    level: "undergraduate",
  },
  {
    id: "verilog-advanced",
    title: "Advanced HDL & Verilog (University)",
    description:
      "System-on-Chip design, behavioral modeling, synthesis, and verification techniques",
    tier: "locked",
    icon: "💎",
    progress: 0,
    category: "hardware",
    level: "undergraduate",
  },
  {
    id: "memory-systems",
    title: "Memory & Storage Systems (University)",
    description:
      "RAM/ROM design, cache optimization, virtual memory, and semiconductor memory technologies",
    tier: "locked",
    icon: "💾",
    progress: 0,
    category: "hardware",
    level: "undergraduate",
  },
  {
    id: "signal-processing",
    title: "Digital Signal Processing (University)",
    description:
      "Fourier transforms, filters, FFT implementation, and real-time signal manipulation",
    tier: "locked",
    icon: "〰️",
    progress: 0,
    category: "hardware",
    level: "undergraduate",
  },
  {
    id: "arm-embedded",
    title: "ARM Architecture & Embedded (University)",
    description:
      "ARM Cortex processors, low-level programming, interrupts, and real-time systems",
    tier: "locked",
    icon: "🤖",
    progress: 0,
    category: "hardware",
    level: "undergraduate",
  },
];

export const logRows = [
  { ts: "10:42:05", freq: 0.8, amp: 4.0, gain: 0.0, hi: false },
  { ts: "10:42:35", freq: 0.1, amp: 2.0, gain: 3.0, hi: false },
  { ts: "10:43:02", freq: 0.1, amp: 3.0, gain: 0.0, hi: false },
  { ts: "10:52:15", freq: 0.3, amp: 1.0, gain: 1.0, hi: false },
  { ts: "10:52:35", freq: 0.1, amp: 3.0, gain: 0.0, hi: true },
  { ts: "10:53:08", freq: 0.6, amp: 5.0, gain: 2.0, hi: false },
  { ts: "10:55:19", freq: 0.1, amp: 3.0, gain: 2.0, hi: true },
  { ts: "10:59:00", freq: 0.4, amp: 2.0, gain: 1.0, hi: false },
];

// Digital Logic Gates Data
export const logicGates = [
  { id: "nand", name: "NAND", icPart: "74LS00", icon: "⊼" },
  { id: "and", name: "AND", icPart: "74LS08", icon: "∧" },
  { id: "or", name: "OR", icPart: "74LS32", icon: "∨" },
  { id: "xor", name: "XOR", icPart: "74LS86", icon: "⊕" },
];

export const nandTruthTable = [
  { a: 0, b: 0, output: 1 },
  { a: 0, b: 1, output: 1 },
  { a: 1, b: 0, output: 1 },
  { a: 1, b: 1, output: 0 },
];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the output of a NAND gate when both inputs are 1?",
    options: ["0", "1", "Undefined", "Depends on voltage"],
    correct: 0,
    explanation:
      "A NAND gate outputs 0 only when both inputs are 1. NAND stands for NOT-AND.",
  },
  {
    id: 2,
    question: "Which IC part number is used for a 2-input NAND gate?",
    options: ["74LS32", "74LS00", "74LS08", "74LS86"],
    correct: 1,
    explanation:
      "The 74LS00 is a Quad 2-input NAND gate. It's one of the most basic and widely used TTL gates.",
  },
  {
    id: 3,
    question: "An XOR gate outputs 1 when:",
    options: [
      "Both inputs are the same",
      "Inputs are different",
      "Both inputs are 0",
      "Both inputs are 1",
    ],
    correct: 1,
    explanation:
      "XOR (exclusive OR) outputs 1 when the inputs are different. It outputs 0 when inputs are the same.",
  },
  {
    id: 4,
    question: "What does a 7-segment display require to show the digit '8'?",
    options: [
      "All segments ON",
      "All segments OFF",
      "Only top segment ON",
      "Only bottom segment ON",
    ],
    correct: 0,
    explanation:
      "To display the digit 8, all seven segments (a, b, c, d, e, f, g) must be illuminated.",
  },
  {
    id: 5,
    question: "In a full adder, how many input bits are required?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation:
      "A full adder requires 3 inputs: two data bits (A, B) and a carry-in bit (Cin). It produces a sum and carry-out.",
  },
];

export const tutorTopics = [
  { id: "nand", label: "NAND Gate", emoji: "⊼" },
  { id: "xor", label: "XOR Gate", emoji: "⊕" },
  { id: "full-adder", label: "Full Adder", emoji: "➕" },
  { id: "7-segment", label: "7-Segment Display", emoji: "🔢" },
];

export const tutorAnswers = {
  nand: {
    quick:
      "NAND outputs 0 only when both inputs are 1. Part number: 74LS00. Fundamental to digital logic.",
    followUp:
      "Any digital circuit can be built using only NAND gates. That's why it's called 'universal gate'.",
  },
  xor: {
    quick:
      "XOR (exclusive OR) outputs 1 when inputs differ. Part number: 74LS86. Common in parity checks.",
    followUp:
      "XOR is used in binary addition, error detection, and cryptography due to its symmetry properties.",
  },
  "full-adder": {
    quick:
      "Full adder sums two bits plus a carry-in. Outputs: Sum (S) and Carry-out (Cout). Building block of CPUs.",
    followUp:
      "Chain full adders together to create multi-bit adders. The carry propagation speed limits frequency.",
  },
  "7-segment": {
    quick:
      "Seven LED segments arranged to display digits 0-9. Each segment controlled independently.",
    followUp:
      "Common anode vs common cathode determines if segments are ON with HIGH or LOW logic. Design choice.",
  },
};

export const waitlistCount = 1247;

export const parameters = [
  { key: "freq", label: "Frequency", max: 500, unit: "MHz", color: "signal" },
  { key: "amp", label: "Amplitude", max: 5, unit: "V", color: "" },
  { key: "gain", label: "Gain", max: 10, unit: "dB", color: "amber" },
];

export const experimentParameters = [
  { label: "Voltage", val: "5", unit: "V" },
  { label: "Frequency", val: "dynamic", unit: "MHz", sig: true },
  { label: "Resistance", val: "100", unit: "Ω" },
  { label: "Inductance", val: "0", unit: "H" },
  { label: "Capacitance", val: "10", unit: "µF" },
  { label: "Phase", val: "−32", unit: "°" },
];

export const oscReadouts = [
  { label: "CH1 Freq", val: "dynamic", unit: "MHz", cls: "sig" },
  { label: "Amplitude", val: "dynamic", unit: "V", cls: "sig" },
  { label: "Time/div", val: "2.00", unit: "ms", cls: "" },
  { label: "CH2 Freq", val: "dynamic", unit: "MHz", cls: "amber" },
  { label: "Phase Δ", val: "−32.4", unit: "°", cls: "" },
];

export const realTimeMetrics = [
  { label: "Voltage", val: "45.62", unit: "V", cls: "sig", color: "#7DDFFF" },
  {
    label: "Frequency",
    val: "0.075",
    unit: "MHz",
    cls: "amber",
    color: "#FFD166",
  },
  { label: "Amplitude", val: "0.258", unit: "V", cls: "sig", color: "#7DDFFF" },
  { label: "Time", val: "0.09", unit: "ms", cls: "", color: "#A8FF78" },
];

export const powerSupplyOutputs = [
  { label: "Voltage", val: "5 V" },
  { label: "Current", val: "1 A" },
  { label: "Power", val: "5 W" },
];

export const waveformTypes = ["Sine", "Square", "Triangle"];

// Generator function for sparkline data
export const generateSparkData = (
  length = 30,
  base = 0,
  amplitude = 1,
  frequency = 1,
) => {
  return Array.from(
    { length },
    (_, i) =>
      base +
      Math.sin(i * frequency) * amplitude +
      Math.random() * (amplitude * 0.2),
  );
};

export const sparkData = {
  v: generateSparkData(30, 45, 3, 0.6),
  f: generateSparkData(30, 0.07, 0.005, 0.4),
  v2: generateSparkData(30, 0.25, 0.02, 0.9),
  tm: generateSparkData(30, 0.09, 0.005, 0.3),
};
