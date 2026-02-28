import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';

const loadingSteps = [
  { text: "Menganalisis kebutuhan pembelajaran...", icon: BrainCircuit },
  { text: "Menyusun struktur LKPD...", icon: BookOpen },
  { text: "Merancang aktivitas yang menarik...", icon: Sparkles },
  { text: "Finalisasi dokumen...", icon: Loader2 },
];

export const LoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-white/20"
      >
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 border-4 border-indigo-100 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <CurrentIcon size={32} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Sedang Membuat LKPD
        </h3>
        
        <div className="h-8 mb-6 relative overflow-hidden">
             <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-600 absolute w-full"
              >
                {loadingSteps[currentStep].text}
              </motion.p>
            </AnimatePresence>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-indigo-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "easeInOut" }} 
          />
        </div>
      </motion.div>
    </div>
  );
};
