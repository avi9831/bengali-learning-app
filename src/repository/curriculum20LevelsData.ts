// lib/repositories/curriculum20LevelsData.ts
// 20-Level Deep Curriculum Architecture for Bengali Learning
// Granular progression taking 1-2 months to master

import { LevelCurriculumItem, SubLessonItem, ExactWordExample, SubLessonQuiz } from '../models/curriculumModels';
import CURRICULUM_DATABASE from './curriculum_db.json';

export const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBnDigit20 = (num: number): string => {
  return String(num)
    .split('')
    .map((d) => BENGALI_NUMERALS[parseInt(d, 10)] ?? d)
    .join('');
};

const DICT_WORDS_MAP = ((CURRICULUM_DATABASE as any).all_words || {}) as Record<string, ExactWordExample>;

const enrichWord = (w: ExactWordExample): ExactWordExample => {
  const dictEntry = DICT_WORDS_MAP[w.word];
  return {
    ...w,
    meaning: w.meaning || dictEntry?.meaning || '১ প্রমিত বাংলা শব্দ ও অর্থ।',
    breakdown: w.breakdown || dictEntry?.breakdown || Array.from(w.word),
    ttsAudio: w.ttsAudio || w.word,
  };
};

// Sub-lesson generator helper
const makeSubLesson = (
  levelId: number,
  subIndex: number,
  title: string,
  summary: string,
  icon: string,
  focusKeys: string[],
  instructionAudio: string,
  words: ExactWordExample[],
  quiz?: SubLessonQuiz
): SubLessonItem => ({
  id: `lvl-${levelId}-sub-${subIndex}`,
  levelId,
  subIndex,
  subNumber: `পাঠ ${toBnDigit20(levelId)}.${toBnDigit20(subIndex)}`,
  title,
  summary,
  type: quiz ? 'quiz' : subIndex === 1 ? 'learn' : 'practice',
  targetMinutes: 4,
  isCompleted: false,
  isLocked: subIndex > 1,
  focusKeys,
  instructionAudio,
  icon,
  words: words.map(enrichWord),
  quiz,
});

// Comprehensive 20-Level Curriculum Definitions
export const TWENTY_LEVELS_METADATA: LevelCurriculumItem[] = [
  // 1-4: Granular breakdown of Alphabets
  {
    id: 1,
    bengaliNum: '১',
    title: 'স্বরবর্ণ',
    subtitle: '১১টি মৌলিক স্বরধ্বনি ও স্বরবর্ণ',
    category: 'alphabet',
    icon: '⭐',
    color: '#059669',
    description: 'অ থেকে ঔ পর্যন্ত ১১টি স্বরবর্ণের শুদ্ধ উচ্চারণ, ধ্বনি এবং শব্দগঠন শিখুন।',
    isUnlocked: true,
    isCompleted: false,
    sampleWords: [
      { word: 'অজগর', icon: '🐍', ttsAudio: 'অজগর', meaning: 'বড় সাপ' },
      { word: 'আম', icon: '🥭', ttsAudio: 'আম', meaning: 'মিষ্টি ফল' },
      { word: 'ইঁদুর', icon: '🐁', ttsAudio: 'ইঁদুর', meaning: 'ছোট প্রাণী' },
      { word: 'ঈগল', icon: '🦅', ttsAudio: 'ঈগল', meaning: 'শিকারি পাখি' },
      { word: 'উট', icon: '🐪', ttsAudio: 'উট', meaning: 'মরুভূমির প্রাণী' },
    ],
    subLessons: [
      makeSubLesson(1, 1, 'স্বরবর্ণের সূচনা: অ ও আ', 'অ ও আ এর রূপ এবং শব্দ চেনা', '🐍', ['অ', 'আ'], 'অ এবং আ উচ্চারণ করুন। অজগর ও আম।', [
        { word: 'অজগর', icon: '🐍', ttsAudio: 'অজগর' },
        { word: 'অলি', icon: '🐝', ttsAudio: 'অলি' },
        { word: 'অলঙ্কার', icon: '💍', ttsAudio: 'অলঙ্কার' },
        { word: 'আম', icon: '🥭', ttsAudio: 'আম' },
        { word: 'আকাশ', icon: '🌤️', ttsAudio: 'আকাশ' },
        { word: 'আলো', icon: '💡', ttsAudio: 'আলো' },
      ]),
      makeSubLesson(1, 2, 'হ্রস্ব ও দীর্ঘ ধ্বনি: ই ও ঈ', 'ইঁদুর, ইট, ঈগল ও ঈদের শব্দাবলী', '🦅', ['ই', 'ঈ'], 'হ্রস্ব ই ও দীর্ঘ ঈ এর পার্থক্য শুনুন।', [
        { word: 'ইঁদুর', icon: '🐁', ttsAudio: 'ইঁদুর' },
        { word: 'ইট', icon: '🧱', ttsAudio: 'ইট' },
        { word: 'ইলিশ', icon: '🐟', ttsAudio: 'ইলিশ' },
        { word: 'ঈগল', icon: '🦅', ttsAudio: 'ঈগল' },
        { word: 'ঈদ', icon: '🌙', ttsAudio: 'ঈদ' },
        { word: 'ঈশ্বর', icon: '✨', ttsAudio: 'ঈশ্বর' },
      ]),
      makeSubLesson(1, 3, 'ওষ্ঠ্য ধ্বনি: উ, ঊ ও ঋ', 'উট, ঊর্মি ও ঋষির সঠিক উচ্চারণ', '🐪', ['উ', 'ঊ', 'ঋ'], 'উ, ঊ এবং ঋ এর উচ্চারণ অনুশীলন করুন।', [
        { word: 'উট', icon: '🐪', ttsAudio: 'উট' },
        { word: 'উপহার', icon: '🎁', ttsAudio: 'উপহার' },
        { word: 'উজ্জ্বল', icon: '☀️', ttsAudio: 'উজ্জ্বল' },
        { word: 'ঊর্মি', icon: '🌊', ttsAudio: 'ঊর্মি' },
        { word: 'ঊষা', icon: '🌄', ttsAudio: 'ঊষা' },
        { word: 'ঋষি', icon: '🧘', ttsAudio: 'ঋষি' },
        { word: 'ঋতু', icon: '🌦️', ttsAudio: 'ঋতু' },
      ]),
      makeSubLesson(1, 4, 'কণ্ঠ্য-তালব্য বর্ণ: এ ও ঐ', 'একতারা, একতা ও ঐরাবতের শব্দ', '🪕', ['এ', 'ঐ'], 'এ এবং ঐ এর ধ্বনি শুনুন।', [
        { word: 'একতারা', icon: '🪕', ttsAudio: 'একতারা' },
        { word: 'এলাচ', icon: '🌿', ttsAudio: 'এলাচ' },
        { word: 'একতা', icon: '🤝', ttsAudio: 'একতা' },
        { word: 'ঐরাবত', icon: '🐘', ttsAudio: 'ঐরাবত' },
        { word: 'ঐক্য', icon: '👥', ttsAudio: 'ঐক্য' },
      ]),
      makeSubLesson(1, 5, 'কণ্ঠৌষ্ঠ্য বর্ণ: ও ও ঔ', 'ওলকপি, ওজন ও ঔষধের শব্দাবলী', '💊', ['ও', 'ঔ'], 'ও এবং ঔ স্পষ্ট করে উচ্চারণ করুন।', [
        { word: 'ওলকপি', icon: '🥬', ttsAudio: 'ওলকপি' },
        { word: 'ওজন', icon: '⚖️', ttsAudio: 'ওজন' },
        { word: 'ওড়না', icon: '🧣', ttsAudio: 'ওড়না' },
        { word: 'ঔষধ', icon: '💊', ttsAudio: 'ঔষধ' },
        { word: 'ঔদার্য', icon: '❤️', ttsAudio: 'ঔদার্য' },
      ]),
      makeSubLesson(1, 6, 'স্বরবর্ণ পুনরাবৃত্তি ও শব্দ মেলানো', '১১টি স্বরবর্ণের দ্রুত পঠন দক্ষতা', '🔄', ['অ', 'আ', 'ই', 'ঈ', 'উ'], 'সবগুলো স্বরবর্ণ একসাথে অনুশীলন করুন।', [
        { word: 'অমর', icon: '⭐', ttsAudio: 'অমর' },
        { word: 'আনন্দ', icon: '😊', ttsAudio: 'আনন্দ' },
        { word: 'উপকার', icon: '🤲', ttsAudio: 'উপকার' },
        { word: 'একক', icon: '🎯', ttsAudio: 'একক' },
      ]),
      makeSubLesson(1, 7, 'ধাপ ১ কুইজ: স্বরবর্ণ পরীক্ষা', 'ছবি দেখে সঠিক স্বরবর্ণ চিহ্নিতকরণ', '🏆', ['অ', 'আম', 'ঈগল'], 'ছবি দেখে সঠিক বর্ণে চাপ দিন।', [], {
        audioPrompt: "কোনটি 'আম'? সুস্বাদু আমের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'আম', iconSymbol: '🥭', isCorrect: true },
          { id: 'q2', displayText: 'অজগর', iconSymbol: '🐍', isCorrect: false },
          { id: 'q3', displayText: 'ইঁদুর', iconSymbol: '🐁', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 2,
    bengaliNum: '২',
    title: 'ব্যঞ্জনবর্ণ: প্রথম ভাগ',
    subtitle: 'ক-বর্গ ও চ-বর্গ (১০টি বর্ণ)',
    category: 'alphabet',
    icon: '🦅',
    color: '#0D9488',
    description: 'ক, খ, গ, ঘ, ঙ এবং চ, ছ, জ, ঝ, ঞ এর নিখুঁত উচ্চারণ ও সঠিক শব্দ সংযোগ।',
    sampleWords: [
      { word: 'কাক', icon: '🦅', ttsAudio: 'কাক' },
      { word: 'খরগোশ', icon: '🐇', ttsAudio: 'খরগোশ' },
      { word: 'গরু', icon: '🐄', ttsAudio: 'গরু' },
      { word: 'ঘাস', icon: '🌱', ttsAudio: 'ঘাস' },
      { word: 'চাবি', icon: '🔑', ttsAudio: 'চাবি' },
    ],
    subLessons: [
      makeSubLesson(2, 1, 'ক ও খ এর ধ্বনি অনুশীলন', 'কাক, কলম, কলা ও খরগোশ', '🦅', ['ক', 'খ'], 'ক এবং খ দিয়ে তৈরি শব্দ শুনুন।', [
        { word: 'কাক', icon: '🦅', ttsAudio: 'কাক' },
        { word: 'কলম', icon: '✒️', ttsAudio: 'কলম' },
        { word: 'কলা', icon: '🍌', ttsAudio: 'কলা' },
        { word: 'খরগোশ', icon: '🐇', ttsAudio: 'খরগোশ' },
        { word: 'খাতা', icon: '📓', ttsAudio: 'খাতা' },
        { word: 'খাবার', icon: '🍲', ttsAudio: 'খাবার' },
      ]),
      makeSubLesson(2, 2, 'গ, ঘ ও ঙ এর সঠিক শব্দ', 'গরু, গাছ, গান, ঘড়ি ও ব্যাঙ', '🐄', ['গ', 'ঘ', 'ঙ'], 'গ ও ঘ এর শব্দ শুনুন। গ দিয়ে গরু, ঘ দিয়ে ঘড়ি।', [
        { word: 'গরু', icon: '🐄', ttsAudio: 'গরু' },
        { word: 'গাছ', icon: '🌳', ttsAudio: 'গাছ' },
        { word: 'গান', icon: '🎶', ttsAudio: 'গান' },
        { word: 'ঘড়ি', icon: '⏰', ttsAudio: 'ঘড়ি' },
        { word: 'ঘাস', icon: '🌱', ttsAudio: 'ঘাস' },
        { word: 'ব্যাঙ', icon: '🐸', ttsAudio: 'ব্যাঙ' },
      ]),
      makeSubLesson(2, 3, 'তালব্য চ ও ছ এর শব্দ', 'চাবি, চা, চাদর ও ছাতা', '☂️', ['চ', 'ছ'], 'চ এবং ছ স্পষ্ট উচ্চারণে পড়ুন।', [
        { word: 'চাবি', icon: '🔑', ttsAudio: 'চাবি' },
        { word: 'চা', icon: '☕', ttsAudio: 'চা' },
        { word: 'চাদর', icon: '🛏️', ttsAudio: 'চাদর' },
        { word: 'ছাতা', icon: '☂️', ttsAudio: 'ছাতা' },
        { word: 'ছাত্র', icon: '🎒', ttsAudio: 'ছাত্র' },
        { word: 'ছাগল', icon: '🐐', ttsAudio: 'ছাগল' },
      ]),
      makeSubLesson(2, 4, 'জ, ঝ ও ঞ এর শব্দ', 'জাহাজ, জাম, ঝাড়ু ও ঝাল', '🚢', ['জ', 'ঝ', 'ঞ'], 'জ ও ঝ এর উচ্চারণ শুনুন।', [
        { word: 'জাহাজ', icon: '🚢', ttsAudio: 'জাহাজ' },
        { word: 'জাম', icon: '🫐', ttsAudio: 'জাম' },
        { word: 'জাল', icon: '🕸️', ttsAudio: 'জাল' },
        { word: 'ঝাড়ু', icon: '🧹', ttsAudio: 'ঝাড়ু' },
        { word: 'ঝাল', icon: '🌶️', ttsAudio: 'ঝাল' },
        { word: 'ঝরণা', icon: '🏞️', ttsAudio: 'ঝরণা' },
      ]),
      makeSubLesson(2, 5, 'ক-বর্গ ও চ-বর্গ দ্রুত পাঠ', '১০টি বর্ণের উচ্চারণ ও শব্দ মেলানো', '📖', ['ক', 'গ', 'চ', 'জ'], 'বর্ণ দেখে দ্রুত শব্দ বলুন।', [
        { word: 'কমলা', icon: '🍊', ttsAudio: 'কমলা' },
        { word: 'গাড়ি', icon: '🚗', ttsAudio: 'গাড়ি' },
        { word: 'চোখ', icon: '👁️', ttsAudio: 'চোখ' },
        { word: 'ঝুড়ি', icon: '🧺', ttsAudio: 'ঝুড়ি' },
      ]),
      makeSubLesson(2, 6, 'ছবি দেখে বর্গীয় বর্ণ বাছাই', 'ছবি ও শব্দের গভীর সম্পর্ক আবিষ্কার', '🔍', ['ক', 'খ', 'গ'], 'ছবির সাথে বর্ণ মিলিয়ে উচ্চারণ শুনুন।', [
        { word: 'কাকাতুয়া', icon: '🦜', ttsAudio: 'কাকাতুয়া' },
        { word: 'খাঁচা', icon: '🪤', ttsAudio: 'খাঁচা' },
        { word: 'গোলাপ', icon: '🌹', ttsAudio: 'গোলাপ' },
      ]),
      makeSubLesson(2, 7, 'ধাপ ২ কুইজ: ক ও চ বর্গ পরীক্ষা', 'সঠিক ব্যঞ্জনবর্ণ নির্বাচন ও ধাপ ৩ খোলা', '🏆', ['গরু', 'ছাতা'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "ঘাসের ওপর দাঁড়িয়ে থাকা 'গরু' কোনটি? গরুর ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'গরু', iconSymbol: '🐄', isCorrect: true },
          { id: 'q2', displayText: 'ছাতা', iconSymbol: '☂️', isCorrect: false },
          { id: 'q3', displayText: 'জাহাজ', iconSymbol: '🚢', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 3,
    bengaliNum: '৩',
    title: 'ব্যঞ্জনবর্ণ: দ্বিতীয় ভাগ',
    subtitle: 'ট-বর্গ ও ত-বর্গ (১০টি বর্ণ)',
    category: 'alphabet',
    icon: '🍅',
    color: '#0284C7',
    description: 'ট, ঠ, ড, ঢ, ণ এবং ত, থ, দ, ধ, ন এর সঠিক উচ্চারণ ও মূর্ধন্য-দন্ত্য পার্থক্য।',
    sampleWords: [
      { word: 'টাকা', icon: '💵', ttsAudio: 'টাকা' },
      { word: 'ঠান্ডা', icon: '🧊', ttsAudio: 'ঠান্ডা' },
      { word: 'ডাল', icon: '🥣', ttsAudio: 'ডাল' },
      { word: 'হরিণ', icon: '🦌', ttsAudio: 'হরিণ' },
      { word: 'তালা', icon: '🔒', ttsAudio: 'তালা' },
    ],
    subLessons: [
      makeSubLesson(3, 1, 'মূর্ধন্য ট ও ঠ ধ্বনি', 'টাকা, টমেটো, টুপি ও ঠান্ডা', '🍅', ['ট', 'ঠ'], 'ট ও ঠ এর মূর্ধন্য উচ্চারণ শুনুন।', [
        { word: 'টাকা', icon: '💵', ttsAudio: 'টাকা' },
        { word: 'টমেটো', icon: '🍅', ttsAudio: 'টমেটো' },
        { word: 'টুপি', icon: '🧢', ttsAudio: 'টুপি' },
        { word: 'ঠান্ডা', icon: '🧊', ttsAudio: 'ঠান্ডা' },
        { word: 'ঠাকুর', icon: '👴', ttsAudio: 'ঠাকুর' },
      ]),
      makeSubLesson(3, 2, 'ড, ঢ ও ণ এর শব্দ', 'ডাল, ঢাক ও হরিণের মূর্ধন্য ণ', '🦌', ['ড', 'ঢ', 'ণ'], 'ড, ঢ ও ণ শুনুন। হরিণ ও বীণায় মূর্ধন্য ণ।', [
        { word: 'ডাল', icon: '🥣', ttsAudio: 'ডাল' },
        { word: 'ডাক্তার', icon: '🩺', ttsAudio: 'ডাক্তার' },
        { word: 'ঢাক', icon: '🥁', ttsAudio: 'ঢাক' },
        { word: 'হরিণ', icon: '🦌', ttsAudio: 'হরিণ' },
        { word: 'বীণা', icon: '🪕', ttsAudio: 'বীণা' },
        { word: 'লবণ', icon: '🧂', ttsAudio: 'লবণ' },
      ]),
      makeSubLesson(3, 3, 'দন্ত্য ত ও থ ধ্বনি', 'তালা, তারা, তাল ও থালা', '⭐', ['ত', 'থ'], 'ত এবং থ দিয়ে তৈরি শব্দ পড়ুন।', [
        { word: 'তালা', icon: '🔒', ttsAudio: 'তালা' },
        { word: 'তারা', icon: '⭐', ttsAudio: 'তারা' },
        { word: 'তাল', icon: '🌴', ttsAudio: 'তাল' },
        { word: 'থালা', icon: '🍽️', ttsAudio: 'থালা' },
        { word: 'থলে', icon: '🛍️', ttsAudio: 'থলে' },
      ]),
      makeSubLesson(3, 4, 'দ, ধ ও দন্ত্য ন এর শব্দ', 'দই, দোয়েল, ধান ও নদী', '🌊', ['দ', 'ধ', 'ন'], 'দ, ধ ও ন এর শুদ্ধ উচ্চারণ শুনুন।', [
        { word: 'দই', icon: '🥣', ttsAudio: 'দই' },
        { word: 'দোয়েল', icon: '🐦', ttsAudio: 'দোয়েল' },
        { word: 'ধান', icon: '🌾', ttsAudio: 'ধান' },
        { word: 'নদী', icon: '🌊', ttsAudio: 'নদী' },
        { word: 'নৌকা', icon: '⛵', ttsAudio: 'নৌকা' },
        { word: 'নাক', icon: '👃', ttsAudio: 'নাক' },
      ]),
      makeSubLesson(3, 5, 'ণ ও ন এর পার্থক্য ও নির্ভুল পাঠ', 'হরিণ ও নদী, লবণ ও নৌকা', '⚖️', ['ণ', 'ন'], 'মূর্ধন্য ণ ও দন্ত্য ন এর পার্থক্য লক্ষ্য করুন।', [
        { word: 'হরিণ', icon: '🦌', ttsAudio: 'হরিণ' },
        { word: 'বীণা', icon: '🪕', ttsAudio: 'বীণা' },
        { word: 'নদী', icon: '🌊', ttsAudio: 'নদী' },
        { word: 'নয়ন', icon: '👁️', ttsAudio: 'নয়ন' },
      ]),
      makeSubLesson(3, 6, 'ট ও ত বর্গের মিশ্র অনুশীলন', '১০টি বর্ণের দ্রুত শনাক্তকরণ', '📝', ['ট', 'ড', 'ত', 'দ'], 'ট-বর্গ ও ত-বর্গের শব্দ দ্রুত পাঠ করুন।', [
        { word: 'টব', icon: '🪴', ttsAudio: 'টব' },
        { word: 'ডালিম', icon: '🍎', ttsAudio: 'ডালিম' },
        { word: 'তীর', icon: '🏹', ttsAudio: 'তীর' },
        { word: 'ধনুক', icon: '🏹', ttsAudio: 'ধনুক' },
      ]),
      makeSubLesson(3, 7, 'ধাপ ৩ কুইজ: ট ও ত বর্গ পরীক্ষা', 'ছবি দেখে সঠিক ধ্বনি চিহ্নিতকরণ', '🏆', ['হরিণ', 'নদী'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "বনের সুন্দর প্রাণী 'হরিণ' কোনটি? হরিণের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'হরিণ', iconSymbol: '🦌', isCorrect: true },
          { id: 'q2', displayText: 'টাকা', iconSymbol: '💵', isCorrect: false },
          { id: 'q3', displayText: 'তালা', iconSymbol: '🔒', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 4,
    bengaliNum: '৪',
    title: 'ব্যঞ্জনবর্ণ: তৃতীয় ভাগ',
    subtitle: 'প-বর্গ, অন্তস্থ ও উষ্ম বর্ণ (১৯টি বর্ণ)',
    category: 'alphabet',
    icon: '🌸',
    color: '#6366F1',
    description: 'প থেকে ঁ পর্যন্ত অবশিষ্ট বর্ণমালার সম্পূর্ণ পাঠ ও পূর্ণ বর্ণমালা আয়ত্তকরণ।',
    sampleWords: [
      { word: 'পাতা', icon: '🍃', ttsAudio: 'পাতা' },
      { word: 'ফুল', icon: '🌸', ttsAudio: 'ফুল' },
      { word: 'বই', icon: '📖', ttsAudio: 'বই' },
      { word: 'সিংহ', icon: '🦁', ttsAudio: 'সিংহ' },
      { word: 'চাঁদ', icon: '🌙', ttsAudio: 'চাঁদ' },
    ],
    subLessons: [
      makeSubLesson(4, 1, 'ওষ্ঠ্য প-বর্গ: প, ফ, ব, ভ, ম', 'পাতা, পাখি, ফুল, ফল, বই ও মাছ', '🌸', ['প', 'ফ', 'ব', 'ভ', 'ম'], 'প-বর্গের ধ্বনি শুনুন।', [
        { word: 'পাতা', icon: '🍃', ttsAudio: 'পাতা' },
        { word: 'পাখি', icon: '🐦', ttsAudio: 'পাখি' },
        { word: 'ফুল', icon: '🌸', ttsAudio: 'ফুল' },
        { word: 'ফল', icon: '🍎', ttsAudio: 'ফল' },
        { word: 'বই', icon: '📖', ttsAudio: 'বই' },
        { word: 'বাঘ', icon: '🐅', ttsAudio: 'বাঘ' },
        { word: 'মাছ', icon: '🐟', ttsAudio: 'মাছ' },
      ]),
      makeSubLesson(4, 2, 'অন্তঃস্থ বর্ণ: য, র, ল, ব, য়', 'যব, রথ, রাজা, লাল ও লতা', '👑', ['য', 'র', 'ল', 'য়'], 'অন্তঃস্থ বর্ণগুলির ধ্বনি স্পষ্ট করুন।', [
        { word: 'যব', icon: '🌾', ttsAudio: 'যব' },
        { word: 'রথ', icon: '🛞', ttsAudio: 'রথ' },
        { word: 'রাজা', icon: '👑', ttsAudio: 'রাজা' },
        { word: 'লাল', icon: '🔴', ttsAudio: 'লাল' },
        { word: 'লতা', icon: '🌿', ttsAudio: 'লতা' },
        { word: 'পায়রা', icon: '🕊️', ttsAudio: 'পায়রা' },
      ]),
      makeSubLesson(4, 3, 'উষ্ম ও মহাপ্রাণ বর্ণ: শ, ষ, স, হ', 'শাপলা, ষাঁড়, সূর্য ও হাতি', '🦁', ['শ', 'ষ', 'স', 'হ'], 'শ, ষ, স ও হ এর উচ্চারণ শুনুন।', [
        { word: 'শাপলা', icon: '🪷', ttsAudio: 'শাপলা' },
        { word: 'ষাঁড়', icon: '🐂', ttsAudio: 'ষাঁড়' },
        { word: 'সূর্য', icon: '☀️', ttsAudio: 'সূর্য' },
        { word: 'সিংহ', icon: '🦁', ttsAudio: 'সিংহ' },
        { word: 'হাতি', icon: '🐘', ttsAudio: 'হাতি' },
      ]),
      makeSubLesson(4, 4, 'তাড়নজাত ও খণ্ডবর্ণ: ড়, ঢ়, ৎ, ং, ঃ, ঁ', 'গাড়ি, আষাঢ়, শরৎ, সিংহ ও চাঁদ', '🌙', ['ড়', 'ঢ়', 'ৎ', 'ং', 'ঃ', 'ঁ'], 'বিশেষ বর্ণ ও চন্দ্রবিন্দুর নাসিক্য রূপ শুনুন।', [
        { word: 'গাড়ি', icon: '🚗', ttsAudio: 'গাড়ি' },
        { word: 'আষাঢ়', icon: '🌧️', ttsAudio: 'আষাঢ়' },
        { word: 'শরৎ', icon: '🌾', ttsAudio: 'শরৎ' },
        { word: 'রং', icon: '🎨', ttsAudio: 'রং' },
        { word: 'দুঃখ', icon: '😢', ttsAudio: 'দুঃখ' },
        { word: 'চাঁদ', icon: '🌙', ttsAudio: 'চাঁদ' },
      ]),
      makeSubLesson(4, 5, 'সম্পূর্ণ বর্ণমালা দ্রুত পাঠ', 'স্বরবর্ণ ও ব্যঞ্জনবর্ণের সম্মিলিত রূপ', '📚', ['প', 'শ', 'হ', 'ড়'], 'সব বর্ণ মিলিয়ে দ্রুত পড়ার অভ্যাস করুন।', [
        { word: 'পতাকা', icon: '🇧🇩', ttsAudio: 'পতাকা' },
        { word: 'শালিক', icon: '🐦', ttsAudio: 'শালিক' },
        { word: 'হাঁস', icon: '🦆', ttsAudio: 'হাঁস' },
      ]),
      makeSubLesson(4, 6, 'শব্দ বিশ্লেষণ ও বর্ণ পৃথকীকরণ', 'বর্ণ আলাদা করে শব্দ চেনা', '🧩', ['ব', 'ই', 'ফ', 'ল'], 'প্রতিটি বর্ণের অবস্থান লক্ষ্য করুন।', [
        { word: 'বই', icon: '📖', ttsAudio: 'বই' },
        { word: 'ফল', icon: '🍎', ttsAudio: 'ফল' },
        { word: 'মই', icon: '🪜', ttsAudio: 'মই' },
      ]),
      makeSubLesson(4, 7, 'ধাপ ৪ কুইজ: ব্যঞ্জনবর্ণ পরীক্ষা', 'ছবি দেখে সঠিক উত্তর ও ধাপ ৫ খোলা', '🏆', ['সিংহ', 'চাঁদ'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "বনের রাজা 'সিংহ' কোনটি? সিংহের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'সিংহ', iconSymbol: '🦁', isCorrect: true },
          { id: 'q2', displayText: 'চাঁদ', iconSymbol: '🌙', isCorrect: false },
          { id: 'q3', displayText: 'পাতা', iconSymbol: '🍃', isCorrect: false },
        ],
      }),
    ],
  },

  // Levels 5-8: Deep dive into Kar signs
  {
    id: 5,
    bengaliNum: '৫',
    title: 'হ্রস্ব স্বরধ্বনি কার',
    subtitle: 'আ-কার (া), ই-কার (ি), উ-কার (ু)',
    category: 'kar',
    icon: '✨',
    color: '#8B5CF6',
    description: 'সর্বাধিক ব্যবহৃত তিনটি মৌলিক কার চিহ্নের সংযোগ ও শব্দ গঠন।',
    sampleWords: [
      { word: 'কাক', icon: '🦅', ttsAudio: 'কাক' },
      { word: 'ডিম', icon: '🥚', ttsAudio: 'ডিম' },
      { word: 'ফুল', icon: '🌸', ttsAudio: 'ফুল' },
      { word: 'পাখি', icon: '🐦', ttsAudio: 'পাখি' },
    ],
    subLessons: [
      makeSubLesson(5, 1, 'আ-কার (া) রূপ ও শব্দ', 'কাক, খাতা, গান, ঘাস ও ছাতা', '🦅', ['া'], 'আ-কার যোগে শব্দ শুনুন। ক যোগ আ-কার সমান কা, কাক।', [
        { word: 'কাক', icon: '🦅', ttsAudio: 'কাক' },
        { word: 'খাতা', icon: '📓', ttsAudio: 'খাতা' },
        { word: 'গান', icon: '🎶', ttsAudio: 'গান' },
        { word: 'ঘাস', icon: '🌱', ttsAudio: 'ঘাস' },
        { word: 'ছাতা', icon: '☂️', ttsAudio: 'ছাতা' },
      ]),
      makeSubLesson(5, 2, 'ই-কার (ি) রূপ ও শব্দ', 'ডিম, পাখি, রবি, কবি ও চিঠি', '🥚', ['ি'], 'হ্রস্ব ই-কার যোগে শব্দ শুনুন। ড যোগ ই-কার সমান ডি, ডিম।', [
        { word: 'ডিম', icon: '🥚', ttsAudio: 'ডিম' },
        { word: 'পাখি', icon: '🐦', ttsAudio: 'পাখি' },
        { word: 'রবি', icon: '☀️', ttsAudio: 'রবি' },
        { word: 'কবি', icon: '✍️', ttsAudio: 'কবি' },
        { word: 'চিঠি', icon: '✉️', ttsAudio: 'চিঠি' },
      ]),
      makeSubLesson(5, 3, 'উ-কার (ু) রূপ ও শব্দ', 'ফুল, ঘুড়ি, দুধ, মুখ ও কুকুর', '🌸', ['ু'], 'হ্রস্ব উ-কার যোগে শব্দ শুনুন। ফ যোগ উ-কার সমান ফু, ফুল।', [
        { word: 'ফুল', icon: '🌸', ttsAudio: 'ফুল' },
        { word: 'ঘুড়ি', icon: '🪁', ttsAudio: 'ঘুড়ি' },
        { word: 'দুধ', icon: '🥛', ttsAudio: 'দুধ' },
        { word: 'পুতুল', icon: '🪆', ttsAudio: 'পুতুল' },
      ]),
      makeSubLesson(5, 4, 'আ, ই, উ-কার মিশ্রিত শব্দ', 'বাড়ি, গাড়ি, জামা, চুড়ি ও খুকু', '🚗', ['া', 'ি', 'ু'], 'মিশ্র কারের শব্দ পড়ুন। বাড়ি ও গাড়ি।', [
        { word: 'বাড়ি', icon: '🏠', ttsAudio: 'বাড়ি' },
        { word: 'গাড়ি', icon: '🚗', ttsAudio: 'গাড়ি' },
        { word: 'চুড়ি', icon: '💍', ttsAudio: 'চুড়ি' },
        { word: 'পুতুল', icon: '🪆', ttsAudio: 'পুতুল' },
      ]),
      makeSubLesson(5, 5, 'শব্দ ভেঙে কার চিহ্নিতকরণ', 'ক + া = কা, প + ি = পি', '🧩', ['া', 'ি'], 'বর্ণের সঙ্গে কার মিলিয়ে শব্দ তৈরি করুন।', [
        { word: 'পান', icon: '🍃', ttsAudio: 'পান' },
        { word: 'পিপীলিকা', icon: '🐜', ttsAudio: 'পিপীলিকা' },
      ]),
      makeSubLesson(5, 6, 'কারযুক্ত শব্দ দ্রুত পঠন', '১০টি বাছাই করা সহজ কারযুক্ত শব্দ', '⚡', ['া', 'ু'], 'দ্রুত উচ্চারণ করুন।', [
        { word: 'খাতা', icon: '📓', ttsAudio: 'খাতা' },
        { word: 'মাটি', icon: '🪴', ttsAudio: 'মাটি' },
      ]),
      makeSubLesson(5, 7, 'ধাপ ৫ কুইজ: হ্রস্ব কার পরীক্ষা', 'ছবি দেখে সঠিক কারযুক্ত শব্দ নির্বাচন', '🏆', ['ফুল', 'ডিম'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "বাগানের সুন্দর 'ফুল' কোনটি? ফুলের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'ফুল', iconSymbol: '🌸', isCorrect: true },
          { id: 'q2', displayText: 'ডিম', iconSymbol: '🥚', isCorrect: false },
          { id: 'q3', displayText: 'কাক', iconSymbol: '🦅', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 6,
    bengaliNum: '৬',
    title: 'দীর্ঘ স্বর ও ঋ কার',
    subtitle: 'ঈ-কার (ী), ঊ-কার (ূ), ঋ-কার (ৃ)',
    category: 'kar',
    icon: '🌊',
    color: '#A855F7',
    description: 'নদী, তীর, সূর্য, ময়ূর, গৃহ, কৃষক প্রভৃতি দীর্ঘ ও গম্ভীর ধ্বনির শব্দপাঠ।',
    sampleWords: [
      { word: 'নদী', icon: '🌊', ttsAudio: 'নদী' },
      { word: 'তীর', icon: '🏹', ttsAudio: 'তীর' },
      { word: 'সূর্য', icon: '☀️', ttsAudio: 'সূর্য' },
      { word: 'কৃষক', icon: '🌾', ttsAudio: 'কৃষক' },
    ],
    subLessons: [
      makeSubLesson(6, 1, 'ঈ-কার (ী) রূপ ও শব্দ', 'নদী, তীর, নীল, শীত ও গীত', '🌊', ['ী'], 'দীর্ঘ ঈ-কার যোগে শব্দ শুনুন। ন যোগ ঈ-কার যোগ দ সমান নদী।', [
        { word: 'নদী', icon: '🌊', ttsAudio: 'নদী' },
        { word: 'তীর', icon: '🏹', ttsAudio: 'তীর' },
        { word: 'নীল', icon: '🔷', ttsAudio: 'নীল' },
        { word: 'শীত', icon: '❄️', ttsAudio: 'শীত' },
        { word: 'গীত', icon: '🎵', ttsAudio: 'গীত' },
      ]),
      makeSubLesson(6, 2, 'ঊ-কার (ূ) রূপ ও শব্দ', 'সূর্য, ময়ূর, কূপ, দূর ও রূপ', '🦚', ['ূ'], 'দীর্ঘ ঊ-কার যোগে শব্দ শুনুন। সূর্য ও ময়ূর।', [
        { word: 'সূর্য', icon: '☀️', ttsAudio: 'সূর্য' },
        { word: 'ময়ূর', icon: '🦚', ttsAudio: 'ময়ূর' },
        { word: 'কূপ', icon: '🪣', ttsAudio: 'কূপ' },
        { word: 'দূর', icon: '🔭', ttsAudio: 'দূর' },
      ]),
      makeSubLesson(6, 3, 'ঋ-কার (ৃ) রূপ ও শব্দ', 'গৃহ, মৃগ, কৃষক, বৃষ্টি ও তৃণ', '🏡', ['ৃ'], 'ঋ-কার যোগে শব্দ শুনুন। গ যোগ ঋ-কার সমান গৃহ।', [
        { word: 'গৃহ', icon: '🏡', ttsAudio: 'গৃহ' },
        { word: 'মৃগ', icon: '🦌', ttsAudio: 'মৃগ' },
        { word: 'কৃষক', icon: '🌾', ttsAudio: 'কৃষক' },
        { word: 'বৃষ্টি', icon: '🌧️', ttsAudio: 'বৃষ্টি' },
        { word: 'তৃণ', icon: '🌱', ttsAudio: 'তৃণ' },
      ]),
      makeSubLesson(6, 4, 'হ্রস্ব ও দীর্ঘ কারের তুলনা', 'দিন বনাম দীন, কুল বনাম কূল', '⚖️', ['ি', 'ী', 'ু', 'ূ'], 'হ্রস্ব ও দীর্ঘ কারের সূক্ষ্ম পার্থক্য বুঝুন।', [
        { word: 'দিন', icon: '☀️', ttsAudio: 'দিন' },
        { word: 'দীন', icon: '🤲', ttsAudio: 'দীন' },
        { word: 'কুল', icon: '🫐', ttsAudio: 'কুল' },
        { word: 'কূল', icon: '🌊', ttsAudio: 'কূল' },
      ]),
      makeSubLesson(6, 5, 'শব্দসম্ভার ও বানান শুদ্ধতা', 'মৃদু, শীতকাল, সুদূর ও বৃক্ষ', '🌲', ['ী', 'ূ', 'ৃ'], 'বানান দেখে সঠিক উচ্চারণ করুন।', [
        { word: 'বৃক্ষ', icon: '🌳', ttsAudio: 'বৃক্ষ' },
        { word: 'পৃথ্বী', icon: '🌍', ttsAudio: 'পৃথ্বী' },
      ]),
      makeSubLesson(6, 6, 'বাক্যে দীর্ঘ কারের প্রয়োগ', 'কৃষক মাঠে ধান কাটে, ময়ূর নাচে', '🦚', ['ূ', 'ৃ'], 'ছোট ছোট বাক্যে কার পড়ুন।', [
        { word: 'ময়ূর নাচে', icon: '🦚', ttsAudio: 'ময়ূর নাচে' },
      ]),
      makeSubLesson(6, 7, 'ধাপ ৬ কুইজ: দীর্ঘ কার পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ৭ খোলা', '🏆', ['নদী', 'সূর্য'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "আকাশে দীপ্তিমান 'সূর্য' কোনটি? সূর্যের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'সূর্য', iconSymbol: '☀️', isCorrect: true },
          { id: 'q2', displayText: 'নদী', iconSymbol: '🌊', isCorrect: false },
          { id: 'q3', displayText: 'গৃহ', iconSymbol: '🏡', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 7,
    bengaliNum: '৭',
    title: 'কণ্ঠ্য ও তালব্য কার',
    subtitle: 'এ-কার (ে) ও ঐ-কার (ৈ)',
    category: 'kar',
    icon: '☁️',
    color: '#EC4899',
    description: 'মেঘ, তেল, বেল, মেলা, বৈশাখ, সৈকত প্রভৃতির শুদ্ধ উচ্চারণ ও শব্দগঠন।',
    sampleWords: [
      { word: 'মেঘ', icon: '☁️', ttsAudio: 'মেঘ' },
      { word: 'তেল', icon: '🪔', ttsAudio: 'তেল' },
      { word: 'সৈকত', icon: '🏖️', ttsAudio: 'সৈকত' },
      { word: 'বৈশাখ', icon: '🌪️', ttsAudio: 'বৈশাখ' },
    ],
    subLessons: [
      makeSubLesson(7, 1, 'এ-কার (ে) রূপ ও উচ্চারণ', 'মেঘ, তেল, বেল, দেশ ও খেলা', '☁️', ['ে'], 'এ-কার যোগে শব্দ শুনুন। ম যোগ এ-কার সমান মে, মেঘ।', [
        { word: 'মেঘ', icon: '☁️', ttsAudio: 'মেঘ' },
        { word: 'তেল', icon: '🪔', ttsAudio: 'তেল' },
        { word: 'বেল', icon: '🔔', ttsAudio: 'বেল' },
        { word: 'দেশ', icon: '🗺️', ttsAudio: 'দেশ' },
        { word: 'মেলা', icon: '🎡', ttsAudio: 'মেলা' },
      ]),
      makeSubLesson(7, 2, 'এ-কার যোগে দৈনন্দিন শব্দ', 'ছেলে, মেয়ে, টেবিল, পেয়ারা ও দেওয়াল', '👧', ['ে'], 'দৈনন্দিন জীবনে ব্যবহৃত এ-কারের শব্দ।', [
        { word: 'ছেলে', icon: '👦', ttsAudio: 'ছেলে' },
        { word: 'মেয়ে', icon: '👧', ttsAudio: 'মেয়ে' },
        { word: 'টেবিল', icon: '🪑', ttsAudio: 'টেবিল' },
        { word: 'পেয়ারা', icon: '🍈', ttsAudio: 'পেয়ারা' },
      ]),
      makeSubLesson(7, 3, 'ঐ-কার (ৈ) রূপ ও শব্দ', 'সৈকত, বৈশাখ, শৈল, জৈন ও বৈরী', '🏖️', ['ৈ'], 'ঐ-কার যোগে শব্দ শুনুন। স যোগ ঐ-কার সমান সৈ, সৈকত।', [
        { word: 'সৈকত', icon: '🏖️', ttsAudio: 'সৈকত' },
        { word: 'বৈশাখ', icon: '🌪️', ttsAudio: 'বৈশাখ' },
        { word: 'শৈল', icon: '🏔️', ttsAudio: 'শৈল' },
        { word: 'দৈনিক', icon: '📰', ttsAudio: 'দৈনিক' },
      ]),
      makeSubLesson(7, 4, 'এ-কার ও ঐ-কার এর প্রভেদ', 'তেল বনাম তৈল, মেলা বনাম মৈত্রী', '⚖️', ['ে', 'ৈ'], 'এ এবং ঐ এর ধ্বনিগত প্রভেদ লক্ষ্য করুন।', [
        { word: 'তেল', icon: '🪔', ttsAudio: 'তেল' },
        { word: 'তৈল', icon: '🪔', ttsAudio: 'তৈল' },
        { word: 'মৈত্রী', icon: '🤝', ttsAudio: 'মৈত্রী' },
      ]),
      makeSubLesson(7, 5, 'ছবি দেখে দ্রুত শব্দ নির্বাচন', 'মেঘ, মেলা, সৈকত ও বৈশাখ', '🔍', ['ে', 'ৈ'], 'ছবি দেখে দ্রুত উচ্চারণ করুন।', [
        { word: 'মেঘলা আকাশ', icon: '🌥️', ttsAudio: 'মেঘলা আকাশ' },
      ]),
      makeSubLesson(7, 6, 'বাক্যে প্রয়োগ ও পাঠ', 'আকাশে মেঘ ডাকে, বৈশাখে ঝড় আসে', '🌩️', ['ে', 'ৈ'], 'বাক্য পড়ে অর্থ বুঝুন।', [
        { word: 'মেঘ ডাকে', icon: '☁️', ttsAudio: 'মেঘ ডাকে' },
      ]),
      makeSubLesson(7, 7, 'ধাপ ৭ কুইজ: এ ও ঐ কার পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ৮ খোলা', '🏆', ['মেঘ', 'সৈকত'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "আকাশে ভেসে বেড়ানো নীল 'মেঘ' কোনটি? মেঘের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'মেঘ', iconSymbol: '☁️', isCorrect: true },
          { id: 'q2', displayText: 'সৈকত', iconSymbol: '🏖️', isCorrect: false },
          { id: 'q3', displayText: 'তেল', iconSymbol: '🪔', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 8,
    bengaliNum: '৮',
    title: 'ওষ্ঠ্য ও জটিল কার সংযোগ',
    subtitle: 'ও-কার (ো), ঔ-কার (ৌ) ও মিশ্র কার',
    category: 'kar',
    icon: '⛵',
    color: '#F43F5E',
    description: 'গোল, ভোর, চোখ, নৌকা, মৌমাছি এবং বহুমুখী কার মিশ্রণের জটিল শব্দাবলী।',
    sampleWords: [
      { word: 'গোল', icon: '⚽', ttsAudio: 'গোল' },
      { word: 'চোখ', icon: '👁️', ttsAudio: 'চোখ' },
      { word: 'নৌকা', icon: '⛵', ttsAudio: 'নৌকা' },
      { word: 'মৌমাছি', icon: '🐝', ttsAudio: 'মৌমাছি' },
    ],
    subLessons: [
      makeSubLesson(8, 1, 'ও-কার (ো) রূপ ও শব্দ', 'গোল, ভোর, চোখ, ঢোল ও চোর', '⚽', ['ো'], 'ও-কার যোগে শব্দ শুনুন। গ যোগ ও-কার সমান গো, গোল।', [
        { word: 'গোল', icon: '⚽', ttsAudio: 'গোল' },
        { word: 'ভোর', icon: '🌅', ttsAudio: 'ভোর' },
        { word: 'চোখ', icon: '👁️', ttsAudio: 'চোখ' },
        { word: 'ঢোল', icon: '🪘', ttsAudio: 'ঢোল' },
        { word: 'লোক', icon: '👤', ttsAudio: 'লোক' },
      ]),
      makeSubLesson(8, 2, 'ঔ-কার (ৌ) রূপ ও শব্দ', 'নৌকা, মৌমাছি, পৌষ, সৌরভ ও কৌতুক', '⛵', ['ৌ'], 'ঔ-কার যোগে শব্দ শুনুন। ন যোগ ঔ-কার সমান নৌ, নৌকা।', [
        { word: 'নৌকা', icon: '⛵', ttsAudio: 'নৌকা' },
        { word: 'মৌমাছি', icon: '🐝', ttsAudio: 'মৌমাছি' },
        { word: 'পৌষ', icon: '❄️', ttsAudio: 'পৌষ' },
        { word: 'সৌরভ', icon: '🌸', ttsAudio: 'সৌরভ' },
        { word: 'কৌতুক', icon: '😄', ttsAudio: 'কৌতুক' },
      ]),
      makeSubLesson(8, 3, 'বহুমুখী মিশ্র কারের শব্দ', 'দোকান, গোলাপ, কোকিল, খেলনা ও মৌসুমি', '🌹', ['ো', 'ৌ', 'া', 'ি'], 'একাধিক কারযুক্ত শব্দ পড়ুন।', [
        { word: 'গোলাপ', icon: '🌹', ttsAudio: 'গোলাপ' },
        { word: 'দোকান', icon: '🏪', ttsAudio: 'দোকান' },
        { word: 'কোকিল', icon: '🐦', ttsAudio: 'কোকিল' },
        { word: 'খেলনা', icon: '🧸', ttsAudio: 'খেলনা' },
      ]),
      makeSubLesson(8, 4, 'দীর্ঘ ও যৌগিক শব্দপাঠ', 'বিদ্যালয়, ইতিহাস, কারখানা ও টেলিফোন', '🏫', ['ি', 'া', 'ো'], 'বড় বড় শব্দের বানান ও পাঠ শিখুন।', [
        { word: 'বিদ্যালয়', icon: '🏫', ttsAudio: 'বিদ্যালয়' },
        { word: 'ইতিহাস', icon: '📜', ttsAudio: 'ইতিহাস' },
        { word: 'কারখানা', icon: '🏭', ttsAudio: 'কারখানা' },
      ]),
      makeSubLesson(8, 5, 'কারযুক্ত শব্দের দ্রুত পঠন', '১০টি কারের পূর্ণাঙ্গ রূপান্তর', '⚡', ['ো', 'ৌ'], '১০টি কার চিহ্ন একসাথে স্মরণ করুন।', [
        { word: 'ভোরের পাখি', icon: '🌅', ttsAudio: 'ভোরের পাখি' },
      ]),
      makeSubLesson(8, 6, 'কার চিহ্নের অবস্থান পরীক্ষা', 'আগে, পরে ও উভয় পাশে বসা কার', '🎯', ['ে', 'ো', 'ৈ'], 'কার চিহ্ন কোথায় বসে তা লক্ষ্য করুন।', [
        { word: 'মৌসুম', icon: '🌦️', ttsAudio: 'মৌসুম' },
      ]),
      makeSubLesson(8, 7, 'ধাপ ৮ কুইজ: ও ও ঔ কার পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ৯ খোলা', '🏆', ['নৌকা', 'মৌমাছি'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "নদীতে ভাসমান 'নৌকা' কোনটি? নৌকার ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'নৌকা', iconSymbol: '⛵', isCorrect: true },
          { id: 'q2', displayText: 'মৌমাছি', iconSymbol: '🐝', isCorrect: false },
          { id: 'q3', displayText: 'চোখ', iconSymbol: '👁️', isCorrect: false },
        ],
      }),
    ],
  },

  // Levels 9-11: Phala modifiers
  {
    id: 9,
    bengaliNum: '৯',
    title: 'প্রধান ফলা: য-ফলা ও র-ফলা',
    subtitle: 'য-ফলা (্য) ও র-ফলা (্র)',
    category: 'phala',
    icon: '🌿',
    color: '#F59E0B',
    description: 'বাক্য, সূর্য, বিদ্যা, গ্রাম, চক্র, ছাত্র প্রভৃতির ফলা রূপ ও দ্বিত্ব উচ্চারণ।',
    sampleWords: [
      { word: 'বাক্য', icon: '💬', ttsAudio: 'বাক্য' },
      { word: 'সূর্য', icon: '☀️', ttsAudio: 'সূর্য' },
      { word: 'গ্রাম', icon: '🏡', ttsAudio: 'গ্রাম' },
      { word: 'চক্র', icon: '☸️', ttsAudio: 'চক্র' },
    ],
    subLessons: [
      makeSubLesson(9, 1, 'য-ফলা (্য) রূপ ও শব্দ', 'বাক্য, সূর্য, বিদ্যা, সত্য ও খাদ্য', '💬', ['্য'], 'ক যোগ য-ফলা সমান ক্য, বাক্য।', [
        { word: 'বাক্য', icon: '💬', ttsAudio: 'বাক্য' },
        { word: 'বিদ্যা', icon: '📚', ttsAudio: 'বিদ্যা' },
        { word: 'সত্য', icon: '⭐', ttsAudio: 'সত্য' },
        { word: 'খাদ্য', icon: '🍲', ttsAudio: 'খাদ্য' },
        { word: 'শয্যা', icon: '🛏️', ttsAudio: 'শয্যা' },
      ]),
      makeSubLesson(9, 2, 'য-ফলার উচ্চারণ নিয়ম', 'অ্যা-ধ্বনি ও দ্বিত্ব উচ্চারণ কৌশল', '🗣️', ['্য'], 'য-ফলার বিশেষ উচ্চারণ ধ্বনি শুনুন।', [
        { word: 'ব্যথা', icon: '🤕', ttsAudio: 'ব্যথা' },
        { word: 'ব্যস্ত', icon: '⏱️', ttsAudio: 'ব্যস্ত' },
        { word: 'ব্যাপার', icon: '💼', ttsAudio: 'ব্যাপার' },
      ]),
      makeSubLesson(9, 3, 'র-ফলা (্র) রূপ ও শব্দ', 'গ্রাম, চক্র, ছাত্র, গ্রহ ও তীব্র', '🏡', ['্র'], 'গ যোগ র-ফলা সমান গ্র, গ্রাম।', [
        { word: 'গ্রাম', icon: '🏡', ttsAudio: 'গ্রাম' },
        { word: 'চক্র', icon: '☸️', ttsAudio: 'চক্র' },
        { word: 'ছাত্র', icon: '🎒', ttsAudio: 'ছাত্র' },
        { word: 'গ্রহ', icon: '🪐', ttsAudio: 'গ্রহ' },
        { word: 'তীব্র', icon: '⚡', ttsAudio: 'তীব্র' },
      ]),
      makeSubLesson(9, 4, 'য ও র ফলার তুলনামূলক পাঠ', 'সত্যবাদী, প্রকাশ্য ও ব্যাঘ্র', '🐅', ['্য', '্র'], 'য-ফলা ও র-ফলার শব্দ পাশাপাশি পড়ুন।', [
        { word: 'প্রকাশ', icon: '💡', ttsAudio: 'প্রকাশ' },
        { word: 'প্রত্যয়', icon: '🎯', ttsAudio: 'প্রত্যয়' },
      ]),
      makeSubLesson(9, 5, 'ছবি দেখে ফলাযুক্ত শব্দ চেনা', 'গ্রাম, চক্র, বিদ্যা ও বাক্য', '🔍', ['্য', '্র'], 'ছবি দেখে সঠিক শব্দ উচ্চারণ করুন।', [
        { word: 'সুন্দর গ্রাম', icon: '🏡', ttsAudio: 'সুন্দর গ্রাম' },
      ]),
      makeSubLesson(9, 6, 'বাক্যে ফলার সাবলীল ব্যবহার', 'আমরা গ্রামে বাস করি, সত্য কথা বলব', '📜', ['্য', '্র'], 'ফলাযুক্ত বাক্যের পাঠ নিন।', [
        { word: 'সত্য কথা', icon: '⭐', ttsAudio: 'সত্য কথা' },
      ]),
      makeSubLesson(9, 7, 'ধাপ ৯ কুইজ: য ও র ফলা পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১০ খোলা', '🏆', ['গ্রাম', 'বিদ্যা'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "সবুজ ছায়ায় ঘেরা সুন্দর 'গ্রাম' কোনটি? গ্রামের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'গ্রাম', iconSymbol: '🏡', isCorrect: true },
          { id: 'q2', displayText: 'চক্র', iconSymbol: '☸️', isCorrect: false },
          { id: 'q3', displayText: 'বই', iconSymbol: '📖', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 10,
    bengaliNum: '১০',
    title: 'নাসিক্য ও ওষ্ঠ্য ফলা',
    subtitle: 'ম-ফলা (্ম) ও ব-ফলা (্ব)',
    category: 'phala',
    icon: '🪷',
    color: '#D97706',
    description: 'পদ্ম, আত্মা, গ্রীষ্ম, স্মৃতি, অশ্ব, দ্বার, স্বাধীন প্রভৃতি শব্দের বিশেষ ধ্বনিতত্ত্ব।',
    sampleWords: [
      { word: 'পদ্ম', icon: '🪷', ttsAudio: 'পদ্ম' },
      { word: 'স্মৃতি', icon: '🧠', ttsAudio: 'স্মৃতি' },
      { word: 'অশ্ব', icon: '🐎', ttsAudio: 'অশ্ব' },
      { word: 'দ্বার', icon: '🚪', ttsAudio: 'দ্বার' },
    ],
    subLessons: [
      makeSubLesson(10, 1, 'ম-ফলা (্ম) রূপ ও শব্দ', 'পদ্ম, ভস্ম, আত্মা, গ্রীষ্ম ও স্মৃতি', '🪷', ['্ম'], 'দ যোগ ম-ফলা সমান দ্ম, পদ্ম ফুল।', [
        { word: 'পদ্ম', icon: '🪷', ttsAudio: 'পদ্ম' },
        { word: 'ভস্ম', icon: '🌋', ttsAudio: 'ভস্ম' },
        { word: 'আত্মা', icon: '🕊️', ttsAudio: 'আত্মা' },
        { word: 'গ্রীষ্ম', icon: '☀️', ttsAudio: 'গ্রীষ্ম' },
        { word: 'স্মৃতি', icon: '🧠', ttsAudio: 'স্মৃতি' },
      ]),
      makeSubLesson(10, 2, 'ম-ফলার নাসিক্য উচ্চারণ নিয়ম', 'অনুচ্চারিত ম-ফলা ও অনুনাসিক স্বর', '👃', ['্ম'], 'ম-ফলার উচ্চারণ সূক্ষ্মতা জানুন।', [
        { word: 'বিস্ময়', icon: '😲', ttsAudio: 'বিস্ময়' },
        { word: 'মহাত্মা', icon: '🧘', ttsAudio: 'মহাত্মা' },
      ]),
      makeSubLesson(10, 3, 'ব-ফলা (্ব) রূপ ও শব্দ', 'অশ্ব, দ্বার, দ্বীপ, স্বাধীন ও বিশ্বাস', '🐎', ['্ব'], 'শ যোগ ব-ফলা সমান শ্ব, অশ্ব ঘোড়া।', [
        { word: 'অশ্ব', icon: '🐎', ttsAudio: 'অশ্ব' },
        { word: 'দ্বার', icon: '🚪', ttsAudio: 'দ্বার' },
        { word: 'দ্বীপ', icon: '🏝️', ttsAudio: 'দ্বীপ' },
        { word: 'স্বাধীন', icon: '🕊️', ttsAudio: 'স্বাধীন' },
        { word: 'বিশ্বাস', icon: '🤝', ttsAudio: 'বিশ্বাস' },
      ]),
      makeSubLesson(10, 4, 'ব-ফলার দ্বিত্ব উচ্চারণ কৌশল', 'শব্দের শুরুতে ও মাঝে ব-ফলা', '🗣️', ['্ব'], 'ধ্বনি দ্বিত্ব হওয়ার নিয়ম শুনুন।', [
        { word: 'ধ্বনি', icon: '🔊', ttsAudio: 'ধ্বনি' },
        { word: 'ঈশ্বর', icon: '✨', ttsAudio: 'ঈশ্বর' },
      ]),
      makeSubLesson(10, 5, 'ম ও ব ফলার সংমিশ্রণ অনুশীলন', 'স্মরণ, শ্বাস, স্বপ্ন ও শ্মশান', '💭', ['্ম', '্ব'], 'ম ও ব ফলার শব্দ তুলনা করুন।', [
        { word: 'স্বপ্ন', icon: '🌙', ttsAudio: 'স্বপ্ন' },
        { word: 'স্মরণ', icon: '💭', ttsAudio: 'স্মরণ' },
      ]),
      makeSubLesson(10, 6, 'বাক্যে প্রয়োগ ও অর্থবোধ', 'পদ্ম জলে ফোটে, ঘোড়া হলো অশ্ব', '🪷', ['্ম', '্ব'], 'বাক্য পড়ে অর্থ হৃদয়ঙ্গম করুন।', [
        { word: 'পদ্ম ফুল', icon: '🪷', ttsAudio: 'পদ্ম ফুল' },
      ]),
      makeSubLesson(10, 7, 'ধাপ ১০ কুইজ: ম ও ব ফলা পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১১ খোলা', '🏆', ['পদ্ম', 'অশ্ব'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "জলে ফোটা জাতীয় ফুল 'পদ্ম' কোনটি? পদ্ম ফুলের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'পদ্ম', iconSymbol: '🪷', isCorrect: true },
          { id: 'q2', displayText: 'অশ্ব', iconSymbol: '🐎', isCorrect: false },
          { id: 'q3', displayText: 'দ্বার', iconSymbol: '🚪', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 11,
    bengaliNum: '১১',
    title: 'স্পর্শ ও রেফ ফলা',
    subtitle: 'ন/ণ-ফলা (্ন/্ণ), ল-ফলা (্ল), রেফ (র্)',
    category: 'phala',
    icon: '💎',
    color: '#B45309',
    description: 'রত্ন, যত্ন, কৃষ্ণ, ক্লান্ত, অম্ল, সূর্য, ধর্ম, সর্প প্রভৃতি যুক্তরূপের পাঠ।',
    sampleWords: [
      { word: 'রত্ন', icon: '💎', ttsAudio: 'রত্ন' },
      { word: 'ক্লান্ত', icon: '🥱', ttsAudio: 'ক্লান্ত' },
      { word: 'ধর্ম', icon: '⚖️', ttsAudio: 'ধর্ম' },
      { word: 'সর্প', icon: '🐍', ttsAudio: 'সর্প' },
    ],
    subLessons: [
      makeSubLesson(11, 1, 'ন/ণ-ফলা (্ন/্ণ) রূপ ও শব্দ', 'রত্ন, যত্ন, কৃষ্ণ, অপরাহ্ন ও বহ্নি', '💎', ['্ন', '্ণ'], 'ত যোগ ন-ফলা সমান ত্ন, রত্ন।', [
        { word: 'রত্ন', icon: '💎', ttsAudio: 'রত্ন' },
        { word: 'যত্ন', icon: '🤲', ttsAudio: 'যত্ন' },
        { word: 'কৃষ্ণ', icon: '🦚', ttsAudio: 'কৃষ্ণ' },
        { word: 'অপরাহ্ন', icon: '🌅', ttsAudio: 'অপরাহ্ন' },
      ]),
      makeSubLesson(11, 2, 'ল-ফলা (্ল) রূপ ও শব্দ', 'ক্লান্ত, গ্লানি, অম্ল, প্লাবন ও উল্লাস', '🥱', ['্ল'], 'ক যোগ ল-ফলা সমান ক্ল, ক্লান্ত।', [
        { word: 'ক্লান্ত', icon: '🥱', ttsAudio: 'ক্লান্ত' },
        { word: 'গ্লানি', icon: '😔', ttsAudio: 'গ্লানি' },
        { word: 'অম্ল', icon: '🍋', ttsAudio: 'অম্ল' },
        { word: 'প্লাবন', icon: '🌊', ttsAudio: 'প্লাবন' },
      ]),
      makeSubLesson(11, 3, 'রেফ (র্) রূপ ও শব্দ', 'ধর্ম, কর্ম, বর্ণ, গর্জন ও সর্প', '🐍', ['র্'], 'র বর্ণের ঊর্ধ্বরূপ রেফ। ধ যোগ রেফ যোগ ম সমান ধর্ম।', [
        { word: 'ধর্ম', icon: '⚖️', ttsAudio: 'ধর্ম' },
        { word: 'কর্ম', icon: '⚒️', ttsAudio: 'কর্ম' },
        { word: 'বর্ণ', icon: '🎨', ttsAudio: 'বর্ণ' },
        { word: 'সর্প', icon: '🐍', ttsAudio: 'সর্প' },
        { word: 'গর্জন', icon: '⚡', ttsAudio: 'গর্জন' },
      ]),
      makeSubLesson(11, 4, 'রেফ ও র-ফলার স্পষ্ট তফাৎ', 'কর্ম বনাম ক্রম, বর্শা বনাম ব্রত', '⚖️', ['র্', '্র'], 'বর্ণের ওপরে রেফ এবং নিচে র-ফলা।', [
        { word: 'কর্ম', icon: '⚒️', ttsAudio: 'কর্ম' },
        { word: 'ক্রম', icon: '📈', ttsAudio: 'ক্রম' },
      ]),
      makeSubLesson(11, 5, 'সকল ফলার পূর্ণ সম্মিলন', 'য, র, ল, ব, ম, ন ফলা ও রেফ', '🌀', ['্য', '্র', '্ল', 'র্'], 'সকল ফলা চিহ্ন একসাথে পাঠ করুন।', [
        { word: 'রত্নভাণ্ডার', icon: '💎', ttsAudio: 'রত্নভাণ্ডার' },
      ]),
      makeSubLesson(11, 6, 'ছবি দেখে দ্রুত ফলা শনাক্তকরণ', 'রত্ন, সর্প, সূর্য ও পদ্ম', '🔍', ['্ন', 'র্'], 'ছবি ও ফলা মিলিয়ে উচ্চারণ করুন।', [
        { word: 'বিষধর সর্প', icon: '🐍', ttsAudio: 'বিষধর সর্প' },
      ]),
      makeSubLesson(11, 7, 'ধাপ ১১ কুইজ: স্পর্শ ও রেফ ফলা পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১২ খোলা', '🏆', ['রত্ন', 'সর্প'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "উজ্জ্বল ঝলমলে বহুমূল্য 'রত্ন' কোনটি? রত্নের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'রত্ন', iconSymbol: '💎', isCorrect: true },
          { id: 'q2', displayText: 'সর্প', iconSymbol: '🐍', isCorrect: false },
          { id: 'q3', displayText: 'ক্লান্ত', iconSymbol: '🥱', isCorrect: false },
        ],
      }),
    ],
  },

  // Levels 12-15: Juktakkhor (Conjuncts)
  {
    id: 12,
    bengaliNum: '১২',
    title: 'মৌলিক যুক্তাক্ষর',
    subtitle: 'ক, ত, ন, প বর্গীয় যুক্তবর্ণ (ক্ত, ত্ত, ন্দ, প্ত)',
    category: 'juktakkhor',
    icon: '🧩',
    color: '#059669',
    description: 'রক্ত, মুক্তি, আনন্দ, সুন্দর, উত্তর, প্রাপ্তি প্রভৃতি মৌলিক যুক্তবর্ণের পাঠ।',
    sampleWords: [
      { word: 'রক্ত', icon: '🩸', ttsAudio: 'রক্ত' },
      { word: 'আনন্দ', icon: '😊', ttsAudio: 'আনন্দ' },
      { word: 'উত্তর', icon: '🧭', ttsAudio: 'উত্তর' },
      { word: 'সুন্দর', icon: '🌸', ttsAudio: 'সুন্দর' },
    ],
    subLessons: [
      makeSubLesson(12, 1, 'ক ও ত যুক্তবর্ণ: ক্ত, ত্ত, ত্ন', 'রক্ত, ভক্তি, মুক্তি ও উত্তর', '🩸', ['ক্ত', 'ত্ত'], 'ক যোগ ত সমান ক্ত। র যোগ ক্ত সমান রক্ত।', [
        { word: 'রক্ত', icon: '🩸', ttsAudio: 'রক্ত' },
        { word: 'ভক্তি', icon: '🙏', ttsAudio: 'ভক্তি' },
        { word: 'মুক্তি', icon: '🕊️', ttsAudio: 'মুক্তি' },
        { word: 'উত্তর', icon: '🧭', ttsAudio: 'উত্তর' },
      ]),
      makeSubLesson(12, 2, 'ন ও প যুক্তবর্ণ: ন্দ, প্ত, ম্প', 'আনন্দ, সুন্দর, প্রাপ্তি ও কম্পন', '😊', ['ন্দ', 'প্ত'], 'ন যোগ দ সমান ন্দ, আনন্দ।', [
        { word: 'আনন্দ', icon: '😊', ttsAudio: 'আনন্দ' },
        { word: 'সুন্দর', icon: '🌸', ttsAudio: 'সুন্দর' },
        { word: 'প্রাপ্তি', icon: '🎁', ttsAudio: 'প্রাপ্তি' },
        { word: 'কম্পন', icon: '📳', ttsAudio: 'কম্পন' },
      ]),
      makeSubLesson(12, 3, 'গ ও ঘ যুক্তবর্ণ: গ্ধ, গ্ন', 'মুগ্ধ, দুগ্ধ, অগ্নি ও ভগ্ন', '🔥', ['গ্ধ', 'গ্ন'], 'গ যোগ ধ সমান গ্ধ, মুগ্ধ। গ যোগ ন সমান গ্ন, অগ্নি।', [
        { word: 'মুগ্ধ', icon: '😍', ttsAudio: 'মুগ্ধ' },
        { word: 'দুগ্ধ', icon: '🥛', ttsAudio: 'দুগ্ধ' },
        { word: 'অগ্নি', icon: '🔥', ttsAudio: 'অগ্নি' },
        { word: 'ভগ্ন', icon: '💔', ttsAudio: 'ভগ্ন' },
      ]),
      makeSubLesson(12, 4, 'যুক্তাক্ষর বিশ্লেষণ ও ধ্বনি ভাঙা', 'ক + ত = ক্ত, ন + দ = ন্দ', '🧩', ['ক্ত', 'ন্দ'], 'যুক্তবর্ণের ভেতরের দুটি বর্ণ চিনুন।', [
        { word: 'ভক্তিভাব', icon: '🙏', ttsAudio: 'ভক্তিভাব' },
      ]),
      makeSubLesson(12, 5, 'যুক্তাক্ষর দিয়ে বাক্য পাঠ', 'আমাদের দেশ অতি সুন্দর, মা দুগ্ধ দেন', '📜', ['ন্দ', 'গ্ধ'], 'যুক্তবর্ণের বাক্য সাবলীলভাবে পড়ুন।', [
        { word: 'অতি সুন্দর', icon: '🌸', ttsAudio: 'অতি সুন্দর' },
      ]),
      makeSubLesson(12, 6, 'ছবি দেখে যুক্তাক্ষর চিহ্নিতকরণ', 'রক্ত, আনন্দ, অগ্নি ও সুন্দর', '🔍', ['ক্ত', 'ন্দ', 'গ্ন'], 'ছবি দেখে যুক্তবর্ণ চিনে নিন।', [
        { word: 'অগ্নিশিখা', icon: '🔥', ttsAudio: 'অগ্নিশিখা' },
      ]),
      makeSubLesson(12, 7, 'ধাপ ১২ কুইজ: মৌলিক যুক্তাক্ষর পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৩ খোলা', '🏆', ['রক্ত', 'আনন্দ'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "আমাদের শরীরে প্রবাহিত লাল 'রক্ত' কোনটি? রক্তের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'রক্ত', iconSymbol: '🩸', isCorrect: true },
          { id: 'q2', displayText: 'আনন্দ', iconSymbol: '😊', isCorrect: false },
          { id: 'q3', displayText: 'উত্তর', iconSymbol: '🧭', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 13,
    bengaliNum: '১৩',
    title: 'মধ্যম জটিল যুক্তাক্ষর',
    subtitle: 'স, শ ও ষ বর্গীয় যুক্তবর্ণ (স্ট, স্ত, শ্চ, ষ্ট, ষ্ঠ)',
    category: 'juktakkhor',
    icon: '🚉',
    color: '#0D9488',
    description: 'স্টেশন, পুস্তক, রাস্তা, আশ্চর্য, নিশ্চয়, কষ্ট, মিষ্টি, সৃষ্টি, শ্রেষ্ঠ প্রভৃতির পাঠ।',
    sampleWords: [
      { word: 'স্টেশন', icon: '🚉', ttsAudio: 'স্টেশন' },
      { word: 'রাস্তা', icon: '🛣️', ttsAudio: 'রাস্তা' },
      { word: 'মিষ্টি', icon: '🍬', ttsAudio: 'মিষ্টি' },
      { word: 'কষ্ট', icon: '😣', ttsAudio: 'কষ্ট' },
    ],
    subLessons: [
      makeSubLesson(13, 1, 'দন্ত্য স যুক্তবর্ণ: স্ট, স্ত, স্ন, স্প', 'স্টেশন, পুস্তক, রাস্তা ও স্নান', '🚉', ['স্ট', 'স্ত'], 'দন্ত্য স যোগ ট সমান স্ট। স্টেশন।', [
        { word: 'স্টেশন', icon: '🚉', ttsAudio: 'স্টেশন' },
        { word: 'পুস্তক', icon: '📖', ttsAudio: 'পুস্তক' },
        { word: 'রাস্তা', icon: '🛣️', ttsAudio: 'রাস্তা' },
        { word: 'স্নান', icon: '🚿', ttsAudio: 'স্নান' },
      ]),
      makeSubLesson(13, 2, 'তালব্য শ যুক্তবর্ণ: শ্চ, শ্ব, শ্ল', 'আশ্চর্য, নিশ্চয়, পশ্চিম ও শ্লোক', '😲', ['শ্চ'], 'তালব্য শ যোগ চ সমান শ্চ। নিশ্চয় ও আশ্চর্য।', [
        { word: 'আশ্চর্য', icon: '😲', ttsAudio: 'আশ্চর্য' },
        { word: 'নিশ্চয়', icon: '✅', ttsAudio: 'নিশ্চয়' },
        { word: 'পশ্চিম', icon: '🧭', ttsAudio: 'পশ্চিম' },
        { word: 'শ্লোক', icon: '📜', ttsAudio: 'শ্লোক' },
      ]),
      makeSubLesson(13, 3, 'মূর্ধন্য ষ যুক্তবর্ণ: ষ্ট, ষ্ঠ, ষ্ণ', 'কষ্ট, মিষ্টি, সৃষ্টি, শ্রেষ্ঠ ও কৃষ্ণ', '🍬', ['ষ্ট', 'ষ্ঠ'], 'মূর্ধন্য ষ যোগ ট সমান ষ্ট। মিষ্টি ও কষ্ট।', [
        { word: 'কষ্ট', icon: '😣', ttsAudio: 'কষ্ট' },
        { word: 'মিষ্টি', icon: '🍬', ttsAudio: 'মিষ্টি' },
        { word: 'সৃষ্টি', icon: '🌍', ttsAudio: 'সৃষ্টি' },
        { word: 'শ্রেষ্ঠ', icon: '🥇', ttsAudio: 'শ্রেষ্ঠ' },
      ]),
      makeSubLesson(13, 4, 'স, শ ও ষ এর উচ্চারণ প্রভেদ', 'দন্ত্য, তালব্য ও মূর্ধন্য শিস-ধ্বনি', '🗣️', ['স্ত', 'শ্চ', 'ষ্ট'], 'তিনটি শ-ধ্বনির সঠিক উচ্চারণ বৈশিষ্ট্য।', [
        { word: 'স্পষ্ট', icon: '👓', ttsAudio: 'স্পষ্ট' },
        { word: 'নষ্ট', icon: '🗑️', ttsAudio: 'নষ্ট' },
      ]),
      makeSubLesson(13, 5, 'প্রাত্যহিক শব্দে যুক্তবর্ণ পাঠ', 'ডাক্তারখানা, মিষ্টির দোকান, রেলস্টেশন', '🏪', ['স্ট', 'ষ্ট'], 'জীবনের ব্যবহৃত যুক্তশব্দ পড়ুন।', [
        { word: 'রেলস্টেশন', icon: '🚉', ttsAudio: 'রেলস্টেশন' },
      ]),
      makeSubLesson(13, 6, 'বানান শুদ্ধিকরণ ও যাচাই', 'কষ্ট বনাম কস্ত, মিষ্টি বনাম মিস্তি', '✍️', ['ষ্ট'], 'সঠিক বানান লক্ষ্য করুন।', [
        { word: 'মিষ্টি মুখ', icon: '🍬', ttsAudio: 'মিষ্টি মুখ' },
      ]),
      makeSubLesson(13, 7, 'ধাপ ১৩ কুইজ: মধ্যম যুক্তাক্ষর পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৪ খোলা', '🏆', ['মিষ্টি', 'স্টেশন'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "জিভে জল আনা সুস্বাদু 'মিষ্টি' কোনটি? মিষ্টির ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'মিষ্টি', iconSymbol: '🍬', isCorrect: true },
          { id: 'q2', displayText: 'স্টেশন', iconSymbol: '🚉', isCorrect: false },
          { id: 'q3', displayText: 'পুস্তক', iconSymbol: '📖', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 14,
    bengaliNum: '১৪',
    title: 'জটিল ও বিশেষ রূপ যুক্তাক্ষর',
    subtitle: 'ক্ষ, জ্ঞ, ষ্ণ, ঞ্চ, ঞ্ছ, ঞ্জ, ঙ্ক, ঙ্গ',
    category: 'juktakkhor',
    icon: '🌳',
    color: '#0284C7',
    description: 'বৃক্ষ, পরীক্ষা, জ্ঞান, বিজ্ঞান, অঙ্ক, গঙ্গা, পঞ্চম, কুঞ্জ প্রভৃতি ব্যতিক্রমী রূপের পাঠ।',
    sampleWords: [
      { word: 'বৃক্ষ', icon: '🌳', ttsAudio: 'বৃক্ষ' },
      { word: 'জ্ঞান', icon: '💡', ttsAudio: 'জ্ঞান' },
      { word: 'অঙ্ক', icon: '🔢', ttsAudio: 'অঙ্ক' },
      { word: 'গঙ্গা', icon: '🌊', ttsAudio: 'গঙ্গা' },
    ],
    subLessons: [
      makeSubLesson(14, 1, 'বিশেষ রূপ ক্ষ ও জ্ঞ', 'বৃক্ষ, পরীক্ষা, ক্ষমা, জ্ঞান ও বিজ্ঞান', '🌳', ['ক্ষ', 'জ্ঞ'], 'ক + ষ = ক্ষ, জ + ঞ = জ্ঞ। বৃক্ষ ও জ্ঞান।', [
        { word: 'বৃক্ষ', icon: '🌳', ttsAudio: 'বৃক্ষ' },
        { word: 'পরীক্ষা', icon: '📝', ttsAudio: 'পরীক্ষা' },
        { word: 'ক্ষমা', icon: '🕊️', ttsAudio: 'ক্ষমা' },
        { word: 'জ্ঞান', icon: '💡', ttsAudio: 'জ্ঞান' },
        { word: 'বিজ্ঞানী', icon: '🔬', ttsAudio: 'বিজ্ঞানী' },
      ]),
      makeSubLesson(14, 2, 'নাসিক্য ঙ্ক, ঙ্গ, ঙ্খ', 'অঙ্ক, শঙ্খ, গঙ্গা, সঙ্গীত ও পতঙ্গ', '🔢', ['ঙ্ক', 'ঙ্গ'], 'ঙ যোগ ক সমান ঙ্ক। ঙ যোগ গ সমান ঙ্গ।', [
        { word: 'অঙ্ক', icon: '🔢', ttsAudio: 'অঙ্ক' },
        { word: 'শঙ্খ', icon: '🐚', ttsAudio: 'শঙ্খ' },
        { word: 'গঙ্গা', icon: '🌊', ttsAudio: 'গঙ্গা' },
        { word: 'সঙ্গীত', icon: '🎶', ttsAudio: 'সঙ্গীত' },
        { word: 'পতঙ্গ', icon: '🦗', ttsAudio: 'পতঙ্গ' },
      ]),
      makeSubLesson(14, 3, 'তালব্য নাসিক্য ঞ্চ, ঞ্ছ, ঞ্জ', 'পঞ্চম, মঞ্চ, বাঞ্ছা, গঞ্জ ও কুঞ্জ', '🎭', ['ঞ্চ', 'ঞ্জ'], 'ঞ যোগ চ সমান ঞ্চ। ঞ যোগ জ সমান ঞ্জ।', [
        { word: 'পঞ্চম', icon: '5️⃣', ttsAudio: 'পঞ্চম' },
        { word: 'মঞ্চ', icon: '🎭', ttsAudio: 'মঞ্চ' },
        { word: 'গঞ্জ', icon: '🏘️', ttsAudio: 'গঞ্জ' },
        { word: 'কুঞ্জ', icon: '🌺', ttsAudio: 'কুঞ্জ' },
      ]),
      makeSubLesson(14, 4, 'ব্যতিক্রমী রূপ মনে রাখার কৌশল', 'ক্ষ ও জ্ঞ এর নিখুঁত বানান ও উচ্চারণ', '🧠', ['ক্ষ', 'জ্ঞ'], 'ক্ষ ও জ্ঞ এর বিশেষ গঠন স্মরণে রাখুন।', [
        { word: 'শিক্ষক', icon: '👨‍🏫', ttsAudio: 'শিক্ষক' },
        { word: 'অজ্ঞাত', icon: '❓', ttsAudio: 'অজ্ঞাত' },
      ]),
      makeSubLesson(14, 5, 'গল্পে জটিল যুক্তাক্ষরের সন্ধান', 'জ্ঞানবান ব্যক্তি, পরীক্ষার ফল, গঙ্গার জল', '🌊', ['জ্ঞ', 'ক্ষ', 'ঙ্গ'], 'অনুচ্ছেদ থেকে যুক্তশব্দ বের করুন।', [
        { word: 'জ্ঞানবান', icon: '💡', ttsAudio: 'জ্ঞানবান' },
      ]),
      makeSubLesson(14, 6, 'যুক্তাক্ষর ভাঙা ও গড়ার পরীক্ষা', 'ক + ষ = ক্ষ, জ + ঞ = জ্ঞ', '🧩', ['ক্ষ', 'জ্ঞ', 'ঙ্ক'], 'ধ্বনি ও অক্ষরের মিল নিশ্চিত করুন।', [
        { word: 'অঙ্ক খাতা', icon: '📓', ttsAudio: 'অঙ্ক খাতা' },
      ]),
      makeSubLesson(14, 7, 'ধাপ ১৪ কুইজ: জটিল যুক্তাক্ষর পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৫ খোলা', '🏆', ['বৃক্ষ', 'জ্ঞান'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "মাটিতে বেড়ে ওঠা বিশাল 'বৃক্ষ' কোনটি? গাছের ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'বৃক্ষ', iconSymbol: '🌳', isCorrect: true },
          { id: 'q2', displayText: 'জ্ঞান', iconSymbol: '💡', isCorrect: false },
          { id: 'q3', displayText: 'অঙ্ক', iconSymbol: '🔢', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 15,
    bengaliNum: '১৫',
    title: 'ত্রি-যুক্তাক্ষর ও ব্যতিক্রমী রূপ',
    subtitle: '্ত্র, ঙ্ক্ষ, ষ্ট্র, হ্ন, হৃ, হ্ম',
    category: 'juktakkhor',
    icon: '🏛️',
    color: '#4F46E5',
    description: 'অস্ত্র, বস্ত্র, রাষ্ট্র, আকাঙ্ক্ষা, চিহ্ন, হৃদয়, ব্রাহ্মণ প্রভৃতি তিন বর্ণের সংযুক্ত রূপ।',
    sampleWords: [
      { word: 'অস্ত্র', icon: '🗡️', ttsAudio: 'অস্ত্র' },
      { word: 'বস্ত্র', icon: '👗', ttsAudio: 'বস্ত্র' },
      { word: 'রাষ্ট্র', icon: '🏛️', ttsAudio: 'রাষ্ট্র' },
      { word: 'হৃদয়', icon: '❤️', ttsAudio: 'হৃদয়' },
    ],
    subLessons: [
      makeSubLesson(15, 1, 'ত্রি-যুক্তবর্ণ: স্ত্র, ষ্ট্র, ঙ্ক্ষ', 'অস্ত্র, বস্ত্র, রাষ্ট্র ও আকাঙ্ক্ষা', '🏛️', ['স্ত্র', 'ষ্ট্র'], 'স + ত + র = স্ত্র। ষ + ট + র = ষ্ট্র।', [
        { word: 'অস্ত্র', icon: '🗡️', ttsAudio: 'অস্ত্র' },
        { word: 'বস্ত্র', icon: '👗', ttsAudio: 'বস্ত্র' },
        { word: 'রাষ্ট্র', icon: '🏛️', ttsAudio: 'রাষ্ট্র' },
        { word: 'আকাঙ্ক্ষা', icon: '🌟', ttsAudio: 'আকাঙ্ক্ষা' },
      ]),
      makeSubLesson(15, 2, 'হ-ঘটিত জটিল রূপ: হ্ন, হ্ণ, হৃ, হ্ম', 'চিহ্ন, মধ্যাহ্ন, হৃদয় ও ব্রাহ্মণ', '❤️', ['হ্ন', 'হৃ', 'হ্ম'], 'হ যোগ ন সমান হ্ন, চিহ্ন। হ যোগ ঋ সমান হৃ, হৃদয়।', [
        { word: 'চিহ্ন', icon: '✔️', ttsAudio: 'চিহ্ন' },
        { word: 'মধ্যাহ্ন', icon: '☀️', ttsAudio: 'মধ্যাহ্ন' },
        { word: 'হৃদয়', icon: '❤️', ttsAudio: 'হৃদয়' },
        { word: 'ব্রাহ্মণ', icon: '🧘', ttsAudio: 'ব্রাহ্মণ' },
      ]),
      makeSubLesson(15, 3, 'র ও য ফলা মিশ্রিত ত্রি-সংযুক্ত রূপ', 'স্বাস্থ্য, দারিদ্র্য ও স্বাতন্ত্র্য', '🩺', ['স্থ্য'], 'স + থ + য = স্থ্য। স্বাস্থ্যই সকল সুখের মূল।', [
        { word: 'স্বাস্থ্য', icon: '🩺', ttsAudio: 'স্বাস্থ্য' },
        { word: 'দারিদ্র্য', icon: '📉', ttsAudio: 'দারিদ্র্য' },
        { word: 'স্বাতন্ত্র্য', icon: '⭐', ttsAudio: 'স্বাতন্ত্র্য' },
      ]),
      makeSubLesson(15, 4, 'ধ্রুপদী ও প্রাচীন যুক্তাক্ষর পাঠ', 'সূক্ষ্ম, শুশ্রূষা, উচ্ছ্বাস ও মহোচ্ছ্বাস', '📜', ['ক্ষ্ম', 'শ্রূ'], 'বাংলা সাহিত্যের কঠিন যুক্তরূপ চিনে নিন।', [
        { word: 'সূক্ষ্ম', icon: '🔬', ttsAudio: 'সূক্ষ্ম' },
        { word: 'শুশ্রূষা', icon: '🩺', ttsAudio: 'শুশ্রূষা' },
      ]),
      makeSubLesson(15, 5, 'কঠিন শব্দের নিখুঁত উচ্চারণ', 'রাষ্ট্রপতি, আন্তর্জাতিক, শাস্ত্র', '🗣️', ['ষ্ট্র', 'স্ত্র'], 'উচ্চারণ জড়িয়ে না ফেলে সাবলীল পাঠ।', [
        { word: 'রাষ্ট্রপতি', icon: '🏛️', ttsAudio: 'রাষ্ট্রপতি' },
      ]),
      makeSubLesson(15, 6, 'ত্রি-যুক্তবর্ণ বিশ্লেষণ পরীক্ষা', 'স + ত + র-ফলা = স্ত্র', '🧩', ['স্ত্র', 'হৃ'], 'বর্ণের ভাঙন সঠিক কিনা দেখুন।', [
        { word: 'হৃদয়বান', icon: '❤️', ttsAudio: 'হৃদয়বান' },
      ]),
      makeSubLesson(15, 7, 'ধাপ ১৫ কুইজ: ত্রি-যুক্তাক্ষর পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৬ খোলা', '🏆', ['রাষ্ট্র', 'হৃদয়'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "আমাদের দেশের মর্যাদা প্রকাশ পায় যাতে, সেই 'রাষ্ট্র' কোনটি?",
        options: [
          { id: 'q1', displayText: 'রাষ্ট্র', iconSymbol: '🏛️', isCorrect: true },
          { id: 'q2', displayText: 'হৃদয়', iconSymbol: '❤️', isCorrect: false },
          { id: 'q3', displayText: 'অস্ত্র', iconSymbol: '🗡️', isCorrect: false },
        ],
      }),
    ],
  },

  // Level 16: Complex compound words
  {
    id: 16,
    bengaliNum: '১৬',
    title: 'জটিল মিশ্র ও যৌগিক শব্দ',
    subtitle: 'কার, ফলা ও যুক্তাক্ষরের সম্মিলিত শব্দসম্ভার',
    category: 'compound',
    icon: '🔬',
    color: '#7C3AED',
    description: 'স্বাস্থ্য, প্রস্তুতি, বৃষ্টিপাত, বিজ্ঞানাগার, শতাব্দী, স্বাধীনতা প্রভৃতি পূর্ণাঙ্গ শব্দ।',
    sampleWords: [
      { word: 'স্বাস্থ্য', icon: '🩺', ttsAudio: 'স্বাস্থ্য' },
      { word: 'প্রস্তুতি', icon: '🎒', ttsAudio: 'প্রস্তুতি' },
      { word: 'বৃষ্টিপাত', icon: '🌧️', ttsAudio: 'বৃষ্টিপাত' },
      { word: 'বিজ্ঞানাগার', icon: '🔬', ttsAudio: 'বিজ্ঞানাগার' },
    ],
    subLessons: [
      makeSubLesson(16, 1, 'স্বাস্থ্য ও জীবনধারা বিষয়ক শব্দ', 'স্বাস্থ্য, প্রস্তুতি, চিকিৎসা, ব্যায়াম ও বিশ্রাম', '🩺', ['স্বাস্থ্য', 'প্রস্তুতি'], 'স্বাস্থ্য বিষয়ক জটিল মিশ্র শব্দ পড়ুন।', [
        { word: 'স্বাস্থ্য', icon: '🩺', ttsAudio: 'স্বাস্থ্য' },
        { word: 'প্রস্তুতি', icon: '🎒', ttsAudio: 'প্রস্তুতি' },
        { word: 'চিকিৎসা', icon: '🏥', ttsAudio: 'চিকিৎসা' },
        { word: 'ব্যায়াম', icon: '🏋️', ttsAudio: 'ব্যায়াম' },
      ]),
      makeSubLesson(16, 2, 'প্রকৃতি ও বিজ্ঞান বিষয়ক শব্দ', 'বৃষ্টিপাত, বিজ্ঞানাগার, বিদ্যুৎ, আবিষ্কার ও মহাকাশ', '🔬', ['বৃষ্টিপাত', 'বিজ্ঞানাগার'], 'বিজ্ঞান ও প্রকৃতির সমৃদ্ধ শব্দমালা।', [
        { word: 'বৃষ্টিপাত', icon: '🌧️', ttsAudio: 'বৃষ্টিপাত' },
        { word: 'বিজ্ঞানাগার', icon: '🔬', ttsAudio: 'বিজ্ঞানাগার' },
        { word: 'বিদ্যুৎ', icon: '⚡', ttsAudio: 'বিদ্যুৎ' },
        { word: 'আবিষ্কার', icon: '💡', ttsAudio: 'আবিষ্কার' },
      ]),
      makeSubLesson(16, 3, 'ইতিহাস ও সমাজ বিষয়ক শব্দ', 'শতাব্দী, স্বাধীনতা, সংস্কৃতি, ঐতিহ্য ও শতাব্দী', '🏛️', ['শতাব্দী', 'স্বাধীনতা'], 'ইতিহাসের গুরুত্বপূর্ণ মিশ্র শব্দাবলী।', [
        { word: 'শতাব্দী', icon: '⏳', ttsAudio: 'শতাব্দী' },
        { word: 'স্বাধীনতা', icon: '🕊️', ttsAudio: 'স্বাধীনতা' },
        { word: 'সংস্কৃতি', icon: '🎨', ttsAudio: 'সংস্কৃতি' },
        { word: 'ঐতিহ্য', icon: '🏰', ttsAudio: 'ঐতিহ্য' },
      ]),
      makeSubLesson(16, 4, 'শিক্ষা ও প্রযুক্তি বিষয়ক শব্দ', 'বিশ্ববিদ্যালয়, গবেষণা, প্রযুক্তি ও প্রকৌশল', '🎓', ['বিশ্ববিদ্যালয়'], 'উচ্চশিক্ষা ও প্রযুক্তির শব্দ পাঠ।', [
        { word: 'বিশ্ববিদ্যালয়', icon: '🎓', ttsAudio: 'বিশ্ববিদ্যালয়' },
        { word: 'গবেষণা', icon: '📚', ttsAudio: 'গবেষণা' },
        { word: 'প্রযুক্তি', icon: '💻', ttsAudio: 'প্রযুক্তি' },
      ]),
      makeSubLesson(16, 5, 'জটিল শব্দের বাক্য প্রয়োগ', 'স্বাস্থ্যই পরম সম্পদ, বিজ্ঞানীরা গবেষণা করেন', '📜', ['স্বাস্থ্য', 'বিজ্ঞান'], 'শব্দ দিয়ে সম্পূর্ণ ভাব প্রকাশ করুন।', [
        { word: 'স্বাস্থ্য সুরক্ষা', icon: '🩺', ttsAudio: 'স্বাস্থ্য সুরক্ষা' },
      ]),
      makeSubLesson(16, 6, 'শব্দের অর্থ ও বানান বোধ', 'আবিষ্কারের আনন্দ, শতাব্দীর ইতিহাস', '💡', ['আবিষ্কার'], 'শব্দের বানান ও অর্থ আত্মস্থ করুন।', [
        { word: 'নতুন আবিষ্কার', icon: '💡', ttsAudio: 'নতুন আবিষ্কার' },
      ]),
      makeSubLesson(16, 7, 'ধাপ ১৬ কুইজ: যৌগিক শব্দ পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৭ খোলা', '🏆', ['বিজ্ঞানাগার', 'বৃষ্টিপাত'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "বিজ্ঞানীদের গবেষণার স্থান 'বিজ্ঞানাগার' কোনটি?",
        options: [
          { id: 'q1', displayText: 'বিজ্ঞানাগার', iconSymbol: '🔬', isCorrect: true },
          { id: 'q2', displayText: 'বৃষ্টিপাত', iconSymbol: '🌧️', isCorrect: false },
          { id: 'q3', displayText: 'প্রস্তুতি', iconSymbol: '🎒', isCorrect: false },
        ],
      }),
    ],
  },

  // Levels 17-20: Advanced Reading Mastery
  {
    id: 17,
    bengaliNum: '১৭',
    title: 'সহজ বাক্য ও দৈনন্দিন কথোপকথন',
    subtitle: '২ ও ৩ শব্দের বাক্য এবং প্রতিদিনের কুশল বিনিময়',
    category: 'sentences',
    icon: '💬',
    color: '#9333EA',
    description: 'জল খাও, ভাত খাই, বই পড়ো, শুভ সকাল, আপনি কেমন আছেন প্রভৃতির পাঠ।',
    sampleWords: [
      { word: 'জল খাও', icon: '💧', ttsAudio: 'জল খাও' },
      { word: 'ভাত খাই', icon: '🍚', ttsAudio: 'ভাত খাই' },
      { word: 'বই পড়ো', icon: '📖', ttsAudio: 'বই পড়ো' },
      { word: 'শুভ সকাল', icon: '🌅', ttsAudio: 'শুভ সকাল' },
    ],
    subLessons: [
      makeSubLesson(17, 1, 'দুই শব্দের সহজ বাক্য', 'জল খাও, ভাত খাই, বই পড়ো, ফুল ফোটে ও পাখি ডাকে', '💧', ['জল খাও', 'ভাত খাই'], 'ছোট ছোট দুটি শব্দের বাক্য শুনুন।', [
        { word: 'জল খাও', icon: '💧', ttsAudio: 'জল খাও' },
        { word: 'ভাত খাই', icon: '🍚', ttsAudio: 'ভাত খাই' },
        { word: 'বই পড়ো', icon: '📖', ttsAudio: 'বই পড়ো' },
        { word: 'গান শোনো', icon: '🎶', ttsAudio: 'গান শোনো' },
      ]),
      makeSubLesson(17, 2, 'তিন ও চার শব্দের পূর্ণাঙ্গ বাক্য', 'আমি ভাত খাই, মা আমাকে ভালোবাসেন, আকাশে পাখি ওড়ে', '🍚', ['আমি ভাত খাই'], 'কর্তা, কর্ম ও ক্রিয়া সমন্বিত বাক্য।', [
        { word: 'আমি ভাত খাই', icon: '🍚', ttsAudio: 'আমি ভাত খাই' },
        { word: 'আকাশে পাখি ওড়ে', icon: '🐦', ttsAudio: 'আকাশে পাখি ওড়ে' },
        { word: 'মা আমাকে ভালোবাসেন', icon: '❤️', ttsAudio: 'মা আমাকে ভালোবাসেন' },
      ]),
      makeSubLesson(17, 3, 'সকালের কুশল বিনিময়', 'শুভ সকাল, আপনি কেমন আছেন? আমি ভালো আছি', '🌅', ['শুভ সকাল'], 'নম্র ও মধুর বাচনভঙ্গিতে কথা বলুন।', [
        { word: 'শুভ সকাল', icon: '🌅', ttsAudio: 'শুভ সকাল' },
        { word: 'কেমন আছেন', icon: '🤝', ttsAudio: 'কেমন আছেন' },
        { word: 'ভালো আছি', icon: '😊', ttsAudio: 'ভালো আছি' },
      ]),
      makeSubLesson(17, 4, 'পাঠশালা ও বন্ধুদের কথপোকথন', 'তোমার নাম কি? এসো একসাথে খেলি ও পড়ি', '🏫', ['বিদ্যালয়'], 'বন্ধুদের সাথে ভাব আদান-প্রদান করুন।', [
        { word: 'চলো খেলি', icon: '⚽', ttsAudio: 'চলো খেলি' },
        { word: 'বই খুলে পড়ো', icon: '📖', ttsAudio: 'বই খুলে পড়ো' },
      ]),
      makeSubLesson(17, 5, 'অনুরোধ ও সৌজন্যমূলক বাক্য', 'দয়া করে বসুন, ধন্যবাদ আপনাকে', '🤲', ['ধন্যবাদ'], 'ভদ্র ও শালীন বাক্যের প্রয়োগ।', [
        { word: 'ধন্যবাদ', icon: '🙏', ttsAudio: 'ধন্যবাদ' },
        { word: 'স্বাগতম', icon: '💐', ttsAudio: 'স্বাগতম' },
      ]),
      makeSubLesson(17, 6, 'যতিচিহ্ন ও স্বরভঙ্গি (দাঁড়ি, কমা, প্রশ্ন)', 'কখন থামতে হবে এবং স্বরের ওঠানামা', '⁉️', ['যতিচিহ্ন'], 'দাঁড়ি ও প্রশ্নচিহ্নের ভাব লক্ষ্য করে পড়ুন।', [
        { word: 'তুমি যাবে?', icon: '❓', ttsAudio: 'তুমি যাবে?' },
        { word: 'আমি যাব।', icon: '✔️', ttsAudio: 'আমি যাব।' },
      ]),
      makeSubLesson(17, 7, 'ধাপ ১৭ কুইজ: বাক্য পাঠ পরীক্ষা', 'ছবি দেখে সঠিক বাক্য চিহ্নিতকরণ ও ধাপ ১৮ খোলা', '🏆', ['ভাত খাই', 'শুভ সকাল'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "'আমি ভাত খাই'। গরম ভাতের থালার ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'আমি ভাত খাই', iconSymbol: '🍚', isCorrect: true },
          { id: 'q2', displayText: 'জল খাও', iconSymbol: '💧', isCorrect: false },
          { id: 'q3', displayText: 'বই পড়ো', iconSymbol: '📖', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 18,
    bengaliNum: '১৮',
    title: 'অনুচ্ছেদ ও শিশুতোষ ছড়া/কবিতা',
    subtitle: 'আমাদের সুন্দর দেশ, ভোরের সকাল ও ছড়া পাঠ',
    category: 'paragraphs',
    icon: '📜',
    color: '#C026D3',
    description: 'ছোট ছোট অনুচ্ছেদ, আমাদের ছোট নদী, ভোর হলো দোর খোলো কবিতার সাবলীল পাঠ।',
    sampleWords: [
      { word: 'সুন্দর দেশ', icon: '🇧🇩', ttsAudio: 'আমাদের দেশ বাংলাদেশ' },
      { word: 'ভোরের সকাল', icon: '🌅', ttsAudio: 'ভোরে পূর্ব আকাশে সূর্য ওঠে' },
      { word: 'ছোট নদী', icon: '🌊', ttsAudio: 'আমাদের ছোট নদী চলে বাঁকে বাঁকে' },
    ],
    subLessons: [
      makeSubLesson(18, 1, 'আমাদের সুন্দর দেশ বাংলাদেশ', 'আমাদের দেশ বাংলাদেশ। এখানে নদী ও সবুজ মাঠ আছে...', '🇧🇩', ['বাংলাদেশ', 'নদী'], 'দেশের রূপ বর্ণনামূলক অনুচ্ছেদ পড়ুন।', [
        { word: 'আমাদের দেশ বাংলাদেশ', icon: '🇧🇩', ttsAudio: 'আমাদের দেশ বাংলাদেশ' },
        { word: 'সবুজ মাঠ', icon: '🌾', ttsAudio: 'সবুজ মাঠ' },
      ]),
      makeSubLesson(18, 2, 'ভোরের সকাল ও প্রকৃতি', 'ভোরে পূর্ব আকাশে সূর্য ওঠে। পাখিরা মিষ্টি গান গায়...', '🌅', ['সূর্য', 'সকাল'], 'ভোরের স্নিগ্ধ পরিবেশের অনুচ্ছেদ পাঠ।', [
        { word: 'সূর্য ওঠে', icon: '🌅', ttsAudio: 'সূর্য ওঠে' },
        { word: 'পাখিরা গান গায়', icon: '🐦', ttsAudio: 'পাখিরা গান গায়' },
      ]),
      makeSubLesson(18, 3, 'বর্ষার বৃষ্টি ও নদী', 'আকাশে মেঘ ডাকে। ঝমঝম শব্দে শীতল বৃষ্টি পড়ে...', '🌧️', ['মেঘ', 'বৃষ্টি'], 'বর্ষাকালের সুন্দর অনুচ্ছেদ পাঠ।', [
        { word: 'ঝমঝম বৃষ্টি', icon: '🌧️', ttsAudio: 'ঝমঝম বৃষ্টি' },
        { word: 'নদী জলে ভরা', icon: '🌊', ttsAudio: 'নদী জলে ভরা' },
      ]),
      makeSubLesson(18, 4, "ছড়া: 'আমাদের ছোট নদী'", 'আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে...', '🌊', ['ছোট নদী'], 'ছন্দের তালে তালে ছড়া আবৃত্তি করুন।', [
        { word: 'আমাদের ছোট নদী', icon: '🌊', ttsAudio: 'আমাদের ছোট নদী চলে বাঁকে বাঁকে' },
      ]),
      makeSubLesson(18, 5, "কবিতা: 'ভোর হলো দোর খোলো'", 'ভোর হলো দোর খোলো খুকুমণি ওঠ রে, ওই ডাকে জুঁই-শাখে ফুলখুকি ছোট রে...', '🌺', ['ভোর হলো'], 'আনন্দ নিয়ে কবিতা পাঠ করুন।', [
        { word: 'ভোর হলো দোর খোলো', icon: '🌺', ttsAudio: 'ভোর হলো দোর খোলো খুকুমণি ওঠ রে' },
      ]),
      makeSubLesson(18, 6, 'অনুচ্ছেদ থেকে প্রশ্ন ও উত্তর', 'পড়ার পর ভাব ও অর্থ মনে রাখার অনুশীলন', '💡', ['বোধগম্যতা'], 'অনুচ্ছেদ পড়ে মূল ভাব বুঝুন।', [
        { word: 'দেশপ্রেম', icon: '❤️', ttsAudio: 'দেশপ্রেম' },
      ]),
      makeSubLesson(18, 7, 'ধাপ ১৮ কুইজ: অনুচ্ছেদ ও ছড়া পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ১৯ খোলা', '🏆', ['বাংলাদেশ', 'সূর্য'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "আমাদের প্রিয় মাতৃভূমি 'বাংলাদেশ' এর জাতীয় পতাকার ছবিতে চাপ দিন।",
        options: [
          { id: 'q1', displayText: 'আমাদের দেশ', iconSymbol: '🇧🇩', isCorrect: true },
          { id: 'q2', displayText: 'ভোরের সূর্য', iconSymbol: '🌅', isCorrect: false },
          { id: 'q3', displayText: 'ছোট নদী', iconSymbol: '🌊', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 19,
    bengaliNum: '১৯',
    title: 'ক্লাসিক নীতিবাক্য ও শিক্ষণীয় গল্প',
    subtitle: 'বুদ্ধিমান তৃষ্ণার্ত কাক, খরগোশ ও কচ্ছপ এবং একতার শক্তি',
    category: 'stories',
    icon: '🏆',
    color: '#DB2777',
    description: 'সম্পূর্ণ গল্প পাঠ, প্রতিটি শব্দের বিশ্লেষণ এবং নীতিশিক্ষার গভীরে প্রবেশ।',
    sampleWords: [
      { word: 'তৃষ্ণার্ত কাক', icon: '🦅', ttsAudio: 'বুদ্ধিমান তৃষ্ণার্ত কাক' },
      { word: 'খরগোশ ও কচ্ছপ', icon: '🐢', ttsAudio: 'খরগোশ ও কচ্ছপের গল্প' },
      { word: 'একতার শক্তি', icon: '🤝', ttsAudio: 'একতাই বল' },
    ],
    subLessons: [
      makeSubLesson(19, 1, 'গল্প ১: বুদ্ধিমান তৃষ্ণার্ত কাক', 'এক ছিল তৃষ্ণার্ত কাক। সে জলের খোঁজে বনে গেল...', '🦅', ['কাক', 'বুদ্ধি'], 'কাকের বুদ্ধিমত্তার গল্প শুনুন ও পড়ুন।', [
        { word: 'তৃষ্ণার্ত কাক', icon: '🦅', ttsAudio: 'এক ছিল তৃষ্ণার্ত কাক' },
        { word: 'নুড়ি পাথর', icon: '🪨', ttsAudio: 'নুড়ি পাথর ফেলল' },
      ]),
      makeSubLesson(19, 2, 'গল্প ২: খরগোশ ও কচ্ছপ', 'এক বনে ছিল খরগোশ ও কচ্ছপ। খরগোশ ছিল অহংকারী...', '🐢', ['কচ্ছপ', 'ধৈর্য'], 'অধ্যবসায় ও বিনয়ের মহান গল্প।', [
        { word: 'খরগোশ ও কচ্ছপ', icon: '🐇', ttsAudio: 'খরগোশ ও কচ্ছপ' },
        { word: 'কচ্ছপের জয়', icon: '🐢', ttsAudio: 'কচ্ছপ জয়ী হলো' },
      ]),
      makeSubLesson(19, 3, 'গল্প ৩: রাখাল ও বাঘ', 'মিথ্যাবাদী রাখাল বনের ধারে গরু চড়াত...', '🐅', ['সত্যবাদিতা'], 'কখনো মিথ্যা না বলার শিক্ষা নিন।', [
        { word: 'মিথ্যাবাদী রাখাল', icon: '🗣️', ttsAudio: 'মিথ্যাবাদী রাখাল' },
        { word: 'সত্যের জয়', icon: '⭐', ttsAudio: 'সর্বদা সত্য কথা বলবে' },
      ]),
      makeSubLesson(19, 4, 'গল্প ৪: বৃদ্ধ কৃষক ও চার ছেলে (একতাই বল)', 'এক বৃদ্ধ কৃষকের চার ছেলে সর্বদা কলহ করত...', '🤝', ['একতা'], 'মিলেমিশে থাকার অমিত শক্তি বুঝুন।', [
        { word: 'একতাই বল', icon: '🤝', ttsAudio: 'একতাই বল' },
      ]),
      makeSubLesson(19, 5, 'মূল্যবান নীতিবাক্য সংগ্রহ', 'সততাই সর্বোৎকৃষ্ট পন্থা, পরিশ্রম সৌভাগ্যের প্রসূতি', '📜', ['নীতিবাক্য'], 'জীবনের পথচলার অমূল্য নীতিবাণী।', [
        { word: 'সততা', icon: '⚖️', ttsAudio: 'সততাই সর্বোৎকৃষ্ট পন্থা' },
        { word: 'পরিশ্রম', icon: '🌾', ttsAudio: 'পরিশ্রম সৌভাগ্যের প্রসূতি' },
      ]),
      makeSubLesson(19, 6, 'গল্পের চরিত্র ও নীতিকথা মূল্যায়ন', 'কাকের বুদ্ধি ও কচ্ছপের ধৈর্যের শিক্ষা', '💡', ['মূল্যায়ন'], 'গল্প থেকে অর্জিত শিক্ষা নিজের জীবনে ধারণ করুন।', [
        { word: 'বুদ্ধির জয়', icon: '🧠', ttsAudio: 'বুদ্ধির জয়' },
      ]),
      makeSubLesson(19, 7, 'ধাপ ১৯ কুইজ: নীতিকথা পরীক্ষা', 'ছবি দেখে সঠিক উত্তর নির্বাচন ও ধাপ ২০ খোলা', '🏆', ['কাক', 'কচ্ছপ'], 'ছবি দেখে সঠিক উত্তরে চাপ দিন।', [], {
        audioPrompt: "বুদ্ধি করে কলসিতে নুড়ি পাথর ফেলা বুদ্ধিমান 'কাক' কোনটি?",
        options: [
          { id: 'q1', displayText: 'বুদ্ধিমান কাক', iconSymbol: '🦅', isCorrect: true },
          { id: 'q2', displayText: 'ধীর কচ্ছপ', iconSymbol: '🐢', isCorrect: false },
          { id: 'q3', displayText: 'অহংকারী খরগোশ', iconSymbol: '🐇', isCorrect: false },
        ],
      }),
    ],
  },

  {
    id: 20,
    bengaliNum: '২০',
    title: 'সর্বোচ্চ পঠন দক্ষতা ও সাহিত্য পাঠ',
    subtitle: 'সংবাদপত্রের অংশ, রবীন্দ্র-নজরুল সাহিত্য ও পূর্ণাঙ্গ জ্ঞান',
    category: 'advanced',
    icon: '👑',
    color: '#E11D48',
    description: 'সংবাদপত্র পাঠ, গীতাঞ্জলি ও চল্ চল্ চল্ এর সাহিত্য রস এবং আজীবন বাংলা পঠন সিদ্ধি।',
    sampleWords: [
      { word: 'দৈনিক সংবাদ', icon: '📰', ttsAudio: 'দৈনিক সংবাদ পাঠ' },
      { word: 'রবীন্দ্র সাহিত্য', icon: '📜', ttsAudio: 'রবীন্দ্রনাথ ঠাকুরের সাহিত্য' },
      { word: 'নজরুল গীতি', icon: '🔥', ttsAudio: 'কাজী নজরুল ইসলামের কবিতা' },
    ],
    subLessons: [
      makeSubLesson(20, 1, 'সংবাদপত্র পাঠ: বিজ্ঞান ও পরিবেশ', 'আজ জাতীয় বিজ্ঞান মেলায় নবীন বিজ্ঞানীদের উদ্ভাবনী আবিষ্কার প্রদর্শিত হয়...', '📰', ['সংবাদ', 'বিজ্ঞান'], 'প্রকৃত সংবাদপত্রের বাস্তব পাঠ শৈলী।', [
        { word: 'বিজ্ঞান মেলা', icon: '🔬', ttsAudio: 'বিজ্ঞান মেলা' },
        { word: 'উদ্ভাবনী প্রযুক্তি', icon: '💻', ttsAudio: 'উদ্ভাবনী প্রযুক্তি' },
      ]),
      makeSubLesson(20, 2, 'রবীন্দ্রনাথ ঠাকুরের কালজয়ী সাহিত্য', 'চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত...', '📜', ['রবীন্দ্রনাথ'], 'বিশ্বকবির অমর বাণীর অর্থ ও সৌন্দর্য।', [
        { word: 'চিত্ত যেথা ভয়শূন্য', icon: '⭐', ttsAudio: 'চিত্ত যেথা ভয়শূন্য উচ্চ যেথা শির' },
      ]),
      makeSubLesson(20, 3, 'কাজী নজরুল ইসলামের তেজস্বী কবিতা', 'চল্ চল্ চল্! ঊর্ধ্ব গগনে বাজে মাদল, নিম্নে উতলা ধরণী তল...', '🔥', ['নজরুল'], 'বিদ্রোহী কবির উদাত্ত আহ্বানের তেজ।', [
        { word: 'চল্ চল্ চল্', icon: '🔥', ttsAudio: 'চল্ চল্ চল্ ঊর্ধ্ব গগনে বাজে মাদল' },
      ]),
      makeSubLesson(20, 4, 'সুকুমার রায়ের মজার শিশুসাহিত্য', 'হাঁস ছিল সজারুও ব্যাকরণ মানি, হয়ে গেল হাঁসজারু কেমনে তা জানি...', '🦆', ['সুকুমার রায়'], 'বাংলা হাসির সাহিত্যের নিখাদ আনন্দ।', [
        { word: 'হাঁসজারু', icon: '🦆', ttsAudio: 'হাঁস ছিল সজারুও ব্যাকরণ মানি' },
      ]),
      makeSubLesson(20, 5, 'সম্পাদকীয় ও সমকালীন নিবন্ধ পাঠ', 'পরিবেশ সংরক্ষণ ও ভবিষ্যৎ পৃথিবীর সবুজ রূপরেখা...', '🌍', ['সম্পাদকীয়'], 'গভীর চিন্তামূলক নিবন্ধ পাঠের ক্ষমতা।', [
        { word: 'সবুজ পৃথিবী', icon: '🌍', ttsAudio: 'সবুজ পৃথিবী' },
      ]),
      makeSubLesson(20, 6, 'আজীবন পঠন সিদ্ধি ও বাচনভঙ্গি', 'স্পর্শ, আবেগ ও যতিচিহ্ন বজায় রেখে আবৃত্তি', '🎙️', ['বাচনভঙ্গি'], 'পরিপূর্ণ বাংলা বাচনভঙ্গির চূড়ান্ত দক্ষতা।', [
        { word: 'শুদ্ধ উচ্চারণ', icon: '🗣️', ttsAudio: 'শুদ্ধ ও স্পষ্ট উচ্চারণ' },
      ]),
      makeSubLesson(20, 7, 'ধাপ ২০ চূড়ান্ত সমাপনী কুইজ', 'মাস্টার মূল্যায়ন ও বাংলা পাঠশালার সর্বোচ্চ সনদ', '👑', ['মাস্টার', 'সনদ'], 'চূড়ান্ত প্রশ্নের উত্তর দিয়ে কোর্স সম্পন্ন করুন।', [], {
        audioPrompt: "বাংলা সাহিত্যের কালজয়ী সংবাদপত্র ও গ্রন্থ পাঠের প্রতীক কোনটি?",
        options: [
          { id: 'q1', displayText: 'দৈনিক সংবাদপত্র', iconSymbol: '📰', isCorrect: true },
          { id: 'q2', displayText: 'কলম ও বই', iconSymbol: '✒️', isCorrect: false },
          { id: 'q3', displayText: 'বাতি', iconSymbol: '💡', isCorrect: false },
        ],
      }),
    ],
  },
];

// Helper to get 20 levels
export const getTwentyLevelsData = (): LevelCurriculumItem[] => {
  return TWENTY_LEVELS_METADATA;
};

// Helper to get level by ID
export const getLevelById = (id: number): LevelCurriculumItem | undefined => {
  return TWENTY_LEVELS_METADATA.find((l) => l.id === id);
};
