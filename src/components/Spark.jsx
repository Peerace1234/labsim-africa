import { useEffect, useRef } from 'react';

export default function Spark({ data, color = '#7DDFFF', h = 32 }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = c.width,
      H = c.height;
    ctx.clearRect(0, 0, W, H);
    if (!data.length) return;

    const mn = Math.min(...data),
      mx = Math.max(...data);
    const range = mx - mn || 1;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 4;

    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - mn) / range) * (H - 4) - 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [data, color]);

  return (
    <canvas
      ref={ref}
      className="rt-spark"
      width={120}
      height={h}
      style={{ width: '100%', height: h }}
    />
  );
}
