import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { Code, Play, ChevronRight, ArrowLeft, CheckCircle, Eye, Target, Sparkles } from 'lucide-react';

// Lightweight Markdown & Math Notation Parser Component
function TextRenderer({ content }) {
  if (!content) return null;

  const paragraphs = content.split('\n\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {paragraphs.map((para, pIdx) => {
        if (para.trim().startsWith('- ') || para.trim().startsWith('1. ')) {
          const items = para.trim().split('\n');
          return (
            <ul key={pIdx} style={{ paddingLeft: '24px', margin: 0, color: '#d1d5db', lineHeight: 1.8 }}>
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^[-*]\s+|^[0-9]+\.\s+/, '');
                return <li key={iIdx} style={{ marginBottom: '6px' }}>{renderInlineFormatting(cleanItem)}</li>;
              })}
            </ul>
          );
        }

        if (para.trim().startsWith('$$') && para.trim().endsWith('$$')) {
          const formula = para.trim().slice(2, -2).trim();
          return (
            <div
              key={pIdx}
              style={{
                background: 'rgba(81, 112, 255, 0.08)',
                borderLeft: '4px solid var(--primary)',
                padding: '14px 20px',
                borderRadius: '8px',
                fontFamily: 'var(--font-code)',
                fontSize: '1rem',
                color: '#93c5fd',
                textAlign: 'center',
                margin: '8px 0'
              }}
            >
              {formula}
            </div>
          );
        }

        return (
          <p key={pIdx} style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '0.98rem', margin: 0 }}>
            {renderInlineFormatting(para)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ color: '#ffffff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.88rem',
            color: '#a78bfa'
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function ModuleViewer({ moduleId, onNavigateToSim, onCompleteModule, completedModules = [] }) {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const currentModule = modulesData.find(m => m.id === moduleId) || modulesData[0];
  const isCompleted = Array.isArray(completedModules) && completedModules.includes(currentModule.id);
  const currentTopic = currentModule.topics[activeTopicIndex] || currentModule.topics[0];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto', paddingBottom: '60px' }}>

      {/* Top Bar Navigation */}
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

        {/* Topic Navigation Sidebar */}
        <div className="glass-panel" style={{ padding: '16px', height: 'fit-content' }}>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px' }}>
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

          {/* Learning Goal Section */}
          {currentTopic.learningGoal && (
            <div style={{
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              padding: '14px 18px',
              borderRadius: '10px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Target style={{ color: 'var(--accent-purple)', flexShrink: 0, marginTop: '2px' }} size={20} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase', marginBottom: '2px' }}>
                  Tujuan Pembelajaran Topik
                </div>
                <div style={{ fontSize: '0.92rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                  {currentTopic.learningGoal}
                </div>
              </div>
            </div>
          )}

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
            {currentTopic.title}
          </h2>

          {/* Formatted Text Content */}
          <div style={{ marginBottom: '30px' }}>
            <TextRenderer content={currentTopic.content} />
          </div>

          {/* Observation Points Box (Yang Perlu Diamati) */}
          {currentTopic.observationPoints && (
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              padding: '18px 20px',
              borderRadius: '12px',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.95rem' }}>
                <Eye size={18} /> Yang Perlu Diamati Saat Simulasi:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#cffafe', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {currentTopic.observationPoints.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* OpenCV Code Example */}
          <div style={{ background: '#0d1117', padding: '20px', borderRadius: '12px', border: '1px solid var(--dark-border)', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={16} /> Contoh Kode Penerapan (Python OpenCV)
              </span>
            </div>
            <pre style={{ fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#c9d1d9', overflowX: 'auto', margin: 0 }}>
              <code>{currentModule.codeExample}</code>
            </pre>
          </div>

          {/* Reflection Section */}
          {currentModule.reflection && activeTopicIndex === currentModule.topics.length - 1 && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '16px 20px',
              borderRadius: '10px',
              marginBottom: '30px'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--warning)', fontSize: '0.9rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Refleksi Pembelajaran:
              </div>
              <div style={{ fontSize: '0.9rem', color: '#fef08a', lineHeight: 1.6 }}>
                {currentModule.reflection}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
                Mulai Simulasi Interaktif <Play size={16} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
