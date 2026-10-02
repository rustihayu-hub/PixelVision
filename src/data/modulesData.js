export const modulesData = [
  {
    id: 'histogram',
    title: 'Operasi Dasar Citra — Histogram Equalization',
    category: 'Modul 1',
    description: 'Pelajari bagaimana distribusi intensitas warna citra bekerja dan tingkatkan kontras gambar menggunakan metode Histogram Equalization.',
    icon: 'BarChart2',
    color: '#5170FF',
    topics: [
      {
        title: 'Konsep Dasar Histogram',
        content: `Histogram citra adalah grafik yang menggambarkan frekuensi kemunculan setiap derajat keabuan (0 hingga 255) pada suatu citra digital. Sumbu mendatar (X) mewakili nilai intensitas piksel, sedangkan sumbu tegak (Y) mewakili jumlah piksel yang memiliki intensitas tersebut.

Secara matematis, histogram citra derajat keabuan dengan rentang $[0, L-1]$ didefinisikan sebagai fungsi diskrit:
$$h(r_k) = n_k$$
di mana $r_k$ adalah nilai keabuan ke-$k$ dan $n_k$ adalah jumlah piksel dalam citra yang memiliki derajat keabuan $r_k$.`
      },
      {
        title: 'Histogram Equalization',
        content: `Histogram Equalization (Pemerataan Histogram) adalah teknik peningkatan kontras citra secara otomatis. Metode ini memetakan kembali distribusi derajat keabuan piksel sehingga histogram dari citra hasil memiliki distribusi yang mendatar atau relatif seragam.

Fungsi pemetaan berdasarkan Cumulative Distribution Function (CDF):
$$s_k = T(r_k) = (L-1) \sum_{j=0}^{k} p_r(r_j) = \frac{L-1}{MN} \sum_{j=0}^{k} n_j$$

Di mana:
- $MN$: Jumlah total piksel citra (Lebar × Tinggi)
- $L$: Jumlah tingkat derajat keabuan (biasanya 256)
- $n_j$: Jumlah piksel dengan derajat keabuan $j$`
      }
    ],
    codeExample: `import cv2
import matplotlib.pyplot as plt

# 1. Baca gambar dalam mode Grayscale
img = cv2.imread('cityscape.jpg', 0)

# 2. Terapkan Histogram Equalization
equ = cv2.equalizeHist(img)

# 3. Tampilkan hasil dengan OpenCV/Matplotlib
cv2.imshow('Original Image', img)
cv2.imshow('Equalized Image', equ)
cv2.waitKey(0)
cv2.destroyAllWindows()`
  },
  {
    id: 'filtering',
    title: 'Enhancement & Filtering — Noise Reduction',
    category: 'Modul 2',
    description: 'Eksplorasi teknik penyaringan citra spasial menggunakan Gaussian Blur, Median Filter, Average Filter, dan pembobotan konvolusi.',
    icon: 'Sliders',
    color: '#8b5cf6',
    topics: [
      {
        title: 'Konvolusi Spasial & Kernel',
        content: `Filtering spasial bekerja dengan menggeser matriks kecil bernilai numerik yang disebut **Kernel** (atau Mask/Filter) di atas setiap piksel citra. Operasi matematika ini disebut Konvolusi.

Rumus Konvolusi 2D diskrit:
$$g(x,y) = \sum_{s=-a}^{a} \sum_{t=-b}^{b} w(s,t) f(x+s, y+t)$$
di mana $w(s,t)$ adalah nilai bobot matriks kernel, dan $f(x,y)$ adalah piksel asal.`
      },
      {
        title: 'Jenis-jenis Spatial Filter',
        content: `1. **Average (Mean) Filter**: Mengganti nilai piksel pusat dengan rata-rata seluruh piksel di dalam tetangga kernel $N \times N$.
2. **Gaussian Filter**: Menggunakan matriks pembobotan berdasarkan kurva distribusi lonceng Gaussian. Efektif mereduksi noise Gaussian tanpa menghilangkan ketajaman objek terlalu ekstrem.
3. **Median Filter**: Mengganti piksel dengan nilai median (nilai tengah setelah diurutkan). Sangat ampuh menghapus noise *Salt and Pepper*.`
      }
    ],
    codeExample: `import cv2

img = cv2.imread('noisy_sample.png')

# 1. Gaussian Blur (Kernel 5x5)
gaussian = cv2.GaussianBlur(img, (5, 5), 0)

# 2. Median Filter (Kernel 5x5)
median = cv2.medianBlur(img, 5)

# 3. Average Filter
blur = cv2.blur(img, (5, 5))`
  },
  {
    id: 'edge',
    title: 'Segmentasi & Deteksi Tepi — Edge Detection',
    category: 'Modul 3',
    description: 'Temukan diskontinuitas spasial dan pembatas objek pada citra dengan algoritma Sobel, Canny, Prewitt, dan Laplacian.',
    icon: 'Maximize2',
    color: '#06b6d4',
    topics: [
      {
        title: 'Prinsip Deteksi Tepi',
        content: `Deteksi tepi (Edge Detection) bertujuan mengidentifikasi titik-titik pada citra digital yang memiliki perubahan kecerahan secara drastis/diskontinu. Tepi menandakan batas objek, perubahan orientasi permukaan, atau batas material.

Operator turunan pertama mengukur gradien citra:
$$\nabla f = \left[ \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right]^T$$
Besar magnitudo gradien:
$$M(x,y) = \sqrt{G_x^2 + G_y^2}$$`
      },
      {
        title: 'Algoritma Sobel & Canny',
        content: `- **Sobel Operator**: Menggunakan kernel $3 \times 3$ berbobot pusat untuk menghitung gradien parsial $G_x$ dan $G_y$.
- **Canny Edge Detector**: Standar emas deteksi tepi 5 tahap:
  1. Perataan noise dengan Gaussian Filter.
  2. Perhitungan Magnitudo & Arah Gradien.
  3. Non-Maximum Suppression (NMS) untuk menipiskan garis tepi.
  4. Double Thresholding (Low & High threshold).
  5. Edge Tracking by Hysteresis.`
      }
    ],
    codeExample: `import cv2

img = cv2.imread('coins.png', 0)

# 1. Sobel Edge Detection
sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel_combined = cv2.magnitude(sobelx, sobely)

# 2. Canny Edge Detection (Threshold Low=100, High=200)
canny_edges = cv2.Canny(img, 100, 200)`
  }
];
