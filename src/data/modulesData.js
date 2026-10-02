export const modulesData = [
  {
    id: 'histogram',
    title: 'Operasi Dasar Citra — Histogram Equalization',
    category: 'Modul 01',
    description: 'Pelajari distribusi intensitas piksel dan tingkatkan kontras gambar menggunakan teknik pemerataan histogram.',
    icon: 'BarChart2',
    color: '#5170FF',
    topics: [
      {
        title: '01. Cover & Pengantar',
        learningGoal: 'Memahami gambaran umum tentang pengolahan citra digital tingkat dasar.',
        audioUrl: '/audio/modules/modul1_01.mp3',
        content: `Selamat datang di Modul 01: Operasi Dasar Citra Digital.
        
Dalam modul interaktif ini, kita akan mempelajari salah satu teknik paling fundamental dalam pengolahan citra digital: **Histogram Citra** dan **Histogram Equalization**.

**APA YANG AKAN ANDA PELAJARI?**
- Pengertian citra digital dan piksel.
- Membaca dan menganalisis histogram citra.
- Konsep dan algoritma Histogram Equalization.
- Implementasi matematis dan studi kasus.

Silakan klik tombol **Berikutnya** untuk memulai perjalanan belajar Anda.`,
        observationPoints: []
      },
      {
        title: '02. Pengantar Citra Digital',
        learningGoal: 'Memahami konsep piksel, representasi citra, dan ruang warna grayscale.',
        audioUrl: '/audio/modules/modul1_02.mp3',
        content: `**APA?**
Citra digital adalah representasi numerik dari sebuah gambar (biasanya dua dimensi). Gambar ini dibagi menjadi elemen-elemen kecil berbentuk grid (baris dan kolom) yang disebut **Piksel** (Picture Element).

**MENGAPA?**
Komputer tidak dapat melihat gambar seperti mata manusia. Komputer hanya memahami angka. Oleh karena itu, intensitas cahaya pada setiap titik gambar harus diubah menjadi nilai numerik.

**BAGAIMANA?**
Pada citra skala keabuan (grayscale), setiap piksel memiliki satu nilai intensitas yang berkisar dari **0 hingga 255**.
- Nilai **0** merepresentasikan warna **hitam pekat**.
- Nilai **255** merepresentasikan warna **putih terang**.
- Nilai di antaranya (1-254) merepresentasikan tingkat keabuan.

**CONTOH?**
Bayangkan sebuah gambar berukuran 3x3 piksel:
$$ [10, 50, 100] $$
$$ [20, 200, 250] $$
$$ [0, 128, 255] $$
Angka 0 adalah titik paling gelap, dan 255 adalah titik paling terang.`,
        observationPoints: []
      },
      {
        title: '03. Konsep Histogram Citra',
        learningGoal: 'Memahami cara membuat dan membaca histogram dari suatu citra.',
        audioUrl: '/audio/modules/modul1_03.mp3',
        content: `**APA?**
Histogram citra adalah grafik yang menunjukkan distribusi atau penyebaran nilai intensitas piksel dalam sebuah gambar. 

**MENGAPA?**
Histogram digunakan untuk menganalisis karakteristik pencahayaan citra secara keseluruhan. Kita bisa tahu apakah gambar terlalu gelap, terlalu terang, atau kekurangan kontras hanya dengan melihat histogramnya.

**BAGAIMANA?**
Kita menghitung frekuensi (jumlah kemunculan) dari setiap nilai intensitas (0-255). 
- Sumbu X: Nilai intensitas (0 - 255)
- Sumbu Y: Jumlah piksel dengan intensitas tersebut

**RUMUS HISTOGRAM:**
$$ h(rₖ) = nₖ $$

- **rₖ** = tingkat keabuan ke-k (0, 1, 2, ..., 255)
- **nₖ** = jumlah piksel yang memiliki nilai keabuan rₖ

**COBA!**
Buka Image Lab nanti, unggah gambar yang Anda miliki, dan perhatikan bentuk histogramnya.`,
        observationPoints: []
      },
      {
        title: '04. Cara Membaca Histogram',
        learningGoal: 'Mampu membedakan karakteristik gambar berdasarkan bentuk histogramnya.',
        audioUrl: '/audio/modules/modul1_04.mp3',
        content: `Berdasarkan distribusi histogram, citra dikategorikan menjadi 4 jenis utama:

1. **Citra Gelap (Low-key)**
Histogram menumpuk di sebelah kiri (mendekati nilai 0). Gambar terlihat gelap karena sebagian besar piksel memiliki intensitas rendah.

2. **Citra Terang (High-key)**
Histogram menumpuk di sebelah kanan (mendekati nilai 255). Gambar terlihat silau atau terlalu terang.

3. **Citra Kontras Rendah**
Histogram menyempit di tengah rentang skala. Gambar terlihat kusam, abu-abu, dan kurang tajam pemisahan antara objek dan latar.

4. **Citra Kontras Tinggi**
Histogram tersebar merata dari 0 hingga 255. Detail gambar terlihat sangat jelas dan tajam.`,
        observationPoints: []
      },
      {
        title: '05. Histogram Equalization',
        learningGoal: 'Memahami tujuan dan prinsip kerja algoritma Histogram Equalization.',
        audioUrl: '/audio/modules/modul1_05.mp3',
        content: `**APA?**
Histogram Equalization (Pemerataan Histogram) adalah algoritma untuk meratakan distribusi nilai piksel sehingga citra memiliki kontras yang optimal.

**MENGAPA?**
Banyak foto medis (seperti X-Ray), citra satelit, atau foto malam hari memiliki kontras yang buruk sehingga detail objek tidak terlihat. Histogram Equalization secara otomatis "meregangkan" histogram agar memanfaatkan seluruh rentang warna 0-255.

**BAGAIMANA?**
Algoritma ini menggunakan probabilitas dan Fungsi Distribusi Kumulatif (CDF). Ia menghitung total kumulatif piksel, kemudian memetakannya secara proporsional ke rentang intensitas baru yang lebih luas.

**CONTOH?**
Gambar rontgen paru-paru yang terlihat keabu-abuan akan menjadi lebih tegas; tulang terlihat putih, udara terlihat hitam, sehingga dokter lebih mudah mendiagnosis.`,
        observationPoints: []
      },
      {
        title: '06. Rumus & Transformasi',
        learningGoal: 'Mempelajari model matematis di balik Histogram Equalization.',
        audioUrl: '/audio/modules/modul1_06.mp3',
        content: `Proses Histogram Equalization melibatkan transformasi intensitas dengan rumus fungsi CDF (Cumulative Distribution Function):

**RUMUS TRANSFORMASI:**
$$ sₖ = T(rₖ) = (L - 1) × ∑ p(rⱼ) $$

**PENJELASAN VARIABEL:**
- **sₖ** = Nilai piksel baru (hasil transformasi)
- **rₖ** = Nilai piksel lama (0 sampai 255)
- **L** = Jumlah derajat keabuan (untuk citra 8-bit, L = 256, sehingga L-1 = 255)
- **∑ p(rⱼ)** = Nilai probabilitas kumulatif (CDF) dari derajat keabuan 0 sampai k

**LANGKAH ALGORITMA:**
1. **Histogram**: Hitung jumlah piksel (n) untuk setiap intensitas.
2. **Probabilitas**: Bagi nilai n dengan total piksel citra.
3. **CDF**: Jumlahkan nilai probabilitas secara kumulatif dari 0 hingga keabuan saat ini.
4. **Transformasi**: Kalikan nilai CDF dengan (L - 1) dan bulatkan ke bilangan bulat terdekat.
5. **Mapping**: Ganti nilai piksel lama dengan nilai transformasi baru.`,
        observationPoints: []
      },
      {
        title: '07. Contoh Perhitungan',
        learningGoal: 'Mempraktikkan perhitungan manual Histogram Equalization pada matriks sederhana.',
        audioUrl: '/audio/modules/modul1_07.mp3',
        content: `Agar lebih mudah dipahami, mari kita lihat matriks citra 4x4 (Total 16 piksel) dengan rentang intensitas 0 hingga 7 (L = 8, sehingga L-1 = 7).

**Matriks Citra Asli (r):**
$$ 2, 2, 3, 3 $$
$$ 3, 4, 4, 4 $$
$$ 5, 5, 6, 6 $$
$$ 6, 7, 7, 7 $$

**1. Hitung Frekuensi (n) & Probabilitas (p):**
- Nilai 2: 2 piksel → p = 2/16 = 0.125
- Nilai 3: 3 piksel → p = 3/16 = 0.1875
- Nilai 4: 3 piksel → p = 3/16 = 0.1875
- Nilai 5: 2 piksel → p = 2/16 = 0.125
- Nilai 6: 3 piksel → p = 3/16 = 0.1875
- Nilai 7: 3 piksel → p = 3/16 = 0.1875

**2. Hitung CDF & Mapping Baru (s = CDF × 7):**
- r=2 → CDF = 0.125 → s = 0.125 × 7 = 0.875 ≈ **1**
- r=3 → CDF = 0.3125 → s = 0.3125 × 7 = 2.1875 ≈ **2**
- r=4 → CDF = 0.5 → s = 0.5 × 7 = 3.5 ≈ **4**
- r=5 → CDF = 0.625 → s = 0.625 × 7 = 4.375 ≈ **4**
- r=6 → CDF = 0.8125 → s = 0.8125 × 7 = 5.6875 ≈ **6**
- r=7 → CDF = 1.0 → s = 1.0 × 7 = 7 ≈ **7**

**3. Hasil Matriks Baru:**
Semua piksel 2 menjadi 1, 3 menjadi 2, 4 menjadi 4, 5 menjadi 4, dst. Distribusi intensitas telah menyebar!`,
        observationPoints: []
      },
      {
        title: '08. Analisis Hasil & Keterbatasan',
        learningGoal: 'Menganalisis hasil transformasi dan memahami batasan dari Histogram Equalization.',
        audioUrl: '/audio/modules/modul1_08.mp3',
        content: `Setelah Histogram Equalization diterapkan, sangat penting untuk melakukan **ANALISIS HASIL**.

**SEBELUM (BEFORE)**
Citra asli mungkin terlihat pudar dan histogramnya terkonsentrasi di tengah atau di satu sisi tertentu.

**SESUDAH (AFTER)**
Citra hasil akan memiliki kontras yang jauh lebih tajam. Jika kita melihat histogramnya, grafik akan tampak lebih lebar dan mencakup rentang dari 0 hingga 255.

**PERTANYAAN REFLEKSI:**
- Apakah kontras selalu meningkat secara positif?
- Kapan Histogram Equalization kurang sesuai digunakan?

**KELEBIHAN:**
- Bekerja secara otomatis tanpa memerlukan parameter tambahan.
- Sangat efektif untuk citra yang dominan terlalu gelap atau terlalu terang.

**KETERBATASAN:**
- **Over-enhancement**: Kadang membuat background statis menjadi terlalu menonjol.
- Meningkatkan noise pada area gambar yang rata (homogen).
- Tidak selalu menghasilkan gambar yang natural secara visual.`,
        observationPoints: []
      },
      {
        title: '09. Rangkuman Modul 01',
        learningGoal: 'Mereview kembali poin-poin utama sebelum melakukan eksperimen di lab.',
        audioUrl: '/audio/modules/modul1_09.mp3',
        content: `**YANG HARUS KAMU INGAT**

1. **Citra Digital**: Adalah matriks piksel, di mana setiap piksel memiliki nilai intensitas 0 (hitam) hingga 255 (putih).
2. **Histogram**: Grafik yang menunjukkan distribusi frekuensi intensitas piksel. Sumbu X adalah intensitas, sumbu Y adalah jumlah piksel.
3. **Kualitas Kontras**: Citra dengan histogram yang menyempit memiliki kontras rendah, sedangkan citra dengan histogram yang menyebar rata memiliki kontras yang baik.
4. **Histogram Equalization**: Teknik untuk meregangkan histogram menggunakan probabilitas kumulatif (CDF), sehingga citra mendapatkan kontras yang optimal.
5. **Evaluasi**: Hasil pemerataan histogram tidak selalu lebih baik secara estetika, terkadang bisa menimbulkan noise pada citra yang sudah bagus kontrasnya.

Selanjutnya, mari kita coba langsung algoritma ini di **Image Lab**!`,
        observationPoints: [
          'Unggah gambar Anda yang terlalu gelap.',
          'Pilih algoritma Histogram Equalization.',
          'Bandingkan perbedaan visual dan bentuk histogram Sebelum vs Sesudah.'
        ]
      },
      {
        title: '10. Latihan & Uji Pemahaman',
        learningGoal: 'Mengukur pemahaman teoritis sebelum melangkah ke kuis utama.',
        audioUrl: '/audio/modules/modul1_10.mp3',
        content: `Sebelum Anda mengambil kuis resmi, cobalah jawab pertanyaan latihan berikut dalam hati untuk memastikan Anda telah memahami konsep:

1. Jika bentuk histogram sebuah gambar sebagian besar berada di rentang nilai 0 hingga 50, bagaimana penampakan gambar tersebut secara visual?
2. Apa tujuan utama dari penggunaan Histogram Equalization?
3. Dalam rumus Histogram Equalization, apa peran dari CDF (Cumulative Distribution Function)?
4. Mengapa Histogram Equalization terkadang tidak cocok untuk foto wajah portrait biasa?
5. Apa yang direpresentasikan oleh sumbu X dan sumbu Y pada grafik histogram?

Jika Anda bisa menjawab pertanyaan-pertanyaan di atas dengan lancar, Anda sudah siap untuk eksplorasi lebih jauh!
Silakan klik tombol **Mulai Simulasi Lab** di bawah untuk mempraktikkan materi ini.`,
        observationPoints: []
      }
    ],
    reflection: 'Histogram Equalization sangat cocok digunakan untuk citra medis (rontgen) atau citra satelit yang kontrasnya rendah. Hati-hati menggunakannya pada citra wajah karena dapat menyebabkan detail tekstur kulit menjadi tidak natural.',
    codeExample: `# Python OpenCV - Histogram Equalization
import cv2

# 1. Baca gambar dalam mode Grayscale
img = cv2.imread('image.jpg', 0)

# 2. Terapkan Histogram Equalization
equ = cv2.equalizeHist(img)

# 3. Tampilkan hasil
cv2.imshow('Original', img)
cv2.imshow('Equalized', equ)
cv2.waitKey(0)`
  },
  {
    id: 'filtering',
    title: 'Enhancement & Filtering — Spatial Smoothing',
    category: 'Modul 02',
    description: 'Eksplorasi teknik penyaringan citra spasial menggunakan Gaussian Blur, Median Filter, dan Average Filter.',
    icon: 'Sliders',
    color: '#8b5cf6',
    topics: [
      {
        title: '01. Cover & Pengantar',
        learningGoal: 'Memahami gambaran umum tentang proses filter spasial pada citra.',
        audioUrl: '/audio/modules/modul2_01.mp3',
        content: `Selamat datang di Modul 02: Image Enhancement & Filtering.

Citra digital yang dihasilkan oleh kamera sering kali mengandung **Noise** (gangguan berupa bintik-bintik acak). Untuk memperbaiki kualitas gambar, kita membutuhkan teknik **Filtering** (Penyaringan).

**APA YANG AKAN ANDA PELAJARI?**
- Konsep dasar filtering spasial dan matriks konvolusi.
- Average Filter untuk penghalusan citra.
- Gaussian Filter untuk blur yang natural.
- Median Filter untuk menghilangkan noise salt & pepper.
- Analisis perbandingan antar filter.

Silakan klik tombol **Berikutnya** untuk mulai belajar.`,
        observationPoints: []
      },
      {
        title: '02. Konsep Filtering Spasial',
        learningGoal: 'Mempelajari cara kerja matriks konvolusi (kernel) pada pengolahan citra.',
        audioUrl: '/audio/modules/modul2_02.mp3',
        content: `**APA?**
Filtering spasial adalah proses mengubah nilai sebuah piksel berdasarkan nilai-nilai piksel di sekelilingnya (tetangganya). 

**BAGAIMANA?**
Proses ini menggunakan sebuah matriks kecil berukuran ganjil (contoh: 3x3, 5x5) yang disebut **Kernel** atau **Mask**. Kernel ini "digeser" menelusuri seluruh gambar. Di setiap posisi, nilai piksel pada gambar dikalikan dengan bobot pada kernel, lalu dijumlahkan. Proses matematika ini disebut **Konvolusi**.

**RUMUS KONVOLUSI:**
$$ g(x,y) = ∑∑ w(s,t) × f(x+s, y+t) $$

- **g(x,y)** = Nilai piksel baru
- **f(...)** = Nilai piksel lama pada area tetangga
- **w(s,t)** = Nilai bobot pada kernel

**MENGAPA?**
Dengan mengatur angka-angka (bobot) di dalam kernel, kita bisa menciptakan berbagai macam efek, mulai dari mengaburkan (blur) hingga menajamkan (sharpen) citra.`,
        observationPoints: []
      },
      {
        title: '03. Average Filter',
        learningGoal: 'Memahami algoritma Average Filter untuk penghalusan gambar.',
        audioUrl: '/audio/modules/modul2_03.mp3',
        content: `**APA?**
Average Filter (Filter Rata-rata) adalah filter sederhana yang mengganti nilai piksel pusat dengan **nilai rata-rata** dari seluruh piksel di dalam kernel tetangganya.

**BAGAIMANA?**
Jika menggunakan kernel 3x3, kita menjumlahkan 9 piksel tetangga dan membaginya dengan 9.
Bentuk matriks kernel Average 3x3:

$$ K = 1/9 × [1, 1, 1] $$
$$          [1, 1, 1] $$
$$          [1, 1, 1] $$

**MENGAPA?**
Tujuannya adalah menghaluskan gambar (smoothing) dengan menghilangkan variasi intensitas yang mendadak. 

**KETERBATASAN:**
Filter ini sangat mudah menyebabkan gambar menjadi "kabur" (blur) secara kasar, sehingga garis batas antar objek (tepi) ikut menghilang.`,
        observationPoints: []
      },
      {
        title: '04. Gaussian Filter',
        learningGoal: 'Memahami penggunaan distribusi normal untuk smoothing yang lebih halus.',
        audioUrl: '/audio/modules/modul2_04.mp3',
        content: `**APA?**
Gaussian Filter mirip dengan Average Filter, tetapi bobot piksel tetangganya tidak sama rata. Piksel yang posisinya lebih dekat ke titik pusat kernel diberi **bobot yang lebih besar** dibandingkan piksel yang lebih jauh.

**BAGAIMANA?**
Pembobotan mengikuti kurva distribusi normal (Lonceng Gauss). 
Contoh kernel Gaussian 3x3:

$$ K = 1/16 × [1, 2, 1] $$
$$           [2, 4, 2] $$
$$           [1, 2, 1] $$

Perhatikan bahwa piksel tengah dikalikan 4, sedangkan di sudut hanya dikalikan 1.

**MENGAPA?**
Dengan memberikan bobot tinggi di pusat, Gaussian Filter menghasilkan efek blur yang jauh lebih **natural dan lembut** (smooth) dibandingkan Average Filter, serta lebih baik dalam mempertahankan struktur utama objek.`,
        observationPoints: []
      },
      {
        title: '05. Median Filter',
        learningGoal: 'Menguasai penggunaan Median Filter untuk mengatasi Salt & Pepper noise.',
        audioUrl: '/audio/modules/modul2_05.mp3',
        content: `**APA?**
Berbeda dengan dua filter sebelumnya yang menggunakan konvolusi penjumlahan, Median Filter adalah filter non-linear. Ia mengganti nilai piksel pusat dengan **nilai tengah (median)** dari piksel-piksel di sekelilingnya setelah diurutkan (sorting).

**BAGAIMANA?**
Misalnya di area 3x3 terdapat intensitas: 
10, 15, 20, 25, 255, 30, 35, 40, 45 (dimana 255 adalah noise putih terang).
Diurutkan: 10, 15, 20, 25, **30**, 35, 40, 45, 255.
Nilai 255 (noise) diganti menjadi **30** (nilai median).

**MENGAPA?**
Filter ini sangat ampuh menghilangkan **Salt & Pepper Noise** (bintik hitam putih ekstrem).

**CONTOH & KEUNGGULAN:**
Median filter dapat menghapus titik-titik noise tanpa membuat tepi (batas) objek menjadi kabur, menjadikannya sangat superior dibanding Average Filter untuk kasus noise impulsif.`,
        observationPoints: []
      },
      {
        title: '06. Analisis Hasil Filter',
        learningGoal: 'Mampu memilih filter yang tepat berdasarkan masalah pada citra.',
        audioUrl: '/audio/modules/modul2_06.mp3',
        content: `Dalam penerapan pengolahan citra dunia nyata, **pemilihan jenis filter sangat menentukan hasil akhir.**

**ANALISIS KASUS:**

1. Jika gambar memiliki noise Gaussian (seperti bintik statis tipis di seluruh area akibat sensor ISO tinggi), gunakan **Gaussian Filter**. Efek blurnya natural.

2. Jika gambar memiliki noise "Salt and Pepper" (titik hitam dan putih yang tegas seperti debu pada lensa), WAJIB gunakan **Median Filter**. Filter lain hanya akan memudarkan titik noise menjadi bercak abu-abu.

3. Semakin **besar ukuran Kernel** (misalnya 7x7 atau 15x15), semakin kuat efek blur yang dihasilkan, namun semakin banyak pula detail informasi gambar yang hilang.

**COBA!**
Gunakan Image Lab, pilih gambar yang ber-noise, lalu bandingkan sendiri hasil dari Gaussian dan Median filter pada ukuran kernel 5x5!`,
        observationPoints: []
      },
      {
        title: '07. Rangkuman & Latihan',
        learningGoal: 'Mengulas poin-poin utama modul Filtering sebelum masuk ke Image Lab.',
        audioUrl: '/audio/modules/modul2_07.mp3',
        content: `**YANG HARUS KAMU INGAT**

1. **Filtering Spasial** dilakukan menggunakan Kernel (Matriks) yang digeser menelusuri gambar.
2. **Average Filter** merata-ratakan nilai tetangga. Menghaluskan gambar tapi membuat tepian kabur.
3. **Gaussian Filter** memberi bobot lebih tinggi pada piksel pusat. Menghasilkan blur yang lebih natural dan lembut.
4. **Median Filter** mengurutkan nilai piksel tetangga lalu mengambil nilai tengahnya. Sangat efektif membunuh "Salt & Pepper Noise" tanpa menghilangkan batas tepian (edges).
5. **Ukuran Kernel** yang lebih besar menyebabkan efek filtering semakin kuat (semakin blur).

**PERTANYAAN REFLEKSI:**
- Apa perbedaan utama cara kerja Average Filter dibandingkan Median Filter?
- Jenis noise apa yang paling sulit dihilangkan oleh Average Filter?
- Mengapa Gaussian Filter memberikan efek visual yang lebih nyaman di mata manusia?

Silakan menuju Image Lab untuk menguji berbagai jenis filter ini secara langsung!`,
        observationPoints: [
          'Eksperimen dengan menaikkan ukuran kernel dari 3x3 hingga 9x9.',
          'Bandingkan Average Filter dan Median Filter pada gambar detail.'
        ]
      }
    ],
    reflection: 'Aturan emas: Jika tujuan utama adalah menghilangkan noise bercak, prioritaskan Median Filter. Jika tujuannya hanya untuk melembutkan gambar sebelum deteksi tepi, gunakan Gaussian Filter.',
    codeExample: `# Python OpenCV - Spatial Filtering
import cv2

img = cv2.imread('noisy_image.png')

# Average / Mean Filter (Kernel 5x5)
avg_blur = cv2.blur(img, (5, 5))

# Gaussian Blur
gaussian_blur = cv2.GaussianBlur(img, (5, 5), 0)

# Median Filter
median_blur = cv2.medianBlur(img, 5)`
  },
  {
    id: 'edge',
    title: 'Segmentasi & Deteksi Tepi — Edge Detection',
    category: 'Modul 03',
    description: 'Temukan diskontinuitas spasial dan batas objek menggunakan algoritma gradien seperti Sobel dan Canny.',
    icon: 'Maximize2',
    color: '#06b6d4',
    topics: [
      {
        title: '01. Cover & Pengantar',
        learningGoal: 'Memahami gambaran umum dari konsep deteksi tepi pada computer vision.',
        audioUrl: '/audio/modules/modul3_01.mp3',
        content: `Selamat datang di Modul 03: Segmentasi dan Deteksi Tepi (Edge Detection).

Deteksi tepi adalah salah satu proses paling krusial dalam Computer Vision. Sebelum komputer bisa mengenali sebuah objek (misalnya mengenali mobil atau wajah), ia harus bisa mendeteksi garis batas dari objek tersebut.

**APA YANG AKAN ANDA PELAJARI?**
- Apa itu "Tepi" (Edge) pada gambar?
- Penggunaan operator matematis turunan (Gradien).
- Perbedaan Operator Sobel, Prewitt, dan Laplacian.
- Algoritma canggih: Canny Edge Detection Pipeline.
- Melakukan segmentasi fitur objek.

Klik tombol **Berikutnya** untuk memulai penjelajahan modul ini!`,
        observationPoints: []
      },
      {
        title: '02. Konsep Tepi (Edge) & Gradien',
        learningGoal: 'Mengerti secara teoritis apa yang didefinisikan sebagai tepi pada gambar digital.',
        audioUrl: '/audio/modules/modul3_02.mp3',
        content: `**APA?**
Tepi (Edge) pada citra digital adalah titik-titik di mana terjadi perubahan nilai intensitas warna/keabuan secara sangat mendadak (diskontinuitas yang tajam).

**MENGAPA?**
Perubahan mendadak ini biasanya menandakan adanya batas antar objek, batas material, atau bayangan yang keras. Menemukan tepi membantu komputer "mengisolasi" objek dari background (segmentasi).

**BAGAIMANA?**
Dalam matematika, cara untuk menemukan tingkat perubahan yang drastis adalah dengan menggunakan **Turunan (Derivative)**. Dalam gambar (karena 2D), turunan ini disebut **Gradien Citra**.

**RUMUS GRADIEN (G):**
Gradien diukur dalam 2 arah:
- **Gx**: Perubahan pada arah horizontal (kiri ke kanan)
- **Gy**: Perubahan pada arah vertikal (atas ke bawah)

Tepi yang sebenarnya adalah total Magnitudo (kekuatan) gradien:
$$ M = √(Gx² + Gy²) $$`,
        observationPoints: []
      },
      {
        title: '03. Operator Sobel & Prewitt',
        learningGoal: 'Membedakan operator turunan pertama Sobel dan Prewitt.',
        audioUrl: '/audio/modules/modul3_03.mp3',
        content: `Untuk menghitung gradien Gx dan Gy, kita mengkonvolusi gambar dengan matriks kernel khusus.

**1. PREWITT**
Prewitt menghitung selisih intensitas piksel tetangga dengan bobot rata.
Contoh kernel Prewitt horizontal (Gx):
$$ [-1, 0, 1] $$
$$ [-1, 0, 1] $$
$$ [-1, 0, 1] $$

**2. SOBEL**
Sobel mirip dengan Prewitt, tetapi memberikan **bobot ganda pada piksel pusat**. Hal ini membuat Sobel lebih tahan terhadap efek noise.
Contoh kernel Sobel horizontal (Gx):
$$ [-1, 0, 1] $$
$$ [-2, 0, 2] $$
$$ [-1, 0, 1] $$

**ANALISIS:**
- Sobel lebih banyak digunakan karena tepi yang dihasilkan lebih tegas dan garis lebih rapi akibat pembobotan pusat.
- Keduanya adalah operator Turunan Pertama (First-order derivative).`,
        observationPoints: []
      },
      {
        title: '04. Operator Laplacian',
        learningGoal: 'Memahami penggunaan turunan kedua untuk menemukan lokasi tepi yang eksak.',
        audioUrl: '/audio/modules/modul3_04.mp3',
        content: `**APA?**
Jika Sobel dan Prewitt menggunakan turunan pertama, Laplacian menggunakan **Turunan Kedua (Second-order derivative)**.

**MENGAPA?**
Turunan pertama menghasilkan grafik gradien yang tebal (tepi terlihat tebal). Turunan kedua mencari lokasi puncak gradien tersebut, yang ditandai dengan nilai yang memotong angka nol (**Zero-crossing**). Ini memungkinkan deteksi tepi yang sangat tipis dan spesifik.

**BAGAIMANA?**
Laplacian adalah operator Isotropik (bekerja ke segala arah, horizontal maupun vertikal secara bersamaan).
Kernel Laplacian standar:
$$ [ 0,  1,  0] $$
$$ [ 1, -4,  1] $$
$$ [ 0,  1,  0] $$

**KETERBATASAN:**
Karena turunan kedua sangat peka terhadap angka, Laplacian **sangat sangat sensitif terhadap noise**. Menggunakan Laplacian pada gambar ber-noise akan menghasilkan bercak putih di mana-mana. Oleh karena itu, gambar selalu harus di-Gaussian Blur dulu sebelum di-Laplacian.`,
        observationPoints: []
      },
      {
        title: '05. Canny Edge Detection',
        learningGoal: 'Mempelajari 5 tahapan pipeline Canny Edge Detection.',
        audioUrl: '/audio/modules/modul3_05.mp3',
        content: `**APA?**
Canny (ditemukan oleh John Canny) bukanlah sekadar satu rumus, melainkan serangkaian tahapan (pipeline) algoritma pintar. Canny secara luas diakui sebagai standar terbaik (gold standard) untuk Edge Detection.

**BAGAIMANA ALUR KERJANYA? (5 TAHAPAN CANNY):**

1. **Gaussian Smoothing**: Filter gambar untuk membuang noise, mencegah deteksi tepi palsu.
2. **Gradient Calculation**: Gunakan operator Sobel untuk menemukan Gx dan Gy (intensitas & arah tepi).
3. **Non-Maximum Suppression (NMS)**: Tahap "penipisan". Hapus piksel di sekitar tepi utama agar garis tepinya setipis 1 piksel (tajam).
4. **Double Thresholding**: Pengguna memasukkan 2 nilai batas (Low & High threshold). 
   - Nilai > High = Pasti tepi (Strong Edge).
   - Low < Nilai < High = Ragu-ragu (Weak Edge).
5. **Hysteresis Tracking**: Weak edge hanya akan diubah menjadi Strong Edge JIKA bersambung/bersentuhan langsung dengan Strong Edge yang lain.

**MENGAPA CANNY TERBAIK?**
Menghasilkan garis batas objek yang bersih, tipis, saling tersambung, dan hampir tidak mendeteksi tekstur yang tidak penting sebagai tepi.`,
        observationPoints: []
      },
      {
        title: '06. Analisis Parameter & Threshold',
        learningGoal: 'Menganalisis dampak perubahan parameter terhadap hasil deteksi tepi.',
        audioUrl: '/audio/modules/modul3_06.mp3',
        content: `Hasil dari Edge Detection, khususnya Canny, sangat bergantung pada penentuan **Threshold**.

**ANALISIS:**
- Jika **High Threshold terlalu kecil**, maka segala tekstur kecil (seperti serat baju, rumput) akan terdeteksi sebagai "Tepi". Gambar menjadi penuh garis putih (noise visual).
- Jika **High Threshold terlalu tinggi**, algoritma akan terlalu ketat. Banyak garis batas asli objek yang hilang atau putus-putus.
- Jika rentang antara Low dan High threshold diperlebar, algoritma Hysteresis memiliki kesempatan lebih banyak untuk menyambung garis-garis yang putus.

**COBA DI IMAGE LAB!**
Saat berada di Image Lab nanti, perhatikan baik-baik slider parameter "Threshold". Mainkan angkanya untuk merasakan bagaimana algoritma "memilih" bagian mana yang dianggap sebagai garis objek.`,
        observationPoints: []
      },
      {
        title: '07. Rangkuman & Latihan',
        learningGoal: 'Mereview kembali esensi Edge Detection.',
        audioUrl: '/audio/modules/modul3_07.mp3',
        content: `**YANG HARUS KAMU INGAT**

1. **Edge (Tepi)**: Perubahan mendadak dari intensitas warna citra, menandakan batas objek.
2. **Sobel**: Deteksi tepi arah vertikal dan horizontal dengan bobot pusat (tahan noise).
3. **Prewitt**: Mirip Sobel namun pembobotan rata.
4. **Laplacian**: Menggunakan turunan kedua (zero-crossing), menghasilkan tepi yang sangat tipis tapi sangat rawan pecah karena noise.
5. **Canny**: Algoritma multi-langkah terbaik yang menggabungkan Gaussian blur, Sobel, Penipisan garis (NMS), dan seleksi Threshold pintar (Hysteresis). Garis rapi dan berkesinambungan.

**PERTANYAAN REFLEKSI:**
- Mengapa kita perlu menghaluskan citra (Smoothing) sebelum melakukan deteksi tepi?
- Apa fungsi tahap "Non-Maximum Suppression" pada algoritma Canny?
- Coba tebak: Apa yang terjadi jika citra hasil Canny digunakan sebagai panduan untuk mewarnai buku gambar otomatis?

Kini Anda telah siap bereksperimen. Mari ke **Image Lab** dan analisis sendiri garis batas gambar Anda!`,
        observationPoints: [
          'Jalankan Canny dan perhatikan ketipisan garisnya.',
          'Bandingkan dengan hasil Sobel yang cenderung lebih tebal.'
        ]
      }
    ],
    reflection: 'Deteksi tepi Canny merupakan fondasi utama dalam computer vision, mulai dari segmentasi objek medis hingga pembacaan lajur jalan (lane detection) pada sistem mobil otonom (self-driving cars).',
    codeExample: `# Python OpenCV - Deteksi Tepi Canny
import cv2

img = cv2.imread('car.png', 0)

# Canny Edge Detection (Low=50, High=150)
canny_edges = cv2.Canny(img, 50, 150)

cv2.imshow('Canny Edges', canny_edges)
cv2.waitKey(0)`
  }
];
