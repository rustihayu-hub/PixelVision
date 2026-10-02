import React from 'react';
import { Play, Sparkles, BookOpen, Cpu, Shield, Award, ChevronRight, BarChart2, Sliders, Maximize2 } from 'lucide-react';

export default function LandingPage({ onStart, onSelectModule }) {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '60px 20px',
        textAlign: 'center',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '30px',
          background: 'rgba(81, 112, 255, 0.12)',
          border: '1px solid rgba(81, 112, 255, 0.3)',
          color: '#708aff',
          fontSize: '0.88rem',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          <Sparkles size={16} /> Media Pembelajaran Interaktif Pengolahan Citra Digital
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-1px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ffffff 30%, #9ca3af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Pelajari Pengolahan Citra secara <span style={{
            background: 'linear-gradient(135deg, #5170FF 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Visual & Real-Time</span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '780px',
          margin: '0 auto 36px auto',
          fontWeight: 400
        }}>
          PixelVision menggabungkan teori konseptual, simulasi algoritma manipulasi piksel interaktif di browser, contoh kode Python OpenCV, serta evaluasi kuis terintegrasi.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onStart} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
            <Play size={20} /> Mulai Belajar Sekarang
          </button>
          <a href="#modul-overview" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem', textDecoration: 'none' }}>
            <BookOpen size={20} /> Eksplorasi Modul
          </a>
        </div>

        {/* Floating tech badge preview */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <Cpu style={{ color: 'var(--primary)', marginBottom: '12px' }} size={32} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Canvas Engine</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Pemrosesan citra 100% lokal di browser pengguna tanpa latency server.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <Sliders style={{ color: 'var(--accent-purple)', marginBottom: '12px' }} size={32} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Interactive Lab</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Ubah parameter threshold, kernel, & bin histogram untuk melihat perubahan langsung.</p>
          </div>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <Award style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }} size={32} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Gamifikasi & Kuis</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>10 soal kuis interaktif dengan timer, feedback instan, dan pelacakan progress.</p>
          </div>
        </div>
      </section>

      {/* Module Overview Section */}
      <section id="modul-overview" style={{ maxWidth: '1100px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Modul Pembelajaran Utama</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Pilih modul untuk memulai eksplorasi materi dan simulasi interaktif</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Module 1 */}
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(81, 112, 255, 0.15)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <BarChart2 size={26} />
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-block' }}>Modul 01</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Histogram Equalization</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Pelajari distribusi intensitas keabuan piksel, fungsi CDF, serta cara meratakan kontras gambar secara otomatis.
              </p>
            </div>
            <button onClick={() => onSelectModule('histogram')} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Pelajari Modul 1 <ChevronRight size={16} />
            </button>
          </div>

          {/* Module 2 */}
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                color: 'var(--accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Sliders size={26} />
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-block', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>Modul 02</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Enhancement & Filtering</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Analisis perbedaan konvolusi kernel 3x3 hingga 9x9 menggunakan Gaussian Blur, Median, dan Average filter.
              </p>
            </div>
            <button onClick={() => onSelectModule('filtering')} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Pelajari Modul 2 <ChevronRight size={16} />
            </button>
          </div>

          {/* Module 3 */}
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.15)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Maximize2 size={26} />
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-block', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>Modul 03</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Segmentasi & Edge Detection</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Uji coba algoritma deteksi tepi Sobel, Canny, Prewitt, dan Laplacian dengan pengaturan threshold dinamis.
              </p>
            </div>
            <button onClick={() => onSelectModule('edge')} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Pelajari Modul 3 <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
