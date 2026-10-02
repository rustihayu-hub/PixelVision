import React from 'react';

export default function LandingPage({ onStart, onSelectModule }) {
  return (
    <div className="flex flex-col w-full animate-fade-in">
      <div className="relative w-full overflow-hidden px-gutter lg:px-gutter-lg pb-space-2xl max-w-[1200px] mx-auto">

        {/* 1. Breadcrumb */}
        <div className="pt-space-lg pb-space-md flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <span className="hover:text-primary transition-colors cursor-pointer">Platform Pembelajaran</span>
          <span className="text-outline-variant">/</span>
          <span className="text-secondary font-medium">Beranda</span>
          <span className="ml-space-sm px-space-xs py-0.5 rounded text-[10px] bg-surface-container font-code-sm text-outline tracking-normal">SYS::ONLINE</span>
        </div>

        {/* 2. Hero Section Header & Action Matrix */}
        <section className="relative w-full pt-space-xl pb-space-xl text-center flex flex-col items-center">
          <div className="flex flex-col max-w-4xl items-center">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface-container-high rounded-full mb-space-md border border-outline-variant">
              <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">Edukasi Teknologi Pengolahan Citra</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight uppercase leading-none mb-space-md">
              PixelVision
            </h1>
            <h2 className="font-headline-sm text-headline-sm text-primary font-medium tracking-wide mb-space-md">
              Interactive Digital Image Processing
            </h2>

            {/* Subheadline */}
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-space-xl font-normal">
              Pelajari pengolahan citra digital melalui materi interaktif, visualisasi algoritma, dan simulasi langsung.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-space-md mb-space-2xl">
              <button onClick={onStart} className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all hover:opacity-90 uppercase">
                <span>Mulai Belajar</span>
              </button>
              <button onClick={() => {
                document.getElementById('modul-overview')?.scrollIntoView({ behavior: 'smooth' });
              }} className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md transition-all hover:bg-surface-highest uppercase border border-outline-variant">
                <span>Jelajahi Modul</span>
              </button>
            </div>

            {/* 3 Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg pt-space-xl w-full max-w-4xl">
              <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col items-center text-center gap-space-sm border border-surface-container-high">
                <span className="font-code-lg text-primary text-xl font-bold">01</span>
                <span className="font-headline-sm text-on-surface text-lg font-semibold">Belajar Konsep</span>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col items-center text-center gap-space-sm border border-surface-container-high">
                <span className="font-code-lg text-primary text-xl font-bold">02</span>
                <span className="font-headline-sm text-on-surface text-lg font-semibold">Eksperimen Interaktif</span>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col items-center text-center gap-space-sm border border-surface-container-high">
                <span className="font-code-lg text-primary text-xl font-bold">03</span>
                <span className="font-headline-sm text-on-surface text-lg font-semibold">Evaluasi Pemahaman</span>
              </div>
            </div>
          </div>
        </section>



        {/* 5. Kurikulum Pembelajaran Ringkas (3 Modul Utama Preview) */}
        <section id="modul-overview" className="w-full my-space-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Silabus Inti</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">3 Modul Pembelajaran Utama</h2>
            </div>
            <div className="font-code-sm text-code-sm text-on-surface-variant">
              Status Lab: <span className="text-secondary font-medium">Semua Modul Siap Digunakan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Module 01 */}
            <div className="flex flex-col rounded-xl bg-surface-container overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => onSelectModule('histogram')}>
              <div className="relative h-44 w-full bg-surface-container-lowest overflow-hidden">
                <img className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7fWX7GiXn0zCLMHxndLkUPcny9EXYqVKScho_z7nglBlbY8pJKYsDsa3g3nKeKxSEG2244Tqp10Hq7hCtjSu8npdU2V4sssk18j_9FFztvSAbY9UyzHHZCJOHmqMLO9fpITRjwfq31qroc_znq5xNrffCeNGT866vrK-cjlQn3Of3xj3Sm0UKOZJkdMZRAicgKanzsMsAaRNAWP_ZofkO6ZlV-K_IKAQFwz2gF4sCoccdj5F1kdw" alt="Modul 1" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent"></div>
                <div className="absolute top-space-sm left-space-sm px-space-sm py-0.5 rounded bg-surface-dim/80 backdrop-blur-sm font-label-sm text-label-sm text-secondary">
                  MODUL 01
                </div>
                <div className="absolute top-space-sm right-space-sm px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Fondasi</span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Operasi Dasar Citra</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Representasi matriks piksel, grayscale conversion, dan transformasi kontras menggunakan Histogram Equalization.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-space-lg">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Grayscale Transform</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Hist-Eq (CDF)</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Contrast Stretching</span>
                  </div>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <span className="font-code-sm text-code-sm text-outline">3 Algoritma</span>
                  <button className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary text-on-surface font-body-sm text-body-sm font-medium transition-colors">
                    <span>Mulai Eksperimen</span>
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Module 02 */}
            <div className="flex flex-col rounded-xl bg-surface-container overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => onSelectModule('filtering')}>
              <div className="relative h-44 w-full bg-surface-container-lowest overflow-hidden">
                <img className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjn50icVVL6UmYAGwfoiDOf3TgZzKQsY6_vXB6I84Takv7sq2wa_VZrwX-IOm7V28eGC4ZawgUthGF1PGOWBk16ItvDjqkzsXNKOR9tM3xDXNhZ5X2p2-or7R8lrlQS9xgygLnGYfKUJXXLjNSlhGLlwgYxl2F__BwULpQpu7e5i4IFiu9MVzIIiQ-zqtl0w59F4ZyZNHQo4EwxUga6ZH-D46o0knkLh9Pqn025JK2bQjhcyuerOY" alt="Modul 2" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent"></div>
                <div className="absolute top-space-sm left-space-sm px-space-sm py-0.5 rounded bg-surface-dim/80 backdrop-blur-sm font-label-sm text-label-sm text-primary">
                  MODUL 02
                </div>
                <div className="absolute top-space-sm right-space-sm px-space-sm py-0.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Restorasi</span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Enhancement &amp; Filtering</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Penerapan konvolusi spasial untuk reduksi noise, filtering non-linear, dan Gaussian blur.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-space-lg">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Gaussian Kernel</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Median Filter</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Box Blur Matrix</span>
                  </div>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <span className="font-code-sm text-code-sm text-outline">3 Algoritma</span>
                  <button className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary text-on-surface font-body-sm text-body-sm font-medium transition-colors">
                    <span>Mulai Eksperimen</span>
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Module 03 */}
            <div className="flex flex-col rounded-xl bg-surface-container overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => onSelectModule('edge')}>
              <div className="relative h-44 w-full bg-surface-container-lowest overflow-hidden">
                <img className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwGUllPKMdxC1qPVLSURL3mHkXMECiPtrWwmKhpvTWOJoTz62wtfyugNHx8B1WFM62_JN_zvJ9lx-mZoGQ73Cme330aQbzLQVdClgwI6gtZ48RjYVFgsEkuhelsLAYDH1H_wBXHNA4zU-QmFAPmBmGtHvR0qHLCjiipwK64uSTjenkPZ6wr7pArAAnuIXbIkUM4meddSttpUha3bPnGBQbr6mvGHFtxF7ctcdJ0ksSne4zRt6Ltqc" alt="Modul 3" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent"></div>
                <div className="absolute top-space-sm left-space-sm px-space-sm py-0.5 rounded bg-surface-dim/80 backdrop-blur-sm font-label-sm text-label-sm text-tertiary">
                  MODUL 03
                </div>
                <div className="absolute top-space-sm right-space-sm px-space-sm py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span>Tingkat Lanjut</span>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Segmentasi &amp; Deteksi Tepi</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Operator diferensial parsial Sobel, Prewitt, Laplacian, serta multistage Canny edge detector.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-space-lg">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Sobel Gx/Gy</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Canny Multi-stage</span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm text-[11px]">Laplacian 2nd-Ord</span>
                  </div>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <span className="font-code-sm text-code-sm text-outline">4 Algoritma</span>
                  <button className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container-highest group-hover:bg-primary group-hover:text-on-primary text-on-surface font-body-sm text-body-sm font-medium transition-colors">
                    <span>Mulai Eksperimen</span>
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Technical Callout / Academic Code Console Preview */}
        <section className="w-full mt-space-xl p-space-xl rounded-xl bg-surface-container-low shadow-xl mb-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">Arsitektur Komputasi Terbuka</span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">Siap Mengembangkan Model Visi Anda Sendiri?</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Setiap simulasi dilengkapi dengan ekivalensi kode Python murni berbasis OpenCV. Pelajari matriks di balik layar, uji batas komputasional, dan salin script langsung ke Jupyter Notebook penelitian Anda.
              </p>
              <div className="flex flex-wrap gap-space-md pt-space-md">
                <button onClick={onStart} className="inline-flex items-center gap-space-sm px-space-lg py-space-sm rounded bg-primary text-on-primary font-body-md text-body-md font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]">science</span>
                  <span>Buka Lab Virtual Sekarang</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 rounded-lg bg-surface-container-lowest p-space-md font-code-sm text-code-sm shadow-inner text-on-surface-variant">
              <div className="flex items-center justify-between pb-space-xs mb-space-sm text-[11px] text-outline">
                <span>cv2_pipeline_export.py</span>
                <span className="text-secondary">READY</span>
              </div>
              <pre className="leading-relaxed overflow-x-auto text-[12px]"><code>
                <span className="text-outline"># 1. Spatial Kernel Definition</span>
                {'\n'}
                <span className="text-secondary">import</span> cv2
                {'\n'}
                <span className="text-secondary">import</span> numpy <span className="text-secondary">as</span> np
                {'\n\n'}
                <span className="text-outline"># Apply Local CLAHE</span>
                {'\n'}
                clahe = cv2.createCLAHE(clipLimit=<span className="text-tertiary">3.0</span>)
                {'\n'}
                dst = clahe.apply(raw_grayscale)
                {'\n\n'}
                <span className="text-outline"># Compute Horizontal Gradient</span>
                {'\n'}
                sobelx = cv2.Sobel(dst, cv2.CV_64F, <span className="text-tertiary">1</span>, <span className="text-tertiary">0</span>, ksize=<span className="text-tertiary">3</span>)
                {'\n'}
                magnitude = np.absolute(sobelx)
                {'\n'}
                result = np.uint8(magnitude)
              </code></pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
