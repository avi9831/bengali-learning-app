import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Volume2,
  Lock,
  CheckCircle,
  ArrowLeft,
  RotateCcw,
  Play,
  Sparkles,
  School,
  Trophy,
  HelpCircle,
  XCircle,
  Calendar,
  Clock,
  Award,
  Check,
  ChevronRight,
  X,
  BookOpen,
} from 'lucide-react';
import { curriculumRepository, toBnDigit } from './repository/CurriculumRepository';
import { databaseService } from './repository/DatabaseService';
import { VirtualizedLevelList } from './components/VirtualizedLevelList';
import { MeaningModal } from './components/MeaningModal';
import { StoryCard } from './components/StoryCard';
import { WordBreakdownEngine } from './components/WordBreakdownEngine';
import { speakBengaliText, cancelTTS } from './utils/audioService';
import { DayCurriculumItem, ExactWordExample, SubLessonItem, LevelCurriculumItem } from './models/curriculumModels';
import { TWENTY_LEVELS_METADATA } from './repository/curriculum20LevelsData';
import { PHALA_LIST, JUKTAKKHOR_LIST, ALL_LEVELS, PhalaItem, JuktakkhorItem, WordBreakdown } from './phase3Curriculum';
import {
  ADVANCED_CONJUNCTS_LIST,
  WORD_MECHANICS_LIST,
  VOCABULARY_LIST,
  SENTENCE_LIST,
  AdvancedConjunctItem,
  WordMechanicsItem,
  SentenceItem,
} from './phase4Curriculum';
import {
  PARAGRAPH_LIST,
  STORY_DATA,
  LEVEL_QUIZZES,
  LevelQuizItem,
  StoryWordData,
} from './phase5Curriculum';
import {
  THEMATIC_VOCABULARY,
  TWO_WORD_SENTENCES,
  STANDARD_SENTENCES,
  ThematicWordItem,
  TwoWordSentenceItem,
  StandardSentenceItem,
} from './repository/sentence_repository';
import {
  PARAGRAPH_COLLECTION,
  MORAL_STORIES,
  ParagraphItem,
  StoryItem,
} from './repository/story_repository';

interface LetterItem {
  char: string;
  word: string;
  icon: string;
  tts: string;
  more?: Array<{ word: string; icon: string; tts?: string }>;
}

// Bengali Vowels data with visual icons
const VOWELS_DATA: LetterItem[] = [
  {
    char: 'অ',
    word: 'অজগর',
    icon: '🐍',
    tts: 'অ। অজগর।',
    more: [
      { word: 'অলঙ্কার', icon: '💍', tts: 'অ। অলঙ্কার।' },
      { word: 'অমর', icon: '⭐', tts: 'অ। অমর।' },
    ],
  },
  {
    char: 'আ',
    word: 'আম',
    icon: '🥭',
    tts: 'আ। আম।',
    more: [
      { word: 'আকাশ', icon: '🌤️', tts: 'আ। আকাশ।' },
      { word: 'আলো', icon: '💡', tts: 'আ। আলো।' },
    ],
  },
  {
    char: 'ই',
    word: 'ইঁদুর',
    icon: '🐁',
    tts: 'হ্রস্ব ই। ইঁদুর।',
    more: [{ word: 'ইট', icon: '🧱', tts: 'হ্রস্ব ই। ইট।' }],
  },
  {
    char: 'ঈ',
    word: 'ঈগল',
    icon: '🦅',
    tts: 'দীর্ঘ ঈ। ঈগল।',
    more: [{ word: 'ঈশ্বর', icon: '✨', tts: 'দীর্ঘ ঈ। ঈশ্বর।' }],
  },
  {
    char: 'উ',
    word: 'উট',
    icon: '🐪',
    tts: 'হ্রস্ব উ। উট।',
    more: [{ word: 'উপহার', icon: '🎁', tts: 'হ্রস্ব উ। উপহার।' }],
  },
  {
    char: 'ঊ',
    word: 'ঊষা',
    icon: '🌅',
    tts: 'দীর্ঘ ঊ। ঊষা।',
    more: [{ word: 'ঊর্মি', icon: '🌊', tts: 'দীর্ঘ ঊ। ঊর্মি।' }],
  },
  {
    char: 'ঋ',
    word: 'ঋষি',
    icon: '🧘',
    tts: 'ঋ। ঋষি।',
    more: [{ word: 'ঋতু', icon: '🌸', tts: 'ঋ। ঋতু।' }],
  },
  {
    char: 'এ',
    word: 'একতারা',
    icon: '🪕',
    tts: 'এ। একতারা।',
    more: [{ word: 'এলাচ', icon: '🌿', tts: 'এ। এলাচ।' }],
  },
  {
    char: 'ঐ',
    word: 'ঐরাবত',
    icon: '🐘',
    tts: 'ঐ। ঐরাবত।',
    more: [{ word: 'ঐক্য', icon: '🤝', tts: 'ঐ। ঐক্য।' }],
  },
  {
    char: 'ও',
    word: 'ওল',
    icon: '🥔',
    tts: 'ও। ওল।',
    more: [{ word: 'ওজন', icon: '⚖️', tts: 'ও। ওজন।' }],
  },
  {
    char: 'ঔ',
    word: 'ঔষধ',
    icon: '💊',
    tts: 'ঔ। ঔষধ।',
    more: [{ word: 'ঔদার্য', icon: '💖', tts: 'ঔ। ঔদার্য।' }],
  },
];

// Bengali Consonants data with visual icons
const CONSONANTS_DATA: LetterItem[] = [
  { char: 'ক', word: 'কাক', icon: '🦅', tts: 'ক। কাক।' },
  { char: 'খ', word: 'খরগোশ', icon: '🐇', tts: 'খ। খরগোশ।' },
  { char: 'গ', word: 'গরু', icon: '🐄', tts: 'গ। গরু।' },
  { char: 'ঘ', word: 'ঘড়ি', icon: '⏰', tts: 'ঘ। ঘড়ি।' },
  { char: 'ঙ', word: 'ব্যাঙ', icon: '🐸', tts: 'ঙ। ব্যাঙ।' },
  { char: 'চ', word: 'চাঁদ', icon: '🌙', tts: 'চ। চাঁদ।' },
  { char: 'ছ', word: 'ছাতা', icon: '☂️', tts: 'ছ। ছাতা।' },
  { char: 'জ', word: 'জাহাজ', icon: '🚢', tts: 'জ। জাহাজ।' },
  { char: 'ঝ', word: 'ঝুড়ি', icon: '🧺', tts: 'ঝ। ঝুড়ি।' },
  { char: 'ঞ', word: 'মিঞা', icon: '🐱', tts: 'ঞ। মিঞা।' },
  { char: 'ট', word: 'টিয়া', icon: '🦜', tts: 'ট। টিয়া।' },
  { char: 'ঠ', word: 'ঠাকুরদা', icon: '👴', tts: 'ঠ। ঠাকুরদা।' },
  { char: 'ড', word: 'ডালিম', icon: '🍎', tts: 'ড। ডালিম।' },
  { char: 'ঢ', word: 'ঢাক', icon: '🥁', tts: 'ঢ। ঢাক।' },
  { char: 'ণ', word: 'হরিণ', icon: '🦌', tts: 'মূর্ধন্য ণ। হরিণ।' },
  { char: 'ত', word: 'তরমুজ', icon: '🍉', tts: 'ত। তরমুজ।' },
  { char: 'থ', word: 'থালা', icon: '🍽️', tts: 'থ। থালা।' },
  { char: 'দ', word: 'দোয়েল', icon: '🐦', tts: 'দ। দোয়েল।' },
  { char: 'ধ', word: 'ধান', icon: '🌾', tts: 'ধ। ধান।' },
  { char: 'ন', word: 'নৌকা', icon: '⛵', tts: 'দন্ত্য ন। নৌকা।' },
  { char: 'প', word: 'পাখি', icon: '🐦', tts: 'প। পাখি।' },
  { char: 'ফ', word: 'ফুল', icon: '🌸', tts: 'ফ। ফুল।' },
  { char: 'ব', word: 'বই', icon: '📖', tts: 'ব। বই।' },
  { char: 'ভ', word: 'ভালুক', icon: '🐻', tts: 'ভ। ভালুক।' },
  { char: 'ম', word: 'মাছ', icon: '🐟', tts: 'ম। মাছ।' },
  { char: 'য', word: 'যাঁতা', icon: '⚙️', tts: 'অন্তঃস্থ য। যাঁতা।' },
  { char: 'র', word: 'রথ', icon: '🛞', tts: 'ব-শূন্য র। রথ।' },
  { char: 'ল', word: 'লাটিম', icon: '🪀', tts: 'ল। লাটিম।' },
  { char: 'শ', word: 'শাপলা', icon: '🌺', tts: 'তালব্য শ। শাপলা।' },
  { char: 'ষ', word: 'ষাঁড়', icon: '🐂', tts: 'মূর্ধন্য ষ। ষাঁড়।' },
  { char: 'স', word: 'সিংহ', icon: '🦁', tts: 'দন্ত্য স। সিংহ।' },
  { char: 'হ', word: 'হাতি', icon: '🐘', tts: 'হ। হাতি।' },
];

// Level 2 Kar Signs
const KAR_LIST = [
  {
    sign: 'া',
    name: 'আ-কার',
    sampleWord: 'কাক',
    icon: '🦅',
    more: [
      { word: 'কলা', icon: '🍌' },
      { word: 'ছাতা', icon: '☂️' },
    ],
  },
  {
    sign: 'ি',
    name: 'ই-কার',
    sampleWord: 'ডিম',
    icon: '🥚',
    more: [
      { word: 'পাখি', icon: '🐦' },
      { word: 'রবি', icon: '☀️' },
    ],
  },
  {
    sign: 'ী',
    name: 'ঈ-কার',
    sampleWord: 'নদী',
    icon: '🌊',
    more: [
      { word: 'তীর', icon: '🏹' },
      { word: 'নীল', icon: '🔷' },
    ],
  },
  {
    sign: 'ু',
    name: 'উ-কার',
    sampleWord: 'ফুল',
    icon: '🌸',
    more: [
      { word: 'ঘুড়ি', icon: '🪁' },
      { word: 'দুধ', icon: '🥛' },
    ],
  },
  {
    sign: 'ূ',
    name: 'ঊ-কার',
    sampleWord: 'সূর্য',
    icon: '☀️',
    more: [
      { word: 'ময়ূর', icon: '🦚' },
      { word: 'কূপ', icon: '🪣' },
    ],
  },
  {
    sign: 'ৃ',
    name: 'ঋ-কার',
    sampleWord: 'গৃহ',
    icon: '🏡',
    more: [
      { word: 'মৃগ', icon: '🦌' },
      { word: 'কৃষক', icon: '🌾' },
    ],
  },
  {
    sign: 'ে',
    name: 'এ-কার',
    sampleWord: 'মেঘ',
    icon: '☁️',
    more: [
      { word: 'তেল', icon: '🪔' },
      { word: 'বেল', icon: '🔔' },
    ],
  },
  {
    sign: 'ৈ',
    name: 'ঐ-কার',
    sampleWord: 'সৈকত',
    icon: '🏖️',
    more: [
      { word: 'বৈশাখ', icon: '🌪️' },
      { word: 'শৈল', icon: '🏔️' },
    ],
  },
  {
    sign: 'ো',
    name: 'ও-কার',
    sampleWord: 'গোল',
    icon: '⚽',
    more: [
      { word: 'ভোর', icon: '🌅' },
      { word: 'চোখ', icon: '👁️' },
    ],
  },
  {
    sign: 'ৌ',
    name: 'ঔ-কার',
    sampleWord: 'নৌকা',
    icon: '⛵',
    more: [
      { word: 'মৌমাছি', icon: '🐝' },
      { word: 'পৌষ', icon: '❄️' },
    ],
  },
];

const BASE_CONSONANTS = [
  'ক', 'খ', 'গ', 'ঘ', 'ঙ',
  'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
  'ট', 'ঠ', 'ড', 'ঢ', 'ণ',
  'ত', 'থ', 'দ', 'ধ', 'ন',
  'প', 'ফ', 'ব', 'ভ', 'ম',
  'য', 'র', 'ল', 'শ', 'ষ',
  'স', 'হ', 'ড়', 'ঢ়', 'য়',
  'ৎ', 'ং', 'ঃ', 'ঁ'
];

export default function App() {
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(1);
  const [currentScreen, setCurrentScreen] = useState<number>(0); // 0 = Home, 1..10 = Levels 1..10

  // Visual Quiz System Modal state
  const [activeQuizLevel, setActiveQuizLevel] = useState<number | null>(null);
  const [quizSelectionId, setQuizSelectionId] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Memoized 20 levels definition to prevent redundant re-instantiation on renders
  const twentyLevels = useMemo(() => curriculumRepository.getTwentyLevels(), []);

  // Audio speaking helper using memory-safe audioService with automatic leak prevention
  const speakBengali = useCallback((text: string, rate: number = 0.65) => {
    speakBengaliText(text, rate);
  }, []);

  // Automatically clear and cancel any playing TTS on screen transitions
  useEffect(() => {
    cancelTTS();
  }, [currentScreen]);

  // Home View Mode: 20 Levels vs 30-Day Journey
  const [homeTab, setHomeTab] = useState<'levels' | 'days'>('levels');
  const [highestUnlockedDay, setHighestUnlockedDay] = useState<number>(1);
  const [dayMinutesMap, setDayMinutesMap] = useState<Record<number, number>>({ 1: 0 });
  const [activeDayModal, setActiveDayModal] = useState<DayCurriculumItem | null>(null);

  // Sub-lesson Architecture state (20 Levels x 7 Sub-lessons & 30 Days x 5 Sub-lessons)
  const [completedSubLessons, setCompletedSubLessons] = useState<Record<string, boolean>>({
    'lvl-1-sub-1': true,
    'day-1-sub-1': true,
  });
  const [activeDaySubModal, setActiveDaySubModal] = useState<DayCurriculumItem | null>(null);
  const [activeLevelSubModal, setActiveLevelSubModal] = useState<LevelCurriculumItem | null>(null);
  const [subWordExampleIdx, setSubWordExampleIdx] = useState<number>(0);
  const [activeSubLessonPractice, setActiveSubLessonPractice] = useState<{
    subLesson: SubLessonItem;
    day?: DayCurriculumItem;
    level?: LevelCurriculumItem;
  } | null>(null);
  const [activeSubLessonQuiz, setActiveSubLessonQuiz] = useState<{
    subLesson: SubLessonItem;
    level?: LevelCurriculumItem;
  } | null>(null);

  // Bangla Academy Dictionary "মানে" (Meaning) Modal State
  const [activeMeaningModal, setActiveMeaningModal] = useState<{
    word: string;
    meaning: string;
    icon?: string;
    breakdown?: string[];
  } | null>(null);

  // Stable callback for "মানে" (Meaning) modal opening
  const openWordMeaning = useCallback(
    (
      word: string,
      fallbackMeaning?: string,
      icon?: string,
      breakdown?: string[]
    ) => {
      const cleanWord = word.replace(/[।,!?]/g, '').trim();
      const dynamicDictMeaning = databaseService.getMeaning(cleanWord);
      const meaning =
        dynamicDictMeaning ||
        fallbackMeaning ||
        curriculumRepository.getWordMeaning(cleanWord) ||
        '১ প্রমিত বাংলা শব্দার্থ ও প্রামাণ্য ব্যাখ্যা।';
      const entry = curriculumRepository.getDictionaryEntry(cleanWord);
      const bd =
        breakdown ||
        databaseService.getBreakdown(cleanWord) ||
        entry?.breakdown ||
        Array.from(cleanWord);
      const ic = icon || entry?.icon || '📖';
      setActiveMeaningModal({
        word: cleanWord,
        meaning,
        icon: ic,
        breakdown: bd,
      });
      speakBengaliText(`${cleanWord} এর অর্থ: ${meaning}`);
    },
    []
  );

  // Stable callback for closing meaning modal with strict TTS memory leak cleanup
  const handleCloseMeaningModal = useCallback(() => {
    cancelTTS();
    setActiveMeaningModal(null);
  }, []);

  // Stable callback for selecting a level from the virtualized list with lazy dynamic loading
  const handleSelectLevelFromList = useCallback((level: LevelCurriculumItem) => {
    curriculumRepository.loadLevelData(level.id);
    setActiveLevelSubModal(level);
  }, []);

  // Level 1 state (STRICT CHAR BINDING TO PREVENT MISMATCHES)
  const [l1Tab, setL1Tab] = useState<'vowel' | 'consonant'>('vowel');
  const [l1SelectedChar, setL1SelectedChar] = useState<string>('অ');
  const [l1SelectedIdx, setL1SelectedIdx] = useState<number>(0);
  const [l1ExampleIdx, setL1ExampleIdx] = useState<number>(0);

  // Level 2 state
  const [l2Consonant, setL2Consonant] = useState<string>('ক');
  const [l2KarIdx, setL2KarIdx] = useState<number>(0);
  const [l2ExampleIdx, setL2ExampleIdx] = useState<number>(0);

  // Stable callback for "আরও উদাহরণ" (More Examples)
  const handleL2NextExample = useCallback((exactExamples: ExactWordExample[], combined: string) => {
    if (!exactExamples || exactExamples.length === 0) return;
    setL2ExampleIdx((prev) => {
      const nextIdx = (prev + 1) % exactExamples.length;
      const ex = exactExamples[nextIdx];
      if (ex) {
        speakBengali(`${combined} দিয়ে ${ex.word}।`);
      }
      return nextIdx;
    });
  }, [speakBengali]);

  // Stable callback for "মানে" (Meaning)
  const handleL2Meaning = useCallback((word?: string, meaning?: string, icon?: string) => {
    if (word) {
      openWordMeaning(word, meaning, icon);
    }
  }, [openWordMeaning]);

  // Level 3 state (Phala)
  const [l3Idx, setL3Idx] = useState<number>(0);
  const [l3WordIdx, setL3WordIdx] = useState<number>(0);

  // Level 4 state (Juktakkhor)
  const [l4Idx, setL4Idx] = useState<number>(0);
  const [l4WordIdx, setL4WordIdx] = useState<number>(0);

  // Level 5 state (Advanced 3-letter Conjuncts)
  const [l5Idx, setL5Idx] = useState<number>(0);
  const [l5WordIdx, setL5WordIdx] = useState<number>(0);

  // Level 6 state (২-শব্দের বাক্য ও শব্দ গঠন: Days 21-22)
  const [l6Tab, setL6Tab] = useState<'twoword' | 'mechanics'>('twoword');
  const [l6Idx, setL6Idx] = useState<number>(0);
  const [l6TwoWordIdx, setL6TwoWordIdx] = useState<number>(0);
  const [l6WordHighlight, setL6WordHighlight] = useState<number>(-1);
  const [l6ActiveWordBreakdown, setL6ActiveWordBreakdown] = useState<{ word: string; parts: string[]; partsAudio: string[]; icon: string; meaning: string } | null>(null);

  // Level 7 state (Thematic Vocabulary: Days 23-24)
  const [l7Category, setL7Category] = useState<'nature' | 'family' | 'body' | 'action'>('nature');
  const [l7Idx, setL7Idx] = useState<number>(0);
  const [l7ActiveBreakdown, setL7ActiveBreakdown] = useState<{ word: string; parts: string[]; partsAudio: string[]; icon: string; meaning: string } | null>(null);

  // Level 8 state (Standard 3-4 Word Sentences: Days 25-26)
  const [l8Idx, setL8Idx] = useState<number>(0);
  const [l8WordHighlight, setL8WordHighlight] = useState<number>(-1);
  const [l8PlayingAll, setL8PlayingAll] = useState<boolean>(false);
  const [l8ActiveBreakdown, setL8ActiveBreakdown] = useState<{ word: string; parts: string[]; partsAudio: string[]; icon: string; meaning: string } | null>(null);

  // Level 9 state (Paragraphs / অনুচ্ছেদ: Days 27-28)
  const [l9Idx, setL9Idx] = useState<number>(0);
  const [l9SentenceHighlight, setL9SentenceHighlight] = useState<number>(-1);
  const [l9PlayingAll, setL9PlayingAll] = useState<boolean>(false);
  const [l9ActiveBreakdown, setL9ActiveBreakdown] = useState<StoryWordData | null>(null);

  // Level 10 state (Complete Moral Stories: Days 29-30)
  const [l10StoryIdx, setL10StoryIdx] = useState<number>(0); // 0 = তৃষ্ণার্ত কাক, 1 = খরগোশ ও কচ্ছপ
  const [l10PlayingAll, setL10PlayingAll] = useState<boolean>(false);
  const [l10ActiveBreakdown, setL10ActiveBreakdown] = useState<StoryWordData | null>(null);

  // Audio Sound Effect Synthesizer (Web Audio API - Zero External Dependencies)
  const playSoundEffect = (type: 'success' | 'error') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (type === 'success') {
        // Happy major chord: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 0.35);
        });
      } else {
        // Low error buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.setValueAtTime(110, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // AudioContext unavailable fallback
    }
  };

  // Word Breakdown Engine active state
  const [breakdownHighlight, setBreakdownHighlight] = useState<number>(-1);
  const [isBreakingDown, setIsBreakingDown] = useState<boolean>(false);

  // Welcome prompt on start
  useEffect(() => {
    const timer = setTimeout(() => {
      speakBengali('বাংলা পাঠশালায় স্বাগতম। আপনার পড়া শুরু করতে প্রথম ধাপে চাপ দিন।');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLevelTap = useCallback(
    (levelId: number) => {
      cancelTTS();
      if (levelId <= highestUnlockedLevel) {
        // Asynchronously load the exact category data slice for this level
        curriculumRepository.loadLevelData(levelId);
        setCurrentScreen(levelId);
        if (levelId === 1) {
          speakBengali('ধাপ এক: স্বরবর্ণ ও ব্যঞ্জনবর্ণ। বর্ণে চাপ দিয়ে উচ্চারণ শুনুন।');
        } else if (levelId === 2) {
          speakBengali('ধাপ দুই: কার চিহ্ন। বর্ণ ও কার মিলিয়ে নতুন রূপ দেখুন।');
        } else if (levelId === 3) {
          speakBengali('ধাপ তিন: ফলা চিহ্ন ও শব্দ বিশ্লেষণ।');
        } else if (levelId === 4) {
          speakBengali('ধাপ চার: যুক্তাক্ষর। কঠিন যুক্তবর্ণের মেলবন্ধন।');
        } else if (levelId === 5) {
          speakBengali('ধাপ পাঁচ: কঠিন যুক্তাক্ষর। তিন বর্ণের মেলবন্ধন ও বিশ্লেষণ।');
        } else if (levelId === 6) {
          speakBengali('ধাপ ছয়: ছোট বাক্য ও শব্দ গঠন।');
        } else if (levelId === 7) {
          speakBengali('ধাপ সাত: শব্দভাণ্ডার। প্রকৃতি, পরিবার ও অঙ্গের শব্দ শিখুন।');
        } else if (levelId === 8) {
          speakBengali('ধাপ আট: বাক্য গঠন। বড় বাক্য একটানা শুনুন ও পড়ুন।');
        } else if (levelId === 9) {
          speakBengali('ধাপ নয়: অনুচ্ছেদ পাঠ। ছোট ছোট সুন্দর অনুচ্ছেদ।');
        } else if (levelId === 10) {
          speakBengali('ধাপ দশ: সম্পূর্ণ গল্প। গল্প শুনুন ও যেকোনো শব্দ ভেঙে শিখুন।');
        }
      } else {
        speakBengali('এই ধাপটি এখনও বন্ধ আছে। আগের ধাপটি সম্পন্ন করে এটি খুলুন।');
      }
    },
    [highestUnlockedLevel, speakBengali]
  );

  // Launch quiz for a level
  const triggerLevelQuiz = (levelId: number) => {
    const quiz = LEVEL_QUIZZES[levelId];
    if (quiz) {
      setActiveQuizLevel(levelId);
      setQuizSelectionId(null);
      setQuizFeedback('idle');
      speakBengali(`ছোট পরীক্ষা। ${quiz.audioPrompt}`);
    } else {
      // Fallback direct unlock
      if (levelId + 1 > highestUnlockedLevel) {
        setHighestUnlockedLevel(levelId + 1);
      }
      setCurrentScreen(0);
    }
  };

  const handleQuizOptionTap = async (isCorrect: boolean, optId: string) => {
    setQuizSelectionId(optId);
    if (isCorrect) {
      playSoundEffect('success');
      setQuizFeedback('correct');

      if (activeSubLessonQuiz) {
        const { subLesson, level } = activeSubLessonQuiz;
        const newCompleted = { ...completedSubLessons, [subLesson.id]: true };
        setCompletedSubLessons(newCompleted);

        if (level) {
          const isFinalSub = subLesson.subIndex >= level.subLessons.length;
          if (isFinalSub) {
            if (level.id >= highestUnlockedLevel && level.id < 20) {
              setHighestUnlockedLevel(level.id + 1);
            }
            speakBengali(`দারুণ! আপনি ধাপ ${toBn(level.id)} এর পরীক্ষা পাস করেছেন! ধাপ ${toBn(Math.min(20, level.id + 1))} উন্মুক্ত!`);
          } else {
            speakBengali(`সঠিক উত্তর! ${subLesson.subNumber} সম্পন্ন হয়েছে এবং পরবর্তী পাঠ উন্মুক্ত হয়েছে!`);
          }
        }
      } else {
        const nextLevel = (activeQuizLevel ?? 1) + 1;
        if (nextLevel > highestUnlockedLevel && nextLevel <= 20) {
          setHighestUnlockedLevel(nextLevel);
        }
        if (highestUnlockedDay < 30) {
          setHighestUnlockedDay((prev) => Math.min(30, prev + 1));
        }
        speakBengali('খুব ভালো! আপনি সঠিক উত্তর দিয়েছেন। পরবর্তী ধাপ খুলে গেছে!');
      }

      await new Promise((r) => setTimeout(r, 1800));
      setActiveQuizLevel(null);
      setActiveSubLessonQuiz(null);
      setQuizFeedback('idle');
      setQuizSelectionId(null);
      if (!activeSubLessonQuiz) {
        setCurrentScreen(0);
      }
    } else {
      playSoundEffect('error');
      setQuizFeedback('wrong');
      speakBengali('আবার চেষ্টা করুন।');
      await new Promise((r) => setTimeout(r, 900));
      setQuizFeedback('idle');
      setQuizSelectionId(null);
    }
  };

  // Complete 20-Level Sub-lesson logic
  const completeLevelSubLesson = (subLesson: SubLessonItem, level: LevelCurriculumItem) => {
    playSoundEffect('success');
    const newCompleted = { ...completedSubLessons, [subLesson.id]: true };
    setCompletedSubLessons(newCompleted);

    const isFinalSub = subLesson.subIndex >= level.subLessons.length;
    if (isFinalSub) {
      if (level.id >= highestUnlockedLevel && level.id < 20) {
        setHighestUnlockedLevel(level.id + 1);
        speakBengali(`অভিনন্দন! আপনি ধাপ ${toBn(level.id)} এর সকল পাঠ সম্পন্ন করেছেন! ধাপ ${toBn(level.id + 1)} খুলে গেছে!`);
      } else {
        speakBengali(`অভিনন্দন! আপনি ধাপ ${toBn(level.id)} এর সকল পাঠ সম্পন্ন করেছেন!`);
      }
    } else {
      speakBengali(`দারুণ! ${subLesson.subNumber} সম্পন্ন হয়েছে। পরবর্তী পাঠ আনলক হয়েছে।`);
    }
  };

  // Sequential Word Breakdown Animation & Speech Engine
  const runWordBreakdown = async (breakdown: WordBreakdown) => {
    if (isBreakingDown) return;
    setIsBreakingDown(true);

    for (let i = 0; i < breakdown.parts.length; i++) {
      setBreakdownHighlight(i);
      speakBengali(breakdown.partsAudio[i] || breakdown.parts[i]);
      await new Promise((r) => setTimeout(r, 950));
    }

    setBreakdownHighlight(breakdown.parts.length);
    speakBengali(`সমান ${breakdown.fullAudio || breakdown.word}`);
    await new Promise((r) => setTimeout(r, 1100));

    setBreakdownHighlight(-1);
    setIsBreakingDown(false);
  };

  // Level 8 Sequential sentence play
  const playSentenceFluidly = async (item: SentenceItem) => {
    if (l8PlayingAll) return;
    setL8PlayingAll(true);

    for (let i = 0; i < item.words.length; i++) {
      setL8WordHighlight(i);
      speakBengali(item.wordsAudio[i] || item.words[i]);
      await new Promise((r) => setTimeout(r, 750));
    }

    setL8WordHighlight(-1);
    speakBengali(item.fullAudio);
    await new Promise((r) => setTimeout(r, 900));

    setL8PlayingAll(false);
  };

  // Level 9 Sequential paragraph play
  const playParagraphFluidly = async (sentences: string[]) => {
    if (l9PlayingAll) return;
    setL9PlayingAll(true);

    for (let i = 0; i < sentences.length; i++) {
      setL9SentenceHighlight(i);
      speakBengali(sentences[i]);
      await new Promise((r) => setTimeout(r, 1500));
    }

    setL9SentenceHighlight(-1);
    setL9PlayingAll(false);
  };

  // Convert English number to Bengali numerals
  const toBn = useCallback((num: number) => {
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num)
      .split('')
      .map((d) => bnNums[parseInt(d, 10)] ?? d)
      .join('');
  }, []);

  // Quiz Modal overlay - Purely Visual, NO text reliance
  const renderQuizModal = () => {
    const quiz =
      activeSubLessonQuiz?.subLesson.quiz ||
      (activeQuizLevel !== null ? LEVEL_QUIZZES[activeQuizLevel] : null);
    if (!quiz) return null;

    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border-3 border-sky-400 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center flex flex-col items-center relative overflow-hidden">
          {/* Success Overlay with Giant Green Checkmark (✔️) */}
          {quizFeedback === 'correct' && (
            <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center z-30 p-6 animate-in fade-in zoom-in duration-300">
              <div className="w-28 h-28 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 animate-bounce shadow-2xl shadow-emerald-500/50">
                <CheckCircle className="w-20 h-20" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-2">সঠিক উত্তর!</h3>
              <p className="text-emerald-300 text-lg font-bold">পরবর্তী ধাপ খুলে গেছে ✔️</p>
            </div>
          )}

          {/* Header with speaker button */}
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center space-x-2 text-sky-400">
              <HelpCircle className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">ছবি দেখে পরীক্ষা</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => speakBengali(quiz.audioPrompt)}
                className="w-11 h-11 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-95 flex items-center justify-center text-slate-950 shadow-lg"
                aria-label="প্রশ্ন শুনুন"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  cancelTTS();
                  setActiveQuizLevel(null);
                  setActiveSubLessonQuiz(null);
                  setQuizFeedback('idle');
                  setQuizSelectionId(null);
                }}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-slate-300"
                aria-label="বন্ধ করুন"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Audio Question Prompt Banner */}
          <div
            onClick={() => speakBengali(quiz.audioPrompt)}
            className="w-full bg-sky-950/60 border border-sky-500/40 rounded-2xl p-3 mb-4 flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
          >
            <Volume2 className="w-6 h-6 text-sky-400 animate-pulse" />
            <span className="text-base font-bold text-sky-200">প্রশ্ন শুনতে স্পর্শ করুন</span>
          </div>

          {/* Wrong feedback banner with Red Cross (❌) */}
          {quizFeedback === 'wrong' && (
            <div className="w-full bg-rose-950/80 border border-rose-500/50 rounded-2xl p-3 mb-4 flex items-center justify-center space-x-2 animate-pulse">
              <XCircle className="w-7 h-7 text-rose-400" />
              <span className="text-lg font-extrabold text-rose-300">ভুল হয়েছে, আবার চেষ্টা করুন ❌</span>
            </div>
          )}

          {/* 3 Giant Visual Picture/Icon Choice Buttons */}
          <div className="w-full space-y-3">
            {quiz.options.map((opt) => {
              const isSelected = quizSelectionId === opt.id;
              let btnClass = 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700';
              if (isSelected && quizFeedback === 'correct') {
                btnClass = 'bg-emerald-600 border-white text-white scale-105 shadow-xl shadow-emerald-500/50';
              } else if (isSelected && quizFeedback === 'wrong') {
                btnClass = 'bg-rose-600 border-white text-white shadow-xl shadow-rose-500/50';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleQuizOptionTap(opt.isCorrect, opt.id)}
                  disabled={quizFeedback === 'correct'}
                  className={`w-full py-3.5 px-4 rounded-2xl border-2 transition-all flex items-center justify-between space-x-4 active:scale-95 shadow-md ${btnClass}`}
                >
                  <span className="text-6xl select-none">{opt.iconSymbol}</span>
                  <div className="flex-1 text-right">
                    <span className="text-2xl font-extrabold text-white block">{opt.displayText}</span>
                    <span className="text-xs text-slate-400">ছবি স্পর্শ করুন</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => speakBengali(quiz.audioPrompt)}
            className="mt-4 text-sky-400 hover:text-sky-300 font-bold text-base flex items-center space-x-2 py-1"
          >
            <Volume2 className="w-5 h-5" />
            <span>প্রশ্নটি আবার শুনুন</span>
          </button>
        </div>
      </div>
    );
  };

  // Bangla Academy Dictionary Meaning Popup Modal (Memoized Component with Strict TTS Cleanup)
  const renderMeaningModal = () => (
    <MeaningModal
      data={activeMeaningModal}
      onClose={handleCloseMeaningModal}
      onSpeak={speakBengali}
    />
  );

  // Complete Sub-Lesson logic
  const completeSubLesson = (subLesson: SubLessonItem, day: DayCurriculumItem) => {
    playSoundEffect('success');
    const newCompleted = { ...completedSubLessons, [subLesson.id]: true };
    setCompletedSubLessons(newCompleted);

    const dayNum = day.dayNumber;
    const currentMins = dayMinutesMap[dayNum] || 0;
    const newMins = Math.min(20, currentMins + 4);
    const newMinutesMap = { ...dayMinutesMap, [dayNum]: newMins };
    setDayMinutesMap(newMinutesMap);

    // Check if all 5 sub-lessons of this day are now completed
    let allFiveDone = true;
    for (let i = 1; i <= 5; i++) {
      if (!newCompleted[`day-${dayNum}-sub-${i}`]) {
        allFiveDone = false;
        break;
      }
    }

    if (allFiveDone) {
      speakBengali(`অসাধারণ! দিন ${toBnDigit(dayNum)} এর ৫টি পাঠ ও ২০ মিনিট সম্পূর্ণ হয়েছে! দিন ${toBnDigit(dayNum + 1)} খুলে গেছে!`);
      if (dayNum >= highestUnlockedDay && dayNum < 30) {
        setHighestUnlockedDay(dayNum + 1);
      }
    } else {
      speakBengali(`দারুণ! ${subLesson.subNumber} সম্পন্ন হয়েছে। ৪ মিনিট অনুশীলন যুক্ত হলো।`);
    }
  };

  // Sub-lesson Drawer / Modal (Shows 5 Sub-lessons for a Day)
  const renderDaySubModal = () => {
    if (!activeDaySubModal) return null;
    const day = activeDaySubModal;
    const minutesSpent = dayMinutesMap[day.dayNumber] || (day.dayNumber < highestUnlockedDay ? 20 : 0);
    const completedSubsCount = day.subLessons.filter((s) => completedSubLessons[s.id]).length;

    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border-2 border-teal-500/60 rounded-3xl p-5 w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{day.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{day.bengaliDay}: {day.title}</h3>
                <p className="text-xs text-teal-300 font-medium">{day.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => {
                cancelTTS();
                setActiveDaySubModal(null);
              }}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 active:scale-95"
              aria-label="বন্ধ করুন"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Day Progress Summary */}
          <div className="my-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">৫টি বাধ্যতামূলক উপ-পাঠের অগ্রগতি:</span>
              <span className="text-teal-300 font-bold">{toBnDigit(completedSubsCount)}/৫ পাঠ সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedSubsCount / 5) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs mt-2 text-slate-400">
              <span>দৈনিক লক্ষ্য: ২০ মিনিট</span>
              <span className="text-amber-300 font-bold">{toBnDigit(minutesSpent)} / ২০ মিনিট</span>
            </div>
          </div>

          {/* Sub-lessons list */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 my-1">
            {day.subLessons.map((sub) => {
              const isDone = !!completedSubLessons[sub.id];
              const isUnlocked = curriculumRepository.isSubLessonUnlocked(
                day.dayNumber,
                sub.subIndex,
                completedSubLessons,
                highestUnlockedDay
              );

              return (
                <div
                  key={sub.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isUnlocked
                      ? 'bg-slate-800/80 border-teal-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/70 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{sub.icon}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            {sub.subNumber}
                          </span>
                          <h4 className="text-sm font-bold text-white">{sub.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{sub.summary}</p>
                      </div>
                    </div>
                    {/* Status Pill */}
                    {isDone ? (
                      <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : isUnlocked ? (
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold">
                        ৪ মিনিট
                      </span>
                    ) : (
                      <span className="shrink-0 w-7 h-7 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50">
                    <button
                      onClick={() => speakBengali(sub.instructionAudio)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center space-x-1.5 active:scale-95"
                      aria-label="নির্দেশনা শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>নির্দেশনা</span>
                    </button>

                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          speakBengali(`${sub.subNumber} শুরু হচ্ছে।`);
                          setActiveSubLessonPractice({ subLesson: sub, day });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 ${
                          isDone
                            ? 'bg-slate-700 text-emerald-300 hover:bg-slate-600'
                            : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isDone ? 'পুনরায় অনুশীলন' : 'পাঠ শুরু করুন'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">আগের পাঠ সম্পন্ন করুন</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Direct Jump */}
          <div className="pt-3 border-t border-slate-800 flex space-x-2">
            <button
              onClick={() => {
                setActiveDaySubModal(null);
                handleLevelTap(day.mappedLevelId);
              }}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 active:scale-95 rounded-2xl font-bold text-white text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              <span>ধাপভিত্তিক ক্লাসে যান</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Level Sub-lesson Drawer / Modal (Shows 7 Sub-lessons for a Level from the 20-Level Curriculum)
  const renderLevelSubModal = () => {
    if (!activeLevelSubModal) return null;
    const level = activeLevelSubModal;
    const completedSubsCount = level.subLessons.filter((s) => completedSubLessons[s.id]).length;

    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{level.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">ধাপ {level.bengaliNum}: {level.title}</h3>
                <p className="text-xs text-emerald-400 font-medium">{level.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => {
                cancelTTS();
                setActiveLevelSubModal(null);
              }}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 active:scale-95"
              aria-label="বন্ধ করুন"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Level Progress Summary */}
          <div className="my-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-semibold">{toBn(level.subLessons.length)}টি বাধ্যতামূলক উপ-পাঠের অগ্রগতি:</span>
              <span className="text-emerald-400 font-bold">{toBn(completedSubsCount)}/{toBn(level.subLessons.length)} পাঠ সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedSubsCount / level.subLessons.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Sub-lessons Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {level.subLessons.map((sub) => {
              const isDone = !!completedSubLessons[sub.id];
              const isUnlocked = curriculumRepository.isLevelSubLessonUnlocked(
                level.id,
                sub.subIndex,
                completedSubLessons,
                highestUnlockedLevel
              );

              return (
                <div
                  key={sub.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isUnlocked
                      ? 'bg-slate-800/80 border-emerald-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/70 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{sub.icon}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {sub.subNumber}
                          </span>
                          <h4 className="text-sm font-bold text-white">{sub.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{sub.summary}</p>
                      </div>
                    </div>
                    {/* Status Pill */}
                    {isDone ? (
                      <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : isUnlocked ? (
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                        ৪ মিনিট
                      </span>
                    ) : (
                      <span className="shrink-0 w-7 h-7 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50">
                    <button
                      onClick={() => speakBengali(sub.instructionAudio)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-emerald-300 text-xs font-bold flex items-center space-x-1.5 active:scale-95"
                      aria-label="নির্দেশনা শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>নির্দেশনা</span>
                    </button>

                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          setSubWordExampleIdx(0);
                          speakBengali(`${sub.subNumber} শুরু হচ্ছে।`);
                          setActiveSubLessonPractice({ subLesson: sub, level });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 ${
                          isDone
                            ? 'bg-slate-700 text-emerald-300 hover:bg-slate-600'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isDone ? 'পুনরায় অনুশীলন' : 'পাঠ শুরু করুন'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">আগের পাঠ সম্পন্ন করুন 🔒</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Direct Jump */}
          <div className="pt-3 border-t border-slate-800 flex space-x-2">
            <button
              onClick={() => {
                setActiveLevelSubModal(null);
                handleLevelTap(level.id);
              }}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-2xl font-bold text-white text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              <span>ধাপভিত্তিক পূর্ণাঙ্গ ক্লাসে যান</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sub-lesson Practice & Pass Modal
  const renderSubLessonPracticeModal = () => {
    if (!activeSubLessonPractice) return null;
    const { subLesson, day, level } = activeSubLessonPractice;
    const isDone = !!completedSubLessons[subLesson.id];
    const wordsList = subLesson.words || [];
    const currentWord = wordsList.length > 0 ? wordsList[subWordExampleIdx % wordsList.length] : null;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 w-full max-w-sm shadow-2xl flex flex-col items-center text-center relative overflow-hidden max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {subLesson.subNumber}
            </span>
            <button
              onClick={() => {
                cancelTTS();
                setActiveSubLessonPractice(null);
              }}
              className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-4xl mb-2">{subLesson.icon}</div>
          <h3 className="text-xl font-bold text-white mb-1">{subLesson.title}</h3>
          <p className="text-xs text-emerald-300 mb-3">{subLesson.summary}</p>

          {/* Interactive Audio Prompt Banner */}
          <button
            onClick={() => speakBengali(subLesson.instructionAudio)}
            className="w-full p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-center space-x-2 text-emerald-200 text-xs font-semibold mb-3 active:scale-98"
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>নির্দেশনাটি শুনুন</span>
          </button>

          {/* Word Flashcard (Minimalist: Giant Word, Emoji & Audio Only) */}
          {currentWord && (
            <div className="w-full bg-slate-950 rounded-3xl p-4 border border-slate-800 mb-4 shadow-xl">
              <div
                onClick={() => speakBengali(`${currentWord.word}।`)}
                className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-slate-700 cursor-pointer active:scale-98 transition-all hover:border-emerald-500/50"
              >
                <span className="text-6xl mb-2 drop-shadow-md">{currentWord.icon}</span>
                <span className="text-4xl font-extrabold text-white tracking-wide">{currentWord.word}</span>
                <div className="mt-4 w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-md">
                  <Volume2 className="w-6 h-6" />
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                {wordsList.length > 1 && (
                  <button
                    onClick={() => {
                      const nextIdx = subWordExampleIdx + 1;
                      setSubWordExampleIdx(nextIdx);
                      const nextWord = wordsList[nextIdx % wordsList.length];
                      speakBengali(`${nextWord.word}।`);
                    }}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-sm font-bold text-emerald-400 shadow-md transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>আরও উদাহরণ ({toBn(wordsList.length)}টি শব্দ)</span>
                  </button>
                )}
                <button
                  onClick={() =>
                    openWordMeaning(
                      currentWord.word,
                      currentWord.meaning,
                      currentWord.icon,
                      currentWord.breakdown
                    )
                  }
                  className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>মানে 📖</span>
                </button>
              </div>
            </div>
          )}

          {/* Focus Keys / Letter Flashcards */}
          {subLesson.focusKeys && subLesson.focusKeys.length > 0 && (
            <div className="w-full bg-slate-950 rounded-2xl p-3 border border-slate-800 mb-3">
              <span className="text-xs text-slate-400 block mb-1.5 font-medium">আজকের পাঠের মূল বিষয়:</span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {subLesson.focusKeys.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      const letterData = curriculumRepository.getLetterByCharStrict(k);
                      speakBengali(`${k}। ${letterData.word}।`);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xl active:scale-95 shadow-md flex items-center space-x-1"
                  >
                    <span>{k}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {subLesson.type === 'quiz' || subLesson.quiz ? (
            <button
              onClick={() => {
                setActiveSubLessonPractice(null);
                if (subLesson.quiz) {
                  setActiveSubLessonQuiz({ subLesson, level });
                  speakBengali(`ছোট পরীক্ষা। ${subLesson.quiz.audioPrompt}`);
                } else if (day) {
                  triggerLevelQuiz(day.mappedLevelId);
                } else if (level) {
                  triggerLevelQuiz(level.id);
                }
              }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20"
            >
              <Trophy className="w-5 h-5" />
              <span>দক্ষতা যাচাই পরীক্ষা শুরু করুন</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (level) {
                  completeLevelSubLesson(subLesson, level);
                } else if (day) {
                  completeSubLesson(subLesson, day);
                }
                setActiveSubLessonPractice(null);
              }}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{isDone ? 'অনুশীলন সম্পন্ন' : 'পাঠ সম্পন্ন করুন (+৪ মিনিট)'}</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // HOME SCREEN (মূল পাতা)
  // -------------------------------------------------------------
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderLevelSubModal()}
        {renderDaySubModal()}
        {renderSubLessonPracticeModal()}
        {renderMeaningModal()}

        {/* Top App Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <School className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">বাংলা পাঠশালা</h1>
              <p className="text-xs text-emerald-400 font-medium">সহজ ও আনন্দের সাথে বাংলা শিখি</p>
            </div>
          </div>
          <button
            onClick={() => speakBengali('বাংলা পাঠশালায় স্বাগতম। আপনার পড়া শুরু করতে প্রথম ধাপে চাপ দিন।')}
            className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 flex items-center justify-center text-white shadow-lg transition-transform"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        {/* View Mode Switcher: 20 Levels vs 30-Day Plan */}
        <div className="px-4 pt-3 flex space-x-2">
          <button
            onClick={() => {
              setHomeTab('levels');
              speakBengali('২০টি প্রধান ধাপ। আপনার স্তর নির্বাচন করুন।');
            }}
            className={`flex-1 py-3 px-2 rounded-2xl flex items-center justify-center space-x-2 font-bold text-lg border-2 transition-all ${
              homeTab === 'levels'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>২০টি ধাপ</span>
          </button>
          <button
            onClick={() => {
              setHomeTab('days');
              speakBengali('৩০ দিনের পাঠশালা। প্রতিদিন ২০ মিনিট অনুশীলন করুন।');
            }}
            className={`flex-1 py-3 px-2 rounded-2xl flex items-center justify-center space-x-2 font-bold text-lg border-2 transition-all ${
              homeTab === 'days'
                ? 'bg-teal-600 border-teal-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5 text-cyan-300" />
            <span>৩০ দিনের পাঠ</span>
          </button>
        </div>

        {/* MODE 1: 20 LEVEL DEEP CURRICULUM */}
        {homeTab === 'levels' ? (
          <>
            {/* Visual Progress Banner */}
            <div className="p-4">
              <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-5 border border-emerald-600/30 shadow-xl flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Trophy className="w-8 h-8 text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-white">ধাপ {toBn(highestUnlockedLevel)} উন্মুক্ত</span>
                    <span className="text-sm font-semibold text-emerald-300">{toBn(highestUnlockedLevel)} / ২০</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden p-0.5">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${(highestUnlockedLevel / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Virtualized 20 Level Cards List */}
            <VirtualizedLevelList
              levels={twentyLevels}
              highestUnlockedLevel={highestUnlockedLevel}
              completedSubLessons={completedSubLessons}
              toBn={toBn}
              onSelectLevel={handleSelectLevelFromList}
              onSpeak={speakBengali}
            />
          </>
        ) : (
          /* MODE 2: 30-DAY CURRICULUM (20 MINUTES/DAY) */
          <>
            {/* 30-Day Daily Target Banner */}
            <div className="p-4">
              <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 rounded-3xl p-5 border border-teal-500/40 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-300">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">দিন {toBnDigit(highestUnlockedDay)} এর অনুশীলন</h2>
                      <p className="text-xs text-teal-300">প্রতিদিনের লক্ষ্য: ২০ মিনিট</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-amber-300">
                      {toBnDigit(dayMinutesMap[highestUnlockedDay] || 0)} / ২০
                    </span>
                    <span className="text-xs text-slate-300 block">মিনিট</span>
                  </div>
                </div>

                {/* 20-Minute Progress Bar */}
                <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden p-0.5 mb-4">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${Math.min(100, (((dayMinutesMap[highestUnlockedDay] || 0) / 20) * 100))}%` }}
                  />
                </div>

                {/* Practice Simulation Button */}
                <button
                  onClick={() => {
                    const currentMins = dayMinutesMap[highestUnlockedDay] || 0;
                    const newMins = Math.min(20, currentMins + 5);
                    setDayMinutesMap({ ...dayMinutesMap, [highestUnlockedDay]: newMins });

                    if (newMins >= 20) {
                      speakBengali(`দারুণ! দিন ${toBnDigit(highestUnlockedDay)} এর ২০ মিনিট অনুশীলন সম্পন্ন হয়েছে!`);
                      if (highestUnlockedDay < 30) {
                        setHighestUnlockedDay((prev) => Math.min(30, prev + 1));
                      }
                    } else {
                      speakBengali(`আরও ৫ মিনিট অনুশীলন যুক্ত হলো। মোট ${toBnDigit(newMins)} মিনিট সম্পন্ন।`);
                    }
                  }}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform"
                >
                  <Clock className="w-6 h-6" />
                  <span>+৫ মিনিট অনুশীলন যোগ করুন</span>
                </button>
              </div>
            </div>

            {/* 30 Day Cards List */}
            <main className="flex-1 px-4 space-y-3 pb-8 max-h-[60vh] overflow-y-auto">
              {curriculumRepository.getThirtyDays().map((day) => {
                const isUnlocked = day.dayNumber <= highestUnlockedDay;
                const minutesSpent = dayMinutesMap[day.dayNumber] || (day.dayNumber < highestUnlockedDay ? 20 : 0);
                const isFinished = minutesSpent >= 20;
                const completedSubsCount = day.subLessons.filter((s) => completedSubLessons[s.id]).length;

                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => {
                      if (isUnlocked) {
                        speakBengali(`${day.bengaliDay}। ${day.title}। উপ-পাঠের তালিকা দেখুন।`);
                        setActiveDaySubModal(day);
                      } else {
                        speakBengali(`দিন ${toBnDigit(day.dayNumber)} এখনও বন্ধ। আগের দিনের ৫টি পাঠ সম্পন্ন করে এটি খুলুন।`);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-3xl border-2 transition-all duration-200 flex items-center space-x-4 active:scale-[0.98] ${
                      isUnlocked
                        ? 'bg-slate-900/90 border-teal-500/50 hover:border-teal-400 shadow-lg shadow-teal-950/30'
                        : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                    }`}
                  >
                    {/* Day Badge */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
                        isUnlocked
                          ? isFinished
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-semibold">দিন</span>
                      <span className="text-2xl font-bold">{toBnDigit(day.dayNumber)}</span>
                    </div>

                    {/* Day Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{day.icon}</span>
                        <h3 className="text-lg font-bold text-white truncate">{day.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{day.subtitle}</p>

                      {/* Visual Sub-levels Tracker (5 Sub-lessons) */}
                      <div className="flex items-center space-x-1.5 mt-2">
                        {day.subLessons.map((sub) => {
                          const isSubDone = !!completedSubLessons[sub.id];
                          const isSubActive =
                            isUnlocked &&
                            !isSubDone &&
                            curriculumRepository.isSubLessonUnlocked(
                              day.dayNumber,
                              sub.subIndex,
                              completedSubLessons,
                              highestUnlockedDay
                            );
                          return (
                            <span
                              key={sub.id}
                              className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold border transition-all ${
                                isSubDone
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : isSubActive
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                                  : 'bg-slate-800 text-slate-500 border-slate-700/60'
                              }`}
                            >
                              {isSubDone ? '✓' : toBnDigit(sub.subIndex)}
                            </span>
                          );
                        })}
                        <span className="text-[11px] text-teal-300 font-bold ml-1">
                          {toBnDigit(completedSubsCount)}/৫ পাঠ
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 font-semibold">
                          {toBnDigit(minutesSpent)} / ২০ মিনিট
                        </span>
                        {isFinished && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>সম্পন্ন</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Lock or Action */}
                    <div className="shrink-0">
                      {isUnlocked ? (
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/40">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center border border-slate-700">
                          <Lock className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </main>
          </>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 1: বর্ণমালা (STRICT EXACT BINDING)
  // -------------------------------------------------------------
  if (currentScreen === 1) {
    const list =
      l1Tab === 'vowel'
        ? curriculumRepository.getAlphabetVowels()
        : curriculumRepository.getAlphabetConsonants();
    const current = curriculumRepository.getLetterByCharStrict(l1SelectedChar) || list[0];
    const moreList = current.more || [];
    const hasMore = moreList.length > 0;
    const currentExample =
      l1ExampleIdx === 0
        ? { word: current.word, icon: current.icon }
        : moreList[(l1ExampleIdx - 1) % moreList.length] || {
            word: current.word,
            icon: current.icon,
          };

    const playCurrentL1 = () => {
      speakBengali(`${current.char}। ${currentExample.word}।`);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ১: বর্ণমালা</h1>
          <button
            onClick={playCurrentL1}
            className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        <div className="p-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setL1Tab('vowel');
              setL1SelectedChar('অ');
              setL1SelectedIdx(0);
              setL1ExampleIdx(0);
              speakBengali('স্বরবর্ণ');
            }}
            className={`py-3 rounded-2xl text-xl font-bold transition-all border-2 ${
              l1Tab === 'vowel'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            স্বরবর্ণ (১১)
          </button>
          <button
            onClick={() => {
              setL1Tab('consonant');
              setL1SelectedChar('ক');
              setL1SelectedIdx(0);
              setL1ExampleIdx(0);
              speakBengali('ব্যঞ্জনবর্ণ');
            }}
            className={`py-3 rounded-2xl text-xl font-bold transition-all border-2 ${
              l1Tab === 'consonant'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            ব্যঞ্জনবর্ণ (৩৯)
          </button>
        </div>

        <div className="px-4 py-2">
          <div
            onClick={playCurrentL1}
            className="w-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border-3 border-emerald-500/60 p-6 flex flex-col items-center justify-center shadow-2xl relative cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="text-9xl font-extrabold text-emerald-400 leading-none py-2 drop-shadow-md">
              {current.char}
            </div>
            <div className="flex items-center space-x-4 mt-4 bg-slate-800/80 px-6 py-3 rounded-2xl border border-slate-700">
              <span className="text-5xl">{currentExample.icon}</span>
              <span className="text-4xl font-extrabold text-white tracking-wide">{currentExample.word}</span>
            </div>
            <div className="mt-5 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Volume2 className="w-9 h-9" />
            </div>
          </div>
        </div>

        <div className="px-4 py-1 flex space-x-2">
          {hasMore && (
            <button
              onClick={() => {
                const nextEx = (l1ExampleIdx + 1) % (moreList.length + 1);
                setL1ExampleIdx(nextEx);
                const ex = nextEx === 0 ? { word: current.word, icon: current.icon } : moreList[nextEx - 1];
                speakBengali(`${current.char}। ${ex.word}।`);
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-emerald-400 shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও উদাহরণ ({toBnDigit(moreList.length)})</span>
            </button>
          )}
          <button
            onClick={() =>
              openWordMeaning(currentExample.word, undefined, currentExample.icon)
            }
            className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>মানে 📖</span>
          </button>
        </div>

        <div className="p-4 flex-1">
          <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto p-2 bg-slate-900 rounded-3xl border border-slate-800">
            {list.map((item, idx) => {
              const isSel = item.char === l1SelectedChar;
              return (
                <button
                  key={item.char}
                  onClick={() => {
                    setL1SelectedChar(item.char);
                    setL1SelectedIdx(idx);
                    setL1ExampleIdx(0);
                    speakBengali(`${item.char}। ${item.word}।`);
                  }}
                  className={`h-14 rounded-2xl flex items-center justify-center text-3xl font-extrabold transition-all ${
                    isSel
                      ? 'bg-emerald-500 text-slate-950 shadow-lg scale-105 border-2 border-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.char}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(1)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-emerald-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ১ এর পরীক্ষা ও ধাপ ২ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 2: কার চিহ্ন (FIXED: STRICT EXACT BINDING)
  // -------------------------------------------------------------
  if (currentScreen === 2) {
    const kar = KAR_LIST[l2KarIdx] || KAR_LIST[0];
    const combined = `${l2Consonant}${kar.sign}`;
    const exactExamples = curriculumRepository.getExactKarExamples(l2Consonant, kar.sign);
    const hasMore = exactExamples.length > 1;
    const currentWord =
      exactExamples.length > 0
        ? exactExamples[l2ExampleIdx % exactExamples.length]
        : null;

    const playCurrentL2 = () => {
      if (currentWord) {
        speakBengali(`${l2Consonant} যোগ ${kar.name} সমান ${combined}। উদাহরণ: ${currentWord.word}।`);
      } else {
        speakBengali(`${l2Consonant} যোগ ${kar.name} সমান ${combined}। এই বানানের কোনো সহজ শব্দ নেই।`);
      }
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ২: কার চিহ্ন</h1>
          <button
            onClick={playCurrentL2}
            className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        <div className="p-4">
          <div
            onClick={playCurrentL2}
            className="w-full bg-gradient-to-b from-indigo-950/80 to-slate-950 rounded-3xl border-3 border-indigo-500/70 p-6 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center space-x-3 text-white">
              <div className="w-18 h-18 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-5xl font-extrabold">
                {l2Consonant}
              </div>
              <span className="text-4xl font-bold text-slate-400">+</span>
              <div className="w-18 h-18 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-5xl font-extrabold text-amber-400">
                {kar.sign}
              </div>
              <span className="text-4xl font-bold text-slate-400">=</span>
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 border-3 border-indigo-300 flex items-center justify-center text-6xl font-extrabold text-white shadow-lg">
                {combined}
              </div>
            </div>
            <div className="mt-3 text-xl font-bold text-indigo-300">{kar.name}</div>
            {currentWord ? (
              <div className="flex items-center space-x-4 mt-4 bg-slate-900/90 px-6 py-3 rounded-2xl border border-indigo-500/30">
                <span className="text-5xl">{currentWord.icon}</span>
                <span className="text-4xl font-extrabold text-white tracking-wide">{currentWord.word}</span>
              </div>
            ) : (
              <div className="mt-4 px-6 py-3 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl text-center">
                <p className="text-lg font-bold text-indigo-200">এই বানানের কোনো সহজ শব্দ নেই।</p>
              </div>
            )}
            <div className="mt-4 w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Volume2 className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="px-4 py-1 flex space-x-2">
          {hasMore && (
            <button
              onClick={() => handleL2NextExample(exactExamples, combined)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-indigo-400 shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও উদাহরণ ({toBnDigit(exactExamples.length)})</span>
            </button>
          )}
          {currentWord && (
            <button
              onClick={() => handleL2Meaning(currentWord.word, currentWord.meaning, currentWord.icon)}
              className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>মানে 📖</span>
            </button>
          )}
        </div>

        <div className="px-4 py-1">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {BASE_CONSONANTS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setL2Consonant(c);
                  setL2ExampleIdx(0);
                  speakBengali(`${c} যোগ ${kar.name} সমান ${c}${kar.sign}`);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 transition-all ${
                  c === l2Consonant
                    ? 'bg-indigo-600 text-white shadow-md border-2 border-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="grid grid-cols-5 gap-2.5 p-2.5 bg-slate-900 rounded-3xl border border-slate-800">
            {KAR_LIST.map((k, idx) => {
              const isSel = idx === l2KarIdx;
              return (
                <button
                  key={k.sign}
                  onClick={() => {
                    setL2KarIdx(idx);
                    setL2ExampleIdx(0);
                    speakBengali(`${l2Consonant} যোগ ${k.name} সমান ${l2Consonant}${k.sign}। ${k.sampleWord}।`);
                  }}
                  className={`h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isSel
                      ? 'bg-indigo-600 text-white shadow-lg scale-105 border-2 border-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="text-3xl font-extrabold">{k.sign}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(2)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-indigo-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ২ এর পরীক্ষা ও ধাপ ৩ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 3: ফলা চিহ্ন (FIXED: STRICT EXACT BINDING)
  // -------------------------------------------------------------
  if (currentScreen === 3) {
    const item: PhalaItem = PHALA_LIST[l3Idx] || PHALA_LIST[0];
    const exactPhalaWords = curriculumRepository.getExactPhalaExamples(item.baseLetter, item.sign);
    const hasMorePhala = exactPhalaWords.length > 1;

    // Build WordBreakdown from exact repository word or fallback to item.sampleWord
    const activeExact: ExactWordExample | null =
      exactPhalaWords.length > 0 ? exactPhalaWords[l3WordIdx % exactPhalaWords.length] : null;

    const currentWord: WordBreakdown = activeExact
      ? {
          word: activeExact.word,
          iconSymbol: activeExact.icon,
          parts: [item.baseLetter, item.sign],
          partsAudio: [`${item.baseLetter}`, `${item.name}`],
          fullAudio: activeExact.ttsAudio,
          meaning: activeExact.meaning || activeExact.word,
        }
      : item.sampleWord;

    const playCurrentL3 = () => {
      speakBengali(`${item.formulaAudio}। শব্দ: ${currentWord.word}।`);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৩: ফলা চিহ্ন</h1>
          <button
            onClick={playCurrentL3}
            className="w-12 h-12 rounded-2xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        <div className="px-4 pt-3">
          <div
            onClick={playCurrentL3}
            className="w-full bg-gradient-to-b from-purple-950/90 to-slate-950 rounded-3xl border-3 border-purple-500/70 p-5 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center space-x-3 text-white">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-4xl font-extrabold">
                {item.baseLetter}
              </div>
              <span className="text-3xl font-bold text-slate-400">+</span>
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-4xl font-extrabold text-purple-300">
                {item.sign}
              </div>
              <span className="text-3xl font-bold text-slate-400">=</span>
              <div className="w-20 h-20 rounded-2xl bg-purple-600 border-3 border-purple-300 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg">
                {item.result}
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-purple-300">{item.name}</div>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{currentWord.iconSymbol}</span>
                <span className="text-3xl font-extrabold text-white">{currentWord.word}</span>
              </div>
              <button
                onClick={() => runWordBreakdown(currentWord)}
                disabled={isBreakingDown}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg transition-transform ${
                  isBreakingDown
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-emerald-400 hover:bg-emerald-300 active:scale-95'
                }`}
                aria-label="শব্দ ভেঙে শুনুন"
              >
                {isBreakingDown ? <Volume2 className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 py-1">
              {currentWord.parts.map((p, idx) => {
                const isLit = breakdownHighlight === idx;
                return (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => speakBengali(currentWord.partsAudio[idx] || p)}
                      className={`min-w-12 h-14 px-3 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                        isLit
                          ? 'bg-amber-400 border-white text-slate-950 scale-110 shadow-lg shadow-amber-400/50'
                          : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                    {idx < currentWord.parts.length - 1 && (
                      <span className="text-2xl font-bold text-slate-500">+</span>
                    )}
                  </React.Fragment>
                );
              })}
              <span className="text-2xl font-bold text-slate-500">=</span>
              <button
                onClick={() => speakBengali(currentWord.fullAudio || currentWord.word)}
                className={`min-w-14 h-14 px-4 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                  breakdownHighlight === currentWord.parts.length
                    ? 'bg-purple-500 border-white text-white scale-110 shadow-lg shadow-purple-500/50'
                    : 'bg-purple-900/60 border-purple-500 text-purple-200'
                }`}
              >
                {currentWord.word}
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-1 flex space-x-2">
          {hasMorePhala && (
            <button
              onClick={() => {
                const nextW = (l3WordIdx + 1) % exactPhalaWords.length;
                setL3WordIdx(nextW);
                const w = exactPhalaWords[nextW];
                speakBengali(`শব্দ: ${w.word}।`);
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-purple-400 shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও উদাহরণ ({toBnDigit(exactPhalaWords.length)})</span>
            </button>
          )}
          <button
            onClick={() =>
              openWordMeaning(
                currentWord.word,
                currentWord.meaning,
                currentWord.iconSymbol
              )
            }
            className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>মানে 📖</span>
          </button>
        </div>

        <div className="p-4 flex-1">
          <div className="flex space-x-3 overflow-x-auto py-2">
            {PHALA_LIST.map((p, idx) => {
              const isSel = idx === l3Idx;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setL3Idx(idx);
                    setL3WordIdx(0);
                    speakBengali(`${p.formulaAudio}। ${p.sampleWord.word}।`);
                  }}
                  className={`w-24 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                    isSel
                      ? 'bg-purple-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-3xl font-extrabold">{p.result}</span>
                  <span className="text-xs font-semibold mt-1">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(3)}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-purple-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৩ এর পরীক্ষা ও ধাপ ৪ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 4: যুক্তাক্ষর
  // -------------------------------------------------------------
  if (currentScreen === 4) {
    const item: JuktakkhorItem = JUKTAKKHOR_LIST[l4Idx] || JUKTAKKHOR_LIST[0];
    const currentWord: WordBreakdown =
      l4WordIdx === 0 ? item.sampleWord : item.moreWords[(l4WordIdx - 1) % item.moreWords.length];

    const playCurrentL4 = () => {
      speakBengali(`${item.formulaAudio}। শব্দ: ${currentWord.word}।`);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৪: যুক্তাক্ষর</h1>
          <button
            onClick={playCurrentL4}
            className="w-12 h-12 rounded-2xl bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        <div className="px-4 pt-3">
          <div
            onClick={playCurrentL4}
            className="w-full bg-gradient-to-b from-rose-950/90 to-slate-950 rounded-3xl border-3 border-rose-500/70 p-5 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center space-x-3 text-white">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-4xl font-extrabold">
                {item.firstLetter}
              </div>
              <span className="text-3xl font-bold text-slate-400">+</span>
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-4xl font-extrabold">
                {item.secondLetter}
              </div>
              <span className="text-3xl font-bold text-slate-400">=</span>
              <div className="w-20 h-20 rounded-2xl bg-rose-600 border-3 border-rose-300 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg">
                {item.result}
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-300">{item.name}</div>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{currentWord.iconSymbol}</span>
                <span className="text-3xl font-extrabold text-white">{currentWord.word}</span>
              </div>
              <button
                onClick={() => runWordBreakdown(currentWord)}
                disabled={isBreakingDown}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg transition-transform ${
                  isBreakingDown
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-emerald-400 hover:bg-emerald-300 active:scale-95'
                }`}
                aria-label="শব্দ ভেঙে শুনুন"
              >
                {isBreakingDown ? <Volume2 className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 py-1">
              {currentWord.parts.map((p, idx) => {
                const isLit = breakdownHighlight === idx;
                return (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => speakBengali(currentWord.partsAudio[idx] || p)}
                      className={`min-w-12 h-14 px-3 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                        isLit
                          ? 'bg-amber-400 border-white text-slate-950 scale-110 shadow-lg shadow-amber-400/50'
                          : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                    {idx < currentWord.parts.length - 1 && (
                      <span className="text-2xl font-bold text-slate-500">+</span>
                    )}
                  </React.Fragment>
                );
              })}
              <span className="text-2xl font-bold text-slate-500">=</span>
              <button
                onClick={() => speakBengali(currentWord.fullAudio || currentWord.word)}
                className={`min-w-14 h-14 px-4 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                  breakdownHighlight === currentWord.parts.length
                    ? 'bg-rose-500 border-white text-white scale-110 shadow-lg shadow-rose-500/50'
                    : 'bg-rose-900/60 border-rose-500 text-rose-200'
                }`}
              >
                {currentWord.word}
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-1 flex space-x-2">
          {item.moreWords.length > 0 && (
            <button
              onClick={() => {
                const nextW = (l4WordIdx + 1) % (item.moreWords.length + 1);
                setL4WordIdx(nextW);
                const w = nextW === 0 ? item.sampleWord : item.moreWords[nextW - 1];
                speakBengali(`শব্দ: ${w.word}।`);
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-rose-400 shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও উদাহরণ</span>
            </button>
          )}
          <button
            onClick={() =>
              openWordMeaning(
                currentWord.word,
                currentWord.meaning,
                currentWord.iconSymbol
              )
            }
            className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>মানে 📖</span>
          </button>
        </div>

        <div className="p-4 flex-1">
          <div className="flex space-x-3 overflow-x-auto py-2">
            {JUKTAKKHOR_LIST.map((j, idx) => {
              const isSel = idx === l4Idx;
              return (
                <button
                  key={j.id}
                  onClick={() => {
                    setL4Idx(idx);
                    setL4WordIdx(0);
                    speakBengali(`${j.formulaAudio}। ${j.sampleWord.word}।`);
                  }}
                  className={`w-24 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                    isSel
                      ? 'bg-rose-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-3xl font-extrabold">{j.result}</span>
                  <span className="text-xs font-semibold mt-1">{j.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(4)}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-rose-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৪ এর পরীক্ষা ও ধাপ ৫ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 5: কঠিন যুক্তাক্ষর (3-letter Conjuncts)
  // -------------------------------------------------------------
  if (currentScreen === 5) {
    const item: AdvancedConjunctItem = ADVANCED_CONJUNCTS_LIST[l5Idx] || ADVANCED_CONJUNCTS_LIST[0];
    const currentWord: WordBreakdown =
      l5WordIdx === 0 ? item.sampleWord : item.moreWords[(l5WordIdx - 1) % item.moreWords.length];

    const playCurrentL5 = () => {
      speakBengali(`${item.formulaAudio}। শব্দ: ${currentWord.word}।`);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৫: কঠিন যুক্তাক্ষর</h1>
          <button
            onClick={playCurrentL5}
            className="w-12 h-12 rounded-2xl bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        <div className="px-4 pt-3">
          <div
            onClick={playCurrentL5}
            className="w-full bg-gradient-to-b from-amber-950/90 to-slate-950 rounded-3xl border-3 border-amber-500/70 p-5 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center space-x-2 text-white">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl font-extrabold">
                {item.firstLetter}
              </div>
              <span className="text-2xl font-bold text-slate-400">+</span>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl font-extrabold">
                {item.secondLetter}
              </div>
              <span className="text-2xl font-bold text-slate-400">+</span>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl font-extrabold text-amber-300">
                {item.thirdLetter}
              </div>
              <span className="text-2xl font-bold text-slate-400">=</span>
              <div className="w-18 h-18 rounded-2xl bg-amber-600 border-3 border-amber-300 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg">
                {item.result}
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-300">{item.name}</div>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{currentWord.iconSymbol}</span>
                <span className="text-3xl font-extrabold text-white">{currentWord.word}</span>
              </div>
              <button
                onClick={() => runWordBreakdown(currentWord)}
                disabled={isBreakingDown}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg transition-transform ${
                  isBreakingDown
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-emerald-400 hover:bg-emerald-300 active:scale-95'
                }`}
                aria-label="শব্দ ভেঙে শুনুন"
              >
                {isBreakingDown ? <Volume2 className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 py-1">
              {currentWord.parts.map((p, idx) => {
                const isLit = breakdownHighlight === idx;
                return (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => speakBengali(currentWord.partsAudio[idx] || p)}
                      className={`min-w-11 h-13 px-3 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                        isLit
                          ? 'bg-amber-400 border-white text-slate-950 scale-110 shadow-lg shadow-amber-400/50'
                          : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                    {idx < currentWord.parts.length - 1 && (
                      <span className="text-2xl font-bold text-slate-500">+</span>
                    )}
                  </React.Fragment>
                );
              })}
              <span className="text-2xl font-bold text-slate-500">=</span>
              <button
                onClick={() => speakBengali(currentWord.fullAudio || currentWord.word)}
                className={`min-w-14 h-13 px-4 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                  breakdownHighlight === currentWord.parts.length
                    ? 'bg-amber-500 border-white text-slate-950 scale-110 shadow-lg shadow-amber-500/50'
                    : 'bg-amber-900/60 border-amber-500 text-amber-200'
                }`}
              >
                {currentWord.word}
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-1 flex space-x-2">
          {item.moreWords.length > 0 && (
            <button
              onClick={() => {
                const nextW = (l5WordIdx + 1) % (item.moreWords.length + 1);
                setL5WordIdx(nextW);
                const w = nextW === 0 ? item.sampleWord : item.moreWords[nextW - 1];
                speakBengali(`শব্দ: ${w.word}।`);
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-amber-400 shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও উদাহরণ</span>
            </button>
          )}
          <button
            onClick={() =>
              openWordMeaning(
                currentWord.word,
                currentWord.meaning,
                currentWord.iconSymbol
              )
            }
            className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>মানে 📖</span>
          </button>
        </div>

        <div className="p-4 flex-1">
          <div className="flex space-x-3 overflow-x-auto py-2">
            {ADVANCED_CONJUNCTS_LIST.map((c, idx) => {
              const isSel = idx === l5Idx;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setL5Idx(idx);
                    setL5WordIdx(0);
                    speakBengali(`${c.formulaAudio}। ${c.sampleWord.word}।`);
                  }}
                  className={`w-26 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                    isSel
                      ? 'bg-amber-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-3xl font-extrabold">{c.result}</span>
                  <span className="text-xs font-semibold mt-1 truncate max-w-[90px]">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(5)}
            className="w-full py-4 bg-amber-600 hover:bg-amber-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-amber-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৫ এর পরীক্ষা ও ধাপ ৬ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 6: ২-শব্দের বাক্য ও শব্দ গঠন (Days 21-22)
  // -------------------------------------------------------------
  if (currentScreen === 6) {
    const currentTwoWord: TwoWordSentenceItem =
      TWO_WORD_SENTENCES[l6TwoWordIdx] || TWO_WORD_SENTENCES[0];
    const currentMechanics: WordMechanicsItem =
      WORD_MECHANICS_LIST[l6Idx] || WORD_MECHANICS_LIST[0];

    const playTwoWordSentence = async (s: TwoWordSentenceItem) => {
      speakBengali(s.fullAudio);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৬: ছোট বাক্য ও শব্দ</h1>
          <button
            onClick={() =>
              l6Tab === 'twoword'
                ? playTwoWordSentence(currentTwoWord)
                : speakBengali(currentMechanics.soundSequence)
            }
            className="w-12 h-12 rounded-2xl bg-teal-600 hover:bg-teal-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        {/* Tab switch: ২-শব্দের বাক্য vs শব্দ গঠন */}
        <div className="px-4 pt-3 flex space-x-2">
          <button
            onClick={() => {
              setL6Tab('twoword');
              speakBengali('দুই শব্দের ছোট বাক্য। বাক্যে চাপ দিয়ে শুনুন।');
            }}
            className={`flex-1 py-3 rounded-2xl font-bold text-base transition-all border-2 ${
              l6Tab === 'twoword'
                ? 'bg-teal-600 border-teal-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            💬 ২-শব্দের বাক্য
          </button>
          <button
            onClick={() => {
              setL6Tab('mechanics');
              speakBengali('শব্দ গঠন ও ভাঙন। বর্ণ মিলিয়ে নতুন শব্দ শিখুন।');
            }}
            className={`flex-1 py-3 rounded-2xl font-bold text-base transition-all border-2 ${
              l6Tab === 'mechanics'
                ? 'bg-teal-600 border-teal-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            🧩 শব্দ গঠন
          </button>
        </div>

        {/* TAB 1: ২-শব্দের বাক্য (User requested: আমি খাই, বাবা আসে, জল পড়, বই পড়, পাখি ওড়ে, রোদ ওঠে) */}
        {l6Tab === 'twoword' ? (
          <div className="px-4 py-2 flex-1 flex flex-col justify-between">
            {/* Sentence Hero Card (Minimalist: Emoji, Giant Text, Audio) */}
            <div
              onClick={() => playTwoWordSentence(currentTwoWord)}
              className="w-full bg-gradient-to-b from-teal-950/90 to-slate-950 rounded-3xl border-3 border-teal-500/70 p-7 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform my-2"
            >
              <span className="text-8xl drop-shadow-md">{currentTwoWord.iconSymbol}</span>
              <div className="text-5xl font-extrabold text-white mt-4 text-center tracking-wide">
                {currentTwoWord.sentenceText}
              </div>
              <div className="mt-5 px-7 py-3 rounded-full bg-teal-500 hover:bg-teal-400 flex items-center space-x-2 text-slate-950 font-bold shadow-lg shadow-teal-500/30">
                <Volume2 className="w-6 h-6" />
                <span>উচ্চারণ শুনুন</span>
              </div>
            </div>

            {/* Meaning & Examples Button Bar */}
            <div className="flex space-x-2 my-2">
              <button
                onClick={() => {
                  const nextIdx = (l6TwoWordIdx + 1) % TWO_WORD_SENTENCES.length;
                  setL6TwoWordIdx(nextIdx);
                  const nextS = TWO_WORD_SENTENCES[nextIdx];
                  playTwoWordSentence(nextS);
                }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-teal-300 shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>পরের বাক্য</span>
              </button>
              <button
                onClick={() =>
                  openWordMeaning(
                    currentTwoWord.sentenceText,
                    currentTwoWord.meaning,
                    currentTwoWord.iconSymbol
                  )
                }
                className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>মানে 📖</span>
              </button>
            </div>

            {/* Clickable Word Chips for Word Breakdown */}
            <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl my-2">
              <div className="text-slate-400 font-bold mb-2 text-sm text-center">
                আলাদা শব্দ ছুঁয়ে বিশ্লেষণ শুনুন:
              </div>
              <div className="flex items-center justify-center gap-3">
                {currentTwoWord.words.map((w, idx) => {
                  const cleanW = w.replace(/[।,!?]/g, '');
                  const isLit = l6WordHighlight === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setL6WordHighlight(idx);
                        speakBengali(currentTwoWord.wordsAudio[idx] || cleanW);
                        const bd = currentTwoWord.wordBreakdowns[cleanW] || {
                          parts: curriculumRepository.getWordBreakdown(cleanW),
                          partsAudio: [cleanW],
                          meaning: 'শব্দ',
                          icon: currentTwoWord.iconSymbol,
                        };
                        setL6ActiveWordBreakdown({
                          word: cleanW,
                          parts: bd.parts,
                          partsAudio: bd.partsAudio,
                          icon: bd.icon,
                          meaning: bd.meaning,
                        });
                      }}
                      className={`px-5 py-3 rounded-2xl text-2xl font-extrabold border-2 transition-all active:scale-95 ${
                        isLit
                          ? 'bg-amber-400 border-white text-slate-950 scale-105 shadow-lg shadow-amber-400/50'
                          : 'bg-teal-900/60 border-teal-500 text-white hover:bg-teal-800'
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inline Word Breakdown View */}
            {l6ActiveWordBreakdown && (
              <div className="bg-slate-900/90 rounded-3xl border-2 border-amber-500/60 p-4 shadow-xl mb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{l6ActiveWordBreakdown.icon}</span>
                    <span className="text-2xl font-extrabold text-white">
                      {l6ActiveWordBreakdown.word}
                    </span>
                    <button
                      onClick={() =>
                        openWordMeaning(
                          l6ActiveWordBreakdown.word,
                          l6ActiveWordBreakdown.meaning,
                          l6ActiveWordBreakdown.icon,
                          l6ActiveWordBreakdown.parts
                        )
                      }
                      className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold active:scale-95"
                    >
                      মানে 📖
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      speakBengali(
                        `${l6ActiveWordBreakdown.word}। ${l6ActiveWordBreakdown.partsAudio.join(
                          ' '
                        )}`
                      )
                    }
                    className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                  {l6ActiveWordBreakdown.parts.map((p, idx) => (
                    <React.Fragment key={idx}>
                      <button
                        onClick={() =>
                          speakBengali(l6ActiveWordBreakdown.partsAudio[idx] || p)
                        }
                        className="min-w-10 h-11 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95"
                      >
                        {p}
                      </button>
                      {idx < l6ActiveWordBreakdown.parts.length - 1 && (
                        <span className="text-lg font-bold text-slate-500">+</span>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="text-lg font-bold text-slate-500">=</span>
                  <button
                    onClick={() => speakBengali(l6ActiveWordBreakdown.word)}
                    className="min-w-12 h-11 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-amber-500 border-white text-slate-950"
                  >
                    {l6ActiveWordBreakdown.word}
                  </button>
                </div>
              </div>
            )}

            {/* Horizontal Sentence Selector */}
            <div className="flex space-x-3 overflow-x-auto py-2">
              {TWO_WORD_SENTENCES.map((s, idx) => {
                const isSel = idx === l6TwoWordIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setL6TwoWordIdx(idx);
                      setL6WordHighlight(-1);
                      setL6ActiveWordBreakdown(null);
                      playTwoWordSentence(s);
                    }}
                    className={`w-28 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all p-1 ${
                      isSel
                        ? 'bg-teal-600 border-white text-white shadow-lg scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-3xl">{s.iconSymbol}</span>
                    <span className="text-xs font-bold mt-1 text-center truncate max-w-[100px]">
                      {s.sentenceText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* TAB 2: শব্দ গঠন (WORD MECHANICS) */
          <div className="px-4 py-2 flex-1 flex flex-col justify-between">
            <div
              onClick={() => speakBengali(currentMechanics.soundSequence)}
              className="w-full bg-gradient-to-b from-teal-950/90 to-slate-950 rounded-3xl border-3 border-teal-500/70 p-6 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
            >
              <span className="text-7xl">{currentMechanics.iconSymbol}</span>
              <div className="text-5xl font-extrabold text-white mt-3">
                {currentMechanics.word}
              </div>
              <div className="text-xl font-bold text-teal-300 mt-1">
                {currentMechanics.meaning}
              </div>
              <div className="mt-4 w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/30">
                <Volume2 className="w-8 h-8" />
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl my-2">
              <div className="flex items-center justify-between mb-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
                <span className="text-xl font-bold text-slate-300">শব্দ ভেঙে শুনুন:</span>
                <button
                  onClick={() => runWordBreakdown(currentMechanics.breakdown)}
                  disabled={isBreakingDown}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-lg transition-transform ${
                    isBreakingDown
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-teal-400 hover:bg-teal-300 active:scale-95'
                  }`}
                  aria-label="শব্দ বিশ্লেষণ চালান"
                >
                  {isBreakingDown ? (
                    <Volume2 className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                {currentMechanics.breakdown.parts.map((p, idx) => {
                  const isLit = breakdownHighlight === idx;
                  return (
                    <React.Fragment key={idx}>
                      <button
                        onClick={() =>
                          speakBengali(currentMechanics.breakdown.partsAudio[idx] || p)
                        }
                        className={`min-w-11 h-13 px-3 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                          isLit
                            ? 'bg-amber-400 border-white text-slate-950 scale-110 shadow-lg shadow-amber-400/50'
                            : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                      {idx < currentMechanics.breakdown.parts.length - 1 && (
                        <span className="text-2xl font-bold text-slate-500">+</span>
                      )}
                    </React.Fragment>
                  );
                })}
                <span className="text-2xl font-bold text-slate-500">=</span>
                <button
                  onClick={() => speakBengali(currentMechanics.breakdown.fullAudio)}
                  className={`min-w-14 h-13 px-4 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2 transition-all ${
                    breakdownHighlight === currentMechanics.breakdown.parts.length
                      ? 'bg-teal-500 border-white text-slate-950 scale-110 shadow-lg shadow-teal-500/50'
                      : 'bg-teal-900/60 border-teal-500 text-teal-200'
                  }`}
                >
                  {currentMechanics.word}
                </button>
              </div>
            </div>

            <div className="flex space-x-3 overflow-x-auto py-2">
              {WORD_MECHANICS_LIST.map((w, idx) => {
                const isSel = idx === l6Idx;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      setL6Idx(idx);
                      speakBengali(w.soundSequence);
                    }}
                    className={`w-28 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                      isSel
                        ? 'bg-teal-600 border-white text-white shadow-lg scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-3xl">{w.iconSymbol}</span>
                    <span className="text-sm font-bold mt-1 truncate max-w-[100px]">
                      {w.word}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Level Quiz Trigger */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(6)}
            className="w-full py-4 bg-teal-600 hover:bg-teal-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-teal-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৬ এর পরীক্ষা ও ধাপ ৭ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 7: থিমভিত্তিক শব্দভাণ্ডার (Days 23-24: Nature, Family, Body, Actions)
  // -------------------------------------------------------------
  if (currentScreen === 7) {
    const filteredVocab = THEMATIC_VOCABULARY.filter((v) => v.category === l7Category);
    const item: ThematicWordItem = filteredVocab[l7Idx] || filteredVocab[0];

    const playCurrentL7 = () => {
      speakBengali(item.audioPrompt);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৭: শব্দভাণ্ডার</h1>
          <button
            onClick={playCurrentL7}
            className="w-12 h-12 rounded-2xl bg-sky-600 hover:bg-sky-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        {/* 4 Thematic Categories: Nature, Family, Body, Actions */}
        <div className="p-3 grid grid-cols-4 gap-1.5">
          <button
            onClick={() => {
              setL7Category('nature');
              setL7Idx(0);
              speakBengali('প্রকৃতি বিষয়ক শব্দভাণ্ডার');
            }}
            className={`py-2.5 rounded-2xl text-sm font-bold transition-all border-2 truncate px-1 text-center ${
              l7Category === 'nature'
                ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            🌳 প্রকৃতি
          </button>
          <button
            onClick={() => {
              setL7Category('family');
              setL7Idx(0);
              speakBengali('পরিবার বিষয়ক শব্দভাণ্ডার');
            }}
            className={`py-2.5 rounded-2xl text-sm font-bold transition-all border-2 truncate px-1 text-center ${
              l7Category === 'family'
                ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            👨‍👩‍👧 পরিবার
          </button>
          <button
            onClick={() => {
              setL7Category('body');
              setL7Idx(0);
              speakBengali('শরীরের অঙ্গ বিষয়ক শব্দভাণ্ডার');
            }}
            className={`py-2.5 rounded-2xl text-sm font-bold transition-all border-2 truncate px-1 text-center ${
              l7Category === 'body'
                ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            ✋ অঙ্গ
          </button>
          <button
            onClick={() => {
              setL7Category('action');
              setL7Idx(0);
              speakBengali('দৈনন্দিন কাজ বিষয়ক শব্দভাণ্ডার');
            }}
            className={`py-2.5 rounded-2xl text-sm font-bold transition-all border-2 truncate px-1 text-center ${
              l7Category === 'action'
                ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            🏃 কাজ
          </button>
        </div>

        {/* Word Display Hero (Minimalist: Emoji, Giant Word, Audio Button) */}
        <div className="px-4 py-2 flex-1 flex flex-col justify-between">
          <div
            onClick={playCurrentL7}
            className="w-full bg-gradient-to-b from-sky-950/90 to-slate-950 rounded-3xl border-3 border-sky-500/70 p-7 flex flex-col items-center justify-center shadow-2xl cursor-pointer active:scale-[0.99] transition-transform my-2"
          >
            <span className="text-8xl drop-shadow-md">{item.iconSymbol}</span>
            <div className="text-5xl font-extrabold text-white mt-4 tracking-wide">{item.word}</div>
            <div className="mt-5 w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-slate-950 shadow-lg shadow-sky-500/30">
              <Volume2 className="w-8 h-8" />
            </div>
          </div>

          {/* Meaning & More Words Bar */}
          <div className="flex space-x-2 my-2">
            <button
              onClick={() => {
                const nextIdx = (l7Idx + 1) % filteredVocab.length;
                setL7Idx(nextIdx);
                const nextW = filteredVocab[nextIdx];
                speakBengali(`${nextW.word}।`);
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-sky-300 shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>আরও শব্দ ({toBnDigit(filteredVocab.length)})</span>
            </button>
            <button
              onClick={() =>
                openWordMeaning(item.word, item.meaning, item.iconSymbol, item.breakdown)
              }
              className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>মানে 📖</span>
            </button>
          </div>

          {/* Word Breakdown for Thematic Word */}
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl my-2">
            <div className="flex items-center justify-between mb-2 bg-slate-800/80 px-3 py-2 rounded-2xl border border-slate-700">
              <span className="text-base font-bold text-slate-300">শব্দ ভাঙন শুনুন:</span>
              <button
                onClick={() =>
                  speakBengali(`${item.word}। ${item.breakdownAudio.join(' ')}`)
                }
                className="w-9 h-9 rounded-full bg-sky-400 flex items-center justify-center text-slate-950 font-bold"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 py-1">
              {item.breakdown.map((part, idx) => (
                <React.Fragment key={idx}>
                  <button
                    onClick={() => speakBengali(item.breakdownAudio[idx] || part)}
                    className="min-w-10 h-11 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95"
                  >
                    {part}
                  </button>
                  {idx < item.breakdown.length - 1 && (
                    <span className="text-lg font-bold text-slate-500">+</span>
                  )}
                </React.Fragment>
              ))}
              <span className="text-lg font-bold text-slate-500">=</span>
              <button
                onClick={playCurrentL7}
                className="min-w-12 h-11 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-sky-500 border-white text-slate-950"
              >
                {item.word}
              </button>
            </div>
          </div>

          {/* Horizontal Selector */}
          <div className="flex space-x-3 overflow-x-auto py-2">
            {filteredVocab.map((v, idx) => {
              const isSel = idx === l7Idx;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setL7Idx(idx);
                    speakBengali(v.audioPrompt);
                  }}
                  className={`w-24 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                    isSel
                      ? 'bg-sky-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-3xl">{v.iconSymbol}</span>
                  <span className="text-sm font-bold mt-1 truncate max-w-[85px]">
                    {v.word}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Quiz Trigger */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(7)}
            className="w-full py-4 bg-sky-600 hover:bg-sky-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-sky-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৭ এর পরীক্ষা ও ধাপ ৮ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 8: বাক্য গঠন (Days 25-26: Standard Sentences: Subject + Object + Verb)
  // User requested: আমি ভাত খাই, মাঠে গরু চরে, আকাশে পাখি ওড়ে, সে বই পড়ে।
  // Large "Play All" (Speaker Icon) for fluent reading.
  // -------------------------------------------------------------
  if (currentScreen === 8) {
    const sentenceItem: StandardSentenceItem =
      STANDARD_SENTENCES[l8Idx] || STANDARD_SENTENCES[0];

    const playSentenceFluidlyCustom = async (item: StandardSentenceItem) => {
      if (l8PlayingAll) return;
      setL8PlayingAll(true);

      for (let i = 0; i < item.words.length; i++) {
        setL8WordHighlight(i);
        speakBengali(item.wordsAudio[i] || item.words[i]);
        await new Promise((r) => setTimeout(r, 700));
      }

      setL8WordHighlight(-1);
      speakBengali(item.fullAudio);
      await new Promise((r) => setTimeout(r, 900));

      setL8PlayingAll(false);
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৮: বাক্য গঠন</h1>
          <button
            onClick={() => playSentenceFluidlyCustom(sentenceItem)}
            className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        {/* Hero Sentence Card (Minimalist: Emoji, Giant Text, Audio) */}
        <div className="px-4 pt-3">
          <div className="w-full bg-gradient-to-b from-indigo-950/90 to-slate-950 rounded-3xl border-3 border-indigo-500/70 p-7 flex flex-col items-center justify-center shadow-2xl my-2">
            <span className="text-8xl drop-shadow-md">{sentenceItem.iconSymbol}</span>
            <div className="text-4xl font-extrabold text-white mt-4 text-center tracking-wide leading-snug">
              {sentenceItem.sentenceText}
            </div>

            {/* Giant Play All Button */}
            <button
              onClick={() => playSentenceFluidlyCustom(sentenceItem)}
              disabled={l8PlayingAll}
              className={`mt-5 px-8 py-3.5 rounded-full flex items-center space-x-3 text-xl font-bold shadow-xl transition-transform ${
                l8PlayingAll
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white active:scale-95'
              }`}
            >
              <Volume2 className="w-7 h-7" />
              <span>{l8PlayingAll ? 'বাক্যটি পড়া হচ্ছে...' : 'উচ্চারণ শুনুন'}</span>
            </button>
          </div>
        </div>

        {/* Meaning & More Sentences Button Bar */}
        <div className="px-4 py-1 flex space-x-2 my-1">
          <button
            onClick={() => {
              const nextIdx = (l8Idx + 1) % STANDARD_SENTENCES.length;
              setL8Idx(nextIdx);
              setL8ActiveBreakdown(null);
              const nextS = STANDARD_SENTENCES[nextIdx];
              playSentenceFluidlyCustom(nextS);
            }}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base font-bold text-indigo-300 shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>পরের বাক্য ({toBnDigit(STANDARD_SENTENCES.length)})</span>
          </button>
          <button
            onClick={() =>
              openWordMeaning(
                sentenceItem.sentenceText,
                sentenceItem.meaning,
                sentenceItem.iconSymbol
              )
            }
            className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 active:scale-95 rounded-2xl flex items-center justify-center space-x-2 text-base font-extrabold text-amber-300 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>মানে 📖</span>
          </button>
        </div>

        {/* Clickable Word Chips for Word Breakdown */}
        <div className="px-4 py-2">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-4 shadow-xl text-center">
            <div className="text-slate-400 font-bold mb-3 text-sm">
              আলাদা শব্দে চাপ দিয়ে বিশ্লেষণ শুনুন:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {sentenceItem.words.map((w, idx) => {
                const cleanW = w.replace(/[।,!?]/g, '');
                const isLit = l8WordHighlight === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setL8WordHighlight(idx);
                      speakBengali(sentenceItem.wordsAudio[idx] || cleanW);
                      const bd = sentenceItem.wordBreakdowns[cleanW] || {
                        parts: curriculumRepository.getWordBreakdown(cleanW),
                        partsAudio: [cleanW],
                        meaning: 'শব্দের অর্থ',
                        icon: sentenceItem.iconSymbol,
                      };
                      setL8ActiveBreakdown({
                        word: cleanW,
                        parts: bd.parts,
                        partsAudio: bd.partsAudio,
                        icon: bd.icon,
                        meaning: bd.meaning,
                      });
                    }}
                    className={`px-5 py-3 rounded-2xl text-2xl font-extrabold border-2 transition-all active:scale-95 ${
                      isLit
                        ? 'bg-amber-400 border-white text-slate-950 scale-105 shadow-lg shadow-amber-400/50'
                        : 'bg-indigo-900/60 border-indigo-500 text-white hover:bg-indigo-800'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Word Breakdown drawer for clicked sentence word */}
        {l8ActiveBreakdown && (
          <div className="px-4 py-1">
            <div className="bg-slate-900 rounded-3xl border-2 border-amber-500/60 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{l8ActiveBreakdown.icon}</span>
                  <span className="text-2xl font-extrabold text-white">{l8ActiveBreakdown.word}</span>
                  <button
                    onClick={() =>
                      openWordMeaning(
                        l8ActiveBreakdown.word,
                        l8ActiveBreakdown.meaning,
                        l8ActiveBreakdown.icon,
                        l8ActiveBreakdown.parts
                      )
                    }
                    className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold active:scale-95"
                  >
                    মানে 📖
                  </button>
                </div>
                <button
                  onClick={() =>
                    speakBengali(
                      `${l8ActiveBreakdown.word}। ${l8ActiveBreakdown.partsAudio.join(' ')}`
                    )
                  }
                  className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                {l8ActiveBreakdown.parts.map((p, idx) => (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => speakBengali(l8ActiveBreakdown.partsAudio[idx] || p)}
                      className="min-w-10 h-11 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95"
                    >
                      {p}
                    </button>
                    {idx < l8ActiveBreakdown.parts.length - 1 && (
                      <span className="text-lg font-bold text-slate-500">+</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-lg font-bold text-slate-500">=</span>
                <button
                  onClick={() => speakBengali(l8ActiveBreakdown.word)}
                  className="min-w-12 h-11 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-amber-500 border-white text-slate-950"
                >
                  {l8ActiveBreakdown.word}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Sentence Selector */}
        <div className="p-4 flex-1">
          <div className="flex space-x-3 overflow-x-auto py-2">
            {STANDARD_SENTENCES.map((s, idx) => {
              const isSel = idx === l8Idx;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setL8Idx(idx);
                    setL8WordHighlight(-1);
                    setL8ActiveBreakdown(null);
                    playSentenceFluidlyCustom(s);
                  }}
                  className={`w-32 h-22 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all p-2 ${
                    isSel
                      ? 'bg-indigo-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-3xl">{s.iconSymbol}</span>
                  <span className="text-xs font-bold mt-1 text-center truncate max-w-[110px]">
                    {s.sentenceText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Quiz Trigger */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(8)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-indigo-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৮ এর পরীক্ষা ও ধাপ ৯ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 9: অনুচ্ছেদ পাঠ (Days 27-28: Paragraphs)
  // Small paragraphs: আমাদের গ্রাম, ভোরের সকাল, বর্ষার বৃষ্টি
  // Tap paragraph to read fluidly. Tap a word to break it down.
  // -------------------------------------------------------------
  if (currentScreen === 9) {
    const currentParagraph: ParagraphItem =
      PARAGRAPH_COLLECTION[l9Idx] || PARAGRAPH_COLLECTION[0];

    const playParagraphFluidlyCustom = async (sentences: string[]) => {
      if (l9PlayingAll) return;
      setL9PlayingAll(true);

      for (let i = 0; i < sentences.length; i++) {
        setL9SentenceHighlight(i);
        speakBengali(sentences[i]);
        await new Promise((r) => setTimeout(r, 1600));
      }

      setL9SentenceHighlight(-1);
      setL9PlayingAll(false);
    };

    const handleParagraphWordTap = (rawWord: string) => {
      const clean = rawWord.replace(/[।,!?]/g, '').trim();
      const entry = currentParagraph.wordsDict[clean];
      if (entry) {
        setL9ActiveBreakdown(entry);
        speakBengali(`${clean}। ${entry.partsAudio.join(' ')}`);
      } else {
        const bd = curriculumRepository.getWordBreakdown(clean);
        setL9ActiveBreakdown({
          word: clean,
          parts: bd,
          partsAudio: bd,
          fullAudio: clean,
          meaning: 'শব্দ',
          iconSymbol: currentParagraph.iconSymbol,
        });
        speakBengali(clean);
      }
    };

    // Extract all unique words from this paragraph for tapping
    const paragraphWords = Array.from(
      new Set(
        currentParagraph.sentences
          .join(' ')
          .split(' ')
          .map((w) => w.replace(/[।,!?]/g, '').trim())
          .filter(Boolean)
      )
    );

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
        {renderQuizModal()}
        {renderMeaningModal()}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setCurrentScreen(0)}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
            aria-label="মূল পাতা"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-white">ধাপ ৯: অনুচ্ছেদ পাঠ</h1>
          <button
            onClick={() => playParagraphFluidlyCustom(currentParagraph.sentences)}
            className="w-12 h-12 rounded-2xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shadow-lg active:scale-95"
            aria-label="উচ্চারণ শুনুন"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </header>

        {/* Paragraph Header with Giant Play All Button */}
        <div className="px-4 pt-3">
          <div className="w-full bg-gradient-to-b from-purple-950/90 to-slate-950 rounded-3xl border-3 border-purple-500/70 p-5 flex items-center space-x-4 shadow-2xl">
            <span className="text-6xl">{currentParagraph.iconSymbol}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white truncate">
                {currentParagraph.title}
              </h2>
              <p className="text-xs font-semibold text-purple-300">
                {currentParagraph.summary}
              </p>
            </div>
            <button
              onClick={() => playParagraphFluidlyCustom(currentParagraph.sentences)}
              disabled={l9PlayingAll}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                l9PlayingAll
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-purple-500 hover:bg-purple-400 text-white active:scale-95'
              }`}
              aria-label="পুরো অনুচ্ছেদ শুনুন"
            >
              <Volume2 className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Clickable Sentences List */}
        <div className="px-4 py-2 flex-1 overflow-y-auto space-y-3">
          <div className="space-y-2">
            {currentParagraph.sentences.map((sent, idx) => {
              const isLit = l9SentenceHighlight === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setL9SentenceHighlight(idx);
                    speakBengali(sent);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start space-x-3 active:scale-98 ${
                    isLit
                      ? 'bg-purple-600 border-white text-white shadow-xl shadow-purple-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="mt-1 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-lg font-bold leading-relaxed">{sent}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Word Breakdown Drawer for Clicked Paragraph Word */}
          {l9ActiveBreakdown && (
            <div className="bg-slate-900 rounded-3xl border-2 border-purple-500/60 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{l9ActiveBreakdown.iconSymbol}</span>
                  <span className="text-xl font-bold text-white">{l9ActiveBreakdown.word}</span>
                  <span className="text-xs text-purple-300">
                    ({l9ActiveBreakdown.meaning})
                  </span>
                </div>
                <button
                  onClick={() =>
                    speakBengali(
                      `${l9ActiveBreakdown.word}। ${l9ActiveBreakdown.partsAudio.join(' ')}`
                    )
                  }
                  className="w-9 h-9 rounded-full bg-purple-400 flex items-center justify-center text-slate-950 font-bold"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                {l9ActiveBreakdown.parts.map((p, idx) => (
                  <React.Fragment key={idx}>
                    <button
                      onClick={() => speakBengali(l9ActiveBreakdown.partsAudio[idx] || p)}
                      className="min-w-10 h-11 px-2.5 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95"
                    >
                      {p}
                    </button>
                    {idx < l9ActiveBreakdown.parts.length - 1 && (
                      <span className="text-lg font-bold text-slate-500">+</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-lg font-bold text-slate-500">=</span>
                <button
                  onClick={() => speakBengali(l9ActiveBreakdown.fullAudio)}
                  className="min-w-12 h-11 px-3 rounded-xl flex items-center justify-center text-xl font-extrabold border bg-purple-500 border-white text-white"
                >
                  {l9ActiveBreakdown.word}
                </button>
              </div>
            </div>
          )}

          {/* Interactive Word Chips from Paragraph */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>যেকোনো শব্দ ছুঁয়ে বিশ্লেষণ শুনুন:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {paragraphWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleParagraphWordTap(word)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-purple-900/60 border border-slate-700 text-base font-bold text-white transition-all active:scale-95"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Paragraph Selector */}
        <div className="p-3">
          <div className="flex space-x-3 overflow-x-auto py-1">
            {PARAGRAPH_COLLECTION.map((p, idx) => {
              const isSel = idx === l9Idx;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setL9Idx(idx);
                    setL9SentenceHighlight(-1);
                    setL9ActiveBreakdown(null);
                    playParagraphFluidlyCustom(p.sentences);
                  }}
                  className={`px-4 py-2.5 rounded-2xl flex items-center space-x-2 shrink-0 border-2 transition-all ${
                    isSel
                      ? 'bg-purple-600 border-white text-white shadow-lg scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-2xl">{p.iconSymbol}</span>
                  <span className="text-sm font-bold">{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Quiz Trigger */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <button
            onClick={() => triggerLevelQuiz(9)}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-purple-950/50"
          >
            <HelpCircle className="w-8 h-8" />
            <span>ধাপ ৯ এর পরীক্ষা ও ধাপ ১০ খুলুন</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LEVEL 10: সম্পূর্ণ গল্প (Days 29-30: Complete Moral Stories)
  // Story 1: "তৃষ্ণার্ত কাক" (The Thirsty Crow)
  // Story 2: "খরগোশ ও কচ্ছপ" (The Hare and the Tortoise)
  // Every single word mapped to CurriculumRepository.getWordBreakdown()!
  // -------------------------------------------------------------
  const currentStory: StoryItem = MORAL_STORIES[l10StoryIdx] || MORAL_STORIES[0];

  const playStoryAllCustom = useCallback(async () => {
    if (l10PlayingAll) return;
    setL10PlayingAll(true);
    speakBengali(currentStory.fullAudio);
    await new Promise((r) => setTimeout(r, 9000));
    setL10PlayingAll(false);
  }, [l10PlayingAll, currentStory.fullAudio, speakBengali]);

  const handleStoryWordTapCustom = useCallback((rawWord: string) => {
    const cleanWord = rawWord.replace(/[।,!?]/g, '').trim();
    const entry = currentStory.wordsDict?.[cleanWord];
    const dictMeaning = databaseService.getMeaning(cleanWord);
    if (entry) {
      setL10ActiveBreakdown({
        ...entry,
        meaning: dictMeaning || entry.meaning || 'প্রমিত বাংলা শব্দ',
      });
      speakBengali(`${cleanWord}। ${entry.partsAudio.join(' ')}`);
    } else {
      const parts =
        databaseService.getBreakdown(cleanWord) ||
        curriculumRepository.getWordBreakdown(cleanWord);
      setL10ActiveBreakdown({
        word: cleanWord,
        parts: parts,
        partsAudio: parts,
        fullAudio: cleanWord,
        meaning: dictMeaning || '১ প্রমিত বাংলা শব্দার্থ ও প্রামাণ্য ব্যাখ্যা।',
        iconSymbol: currentStory.iconSymbol,
      });
      speakBengali(cleanWord);
    }
  }, [currentStory, speakBengali]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between max-w-md mx-auto shadow-2xl select-none font-sans relative">
      {renderQuizModal()}
      {renderMeaningModal()}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => {
            cancelTTS();
            setCurrentScreen(0);
          }}
          className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-95"
          aria-label="মূল পাতা"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-2xl font-bold text-white">ধাপ ১০: সম্পূর্ণ গল্প</h1>
        <button
          onClick={playStoryAllCustom}
          className="w-12 h-12 rounded-2xl bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white shadow-lg active:scale-95"
          aria-label="উচ্চারণ শুনুন"
        >
          <Volume2 className="w-7 h-7" />
        </button>
      </header>

      {/* 10 Classic Story Selector (Horizontal Scrollable Tabs) */}
      <div className="px-4 pt-3 flex space-x-2.5 overflow-x-auto no-scrollbar py-2">
        {MORAL_STORIES.map((s, idx) => {
          const isSel = idx === l10StoryIdx;
          return (
            <button
              key={s.id}
              onClick={() => {
                cancelTTS();
                setL10StoryIdx(idx);
                setL10ActiveBreakdown(null);
                speakBengali(`${s.title}। ${s.moral}।`);
              }}
              className={`shrink-0 py-2.5 px-4 rounded-2xl font-bold text-sm transition-all border-2 flex items-center justify-center space-x-2 shadow-sm active:scale-95 ${
                isSel
                  ? 'bg-amber-600 border-amber-400 text-white shadow-lg scale-105'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{s.iconSymbol}</span>
              <span className="whitespace-nowrap">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {/* Memoized Story Card with Full Word Breakdown and Interactive Passage */}
        <StoryCard
          story={currentStory}
          isPlayingAll={l10PlayingAll}
          activeBreakdown={l10ActiveBreakdown}
          onPlayAll={playStoryAllCustom}
          onWordTap={handleStoryWordTapCustom}
          onMeaningClick={openWordMeaning}
          onSpeak={speakBengali}
        />

        {/* Final Course Completion Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-5 border border-emerald-500/40 text-center shadow-xl">
          <Trophy className="w-14 h-14 text-amber-300 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">অভিনন্দন!</h3>
          <p className="text-base text-emerald-200 mt-1">
            আপনি বাংলা পাঠশালার ৩০ দিনের পাঠ ও ১০টি ধাপের জ্ঞান অর্জন করেছেন!
          </p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
        <button
          onClick={() => triggerLevelQuiz(10)}
          className="w-full py-4 bg-amber-600 hover:bg-amber-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-2xl font-bold text-white shadow-xl shadow-amber-950/50"
        >
          <HelpCircle className="w-8 h-8" />
          <span>চূড়ান্ত মূল্যায়ন ও পরীক্ষা</span>
        </button>
        <button
          onClick={() => setCurrentScreen(0)}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-2xl flex items-center justify-center space-x-3 text-xl font-bold text-white shadow-xl shadow-emerald-950/50"
        >
          <CheckCircle className="w-7 h-7" />
          <span>মূল পাতায় ফিরে যান</span>
        </button>
      </div>
    </div>
  );
}
