import { navigationItems } from '../constants/mockData';

export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⚡</div>
        <div className="logo-text">
          LabSim Africa
          <small>Powered by Claude</small>
        </div>
      </div>

      <div className="sidebar-section">Navigation</div>
      {navigationItems.map(({ id, icon, label }) => (
        <div
          key={id}
          className={`nav-item ${activeNav === id ? 'active' : ''}`}
          onClick={() => onNavChange(id)}
        >
          <span className="ni-icon">{icon}</span>
          <span>{label}</span>
        </div>
      ))}

      <div className="sidebar-spacer" />

      <div className="sidebar-footer">
        <div className="footer-text">
          <strong>LabSim Africa MVP</strong>
          <p>Learn digital logic and circuit design with real IC part numbers</p>
        </div>
      </div>
    </aside>
  );
}
