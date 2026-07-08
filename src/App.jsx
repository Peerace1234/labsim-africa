import { useState } from 'react';
import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Labs from './pages/Labs';
import AITutor from './pages/AITutor';
import Quiz from './pages/Quiz';
import Docs from './pages/Docs';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles/global.css';

function App() {
  const [activeNav, setActiveNav] = useState(() => localStorage.getItem('labsim_activeNav') || 'landing');
  const [hasEntered, setHasEntered] = useState(() => localStorage.getItem('labsim_hasEntered') === '1');
  const [selectedModule, setSelectedModule] = useState(null);

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
      return (
        <Landing
            onEnter={() => { setHasEntered(true); setActiveNav('home'); localStorage.setItem('labsim_hasEntered','1'); localStorage.setItem('labsim_activeNav','home'); }}
            onNavigate={(id) => { setHasEntered(true); setActiveNav(id); localStorage.setItem('labsim_hasEntered','1'); localStorage.setItem('labsim_activeNav',id); }}
          />
      );
    }

    switch (activeNav) {
      case 'home':
        return <Home onOpenDocs={(id) => { setSelectedModule(id); setActiveNav('docs'); }} />;
      case 'labs':
        return <Labs />;
      case 'tutor':
        return <AITutor />;
      case 'quiz':
        return <Quiz />;
      case 'docs':
        return <Docs moduleId={selectedModule} onBack={() => setActiveNav('home')} />;
      case 'signup':
        return <Signup />;
      case 'login':
        return <Login />;
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
