import React, { useEffect, useState } from 'react';
import { labModules } from '../constants/mockData';

export default function Docs({ moduleId, onBack }) {
  const [module, setModule] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTimeLeft, setPreviewTimeLeft] = useState(10);

  useEffect(() => {
    const m = labModules.find((mod) => mod.id === moduleId);
    setModule(m || null);
  }, [moduleId]);

  useEffect(() => {
    if (!previewOpen) return undefined;
    if (previewTimeLeft <= 0) {
      setPreviewOpen(false);
      return undefined;
    }

    const t = setInterval(() => setPreviewTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [previewOpen, previewTimeLeft]);

  if (!module) {
    return (
      <div className="page docs-page">
        <h1>Course docs</h1>
        <p>Select a module to view its documentation.</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  const isFree = module.tier === 'free';

  return (
    <div className="page docs-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{module.title}</h1>
        <div>
          <button onClick={onBack}>Back</button>
        </div>
      </div>

      <p className="module-description">{module.description}</p>

      <h3>Course docs</h3>
      {isFree ? (
        <div>
          <p>Full lesson content and step-by-step guides are available for this free module.</p>
          <ul>
            <li>Lesson overview</li>
            <li>Hands-on exercises</li>
            <li>Practice questions</li>
          </ul>
        </div>
      ) : (
        <div>
          <p>This is a premium module. A short preview is available.</p>
          <p><strong>10-second preview:</strong></p>
          <p>{module.description}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => { setPreviewOpen(true); setPreviewTimeLeft(10); }} className="cta">Start 10s preview</button>
            <button style={{ marginLeft: 10 }} className="cta" onClick={async () => {
              // create checkout session
              const base = import.meta.env.VITE_API_BASE || '';
              try {
                const r = await fetch(base + '/api/payments/create-session', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ moduleId: module.id, priceCents: module.priceCents }),
                });
                const data = await r.json();
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  alert(data.error || 'Could not create checkout session');
                }
              } catch (e) {
                alert('Payment failed to start');
              }
            }}>Buy course</button>
          </div>
          {previewOpen && (
            <div className="preview-modal" role="dialog" aria-modal="true">
              <div className="preview-inner">
                <h4>Previewing: {module.title}</h4>
                <div className="preview-content">
                  <p>{module.description}</p>
                </div>
                <div className="preview-footer">
                  <div>Time left: {previewTimeLeft}s</div>
                  <button onClick={() => setPreviewOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <a href="https://www.freecodecamp.org/learn/" target="_blank" rel="noreferrer">External docs</a>
      </div>
    </div>
  );
}
