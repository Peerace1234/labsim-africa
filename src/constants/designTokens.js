// Design Tokens & Palette
export const colors = {
  ink: '#0A1628',        // PCB-substrate blue-black
  panel: '#0F1E35',      // lifted panel surface
  panel2: '#162540',     // inset / secondary surface
  rim: '#1E3558',        // border / divider
  rim2: '#253f5e',       // secondary border
  signal: '#7DDFFF',     // ice-blue — primary signal
  signal2: '#FFD166',    // amber — secondary channel
  signal3: '#A8FF78',    // mint — tertiary / success
  red: '#FF6B6B',        // error
  dim: '#4A6580',        // muted text
  text: '#C8DCF0',       // body text
  bright: '#EBF5FF',     // headings / bright text
};

export const spacing = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  xxl: '14px',
  xxxl: '16px',
  huge: '18px',
  massive: '20px',
};

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '10px',
};

export const fonts = {
  mono: "'IBM Plex Mono', monospace",
  ui: "'Inter', sans-serif",
};

export const shadows = {
  signalGlow: '0 0 14px rgba(125,223,255,0.4)',
  signalSmall: '0 0 8px rgba(125,223,255,0.3)',
  signalTiny: '0 0 4px rgba(125,223,255,0.2)',
};

export const gradients = {
  dotMatrix: 'radial-gradient(circle, rgba(125,223,255,0.07) 1px, transparent 1px)',
  progressBar: 'linear-gradient(90deg, var(--signal), var(--signal3))',
};

export const opacity = {
  signalDim: 'rgba(125,223,255,0.1)',
  signal2Dim: 'rgba(255,209,102,0.1)',
  signal3Dim: 'rgba(168,255,120,0.1)',
};
