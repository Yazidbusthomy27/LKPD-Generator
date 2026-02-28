# Generator LKPD Otomatis (Kurikulum Merdeka)

Aplikasi web untuk membuat Lembar Kerja Peserta Didik (LKPD) Kurikulum Merdeka secara otomatis menggunakan AI (Google Gemini).

## Fitur

- **Generator LKPD**: Membuat LKPD lengkap berdasarkan input pengguna (Jenjang, Fase, Mata Pelajaran, dll).
- **Panduan**: Informasi lengkap tentang cara menggunakan aplikasi dan tips membuat prompt yang baik.
- **Ekspor PDF**: Unduh hasil LKPD dalam format PDF siap cetak.
- **Edit & Kustomisasi**: Edit hasil generasi AI sebelum diunduh.

## Teknologi

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **AI**: Google Gemini API (`gemini-3-flash-preview`)
- **Icons**: Lucide React
- **Animation**: Framer Motion

## Persiapan Deployment

Sebelum melakukan deployment, pastikan Anda memiliki:

1.  Akun **GitHub**
2.  Akun **Vercel**
3.  **API Key Google Gemini** (Dapatkan di [aistudio.google.com](https://aistudio.google.com/))

## Cara Deploy ke Vercel

### Langkah 1: Push ke GitHub

1.  Buka terminal di folder proyek ini.
2.  Inisialisasi git dan commit semua file:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3.  Buat repository baru di GitHub.
4.  Hubungkan repository lokal dengan remote GitHub:
    ```bash
    git branch -M main
    git remote add origin https://github.com/USERNAME/NAMA-REPO.git
    git push -u origin main
    ```

### Langkah 2: Deploy di Vercel

1.  Buka dashboard [Vercel](https://vercel.com/dashboard).
2.  Klik **"Add New..."** -> **"Project"**.
3.  Pilih repository GitHub yang baru saja Anda buat.
4.  Klik **"Import"**.
5.  Pada bagian **"Environment Variables"**, tambahkan:
    -   **Key**: `GEMINI_API_KEY`
    -   **Value**: Masukkan API Key Google Gemini Anda.
6.  Klik **"Deploy"**.

### Langkah 3: Selesai!

Tunggu proses build selesai. Vercel akan memberikan URL aplikasi Anda (misalnya: `https://nama-proyek.vercel.app`).

## Catatan Penting Keamanan

Aplikasi ini menggunakan API Key di sisi klien (Client-Side) untuk kemudahan deployment. Harap berhati-hati saat membagikan URL aplikasi Anda secara publik, karena API Key dapat terlihat di inspect element browser.

Untuk keamanan lebih baik di produksi, disarankan untuk memindahkan logika pemanggilan API ke backend (Serverless Function).
