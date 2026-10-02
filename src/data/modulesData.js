export const modulesData = [
  {
    id: 'histogram',
    title: 'Operasi Dasar Citra — Histogram Equalization',
    category: 'Modul 01',
    description: 'Pelajari bagaimana distribusi intensitas warna citra bekerja dan tingkatkan kontras gambar menggunakan metode Histogram Equalization.',
    icon: 'BarChart2',
    color: '#5170FF',
    topics: [
      {
        title: 'Konsep Dasar Histogram Citra',
        learningGoal: 'Memahami bagaimana nilai intensitas derajat keabuan (0-255) terdistribusi pada suatu citra digital.',
        content: `Histogram citra adalah grafik diskrit yang menggambarkan frekuensi kemunculan setiap derajat keabuan (0 hingga 255) pada suatu citra digital. Sumbu mendatar (X) mewakili nilai intensitas piksel, sedangkan sumbu tegak (Y) mewakili jumlah total piksel.

Secara matematis, histogram citra derajat keabuan dengan rentang **[0, L-1]** (di mana L = 256) didefinisikan sebagai:
$$h(r_k) = n_k$$
di mana **r_k** adalah tingkat keabuan ke-k dan **n_k** adalah jumlah piksel yang memiliki nilai keabuan **r_k**.

**Ciri-ciri Citra Berdasarkan Histogram:**
- **Citra Gelap (Low-key)**: Komponen histogram terkonsentrasi di sebelah kiri (mendekati 0).
- **Citra Terang (High-key)**: Komponen histogram terkonsentrasi di sebelah kanan (mendekati 255).
- **Citra Kontras Rendah**: Histogram menyempit di tengah rentang skala.
- **Citra Kontras Tinggi**: Histogram tersebar luas merata di seluruh rentang skala keabuan.`,
        observationPoints: [
          'Amati grafik histogram citra asli sebelum proses equalization.',
          'Perhatikan apakah puncak grafik menumpuk di area gelap (kiri) atau terang (kanan).',
          'Catat perbedaan kontras visual antara daerah gelap dan terang.'
        ]
      },
      {
        title: 'Algoritma Histogram Equalization',
        learningGoal: 'Memahami transformasi fungsi Kumulatif (CDF) dalam meratakan kontras citra secara otomatis.',
        content: `Histogram Equalization (Pemerataan Histogram) adalah teknik otomatis untuk meningkatkan kontras global citra dengan cara meratakan distribusi intensitas keabuan.

Fungsi pemetaan berdasarkan **Cumulative Distribution Function (CDF)**:
$$s_k = T(r_k) = (L - 1) \\sum_{j=0}^{k} p_r(r_j) = \\frac{L - 1}{MN} \\sum_{j=0}^{k} n_j$$

**Keterangan Variabel:**
- **MN**: Jumlah total piksel citra (Lebar × Tinggi)
- **L**: Jumlah tingkat derajat keabuan (256)
- **n_j**: Jumlah piksel dengan intensitas keabuan j

**Langkah Kerja Algoritma:**
1. Hitung histogram frekuensi kemunculan piksel.
2. Hitung nilai akumulasi kumulatif (CDF) dari derajat keabuan 0 sampai 255.
3. Petakan piksel lama ke nilai baru menggunakan rumus rasio CDF.
4. Hasilkan citra baru dengan distribusi kontras yang seragam.`,
        observationPoints: [
          'Bagaimana grafik histogram sesudah equalization berubah menjadi lebih rata dan tersebar luas?',
          'Apakah detail objek tersembunyi pada area gelap menjadi terlihat jelas?',
          'Bagaimana bentuk grafik perbandingan histogram sebelum dan sesudah equalization?'
        ]
      }
    ],
    reflection: 'Histogram Equalization sangat cocok digunakan untuk citra yang terlalu gelap atau memiliki kontras rendah. Namun, pada citra yang sudah memiliki kontras seimbang, metode ini kadang dapat menimbulkan efek noise berlebihan.',
    codeExample: `# Python OpenCV - Histogram Equalization
import cv2
import matplotlib.pyplot as plt

# 1. Baca gambar dalam mode Grayscale
img = cv2.imread('cityscape.jpg', 0)

# 2. Terapkan Histogram Equalization
equ = cv2.equalizeHist(img)

# 3. Tampilkan hasil
cv2.imshow('Original Image', img)
cv2.imshow('Equalized Image', equ)
cv2.waitKey(0)
cv2.destroyAllWindows()`
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
        title: 'Konvolusi Spasial & Matriks Kernel',
        learningGoal: 'Memahami bagaimana operasi matriks konvolusi mengolah tetangga piksel untuk efek penghalusan (smoothing).',
        content: `Filtering spasial bekerja dengan menggeser matriks kecil bernilai numerik yang disebut **Kernel** (atau Mask/Filter) di atas setiap piksel citra. Operasi matematika ini disebut **Konvolusi Spasial 2D**.

Rumus Konvolusi Spasial Diskrit:
$$g(x,y) = \\sum_{s=-a}^{a} \\sum_{t=-b}^{b} w(s,t) f(x+s, y+t)$$
di mana **w(s,t)** adalah nilai bobot matriks kernel, dan **f(x,y)** adalah nilai piksel asal.

**Contoh Matriks Kernel Average (3x3):**
$$K = \\frac{1}{9} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}$$`,
        observationPoints: [
          'Perhatikan bahwa kernel kecil (3x3) menghaluskan gambar secara lembut.',
          'Kernel yang lebih besar (7x7 atau 9x9) membuat gambar terlihat semakin kabur (blur).',
          'Amati bahwa detail garis halus akan memudar seiring bertambahnya ukuran kernel.'
        ]
      },
      {
        title: 'Jenis Spatial Smoothing Filter',
        learningGoal: 'Membedakan karakteristik dan fungsi Average Filter, Gaussian Filter, dan Median Filter.',
        content: `Terdapat tiga filter pemulus utama dalam pengolahan citra:

1. **Average (Mean) Filter**: Mengganti nilai piksel pusat dengan nilai rata-rata dari seluruh piksel di dalam tetangga kernel **N × N**. Efektif menghapus noise acak tetapi membuat tepi objek menjadi kabur.
2. **Gaussian Filter**: Menggunakan matriks pembobotan berdasarkan kurva distribusi lonceng Gaussian. Piksel yang lebih dekat ke pusat kernel diberi bobot lebih tinggi.
3. **Median Filter**: Mengganti piksel pusat dengan nilai **median (nilai tengah)** dari tetangganya setelah diurutkan. Sangat ampuh menghapus noise **Salt & Pepper** tanpa mengaburkan garis tepi objek.`,
        observationPoints: [
          'Bandingkan perbedaan kejelasan garis tepi antara Gaussian Blur dan Median Filter.',
          'Mengapa Median Filter jauh lebih baik dalam mempertahankan ketajaman batas objek dibanding Average Filter?'
        ]
      }
    ],
    reflection: 'Pemilihan filter spasial tergantung pada jenis noise yang ada pada citra. Untuk noise impulsif (titik hitam-putih), gunakan Median Filter. Untuk penghalusan alami tanpa patahan tajam, gunakan Gaussian Filter.',
    codeExample: `# Python OpenCV - Filtering Spasial
import cv2

img = cv2.imread('noisy_image.png')

# 1. Average / Mean Filter (Kernel 5x5)
avg_blur = cv2.blur(img, (5, 5))

# 2. Gaussian Blur (Kernel 5x5, sigma=0)
gaussian_blur = cv2.GaussianBlur(img, (5, 5), 0)

# 3. Median Filter (Kernel size 5)
median_blur = cv2.medianBlur(img, 5)`
  },
  {
    id: 'edge',
    title: 'Segmentasi & Deteksi Tepi — Edge Detection',
    category: 'Modul 03',
    description: 'Temukan diskontinuitas spasial dan pembatas objek pada citra dengan algoritma Sobel, Canny, Prewitt, dan Laplacian.',
    icon: 'Maximize2',
    color: '#06b6d4',
    topics: [
      {
        title: 'Prinsip Deteksi Tepi & Gradien Citra',
        learningGoal: 'Memahami bagaimana turunan pertama dan kedua mengidentifikasi diskontinuitas kecerahan piksel.',
        content: `Deteksi tepi (Edge Detection) bertujuan mengidentifikasi titik-titik pada citra digital yang memiliki perubahan kecerahan secara drastis/diskontinu. Tepi menandakan batas objek, perubahan orientasi permukaan, atau batas material.

Operator turunan pertama mengukur gradien citra:
$$\\nabla f = \\begin{bmatrix} G_x \\\\ G_y \\end{bmatrix} = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix}$$

Magnitudo Gradien Total:
$$M(x,y) = \\sqrt{G_x^2 + G_y^2}$$

- **Sobel Operator**: Menggunakan kernel 3x3 berbobot pusat untuk menghitung turunan parsial horizontal (Gx) dan vertikal (Gy).
- **Prewitt Operator**: Serupa dengan Sobel namun menggunakan pembobotan seragam tanpa penekanan piksel pusat.
- **Laplacian Operator**: Menggunakan turunan orde kedua (isotropik) untuk mendeteksi perpotongan nol (*zero-crossing*).`,
        observationPoints: [
          'Amati perbedaan garis tepi yang dihasilkan oleh Operator Sobel vs Prewitt.',
          'Bagaimana nilai threshold mempengaruhi jumlah piksel tepi yang terdeteksi?'
        ]
      },
      {
        title: 'Algoritma Deteksi Tepi Canny (5-Stage Pipeline)',
        learningGoal: 'Memahami tahapan algoritma Canny dari penghalusan Gaussian hingga hysteresis thresholding.',
        content: `Algoritma Canny dianggap sebagai standar emas deteksi tepi karena menghasilkan garis tepi yang tipis dan presisi.

**5 Tahapan Utama Pipeline Canny:**
1. **Gaussian Smoothing**: Mereduksi noise pada citra asal dengan Gaussian Filter.
2. **Gradient Calculation**: Menghitung magnitudo dan arah sudut gradien menggunakan operator Sobel.
3. **Non-Maximum Suppression (NMS)**: Menipiskan garis tepi dengan hanya mempertahankan piksel yang merupakan nilai maksimum lokal searah gradien.
4. **Double Thresholding**: Pengelompokan piksel menggunakan **Low Threshold** dan **High Threshold** (Strong Edge, Weak Edge, Non-Edge).
5. **Hysteresis Edge Tracking**: Mempertahankan *Weak Edge* hanya jika terhubung langsung secara 8-tetangga dengan *Strong Edge*.`,
        observationPoints: [
          'Cobalah menaikkan High Threshold pada simulasi Canny.',
          'Amati bagaimana garis tepi palsu atau noise menghilang sementara garis utama objek tetap terhubung.'
        ]
      }
    ],
    reflection: 'Deteksi tepi Canny merupakan fondasi utama dalam visi komputer (computer vision) seperti segmentasi objek, pengenalan plat nomor, dan pemrosesan kendaraan otonom.',
    codeExample: `# Python OpenCV - Deteksi Tepi Sobel & Canny
import cv2

img = cv2.imread('coins.png', 0)

# 1. Sobel Edge Detection
sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel_combined = cv2.magnitude(sobelx, sobely)

# 2. Canny Edge Detection (Low=50, High=150)
canny_edges = cv2.Canny(img, 50, 150)`
  }
];
