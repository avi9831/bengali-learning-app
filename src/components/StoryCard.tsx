import React, { useMemo, useCallback } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { StoryItem, StoryWordData } from '../repository/story_repository';

interface StoryCardProps {
  story: StoryItem;
  isPlayingAll: boolean;
  activeBreakdown: StoryWordData | null;
  onPlayAll: () => void;
  onWordTap: (word: string) => void;
  onMeaningClick: (word: string, fallbackMeaning?: string, icon?: string, parts?: string[]) => void;
  onSpeak: (text: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = React.memo(
  ({
    story,
    isPlayingAll,
    activeBreakdown,
    onPlayAll,
    onWordTap,
    onMeaningClick,
    onSpeak,
  }) => {
    // Memoize the story words array to prevent unnecessary array allocations on every render
    const storyWordsList = useMemo(() => {
      return story.fullStoryText.split(' ');
    }, [story.fullStoryText]);

    const handleMeaningClick = useCallback(() => {
      if (activeBreakdown) {
        onMeaningClick(
          activeBreakdown.word,
          activeBreakdown.meaning,
          activeBreakdown.iconSymbol,
          activeBreakdown.parts
        );
      }
    }, [activeBreakdown, onMeaningClick]);

    const handleBreakdownAudio = useCallback(() => {
      if (activeBreakdown) {
        onSpeak(`${activeBreakdown.word}। ${activeBreakdown.partsAudio.join(' ')}`);
      }
    }, [activeBreakdown, onSpeak]);

    return (
      <div className="space-y-4">
        {/* Prominent Illustration & Moral Banner */}
        <div className="w-full bg-gradient-to-b from-amber-950/90 to-slate-950 rounded-3xl border-3 border-amber-500/70 p-7 flex flex-col items-center justify-center shadow-2xl text-center my-2">
          <span className="text-8xl drop-shadow-md">{story.coverEmoji}</span>
          <h2 className="text-3xl font-extrabold text-white mt-4 tracking-wide">{story.title}</h2>
          <div className="mt-2 px-5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-sm font-semibold">
            নীতিশিক্ষা: {story.moral}
          </div>
          <button
            onClick={onPlayAll}
            disabled={isPlayingAll}
            className={`mt-5 px-8 py-3.5 rounded-full flex items-center space-x-3 text-lg font-bold shadow-xl transition-transform ${
              isPlayingAll
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            <span>{isPlayingAll ? 'গল্পটি পড়া হচ্ছে...' : 'পুরো গল্প শুনুন'}</span>
          </button>
        </div>

        {/* Word Breakdown Engine for Tapped Story Word */}
        {activeBreakdown && (
          <div className="bg-slate-900 rounded-3xl border-2 border-amber-500/60 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activeBreakdown.iconSymbol}</span>
                <span className="text-2xl font-bold text-white">
                  {activeBreakdown.word}
                </span>
                <button
                  onClick={handleMeaningClick}
                  className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  মানে 📖
                </button>
              </div>
              <button
                onClick={handleBreakdownAudio}
                className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold active:scale-95 transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
              {activeBreakdown.parts.map((p, idx) => (
                <React.Fragment key={idx}>
                  <button
                    onClick={() => onSpeak(activeBreakdown.partsAudio[idx] || p)}
                    className="min-w-10 h-12 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all"
                  >
                    {p}
                  </button>
                  {idx < activeBreakdown.parts.length - 1 && (
                    <span className="text-lg font-bold text-slate-500">+</span>
                  )}
                </React.Fragment>
              ))}
              <span className="text-lg font-bold text-slate-500">=</span>
              <button
                onClick={() => onSpeak(activeBreakdown.fullAudio)}
                className="min-w-12 h-12 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-amber-500 border-white text-slate-950 active:scale-95 transition-all"
              >
                {activeBreakdown.word}
              </button>
            </div>
          </div>
        )}

        {/* Interactive Story Passage: EVERY word is interactive */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-xl">
          <p className="text-xs font-semibold text-slate-400 mb-3 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>যেকোনো শব্দে চাপ দিয়ে বিশ্লেষণ শুনুন:</span>
          </p>
          <div className="flex flex-wrap gap-2 leading-loose">
            {storyWordsList.map((word, idx) => (
              <button
                key={idx}
                onClick={() => onWordTap(word)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-900/60 border border-slate-700 text-xl font-bold text-white transition-all active:scale-95 shadow-sm"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

StoryCard.displayName = 'StoryCard';
