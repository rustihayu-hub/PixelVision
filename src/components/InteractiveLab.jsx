import React, { useEffect, useRef, useState } from 'react';
import { drawSampleImage } from '../utils/imageUtils';
import { applyHistogramEqualization, applyFilter, applyEdgeDetection } from '../utils/imageAlgorithms';
import { RefreshCw, Upload, Sliders, Code, Layers, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export default function InteractiveLab({ initialMode = 'histogram' }) {
  const [selectedImage, setSelectedImage] = useState('cityscape');
  const [customImageSrc, setCustomImageSrc] = useState(null);
  const [activeTab, setActiveTab] = useState(initialMode); // 'histogram' | 'filtering' | 'edge'
  
  // Status & Error toast messaging
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('info'); // 'info' | 'error' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);

  // Histogram controls
  const [bins, setBins] = useState(256);
  
  // Filtering controls
  const [filterType, setFilterType] = useState('gaussian');
  const [kernelSize, setKernelSize] = useState(5);
  
  // Edge detection controls
  const [edgeAlgo, setEdgeAlgo] = useState('canny');
  const [lowThreshold, setLowThreshold] = useState(50);
  const [highThreshold, setHighThreshold] = useState(150);

  // Canvas refs
  const sourceCanvasRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const histSourceCanvasRef = useRef(null);
  const histTargetCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const showToast = (msg, type = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync activeTab when initialMode prop changes
  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  // Load and render images with aspect ratio preservation
  useEffect(() => {
    const srcCanvas = sourceCanvasRef.current;
    const tgtCanvas = targetCanvasRef.current;
    if (!srcCanvas || !tgtCanvas) return;

    const srcCtx = srcCanvas.getContext('2d');
    setIsProcessing(true);

    if (customImageSrc) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        // Maintain Aspect Ratio with max dimensions
        const maxW = 480;
        const maxH = 340;
        let w = img.width;
        let h = img.height;

        if (w > maxW || h > maxH) {
          const ratio = Math.min(maxW / w, maxH / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        srcCanvas.width = w;
        srcCanvas.height = h;
        tgtCanvas.width = w;
        tgtCanvas.height = h;

        srcCtx.drawImage(img, 0, 0, w, h);
        processCanvasData(w, h);
        setIsProcessing(false);
      };
      img.onerror = () => {
        showToast('Gagal memuat gambar custom. Menggunakan preset.', 'error');
        setCustomImageSrc(null);
        setIsProcessing(false);
      };
      img.src = customImageSrc;
    } else {
      const w = 440;
      const h = 320;
      srcCanvas.width = w;
      srcCanvas.height = h;
      tgtCanvas.width = w;
      tgtCanvas.height = h;

      drawSampleImage(srcCanvas, selectedImage);
      processCanvasData(w, h);
      setIsProcessing(false);
    }
  }, [selectedImage, customImageSrc, activeTab, bins, filterType, kernelSize, edgeAlgo, lowThreshold, highThreshold]);

  const processCanvasData = (w, h) => {
    const srcCanvas = sourceCanvasRef.current;
    const tgtCanvas = targetCanvasRef.current;
    if (!srcCanvas || !tgtCanvas) return;

    const width = w || srcCanvas.width;
    const height = h || srcCanvas.height;
    const srcCtx = srcCanvas.getContext('2d');
    const tgtCtx = tgtCanvas.getContext('2d');

    if (activeTab === 'histogram') {
      const targetHist = applyHistogramEqualization(srcCtx, tgtCtx, width, height, bins);
      renderHistograms(srcCtx, targetHist, width, height);
    } else if (activeTab === 'filtering') {
      applyFilter(srcCtx, tgtCtx, width, height, filterType, Number(kernelSize));
    } else if (activeTab === 'edge') {
      applyEdgeDetection(srcCtx, tgtCtx, width, height, edgeAlgo, {
        lowThreshold: Number(lowThreshold),
        highThreshold: Number(highThreshold)
      });
    }
  };

  const renderHistograms = (srcCtx, targetHistData, width, height) => {
    if (!histSourceCanvasRef.current || !histTargetCanvasRef.current) return;

    const srcHistData = getRawHistogramData(srcCtx, width, height);
    drawHistogramChart(histSourceCanvasRef.current, srcHistData, '#5170FF');
    drawHistogramChart(histTargetCanvasRef.current, targetHistData, '#22c55e');
  };

  const getRawHistogramData = (ctx, width, height) => {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const hist = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      const g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      hist[g]++;
    }
    return hist;
  };

  const drawHistogramChart = (canvas, histData, color) => {
    if (!canvas || !histData) return;
    canvas.width = 380;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 380, 110);

    const maxVal = Math.max(...histData, 1);
    const barWidth = 380 / histData.length;

    ctx.fillStyle = color;
    for (let i = 0; i < histData.length; i++) {
      const h = (histData[i] / maxVal) * 100;
      ctx.fillRect(i * barWidth, 110 - h, barWidth, h);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Robust MIME Type validation
      if (!file.type || !file.type.startsWith('image/')) {
        showToast('File yang diunggah harus berupa gambar (JPG, PNG, WebP).', 'error');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran file maksimal adalah 5MB.', 'error');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        setCustomImageSrc(evt.target.result);
        showToast('Gambar custom berhasil diunggah!', 'success');
      };
      reader.onerror = () => {
        showToast('Gagal membaca file gambar.', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          background: toastType === 'error' ? 'var(--error-light)' : toastType === 'success' ? 'var(--success-light)' : 'rgba(81, 112, 255, 0.2)',
          border: `1px solid ${toastType === 'error' ? 'var(--error)' : toastType === 'success' ? 'var(--success)' : 'var(--primary)'}`,
          color: toastType === 'error' ? '#f87171' : toastType === 'success' ? '#4ade80' : '#93c5fd',
          padding: '12px 20px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {toastType === 'error' ? <AlertCircle size={18} /> : toastType === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers style={{ color: 'var(--primary)' }} /> Image Lab & Simulasi Interaktif
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Eksperimen dengan parameter algoritma secara real-time langsung pada Canvas API.
          </p>
        </div>

        {/* Tab Switchers */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveTab('histogram')}
            className={activeTab === 'histogram' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            Histogram Eq
          </button>
          <button
            onClick={() => setActiveTab('filtering')}
            className={activeTab === 'filtering' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            Enhancement & Filter
          </button>
          <button
            onClick={() => setActiveTab('edge')}
            className={activeTab === 'edge' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            Segmentasi & Tepi
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 340px) 1fr', gap: '24px' }}>
        
        {/* Left Column: Parameter Controls */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} style={{ color: 'var(--primary)' }} /> Atur Parameter Simulasi
          </h3>

          {/* Sample Image Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              CITRA MASUKAN (PRESET / UPLOAD)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <button
                onClick={() => { setCustomImageSrc(null); setSelectedImage('cityscape'); }}
                className={!customImageSrc && selectedImage === 'cityscape' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '8px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                Cityscape
              </button>
              <button
                onClick={() => { setCustomImageSrc(null); setSelectedImage('coins'); }}
                className={!customImageSrc && selectedImage === 'coins' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '8px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                Koin (High Contrast)
              </button>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
            >
              <Upload size={16} /> Upload Gambar Sendiri
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.08)', marginBottom: '20px' }} />

          {/* Mode Dynamic Controls */}
          {activeTab === 'histogram' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Interval Bin Visualisasi</label>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{bins} Bins</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="256"
                  step="16"
                  value={bins}
                  onChange={(e) => setBins(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                  aria-label="Slider Jumlah Bin Histogram"
                />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                ℹ️ <strong>Catatan Pedagogis:</strong> Equalization diproses penuh pada 256 tingkat keabuan. Slider bin menentukan pengelompokan bar grafik histogram.
              </p>
            </div>
          )}

          {activeTab === 'filtering' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Jenis Filter Spasial</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'var(--dark-surface)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--dark-border)',
                    outline: 'none'
                  }}
                  aria-label="Pilih Jenis Filter Spasial"
                >
                  <option value="gaussian">Gaussian Blur (Penghalus Alami)</option>
                  <option value="median">Median Filter (Noise Salt & Pepper)</option>
                  <option value="average">Average / Mean Filter (Rata-rata)</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Ukuran Kernel Spasial</label>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{kernelSize} × {kernelSize}</span>
                </div>
                <select
                  value={kernelSize}
                  onChange={(e) => setKernelSize(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'var(--dark-surface)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--dark-border)',
                    outline: 'none'
                  }}
                  aria-label="Pilih Ukuran Kernel Spasial"
                >
                  <option value={3}>3 x 3 (Tetangga 9 Piksel)</option>
                  <option value={5}>5 x 5 (Tetangga 25 Piksel)</option>
                  <option value={7}>7 x 7 (Tetangga 49 Piksel)</option>
                  <option value={9}>9 x 9 (Tetangga 81 Piksel)</option>
                </select>
              </div>

              {/* Kernel Matrix Visualizer */}
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--dark-border)',
                padding: '14px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Visualisasi Matriks Kernel ({kernelSize}x{kernelSize})
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                  {filterType === 'average' && `1/${kernelSize*kernelSize} × [ Matriks seragam 1 ]`}
                  {filterType === 'gaussian' && `Gaussian Bell Curve (Sigma ≈ ${(kernelSize/3).toFixed(1)})`}
                  {filterType === 'median' && `Median value array [ Sorting ${kernelSize*kernelSize} piksel ]`}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edge' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>Algoritma Deteksi Tepi</label>
                <select
                  value={edgeAlgo}
                  onChange={(e) => setEdgeAlgo(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'var(--dark-surface)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--dark-border)',
                    outline: 'none'
                  }}
                  aria-label="Pilih Algoritma Deteksi Tepi"
                >
                  <option value="canny">Canny Edge Detector (Presisi Hysteresis)</option>
                  <option value="sobel">Sobel Operator (Gradien Orde 1)</option>
                  <option value="prewitt">Prewitt Operator (Seragam)</option>
                  <option value="laplacian">Laplacian Filter (Orde 2 Zero-Crossing)</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Low Threshold</label>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{lowThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={lowThreshold}
                  onChange={(e) => setLowThreshold(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                  aria-label="Slider Low Threshold"
                />
              </div>

              {edgeAlgo === 'canny' && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>High Threshold (Hysteresis)</label>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>{highThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="255"
                    value={highThreshold}
                    onChange={(e) => setHighThreshold(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                    aria-label="Slider High Threshold Canny"
                  />
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setBins(256);
              setKernelSize(5);
              setLowThreshold(50);
              setHighThreshold(150);
              showToast('Parameter berhasil direset!', 'info');
            }}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
          >
            <RefreshCw size={16} /> Reset Parameter
          </button>
        </div>

        {/* Right Column: Before & After Canvas Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Canvas Side by Side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            
            {/* Source Image */}
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>CITRA MASUKAN (BEFORE)</span>
                <span className="badge badge-primary">Masukan</span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <canvas ref={sourceCanvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} aria-label="Canvas Citra Masukan Asli" />
              </div>
            </div>

            {/* Target Output Image */}
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderColor: 'rgba(81, 112, 255, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>HASIL PROSES (AFTER)</span>
                <span className="badge badge-success">
                  {isProcessing ? 'Memproses...' : 'Hasil Proses'}
                </span>
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <canvas ref={targetCanvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} aria-label="Canvas Hasil Proses Pengolahan Citra" />
              </div>
            </div>
          </div>

          {/* Histogram Charts View (Only on Histogram Tab) */}
          {activeTab === 'histogram' && (
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>Grafik Perbandingan Histogram Spasial</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Histogram Citra Masukan (Sebelum)</div>
                  <canvas ref={histSourceCanvasRef} style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginBottom: '6px' }}>Histogram Equalized (Hasil Proses)</div>
                  <canvas ref={histTargetCanvasRef} style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }} />
                </div>
              </div>
            </div>
          )}

          {/* Demonstration Code Playground Preview */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={16} style={{ color: 'var(--accent-purple)' }} /> Contoh Kode Python / OpenCV
              </span>
              <button
                onClick={() => {
                  const code = activeTab === 'histogram'
                    ? `import cv2\nimg = cv2.imread('image.jpg', 0)\nequ = cv2.equalizeHist(img)`
                    : activeTab === 'filtering'
                    ? `import cv2\nimg = cv2.imread('image.jpg')\nresult = cv2.${filterType === 'gaussian' ? 'GaussianBlur' : filterType === 'median' ? 'medianBlur' : 'blur'}(img, (${kernelSize}, ${kernelSize})${filterType === 'gaussian' ? ', 0' : ''})`
                    : `import cv2\nimg = cv2.imread('image.jpg', 0)\nedges = cv2.Canny(img, ${lowThreshold}, ${highThreshold})`;
                  
                  navigator.clipboard.writeText(code);
                  showToast('Kode Python disalin ke clipboard!', 'success');
                }}
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '0.78rem' }}
              >
                Copy Code
              </button>
            </div>
            <pre style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.85rem',
              background: '#0d1117',
              padding: '14px',
              borderRadius: '8px',
              color: '#c9d1d9',
              overflowX: 'auto',
              margin: 0
            }}>
              <code>
                {activeTab === 'histogram' && `# Python OpenCV - Histogram Equalization\nimport cv2\n\nimage = cv2.imread("input.jpg", 0)\nequalized_image = cv2.equalizeHist(image)`}
                {activeTab === 'filtering' && `# Python OpenCV - ${filterType.toUpperCase()} Filtering\nimport cv2\n\nimage = cv2.imread("input.jpg")\nfiltered_image = cv2.${filterType === 'gaussian' ? `GaussianBlur(image, (${kernelSize}, ${kernelSize}), 0)` : filterType === 'median' ? `medianBlur(image, ${kernelSize})` : `blur(image, (${kernelSize}, ${kernelSize}))`}`}
                {activeTab === 'edge' && `# Python OpenCV - Deteksi Tepi ${edgeAlgo.toUpperCase()}\nimport cv2\n\nimage = cv2.imread("input.jpg", 0)\n${edgeAlgo === 'canny' ? `edges = cv2.Canny(image, ${lowThreshold}, ${highThreshold})` : `edges = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)`}`}
              </code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
