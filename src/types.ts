export type Jenjang = 'SD' | 'SMP' | 'SMA' | 'SMK';
export type Fase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type ModelPembelajaran = 'Problem Based Learning (PBL)' | 'Project Based Learning (PjBL)' | 'Discovery Learning' | 'Inquiry Learning' | 'Cooperative Learning' | 'Lainnya';
export type JenisSoal = 'Pilihan Ganda' | 'Uraian' | 'HOTS' | 'Studi Kasus' | 'Praktikum';

export interface ProfilPelajarPancasila {
  beriman: boolean;
  berkebinekaan: boolean;
  gotongRoyong: boolean;
  mandiri: boolean;
  bernalarKritis: boolean;
  kreatif: boolean;
}

export interface LKPDFormData {
  jenjang: Jenjang;
  fase: Fase;
  mataPelajaran: string;
  kelas: string;
  semester: string;
  materi: string;
  tujuanPembelajaran: string;
  alokasiWaktu: string;
  modelPembelajaran: ModelPembelajaran;
  profilPelajarPancasila: ProfilPelajarPancasila;
  jenisSoal: JenisSoal;
  jumlahSoal: number;
}

export interface GeneratedLKPD {
  content: string; // Markdown content
  rawResponse?: string;
}
