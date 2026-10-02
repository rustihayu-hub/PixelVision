import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ModuleViewer from './components/ModuleViewer';
import InteractiveLab from './components/InteractiveLab';
import QuizEngine from './components/QuizEngine';
import AchievementView from './components/AchievementView';
import { Layout, BookOpen, Layers, Award, HelpCircle, Menu, X } from 'lucide-react';
import './App.css';

// Safe LocalStorage helpers
const getSafeLocalStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from LocalStorage:`, e);
    return fallback;
  }
};

const setSafeLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to LocalStorage:`, e);
  }
};

function App() {
  // Navigation View State: 'home' | 'module' | 'lab' | 'quiz' | 'achievement'
  const [currentView, setCurrentView] = useState('home');
  const [selectedModuleId, setSelectedModuleId] = useState('histogram');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persistent user state in LocalStorage with safe fallbacks
  const [completedModules, setCompletedModules] = useState(() => 
    getSafeLocalStorage('pixelvision_completed_modules', [])
  );

  const [quizScore, setQuizScore] = useState(() => 
    getSafeLocalStorage('pixelvision_quiz_score', null)
  );

  useEffect(() => {
    setSafeLocalStorage('pixelvision_completed_modules', completedModules);
  }, [completedModules]);

  useEffect(() => {
    setSafeLocalStorage('pixelvision_quiz_score', quizScore);
  }, [quizScore]);

  const handleSelectModule = (modId) => {
    setSelectedModuleId(modId);
    setCurrentView('module');
    setSidebarOpen(false);
  };

  const handleNavigateToSim = (modId) => {
    setSelectedModuleId(modId);
    setCurrentView('lab');
    setSidebarOpen(false);
  };

  const handleCompleteModule = (modId) => {
    if (Array.isArray(completedModules) && !completedModules.includes(modId)) {
      setCompletedModules(prev => [...prev, modId]);
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
  };

  const handleResetProgress = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh progress pembelajaran?')) {
      setCompletedModules([]);
      setQuizScore(null);
      try {
        localStorage.removeItem('pixelvision_completed_modules');
        localStorage.removeItem('pixelvision_quiz_score');
      } catch (e) {
        console.warn('Error clearing LocalStorage', e);
      }
    }
  };

  return (
    <div className="app-container">
      
      {/* Top Navbar */}
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(11, 15, 25, 0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-secondary"
            style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle Menu Navigasi"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div
            onClick={() => setCurrentView('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary), #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(81, 112, 255, 0.4)'
            }}>
              P
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Pixel<span style={{ color: 'var(--primary)' }}>Vision</span>
            </span>
          </div>
        </div>

        {/* Desktop Navbar Links */}
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }} aria-label="Menu Utama">
          <button
            onClick={() => setCurrentView('home')}
            className={currentView === 'home' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            Beranda
          </button>
          <button
            onClick={() => { setSelectedModuleId('histogram'); setCurrentView('module'); }}
            className={currentView === 'module' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            Modul Materi
          </button>
          <button
            onClick={() => setCurrentView('lab')}
            className={currentView === 'lab' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Layers size={16} /> Image Lab
          </button>
          <button
            onClick={() => setCurrentView('quiz')}
            className={currentView === 'quiz' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <HelpCircle size={16} /> Game Kuis
          </button>
          <button
            onClick={() => setCurrentView('achievement')}
            className={currentView === 'achievement' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Award size={16} /> Pencapaian
          </button>
        </nav>
      </header>

      {/* Slide-out Navigation Drawer */}
      {sidebarOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'fixed',
          top: '65px',
          left: '20px',
          zIndex: 99,
          width: '280px',
          padding: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            NAVIGASI CEPAT
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => { setCurrentView('home'); setSidebarOpen(false); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <Layout size={16} /> Beranda / Utama
            </button>
            <button onClick={() => { handleSelectModule('histogram'); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <BookOpen size={16} /> Modul 1: Histogram Eq
            </button>
            <button onClick={() => { handleSelectModule('filtering'); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <BookOpen size={16} /> Modul 2: Enhancement & Filter
            </button>
            <button onClick={() => { handleSelectModule('edge'); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <BookOpen size={16} /> Modul 3: Segmentasi & Tepi
            </button>
            <button onClick={() => { setCurrentView('lab'); setSidebarOpen(false); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <Layers size={16} /> Image Lab Simulasi
            </button>
            <button onClick={() => { setCurrentView('quiz'); setSidebarOpen(false); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <HelpCircle size={16} /> Game Kuis / Evaluasi
            </button>
            <button onClick={() => { setCurrentView('achievement'); setSidebarOpen(false); }} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <Award size={16} /> Skor & Pencapaian
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px 20px' }}>
        {currentView === 'home' && (
          <LandingPage
            onStart={() => { setSelectedModuleId('histogram'); setCurrentView('module'); }}
            onSelectModule={handleSelectModule}
          />
        )}

        {currentView === 'module' && (
          <ModuleViewer
            moduleId={selectedModuleId}
            onNavigateToSim={handleNavigateToSim}
            onCompleteModule={handleCompleteModule}
            completedModules={completedModules}
          />
        )}

        {currentView === 'lab' && (
          <InteractiveLab initialMode={selectedModuleId} />
        )}

        {currentView === 'quiz' && (
          <QuizEngine onQuizComplete={handleQuizComplete} />
        )}

        {currentView === 'achievement' && (
          <AchievementView
            completedModules={Array.isArray(completedModules) ? completedModules : []}
            quizScore={quizScore}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--text-muted)',
        fontSize: '0.88rem'
      }}>
        PixelVision © 2026 — Interactive Digital Image Processing Learning Media. Built with React & Canvas API.
      </footer>

    </div>
  );
}

export default App;
