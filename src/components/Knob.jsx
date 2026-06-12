import { useState, useEffect, useRef, useCallback } from 'react';

export default function Knob({ value, max = 100, onChange, color = '#7DDFFF' }) {
  const ref = useRef(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startVal = useRef(value);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = c.width,
      H = c.height;
    const cx = W / 2,
      cy = H / 2,
      r = W / 2 - 6;
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const angle = startAngle + (value / max) * (endAngle - startAngle);

    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = '#1E3558';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    const nx = cx + Math.cos(angle) * (r - 8);
    const ny = cy + Math.sin(angle) * (r - 8);
    ctx.beginPath();
    ctx.arc(nx, ny, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#EBF5FF';
    ctx.fill();
  }, [value, max, color]);

  const onMouseDown = useCallback(
    (e) => {
      dragging.current = true;
      startY.current = e.clientY;
      startVal.current = value;
      const up = () => {
        dragging.current = false;
        window.removeEventListener('mouseup', up);
        window.removeEventListener('mousemove', move);
      };
      const move = (e2) => {
        if (!dragging.current) return;
        const delta = startY.current - e2.clientY;
        onChange(Math.max(0, Math.min(max, startVal.current + delta * (max / 100))));
      };
      window.addEventListener('mouseup', up);
      window.addEventListener('mousemove', move);
    },
    [value, max, onChange]
  );

  return (
    <canvas
      ref={ref}
      className="knob-cv"
      width={72}
      height={72}
      onMouseDown={onMouseDown}
    />
  );
}
