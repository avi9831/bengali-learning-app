import React, { useCallback } from 'react';
import { BookOpen, X, Volume2, CheckCircle } from 'lucide-react';

export interface MeaningModalData {
  word: string;
  meaning: string;
  icon?: string;
  breakdown?: string[];
}

interface MeaningModalProps {
  data: MeaningModalData | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
}

export const MeaningModal: React.FC<MeaningModalProps> = React.memo(({ data, onClose, onSpeak }) => {
  if (!data) return null;
  const { word, meaning, icon, breakdown } = data;

  const handleAudioClick = useCallback(() => {
    onSpeak(`${word} এর অর্থ: ${meaning}`);
  }, [word, meaning, onSpeak]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-3 border-amber-400 rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center text-center relative overflow-hidden max-h-[90vh]">
        {/* Top Bar with Book icon & Close */}
        <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-amber-400">
            <BookOpen className="w-6 h-6" />
            <span className="text-base font-bold text-amber-200">বাংলা একাডেমি অভিধান</span>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 active:scale-95 transition-all"
            aria-label="বন্ধ করুন"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Word Icon & Headword Display */}
        <div className="my-2 flex flex-col items-center">
          {icon && <span className="text-6xl mb-2 select-none drop-shadow">{icon}</span>}
          <h2 className="text-4xl font-extrabold text-white tracking-wide">{word}</h2>
          {breakdown && breakdown.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
              {breakdown.map((char, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300"
                >
                  {char}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Audio Play Banner with Giant Speaker */}
        <button
          onClick={handleAudioClick}
          className="w-full my-3 p-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/50 rounded-2xl flex items-center justify-center space-x-3 text-amber-300 font-bold active:scale-98 transition-all shadow-lg cursor-pointer"
        >
          <Volume2 className="w-6 h-6 text-amber-400 animate-pulse" />
          <span className="text-base">অর্থ শুনতে স্পর্শ করুন</span>
        </button>

        {/* Full Bengali Definition Box */}
        <div className="w-full bg-slate-950/80 rounded-2xl p-4 border border-slate-800 my-2 text-left overflow-y-auto max-h-56">
          <span className="text-xs font-bold text-amber-400/80 block mb-1">শব্দার্থ (Definition):</span>
          <p className="text-lg font-bold text-slate-100 leading-relaxed whitespace-pre-line">
            {meaning}
          </p>
        </div>

        {/* Bottom Confirmation / Close Button */}
        <button
          onClick={handleClose}
          className="w-full mt-3 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>বুঝেছি ✔️</span>
        </button>
      </div>
    </div>
  );
});

MeaningModal.displayName = 'MeaningModal';
