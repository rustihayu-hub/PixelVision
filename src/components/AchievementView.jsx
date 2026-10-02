import React from 'react';
import { Award, CheckCircle, Clock, BookOpen, Star, RefreshCw } from 'lucide-react';

export default function AchievementView({ completedModules = [], quizScore = null, onResetProgress }) {
  const totalModules = 3;
  const progressPercent = Math.round((completedModules.length / totalModules) * 100);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Achievement Header */}
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', marginBottom: '30px' }}>
        <Award size={56} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>Pencapaian Belajar Anda</h1>
        <p style={{ color: 'var(--text-muted)' }}>Pantau kemajuan modul, skor kuis, serta lencana penghargaan yang berhasil diraih.</p>
        
        {/* Progress Bar */}
        <div style={{ maxWidth: '500px', margin: '24px auto 0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
            <span>Progress Pembelajaran Keseluruhan</span>
            <span style={{ color: 'var(--primary)' }}>{progressPercent}%</span>
          </div>
          <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #5170FF, #06b6d4)', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <BookOpen style={{ color: 'var(--primary)' }} size={24} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Modul Tuntas</h3>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{completedModules.length} / {totalModules}</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {completedModules.length === 3 ? 'Seluruh modul telah diselesaikan' : 'Selesaikan modul tersisa untuk klaim sertifikat'}
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Star style={{ color: 'var(--warning)' }} size={24} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Skor Kuis Tertinggi</h3>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: quizScore !== null ? 'var(--warning)' : 'var(--text-muted)' }}>
            {quizScore !== null ? `${quizScore} / 100` : 'Belum Dikerjakan'}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {quizScore >= 70 ? 'Status: LULUS SANGAT MEMUASKAN' : 'Dapatkan skor >= 70 untuk kelulusan'}
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Clock style={{ color: 'var(--accent-purple)' }} size={24} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Waktu Akses</h3>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>Self-Paced</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pembelajaran mandiri interaktif</p>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Koleksi Lencana (Badges)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: completedModules.length > 0 ? 'rgba(81, 112, 255, 0.1)' : 'rgba(255,255,255,0.02)',
            border: completedModules.length > 0 ? '1px solid rgba(81, 112, 255, 0.3)' : '1px solid rgba(255,255,255,0.05)',
            opacity: completedModules.length > 0 ? 1 : 0.4
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>🏅 Pixel Pioneer</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Menyelesaikan modul pertama pengolahan citra digital.</p>
          </div>

          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: quizScore >= 70 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.02)',
            border: quizScore >= 70 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.05)',
            opacity: quizScore >= 70 ? 1 : 0.4
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>🎓 Image Master</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mencapai skor kuis diatas 70.</p>
          </div>

          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: completedModules.length === 3 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
            border: completedModules.length === 3 ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(255,255,255,0.05)',
            opacity: completedModules.length === 3 ? 1 : 0.4
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>⚡ Algorithm Specialist</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Menuntaskan 3 modul utama pengolahan citra.</p>
          </div>

        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onResetProgress} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={16} /> Reset Seluruh Progress Belajar
        </button>
      </div>

    </div>
  );
}
