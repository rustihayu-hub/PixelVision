import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import confetti from 'canvas-confetti';

export default function QuizEngine({ onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [globalTime, setGlobalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = quizQuestions[currentIndex];
  // Calculate progress correctly (prevent division by 0)
  const progressPercent = quizQuestions.length > 0 
    ? Math.round(((currentIndex) / quizQuestions.length) * 100) 
    : 0;

  // Global Timer
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setGlobalTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (idx) => {
    if (answers[currentIndex] !== undefined) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      calculateFinalResult();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateFinalResult = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quizQuestions.length) * 100);
    setScore(finalScore);
    setIsFinished(true);

    if (finalScore >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti animation failed:', e);
      }
    }

    if (onQuizComplete) {
      onQuizComplete(finalScore, correctCount);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setGlobalTime(0);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="w-full px-gutter lg:px-gutter-lg py-space-xl flex flex-col gap-space-2xl animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-surface-container-high pb-space-lg">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm font-label-md text-label-md text-secondary uppercase tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary-container"></span>
            <span>Semester Ganjil 2024 • Lab Komputasi Visi</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            KUIS EVALUASI — MODUL 01: OPERASI DASAR CITRA
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Pemeriksaan pemahaman konsep matematis piksel, manipulasi histogram, dan pemetaan intensitas skalar.
          </p>
        </div>

        {/* Execution Timer & Metadata Pill */}
        <div className="flex items-center gap-space-md self-start md:self-auto bg-surface-container-lowest p-space-xs rounded-lg shadow-sm">
          <div className="flex items-center gap-space-sm px-space-md py-space-xs bg-surface-container-low rounded">
            <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Waktu Berjalan</span>
              <span className="font-code-sm text-code-sm text-on-surface font-medium">
                {formatTime(globalTime)}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col px-space-md py-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Metode Evaluasi</span>
            <span className="font-code-sm text-code-sm text-secondary">Deterministic Grading</span>
          </div>
        </div>
      </div>

      {/* Live Evaluation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        
        {/* Left Column: Question Canvas OR Result Diagnostic (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          
          {/* STATE 1: QUIZ ONGOING */}
          {!isFinished && (
            <>
              {/* Progress Bar & Question Step Meta */}
              <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <div className="flex items-center justify-between font-label-md text-label-md">
                  <div className="flex items-center gap-space-xs text-on-surface">
                    <span className="text-primary font-bold">PERNYATAAN {String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="text-on-surface-variant">DARI {quizQuestions.length} SOAL</span>
                  </div>
                  <span className="font-code-sm text-code-sm text-primary">{progressPercent}% SELESAI</span>
                </div>
                {/* Progress Track */}
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-surface-container p-space-lg rounded-xl shadow-md flex flex-col gap-space-lg">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
                  <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    Domain Spasial: Titik Intensitas
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Bobot: 10 Poin</span>
                </div>
                
                <div className="flex flex-col gap-space-md">
                  <p className="font-body-lg text-body-lg text-on-surface leading-relaxed font-normal">
                    {currentQ.question}
                  </p>
                  
                  {/* Conditionally render formula if provided (easter egg functionality) */}
                  {currentQ.formula && (
                    <div className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-md">
                      <div className="flex flex-col gap-space-xs">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Rumus Transformasi Terkait:</span>
                        <span className="font-code-sm text-code-sm text-primary tracking-wide">
                          {currentQ.formula}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant text-[24px]">functions</span>
                    </div>
                  )}
                </div>

                {/* Options Grid */}
                <div className="flex flex-col gap-space-sm pt-space-xs">
                  {currentQ.options.map((opt, idx) => {
                    const isAnswered = answers[currentIndex] !== undefined;
                    const isSelected = answers[currentIndex] === idx;
                    const isCorrect = idx === currentQ.answer;

                    let btnClasses = "w-full text-left p-space-md bg-surface-container-low hover:bg-surface-container-high transition-all rounded-lg flex items-center justify-between group";
                    let letterBg = "bg-surface-container-high text-on-surface-variant group-hover:text-on-surface";
                    let textClasses = "text-on-surface-variant group-hover:text-on-surface";
                    let statusEl = null;

                    if (isAnswered) {
                      if (isCorrect) {
                        btnClasses = "w-full text-left p-space-md bg-primary-container/20 ring-2 ring-primary transition-all rounded-lg flex items-center justify-between shadow-sm";
                        letterBg = "bg-primary text-on-primary font-bold";
                        textClasses = "text-on-surface font-medium";
                        statusEl = (
                          <div className="flex items-center gap-space-xs text-primary font-code-sm text-code-sm">
                            <span>{isSelected ? 'PILIHAN ANDA' : 'JAWABAN BENAR'}</span>
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          </div>
                        );
                      } else if (isSelected && !isCorrect) {
                        btnClasses = "w-full text-left p-space-md bg-error-container/20 ring-2 ring-error transition-all rounded-lg flex items-center justify-between shadow-sm";
                        letterBg = "bg-error text-on-error font-bold";
                        textClasses = "text-on-surface font-medium";
                        statusEl = (
                          <div className="flex items-center gap-space-xs text-error font-code-sm text-code-sm">
                            <span>SALAH</span>
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                          </div>
                        );
                      } else {
                        btnClasses = "w-full text-left p-space-md bg-surface-container-lowest transition-all rounded-lg flex items-center justify-between opacity-60";
                      }
                    }

                    return (
                      <button 
                        key={idx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={btnClasses}
                      >
                        <div className="flex items-center gap-space-md">
                          <span className={`w-7 h-7 rounded flex items-center justify-center font-code-sm text-code-sm ${letterBg}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className={`font-body-md text-body-md ${textClasses}`}>
                            {opt}
                          </span>
                        </div>
                        {statusEl}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Verification & Feedback Box */}
                {answers[currentIndex] !== undefined && (
                  <div className="bg-surface-container-lowest rounded-lg p-space-md flex flex-col gap-space-xs mt-space-xs animate-fade-in">
                    <div className={`flex items-center gap-space-xs ${answers[currentIndex] === currentQ.answer ? 'text-secondary' : 'text-error'}`}>
                      <span className="material-symbols-outlined text-[20px]">
                        {answers[currentIndex] === currentQ.answer ? 'task_alt' : 'error'}
                      </span>
                      <span className="font-code-sm text-code-sm font-semibold tracking-wide uppercase">
                        {answers[currentIndex] === currentQ.answer ? '✓ Jawaban Tepat!' : '✗ Jawaban Kurang Tepat'}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pl-7">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-space-md border-t border-surface-container-high">
                  <button 
                    onClick={handlePrevQuestion}
                    disabled={currentIndex === 0}
                    className={`px-space-lg py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm rounded-lg flex items-center gap-space-xs transition-colors ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Sebelumnya</span>
                  </button>
                  <button 
                    onClick={handleNextQuestion}
                    disabled={answers[currentIndex] === undefined}
                    className={`px-space-lg py-space-sm bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-medium rounded-lg flex items-center gap-space-xs shadow-md transition-all ${answers[currentIndex] === undefined ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                  >
                    <span>{currentIndex < quizQuestions.length - 1 ? 'Selanjutnya' : 'Selesai & Evaluasi'}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {currentIndex < quizQuestions.length - 1 ? 'arrow_forward' : 'done_all'}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STATE 2: QUIZ FINISHED (DIAGNOSTIC CARD) */}
          {isFinished && (
            <div className="flex flex-col gap-space-lg animate-fade-in">
              <div className="bg-surface-container p-space-lg rounded-xl shadow-md flex flex-col gap-space-lg">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">analytics</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">HASIL EVALUASI MAHASISWA</span>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-secondary-container text-on-secondary-container rounded font-semibold uppercase">
                    Verifikasi Selesai
                  </span>
                </div>
                
                {/* Big Score Meter */}
                <div className="bg-surface-container-lowest p-space-lg rounded-lg flex flex-col sm:flex-row items-center justify-between gap-space-lg">
                  <div className="flex items-center gap-space-lg">
                    {/* Radial Progress SVG representation */}
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                        <path className={`${score >= 70 ? 'text-primary' : 'text-error'} transition-all duration-1000 ease-out`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${score}, 100`} strokeLinecap="round" strokeWidth="3"></path>
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="font-display-lg text-headline-lg font-bold text-on-surface leading-none">{score}</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">/ 100</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Skor Kelulusan</span>
                      <span className="font-body-sm text-body-sm text-secondary font-medium">
                        {Math.round((score/100)*quizQuestions.length)} dari {quizQuestions.length} jawaban benar
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant pt-space-xs">
                        Status: {score >= 70 ? 'Kategori Sangat Baik (Lulus Modul)' : 'Remedial Direkomendasikan'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="grid grid-cols-2 gap-space-xs">
                    <button onClick={resetQuiz} className="py-space-sm px-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm rounded-lg flex items-center justify-center gap-space-xs transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">replay</span>
                      <span>Ulangi Kuis</span>
                    </button>
                    <button className="py-space-sm px-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm rounded-lg flex items-center justify-center gap-space-xs transition-colors" type="button" disabled>
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                      <span>Pembahasan (WIP)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Achievement Unlocked Mini Card */}
              {score >= 70 && (
                <div className="bg-gradient-to-br from-surface-container via-surface-container to-surface-container-low p-space-md rounded-xl shadow-md flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">Achievement Diperoleh</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    </div>
                    <span className="font-code-sm text-code-sm text-on-surface font-bold truncate">HISTOGRAM MASTER</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Berhasil menyelesaikan kuis Modul 01 dengan skor memuaskan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Supplementary Histogram panel */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="w-full bg-surface-container p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-surface-container-high pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">DISTRIBUSI HISTOGRAM</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-space-lg items-center">
              {/* Left/Top: Original Histogram Chart */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col gap-space-sm">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant font-medium uppercase">Input (Rendah Kontras)</span>
                  <span className="text-tertiary font-code-sm">Range: [65 - 145]</span>
                </div>
                {/* Inline SVG Representation of Compressed Histogram */}
                <div className="h-32 w-full flex items-end">
                  <svg className="w-full h-full text-outline-variant" preserveAspectRatio="none" viewBox="0 0 256 100">
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="25" y2="25"></line>
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="50" y2="50"></line>
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="75" y2="75"></line>
                    <path d="M 0 100 L 60 100 L 75 95 L 90 70 L 105 20 L 115 5 L 125 18 L 135 75 L 145 92 L 160 100 L 256 100 Z" fill="currentColor" fillOpacity="0.4"></path>
                  </svg>
                </div>
                <div className="flex justify-between font-code-sm text-code-sm text-on-surface-variant">
                  <span>0</span><span>64</span><span>128</span><span>192</span><span>255</span>
                </div>
              </div>

              {/* Right/Bottom: Equalized Histogram Chart */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg flex flex-col gap-space-sm">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-secondary font-medium uppercase">Output (Equalization)</span>
                  <span className="text-secondary font-code-sm">Range: [0 - 255]</span>
                </div>
                {/* Inline SVG Representation of Equalized Histogram */}
                <div className="h-32 w-full flex items-end">
                  <svg className="w-full h-full text-secondary-container" preserveAspectRatio="none" viewBox="0 0 256 100">
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="25" y2="25"></line>
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="50" y2="50"></line>
                    <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="256" y1="75" y2="75"></line>
                    <path d="M 5 95 L 15 55 L 25 50 L 40 52 L 60 48 L 80 50 L 100 47 L 120 51 L 140 48 L 160 53 L 180 49 L 200 52 L 220 50 L 240 48 L 250 90 L 256 100 L 0 100 Z" fill="currentColor" fillOpacity="0.3"></path>
                    <line stroke="#b9c3ff" strokeDasharray="4" strokeWidth="2" x1="5" x2="250" y1="95" y2="10"></line>
                  </svg>
                </div>
                <div className="flex justify-between font-code-sm text-code-sm text-on-surface-variant">
                  <span>0</span><span>64</span><span>128</span><span>192</span><span>255</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
