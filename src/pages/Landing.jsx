import { useState } from 'react';
import '../styles/Landing.css';

export default function Landing({ onEnter }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e, shouldEnter = false) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setSubmitted(false);
        if (shouldEnter && onEnter) {
          onEnter();
        }
      }, 2000);
    }
  };

  const features = [
    {
      title: "Real Hardware Simulation",
      description: "Practice with actual IC part numbers and real oscilloscope measurements"
    },
    {
      title: "Multi-Level Learning",
      description: "High school basics to university advanced coursework in one platform"
    },
    {
      title: "Complete Lab Suite",
      description: "Physics, Chemistry, Electronics, and Hardware design all integrated"
    },
    {
      title: "Live Feedback",
      description: "Instant results and detailed analysis of your experiments"
    }
  ];

  const stats = [
    { number: "5", label: "Lab Categories" },
    { number: "30+", label: "Lab Modules" },
    { number: "2", label: "Education Levels" },
    { number: "Free", label: "Getting Started" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>The Complete Lab Simulation Platform</h1>
            <p className="hero-subtitle">
              Master physics, chemistry, electronics, and hardware design through hands-on digital experiments
            </p>
            
            <form className="hero-form" onSubmit={(e) => handleWaitlistSubmit(e, true)}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Get Early Access</button>
            </form>

            {submitted && (
              <div className="success-message">
                Thank you! We'll notify you when we launch.
              </div>
            )}

            <p className="hero-subtext">For African students. By educators.</p>

            <button onClick={() => onEnter && onEnter()} className="demo-button">
              Check this page
            </button>
          </div>

          <div className="hero-visual">
            <div className="gradient-box">
              <div className="floating-card card-1">LabSim Africa</div>
              <div className="floating-card card-2">Digital Labs</div>
              <div className="floating-card card-3">Real Circuits</div>
              <div className="floating-card card-4">Learn Fast</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why LabSim Africa?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Built for Students</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Labs Preview */}
      <section className="labs-preview">
        <h2>Comprehensive Lab Coverage</h2>
        <div className="labs-categories">
          <div className="lab-category">
            <h3>Physics Practicals</h3>
            <ul>
              <li>Mechanics & Motion</li>
              <li>Waves & Sound</li>
              <li>Electricity & Magnetism</li>
              <li>Heat & Thermodynamics</li>
              <li>Optics & Modern Physics</li>
            </ul>
          </div>

          <div className="lab-category">
            <h3>Chemistry Reactions</h3>
            <ul>
              <li>Chemical Reactions</li>
              <li>Atomic Structure & Bonding</li>
              <li>Stoichiometry & Solutions</li>
              <li>Organic Chemistry Basics</li>
              <li>Analytical Chemistry</li>
            </ul>
          </div>

          <div className="lab-category">
            <h3>Electronics & Digital</h3>
            <ul>
              <li>Digital Logic Gates</li>
              <li>Circuit Analysis</li>
              <li>Microcontrollers</li>
              <li>Embedded Systems</li>
              <li>Signal Processing</li>
            </ul>
          </div>

          <div className="lab-category">
            <h3>Hardware & Computing</h3>
            <ul>
              <li>IC Design with MAGIC</li>
              <li>FPGA Programming</li>
              <li>PCB Design</li>
              <li>Microprocessor Architecture</li>
              <li>ARM Embedded Systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* YouTube Resources Section */}
      <section className="resources">
        <h2>Learning Resources</h2>
        <p className="resources-subtitle">Video tutorials to help you get started</p>
        <div className="videos-grid">
          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>Getting Started with LabSim</h3>
            <p>Learn the basics and navigate the platform</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>Physics Lab Fundamentals</h3>
            <p>Master the essential physics lab techniques</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>Digital Logic Circuits</h3>
            <p>Design and simulate complex digital circuits</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>IC Design Masterclass</h3>
            <p>Learn chip design with MAGIC tool</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>Chemistry Reactions Lab</h3>
            <p>Visualize and simulate chemical reactions</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <span className="play-icon">▶</span>
            </div>
            <h3>FPGA Programming Guide</h3>
            <p>Configure FPGA boards and implement circuits</p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="watch-btn">
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of students building real skills in digital labs</p>
          <form className="cta-form" onSubmit={(e) => handleWaitlistSubmit(e, true)}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        </div>
      </section>
    </div>
  );
}
