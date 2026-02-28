import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LKPDFormData, Jenjang, Fase, ModelPembelajaran, JenisSoal } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

interface FormLKPDProps {
  onSubmit: (data: LKPDFormData) => void;
  isLoading: boolean;
}

export const FormLKPD: React.FC<FormLKPDProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<LKPDFormData>({
    defaultValues: {
      jenjang: 'SD',
      fase: 'A',
      mataPelajaran: '',
      kelas: '',
      semester: '1',
      materi: '',
      tujuanPembelajaran: '',
      alokasiWaktu: '2 JP (2 x 35 menit)',
      modelPembelajaran: 'Problem Based Learning (PBL)',
      profilPelajarPancasila: {
        beriman: false,
        berkebinekaan: false,
        gotongRoyong: false,
        mandiri: false,
        bernalarKritis: false,
        kreatif: false,
      },
      jenisSoal: 'Pilihan Ganda',
      jumlahSoal: 5,
    }
  });

  const jenjang = watch('jenjang');

  // Auto-update Fase based on Jenjang (simple helper)
  React.useEffect(() => {
    // This logic could be more complex, but let's keep it simple for now or let user choose
  }, [jenjang]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <span className="font-bold text-lg">1</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Identitas & Target</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jenjang */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Jenjang Pendidikan</label>
            <select
              {...register('jenjang')}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 bg-white border"
            >
              <option value="SD">SD / MI</option>
              <option value="SMP">SMP / MTs</option>
              <option value="SMA">SMA / MA</option>
              <option value="SMK">SMK</option>
            </select>
          </div>

          {/* Fase */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Fase Kurikulum Merdeka</label>
            <select
              {...register('fase')}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 bg-white border"
            >
              <option value="A">Fase A (Kelas 1-2 SD)</option>
              <option value="B">Fase B (Kelas 3-4 SD)</option>
              <option value="C">Fase C (Kelas 5-6 SD)</option>
              <option value="D">Fase D (Kelas 7-9 SMP)</option>
              <option value="E">Fase E (Kelas 10 SMA/SMK)</option>
              <option value="F">Fase F (Kelas 11-12 SMA/SMK)</option>
            </select>
          </div>

          {/* Mata Pelajaran */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Mata Pelajaran</label>
            <input
              type="text"
              {...register('mataPelajaran', { required: 'Mata pelajaran wajib diisi' })}
              placeholder="Contoh: Matematika, IPAS, Bahasa Indonesia"
              className={`w-full rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border ${errors.mataPelajaran ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.mataPelajaran && <p className="text-red-500 text-xs mt-1">{errors.mataPelajaran.message}</p>}
          </div>

          {/* Kelas & Semester */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Kelas</label>
              <input
                type="text"
                {...register('kelas', { required: 'Kelas wajib diisi' })}
                placeholder="Contoh: 4, 7, 10"
                className={`w-full rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border ${errors.kelas ? 'border-red-500' : 'border-slate-300'}`}
              />
              {errors.kelas && <p className="text-red-500 text-xs mt-1">{errors.kelas.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Semester</label>
              <select
                {...register('semester')}
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 bg-white border"
              >
                <option value="1">Ganjil (1)</option>
                <option value="2">Genap (2)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <span className="font-bold text-lg">2</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Materi & Tujuan</h2>
        </div>

        <div className="space-y-6">
          {/* Materi */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Materi / Topik Pembelajaran</label>
            <input
              type="text"
              {...register('materi', { required: 'Materi wajib diisi' })}
              placeholder="Contoh: Pecahan Senilai, Ekosistem, Teks Prosedur"
              className={`w-full rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border ${errors.materi ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.materi && <p className="text-red-500 text-xs mt-1">{errors.materi.message}</p>}
          </div>

          {/* Tujuan Pembelajaran */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Tujuan Pembelajaran</label>
            <textarea
              {...register('tujuanPembelajaran', { required: 'Tujuan pembelajaran wajib diisi' })}
              rows={3}
              placeholder="Contoh: Peserta didik mampu menjelaskan pengertian pecahan senilai dengan benar."
              className={`w-full rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border ${errors.tujuanPembelajaran ? 'border-red-500' : 'border-slate-300'}`}
            />
            {errors.tujuanPembelajaran && <p className="text-red-500 text-xs mt-1">{errors.tujuanPembelajaran.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alokasi Waktu */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Alokasi Waktu</label>
              <input
                type="text"
                {...register('alokasiWaktu')}
                placeholder="Contoh: 2 JP (2 x 35 Menit)"
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border"
              />
            </div>

            {/* Model Pembelajaran */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Model Pembelajaran</label>
              <select
                {...register('modelPembelajaran')}
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 bg-white border"
              >
                <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                <option value="Discovery Learning">Discovery Learning</option>
                <option value="Inquiry Learning">Inquiry Learning</option>
                <option value="Cooperative Learning">Cooperative Learning</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <span className="font-bold text-lg">3</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Karakter & Asesmen</h2>
        </div>

        <div className="space-y-6">
          {/* Profil Pelajar Pancasila */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Profil Pelajar Pancasila (Pilih minimal 1)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'beriman', label: 'Beriman & Bertakwa' },
                { id: 'berkebinekaan', label: 'Berkebinekaan Global' },
                { id: 'gotongRoyong', label: 'Gotong Royong' },
                { id: 'mandiri', label: 'Mandiri' },
                { id: 'bernalarKritis', label: 'Bernalar Kritis' },
                { id: 'kreatif', label: 'Kreatif' },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    {...register(`profilPelajarPancasila.${item.id as keyof LKPDFormData['profilPelajarPancasila']}`)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-slate-300"
                  />
                  <span className="text-sm text-slate-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jenis Soal */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Jenis Soal</label>
              <select
                {...register('jenisSoal')}
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 bg-white border"
              >
                <option value="Pilihan Ganda">Pilihan Ganda</option>
                <option value="Uraian">Uraian / Esai</option>
                <option value="HOTS">HOTS (Higher Order Thinking Skills)</option>
                <option value="Studi Kasus">Studi Kasus</option>
                <option value="Praktikum">Praktikum / Eksperimen</option>
              </select>
            </div>

            {/* Jumlah Soal */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Jumlah Soal</label>
              <input
                type="number"
                min={1}
                max={20}
                {...register('jumlahSoal', { min: 1, max: 20 })}
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sedang Membuat LKPD...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate LKPD Sekarang
            </>
          )}
        </button>
      </div>
    </form>
  );
};
