import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { FormLKPD } from './components/FormLKPD';
import { PreviewLKPD } from './components/PreviewLKPD';
import { LoadingScreen } from './components/LoadingScreen';
import { generateLKPD } from './services/gemini';
import { LKPDFormData } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'panduan'>('generator');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LKPDFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateLKPD(data);
      setGeneratedContent(content);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat LKPD');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {isLoading && <LoadingScreen />}
      
      {activeTab === 'generator' ? (
        <div className="space-y-8">
          {/* Hero Section */}
          {!generatedContent && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Buat LKPD Kurikulum Merdeka dalam Hitungan Detik
              </h2>
              <p className="text-lg text-slate-600">
                Generator otomatis berbasis AI untuk membantu guru menyusun Lembar Kerja Peserta Didik yang sesuai standar, kreatif, dan bermakna.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {/* Main Content */}
          {generatedContent ? (
            <PreviewLKPD content={generatedContent} onReset={handleReset} />
          ) : (
            <FormLKPD onSubmit={handleGenerate} isLoading={isLoading} />
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 prose prose-slate">
          <h2>Panduan Penggunaan</h2>
          <p>Selamat datang di Generator LKPD Otomatis. Berikut adalah cara menggunakan aplikasi ini:</p>
          
          <h3>1. Isi Identitas & Target</h3>
          <p>Lengkapi data jenjang, fase, mata pelajaran, kelas, dan semester. Pastikan fase sesuai dengan jenjang (misal: Fase A untuk kelas 1-2 SD).</p>

          <h3>2. Tentukan Materi & Tujuan</h3>
          <p>Masukkan topik materi yang spesifik dan tujuan pembelajaran yang ingin dicapai. Semakin detail tujuan, semakin akurat hasil LKPD.</p>

          <h3>3. Pilih Model & Karakter</h3>
          <p>Pilih model pembelajaran (seperti PBL atau PjBL) dan dimensi Profil Pelajar Pancasila yang ingin dikuatkan dalam aktivitas.</p>

          <h3>4. Generate & Edit</h3>
          <p>Klik tombol "Generate LKPD" dan tunggu sebentar. Setelah hasil muncul, Anda bisa mengedit teksnya secara langsung jika ada yang perlu disesuaikan.</p>

          <h3>5. Unduh</h3>
          <p>Anda dapat mengunduh hasil LKPD dalam format PDF atau menyalin teksnya ke aplikasi pengolah kata lain (Word/Docs).</p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 not-prose mt-8">
            <h4 className="font-semibold text-blue-800 mb-2">Tips untuk Hasil Terbaik:</h4>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Gunakan kata kerja operasional pada Tujuan Pembelajaran.</li>
              <li>Spesifikkan materi (misal: "Pecahan Senilai dengan Benda Konkret" alih-alih hanya "Pecahan").</li>
              <li>Pilih jenis soal yang variatif untuk mengukur pemahaman siswa secara menyeluruh.</li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
