import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, RefreshCw, Edit2, Check, BookOpen } from 'lucide-react';

interface PreviewLKPDProps {
  content: string;
  onReset: () => void;
}

const LKPDHeader = ({ data }: { data: any }) => (
  <div className="border-b-4 border-double border-slate-800 pb-4 mb-8 text-center">
    <div className="flex items-center justify-center gap-4 mb-2">
      {/* Placeholder Logo */}
      <div className="w-16 h-16 border-2 border-slate-800 rounded-full flex items-center justify-center text-slate-800">
        <BookOpen size={32} strokeWidth={2} />
      </div>
      <div className="text-center text-slate-900">
        <h3 className="text-lg font-bold uppercase tracking-wider m-0 leading-tight">{data.line1}</h3>
        <h2 className="text-xl font-bold uppercase tracking-wider m-0 leading-tight">{data.line2}</h2>
        <h1 className="text-2xl font-black uppercase tracking-widest m-0 leading-tight">{data.line3}</h1>
        <p className="text-sm font-medium mt-1">{data.address}</p>
      </div>
    </div>
  </div>
);

export const PreviewLKPD: React.FC<PreviewLKPDProps> = ({ content, onReset }) => {
  const [editableContent, setEditableContent] = useState(content);
  const [headerData, setHeaderData] = useState({
    line1: 'PEMERINTAH KABUPATEN/KOTA ...',
    line2: 'DINAS PENDIDIKAN',
    line3: 'NAMA SEKOLAH ANDA',
    address: 'Alamat Lengkap Sekolah...'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const handleDownloadWord = async () => {
    const element = previewRef.current;
    if (!element) return;

    // We need to inline the styles for Word export to look good
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>LKPD Kurikulum Merdeka</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; }
          .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { font-size: 16pt; font-weight: bold; margin: 0; text-transform: uppercase; }
          .header h2 { font-size: 14pt; font-weight: bold; margin: 0; text-transform: uppercase; }
          .header h3 { font-size: 12pt; font-weight: bold; margin: 0; text-transform: uppercase; }
          .header p { margin: 5px 0 0 0; font-size: 11pt; }
          h1 { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-top: 20px; }
          h2 { font-size: 12pt; font-weight: bold; background-color: #f0f0f0; padding: 5px; border-left: 5px solid #000; margin-top: 15px; }
          h3 { font-size: 12pt; font-weight: bold; margin-top: 10px; }
          table { border-collapse: collapse; width: 100%; margin: 10px 0; }
          td, th { border: 1px solid #000; padding: 5px; vertical-align: top; }
          th { background-color: #f0f0f0; text-align: center; font-weight: bold; }
          ul, ol { padding-left: 20px; }
          p { margin-bottom: 10px; text-align: justify; }
        </style>
      </head>
      <body>
        <div class="header">
          <h3>${headerData.line1}</h3>
          <h2>${headerData.line2}</h2>
          <h1>${headerData.line3}</h1>
          <p>${headerData.address}</p>
        </div>
        ${element.innerHTML}
      </body>
      </html>
    `;

    try {
      const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'LKPD-Kurikulum-Merdeka.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Word export failed", e);
      alert("Gagal mengunduh Word. Silakan coba PDF/Cetak.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar - Hidden when printing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-3 items-center justify-between sticky top-20 z-40 print:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              isEditing ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Edit2 size={16} />
            {isEditing ? 'Selesai Edit' : 'Edit Teks'}
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={16} />
            Buat Baru
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-2 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            {copied ? 'Tersalin' : 'Salin'}
          </button>
          <button
            onClick={handleDownloadWord}
            disabled={isEditing}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              isEditing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            title={isEditing ? "Selesaikan edit untuk mengunduh" : "Unduh Word"}
          >
            <Download size={16} />
            Word
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      <div className="flex justify-center bg-slate-100 py-8 print:bg-white print:p-0 print:block">
        {isEditing ? (
          <div className="w-full max-w-[210mm] space-y-4">
            {/* Header Editor */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Edit2 size={16} /> Edit Kop Surat
              </h3>
              <div className="grid gap-4">
                <input
                  type="text"
                  value={headerData.line1}
                  onChange={(e) => setHeaderData({ ...headerData, line1: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded text-sm"
                  placeholder="Baris 1 (Misal: PEMERINTAH KABUPATEN...)"
                />
                <input
                  type="text"
                  value={headerData.line2}
                  onChange={(e) => setHeaderData({ ...headerData, line2: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded text-sm"
                  placeholder="Baris 2 (Misal: DINAS PENDIDIKAN...)"
                />
                <input
                  type="text"
                  value={headerData.line3}
                  onChange={(e) => setHeaderData({ ...headerData, line3: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded text-sm"
                  placeholder="Baris 3 (Misal: SD NEGERI 1...)"
                />
                <input
                  type="text"
                  value={headerData.address}
                  onChange={(e) => setHeaderData({ ...headerData, address: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded text-sm"
                  placeholder="Alamat Lengkap..."
                />
              </div>
            </div>

            {/* Content Editor */}
            <textarea
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              className="w-full min-h-[297mm] p-8 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none shadow-lg bg-white"
            />
          </div>
        ) : (
          <div 
            className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-[20mm] mx-auto print:shadow-none print:w-full print:h-full print:p-0 print:mx-0"
          >
            <LKPDHeader data={headerData} />
            <div ref={previewRef} className="prose prose-slate max-w-none print:prose-sm">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-center uppercase border-b-2 border-slate-900 pb-2 mb-6 mt-0" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold uppercase bg-slate-100 p-2 border-l-4 border-slate-800 mt-6 mb-4 print:bg-slate-50" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-md font-bold text-slate-800 mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-justify mb-3 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse border border-slate-400 text-sm" {...props} /></div>,
                  thead: ({node, ...props}) => <thead className="bg-slate-100 print:bg-slate-50" {...props} />,
                  th: ({node, ...props}) => <th className="border border-slate-400 p-2 text-left font-bold uppercase text-xs tracking-wider" {...props} />,
                  td: ({node, ...props}) => <td className="border border-slate-400 p-2 align-top" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-400 pl-4 italic bg-slate-50 p-2 my-4" {...props} />,
                  hr: ({node, ...props}) => <hr className="border-t-2 border-slate-200 my-6" {...props} />,
                }}
              >
                {editableContent}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
