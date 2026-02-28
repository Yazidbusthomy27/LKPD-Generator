import { LKPDFormData } from "../types";

export async function generateLKPD(data: LKPDFormData): Promise<string> {
  // Use gemini-3-flash-preview as per guidelines for basic text tasks
  const model = "gemini-3-flash-preview"; 
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Pastikan variabel lingkungan GEMINI_API_KEY telah diatur.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const profilPancasila = Object.entries(data.profilPelajarPancasila)
    .filter(([_, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()) // format camelCase to readable
    .join(", ");

  const prompt = `
    Bertindaklah sebagai ahli kurikulum dan pembuat perangkat ajar profesional untuk Kurikulum Merdeka di Indonesia.
    Buatkan Lembar Kerja Peserta Didik (LKPD) yang lengkap, formal, dan siap cetak berdasarkan data berikut:

    - Jenjang: ${data.jenjang}
    - Fase: ${data.fase}
    - Mata Pelajaran: ${data.mataPelajaran}
    - Kelas: ${data.kelas}
    - Semester: ${data.semester}
    - Materi/Topik: ${data.materi}
    - Tujuan Pembelajaran: ${data.tujuanPembelajaran}
    - Alokasi Waktu: ${data.alokasiWaktu}
    - Model Pembelajaran: ${data.modelPembelajaran}
    - Profil Pelajar Pancasila yang dikuatkan: ${profilPancasila}
    - Jenis Soal: ${data.jenisSoal}
    - Jumlah Soal: ${data.jumlahSoal}

    Struktur LKPD HARUS mengikuti format berikut secara berurutan:
    1. **Identitas LKPD** (Nama Sekolah [kosongkan untuk diisi], Mata Pelajaran, Kelas/Semester, Materi, Alokasi Waktu).
    2. **Capaian Pembelajaran (CP)** (Buatkan CP yang sesuai dengan Fase ${data.fase} dan materi ${data.materi}).
    3. **Tujuan Pembelajaran** (Gunakan kalimat operasional yang terukur).
    4. **Petunjuk Belajar** (Langkah-langkah bagi siswa dalam mengerjakan LKPD).
    5. **Materi Singkat** (Ringkasan materi yang relevan, padat, dan jelas untuk membantu siswa).
    6. **Kegiatan Pembelajaran** (Aktivitas siswa yang sesuai dengan model ${data.modelPembelajaran}. Bagi menjadi: Pendahuluan, Inti, Penutup).
    7. **Lembar Aktivitas Siswa** (Tempat siswa mengerjakan tugas utama, bisa berupa tabel, diagram, atau pertanyaan pemantik).
    8. **Latihan Soal** (Buatkan ${data.jumlahSoal} soal dengan jenis ${data.jenisSoal}. Jika Pilihan Ganda, sertakan kunci jawaban di bagian paling bawah terpisah. Jika HOTS, pastikan soal menuntut analisis/evaluasi).
    9. **Rubrik Penilaian** (Kriteria penilaian untuk aktivitas dan soal).
    10. **Refleksi** (Pertanyaan refleksi untuk siswa dan guru).

    Gunakan format Markdown yang rapi. Gunakan heading (#, ##, ###) untuk struktur.
    Bahasa harus formal, edukatif, mudah dipahami siswa ${data.jenjang}, dan sesuai Ejaan Bahasa Indonesia (EBI).
    Jangan sertakan teks pembuka seperti "Berikut adalah LKPD..." langsung mulai dari Judul LKPD.
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Details:", errorData);
      throw new Error(`Gagal menghubungi AI: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Format respons AI tidak sesuai atau kosong.");
    }

  } catch (error) {
    console.error("Error generating LKPD:", error);
    throw new Error("Terjadi kesalahan saat menghubungi AI. Pastikan koneksi internet lancar.");
  }
}
