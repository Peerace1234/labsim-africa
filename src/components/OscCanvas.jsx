import { useState, useEffect, useRef } from 'react';

export default function OscCanvas({ running }) {
  const ref = useRef(null);
  const animRef = useRef(0);
  const t = useRef(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');

    function frame() {
      const W = c.width,
        H = c.height;
      ctx.clearRect(0, 0, W, H);

      // graticule
      ctx.strokeStyle = 'rgba(125,223,255,0.05)';
      ctx.lineWidth = 1;
      const cols = 10,
        rows = 8;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo((i / cols) * W, 0);
        ctx.lineTo((i / cols) * W, H);
        ctx.stroke();
      }
      for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (i / rows) * H);
        ctx.lineTo(W, (i / rows) * H);
        ctx.stroke();
      }

      // center axes
      ctx.strokeStyle = 'rgba(125,223,255,0.12)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (!running) {
        animRef.current = requestAnimationFrame(frame);
        return;
      }

      // CH1 — ice-blue sine
      ctx.beginPath();
      ctx.strokeStyle = '#7DDFFF';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#7DDFFF';
      ctx.shadowBlur = 8;
      for (let x = 0; x < W; x++) {
        const phase = (x / W) * Math.PI * 6 + t.current;
        const y = H / 2 - Math.sin(phase) * H * 0.32;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // CH2 — amber triangle wave
      ctx.beginPath();
      ctx.strokeStyle = '#FFD166';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#FFD166';
      ctx.shadowBlur = 5;
      for (let x = 0; x < W; x++) {
        const phase = ((x / W) * 6 + t.current / Math.PI) % 1;
        const tri = phase < 0.5 ? phase * 4 - 1 : 3 - phase * 4;
        const y = H / 2 - tri * H * 0.2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t.current += 0.025;
      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, [running]);

  return <canvas ref={ref} className="osc-cv" width={700} height={180} />;
}
