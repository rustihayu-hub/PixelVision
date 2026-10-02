export const quizQuestions = [
  {
    id: 1,
    question: "Apa tujuan utama dari Histogram Equalization dalam pengolahan citra digital?",
    options: [
      "Menghapus noise titik-titik acak pada gambar",
      "Meningkatkan kontras global citra dengan meratakan distribusi intensitas piksel",
      "Mendeteksi garis tepi horizontal dan vertikal",
      "Mengompresi ukuran file gambar tanpa menguraikan kualitas"
    ],
    answer: 1,
    explanation: "Histogram Equalization mendistribusikan ulang derajat keabuan secara merata di seluruh rentang (0-255) untuk meningkatkan kontras gambar yang mulanya terlalu gelap atau terlalu terang."
  },
  {
    id: 2,
    question: "Filter manakah yang paling efektif untuk mereduksi noise jenis 'Salt and Pepper' tanpa membuat tepi citra menjadi kabur?",
    options: [
      "Gaussian Filter",
      "Average Filter",
      "Median Filter",
      "Sobel Filter"
    ],
    answer: 2,
    explanation: "Median Filter mengganti nilai piksel pusat dengan nilai tengah (median) dari tetangganya, sangat ampuh menghilangkan noise impulsif (salt & pepper) sambil mempertahankan ketajaman tepi."
  },
  {
    id: 3,
    question: "Algoritma deteksi tepi Canny memiliki keunggulan dibandingkan operator Sobel karena menggunakan teknik...",
    options: [
      "Non-Maximum Suppression & Hysteresis Thresholding",
      "Transformasi Fourier Cepat (FFT)",
      "Binarisasi Otomatis Otsu",
      "Filter High-Pass Sederhana"
    ],
    answer: 0,
    explanation: "Algoritma Canny melakukan perataan Gaussian, perhitungan gradien, penekanan non-maksimum (NMS), dan ambang batas ganda (hysteresis) untuk menghasilkan garis tepi yang tipis dan akurat."
  },
  {
    id: 4,
    question: "Kernel Sobel horizontal (Gx) dirancang untuk mendeteksi perubahan intensitas piksel pada arah...",
    options: [
      "Vertikal (Garis mendatar)",
      "Horizontal (Garis tegak)",
      "Diagonal 45 derajat",
      "Melingkar"
    ],
    answer: 1,
    explanation: "Kernel Sobel Gx mengukur perbedaan intensitas antara kolom kiri dan kanan, sehingga sangat sensitif terhadap perubahan intensitas horizontal (tepi vertikal)."
  },
  {
    id: 5,
    question: "Apa efek utama dari memperbesar ukuran kernel (misalnya dari 3x3 ke 9x9) pada Gaussian Filter?",
    options: [
      "Gambar menjadi jauh lebih tajam",
      "Efek kekaburan (blur) semakin kuat dan detail halus akan hilang",
      "Warna gambar berubah menjadi kontras tinggi",
      "Ukuran file gambar berkurang secara drastis"
    ],
    answer: 1,
    explanation: "Semakin besar area tetangga yang dihitung (kernel size), semakin luas cakupan rerata pembobotan Gaussian sehingga menghasilkan efek blurring yang lebih intensif."
  },
  {
    id: 6,
    question: "Operator Laplacian tergolong ke dalam jenis turunan orde ke berapa dalam pengolahan citra?",
    options: [
      "Turunan Orde Pertama (First-order derivative)",
      "Turunan Orde Kedua (Second-order derivative)",
      "Turunan Orde Ketiga",
      "Bukan fungsi turunan"
    ],
    answer: 1,
    explanation: "Laplacian adalah operator isotropik turunan orde kedua yang mengukur laju perubahan gradien citra (zero-crossing)."
  },
  {
    id: 7,
    question: "Fungsi Cumulative Distribution Function (CDF) digunakan pada algoritma...",
    options: [
      "Histogram Equalization",
      "Canny Edge Detection",
      "Median Filtering",
      "Image Binarization"
    ],
    answer: 0,
    explanation: "CDF digunakan untuk memetakan tingkat keabuan piksel lama ke derajat keabuan baru agar distribusi histogram menjadi lebih seragam."
  },
  {
    id: 8,
    question: "Manakah perbedaan utama antara operator Prewitt dan Sobel?",
    options: [
      "Prewitt menggunakan pembobotan Gaussian pada piksel pusat",
      "Sobel memberikan pembobotan lebih tinggi (bobot 2) pada piksel pusat tetangga",
      "Sobel hanya bekerja pada gambar RGB",
      "Prewitt lebih lambat daripada Sobel"
    ],
    answer: 1,
    explanation: "Sobel memiliki bobot [-1, 0, 1; -2, 0, 2; -1, 0, 1] yang memberikan penekanan lebih pada titik tengah untuk mengurangi efek smoothing berlebih dibanding Prewitt."
  },
  {
    id: 9,
    question: "Kapan metode hysteresis thresholding pada Canny menganggap suatu piksel batas (weak edge) sebagai tepi nyata?",
    options: [
      "Jika nilainya lebih rendah dari Low Threshold",
      "Jika terhubung dengan piksel tepi kuat (strong edge) di sekitarnya",
      "Jika nilainya persis sama dengan High Threshold",
      "Jika piksel tersebut berada di sudut gambar"
    ],
    answer: 1,
    explanation: "Piksel tepi lemah (antara Low & High threshold) hanya akan dipertahankan sebagai tepi jika terhubung dengan setidaknya satu piksel tepi kuat (>= High threshold)."
  },
  {
    id: 10,
    question: "Mengapa pemrosesan citra berbasis Canvas API sangat efisien untuk media pembelajaran web interaktif?",
    options: [
      "Karena membutuhkan server superkomputer",
      "Karena pemrosesan gambar dilakukan secara lokal langsung di browser pengguna tanpa latency server",
      "Karena Canvas API menghapus seluruh metadata gambar",
      "Karena Canvas API tidak membutuhkan kode JavaScript"
    ],
    answer: 1,
    explanation: "Canvas API mengeksekusi manipulasi piksel langsung di browser client (client-side execution), memberikan respon real-time yang cepat dan privat."
  }
];
