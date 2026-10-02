import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ModuleViewer from './components/ModuleViewer';
import InteractiveLab from './components/InteractiveLab';
import QuizEngine from './components/QuizEngine';
import AchievementView from './components/AchievementView';
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
  const [currentView, setCurrentView] = useState('home');
  const [selectedModuleId, setSelectedModuleId] = useState('histogram');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="app-container bg-background min-h-screen flex flex-col text-on-surface font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        <div className="h-16 w-full px-gutter-lg flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="xl:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">{sidebarOpen ? 'close' : 'menu'}</span>
            </button>
            <div 
              className="flex flex-col cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold uppercase leading-none">PixelVision</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider pt-space-xs">Digital Image Processing Lab</span>
            </div>
          </div>
          <nav className="hidden xl:flex items-center gap-space-xs p-1 bg-surface-container-lowest rounded-lg">
            <button onClick={() => setCurrentView('home')} className={`px-space-md py-space-sm transition-all font-medium rounded-lg ${currentView === 'home' ? 'bg-surface-container-high text-primary' : 'font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>Beranda</button>
            <button onClick={() => { setSelectedModuleId('histogram'); setCurrentView('module'); }} className={`px-space-md py-space-sm transition-all font-medium rounded-lg ${currentView === 'module' ? 'bg-surface-container-high text-primary' : 'font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>Modul</button>
            <button onClick={() => setCurrentView('lab')} className={`px-space-md py-space-sm transition-all font-medium rounded-lg ${currentView === 'lab' ? 'bg-surface-container-high text-primary' : 'font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>Simulasi Lab</button>
            <button onClick={() => setCurrentView('quiz')} className={`px-space-md py-space-sm transition-all font-medium rounded-lg ${currentView === 'quiz' ? 'bg-surface-container-high text-primary' : 'font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>Kuis &amp; Evaluasi</button>
            <button onClick={() => setCurrentView('achievement')} className={`px-space-md py-space-sm transition-all font-medium rounded-lg ${currentView === 'achievement' ? 'bg-surface-container-high text-primary' : 'font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>Pencapaian</button>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center gap-space-sm px-space-md py-space-xs bg-surface-container-low rounded-full">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Progres Belajar:</span>
              <span className="font-code-sm text-code-sm text-secondary font-medium">{Math.min(100, Math.round((completedModules.length / 5) * 100))}%</span>
              <div className="w-12 h-1.5 bg-surface-container-highest rounded-full overflow-hidden ml-space-xs">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: `${Math.min(100, Math.round((completedModules.length / 5) * 100))}%` }}></div>
              </div>
            </div>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
            <div className="flex items-center gap-space-sm pl-space-sm">
              <div className="hidden lg:flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-on-surface font-medium leading-tight">Mahasiswa</span>
                <span className="font-label-sm text-label-sm text-secondary leading-tight">Lab Active</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col w-64 max-w-sm h-full bg-surface-container-lowest border-r border-outline-variant/20 shadow-xl p-4 gap-2 z-50">
            <h4 className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">Navigasi Utama</h4>
            <button onClick={() => { setCurrentView('home'); setSidebarOpen(false); }} className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'home' ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>Beranda</button>
            <button onClick={() => { handleSelectModule('histogram'); }} className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'module' ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>Modul Materi</button>
            <button onClick={() => { setCurrentView('lab'); setSidebarOpen(false); }} className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'lab' ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>Simulasi Lab</button>
            <button onClick={() => { setCurrentView('quiz'); setSidebarOpen(false); }} className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'quiz' ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>Kuis &amp; Evaluasi</button>
            <button onClick={() => { setCurrentView('achievement'); setSidebarOpen(false); }} className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'achievement' ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container'}`}>Pencapaian</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 bg-background flex flex-col">
        {currentView === 'home' && (
          <div className="p-gutter-lg flex-1">
            <LandingPage
              onStart={() => { setSelectedModuleId('histogram'); setCurrentView('module'); }}
              onSelectModule={handleSelectModule}
            />
          </div>
        )}

        {currentView === 'module' && (
          <ModuleViewer
            key={`module-${selectedModuleId}`}
            moduleId={selectedModuleId}
            onNavigateToSim={handleNavigateToSim}
            onCompleteModule={handleCompleteModule}
            completedModules={completedModules}
          />
        )}

        {currentView === 'lab' && (
          <div className="p-gutter-lg flex-1">
            <InteractiveLab key={`lab-${selectedModuleId}`} initialMode={selectedModuleId} />
          </div>
        )}

        {currentView === 'quiz' && (
          <div className="p-gutter-lg flex-1">
            <QuizEngine onQuizComplete={handleQuizComplete} />
          </div>
        )}

        {currentView === 'achievement' && (
          <div className="p-gutter-lg flex-1">
            <AchievementView
              completedModules={Array.isArray(completedModules) ? completedModules : []}
              quizScore={quizScore}
              onResetProgress={handleResetProgress}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest py-space-md border-t border-outline-variant/10">
        <div className="w-full px-gutter-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm font-code-sm text-code-sm text-on-surface-variant">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary-container"></span>
            <span>Kernel Engine: v4.2-wasm</span>
            <span className="text-outline-variant">•</span>
            <span>OpenCV Embedded</span>
            <span className="text-outline-variant">•</span>
            <span>Pipeline: Operational</span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">© 2026 PixelVision Computational Laboratory. All academic research rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
