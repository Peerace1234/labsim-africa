import { useState } from 'react';
import '../styles/Topbar.css';

export default function Topbar({ pageTitle, pageSubtitle }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{pageTitle || "LabSim Africa"}</span>
        {pageSubtitle && (
          <span className="topbar-subtitle">
            <span className="topbar-sep">›</span> {pageSubtitle}
          </span>
        )}
      </div>
      <div className="topbar-right">
        <button 
          className="icon-btn help-btn" 
          title="Help"
          onClick={() => setShowHelp(!showHelp)}
        >
          Help
        </button>
        <button 
          className="icon-btn settings-btn" 
          title="Settings"
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings
        </button>
        <button 
          className="icon-btn user-btn" 
          title="User Menu"
          onClick={() => setShowProfile(!showProfile)}
        >
          Profile
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Help & Documentation</h2>
              <button className="close-btn" onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <div className="modal-body">
              <h3>Getting Started</h3>
              <p>Learn how to use LabSim Africa with our comprehensive tutorials.</p>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="video-link">
                Watch Getting Started Tutorial
              </a>
              
              <h3>Lab Basics</h3>
              <p>Understand the fundamentals of each lab module.</p>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="video-link">
                Watch Lab Basics Video
              </a>
              
              <h3>FAQ</h3>
              <p>Common questions and answers about LabSim Africa.</p>
              <div className="faq-item">
                <strong>How do I start a lab?</strong>
                <p>Click on any lab module in the dashboard and follow the instructions.</p>
              </div>
              <div className="faq-item">
                <strong>Can I save my progress?</strong>
                <p>Yes, all your progress is automatically saved to your account.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button className="close-btn" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="settings-item">
                <label>Theme</label>
                <select>
                  <option>Dark Mode</option>
                  <option>Light Mode</option>
                </select>
              </div>
              <div className="settings-item">
                <label>Notifications</label>
                <input type="checkbox" defaultChecked />
                <span>Enable email notifications</span>
              </div>
              <div className="settings-item">
                <label>Language</label>
                <select>
                  <option>English</option>
                  <option>French</option>
                  <option>Swahili</option>
                </select>
              </div>
              <div className="settings-item">
                <label>Learning Goals</label>
                <input type="number" placeholder="Labs per week" defaultValue="5" />
              </div>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="video-link">
                Watch Settings Tutorial
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>My Profile</h2>
              <button className="close-btn" onClick={() => setShowProfile(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="profile-info">
                <div className="profile-avatar">👤</div>
                <h3>Student User</h3>
                <p className="profile-email">student@labsim.com</p>
              </div>
              
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-label">Labs Completed</span>
                  <span className="stat-value">8</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Progress</span>
                  <span className="stat-value">32%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Points</span>
                  <span className="stat-value">420</span>
                </div>
              </div>

              <div className="profile-section">
                <h4>Quick Links</h4>
                <a href="#" className="profile-link">View Certificate</a>
                <a href="#" className="profile-link">Download Reports</a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="profile-link">
                  Watch My Learning Path Video
                </a>
              </div>

              <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
