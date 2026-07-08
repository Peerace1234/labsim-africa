import { useState } from 'react';
import { labModules, waitlistCount } from '../constants/mockData';

// Home receives onOpenDocs prop from App to open module docs

const getModuleHighlights = (module) => {
  if (module.tier === 'free') {
    switch (module.category) {
      case 'electronics':
        return ['Circuit basics', 'Worked examples', 'Practice questions'];
      case 'physics':
        return ['Theory notes', 'Experiment steps', 'Quick quiz'];
      case 'chemistry':
        return ['Concept guide', 'Reaction walkthrough', 'Revision notes'];
      case 'hardware':
        return ['Design overview', 'Lab notes', 'Starter exercises'];
      default:
        return ['Lesson guide', 'Examples', 'Practice tasks'];
    }
  }

  if (module.tier === 'coming-soon') {
    return ['Course outline', 'Lesson roadmap', 'Coming soon'];
  }

  return ['10-second preview', 'Course overview', 'Premium lab notes'];
};

const getDocsLabel = (module) => (module.tier === 'free' ? 'Course docs' : 'Preview docs');

export default function Home() {
  const [signups, setSignups] = useState(waitlistCount);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSignups((prev) => prev + 1);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  // Organize modules by category
  const modulesByCategory = labModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {});

  const categoryTitles = {
    electronics: "Electronics & Digital Systems",
    physics: "Physics Practicals",
    chemistry: "Chemistry Reactions",
    hardware: "Hardware & Computing"
  };

  const categoryLabels = {
    electronics: "Electronics",
    physics: "Physics",
    chemistry: "Chemistry",
    hardware: "Hardware"
  };

  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Welcome to LabSim Africa</h1>
        <p className="hero-tagline">
          Comprehensive lab simulator for physics, chemistry, electronics, and hardware design
        </p>

        <p className="hero-description">
          Complete hands-on lab simulator for African students. Practice with real IC part numbers and instant feedback.
        </p>
      </div>

      <div className="modules-section">
        <h2>Explore Lab Modules</h2>
        {Object.entries(modulesByCategory).map(([category, modules]) => (
          <div key={category} className="category-section">
            <h3 className="category-title">
              <span className="category-label">{categoryLabels[category]}</span>
              {categoryTitles[category] || category}
            </h3>
            <div className="modules-grid">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`module-card ${module.tier}`}
                  onClick={() => (typeof onOpenDocs === 'function' ? onOpenDocs(module.id) : null)}
                  role={module.tier === 'locked' ? 'button' : 'button'}
                  tabIndex={0}
                >
                  <div className="module-header">
                    <h4>{module.title}</h4>
                    <span className="module-label">
                      {module.level === 'high-school' ? 'High School' : module.level === 'undergraduate' ? 'University' : ''}
                    </span>
                  </div>

                  <p className="module-description">{module.description}</p>

                  <div className="meta-row">
                    <div className="instructor">{module.instructor}</div>
                    <div className="price-badge">{module.priceCents === 0 ? 'Free' : `$${(module.priceCents/100).toFixed(2)}`}</div>
                  </div>

                  <ul className="module-highlights">
                    {getModuleHighlights(module).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="module-meta">
                    <span className="module-docs">{getDocsLabel(module)} included</span>
                    {module.tier === 'locked' && <span className="module-trial">10-second preview</span>}
                  </div>

                  <div className="module-footer">
                    {module.tier === 'free' && <span className="tier-badge free">Free Access</span>}
                    {module.tier === 'coming-soon' && <span className="tier-badge coming">Coming Soon</span>}
                    {module.tier === 'locked' && <span className="tier-badge locked">Premium Trial</span>}
                  </div>
                  <a href="https://www.freecodecamp.org/learn/" target="_blank" rel="noopener noreferrer" className="module-video-link" onClick={(e) => e.stopPropagation()}>
                    Open Course Docs
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="waitlist-section">
        <h2>Stay Updated</h2>
        <p>Get notified when new modules and features launch</p>
        <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Join Waitlist</button>
        </form>
        {submitted && <p className="success-message">Successfully added to waitlist!</p>}
        <p className="waitlist-count">{signups.toLocaleString()} students already joined</p>
      </div>
    </div>
  );
}
