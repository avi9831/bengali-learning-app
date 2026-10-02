import React, { useMemo, useCallback } from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import { databaseService } from '../repository/DatabaseService';
import { curriculumRepository } from '../repository/CurriculumRepository';

interface WordBreakdownEngineProps {
  word: string;
  icon?: string;
  meaning?: string;
  partsAudio?: string[];
  fullAudio?: string;
  hasMoreExamples?: boolean;
  onMoreExamples?: () => void;
  onMeaningClick?: (word: string, fallbackMeaning?: string, icon?: string, parts?: string[]) => void;
  onSpeak: (text: string) => void;
}

export const WordBreakdownEngine: React.FC<WordBreakdownEngineProps> = React.memo(
  ({
    word,
    icon = '📖',
    meaning,
    partsAudio,
    fullAudio,
    hasMoreExamples = false,
    onMoreExamples,
    onMeaningClick,
    onSpeak,
  }) => {
    const cleanWord = useMemo(() => {
      return word ? word.replace(/[।,!?]/g, '').trim() : '';
    }, [word]);

    // Heavy Calculation: Word Breakdown is memoized to avoid expensive string splitting/lookup on every render
    const breakdownParts = useMemo(() => {
      if (!cleanWord) return [];
      const cached = databaseService.getBreakdown(cleanWord);
      if (cached && cached.length > 0) return cached;
      const repoBreakdown = curriculumRepository.getWordBreakdown(cleanWord);
      if (repoBreakdown && repoBreakdown.length > 0) return repoBreakdown;
      return Array.from(cleanWord);
    }, [cleanWord]);

    // Stable Callback for "মানে" (Meaning) button click
    const handleMeaningClick = useCallback(() => {
      if (!cleanWord) return;
      onMeaningClick?.(cleanWord, meaning, icon, breakdownParts);
    }, [cleanWord, meaning, icon, breakdownParts, onMeaningClick]);

    // Stable Callback for "আরও উদাহরণ" (More Examples) button click
    const handleMoreExamplesClick = useCallback(() => {
      if (onMoreExamples) {
        onMoreExamples();
      }
    }, [onMoreExamples]);

    // Stable Callback for full word audio
    const handleFullAudioClick = useCallback(() => {
      onSpeak(fullAudio || cleanWord);
    }, [fullAudio, cleanWord, onSpeak]);

    // Stable Callback for composite breakdown audio
    const handleBreakdownSentenceAudio = useCallback(() => {
      const audioParts = partsAudio && partsAudio.length > 0 ? partsAudio : breakdownParts;
      onSpeak(`${cleanWord}। ${audioParts.join(' ')}`);
    }, [cleanWord, partsAudio, breakdownParts, onSpeak]);

    if (!cleanWord) return null;

    return (
      <div className="bg-slate-900 rounded-3xl border-2 border-emerald-500/50 p-4 shadow-xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <span className="text-3xl select-none drop-shadow">{icon}</span>
            <span className="text-2xl font-bold text-white tracking-wide">{cleanWord}</span>
            {onMeaningClick && (
              <button
                onClick={handleMeaningClick}
                className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center space-x-1"
                aria-label="শব্দার্থ দেখুন"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>মানে 📖</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {hasMoreExamples && onMoreExamples && (
              <button
                onClick={handleMoreExamplesClick}
                className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center space-x-1"
                aria-label="আরও উদাহরণ"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>আরও উদাহরণ</span>
              </button>
            )}
            <button
              onClick={handleBreakdownSentenceAudio}
              className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 font-bold active:scale-95 transition-all shadow-md"
              aria-label="উচ্চারণ শুনুন"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Word Breakdown Formula View: ক + া = কা */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
          {breakdownParts.map((part, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => {
                  const audio = partsAudio?.[idx] || part;
                  onSpeak(audio);
                }}
                className="min-w-10 h-12 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all"
              >
                {part}
              </button>
              {idx < breakdownParts.length - 1 && (
                <span className="text-lg font-bold text-slate-500 select-none">+</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-lg font-bold text-slate-500 select-none">=</span>
          <button
            onClick={handleFullAudioClick}
            className="min-w-12 h-12 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-emerald-500 border-white text-slate-950 active:scale-95 transition-all shadow-md"
          >
            {cleanWord}
          </button>
        </div>
      </div>
    );
  }
);

WordBreakdownEngine.displayName = 'WordBreakdownEngine';
