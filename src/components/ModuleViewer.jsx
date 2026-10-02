import React, { useState, useEffect, useRef } from 'react';
import { modulesData } from '../data/modulesData';

// Custom Audio Player Component
function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio file not provided/loaded yet.', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio file not provided/loaded yet.', e));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!src) return null;

  return (
    <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg border border-outline-variant/20 shadow-sm mt-4 w-full md:max-w-md">
      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Play/Pause */}
      <button 
        onClick={togglePlay} 
        className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
        aria-label={isPlaying ? 'Pause Narasi' : 'Play Narasi'}
      >
        <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>

      {/* Replay */}
      <button 
        onClick={handleReplay} 
        className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors focus:outline-none" 
        aria-label="Ulangi Narasi"
      >
        <span className="material-symbols-outlined text-[18px]">replay</span>
      </button>

      {/* Mute/Volume */}
      <button 
        onClick={toggleMute} 
        className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors focus:outline-none" 
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <span className="material-symbols-outlined text-[18px]">{isMuted ? 'volume_off' : 'volume_up'}</span>
      </button>
      
      {/* Progress & Label */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium uppercase tracking-wider">
          <span>🔊 Dengarkan Penjelasan</span>
        </div>
        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

// Text & Formatting Renderer
function TextRenderer({ content }) {
  if (!content) return null;
  const paragraphs = content.split('\n\n');

  return (
    <div className="flex flex-col gap-space-md font-body-lg text-on-surface leading-[1.8]">
      {paragraphs.map((para, pIdx) => {
        // Handle Lists
        if (para.trim().startsWith('- ') || para.trim().startsWith('1. ')) {
          const items = para.trim().split('\n');
          return (
            <ul key={pIdx} className="list-disc pl-6 space-y-3 text-on-surface-variant marker:text-primary">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^[-*]\s+|^[0-9]+\.\s+/, '');
                return <li key={iIdx}>{renderInlineFormatting(cleanItem)}</li>;
              })}
            </ul>
          );
        }

        // Handle Math Formulas
        if (para.trim().startsWith('$$') && para.trim().endsWith('$$')) {
          const formulas = para.trim().split('\n');
          return (
            <div
              key={pIdx}
              className="my-6 p-space-lg bg-surface-container-lowest rounded-lg flex flex-col items-center justify-center overflow-x-auto text-center border border-outline-variant/20 shadow-sm"
            >
              {formulas.map((f, i) => {
                const cleanF = f.replace(/\$\$/g, '').trim();
                return (
                  <span key={i} className="font-code-lg text-[1.15rem] text-primary font-bold tracking-wide my-1">
                    {cleanF}
                  </span>
                );
              })}
            </div>
          );
        }
        
        // Blockquotes/Callouts for APA, MENGAPA, BAGAIMANA
        if (para.trim().startsWith('**APA?**') || para.trim().startsWith('**MENGAPA?**') || para.trim().startsWith('**BAGAIMANA?**') || para.trim().startsWith('**CONTOH?**') || para.trim().startsWith('**COBA!**')) {
           return (
             <div key={pIdx} className="bg-surface-container-low p-5 rounded-lg border-l-4 border-primary shadow-sm my-2">
               <p className="text-on-surface">
                 {renderInlineFormatting(para)}
               </p>
             </div>
           )
        }

        return (
          <p key={pIdx} className="text-on-surface-variant">
            {renderInlineFormatting(para)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text) {
  // Correct regex for matching bold or code blocks
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-bold text-on-surface">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="font-code-sm text-code-sm bg-surface-container-highest px-1.5 py-0.5 rounded text-secondary shadow-sm">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function ModuleViewer({ moduleId, onNavigateToSim, onCompleteModule, completedModules = [] }) {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTopicIndex, moduleId]);

  const currentModule = modulesData.find(m => m.id === moduleId) || modulesData[0];
  const isCompleted = Array.isArray(completedModules) && completedModules.includes(currentModule.id);
  const currentTopic = currentModule.topics[activeTopicIndex] || currentModule.topics[0];
  const progressPercent = Math.round(((activeTopicIndex + 1) / currentModule.topics.length) * 100);

  return (
    <div className="flex flex-col w-full animate-fade-in pb-16">
      {/* Sub-header / Academic Meta Bar */}
      <section className="w-full bg-surface-container-lowest px-gutter-lg py-space-sm shadow-sm border-b border-outline-variant/10">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-on-surface-variant flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              E-Modul
            </span>
            <span className="text-outline-variant">/</span>
            <span className="hover:text-on-surface transition-colors">{currentModule.category}</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-medium">{currentModule.title.split('—')[0].trim()}</span>
          </div>
        </div>
      </section>

      {/* Main E-Modul Workbench */}
      <div className="w-full px-gutter lg:px-gutter-lg py-space-lg">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDEBAR: Daftar Isi & Progress */}
          <aside className="lg:col-span-3 flex flex-col gap-6 lg:sticky top-24 hidden lg:flex">
            {/* Progress Card */}
            <div className="p-space-md bg-surface-container-low rounded-lg shadow-sm border border-outline-variant/10 flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Progress Membaca</span>
                <span className="font-code-sm text-code-sm text-primary font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="font-code-sm text-code-sm text-on-surface-variant">Halaman {activeTopicIndex + 1} dari {currentModule.topics.length}</p>
            </div>

            {/* Navigation Menu (Daftar Isi) */}
            <nav aria-label="Daftar Isi Modul" className="flex flex-col gap-1 p-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/10">
              <h3 className="font-headline-sm text-xs text-on-surface-variant font-bold uppercase tracking-wider px-3 py-2 border-b border-outline-variant/10 mb-2">
                Daftar Isi
              </h3>
              {currentModule.topics.map((topic, idx) => {
                const isActive = activeTopicIndex === idx;
                const isPassed = activeTopicIndex > idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTopicIndex(idx)}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded transition-all text-left ${isActive ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : isPassed ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
                      <span className="font-body-sm text-[0.85rem] leading-snug">{topic.title}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
            
            {/* CTA Simulasi Lab */}
            <button
              onClick={() => onNavigateToSim(currentModule.id)}
              className="flex items-center justify-center gap-2 p-3 w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 rounded-lg transition-colors group shadow-sm text-left"
            >
               <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                 <span className="material-symbols-outlined">experiment</span>
               </div>
               <div className="flex flex-col">
                 <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Aksi</span>
                 <span className="font-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors">Buka Image Lab</span>
               </div>
            </button>
          </aside>

          {/* MAIN COLUMN: Flipbook Reading Experience */}
          <main className="lg:col-span-9 flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden relative">
            
            {/* Page Header Area */}
            <header className="p-8 md:p-12 pb-6 border-b border-outline-variant/10 bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
              <div className="flex flex-col gap-4">
                <span className="font-label-md text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                  Halaman {activeTopicIndex + 1}
                </span>
                <h1 className="font-display-sm md:font-display-md text-on-surface font-extrabold leading-tight tracking-tight">
                  {currentTopic.title}
                </h1>
                
                {/* Audio Narration Component */}
                {currentTopic.audioUrl && (
                  <AudioPlayer src={currentTopic.audioUrl} />
                )}
              </div>
            </header>
            
            {/* Page Content Body */}
            <article className="p-8 md:p-12 pt-6 min-h-[400px]">
              
              {/* Learning Goal Callout (Optional) */}
              {currentTopic.learningGoal && (
                <div className="mb-8 p-4 bg-primary/5 rounded-lg border-l-4 border-primary flex gap-4 items-start">
                   <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">lightbulb</span>
                   <p className="font-body-md text-on-surface font-medium italic">
                     {currentTopic.learningGoal}
                   </p>
                </div>
              )}

              <TextRenderer content={currentTopic.content} />
              
              {/* Observation Points Checklist */}
              {currentTopic.observationPoints && currentTopic.observationPoints.length > 0 && (
                <div className="mt-10 p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <h3 className="font-headline-sm text-on-surface font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">visibility</span>
                    Poin Pengamatan Simulasi
                  </h3>
                  <ul className="space-y-3">
                    {currentTopic.observationPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2 bg-secondary rounded-full shrink-0"></span>
                        <span className="font-body-md text-on-surface">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* Flipbook Pagination Footer */}
            <footer className="p-6 md:p-8 border-t border-outline-variant/10 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setActiveTopicIndex(prev => Math.max(0, prev - 1))}
                disabled={activeTopicIndex === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-high bg-surface-container shadow-sm border border-outline-variant/20 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Halaman Sebelumnya</span>
              </button>
              
              <div className="font-code-sm font-medium text-on-surface-variant flex items-center gap-2">
                <span>{activeTopicIndex + 1}</span>
                <span className="text-outline-variant">/</span>
                <span>{currentModule.topics.length}</span>
              </div>
              
              {activeTopicIndex < currentModule.topics.length - 1 ? (
                <button 
                  onClick={() => setActiveTopicIndex(prev => prev + 1)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Halaman Berikutnya</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button 
                  onClick={() => onNavigateToSim(currentModule.id)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all bg-secondary text-on-secondary hover:bg-secondary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[18px]">experiment</span>
                  <span>🔬 Coba di Image Lab</span>
                </button>
              )}
            </footer>
          </main>

        </div>
      </div>
    </div>
  );
}
