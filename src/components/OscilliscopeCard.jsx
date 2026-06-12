import OscCanvas from './OscCanvas';
import { oscReadouts } from '../constants/mockData';

export default function OscilliscopeCard({ running, params }) {
  return (
    <div className="card osc-card">
      <div className="card-hd">
        <div className="card-title">
          <span className="card-title-dot" />
          Oscilloscope
          <span style={{ color: 'var(--dim)', fontWeight: 400 }}>
            — CH1: {params.freq.toFixed(0)} MHz &nbsp;|&nbsp; CH2: {(params.freq * 0.5).toFixed(1)} MHz
          </span>
        </div>
        <div className="card-actions">
          <button className="card-btn">Cursors</button>
          <button className="card-btn">Measure</button>
        </div>
      </div>
      <div className="osc-canvas-wrap">
        <OscCanvas running={running} />
      </div>
      <div className="osc-readouts">
        {[
          { label: 'CH1 Freq', val: `${params.freq.toFixed(0)}`, unit: 'MHz', cls: 'sig' },
          { label: 'Amplitude', val: `${params.amp.toFixed(2)}`, unit: 'V', cls: 'sig' },
          { label: 'Time/div', val: '2.00', unit: 'ms', cls: '' },
          { label: 'CH2 Freq', val: `${(params.freq * 0.5).toFixed(1)}`, unit: 'MHz', cls: 'amber' },
          { label: 'Phase Δ', val: '−32.4', unit: '°', cls: '' },
        ].map((r) => (
          <div key={r.label} className="osc-readout">
            <div className="or-label">{r.label}</div>
            <div className={`or-val ${r.cls}`}>
              {r.val}
              <span style={{ fontSize: '0.6rem', color: 'var(--dim)', marginLeft: 2 }}>
                {r.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
