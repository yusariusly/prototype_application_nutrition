# Laporan Pengembangan Fitur Aplikasi NutriFlow

Dokumen ini merangkum seluruh fitur dan sistem yang telah berhasil ditambahkan serta ditingkatkan selama proses pengembangan aplikasi **NutriFlow**. 

Aplikasi ini telah berevolusi menjadi sebuah ekosistem yang terintegrasi untuk klien, praktisi/ahli gizi, dan administrator utama.

## 1. Arsitektur Multi-Portal
Sistem telah dipecah menjadi tiga portal utama yang saling tersinkronisasi untuk melayani pengguna dengan hak akses yang berbeda:

### A. Portal Klien (Client App)
*   **Dasbor Utama**: Menampilkan ringkasan progres harian dan metrik kesehatan klien.
*   **Target Kalori & Nutrisi**: Fitur untuk menetapkan dan melacak batas asupan kalori.
*   **Rencana Makan Mingguan**: Antarmuka untuk melihat jadwal dan daftar menu makanan yang disarankan oleh praktisi.
*   **AI Food Scanner**: Pemindai makanan pintar berbasis AI untuk memudahkan pencatatan asupan harian secara otomatis.

### B. Portal Praktisi Spesialis (`admin/`)
*   **Dasbor Praktisi**: Halaman manajemen bagi para ahli gizi untuk memantau metrik kesehatan klien yang ditugaskan kepada mereka.
*   **Weekly Meal Builder**: Fitur interaktif *drag-and-drop* untuk menyusun rencana menu makan mingguan klien secara praktis.
*   **Custom Food Creator**: Alat bantu untuk membuat atau menambahkan entri makanan dan bahan kustom baru.
*   **Manajemen Profil & Notifikasi**: Pembaruan sistem profil khusus praktisi dan fitur lonceng notifikasi untuk pembaruan aktivitas klien.

### C. Portal Super Admin (`control-center/`)
*   **Pusat Kontrol (Control Center)**: Portal teratas bagi admin utama untuk mengelola aplikasi.
*   **Alokasi Pengguna**: Mengatur pembagian dan menugaskan klien kepada praktisi gizi yang tepat.
*   **Sinkronisasi Data Terpusat**: Memastikan bahwa data praktisi, pasien, dan target nutrisi selalu sinkron di ketiga portal.

## 2. Peningkatan Fitur Resep dan Manajemen Makanan
*   **Pemisahan Struktur Resep**: Form input resep kini dipisah menjadi tabel *Ingredients* (Bahan-bahan) dan *Instructions* (Cara Pembuatan), yang diwajibkan untuk diisi.
*   **Sistem Draft & Publish**: Praktisi dapat menyimpan rencana menu makan dalam status "Draft" dan mempublikasikannya ("Publish") saat sudah siap dikirimkan kepada klien.
*   **Database Resep Bawaan**: Populasinya data (lookup tables) resep bawaan langsung dari sisi *client* untuk mempercepat respons saat mencari makanan.

## 3. Integrasi Telekesehatan (Telehealth)
*   **Halaman Konsultasi Virtual (`telehealth.html`)**: Modul yang dipersiapkan khusus untuk sesi tatap muka secara virtual maupun perpesanan antara klien dan spesialis gizi mereka.

## 4. Tampilan Publik & Halaman Konten (Fase Terkini)
*   **Pembaruan Landing Page (v1 & v2)**: Pembuatan halaman beranda sebagai sarana promosi dan pengenalan platform bagi pengguna baru, yang kini sudah diperbarui menjadi versi 2.
*   **Halaman Artikel (`article.html`)**: Fitur edukasi untuk menampilkan artikel-artikel terkait kesehatan dan nutrisi.
*   **Halaman Direktori Spesialis (`specialist.html`)**: Menampilkan daftar profil para spesialis/ahli gizi yang tersedia di dalam platform.

## 5. Peningkatan Infrastruktur & Aksesibilitas
*   **Dukungan Multi-bahasa (i18n)**: Implementasi berkas `src/i18n.js` yang memungkinkan terjemahan teks (lokalisasi) secara dinamis pada halaman publik.
*   **Sistem Autentikasi Spesifik**: Penyesuaian antarmuka login untuk membedakan jalur akses bagi klien (`login.html`), praktisi (`admin/login.html`), dan super admin (`control-center/login.html`).
*   **Tanggal dan Jadwal Dinamis**: Konversi seluruh elemen penanggalan, kalender, dan janji temu agar dihasilkan secara dinamis mengikuti waktu (*current system time*) saat ini.

---
*Laporan ini dihasilkan berdasarkan riwayat komit repositori hingga fase pengembangan tahap terkini.*
