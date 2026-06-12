import { useState } from 'react';
import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Labs from './pages/Labs';
import AITutor from './pages/AITutor';
import Quiz from './pages/Quiz';
import './styles/global.css';

function App() {
  const [activeNav, setActiveNav] = useState('landing');
  const [hasEntered, setHasEntered] = useState(false);

  const getPageTitle = () => {
    const titles = {
      home: 'Home',
      labs: 'Digital Logic Labs',
      tutor: 'AI Tutor (ZARA)',
      quiz: 'Quiz',
    };
    return titles[activeNav] || 'LabSim Africa';
  };

  const renderPage = () => {
    if (activeNav === 'landing' || !hasEntered) {
      return <Landing onEnter={() => { setHasEntered(true); setActiveNav('home'); }} />;
    }

    switch (activeNav) {
      case 'home':
        return <Home />;
      case 'labs':
        return <Labs />;
      case 'tutor':
        return <AITutor />;
      case 'quiz':
        return <Quiz />;
      default:
        return <Home />;
    }
  };

  if (!hasEntered) {
    return renderPage();
  }

  return (
    <div className="app">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main-content">
        <Topbar pageTitle={getPageTitle()} />
        <div className="page-container">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
