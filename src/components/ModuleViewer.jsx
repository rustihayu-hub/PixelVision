import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { BookOpen, Code, Play, ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ModuleViewer({ moduleId, onNavigateToSim, onCompleteModule, completedModules = [] }) {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const currentModule = modulesData.find(m => m.id === moduleId) || modulesData[0];
  const isCompleted = completedModules.includes(currentModule.id);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
          {currentModule.category}
        </span>
        <button
          onClick={() => onCompleteModule(currentModule.id)}
          className={isCompleted ? 'btn-secondary' : 'btn-primary'}
          style={{
            background: isCompleted ? 'rgba(34, 197, 94, 0.15)' : undefined,
            color: isCompleted ? '#4ade80' : undefined,
            borderColor: isCompleted ? 'rgba(34, 197, 94, 0.3)' : undefined
          }}
        >
          <CheckCircle size={18} /> {isCompleted ? 'Materi Selesai ✓' : 'Tandai Selesai'}
        </button>
      </div>

      {/* Module Title Header */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>{currentModule.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {currentModule.description}
        </p>
      </div>

      {/* Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '24px' }}>
        
        {/* Topic Sidebar */}
        <div className="glass-panel" style={{ padding: '16px', height: 'fit-content' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px' }}>
            DAFTAR TOPIK MATERI
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentModule.topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setActiveTopicIndex(index)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeTopicIndex === index ? 'var(--primary-light)' : 'transparent',
                  color: activeTopicIndex === index ? '#708aff' : 'var(--text-main)',
                  border: activeTopicIndex === index ? '1px solid rgba(81, 112, 255, 0.3)' : '1px solid transparent',
                  fontWeight: activeTopicIndex === index ? 600 : 400,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {index + 1}. {topic.title}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => onNavigateToSim(currentModule.id)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}
            >
              <Play size={16} /> Ke Simulasi Interaktif
            </button>
          </div>
        </div>

        {/* Main Content Article */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
            {currentModule.topics[activeTopicIndex].title}
          </h2>

          <div style={{
            fontSize: '0.98rem',
            lineHeight: 1.8,
            color: '#d1d5db',
            whiteSpace: 'pre-line',
            marginBottom: '30px'
          }}>
            {currentModule.topics[activeTopicIndex].content}
          </div>

          {/* OpenCV Code Example */}
          <div style={{ background: '#0d1117', padding: '20px', borderRadius: '12px', border: '1px solid var(--dark-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={16} /> Contoh Kode Penerapan (Python OpenCV)
              </span>
            </div>
            <pre style={{ fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#c9d1d9', overflowX: 'auto' }}>
              <code>{currentModule.codeExample}</code>
            </pre>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {activeTopicIndex > 0 ? (
              <button onClick={() => setActiveTopicIndex(prev => prev - 1)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                <ArrowLeft size={16} /> Topik Sebelumnya
              </button>
            ) : <div />}

            {activeTopicIndex < currentModule.topics.length - 1 ? (
              <button onClick={() => setActiveTopicIndex(prev => prev + 1)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                Topik Selanjutnya <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => onNavigateToSim(currentModule.id)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                Mulai Simulasi <Play size={16} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
