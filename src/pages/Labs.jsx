import { useState } from 'react';
import { logicGates as logicGatesData, getGateInfo, getGateTruthTable, generateLabReport } from '../utils/logicGates';

export default function Labs() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [selectedGate, setSelectedGate] = useState('nand');
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [progress, setProgress] = useState({
    "digital-logic": 45,
    "circuits-101": 0,
    "microcontrollers": 0,
    "embedded-systems": 0,
  });

  const gateInfo = getGateInfo(selectedGate);
  const truthTable = getGateTruthTable(selectedGate);
  const simulator = logicGatesData[selectedGate];
  const output = simulator(inputA, inputB) ? 1 : 0;
  const activeRow = truthTable.find((r) => r.a === inputA && r.b === inputB);

  const handleToggleInput = (input) => {
    if (input === 'a') setInputA(inputA === 0 ? 1 : 0);
    else setInputB(inputB === 0 ? 1 : 0);
  };

  const labReport = generateLabReport(selectedGate);

  return (
    <div className="page labs-page">
      <h1>Digital Logic Labs</h1>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          🎛️ Simulator
        </button>
        <button
          className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          📄 Lab Report
        </button>
        <button
          className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
      </div>

      {activeTab === 'simulator' && (
        <div className="simulator-section">
          <div className="simulator-controls">
            <h2>Select Gate</h2>
            <div className="gate-buttons">
              {['nand', 'and', 'or', 'xor'].map((gate) => (
                <button
                  key={gate}
                  className={`gate-btn ${selectedGate === gate ? 'active' : ''}`}
                  onClick={() => setSelectedGate(gate)}
                >
                  {getGateInfo(gate).symbol} {getGateInfo(gate).name}
                </button>
              ))}
            </div>
          </div>

          <div className="simulator-main">
            <div className="gate-info">
              <h3>{gateInfo.name} Gate</h3>
              <p className="ic-part">IC: {gateInfo.icPart}</p>
              <p className="description">{gateInfo.description}</p>
            </div>

            <div className="logic-simulator">
              <div className="input-section">
                <div className="input-item">
                  <label>Input A</label>
                  <button
                    className={`toggle-btn ${inputA === 1 ? 'high' : 'low'}`}
                    onClick={() => handleToggleInput('a')}
                  >
                    {inputA}
                  </button>
                </div>
                <div className="input-item">
                  <label>Input B</label>
                  <button
                    className={`toggle-btn ${inputB === 1 ? 'high' : 'low'}`}
                    onClick={() => handleToggleInput('b')}
                  >
                    {inputB}
                  </button>
                </div>
              </div>

              <div className="output-section">
                <div className="output-display">
                  <label>Output</label>
                  <div className={`output-value ${output === 1 ? 'high' : 'low'}`}>
                    {output}
                  </div>
                </div>
              </div>
            </div>

            <div className="truth-table-section">
              <h3>Truth Table</h3>
              <table className="truth-table">
                <thead>
                  <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>Output</th>
                  </tr>
                </thead>
                <tbody>
                  {truthTable.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        activeRow && activeRow.a === row.a && activeRow.b === row.b
                          ? 'active'
                          : ''
                      }
                    >
                      <td>{row.a}</td>
                      <td>{row.b}</td>
                      <td className={row.output === 1 ? 'high' : 'low'}>{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lab-notes">
              <h3>Lab Notes</h3>
              <p>
                The <strong>{gateInfo.name}</strong> gate (IC {gateInfo.icPart}) is a
                fundamental building block in digital electronics. {gateInfo.description}
              </p>
              <p>
                Observe how the output changes when you toggle the inputs. The highlighted row in
                the truth table shows the current state.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="report-section">
          <h2>Lab Report: {gateInfo.name} Gate</h2>
          <pre className="report-content">{labReport}</pre>
          <button className="print-btn" onClick={() => window.print()}>
            🖨️ Print Report
          </button>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="progress-section">
          <h2>Module Progress</h2>
          <div className="progress-list">
            {Object.entries(progress).map(([moduleId, percentage]) => (
              <div key={moduleId} className="progress-item">
                <div className="progress-label">{moduleId}</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="progress-text">{percentage}%</div>
              </div>
            ))}
          </div>
          <div className="certificate-section">
            <h3>🎓 Certificate Unlock</h3>
            <p>Complete all modules to unlock your LabSim Africa Certificate of Achievement</p>
            <button className="cert-btn" disabled>
              Locked (45% complete)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
