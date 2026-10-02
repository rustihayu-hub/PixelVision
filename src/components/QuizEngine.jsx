import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import confetti from 'canvas-confetti';
import { HelpCircle, Clock, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

export default function QuizEngine({ onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = quizQuestions[currentIndex];

  // Timer per question
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isFinished]);

  const handleSelectOption = (idx) => {
    if (answers[currentIndex] !== undefined) return; // Answer locked
    setSelectedOption(idx);
    setAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
      setTimeLeft(30);
    } else {
      // Finish Quiz
      calculateFinalResult();
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
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    if (onQuizComplete) {
      onQuizComplete(finalScore, correctCount);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setTimeLeft(30);
    setIsFinished(false);
    setScore(0);
  };

  if (isFinished) {
    const passed = score >= 70;
    return (
      <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', paddingBottom: '60px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: passed ? 'var(--success-light)' : 'var(--error-light)',
            color: passed ? 'var(--success)' : 'var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <Award size={40} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>
            {passed ? 'Selamat! Anda Lulus Kuis 🎉' : 'Tetap Semangat! Ulangi Kuis 💪'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {passed ? 'Anda berhasil menguasai konsep dasar Pengolahan Citra Digital!' : 'Pelajari kembali materi modul untuk tingkatkan pemahaman Anda.'}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '30px',
            background: 'rgba(255,255,255,0.03)',
            padding: '20px',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SKOR AKHIR</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: passed ? 'var(--success)' : 'var(--warning)' }}>{score} / 100</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BENAR</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>
                {Object.keys(answers).filter(idx => answers[idx] === quizQuestions[idx].answer).length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>STATUS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '8px', color: passed ? 'var(--success)' : 'var(--error)' }}>
                {passed ? 'TUNTAS' : 'REMIDI'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={resetQuiz} className="btn-secondary">
              <RotateCcw size={18} /> Ulangi Kuis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Quiz Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginRight: '10px' }}>Game Kuis</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Soal {currentIndex + 1} dari {quizQuestions.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: timeLeft <= 5 ? 'var(--error)' : 'var(--warning)', fontWeight: 700 }}>
          <Clock size={18} /> {timeLeft} detik
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', lineHeight: 1.5 }}>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentQ.options.map((opt, idx) => {
            const isAnswered = answers[currentIndex] !== undefined;
            const isSelected = answers[currentIndex] === idx;
            const isCorrect = idx === currentQ.answer;

            let bg = 'rgba(255, 255, 255, 0.04)';
            let borderColor = 'rgba(255, 255, 255, 0.1)';
            let textColor = 'var(--text-main)';

            if (isAnswered) {
              if (isCorrect) {
                bg = 'rgba(34, 197, 94, 0.15)';
                borderColor = 'rgba(34, 197, 94, 0.4)';
                textColor = '#4ade80';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(239, 68, 68, 0.15)';
                borderColor = 'rgba(239, 68, 68, 0.4)';
                textColor = '#f87171';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: bg,
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition)'
                }}
              >
                <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={18} style={{ color: 'var(--error)' }} />}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Discussion Box */}
        {answers[currentIndex] !== undefined && (
          <div style={{
            background: 'rgba(81, 112, 255, 0.08)',
            border: '1px solid rgba(81, 112, 255, 0.2)',
            padding: '16px 20px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '0.88rem',
            lineHeight: 1.6
          }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>💡 Pembahasan:</div>
            {currentQ.explanation}
          </div>
        )}

        {/* Next Question Control */}
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={handleNextQuestion}
            disabled={answers[currentIndex] === undefined}
            className="btn-primary"
            style={{ opacity: answers[currentIndex] === undefined ? 0.5 : 1 }}
          >
            {currentIndex < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'} <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
