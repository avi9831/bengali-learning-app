import React from 'react';
import { Lock, CheckCircle, Sparkles } from 'lucide-react';
import { LevelCurriculumItem } from '../models/curriculumModels';

interface LevelCardProps {
  level: LevelCurriculumItem;
  isUnlocked: boolean;
  isAllSubsDone: boolean;
  completedSubsCount: number;
  completedSubLessons: Record<string, boolean>;
  highestUnlockedLevel: number;
  toBn: (num: number) => string;
  onSelect: (level: LevelCurriculumItem) => void;
  onSpeak: (text: string) => void;
}

export const LevelCard: React.FC<LevelCardProps> = React.memo(
  ({
    level,
    isUnlocked,
    isAllSubsDone,
    completedSubsCount,
    completedSubLessons,
    highestUnlockedLevel,
    toBn,
    onSelect,
    onSpeak,
  }) => {
    const handleClick = () => {
      if (isUnlocked) {
        onSpeak(`ধাপ ${level.bengaliNum}: ${level.title}। উপ-পাঠের তালিকা দেখুন।`);
        onSelect(level);
      } else {
        onSpeak(`ধাপ ${level.bengaliNum} এখনও বন্ধ। আগের ধাপের সকল পাঠ সম্পন্ন করে এটি খুলুন।`);
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full text-left p-4 rounded-3xl border-2 transition-all duration-200 flex items-center space-x-4 active:scale-[0.98] ${
          isUnlocked
            ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-emerald-950/30'
            : 'bg-slate-900/40 border-slate-800/80 opacity-60'
        }`}
      >
        {/* Giant Numeral Badge */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 border ${
            isUnlocked
              ? isAllSubsDone
                ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-slate-800 text-slate-500 border-slate-700'
          }`}
        >
          {level.bengaliNum}
        </div>

        {/* Level Title and Visual Icon */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{level.icon}</span>
            <h2 className="text-lg font-bold text-white truncate">{level.title}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{level.subtitle}</p>

          {/* Visual Sub-levels Tracker (7 Sub-lessons) */}
          <div className="flex items-center space-x-1 mt-2">
            {level.subLessons.map((sub) => {
              const isSubDone = !!completedSubLessons[sub.id];
              const isSubActive =
                isUnlocked &&
                !isSubDone &&
                (level.id <= highestUnlockedLevel &&
                  (sub.subIndex === 1 || !!completedSubLessons[`lvl-${level.id}-sub-${sub.subIndex - 1}`]));

              return (
                <span
                  key={sub.id}
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border transition-all ${
                    isSubDone
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isSubActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                      : 'bg-slate-800 text-slate-500 border-slate-700/60'
                  }`}
                >
                  {isSubDone ? '✓' : toBn(sub.subIndex)}
                </span>
              );
            })}
            <span className="text-[10px] text-emerald-400 font-bold ml-1">
              {toBn(completedSubsCount)}/{toBn(level.subLessons.length)}
            </span>
          </div>
        </div>

        {/* Lock or Status Indicator */}
        <div className="shrink-0">
          {isUnlocked ? (
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              {isAllSubsDone ? (
                <CheckCircle className="w-5 h-5 text-emerald-300" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center border border-slate-700">
              <Lock className="w-5 h-5" />
            </div>
          )}
        </div>
      </button>
    );
  }
);

LevelCard.displayName = 'LevelCard';
