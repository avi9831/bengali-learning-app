// lib/repositories/CurriculumRepository.ts
// Scalable Repository Pattern for Offline Bengali Learning
// Solves data binding bug by strictly enforcing composite-key exact mapping

import {
  ExactWordExample,
  LetterItem,
  KarSignItem,
  PhalaSignItem,
  DayCurriculumItem,
  SubLessonItem,
  LevelCurriculumItem,
} from '../models/curriculumModels';
import {
  TWENTY_LEVELS_METADATA,
  getTwentyLevelsData,
  getLevelById as getLevelByIdFromData,
} from './curriculum20LevelsData';
import CURRICULUM_DATABASE from './curriculum_db.json';
import {
  EXPANDED_VOWELS_DATA,
  EXPANDED_CONSONANTS_DATA,
  ALPHABET_STRICT_DICTIONARY,
  getLetterByCharStrict,
} from './alphabetData';
import { EXPANDED_KAR_WORD_MAP } from './karData';
import { EXPANDED_PHALA_MAP } from './phalaData';
import { EXPANDED_JUKTAKKHOR_MAP } from './juktakkhorData';
import {
  THEMATIC_VOCABULARY,
  TWO_WORD_SENTENCES,
  STANDARD_SENTENCES,
  findSentenceWordBreakdown,
  loadSentenceDatabase,
  ThematicWordItem,
  TwoWordSentenceItem,
  StandardSentenceItem,
} from './sentence_repository';
import {
  PARAGRAPH_COLLECTION,
  MORAL_STORIES,
  findStoryWordBreakdown,
  loadFullStories,
  ParagraphItem,
  StoryItem,
  StoryWordData,
} from './story_repository';
import { databaseService } from './DatabaseService';

// -------------------------------------------------------------
// EXACT DICTIONARY MAPS (STRICT BINDING - NO CROSS POLLUTION)
// -------------------------------------------------------------

// Exact mapping for Consonant + Kar sign combinations
const EXACT_KAR_WORD_MAP: Record<string, ExactWordExample[]> = {
  // 'কা' (ক + া) - Strictly words starting with or formed by কা
  কা: [
    { word: 'কাক', icon: '🦅', meaning: 'পাখি', ttsAudio: 'কাক' },
    { word: 'কাগজ', icon: '📄', meaning: 'লেখার কাগজ', ttsAudio: 'কাগজ' },
    { word: 'কান', icon: '👂', meaning: 'শ্রবণেন্দ্রিয়', ttsAudio: 'কান' },
    { word: 'কাজু', icon: '🥜', meaning: 'বাদাম', ttsAudio: 'কাজু' },
  ],
  // 'খা' (খ + া) - Strictly words starting with or formed by খা (NEVER 'কাক'!)
  খা: [
    { word: 'খাতা', icon: '📓', meaning: 'লেখার খাতা', ttsAudio: 'খাতা' },
    { word: 'খাবার', icon: '🍲', meaning: 'আহার', ttsAudio: 'খাবার' },
    { word: 'খাঁচা', icon: '🦜', meaning: 'পাখির খাঁচা', ttsAudio: 'খাঁচা' },
  ],
  // 'গা' (গ + া) - Strictly words starting with গা
  গা: [
    { word: 'গান', icon: '🎶', meaning: 'সঙ্গীত', ttsAudio: 'গান' },
    { word: 'গাছ', icon: '🌳', meaning: 'বৃক্ষ', ttsAudio: 'গাছ' },
    { word: 'গাড়ি', icon: '🚗', meaning: 'যানবাহন', ttsAudio: 'গাড়ি' },
  ],
  // 'ঘা' (ঘ + া)
  ঘা: [
    { word: 'ঘাস', icon: '🌱', meaning: 'তৃণ', ttsAudio: 'ঘাস' },
    { word: 'ঘড়ি', icon: '⏰', meaning: 'সময় দেখার যন্ত্র', ttsAudio: 'ঘড়ি' },
    { word: 'ঘাট', icon: '⛵', meaning: 'নদীর ঘাট', ttsAudio: 'ঘাট' },
  ],
  // 'চা' (চ + া)
  চা: [
    { word: 'চা', icon: '☕', meaning: 'গরম পানীয়', ttsAudio: 'চা' },
    { word: 'চাবি', icon: '🔑', meaning: 'তালার কাঠি', ttsAudio: 'চাবি' },
    { word: 'চাদর', icon: '🛏️', meaning: 'বিছানার চাদর', ttsAudio: 'চাদর' },
  ],
  // 'ছা' (ছ + া)
  ছা: [
    { word: 'ছাতা', icon: '☂️', meaning: 'বৃষ্টির ছাতা', ttsAudio: 'ছাতা' },
    { word: 'ছাত্র', icon: '🎒', meaning: 'পড়ুয়া', ttsAudio: 'ছাত্র' },
    { word: 'ছাগল', icon: '🐐', meaning: 'গৃহপালিত পশু', ttsAudio: 'ছাগল' },
  ],
  // 'জা' (জ + া)
  জা: [
    { word: 'জাম', icon: '🫐', meaning: 'রসালো ফল', ttsAudio: 'জাম' },
    { word: 'জাল', icon: '🕸️', meaning: 'মাছ ধরার জাল', ttsAudio: 'জাল' },
    { word: 'জাহাজ', icon: '🚢', meaning: 'বড় জলযান', ttsAudio: 'জাহাজ' },
  ],
  // 'ঝা' (ঝ + া)
  ঝা: [
    { word: 'ঝাড়ু', icon: '🧹', meaning: 'পরিষ্কারের কাঠি', ttsAudio: 'ঝাড়ু' },
    { word: 'ঝাল', icon: '🌶️', meaning: 'মরিচের স্বাদ', ttsAudio: 'ঝাল' },
  ],
  // 'টা' (ট + া)
  টা: [
    { word: 'টাকা', icon: '💵', meaning: 'মুদ্রা', ttsAudio: 'টাকা' },
    { word: 'টমেটো', icon: '🍅', meaning: 'সবজি ফল', ttsAudio: 'টমেটো' },
  ],
  // 'ঠা' (ঠ + া)
  ঠা: [
    { word: 'ঠান্ডা', icon: '🧊', meaning: 'শীতল', ttsAudio: 'ঠান্ডা' },
    { word: 'ঠাকুর', icon: '👴', meaning: 'ঠাকুরদা', ttsAudio: 'ঠাকুর' },
  ],
  // 'ডা' (ড + া)
  ডা: [
    { word: 'ডাল', icon: '🥣', meaning: 'খাবার ডাল', ttsAudio: 'ডাল' },
    { word: 'ডাক্তার', icon: '🩺', meaning: 'চিকিৎসক', ttsAudio: 'ডাক্তার' },
    { word: 'ডালিম', icon: '🍎', meaning: 'ফল', ttsAudio: 'ডালিম' },
  ],
  // 'ঢা' (ঢ + া)
  ঢা: [
    { word: 'ঢাক', icon: '🥁', meaning: 'বাদ্যযন্ত্র', ttsAudio: 'ঢাক' },
    { word: 'ঢাল', icon: '🛡️', meaning: 'যুদ্ধের ঢাল', ttsAudio: 'ঢাল' },
  ],
  // 'তা' (ত + া)
  তা: [
    { word: 'তালা', icon: '🔒', meaning: 'দরজার তালা', ttsAudio: 'তালা' },
    { word: 'তারা', icon: '⭐', meaning: 'আকাশের নক্ষত্র', ttsAudio: 'তারা' },
    { word: 'তাল', icon: '🌴', meaning: 'মিষ্টি ফল', ttsAudio: 'তাল' },
  ],
  // 'থা' (থ + া)
  থা: [
    { word: 'থালা', icon: '🍽️', meaning: 'খাবার পাত্র', ttsAudio: 'থালা' },
    { word: 'থাবা', icon: '🐾', meaning: 'পশুর পা', ttsAudio: 'থাবা' },
  ],
  // 'দা' (দ + া)
  দা: [
    { word: 'দাদা', icon: '👴', meaning: 'পিতামহ', ttsAudio: 'দাদা' },
    { word: 'দালান', icon: '🏢', meaning: 'পাকা বাড়ি', ttsAudio: 'দালান' },
    { word: 'দাম', icon: '🏷️', meaning: 'মূল্য', ttsAudio: 'দাম' },
  ],
  // 'ধা' (ধ + া)
  ধা: [
    { word: 'ধান', icon: '🌾', meaning: 'শস্য', ttsAudio: 'ধান' },
    { word: 'ধাপ', icon: '🪜', meaning: 'সিঁড়ির ধাপ', ttsAudio: 'ধাপ' },
  ],
  // 'না' (ন + া)
  না: [
    { word: 'নাম', icon: '🏷️', meaning: 'পরিচয়', ttsAudio: 'নাম' },
    { word: 'নাক', icon: '👃', meaning: 'ঘ্রাণেন্দ্রিয়', ttsAudio: 'নাক' },
    { word: 'নাচ', icon: '💃', meaning: 'নৃত্য', ttsAudio: 'নাচ' },
    { word: 'নাবিক', icon: '🧭', meaning: 'জাহাজ চালক', ttsAudio: 'নাবিক' },
  ],
  // 'পা' (প + া)
  পা: [
    { word: 'পাখি', icon: '🐦', meaning: 'বিহঙ্গ', ttsAudio: 'পাখি' },
    { word: 'পাতা', icon: '🍃', meaning: 'গাছের পাতা', ttsAudio: 'পাতা' },
    { word: 'পাহাড়', icon: '⛰️', meaning: 'পর্বত', ttsAudio: 'পাহাড়' },
    { word: 'পানি', icon: '💧', meaning: 'জল', ttsAudio: 'পানি' },
  ],
  // 'ফা' (ফ + া)
  ফা: [
    { word: 'ফাঁদ', icon: '🪤', meaning: 'শিকারের ফাঁদ', ttsAudio: 'ফাঁদ' },
    { word: 'ফাল্গুন', icon: '🌸', meaning: 'বসন্তের মাস', ttsAudio: 'ফাল্গুন' },
  ],
  // 'বা' (ব + া)
  বা: [
    { word: 'বাঘ', icon: '🐅', meaning: 'বনের পশু', ttsAudio: 'বাঘ' },
    { word: 'বাবা', icon: '👨', meaning: 'পিতা', ttsAudio: 'বাবা' },
    { word: 'বাড়ি', icon: '🏠', meaning: 'বাসস্থান', ttsAudio: 'বাড়ি' },
    { word: 'বাতাস', icon: '💨', meaning: 'হাওয়া', ttsAudio: 'বাতাস' },
  ],
  // 'ভা' (ভ + া)
  ভা: [
    { word: 'ভাত', icon: '🍚', meaning: 'অন্ন', ttsAudio: 'ভাত' },
    { word: 'ভালুক', icon: '🐻', meaning: 'বন্য প্রাণী', ttsAudio: 'ভালুক' },
    { word: 'ভাই', icon: '👦', meaning: 'সহোদর', ttsAudio: 'ভাই' },
  ],
  // 'মা' (ম + া)
  মা: [
    { word: 'মা', icon: '👩', meaning: 'জননী', ttsAudio: 'মা' },
    { word: 'মাটি', icon: '🪴', meaning: 'মৃত্তিকা', ttsAudio: 'মাটি' },
    { word: 'মামা', icon: '🧔', meaning: 'মাতুল', ttsAudio: 'মামা' },
    { word: 'মাছ', icon: '🐟', meaning: 'জলজ প্রাণী', ttsAudio: 'মাছ' },
  ],
  // 'যা' (য + া)
  যা: [
    { word: 'যাঁতা', icon: '⚙️', meaning: 'শস্য পেষার পাথর', ttsAudio: 'যাঁতা' },
    { word: 'যাত্রা', icon: '🧳', meaning: 'গমন', ttsAudio: 'যাত্রা' },
  ],
  // 'রা' (র + া)
  রা: [
    { word: 'রাস্তা', icon: '🛣️', meaning: 'পথ', ttsAudio: 'রাস্তা' },
    { word: 'রাত', icon: '🌙', meaning: 'রজনী', ttsAudio: 'রাত' },
    { word: 'রাজা', icon: '👑', meaning: 'নৃপতি', ttsAudio: 'রাজা' },
  ],
  // 'লা' (ল + া)
  লা: [
    { word: 'লাটিম', icon: '🪀', meaning: 'খেলনা', ttsAudio: 'লাটিম' },
    { word: 'লাল', icon: '🔴', meaning: 'রং', ttsAudio: 'লাল' },
    { word: 'লাউ', icon: '🥒', meaning: 'সবজি', ttsAudio: 'লাউ' },
  ],
  // 'শা' (শ + া)
  শা: [
    { word: 'শাপলা', icon: '🌺', meaning: 'জাতীয় ফুল', ttsAudio: 'শাপলা' },
    { word: 'শাক', icon: '🥬', meaning: 'সবজি', ttsAudio: 'শাক' },
    { word: 'শালিক', icon: '🐦', meaning: 'পাখি', ttsAudio: 'শালিক' },
  ],
  // 'ষা' (ষ + া)
  ষা: [
    { word: 'ষাঁড়', icon: '🐂', meaning: 'বলদ', ttsAudio: 'ষাঁড়' },
    { word: 'ষাট', icon: '🔢', meaning: 'সংখ্যা ৬০', ttsAudio: 'ষাট' },
  ],
  // 'সা' (স + া)
  সা: [
    { word: 'সাদা', icon: '⚪', meaning: 'শুভ্র রং', ttsAudio: 'সাদা' },
    { word: 'সাবান', icon: '🧼', meaning: 'পরিষ্কারক', ttsAudio: 'সাবান' },
    { word: 'সাপ', icon: '🐍', meaning: 'সরীসৃপ', ttsAudio: 'সাপ' },
  ],
  // 'হা' (হ + া)
  হা: [
    { word: 'হাত', icon: '✋', meaning: 'শরীরের অঙ্গ', ttsAudio: 'হাত' },
    { word: 'হাঁস', icon: '🦆', meaning: 'জলচর পাখি', ttsAudio: 'হাঁস' },
    { word: 'হাতি', icon: '🐘', meaning: 'বিশাল বন্য প্রাণী', ttsAudio: 'হাতি' },
  ],

  // 'ি' (হ্রস্ব ই-কার)
  কি: [
    { word: 'কিশোর', icon: '👦', meaning: 'বালক', ttsAudio: 'কিশোর' },
    { word: 'কিনারা', icon: '🌊', meaning: 'নদীর তীর', ttsAudio: 'কিনারা' },
  ],
  খি: [
    { word: 'খিচুড়ি', icon: '🍲', meaning: 'সুস্বাদু খাবার', ttsAudio: 'খিচুড়ি' },
  ],
  গি: [
    { word: 'গির্জা', icon: '⛪', meaning: 'উপাসনালয়', ttsAudio: 'গির্জা' },
  ],
  চি: [
    { word: 'চিঠি', icon: '✉️', meaning: 'পত্র', ttsAudio: 'চিঠি' },
    { word: 'চিরুনি', icon: '🪮', meaning: 'চুল আঁচড়ানোর জিনিস', ttsAudio: 'চিরুনি' },
    { word: 'চিংড়ি', icon: '🦐', meaning: 'মাছ', ttsAudio: 'চিংড়ি' },
  ],
  ছি: [
    { word: 'ছিপ', icon: '🎣', meaning: 'মাছ ধরার ছিপ', ttsAudio: 'ছিপ' },
  ],
  জি: [
    { word: 'জিভ', icon: '👅', meaning: 'স্বাদেন্দ্রিয়', ttsAudio: 'জিভ' },
    { word: 'জিরাফ', icon: '🦒', meaning: 'লম্বা প্রাণী', ttsAudio: 'জিরাফ' },
  ],
  টি: [
    { word: 'টিয়া', icon: '🦜', meaning: 'সবুজ পাখি', ttsAudio: 'টিয়া' },
    { word: 'টিকেট', icon: '🎟️', meaning: 'যাত্রার টিকিট', ttsAudio: 'টিকেট' },
  ],
  ডি: [
    { word: 'ডিম', icon: '🥚', meaning: 'পাখির ডিম', ttsAudio: 'ডিম' },
  ],
  তি: [
    { word: 'তিমি', icon: '🐋', meaning: 'সমুদ্রের বড় প্রাণী', ttsAudio: 'তিমি' },
    { word: 'তিন', icon: '৩️⃣', meaning: 'সংখ্যা ৩', ttsAudio: 'তিন' },
  ],
  দি: [
    { word: 'দিন', icon: '☀️', meaning: 'দিবস', ttsAudio: 'দিন' },
    { word: 'দিঘি', icon: '🌊', meaning: 'বড় পুকুর', ttsAudio: 'দিঘি' },
  ],
  নি: [
    { word: 'নিশানা', icon: '🎯', meaning: 'লক্ষ্য', ttsAudio: 'নিশানা' },
    { word: 'নিয়ম', icon: '📜', meaning: 'নীতি', ttsAudio: 'নিয়ম' },
  ],
  পি: [
    { word: 'পিঠা', icon: '🥟', meaning: 'বাংলার ঐতিহ্যবাহী খাবার', ttsAudio: 'পিঠা' },
    { word: 'পিপীলিকা', icon: '🐜', meaning: 'পিঁপড়ে', ttsAudio: 'পিপীলিকা' },
  ],
  বি: [
    { word: 'বিড়াল', icon: '🐱', meaning: 'পোষা প্রাণী', ttsAudio: 'বিড়াল' },
    { word: 'বিজয়', icon: '🏆', meaning: 'জয়', ttsAudio: 'বিজয়' },
    { word: 'বিমান', icon: '✈️', meaning: 'উড়োজাহাজ', ttsAudio: 'বিমান' },
  ],
  মি: [
    { word: 'মিষ্টি', icon: '🍬', meaning: 'মিষ্টান্ন', ttsAudio: 'মিষ্টি' },
    { word: 'মিতা', icon: '🤝', meaning: 'বন্ধু', ttsAudio: 'মিতা' },
  ],
  রি: [
    { word: 'রিকশা', icon: '🛺', meaning: 'তিন চাকার বাহন', ttsAudio: 'রিকশা' },
  ],
  লি: [
    { word: 'লিচু', icon: '🍒', meaning: 'মিষ্টি লাল ফল', ttsAudio: 'লিচু' },
  ],
  শি: [
    { word: 'শিশু', icon: '👶', meaning: 'ছোট বাচ্চা', ttsAudio: 'শিশু' },
    { word: 'শিকার', icon: '🏹', meaning: 'বন্য শিকার', ttsAudio: 'শিকার' },
  ],
  সি: [
    { word: 'সিতারা', icon: '⭐', meaning: 'তারা', ttsAudio: 'সিতারা' },
  ],
  হি: [
    { word: 'হিমেল', icon: '❄️', meaning: 'শীতল হাওয়া', ttsAudio: 'হিমেল' },
    { word: 'হিসাব', icon: '🧮', meaning: 'গণনা', ttsAudio: 'হিসাব' },
  ],

  // 'ী' (দীর্ঘ ঈ-কার)
  কী: [{ word: 'কীট', icon: '🐛', meaning: 'ছোট পোকা', ttsAudio: 'কীট' }],
  গী: [{ word: 'গীত', icon: '🎵', meaning: 'গান', ttsAudio: 'গীত' }],
  তী: [{ word: 'তীর', icon: '🏹', meaning: 'বাণ', ttsAudio: 'তীর' }],
  দী: [{ word: 'দীপ', icon: '🪔', meaning: 'প্রদীপ', ttsAudio: 'দীপ' }],
  নী: [{ word: 'নীল', icon: '🔷', meaning: 'রং', ttsAudio: 'নীল' }],
  পী: [{ word: 'পীড়া', icon: '🤕', meaning: 'কষ্ট', ttsAudio: 'পীড়া' }],
  বী: [{ word: 'বীজ', icon: '🌱', meaning: 'চারা তৈরির বীজ', ttsAudio: 'বীজ' }],
  শী: [{ word: 'শীর্ষ', icon: '🏔️', meaning: 'উঁচু চূড়া', ttsAudio: 'শীর্ষ' }],

  // 'ু' (হ্রস্ব উ-কার)
  কু: [
    { word: 'কুকুর', icon: '🐕', meaning: 'বিশ্বস্ত পশু', ttsAudio: 'কুকুর' },
    { word: 'কুঁড়ে', icon: '🛖', meaning: 'ছোট ঘর', ttsAudio: 'কুঁড়ে' },
    { word: 'কুসুম', icon: '🌼', meaning: 'ফুল', ttsAudio: 'কুসুম' },
  ],
  খু: [
    { word: 'খুশি', icon: '😊', meaning: 'আনন্দিত', ttsAudio: 'খুশি' },
  ],
  গু: [
    { word: 'গুড়', icon: '🍯', meaning: 'মিষ্টি গুড়', ttsAudio: 'গুড়' },
    { word: 'গুহা', icon: '🕳️', meaning: 'পাহাড়ের গর্ত', ttsAudio: 'গুহা' },
  ],
  ঘু: [
    { word: 'ঘুড়ি', icon: '🪁', meaning: 'আকাশে ওড়ে', ttsAudio: 'ঘুড়ি' },
    { word: 'ঘুম', icon: '😴', meaning: 'নিদ্রা', ttsAudio: 'ঘুম' },
  ],
  চু: [
    { word: 'চুল', icon: '💇', meaning: 'মাথার কেশ', ttsAudio: 'চুল' },
    { word: 'চুপ', icon: '🤫', meaning: 'নীরব থাকা', ttsAudio: 'চুপ' },
  ],
  ছু: [
    { word: 'ছুটি', icon: '🎉', meaning: 'কাজের বিরতি', ttsAudio: 'ছুটি' },
    { word: 'ছুরি', icon: '🔪', meaning: 'কাটার অস্ত্র', ttsAudio: 'ছুরি' },
  ],
  ঝু: [
    { word: 'ঝুড়ি', icon: '🧺', meaning: 'ডালা', ttsAudio: 'ঝুড়ি' },
  ],
  টু: [
    { word: 'টুপি', icon: '🧢', meaning: 'মাথায় পড়ার টুপি', ttsAudio: 'টুপি' },
  ],
  ডু: [
    { word: 'ডুব', icon: '🏊', meaning: 'পানিতে নিমজ্জন', ttsAudio: 'ডুব' },
  ],
  তু: [
    { word: 'তুলা', icon: '☁️', meaning: 'নরম কার্পাস', ttsAudio: 'তুলা' },
  ],
  দু: [
    { word: 'দুধ', icon: '🥛', meaning: 'সাদাসিধা পানীয়', ttsAudio: 'দুধ' },
    { word: 'দুপুর', icon: '☀️', meaning: 'দিনের মধ্যভাগ', ttsAudio: 'দুপুর' },
  ],
  ফু: [
    { word: 'ফুল', icon: '🌸', meaning: 'পুষ্প', ttsAudio: 'ফুল' },
  ],
  বু: [
    { word: 'বুলবুলি', icon: '🐦', meaning: 'সুন্দর পাখি', ttsAudio: 'বুলবুলি' },
    { word: 'বুক', icon: '🫁', meaning: 'বক্ষ', ttsAudio: 'বুক' },
  ],
  মু: [
    { word: 'মুখ', icon: '😃', meaning: 'বদন', ttsAudio: 'মুখ' },
    { word: 'মুড়ি', icon: '🍿', meaning: 'ভাজা চালের খাবার', ttsAudio: 'মুড়ি' },
  ],
  রু: [
    { word: 'রুটি', icon: '🫓', meaning: 'খাবার', ttsAudio: 'রুটি' },
  ],
  সু: [
    { word: 'সুখ', icon: '✨', meaning: 'শান্তি ও আনন্দ', ttsAudio: 'সুখ' },
    { word: 'সুর', icon: '🎶', meaning: 'গানের রাগ', ttsAudio: 'সুর' },
  ],

  // 'ূ' (দীর্ঘ ঊ-কার)
  কূ: [{ word: 'কূপ', icon: '🕳️', meaning: 'কুয়ো', ttsAudio: 'কূপ' }],
  মূ: [{ word: 'মূল', icon: '🥕', meaning: 'শিকড়', ttsAudio: 'মূল' }],
  সূ: [
    { word: 'সূর্য', icon: '☀️', meaning: 'রবি', ttsAudio: 'সূর্য' },
    { word: 'সূতা', icon: '🧵', meaning: 'বোনা রশি', ttsAudio: 'সূতা' },
  ],

  // 'ে' (এ-কার)
  কে: [
    { word: 'কেক', icon: '🍰', meaning: 'মিষ্টি খাবার', ttsAudio: 'কেক' },
    { word: 'কেশর', icon: '🦁', meaning: 'সিংহের ঘাড়ের চুল', ttsAudio: 'কেশর' },
  ],
  খে: [
    { word: 'খেলা', icon: '⚽', meaning: 'ক্রীড়া', ttsAudio: 'খেলা' },
    { word: 'খেত', icon: '🌾', meaning: 'ফসলের জমি', ttsAudio: 'খেত' },
  ],
  পে: [
    { word: 'পেঁপে', icon: '🍈', meaning: 'ফল', ttsAudio: 'পেঁপে' },
    { word: 'পেন্সিল', icon: '✏️', meaning: 'লেখার কাঠি', ttsAudio: 'পেন্সিল' },
  ],
  বে: [
    { word: 'বেল', icon: '🔔', meaning: 'ঘণ্টা', ttsAudio: 'বেল' },
    { word: 'বেহালা', icon: '🎻', meaning: 'বাদ্যযন্ত্র', ttsAudio: 'বেহালা' },
  ],
  মে: [
    { word: 'মেঘ', icon: '☁️', meaning: 'আকাশের বাদল', ttsAudio: 'মেঘ' },
    { word: 'মেলা', icon: '🎡', meaning: 'উৎসবের জমায়েত', ttsAudio: 'মেলা' },
  ],
  রে: [
    { word: 'রেলগাড়ি', icon: '🚆', meaning: 'লোহার ট্রেন', ttsAudio: 'রেলগাড়ি' },
  ],
  লে: [
    { word: 'লেবু', icon: '🍋', meaning: 'টক ফল', ttsAudio: 'লেবু' },
  ],
  শে: [
    { word: 'শের', icon: '🦁', meaning: 'সিংহ', ttsAudio: 'শের' },
  ],

  // 'ো' (ও-কার)
  কো: [{ word: 'কোকিল', icon: '🐦', meaning: 'মিষ্টি কণ্ঠের পাখি', ttsAudio: 'কোকিল' }],
  গো: [
    { word: 'গোলাপ', icon: '🌹', meaning: 'সুন্দর ফুল', ttsAudio: 'গোলাপ' },
    { word: 'গোল', icon: '⚽', meaning: 'বৃত্তাকার', ttsAudio: 'গোল' },
  ],
  ঘো: [{ word: 'ঘোড়া', icon: '🐎', meaning: 'দ্রুতগামী বাহন', ttsAudio: 'ঘোড়া' }],
  চো: [
    { word: 'চোখ', icon: '👁️', meaning: 'দর্শনেন্দ্রিয়', ttsAudio: 'চোখ' },
    { word: 'চোর', icon: '🥷', meaning: 'অপরাধী', ttsAudio: 'চোর' },
  ],
  টো: [{ word: 'টোকাই', icon: '🧺', meaning: 'কুড়ানি', ttsAudio: 'টোকাই' }],
  দো: [{ word: 'দোয়েল', icon: '🐦', meaning: 'জাতীয় পাখি', ttsAudio: 'দোয়েল' }],
  ধো: [{ word: 'ধোয়া', icon: '🧼', meaning: 'পরিষ্কার করা', ttsAudio: 'ধোয়া' }],
  পো: [{ word: 'পোশাক', icon: '👕', meaning: 'বস্ত্র', ttsAudio: 'পোশাক' }],
  বো: [{ word: 'বোতল', icon: '🧴', meaning: 'জলপাত্র', ttsAudio: 'বোতল' }],
  ভো: [{ word: 'ভোর', icon: '🌅', meaning: 'সকালবেলা', ttsAudio: 'ভোর' }],
  মো: [{ word: 'মোরগ', icon: '🐓', meaning: 'পাখি', ttsAudio: 'মোরগ' }],
  রো: [{ word: 'রোদ', icon: '☀️', meaning: 'সূর্যের আলো', ttsAudio: 'রোদ' }],
  লো: [
    { word: 'লোক', icon: '🚶', meaning: 'মানুষ', ttsAudio: 'লোক' },
    { word: 'লোহা', icon: '🧲', meaning: 'শক্ত ধাতু', ttsAudio: 'লোহা' },
  ],
  সো: [{ word: 'সোনা', icon: '🪙', meaning: 'মূল্যবান স্বর্ণ', ttsAudio: 'সোনা' }],
  হো: [{ word: 'হোটেল', icon: '🏨', meaning: 'অতিথিশালা', ttsAudio: 'হোটেল' }],
};

// Exact mapping for Phala combinations (Consonant + Phala sign)
const EXACT_PHALA_WORD_MAP: Record<string, ExactWordExample[]> = {
  // 'র-ফলা' combinations
  ক্র: [
    { word: 'ক্রিকেট', icon: '🏏', meaning: 'খেলা', ttsAudio: 'ক্রিকেট' },
    { word: 'বিক্রয়', icon: '🛒', meaning: 'বেচাকেনা', ttsAudio: 'বিক্রয়' },
    { word: 'চক্র', icon: '⚙️', meaning: 'চাকা', ttsAudio: 'চক্র' },
  ],
  গ্র: [
    { word: 'গ্রাম', icon: '🏡', meaning: 'পল্লী গাঁ', ttsAudio: 'গ্রাম' },
    { word: 'গ্রহ', icon: '🪐', meaning: 'মহাকাশের গ্রহ', ttsAudio: 'গ্রহ' },
    { word: 'অগ্র', icon: '⏩', meaning: 'সামনে', ttsAudio: 'অগ্র' },
  ],
  ব্র: [
    { word: 'ব্রত', icon: '🕯️', meaning: 'সাধনা', ttsAudio: 'ব্রত' },
    { word: 'ব্রাহ্মণ', icon: '🧘', meaning: 'পণ্ডিত', ttsAudio: 'ব্রাহ্মণ' },
  ],
  প্র: [
    { word: 'প্রথম', icon: '🥇', meaning: 'এক নম্বর', ttsAudio: 'প্রথম' },
    { word: 'প্রাণ', icon: '❤️', meaning: 'জীবন', ttsAudio: 'প্রাণ' },
    { word: 'প্রদীপ', icon: '🪔', meaning: 'মাটির বাতি', ttsAudio: 'প্রদীপ' },
  ],
  ত্র: [
    { word: 'ছাত্র', icon: '🎒', meaning: 'শিক্ষার্থী', ttsAudio: 'ছাত্র' },
    { word: 'ত্রাণ', icon: '📦', meaning: 'সাহায্য সামগ্রী', ttsAudio: 'ত্রাণ' },
    { word: 'রাত্রি', icon: '🌙', meaning: 'রাত', ttsAudio: 'রাত্রি' },
  ],
  ভ্র: [
    { word: 'ভ্রমণ', icon: '🧳', meaning: 'ঘুরে বেড়ানো', ttsAudio: 'ভ্রমণ' },
  ],
  শ্র: [
    { word: 'শ্রম', icon: '🛠️', meaning: 'পরিশ্রম', ttsAudio: 'শ্রম' },
    { word: 'শ্রদ্ধা', icon: '🙏', meaning: 'ভক্তি', ttsAudio: 'শ্রদ্ধা' },
    { word: 'শ্রাবণ', icon: '🌧️', meaning: 'বর্ষার মাস', ttsAudio: 'শ্রাবণ' },
  ],

  // 'য-ফলা' combinations
  ক্য: [
    { word: 'বাক্য', icon: '💬', meaning: 'মনের ভাব প্রকাশ', ttsAudio: 'বাক্য' },
    { word: 'ঐক্য', icon: '🤝', meaning: 'একতা', ttsAudio: 'ঐক্য' },
  ],
  দ্য: [
    { word: 'বিদ্যা', icon: '📚', meaning: 'জ্ঞান শিক্ষা', ttsAudio: 'বিদ্যা' },
    { word: 'অদ্য', icon: '📅', meaning: 'আজকের দিন', ttsAudio: 'অদ্য' },
  ],
  ধ্য: [
    { word: 'ধ্যান', icon: '🧘', meaning: 'মনোযোগ', ttsAudio: 'ধ্যান' },
  ],
  ন্য: [
    { word: 'ধন্যবাদ', icon: '🙏', meaning: 'কৃতজ্ঞতা', ttsAudio: 'ধন্যবাদ' },
    { word: 'বন্যা', icon: '🌊', meaning: 'প্লাবন', ttsAudio: 'বন্যা' },
  ],
  ব্য: [
    { word: 'ব্যথা', icon: '🤕', meaning: 'বেদনা', ttsAudio: 'ব্যথা' },
    { word: 'ব্যক্তি', icon: '👤', meaning: 'মানুষ', ttsAudio: 'ব্যক্তি' },
  ],
  প্য: [
    { word: 'প্যারিস', icon: '🗼', meaning: 'শহর', ttsAudio: 'প্যারিস' },
  ],

  // 'ব-ফলা' combinations
  শ্ব: [
    { word: 'অশ্ব', icon: '🐎', meaning: 'ঘোড়া', ttsAudio: 'অশ্ব' },
    { word: 'বিশ্বাস', icon: '🤝', meaning: 'আস্থা', ttsAudio: 'বিশ্বাস' },
  ],
  দ্ব: [
    { word: 'দ্বার', icon: '🚪', meaning: 'দরজা', ttsAudio: 'দ্বার' },
    { word: 'দ্বীপ', icon: '🏝️', meaning: 'চারিদিকে জল', ttsAudio: 'দ্বীপ' },
  ],

  // 'ম-ফলা' combinations
  স্ম: [
    { word: 'স্মৃতি', icon: '🧠', meaning: 'মনে রাখা', ttsAudio: 'স্মৃতি' },
    { word: 'স্মরণ', icon: '💭', meaning: 'মনে করা', ttsAudio: 'স্মরণ' },
  ],
  দ্ম: [
    { word: 'পদ্ম', icon: '🪷', meaning: 'পদ্ম ফুল', ttsAudio: 'পদ্ম' },
  ],

  // 'ল-ফলা' combinations
  ক্লা: [{ word: 'ক্লাস', icon: '🏫', meaning: 'শ্রেণিকক্ষ', ttsAudio: 'ক্লাস' }],
  গ্লা: [{ word: 'গ্লাস', icon: '🥛', meaning: 'জল খাবার পাত্র', ttsAudio: 'গ্লাস' }],
};

// Exact mapping for Juktakkhor (2-Letter and 3-Letter Conjuncts)
const EXACT_JUKTAKKHOR_WORD_MAP: Record<string, ExactWordExample[]> = {
  ক্ষ: [
    { word: 'বৃক্ষ', icon: '🌳', meaning: 'গাছপালা', ttsAudio: 'বৃক্ষ' },
    { word: 'ক্ষমা', icon: '🕊️', meaning: 'মাফ করা', ttsAudio: 'ক্ষমা' },
    { word: 'শিক্ষা', icon: '📖', meaning: 'পড়াশোনা', ttsAudio: 'শিক্ষা' },
  ],
  ক্ত: [
    { word: 'রক্ত', icon: '🩸', meaning: 'লোহিত রক্ত', ttsAudio: 'রক্ত' },
    { word: 'ভক্তি', icon: '🙏', meaning: 'শ্রদ্ধা', ttsAudio: 'ভক্তি' },
  ],
  জ্ঞ: [
    { word: 'জ্ঞান', icon: '💡', meaning: 'প্রজ্ঞা', ttsAudio: 'জ্ঞান' },
    { word: 'বিজ্ঞানী', icon: '🔬', meaning: 'গবেষক', ttsAudio: 'বিজ্ঞানী' },
  ],
  ঞ্চ: [
    { word: 'মঞ্চ', icon: '🎭', meaning: 'নাটকের মঞ্চ', ttsAudio: 'মঞ্চ' },
    { word: 'পঞ্চম', icon: '৫️⃣', meaning: 'পাঁচ নম্বর', ttsAudio: 'পঞ্চম' },
  ],
  ঙ্গ: [
    { word: 'সঙ্গী', icon: '👥', meaning: 'বন্ধু', ttsAudio: 'সঙ্গী' },
    { word: 'অঙ্গ', icon: '💪', meaning: 'শরীরের অংশ', ttsAudio: 'অঙ্গ' },
  ],
  ণ্ড: [
    { word: 'ঠান্ডা', icon: '🧊', meaning: 'শীতল', ttsAudio: 'ঠান্ডা' },
    { word: 'ডিম্বাণু', icon: '🥚', meaning: 'ডিম্ব', ttsAudio: 'ডিম্বাণু' },
  ],
  ত্ত: [
    { word: 'উত্তর', icon: '🧭', meaning: 'দিক বা জবাব', ttsAudio: 'উত্তর' },
    { word: 'পত্তা', icon: '🍃', meaning: 'পাতা', ttsAudio: 'পত্তা' },
  ],
  ম্প: [
    { word: 'কম্পন', icon: '〰️', meaning: 'কাঁপন', ttsAudio: 'কম্পন' },
    { word: 'সম্পদ', icon: '💎', meaning: 'ধনরত্ন', ttsAudio: 'সম্পদ' },
  ],
  স্ত্র: [
    { word: 'বস্ত্র', icon: '👗', meaning: 'কাপড়', ttsAudio: 'বস্ত্র' },
    { word: 'অস্ত্র', icon: '🗡️', meaning: 'হাতিয়ার', ttsAudio: 'অস্ত্র' },
  ],
  স্ট্র: [
    { word: 'স্ট্র', icon: '🥤', meaning: 'পানীয়ের নল', ttsAudio: 'স্ট্র' },
    { word: 'স্ট্রবেরি', icon: '🍓', meaning: 'ফল', ttsAudio: 'স্ট্রবেরি' },
  ],
  স্প্র: [
    { word: 'স্প্রে', icon: '💨', meaning: 'সুগন্ধি ছিটানো', ttsAudio: 'স্প্রে' },
  ],
  ত্ত্ব: [
    { word: 'তত্ত্ব', icon: '📜', meaning: 'দর্শন নীতি', ttsAudio: 'তত্ত্ব' },
  ],
  ন্ত্র: [
    { word: 'যন্ত্র', icon: '⚙️', meaning: 'কলকব্জা', ttsAudio: 'যন্ত্র' },
    { word: 'মন্ত্র', icon: '🧘', meaning: 'পবিত্র বাণী', ttsAudio: 'মন্ত্র' },
  ],
};

// Base Consonants supported in the app
export const BASE_CONSONANTS: string[] = [
  'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ',
  'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ'
];

// Kar Signs metadata
export const KAR_SIGNS_LIST: KarSignItem[] = [
  { id: 'k1', sign: 'া', name: 'আ-কার', vowelOrigin: 'আ', sampleConsonant: 'ক' },
  { id: 'k2', sign: 'ি', name: 'হ্রস্ব ই-কার', vowelOrigin: 'ই', sampleConsonant: 'ক' },
  { id: 'k3', sign: 'ী', name: 'দীর্ঘ ঈ-কার', vowelOrigin: 'ঈ', sampleConsonant: 'ক' },
  { id: 'k4', sign: 'ু', name: 'হ্রস্ব উ-কার', vowelOrigin: 'উ', sampleConsonant: 'ক' },
  { id: 'k5', sign: 'ূ', name: 'দীর্ঘ ঊ-কার', vowelOrigin: 'ঊ', sampleConsonant: 'ক' },
  { id: 'k6', sign: 'ৃ', name: 'ঋ-কার', vowelOrigin: 'ঋ', sampleConsonant: 'ক' },
  { id: 'k7', sign: 'ে', name: 'এ-কার', vowelOrigin: 'এ', sampleConsonant: 'ক' },
  { id: 'k8', sign: 'ৈ', name: 'ঐ-কার', vowelOrigin: 'ঐ', sampleConsonant: 'ক' },
  { id: 'k9', sign: 'ো', name: 'ও-কার', vowelOrigin: 'ও', sampleConsonant: 'ক' },
  { id: 'k10', sign: 'ৌ', name: 'ঔ-কার', vowelOrigin: 'ঔ', sampleConsonant: 'ক' },
];

// Phala Signs metadata
export const PHALA_SIGNS_LIST: PhalaSignItem[] = [
  { id: 'p1', name: 'য-ফলা', sign: '্য', baseFormula: 'ব্যঞ্জনবর্ণ + য-ফলা', consonantOptions: ['ক', 'দ', 'ধ', 'ন', 'ব', 'প', 'ত'] },
  { id: 'p2', name: 'র-ফলা', sign: '্র', baseFormula: 'ব্যঞ্জনবর্ণ + র-ফলা', consonantOptions: ['ক', 'গ', 'ব', 'প', 'ত', 'ভ', 'শ'] },
  { id: 'p3', name: 'ল-ফলা', sign: '্ল', baseFormula: 'ব্যঞ্জনবর্ণ + ল-ফলা', consonantOptions: ['ক', 'গ', 'প', 'ম', 'শ'] },
  { id: 'p4', name: 'ব-ফলা', sign: '্ব', baseFormula: 'ব্যঞ্জনবর্ণ + ব-ফলা', consonantOptions: ['শ', 'দ', 'ধ', 'স', 'জ'] },
  { id: 'p5', name: 'ম-ফলা', sign: '্ম', baseFormula: 'ব্যঞ্জনবর্ণ + ম-ফলা', consonantOptions: ['স', 'দ', 'প', 'ভ', 'ত'] },
  { id: 'p6', name: 'ন-ফলা', sign: '্ন', baseFormula: 'ব্যঞ্জনবর্ণ + ন/ণ-ফলা', consonantOptions: ['গ', 'ত', 'ন', 'ষ', 'হ'] },
  { id: 'p7', name: 'রেফ', sign: 'র্', baseFormula: 'র + হসন্ত + ব্যঞ্জনবর্ণ', consonantOptions: ['ক', 'খ', 'গ', 'ঘ', 'চ', 'ত', 'দ', 'প', 'ম', 'য'] },
];

// 30-Day Multi-Day Curriculum Skeletons (20 minutes per day, Days 1 to 30)
const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBnDigit = (n: number): string =>
  String(n).split('').map((d) => BENGALI_NUMERALS[parseInt(d, 10)] ?? d).join('');

const RAW_THIRTY_DAYS: Omit<DayCurriculumItem, 'subLessons'>[] = [
  {
    dayNumber: 1,
    bengaliDay: 'দিন ১',
    title: 'স্বরবর্ণ প্রথম পাঠ',
    subtitle: 'অ, আ, ই, ঈ এর স্পষ্ট উচ্চারণ',
    icon: '🌱',
    targetMinutes: 20,
    completedMinutes: 20,
    isUnlocked: true,
    isCompleted: true,
    mappedLevelId: 1,
    focusKeys: ['অ', 'আ', 'ই', 'ঈ'],
    summary: 'মৌলিক ৪টি স্বরবর্ণ চেনা ও প্রতীক দেখে শব্দ উচ্চারণ।',
  },
  {
    dayNumber: 2,
    bengaliDay: 'দিন ২',
    title: 'স্বরবর্ণ দ্বিতীয় পাঠ',
    subtitle: 'উ, ঊ, ঋ, এ এর সহজ উচ্চারণ',
    icon: '🌾',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: true,
    isCompleted: false,
    mappedLevelId: 1,
    focusKeys: ['উ', 'ঊ', 'ঋ', 'এ'],
    summary: 'উট, ঊষা, ঋষি ও একতারা শব্দ অনুশীলন।',
  },
  {
    dayNumber: 3,
    bengaliDay: 'দিন ৩',
    title: 'স্বরবর্ণ সমাপনী পাঠ',
    subtitle: 'ঐ, ও, ঔ ও পূর্ণ স্বরবর্ণের পুনরাবৃত্তি',
    icon: '🪕',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 1,
    focusKeys: ['ঐ', 'ও', 'ঔ'],
    summary: '১১টি স্বরবর্ণের শ্রুতি ও দৃশ্যগত মেলবন্ধন।',
  },
  {
    dayNumber: 4,
    bengaliDay: 'দিন ৪',
    title: 'ব্যঞ্জনবর্ণ: ক-বর্গ ও চ-বর্গ',
    subtitle: 'ক, খ, গ, ঘ, ঙ, চ, ছ, জ, ঝ, ঞ ধ্বনি পরিচয়',
    icon: '🦅',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 1,
    focusKeys: ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'],
    summary: 'কাক, খরগোশ, চাঁদ, ছাতা ইত্যাদি ছবির মাধ্যমে শব্দ শেখা।',
  },
  {
    dayNumber: 5,
    bengaliDay: 'দিন ৫',
    title: 'ব্যঞ্জনবর্ণ সমাপনী ও ধাপ ১ কুইজ',
    subtitle: 'ট-বর্গ থেকে হ ও বিশেষ বর্ণ (ড়, ঢ়, য়, ৎ, ং, ঃ, ঁ)',
    icon: '🏆',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 1,
    focusKeys: ['ট', 'ত', 'প', 'য', 'র', 'ল', 'শ', 'স', 'হ'],
    summary: '৫০টি পূর্ণ অক্ষরের সামগ্রিক স্মৃতি ও উচ্চারণ পরীক্ষা।',
  },
  {
    dayNumber: 6,
    bengaliDay: 'দিন ৬',
    title: 'কার চিহ্ন: আ-কার (া) ও হ্রস্ব ই-কার (ি)',
    subtitle: 'কা, খা, গা, কি, খি, গি, দি, পি ইত্যাদি শব্দ গঠন',
    icon: '🦅',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 2,
    focusKeys: ['কা', 'খা', 'গা', 'কি', 'দি', 'পি', 'বি'],
    summary: 'কাক, খাতা, চিঠি, দিন, পিঠার সঠিক উচ্চারণ।',
  },
  {
    dayNumber: 7,
    bengaliDay: 'দিন ৭',
    title: 'কার চিহ্ন: দীর্ঘ ঈ-কার (ী) ও হ্রস্ব উ-কার (ু)',
    subtitle: 'কী, তীর, দীপ, নীল, কুকুর, খুশি, ফুল গঠন',
    icon: '🏹',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 2,
    focusKeys: ['কী', 'তী', 'দী', 'নী', 'কু', 'খু', 'ফু'],
    summary: 'তীর, নীল, কুকুর, ফুলের সঠিক বাংলা উচ্চারণ।',
  },
  {
    dayNumber: 8,
    bengaliDay: 'দিন ৮',
    title: 'কার চিহ্ন: দীর্ঘ ঊ-কার (ূ) ও ঋ-কার (ৃ)',
    subtitle: 'সূর্য, কূপ, মূল, মৃগ, গৃহ শব্দ পরিচয়',
    icon: '☀️',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 2,
    focusKeys: ['সূ', 'কূ', 'মূ', 'কৃ', 'মৃ'],
    summary: 'সূর্য ও মৃগের গম্ভীর উচ্চারণ অনুশীলন।',
  },
  {
    dayNumber: 9,
    bengaliDay: 'দিন ৯',
    title: 'কার চিহ্ন: এ-কার (ে) ও ঐ-কার (ৈ)',
    subtitle: 'কেক, খেলা, মেঘ, মেলা, শৈল, বৈশাখ গঠন',
    icon: '☁️',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 2,
    focusKeys: ['কে', 'খে', 'মে', 'লে', 'শৈ', 'বৈ'],
    summary: 'মেঘ ও মেলার মধুর স্বরভঙ্গি।',
  },
  {
    dayNumber: 10,
    bengaliDay: 'দিন ১০',
    title: 'কার চিহ্ন: ও-কার (ো) ও ঔ-কার (ৌ) এবং ধাপ ২ কুইজ',
    subtitle: 'কোকিল, গোলাপ, নৌকা, ঔষধ ও সমাপনী পরীক্ষা',
    icon: '🌹',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 2,
    focusKeys: ['কো', 'গো', 'চো', 'নৌ', 'ঔ'],
    summary: '১০টি কার চিহ্নের সম্পূর্ণ পুনরাবৃত্তি ও পরীক্ষা।',
  },
  {
    dayNumber: 11,
    bengaliDay: 'দিন ১১',
    title: 'ফলা চিহ্ন: য-ফলা (্য)',
    subtitle: 'বাক্য, সত্য, বিদ্যা, গদ্য, পদ্য, খাদ্য, বাদ্য বিশ্লেষণ',
    icon: '💬',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 3,
    focusKeys: ['বাক্য', 'সত্য', 'বিদ্যা', 'গদ্য', 'পদ্য', 'খাদ্য'],
    summary: '১২টি যাচাইকৃত য-ফলা যুক্ত শব্দের সুনির্দিষ্ট উচ্চারণ ও ভাঙন।',
  },
  {
    dayNumber: 12,
    bengaliDay: 'দিন ১২',
    title: 'ফলা চিহ্ন: র-ফলা (্র)',
    subtitle: 'গ্রাম, ছাত্র, প্রথম, গ্রহ, প্রাণ, ঘ্রাণ, বজ্র, চক্র বিশ্লেষণ',
    icon: '🏡',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 3,
    focusKeys: ['গ্রাম', 'ছাত্র', 'প্রথম', 'গ্রহ', 'প্রাণ', 'চক্র'],
    summary: '১২টি যাচাইকৃত র-ফলা যুক্ত শব্দের স্পষ্ট উচ্চারণ ও চিত্রপাঠ।',
  },
  {
    dayNumber: 13,
    bengaliDay: 'দিন ১৩',
    title: 'ফলা চিহ্ন: ল-ফলা (্ল) ও ব-ফলা (্ব)',
    subtitle: 'গ্লাস, ক্লান্ত, শ্লোক, বিপ্লব, অশ্ব, দ্বীপ, দ্বার, বিশ্বাস',
    icon: '🥛',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 3,
    focusKeys: ['গ্লাস', 'ক্লান্ত', 'অম্ল', 'অশ্ব', 'দ্বীপ', 'দ্বার'],
    summary: 'ল-ফলা ও ব-ফলার যুক্ত রূপ ও শুদ্ধ ধ্বনি।',
  },
  {
    dayNumber: 14,
    bengaliDay: 'দিন ১৪',
    title: 'ফলা চিহ্ন: ম-ফলা (্ম) ও ন/ণ-ফলা (্ন/্ণ)',
    subtitle: 'পদ্ম, ভস্ম, স্মৃতি, আত্মা, অগ্নি, রত্ন, যত্ন, রান্না, কৃষ্ণ',
    icon: '🪷',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 3,
    focusKeys: ['পদ্ম', 'স্মৃতি', 'আত্মা', 'অগ্নি', 'রত্ন', 'কৃষ্ণ'],
    summary: 'নাসিক্য ম ও ন ফলার নিখুঁত উচ্চারণ পদ্ধতি।',
  },
  {
    dayNumber: 15,
    bengaliDay: 'দিন ১৫',
    title: 'ফলা চিহ্ন: রেফ (র্) ও ধাপ ৩ সমাপনী কুইজ',
    subtitle: 'কর্ম, ধর্ম, বর্ণ, সূর্য, পূর্ব, পর্বত, অর্থ, তর্ক, গর্ত',
    icon: '🛠️',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 3,
    focusKeys: ['কর্ম', 'ধর্ম', 'বর্ণ', 'সূর্য', 'পর্বত', 'অর্থ'],
    summary: '৭টি ফলা চিহ্নের পূর্ণ পুনরাবৃত্তি ও স্তর ৩ কুইজ।',
  },
  {
    dayNumber: 16,
    bengaliDay: 'দিন ১৬',
    title: 'যুক্তাক্ষর: ক্ত (ক+ত) ও ক্ষ (ক+ষ)',
    subtitle: 'রক্ত, শক্ত, ভক্ত, মুক্ত, যুক্তি; ক্ষমা, ক্ষতি, পরীক্ষা, শিক্ষা',
    icon: '🩸',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 4,
    focusKeys: ['রক্ত', 'শক্ত', 'মুক্তি', 'ক্ষমা', 'শিক্ষা', 'বৃক্ষ'],
    summary: 'ক্ত ও ক্ষ এর সম্পূর্ণ শব্দ তালিকা ও বর্ণ বিশ্লেষণ।',
  },
  {
    dayNumber: 17,
    bengaliDay: 'দিন ১৭',
    title: 'যুক্তাক্ষর: ঙ্গ (ঙ+গ) ও ন্দ (ন+দ)',
    subtitle: 'অঙ্গ, বঙ্গ, গঙ্গা, জঙ্গল, আনন্দ, সুন্দর, ছন্দ, বিন্দু, সিন্দুক',
    icon: '🎉',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 4,
    focusKeys: ['অঙ্গ', 'গঙ্গা', 'জঙ্গল', 'আনন্দ', 'সুন্দর', 'বিন্দু'],
    summary: 'নাসিক্য ও দন্ত্য যুক্তবর্ণের শ্রুতিমধুর পাঠ।',
  },
  {
    dayNumber: 18,
    bengaliDay: 'দিন ১৮',
    title: 'যুক্তাক্ষর: ঞ্চ, ঞ্জ, ণ্ড, ত্ত, ম্প',
    subtitle: 'মঞ্চ, পঞ্চম, গঞ্জ, কুঞ্জ, ঠান্ডা, কাণ্ড, উত্তর, সম্পদ',
    icon: '🎭',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 4,
    focusKeys: ['মঞ্চ', 'গঞ্জ', 'ঠান্ডা', 'উত্তর', 'সম্পদ'],
    summary: 'পঞ্চম, কুঞ্জ, ঠান্ডা ও উত্তরের যুক্তরূপ বিশ্লেষণ।',
  },
  {
    dayNumber: 19,
    bengaliDay: 'দিন ১৯',
    title: 'যুক্তাক্ষর: জ্ঞ (জ+ঞ) ও স্ত (স+ত)',
    subtitle: 'জ্ঞান, বিজ্ঞান, অভিজ্ঞ, জিজ্ঞাসা, রাস্তা, ব্যস্ত, পুস্তক',
    icon: '💡',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 4,
    focusKeys: ['জ্ঞান', 'বিজ্ঞান', 'রাস্তা', 'ব্যস্ত', 'পুস্তক'],
    summary: 'জ্ঞ ও স্ত এর বিশদ শব্দগঠন ও ধাপ ৪ কুইজ।',
  },
  {
    dayNumber: 20,
    bengaliDay: 'দিন ২০',
    title: 'কঠিন ৩ বর্ণের যুক্তাক্ষর (Level 5)',
    subtitle: 'স্ট্রোক, স্ট্রাইক, বস্ত্র, অস্ত্র, স্প্রে, তত্ত্ব, যন্ত্র, নিমন্ত্রণ',
    icon: '💓',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 5,
    focusKeys: ['স্ট্রোক', 'বস্ত্র', 'স্প্রে', 'তত্ত্ব', 'যন্ত্র'],
    summary: '৩ বর্ণের জটিল যুক্তাক্ষর উচ্চারণ ও ধাপ ৫ কুইজ।',
  },
  {
    dayNumber: 21,
    bengaliDay: 'দিন ২১',
    title: 'শব্দ গঠন ও শব্দ ভেঙে পড়ার পাঠ',
    subtitle: 'কাক, ফুল, নদী, আকাশ বর্ণের নিখুঁত যোগ ও বিয়োগ',
    icon: '🧩',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 6,
    focusKeys: ['কাক', 'ফুল', 'সূর্য', 'বিদ্যালয়'],
    summary: 'বর্ণ ও কার পৃথক করে ধীর গতিতে শব্দ শেখা।',
  },
  {
    dayNumber: 22,
    bengaliDay: 'দিন ২২',
    title: 'শব্দ গঠনের গভীর অনুশীলন',
    subtitle: 'বই, কলম, খাতা, বাগান, দোয়েল এর গঠন বিশ্লেষণ',
    icon: '📚',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 6,
    focusKeys: ['বই', 'কলম', 'বাগান', 'দোয়েল'],
    summary: 'কার ও ফলা চিহ্নের মিশ্রণে শব্দ গঠন।',
  },
  {
    dayNumber: 23,
    bengaliDay: 'দিন ২৩',
    title: 'দৈনন্দিন শব্দভাণ্ডার: গৃহ ও পরিবার',
    subtitle: 'ঘর, মা, বাবা, ভাই, বোন, পানি, ভাত এর পাঠ',
    icon: '🏠',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 7,
    focusKeys: ['ঘর', 'মা', 'বাবা', 'ভাত'],
    summary: 'বাস্তব জীবনের সর্বাধিক প্রয়োজনীয় বিশেষ্য শব্দ।',
  },
  {
    dayNumber: 24,
    bengaliDay: 'দিন ২৪',
    title: 'দৈনন্দিন শব্দভাণ্ডার: কাজ ও প্রকৃতি',
    subtitle: 'খাওয়া, পড়া, চলা, ঘুমানো, আকাশ, নদী, পাখি',
    icon: '🌳',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 7,
    focusKeys: ['খাওয়া', 'পড়া', 'নদী', 'পাখি'],
    summary: 'প্রকৃতি ও নিত্যদিনের কাজের শব্দভাণ্ডার।',
  },
  {
    dayNumber: 25,
    bengaliDay: 'দিন ২৫',
    title: 'শব্দভাণ্ডার মূল্যায়ন ও ধাপ ৭ কুইজ',
    subtitle: '১০০টি বাস্তবসম্মত শব্দের শ্রুতি ও দৃষ্টি পরীক্ষা',
    icon: '🏆',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 7,
    focusKeys: ['শব্দভাণ্ডার সমাপনী'],
    summary: 'শব্দভাণ্ডারের আত্মস্থতা মূল্যায়ন।',
  },
  {
    dayNumber: 26,
    bengaliDay: 'দিন ২৬',
    title: 'ছোট ছোট বাক্য পাঠ (Level 8)',
    subtitle: 'আমি ভাত খাই, সূর্য আলো দেয়, ফুল ফোটে',
    icon: '💬',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 8,
    focusKeys: ['আমি ভাত খাই', 'সূর্য আলো দেয়', 'ফুল ফোটে'],
    summary: 'একটি একটি শব্দ থেকে পূর্ণ বাক্য শোনা ও বলা।',
  },
  {
    dayNumber: 27,
    bengaliDay: 'দিন ২৭',
    title: 'জীবনমুখী বাক্য পাঠ',
    subtitle: 'আমরা স্কুলে যাই, নদীতে নৌকা চলে, বৃষ্টি পড়ে',
    icon: '🏫',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 8,
    focusKeys: ['আমরা স্কুলে যাই', 'নদীতে নৌকা চলে', 'বৃষ্টি পড়ে'],
    summary: 'ভাবপূর্ণ বাক্যের টানা উচ্চারণ ও ধাপ ৮ কুইজ।',
  },
  {
    dayNumber: 28,
    bengaliDay: 'দিন ২৮',
    title: 'অনুচ্ছেদ পাঠের প্রথম পাঠ (Level 9)',
    subtitle: 'আমাদের সুন্দর দেশ ও বাংলার প্রকৃতি',
    icon: '🇧🇩',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 9,
    focusKeys: ['আমাদের দেশ', 'সোনার বাংলা'],
    summary: 'বাক্য থেকে ছোট ছোট অনুচ্ছেদে রূপান্তর।',
  },
  {
    dayNumber: 29,
    bengaliDay: 'দিন ২৯',
    title: 'অনুচ্ছেদ পাঠের সাবলীলতা',
    subtitle: 'বর্ষার বৃষ্টি ও পাখির কলকাকলি অনুচ্ছেদ',
    icon: '🌧️',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 9,
    focusKeys: ['বর্ষার বৃষ্টি', 'পাখির ডাক'],
    summary: 'টানা বাক্য পাঠ ও ধাপ ৯ এর চূড়ান্ত পরীক্ষা।',
  },
  {
    dayNumber: 30,
    bengaliDay: 'দিন ৩০',
    title: 'সম্পূর্ণ গল্প ও চূড়ান্তর সনদ (Level 10)',
    subtitle: 'তৃষ্ণার্ত কাকের গল্প ও ৩০ দিনের পূর্ণ বিজয়',
    icon: '👑',
    targetMinutes: 20,
    completedMinutes: 0,
    isUnlocked: false,
    isCompleted: false,
    mappedLevelId: 10,
    focusKeys: ['তৃষ্ণার্ত কাকের গল্প'],
    summary: 'প্রতিটি শব্দ ছুঁয়ে গল্প পাঠ ও ৩০ দিনের পূর্ণতা।',
  },
];

export const buildSubLessons = (
  dayNumber: number,
  title: string,
  focusKeys: string[],
  mappedLevelId: number
): SubLessonItem[] => {
  const bnDay = toBnDigit(dayNumber);
  const configs: Array<{
    subIndex: number;
    suffix: string;
    subTitle: string;
    summary: string;
    type: SubLessonItem['type'];
    instructionAudio: string;
    icon: string;
  }> = [
    {
      subIndex: 1,
      suffix: '১',
      subTitle: 'পরিচিতি ও পর্যবেক্ষণ',
      summary: `${focusKeys.slice(0, 3).join(', ')} এর স্পষ্ট রূপ ও উচ্চারণ দর্শন।`,
      type: 'learn',
      instructionAudio: `দিন ${bnDay}, পাঠ ${bnDay}.১ এ স্বাগতম। বর্ণ ও শব্দের স্পষ্ট রূপ দেখুন এবং শুনুন।`,
      icon: '👁️',
    },
    {
      subIndex: 2,
      suffix: '২',
      subTitle: 'উচ্চারণ ও শ্রুতিচর্চা',
      summary: `শুদ্ধ বাংলা উচ্চারণ, ধ্বনি পরিচিতি ও শ্রুতি পুনরাবৃত্তি।`,
      type: 'practice',
      instructionAudio: `পাঠ ${bnDay}.২: মনোযোগ দিয়ে ধ্বনি শুনুন এবং মুখে উচ্চারণ করুন।`,
      icon: '🗣️',
    },
    {
      subIndex: 3,
      suffix: '৩',
      subTitle: 'ছবি ও শব্দ মেলবন্ধন',
      summary: `বাস্তব জীবনের দৃশ্য ও প্রতীক দেখে শব্দ আবিষ্কার।`,
      type: 'recognition',
      instructionAudio: `পাঠ ${bnDay}.৩: ছবির সাথে মিলিয়ে সঠিক শব্দ চিনে নিন।`,
      icon: '🖼️',
    },
    {
      subIndex: 4,
      suffix: '৪',
      subTitle: 'দ্রুত পঠন ও উদাহরণ পাঠ',
      summary: `বিশাল শব্দভাণ্ডার থেকে আরও নতুন উদাহরণের চর্চা।`,
      type: 'practice',
      instructionAudio: `পাঠ ${bnDay}.৪: আরও উদাহরণ দেখে দ্রুত পড়ার অভ্যাস করুন।`,
      icon: '⚡',
    },
    {
      subIndex: 5,
      suffix: '৫',
      subTitle: 'দক্ষতা যাচাই কুইজ',
      summary: `আজকের পাঠের সম্পূর্ণ মূল্যায়ন ও পরবর্তী দিন আনলক।`,
      type: 'quiz',
      instructionAudio: `পাঠ ${bnDay}.৫: কুইজ সফলভাবে সম্পন্ন করে পরবর্তী দিন উন্মুক্ত করুন।`,
      icon: '🏆',
    },
  ];

  return configs.map((c) => ({
    id: `day-${dayNumber}-sub-${c.subIndex}`,
    dayNumber,
    subIndex: c.subIndex,
    subNumber: `পাঠ ${bnDay}.${c.suffix}`,
    title: c.subTitle,
    summary: c.summary,
    type: c.type,
    targetMinutes: 4,
    isCompleted: false,
    isLocked: c.subIndex > 1,
    focusKeys,
    instructionAudio: c.instructionAudio,
    icon: c.icon,
  }));
};

export const THIRTY_DAY_CURRICULUM_DATA: DayCurriculumItem[] = RAW_THIRTY_DAYS.map((d) => ({
  ...d,
  subLessons: buildSubLessons(d.dayNumber, d.title, d.focusKeys, d.mappedLevelId),
}));

// -------------------------------------------------------------
// CURRICULUM REPOSITORY IMPLEMENTATION
// -------------------------------------------------------------

export class CurriculumRepository {
  private static instance: CurriculumRepository;

  private constructor() {}

  public static getInstance(): CurriculumRepository {
    if (!CurriculumRepository.instance) {
      CurriculumRepository.instance = new CurriculumRepository();
    }
    return CurriculumRepository.instance;
  }

  /**
   * On-Demand Dynamic Loader for curriculum levels:
   * Only loads the specific dictionary slice, sentence database, or story database
   * when the user enters that level, keeping app boot instantaneous.
   */
  public async loadLevelData(levelId: number): Promise<void> {
    await databaseService.loadLevelData(levelId);
    if (levelId >= 16 && levelId <= 18) {
      await loadSentenceDatabase();
    } else if (levelId >= 19 && levelId <= 20 || levelId === 10) {
      await loadFullStories();
    }
  }

  /**
   * Strictly retrieves exact words linked to a specific Consonant + Kar sign
   * Example: getExactKarExamples('খ', 'া') returns strictly ['খাতা', 'খাবার', 'খাঁচা']
   * If no exact match exists, returns an empty array.
   */
  public getExactKarExamples(consonant: string, karSign: string): ExactWordExample[] {
    const key = `${consonant}${karSign}`.normalize('NFC');
    const existing = EXPANDED_KAR_WORD_MAP[key] || EXACT_KAR_WORD_MAP[key];
    if (existing && existing.length > 0) {
      return existing;
    }

    // Dynamic fallback to pre-indexed dictionary kars bucket
    const dbExamples = databaseService.getExamplesFor('kars', key);
    if (dbExamples && dbExamples.length > 0) {
      return dbExamples.map((item) => ({
        word: item.w,
        icon: '📖',
        ttsAudio: item.w,
        breakdown: item.b || [consonant, karSign],
        meaning: item.m
      }));
    }

    // Aggressive fallback: search headwords in consonant alphabet bucket starting with key
    const alphaWords = databaseService.getExamplesFor('alphabets', consonant);
    if (alphaWords && alphaWords.length > 0) {
      const matched = alphaWords.filter((item) => item.w.normalize('NFC').startsWith(key));
      if (matched.length > 0) {
        return matched.map((item) => ({
          word: item.w,
          icon: '📖',
          ttsAudio: item.w,
          breakdown: item.b || [consonant, karSign],
          meaning: item.m
        }));
      }
    }

    return [];
  }

  /**
   * Returns Level 1 Vowels with 10-15 verified words per letter
   */
  public getAlphabetVowels(): LetterItem[] {
    return EXPANDED_VOWELS_DATA;
  }

  /**
   * Returns Level 1 Consonants with 10-15 verified words per letter
   */
  public getAlphabetConsonants(): LetterItem[] {
    return EXPANDED_CONSONANTS_DATA;
  }

  /**
   * Tap-to-Breakdown Engine helper for any Bengali word across all levels
   * Searches Stories, Paragraphs, Sentences, Thematic Vocab, Juktakkhor, Phala, Kar, and Alphabet datasets
   */
  public getWordBreakdown(word: string): string[] {
    const cleanWord = word.replace(/[।,!?]/g, '').trim();

    // 1. Check Stories & Paragraphs dictionary
    const storyMatch = findStoryWordBreakdown(cleanWord);
    if (storyMatch && storyMatch.parts && storyMatch.parts.length > 0) {
      return storyMatch.parts;
    }

    // 2. Check Sentence & Thematic Vocabulary dictionary
    const sentenceMatch = findSentenceWordBreakdown(cleanWord);
    if (sentenceMatch && sentenceMatch.parts && sentenceMatch.parts.length > 0) {
      return sentenceMatch.parts;
    }

    // 3. Check Juktakkhor map
    for (const list of Object.values(EXPANDED_JUKTAKKHOR_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found && found.breakdown && found.breakdown.length > 0) {
        return found.breakdown;
      }
    }
    // 4. Check Phala map
    for (const list of Object.values(EXPANDED_PHALA_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found && found.breakdown && found.breakdown.length > 0) {
        return found.breakdown;
      }
    }
    // 5. Check Kar map
    for (const list of Object.values(EXPANDED_KAR_WORD_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found && found.breakdown && found.breakdown.length > 0) {
        return found.breakdown;
      }
    }
    // 6. Check Alphabet letters
    for (const item of [...EXPANDED_VOWELS_DATA, ...EXPANDED_CONSONANTS_DATA]) {
      if (item.word === cleanWord && item.breakdown && item.breakdown.length > 0) {
        return item.breakdown;
      }
      if (item.more) {
        const m = item.more.find((ex: any) => ex.word === cleanWord);
        if (m && (m as any).breakdown && (m as any).breakdown.length > 0) {
          return (m as any).breakdown;
        }
      }
    }
    return Array.from(cleanWord);
  }

  /**
   * Retrieves full ExactWordExample metadata (icon, breakdown, audio) for a given word
   */
  public getWordData(word: string): ExactWordExample | undefined {
    const cleanWord = word.replace(/[।,!?]/g, '').trim();

    const storyMatch = findStoryWordBreakdown(cleanWord);
    if (storyMatch) {
      return {
        word: storyMatch.word,
        icon: storyMatch.iconSymbol,
        meaning: storyMatch.meaning,
        ttsAudio: storyMatch.fullAudio,
        breakdown: storyMatch.parts,
      };
    }

    const sentenceMatch = findSentenceWordBreakdown(cleanWord);
    if (sentenceMatch) {
      return {
        word: cleanWord,
        icon: sentenceMatch.icon,
        meaning: sentenceMatch.meaning,
        ttsAudio: cleanWord,
        breakdown: sentenceMatch.parts,
      };
    }

    for (const list of Object.values(EXPANDED_JUKTAKKHOR_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found) return found;
    }
    for (const list of Object.values(EXPANDED_PHALA_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found) return found;
    }
    for (const list of Object.values(EXPANDED_KAR_WORD_MAP)) {
      const found = list.find((item) => item.word === cleanWord);
      if (found) return found;
    }
    return undefined;
  }

  /**
   * Returns Level 6 & 7 Thematic Vocabulary with audio guidance and breakdowns
   */
  public getThematicVocabulary(category?: 'nature' | 'family' | 'body' | 'action'): ThematicWordItem[] {
    if (category) {
      return THEMATIC_VOCABULARY.filter((item) => item.category === category);
    }
    return THEMATIC_VOCABULARY;
  }

  /**
   * Returns Level 6 & 7 2-Word Sentences
   */
  public getTwoWordSentences(): TwoWordSentenceItem[] {
    return TWO_WORD_SENTENCES;
  }

  /**
   * Returns Level 8 Standard 3-4 Word Sentences (Subject + Object + Verb)
   */
  public getStandardSentences(): StandardSentenceItem[] {
    return STANDARD_SENTENCES;
  }

  /**
   * Returns Level 9 Paragraphs (অনুচ্ছেদ)
   */
  public getParagraphs(): ParagraphItem[] {
    return PARAGRAPH_COLLECTION;
  }

  /**
   * Returns Level 10 Complete Stories (সম্পূর্ণ গল্প)
   */
  public getStories(): StoryItem[] {
    return MORAL_STORIES;
  }

  public getStoryById(id: string): StoryItem | undefined {
    return MORAL_STORIES.find((s) => s.id === id);
  }

  /**
   * Helper to determine whether the "আরও উদাহরণ" (More Examples) button should be visible.
   * STRICT RULE: Button only appears if there are 2 or more exact examples available.
   */
  public hasMoreKarExamples(consonant: string, karSign: string): boolean {
    const examples = this.getExactKarExamples(consonant, karSign);
    return examples.length > 1;
  }

  /**
   * Strictly retrieves exact words for Phala combinations (e.g., 'য-ফলা', 'র-ফলা' or 'ক্র')
   * Searches both composite combinations and expanded 10-12 verified words per Phala
   */
  public getExactPhalaExamples(consonant: string, phalaSign: string): ExactWordExample[] {
    const key = `${consonant}${phalaSign}`;
    // Check composite first if exists (e.g. 'ক্র', 'গ্র', 'দ্ব')
    const compositeMatch = EXACT_PHALA_WORD_MAP[key] || EXPANDED_PHALA_MAP[key];
    if (compositeMatch && compositeMatch.length > 0) {
      return compositeMatch;
    }
    // Check by phalaSign directly (e.g. '্য', '্র', '্ল', '্ব', '্ম', '্ন', 'র্')
    if (EXPANDED_PHALA_MAP[phalaSign] && EXPANDED_PHALA_MAP[phalaSign].length > 0) {
      return EXPANDED_PHALA_MAP[phalaSign];
    }
    // Check by Phala name mapping
    if (phalaSign.includes('য') || phalaSign === '্য') return EXPANDED_PHALA_MAP['য-ফলা'] || [];
    if (phalaSign.includes('র') || phalaSign === '্র') return EXPANDED_PHALA_MAP['র-ফলা'] || [];
    if (phalaSign.includes('ল') || phalaSign === '্ল') return EXPANDED_PHALA_MAP['ল-ফলা'] || [];
    if (phalaSign.includes('ব') || phalaSign === '্ব') return EXPANDED_PHALA_MAP['ব-ফলা'] || [];
    if (phalaSign.includes('ম') || phalaSign === '্ম') return EXPANDED_PHALA_MAP['ম-ফলা'] || [];
    if (phalaSign.includes('ন') || phalaSign.includes('ণ') || phalaSign === '্ন' || phalaSign === '্ণ') return EXPANDED_PHALA_MAP['ন-ফলা'] || [];
    if (phalaSign.includes('রেফ') || phalaSign === 'র্') return EXPANDED_PHALA_MAP['রেফ'] || [];
    return [];
  }

  public getExactPhalaByNameOrSign(nameOrSign: string): ExactWordExample[] {
    return EXPANDED_PHALA_MAP[nameOrSign] || [];
  }

  public hasMorePhalaExamples(consonant: string, phalaSign: string): boolean {
    const examples = this.getExactPhalaExamples(consonant, phalaSign);
    return examples.length > 1;
  }

  /**
   * Strictly retrieves exact words for Juktakkhor combinations (e.g., 'ক্ত', 'ক্ষ', 'ঙ্গ', 'ন্দ', 'স্ট্র')
   */
  public getExactJuktakkhorExamples(combinedKey: string): ExactWordExample[] {
    return EXPANDED_JUKTAKKHOR_MAP[combinedKey] || EXACT_JUKTAKKHOR_WORD_MAP[combinedKey] || [];
  }

  public hasMoreJuktakkhorExamples(combinedKey: string): boolean {
    const examples = this.getExactJuktakkhorExamples(combinedKey);
    return examples.length > 1;
  }

  /**
   * Returns list of Kar signs
   */
  public getKarList(): KarSignItem[] {
    return KAR_SIGNS_LIST;
  }

  /**
   * Returns list of base consonants
   */
  public getBaseConsonants(): string[] {
    return BASE_CONSONANTS;
  }

  /**
   * Returns list of Phala signs
   */
  public getPhalaList(): PhalaSignItem[] {
    return PHALA_SIGNS_LIST;
  }

  /**
   * Retrieves the 30-Day Curriculum sequence
   */
  public getThirtyDays(): DayCurriculumItem[] {
    return THIRTY_DAY_CURRICULUM_DATA;
  }

  /**
   * Retrieves a specific day from the 30-day curriculum
   */
  public getDayByNumber(dayNumber: number): DayCurriculumItem | undefined {
    return THIRTY_DAY_CURRICULUM_DATA.find((d) => d.dayNumber === dayNumber);
  }

  /**
   * Retrieves strictly verified letter item by Bengali character (NEVER by raw array index)
   * Guaranteed: selecting 'গ' returns 'গ' (গরু, গাছ, গান...) and NEVER 'ণ' (হরিণ, বীণা)!
   */
  public getLetterByCharStrict(char: string): LetterItem {
    return getLetterByCharStrict(char);
  }

  /**
   * Returns all 5 sub-lessons for a specific day
   */
  public getSubLessons(dayNumber: number): SubLessonItem[] {
    const day = this.getDayByNumber(dayNumber);
    return day ? day.subLessons : [];
  }

  /**
   * Retrieves a specific sub-lesson (e.g. Day 1, Lesson 1.2)
   */
  public getSubLesson(dayNumber: number, subIndex: number): SubLessonItem | undefined {
    const subs = this.getSubLessons(dayNumber);
    return subs.find((s) => s.subIndex === subIndex);
  }

  /**
   * Evaluates if Day N can be unlocked based on whether all 5 sub-lessons of Day N-1 are passed
   */
  public canUnlockDay(dayNumber: number, completedSubs: Record<string, boolean>): boolean {
    if (dayNumber <= 1) return true;
    const prevDay = dayNumber - 1;
    for (let i = 1; i <= 5; i++) {
      if (!completedSubs[`day-${prevDay}-sub-${i}`]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Evaluates if a sub-lesson is unlocked
   */
  public isSubLessonUnlocked(
    dayNumber: number,
    subIndex: number,
    completedSubs: Record<string, boolean>,
    highestUnlockedDay: number
  ): boolean {
    if (dayNumber > highestUnlockedDay) return false;
    if (subIndex === 1) return true;
    return !!completedSubs[`day-${dayNumber}-sub-${subIndex - 1}`];
  }

  /**
   * Retrieves all 20 levels in the comprehensive curriculum
   */
  public getTwentyLevels(): LevelCurriculumItem[] {
    return getTwentyLevelsData();
  }

  /**
   * Retrieves a specific level by its 1..20 ID
   */
  public getLevelById(levelId: number): LevelCurriculumItem | undefined {
    return getLevelByIdFromData(levelId);
  }

  /**
   * Returns all sub-lessons for a specific level (1..20)
   */
  public getLevelSubLessons(levelId: number): SubLessonItem[] {
    const lvl = this.getLevelById(levelId);
    return lvl ? lvl.subLessons : [];
  }

  /**
   * Evaluates if a level's sub-lesson is unlocked
   * Sub-lesson 1 is unlocked if the level itself is unlocked.
   * Sub-lesson N is unlocked only if Sub-lesson N-1 is completed.
   */
  public isLevelSubLessonUnlocked(
    levelId: number,
    subIndex: number,
    completedSubs: Record<string, boolean>,
    highestUnlockedLevel: number
  ): boolean {
    if (levelId > highestUnlockedLevel) return false;
    if (subIndex === 1) return true;
    return !!completedSubs[`lvl-${levelId}-sub-${subIndex - 1}`];
  }

  /**
   * Evaluates if Level N can be unlocked based on whether all sub-lessons of Level N-1 are passed
   */
  public canUnlockLevel(levelId: number, completedSubs: Record<string, boolean>): boolean {
    if (levelId <= 1) return true;
    const prevLvl = this.getLevelById(levelId - 1);
    if (!prevLvl) return true;
    for (const sub of prevLvl.subLessons) {
      if (!completedSubs[sub.id]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Retrieves full Bangla Academy dictionary meaning for a given word
   */
  public getWordMeaning(word: string): string | undefined {
    if (!word) return undefined;
    const clean = word.trim().replace(/[।,!?]/g, '');
    const entry = (CURRICULUM_DATABASE.all_words as Record<string, ExactWordExample>)?.[clean];
    if (entry && entry.meaning) return entry.meaning;

    // Search in 20-level sample words / sub-lessons
    for (const lvl of this.getTwentyLevels()) {
      for (const w of lvl.sampleWords) {
        if (w.word === clean && w.meaning) return w.meaning;
      }
      for (const sub of lvl.subLessons) {
        if (sub.words) {
          for (const w of sub.words) {
            if (w.word === clean && w.meaning) return w.meaning;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Returns dictionary word entry with breakdown and meaning
   */
  public getDictionaryEntry(word: string): ExactWordExample | undefined {
    if (!word) return undefined;
    const clean = word.trim().replace(/[।,!?]/g, '');
    return (CURRICULUM_DATABASE.all_words as Record<string, ExactWordExample>)?.[clean];
  }

  /**
   * Returns dictionary words starting with a specific letter
   */
  public getWordsForLetter(char: string): ExactWordExample[] {
    const list = (CURRICULUM_DATABASE.alphabets as Record<string, ExactWordExample[]>)?.[char];
    return list && list.length > 0 ? list : [];
  }

  /**
   * Returns dictionary words for a specific Kar sign combination
   */
  public getWordsForKar(karKey: string): ExactWordExample[] {
    const list = (CURRICULUM_DATABASE.kar_signs as Record<string, ExactWordExample[]>)?.[karKey];
    if (list && list.length > 0) return list;
    return EXACT_KAR_WORD_MAP[karKey] || EXPANDED_KAR_WORD_MAP[karKey] || [];
  }

  /**
   * Returns dictionary words containing a Phala sign
   */
  public getWordsForPhala(phalaSign: string): ExactWordExample[] {
    const list = (CURRICULUM_DATABASE.phala_signs as Record<string, ExactWordExample[]>)?.[phalaSign];
    return list && list.length > 0 ? list : [];
  }

  /**
   * Returns dictionary words containing a specific Juktakkhor conjunct
   */
  public getWordsForJuktakkhor(conjunct: string): ExactWordExample[] {
    const list = (CURRICULUM_DATABASE.juktakkhor as Record<string, ExactWordExample[]>)?.[conjunct];
    return list && list.length > 0 ? list : [];
  }

  /**
   * Retrieves all catalogued dictionary words
   */
  public getAllDictionaryWords(): ExactWordExample[] {
    return Object.values((CURRICULUM_DATABASE.all_words as Record<string, ExactWordExample>) || {});
  }
}

// Export singleton instance for convenience
export const curriculumRepository = CurriculumRepository.getInstance();
