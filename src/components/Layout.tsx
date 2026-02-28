import React from 'react';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'generator' | 'panduan';
  onTabChange: (tab: 'generator' | 'panduan') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Generator LKPD</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Kurikulum Merdeka</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-1">
            <button
              onClick={() => onTabChange('generator')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'generator' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText size={18} />
              Generator
            </button>
            <button
              onClick={() => onTabChange('panduan')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'panduan' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle size={18} />
              Panduan
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Generator LKPD Otomatis. Dibuat untuk Guru Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
};
