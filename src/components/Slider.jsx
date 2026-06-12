import { useRef, useCallback } from 'react';

export default function Slider({ value, max, onChange, color = 'signal' }) {
  const pct = (value / max) * 100;
  const trackRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onChange(ratio * max);
    },
    [max, onChange]
  );

  return (
    <div className="slider-track" ref={trackRef} onClick={handleClick}>
      <div className={`slider-fill ${color}`} style={{ width: `${pct}%` }} />
      <div className={`slider-thumb ${color}`} style={{ left: `${pct}%` }} />
    </div>
  );
}
