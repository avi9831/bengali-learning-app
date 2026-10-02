// lib/repositories/sentence_repository.ts
// Thematic Vocabulary & Grammatically Verified Sentences for Offline Bengali Learning
// Supports Levels 6, 7 & 8 (Days 21-26) with full Word Breakdown Engine compatibility

export interface ThematicWordItem {
  id: string;
  category: 'nature' | 'family' | 'body' | 'action';
  categoryBengali: string;
  word: string;
  iconSymbol: string;
  meaning: string;
  audioPrompt: string;
  breakdown: string[];
  breakdownAudio: string[];
}

export interface TwoWordSentenceItem {
  id: string;
  sentenceText: string;
  iconSymbol: string;
  words: string[];
  wordsAudio: string[];
  fullAudio: string;
  meaning: string;
  wordBreakdowns: Record<string, { parts: string[]; partsAudio: string[]; meaning: string; icon: string }>;
}

export interface StandardSentenceItem {
  id: string;
  sentenceText: string;
  iconSymbol: string;
  words: string[];
  wordsAudio: string[];
  fullAudio: string;
  meaning: string;
  wordBreakdowns: Record<string, { parts: string[]; partsAudio: string[]; meaning: string; icon: string }>;
}

// -----------------------------------------------------------------
// THEMATIC VOCABULARY (প্রকৃতি, পরিবার, শরীরের অঙ্গ, দৈনন্দিন কাজ)
// -----------------------------------------------------------------

export const THEMATIC_VOCABULARY: ThematicWordItem[] = [
  // ১. প্রকৃতি (Nature)
  {
    id: 'nat1',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'আকাশ',
    iconSymbol: '🌤️',
    meaning: 'নীল আকাশ',
    audioPrompt: 'আকাশ। নীল আকাশ।',
    breakdown: ['আ', 'ক', 'া', 'শ'],
    breakdownAudio: ['আ', 'ক', 'আ-কার', 'তালব্য শ'],
  },
  {
    id: 'nat2',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'নদী',
    iconSymbol: '🌊',
    meaning: 'প্রবহমান জলধারা',
    audioPrompt: 'নদী। কুলকুল বয়ে যাওয়া নদী।',
    breakdown: ['ন', 'দ', 'ী'],
    breakdownAudio: ['দন্ত্য ন', 'দ', 'দীর্ঘ ঈ-কার'],
  },
  {
    id: 'nat3',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'গাছ',
    iconSymbol: '🌳',
    meaning: 'সবুজ বৃক্ষ',
    audioPrompt: 'গাছ। ছায়াঘেরা সবুজ গাছ।',
    breakdown: ['গ', 'া', 'ছ'],
    breakdownAudio: ['গ', 'আ-কার', 'ছ'],
  },
  {
    id: 'nat4',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'ফুল',
    iconSymbol: '🌸',
    meaning: 'সুন্দর ফুল',
    audioPrompt: 'ফুল। সুন্দর রঙিন ফুল।',
    breakdown: ['ফ', 'ু', 'ল'],
    breakdownAudio: ['ফ', 'হ্রস্ব উ-কার', 'ল'],
  },
  {
    id: 'nat5',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'পাতা',
    iconSymbol: '🍃',
    meaning: 'গাছের সবুজ পাতা',
    audioPrompt: 'পাতা। গাছের সবুজ পাতা।',
    breakdown: ['প', 'া', 'ত', 'া'],
    breakdownAudio: ['প', 'আ-কার', 'ত', 'আ-কার'],
  },
  {
    id: 'nat6',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'মাটি',
    iconSymbol: '🌱',
    meaning: 'উর্বর মাটি',
    audioPrompt: 'মাটি। খাঁটি সোনার মাটি।',
    breakdown: ['ম', 'া', 'ট', 'ি'],
    breakdownAudio: ['ম', 'আ-কার', 'ট', 'হ্রস্ব ই-কার'],
  },
  {
    id: 'nat7',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'বৃষ্টি',
    iconSymbol: '🌧️',
    meaning: 'বৃষ্টির ধারা',
    audioPrompt: 'বৃষ্টি। টাপুর টুপুর বৃষ্টি।',
    breakdown: ['ব', 'ৃ', 'ষ', '্', 'ট', 'ি'],
    breakdownAudio: ['ব', 'ঋ-কার', 'মূর্ধন্য ষ', 'ট', 'হ্রস্ব ই-কার'],
  },
  {
    id: 'nat8',
    category: 'nature',
    categoryBengali: 'প্রকৃতি',
    word: 'বাতাস',
    iconSymbol: '💨',
    meaning: 'শীতল হাওয়া',
    audioPrompt: 'বাতাস। ঝিরিঝিরি বাতাস।',
    breakdown: ['ব', 'া', 'ত', 'া', 'স'],
    breakdownAudio: ['ব', 'আ-কার', 'ত', 'আ-কার', 'দন্ত্য স'],
  },
  // ২. পরিবার (Family)
  {
    id: 'fam1',
    category: 'family',
    categoryBengali: 'পরিবার',
    word: 'মা',
    iconSymbol: '🤱',
    meaning: 'স্নেহময়ী জননী',
    audioPrompt: 'মা। আমার প্রিয় মা।',
    breakdown: ['ম', 'া'],
    breakdownAudio: ['ম', 'আ-কার'],
  },
  {
    id: 'fam2',
    category: 'family',
    categoryBengali: 'পরিবার',
    word: 'বাবা',
    iconSymbol: '👨‍👧',
    meaning: 'স্নেহশীল পিতা',
    audioPrompt: 'বাবা। আমার আদর্শ বাবা।',
    breakdown: ['ব', 'া', 'ব', 'া'],
    breakdownAudio: ['ব', 'আ-কার', 'ব', 'আ-কার'],
  },
  {
    id: 'fam3',
    category: 'family',
    categoryBengali: 'পরিবার',
    word: 'ভাই',
    iconSymbol: '👦',
    meaning: 'আপন সহোদর',
    audioPrompt: 'ভাই। ছোট ভাই।',
    breakdown: ['ভ', 'া', 'ই'],
    breakdownAudio: ['ভ', 'আ-কার', 'হ্রস্ব ই'],
  },
  {
    id: 'fam4',
    category: 'family',
    categoryBengali: 'পরিবার',
    word: 'বোন',
    iconSymbol: '👧',
    meaning: 'স্নেহের সহোদরা',
    audioPrompt: 'বোন। আদরের বোন।',
    breakdown: ['ব', 'ো', 'ন'],
    breakdownAudio: ['ব', 'ও-কার', 'দন্ত্য ন'],
  },
  // ৩. শরীরের অঙ্গ (Body Parts)
  {
    id: 'bod1',
    category: 'body',
    categoryBengali: 'অঙ্গ',
    word: 'হাত',
    iconSymbol: '✋',
    meaning: 'কাজের হাত',
    audioPrompt: 'হাত। কাজের দুটি হাত।',
    breakdown: ['হ', 'া', 'ত'],
    breakdownAudio: ['হ', 'আ-কার', 'ত'],
  },
  {
    id: 'bod2',
    category: 'body',
    categoryBengali: 'অঙ্গ',
    word: 'পা',
    iconSymbol: '🦶',
    meaning: 'চলার পা',
    audioPrompt: 'পা। চলার দুটি পা।',
    breakdown: ['প', 'া'],
    breakdownAudio: ['প', 'আ-কার'],
  },
  {
    id: 'bod3',
    category: 'body',
    categoryBengali: 'অঙ্গ',
    word: 'চোখ',
    iconSymbol: '👁️',
    meaning: 'সুন্দর দুটি চোখ',
    audioPrompt: 'চোখ। দেখার দুটি চোখ।',
    breakdown: ['চ', 'ো', 'খ'],
    breakdownAudio: ['চ', 'ও-কার', 'খ'],
  },
  {
    id: 'bod4',
    category: 'body',
    categoryBengali: 'অঙ্গ',
    word: 'কান',
    iconSymbol: '👂',
    meaning: 'শোনার কান',
    audioPrompt: 'কান। শোনার দুটি কান।',
    breakdown: ['ক', 'া', 'ন'],
    breakdownAudio: ['ক', 'আ-কার', 'দন্ত্য ন'],
  },
  // ৪. দৈনন্দিন কাজ (Actions)
  {
    id: 'act1',
    category: 'action',
    categoryBengali: 'কাজ',
    word: 'পড়া',
    iconSymbol: '📖',
    meaning: 'বই পড়া',
    audioPrompt: 'পড়া। মনোযোগ দিয়ে পড়া।',
    breakdown: ['প', 'ড়', 'া'],
    breakdownAudio: ['প', 'ড-শূন্য ঢ়', 'আ-কার'],
  },
  {
    id: 'act2',
    category: 'action',
    categoryBengali: 'কাজ',
    word: 'লেখা',
    iconSymbol: '✍️',
    meaning: 'খাতায় লেখা',
    audioPrompt: 'লেখা। সুন্দর করে লেখা।',
    breakdown: ['ল', 'ে', 'খ', 'া'],
    breakdownAudio: ['ল', 'এ-কার', 'খ', 'আ-কার'],
  },
  {
    id: 'act3',
    category: 'action',
    categoryBengali: 'কাজ',
    word: 'খাওয়া',
    iconSymbol: '🍚',
    meaning: 'খাবার খাওয়া',
    audioPrompt: 'খাওয়া। ভালো খাবার খাওয়া।',
    breakdown: ['খ', 'া', 'ও', 'য', '়', 'া'],
    breakdownAudio: ['খ', 'আ-কার', 'ও', 'অন্তস্থ য়', 'আ-কার'],
  },
  {
    id: 'act4',
    category: 'action',
    categoryBengali: 'কাজ',
    word: 'ঘুমানো',
    iconSymbol: '😴',
    meaning: 'শান্তির ঘুম',
    audioPrompt: 'ঘুমানো। রাতে সময়মতো ঘুমানো।',
    breakdown: ['ঘ', 'ু', 'ম', 'া', 'ন', 'ো'],
    breakdownAudio: ['ঘ', 'হ্রস্ব উ-কার', 'ম', 'আ-কার', 'দন্ত্য ন', 'ও-কার'],
  },
];

// -----------------------------------------------------------------
// ২-শব্দের সহজ বাক্য (Level 6 / Days 21-22)
// -----------------------------------------------------------------

export const TWO_WORD_SENTENCES: TwoWordSentenceItem[] = [
  {
    id: 'tw1',
    sentenceText: 'আমি খাই।',
    iconSymbol: '🍚',
    words: ['আমি', 'খাই।'],
    wordsAudio: ['আমি', 'খাই'],
    fullAudio: 'আমি খাই।',
    meaning: 'নিজের আহার গ্রহণ',
    wordBreakdowns: {
      আমি: {
        parts: ['আ', 'ম', 'ি'],
        partsAudio: ['আ', 'ম', 'হ্রস্ব ই-কার'],
        meaning: 'নিজেকে নির্দেশ করা',
        icon: '🙋',
      },
      খাই: {
        parts: ['খ', 'া', 'ই'],
        partsAudio: ['খ', 'আ-কার', 'হ্রস্ব ই'],
        meaning: 'আহার গ্রহণ করি',
        icon: '🍽️',
      },
    },
  },
  {
    id: 'tw2',
    sentenceText: 'বাবা আসেন।',
    iconSymbol: '👨‍👧',
    words: ['বাবা', 'আসেন।'],
    wordsAudio: ['বাবা', 'আসেন'],
    fullAudio: 'বাবা আসেন।',
    meaning: 'পিতার ঘরে ফেরা',
    wordBreakdowns: {
      বাবা: {
        parts: ['ব', 'া', 'ব', 'া'],
        partsAudio: ['ব', 'আ-কার', 'ব', 'আ-কার'],
        meaning: 'স্নেহশীল পিতা',
        icon: '👨',
      },
      আসেন: {
        parts: ['আ', 'স', 'ে', 'ন'],
        partsAudio: ['আ', 'দন্ত্য স', 'এ-কার', 'দন্ত্য ন'],
        meaning: 'গমন করে আসেন',
        icon: '🚪',
      },
    },
  },
  {
    id: 'tw3',
    sentenceText: 'জল পড়।',
    iconSymbol: '💧',
    words: ['জল', 'পড়।'],
    wordsAudio: ['জল', 'পড়'],
    fullAudio: 'জল পড়।',
    meaning: 'বৃষ্টির জল ঝরে পড়া',
    wordBreakdowns: {
      জল: {
        parts: ['জ', 'ল'],
        partsAudio: ['বর্গীয় জ', 'ল'],
        meaning: 'পানি',
        icon: '💧',
      },
      পড়: {
        parts: ['প', 'ড়'],
        partsAudio: ['প', 'ড-শূন্য ঢ়'],
        meaning: 'বৃষ্টিপাত হওয়া',
        icon: '🌧️',
      },
    },
  },
  {
    id: 'tw4',
    sentenceText: 'বই পড়।',
    iconSymbol: '📖',
    words: ['বই', 'পড়।'],
    wordsAudio: ['বই', 'পড়'],
    fullAudio: 'বই পড়।',
    meaning: 'মনোযোগ দিয়ে পড়া',
    wordBreakdowns: {
      বই: {
        parts: ['ব', 'ই'],
        partsAudio: ['ব', 'হ্রস্ব ই'],
        meaning: 'জ্ঞানগর্ভ পুস্তক',
        icon: '📚',
      },
      পড়: {
        parts: ['প', 'ড়'],
        partsAudio: ['প', 'ড-শূন্য ঢ়'],
        meaning: 'অধ্যয়ন কর',
        icon: '👓',
      },
    },
  },
  {
    id: 'tw5',
    sentenceText: 'পাখি ওড়ে।',
    iconSymbol: '🕊️',
    words: ['পাখি', 'ওড়ে।'],
    wordsAudio: ['পাখি', 'ওড়ে'],
    fullAudio: 'পাখি ওড়ে।',
    meaning: 'আকাশে পাখির বিচরণ',
    wordBreakdowns: {
      পাখি: {
        parts: ['প', 'া', 'খ', 'ি'],
        partsAudio: ['প', 'আ-কার', 'খ', 'হ্রস্ব ই-কার'],
        meaning: 'ডানাওয়ালা পাখি',
        icon: '🐦',
      },
      ওড়ে: {
        parts: ['ও', 'ড়', 'ে'],
        partsAudio: ['ও', 'ড-শূন্য ঢ়', 'এ-কার'],
        meaning: 'ডানা মেলে ওড়া',
        icon: '🌤️',
      },
    },
  },
  {
    id: 'tw6',
    sentenceText: 'রোদ ওঠে।',
    iconSymbol: '🌅',
    words: ['রোদ', 'ওঠে।'],
    wordsAudio: ['রোদ', 'ওঠে'],
    fullAudio: 'রোদ ওঠে।',
    meaning: 'সকালে রোদ দেখা দেওয়া',
    wordBreakdowns: {
      রোদ: {
        parts: ['র', 'ো', 'দ'],
        partsAudio: ['ব-শূন্য র', 'ও-কার', 'দ'],
        meaning: 'সূর্যের আলো',
        icon: '☀️',
      },
      ওঠে: {
        parts: ['ও', 'ঠ', 'ে'],
        partsAudio: ['ও', 'ঠ', 'এ-কার'],
        meaning: 'উদিত হওয়া',
        icon: '🌄',
      },
    },
  },
  {
    id: 'tw7',
    sentenceText: 'ফুল ফোটে।',
    iconSymbol: '🌸',
    words: ['ফুল', 'ফোটে।'],
    wordsAudio: ['ফুল', 'ফোটে'],
    fullAudio: 'ফুল ফোটে।',
    meaning: 'বাগানে ফুলের প্রস্ফুটন',
    wordBreakdowns: {
      ফুল: {
        parts: ['ফ', 'ু', 'ল'],
        partsAudio: ['ফ', 'হ্রস্ব উ-কার', 'ল'],
        meaning: 'সুন্দর ফুল',
        icon: '🌺',
      },
      ফোটে: {
        parts: ['ফ', 'ো', 'ট', 'ে'],
        partsAudio: ['ফ', 'ও-কার', 'ট', 'এ-কার'],
        meaning: 'বিকশিত হওয়া',
        icon: '🌼',
      },
    },
  },
  {
    id: 'tw8',
    sentenceText: 'নদী বয়।',
    iconSymbol: '⛵',
    words: ['নদী', 'বয়।'],
    wordsAudio: ['নদী', 'বয়'],
    fullAudio: 'নদী বয়।',
    meaning: 'নদীর পানির প্রবাহ',
    wordBreakdowns: {
      নদী: {
        parts: ['ন', 'দ', 'ী'],
        partsAudio: ['দন্ত্য ন', 'দ', 'দীর্ঘ ঈ-কার'],
        meaning: 'প্রবহমান ধারা',
        icon: '🌊',
      },
      বয়: {
        parts: ['ব', 'য়'],
        partsAudio: ['ব', 'অন্তস্থ য়'],
        meaning: 'প্রবাহিত হওয়া',
        icon: '🍃',
      },
    },
  },
];

// -----------------------------------------------------------------
// ব্যাকরণসম্মত ৩-৭ শব্দের পূর্ণাঙ্গ বাক্য (Levels 16-18)
// Grammatically verified natural Bengali sentences
// -----------------------------------------------------------------

export const STANDARD_SENTENCES: StandardSentenceItem[] = [
  {
    id: 'std_read',
    sentenceText: 'আমি প্রতিদিন সকালে বই পড়ি।',
    iconSymbol: '📚',
    words: ['আমি', 'প্রতিদিন', 'সকালে', 'বই', 'পড়ি।'],
    wordsAudio: ['আমি', 'প্রতিদিন', 'সকালে', 'বই', 'পড়ি'],
    fullAudio: 'আমি প্রতিদিন সকালে বই পড়ি।',
    meaning: 'নিয়মিত সকালে মনোযোগ দিয়ে পাঠাভ্যাস',
    wordBreakdowns: {
      আমি: {
        parts: ['আ', 'ম', 'ি'],
        partsAudio: ['আ', 'ম', 'হ্রস্ব ই-কার'],
        meaning: 'কর্তা (উত্তম পুরুষ)',
        icon: '🙋',
      },
      প্রতিদিন: {
        parts: ['প', '্', 'র', 'ত', 'ি', 'দ', 'ি', 'ন'],
        partsAudio: ['প', 'র-ফলা', 'ত', 'হ্রস্ব ই-কার', 'দ', 'হ্রস্ব ই-কার', 'দন্ত্য ন'],
        meaning: 'রোজ বা প্রত্যহ',
        icon: '🗓️',
      },
      সকালে: {
        parts: ['স', 'ক', 'া', 'ল', 'ে'],
        partsAudio: ['দন্ত্য স', 'ক', 'আ-কার', 'ল', 'এ-কার'],
        meaning: 'ভোরবেলা বা প্রাতঃকালে',
        icon: '🌅',
      },
      বই: {
        parts: ['ব', 'ই'],
        partsAudio: ['ব', 'হ্রস্ব ই'],
        meaning: 'পুস্তক বা গ্রন্থ',
        icon: '📖',
      },
      পড়ি: {
        parts: ['প', 'ড়', 'ি'],
        partsAudio: ['প', 'ড-শূন্য ঢ়', 'হ্রস্ব ই-কার'],
        meaning: 'পাঠ করি',
        icon: '👓',
      },
    },
  },
  {
    id: 'std_stars',
    sentenceText: 'আকাশে অনেক তারা ঝকঝক করছে।',
    iconSymbol: '✨',
    words: ['আকাশে', 'অনেক', 'তারা', 'ঝকঝক', 'করছে।'],
    wordsAudio: ['আকাশে', 'অনেক', 'তারা', 'ঝকঝক', 'করছে'],
    fullAudio: 'আকাশে অনেক তারা ঝকঝক করছে।',
    meaning: 'রাতের সুনীল আকাশে নক্ষত্রের উজ্জ্বল দীপ্তি',
    wordBreakdowns: {
      আকাশে: {
        parts: ['আ', 'ক', 'া', 'শ', 'ে'],
        partsAudio: ['আ', 'ক', 'আ-কার', 'তালব্য শ', 'এ-কার'],
        meaning: 'গগন বা আসমানে',
        icon: '🌌',
      },
      অনেক: {
        parts: ['অ', 'ন', 'ে', 'ক'],
        partsAudio: ['অ', 'দন্ত্য ন', 'এ-কার', 'ক'],
        meaning: 'প্রচুর বা বহুসংখ্যক',
        icon: '🔢',
      },
      তারা: {
        parts: ['ত', 'া', 'র', 'া'],
        partsAudio: ['ত', 'আ-কার', 'ব-শূন্য র', 'আ-কার'],
        meaning: 'নক্ষত্র বা জ্যোতিষ্ক',
        icon: '⭐',
      },
      ঝকঝক: {
        parts: ['ঝ', 'ক', 'ঝ', 'ক'],
        partsAudio: ['ঝ', 'ক', 'ঝ', 'ক'],
        meaning: 'উজ্জ্বল আলোর প্রকাশ',
        icon: '🌟',
      },
      করছে: {
        parts: ['ক', 'র', 'ছ', 'ে'],
        partsAudio: ['ক', 'ব-শূন্য র', 'ছ', 'এ-কার'],
        meaning: 'সম্পন্ন করছে',
        icon: '⚡',
      },
    },
  },
  {
    id: 'std_fishermen',
    sentenceText: 'নদীতে জেলেরা মাছ ধরছে।',
    iconSymbol: '🎣',
    words: ['নদীতে', 'জেলেরা', 'মাছ', 'ধরছে।'],
    wordsAudio: ['নদীতে', 'জেলেরা', 'মাছ', 'ধরছে'],
    fullAudio: 'নদীতে জেলেরা মাছ ধরছে।',
    meaning: 'নদীর বুকে মৎস্যজীবীদের কর্মব্যস্ততা',
    wordBreakdowns: {
      নদীতে: {
        parts: ['ন', 'দ', 'ী', 'ত', 'ে'],
        partsAudio: ['দন্ত্য ন', 'দ', 'দীর্ঘ ঈ-কার', 'ত', 'এ-কার'],
        meaning: 'প্রবহমান নদীর জলে',
        icon: '🌊',
      },
      জেলেরা: {
        parts: ['জ', 'ে', 'ল', 'ে', 'র', 'া'],
        partsAudio: ['বর্গীয় জ', 'এ-কার', 'ল', 'এ-কার', 'ব-শূন্য র', 'আ-কার'],
        meaning: 'মৎস্যজীবী ব্যক্তিগণ',
        icon: '⛵',
      },
      মাছ: {
        parts: ['ম', 'া', 'ছ'],
        partsAudio: ['ম', 'আ-কার', 'ছ'],
        meaning: 'জলচর মৎস্য',
        icon: '🐟',
      },
      ধরছে: {
        parts: ['ধ', 'র', 'ছ', 'ে'],
        partsAudio: ['ধ', 'ব-শূন্য র', 'ছ', 'এ-কার'],
        meaning: 'সংগ্রহ করছে',
        icon: '🤲',
      },
    },
  },
  {
    id: 'std_farmers',
    sentenceText: 'কৃষকেরা মাঠে কাজ করেন।',
    iconSymbol: '🌾',
    words: ['কৃষকেরা', 'মাঠে', 'কাজ', 'করেন।'],
    wordsAudio: ['কৃষকেরা', 'মাঠে', 'কাজ', 'করেন'],
    fullAudio: 'কৃষকেরা মাঠে কাজ করেন।',
    meaning: 'সবুজ ফসলের মাঠে চাষিদের পরিশ্রম',
    wordBreakdowns: {
      কৃষকেরা: {
        parts: ['ক', 'ৃ', 'ষ', 'ক', 'ে', 'র', 'া'],
        partsAudio: ['ক', 'ঋ-কার', 'মূর্ধন্য ষ', 'ক', 'এ-কার', 'ব-শূন্য র', 'আ-কার'],
        meaning: 'অন্নদাতা কৃষক ভাইয়েরা',
        icon: '👨‍🌾',
      },
      মাঠে: {
        parts: ['ম', 'া', 'ঠ', 'ে'],
        partsAudio: ['ম', 'আ-কার', 'ঠ', 'এ-কার'],
        meaning: 'ফসলি জমিতে বা প্রান্তর',
        icon: '🌱',
      },
      কাজ: {
        parts: ['ক', 'া', 'জ'],
        partsAudio: ['ক', 'আ-কার', 'বর্গীয় জ'],
        meaning: 'পরিশ্রম বা কর্তব্য',
        icon: '🔨',
      },
      করেন: {
        parts: ['ক', 'র', 'ে', 'ন'],
        partsAudio: ['ক', 'ব-শূন্য র', 'এ-কার', 'দন্ত্য ন'],
        meaning: 'সম্পাদন করেন',
        icon: '💪',
      },
    },
  },
  {
    id: 'std_birds',
    sentenceText: 'পাখিরা গাছে মিষ্টি সুরে গান গায়।',
    iconSymbol: '🐦',
    words: ['পাখিরা', 'গাছে', 'মিষ্টি', 'সুরে', 'গান', 'গায়।'],
    wordsAudio: ['পাখিরা', 'গাছে', 'মিষ্টি', 'সুরে', 'গান', 'গায়'],
    fullAudio: 'পাখিরা গাছে মিষ্টি সুরে গান গায়।',
    meaning: 'বৃক্ষশাখায় পক্ষীকূলের সুমধুর কলতান',
    wordBreakdowns: {
      পাখিরা: {
        parts: ['প', 'া', 'খ', 'ি', 'র', 'া'],
        partsAudio: ['প', 'আ-কার', 'খ', 'হ্রস্ব ই-কার', 'র', 'আ-কার'],
        meaning: 'উড়ন্ত পক্ষীদল',
        icon: '🕊️',
      },
      গাছে: {
        parts: ['গ', 'া', 'ছ', 'ে'],
        partsAudio: ['গ', 'আ-কার', 'ছ', 'এ-কার'],
        meaning: 'বৃক্ষের শাখায়',
        icon: '🌳',
      },
      মিষ্টি: {
        parts: ['ম', 'ি', 'ষ', '্', 'ট', 'ি'],
        partsAudio: ['ম', 'হ্রস্ব ই-কার', 'ষ', 'ট', 'হ্রস্ব ই-কার'],
        meaning: 'সুমধুর বা মনোরম',
        icon: '🍯',
      },
      সুরে: {
        parts: ['স', 'ু', 'র', 'ে'],
        partsAudio: ['দন্ত্য স', 'হ্রস্ব উ-কার', 'র', 'এ-কার'],
        meaning: 'তাল ও ধ্বনিতে',
        icon: '🎵',
      },
      গান: {
        parts: ['গ', 'া', 'ন'],
        partsAudio: ['গ', 'আ-কার', 'দন্ত্য ন'],
        meaning: 'সঙ্গীত বা সুর',
        icon: '🎶',
      },
      গায়: {
        parts: ['গ', 'া', 'য', '়'],
        partsAudio: ['গ', 'আ-কার', 'অন্তস্থ য়'],
        meaning: 'সুর তোলে',
        icon: '🎙️',
      },
    },
  },
  {
    id: 'std_sun',
    sentenceText: 'সূর্য ওঠার সাথে সাথে চারদিক আলোয় ভরে যায়।',
    iconSymbol: '🌅',
    words: ['সূর্য', 'ওঠার', 'সাথে', 'চারদিক', 'আলোয়', 'ভরে', 'যায়।'],
    wordsAudio: ['সূর্য', 'ওঠার', 'সাথে', 'চারদিক', 'আলোয়', 'ভরে', 'যায়'],
    fullAudio: 'সূর্য ওঠার সাথে সাথে চারদিক আলোয় ভরে যায়।',
    meaning: 'প্রভাতে ভোরের সূর্যের উজ্জ্বল আবির্ভাব',
    wordBreakdowns: {
      সূর্য: {
        parts: ['স', 'ূ', 'র', '্', 'য'],
        partsAudio: ['দন্ত্য স', 'দীর্ঘ ঊ-কার', 'রেফ', 'য'],
        meaning: 'রবি বা দিনমণি',
        icon: '☀️',
      },
      ওঠার: {
        parts: ['ও', 'ঠ', 'া', 'র'],
        partsAudio: ['ও', 'ঠ', 'আ-কার', 'র'],
        meaning: 'উদিত হওয়ার',
        icon: '🌄',
      },
      সাথে: {
        parts: ['স', 'া', 'থ', 'ে'],
        partsAudio: ['দন্ত্য স', 'আ-কার', 'থ', 'এ-কার'],
        meaning: 'সঙ্গে বা যুগপৎ',
        icon: '🤝',
      },
      চারদিক: {
        parts: ['চ', 'া', 'র', 'দ', 'ি', 'ক'],
        partsAudio: ['চ', 'আ-কার', 'র', 'দ', 'হ্রস্ব ই-কার', 'ক'],
        meaning: 'চতুর্দিকে বা পরিপার্শ্ব',
        icon: '🧭',
      },
      আলোয়: {
        parts: ['আ', 'ল', 'ো', 'য', '়'],
        partsAudio: ['আ', 'ল', 'ও-কার', 'য়'],
        meaning: 'দীপ্তিতে বা কিরণে',
        icon: '💡',
      },
      ভরে: {
        parts: ['ভ', 'র', 'ে'],
        partsAudio: ['ভ', 'র', 'এ-কার'],
        meaning: 'পরিপূর্ণ হয়ে',
        icon: '✨',
      },
      যায়: {
        parts: ['য', 'া', 'য', '়'],
        partsAudio: ['য', 'আ-কার', 'য়'],
        meaning: 'রূপ নেয়',
        icon: '➡️',
      },
    },
  },
  {
    id: 'std_children',
    sentenceText: 'শিশুরা আনন্দ নিয়ে মাঠে খেলাধুলা করছে।',
    iconSymbol: '⚽',
    words: ['শিশুরা', 'আনন্দ', 'নিয়ে', 'মাঠে', 'খেলাধুলা', 'করছে।'],
    wordsAudio: ['শিশুরা', 'আনন্দ', 'নিয়ে', 'মাঠে', 'খেলাধুলা', 'করছে'],
    fullAudio: 'শিশুরা আনন্দ নিয়ে মাঠে খেলাধুলা করছে।',
    meaning: 'মুক্ত মাঠে কচি-কাঁচাদের আনন্দময় খেলাধুলা',
    wordBreakdowns: {
      শিশুরা: {
        parts: ['শ', 'ি', 'শ', 'ু', 'র', 'া'],
        partsAudio: ['তালব্য শ', 'হ্রস্ব ই-কার', 'তালব্য শ', 'হ্রস্ব উ-কার', 'র', 'আ-কার'],
        meaning: 'ছোট ছেলেমেয়েরা',
        icon: '👧',
      },
      আনন্দ: {
        parts: ['আ', 'ন', 'ন', '্', 'দ'],
        partsAudio: ['আ', 'ন', 'ন', 'দ'],
        meaning: 'হর্ষ বা প্রফুল্লতা',
        icon: '😄',
      },
      নিয়ে: {
        parts: ['ন', 'ি', 'য', '়', 'ে'],
        partsAudio: ['দন্ত্য ন', 'হ্রস্ব ই-কার', 'য়', 'এ-কার'],
        meaning: 'ধারণ করে',
        icon: '🎈',
      },
      মাঠে: {
        parts: ['ম', 'া', 'ঠ', 'ে'],
        partsAudio: ['ম', 'আ-কার', 'ঠ', 'এ-কার'],
        meaning: 'খেলার প্রাঙ্গণে',
        icon: '🏟️',
      },
      খেলাধুলা: {
        parts: ['খ', 'ে', 'ল', 'া', 'ধ', 'ু', 'ল', 'া'],
        partsAudio: ['খ', 'এ-কার', 'ল', 'আ-কার', 'ধ', 'হ্রস্ব উ-কার', 'ল', 'আ-কার'],
        meaning: 'ক্রীড়াকৌতুক',
        icon: '⚽',
      },
      করছে: {
        parts: ['ক', 'র', 'ছ', 'ে'],
        partsAudio: ['ক', 'র', 'ছ', 'এ-কার'],
        meaning: 'করিতেছে',
        icon: '🏃',
      },
    },
  },
  {
    id: 'std_mother',
    sentenceText: 'মা প্রতিদিন আমাদের জন্য সুস্বাদু খাবার রান্না করেন।',
    iconSymbol: '🍲',
    words: ['মা', 'প্রতিদিন', 'আমাদের', 'জন্য', 'সুস্বাদু', 'খাবার', 'রান্না', 'করেন।'],
    wordsAudio: ['মা', 'প্রতিদিন', 'আমাদের', 'জন্য', 'সুস্বাদু', 'খাবার', 'রান্না', 'করেন'],
    fullAudio: 'মা প্রতিদিন আমাদের জন্য সুস্বাদু খাবার রান্না করেন।',
    meaning: 'মমতাময়ী মায়ের ভালোবাসা ও সুস্বাদু রান্না',
    wordBreakdowns: {
      মা: {
        parts: ['ম', 'া'],
        partsAudio: ['ম', 'আ-কার'],
        meaning: 'জননী বা মাতা',
        icon: '🤱',
      },
      প্রতিদিন: {
        parts: ['প', '্', 'র', 'ত', 'ি', 'দ', 'ি', 'ন'],
        partsAudio: ['প', 'র-ফলা', 'ত', 'হ্রস্ব ই-কার', 'দ', 'হ্রস্ব ই-কার', 'দন্ত্য ন'],
        meaning: 'রোজ বা প্রত্যহ',
        icon: '🗓️',
      },
      আমাদের: {
        parts: ['আ', 'ম', 'া', 'দ', 'ে', 'র'],
        partsAudio: ['আ', 'ম', 'আ-কার', 'দ', 'এ-কার', 'র'],
        meaning: 'সন্তানদের',
        icon: '👨‍👩‍👧',
      },
      জন্য: {
        parts: ['জ', 'ন', '্', 'য'],
        partsAudio: ['বর্গীয় জ', 'দন্ত্য ন', 'য-ফলা'],
        meaning: 'উদ্দেশ্যে বা খাতিরে',
        icon: '🎯',
      },
      সুস্বাদু: {
        parts: ['স', 'ু', 'স', '্', 'ব', 'া', 'দ', 'ু'],
        partsAudio: ['দন্ত্য স', 'হ্রস্ব উ-কার', 'স', 'ব', 'আ-কার', 'দ', 'হ্রস্ব উ-কার'],
        meaning: 'অত্যন্ত মুখরোচক',
        icon: '😋',
      },
      খাবার: {
        parts: ['খ', 'া', 'ব', 'া', 'র'],
        partsAudio: ['খ', 'আ-কার', 'ব', 'আ-কার', 'র'],
        meaning: 'আহার্য বস্তু',
        icon: '🍛',
      },
      রান্না: {
        parts: ['র', 'া', 'ন', '্', 'ন', 'া'],
        partsAudio: ['র', 'আ-কার', 'ন', 'ন', 'আ-কার'],
        meaning: 'পাক করা',
        icon: '🍳',
      },
      করেন: {
        parts: ['ক', 'র', 'ে', 'ন'],
        partsAudio: ['ক', 'র', 'এ-কার', 'দন্ত্য ন'],
        meaning: 'প্রস্তুত করেন',
        icon: '❤️',
      },
    },
  },
  {
    id: 'std_truth',
    sentenceText: 'আমরা সবসময় সত্য কথা বলব ও সৎ পথে চলব।',
    iconSymbol: '🤝',
    words: ['আমরা', 'সবসময়', 'সত্য', 'কথা', 'বলব', 'ও', 'সৎ', 'পথে', 'চলব।'],
    wordsAudio: ['আমরা', 'সবসময়', 'সত্য', 'কথা', 'বলব', 'ও', 'সৎ', 'পথে', 'চলব'],
    fullAudio: 'আমরা সবসময় সত্য কথা বলব ও সৎ পথে চলব।',
    meaning: 'নীতিবান জীবনের সুমহান ব্রত ও প্রতিজ্ঞা',
    wordBreakdowns: {
      আমরা: {
        parts: ['আ', 'ম', 'র', 'া'],
        partsAudio: ['আ', 'ম', 'র', 'আ-কার'],
        meaning: 'সকলে মিলে',
        icon: '👥',
      },
      সবসময়: {
        parts: ['স', 'ব', 'স', 'ম', 'য', '়'],
        partsAudio: ['দন্ত্য স', 'ব', 'স', 'ম', 'য়'],
        meaning: 'সর্বদা বা প্রতিনিয়ত',
        icon: '⏳',
      },
      সত্য: {
        parts: ['স', 'ত', '্', 'য'],
        partsAudio: ['দন্ত্য স', 'ত', 'য-ফলা'],
        meaning: 'যা যথার্থ ও অবিকৃত',
        icon: '⚖️',
      },
      কথা: {
        parts: ['ক', 'থ', 'া'],
        partsAudio: ['ক', 'থ', 'আ-কার'],
        meaning: 'বাণী বা বাক্য',
        icon: '🗣️',
      },
      বলব: {
        parts: ['ব', 'ল', 'ব'],
        partsAudio: ['ব', 'ল', 'ব'],
        meaning: 'উচ্চারণ করব',
        icon: '💬',
      },
      ও: {
        parts: ['ও'],
        partsAudio: ['ও'],
        meaning: 'এবং বা সংযোজক',
        icon: '➕',
      },
      সৎ: {
        parts: ['স', 'ৎ'],
        partsAudio: ['দন্ত্য স', 'খণ্ড ত'],
        meaning: 'উত্তম বা চরিত্রবান',
        icon: '⭐',
      },
      পথে: {
        parts: ['প', 'থ', 'ে'],
        partsAudio: ['প', 'থ', 'এ-কার'],
        meaning: 'সঠিক আদর্শে',
        icon: '🛤️',
      },
      চলব: {
        parts: ['চ', 'ল', 'ব'],
        partsAudio: ['চ', 'ল', 'ব'],
        meaning: 'অগ্রসর হব',
        icon: '🚶',
      },
    },
  },
  {
    id: 'std_books',
    sentenceText: 'বই পড়লে মানুষের মন সুন্দর ও আলোকিত হয়।',
    iconSymbol: '💡',
    words: ['বই', 'পড়লে', 'মানুষের', 'মন', 'সুন্দর', 'ও', 'আলোকিত', 'হয়।'],
    wordsAudio: ['বই', 'পড়লে', 'মানুষের', 'মন', 'সুন্দর', 'ও', 'আলোকিত', 'হয়'],
    fullAudio: 'বই পড়লে মানুষের মন সুন্দর ও আলোকিত হয়।',
    meaning: 'পুস্তক পাঠে মানুষের চিন্তা ও চেতনা সমৃদ্ধ হয়',
    wordBreakdowns: {
      বই: {
        parts: ['ব', 'ই'],
        partsAudio: ['ব', 'হ্রস্ব ই'],
        meaning: 'পুস্তক',
        icon: '📖',
      },
      পড়লে: {
        parts: ['প', 'ড়', 'ল', 'ে'],
        partsAudio: ['প', 'ড়', 'ল', 'এ-কার'],
        meaning: 'অধ্যয়ন করিলে',
        icon: '👓',
      },
      মানুষের: {
        parts: ['ম', 'া', 'ন', 'ু', 'ষ', 'ে', 'র'],
        partsAudio: ['ম', 'আ-কার', 'ন', 'হ্রস্ব উ-কার', 'ষ', 'এ-কার', 'র'],
        meaning: 'মানবজাতির',
        icon: '👤',
      },
      মন: {
        parts: ['ম', 'ন'],
        partsAudio: ['ম', 'দন্ত্য ন'],
        meaning: 'চিত্ত বা অন্তর',
        icon: '❤️',
      },
      সুন্দর: {
        parts: ['স', 'ু', 'ন', '্', 'দ', 'র'],
        partsAudio: ['দন্ত্য স', 'হ্রস্ব উ-কার', 'ন', 'দ', 'র'],
        meaning: 'নির্মল ও মার্জিত',
        icon: '🌸',
      },
      আলোকিত: {
        parts: ['আ', 'ল', 'ো', 'ক', 'ি', 'ত'],
        partsAudio: ['আ', 'ল', 'ও-কার', 'ক', 'হ্রস্ব ই-কার', 'ত'],
        meaning: 'জ্ঞানের আলোয় উজ্জ্বল',
        icon: '🌟',
      },
      হয়: {
        parts: ['হ', 'য', '়'],
        partsAudio: ['হ', 'অন্তস্থ য়'],
        meaning: 'ঘটিত হয়',
        icon: '✨',
      },
    },
  },
];

let sentenceDbCache: any = null;
let sentenceDbPromise: Promise<any> | null = null;

/**
 * Lazy Dynamic Loader for sentence_db.json (Levels 16-18)
 * Dynamically imported so initial app bundle remains tiny and fast.
 */
export async function loadSentenceDatabase(): Promise<any> {
  if (sentenceDbCache) return sentenceDbCache;
  if (!sentenceDbPromise) {
    sentenceDbPromise = import('./sentence_db.json')
      .then((mod) => {
        sentenceDbCache = mod.default || mod;
        return sentenceDbCache;
      })
      .catch((err) => {
        console.warn('Failed to dynamically load sentence_db.json:', err);
        return {};
      });
  }
  return sentenceDbPromise;
}

export function getSentenceDatabaseSync(): any {
  if (!sentenceDbCache) {
    loadSentenceDatabase();
    return {};
  }
  return sentenceDbCache;
}

export const SENTENCE_DATABASE = new Proxy({}, {
  get(_target, prop) {
    if (!sentenceDbCache) {
      loadSentenceDatabase();
      return [];
    }
    return sentenceDbCache[prop] || [];
  }
});

// Helper to find breakdown across all sentences
export function findSentenceWordBreakdown(word: string): { parts: string[]; partsAudio: string[]; meaning: string; icon: string } {
  const clean = word.replace(/[।,!?]/g, '').trim();

  // Search thematic words
  const tw = THEMATIC_VOCABULARY.find((item) => item.word === clean);
  if (tw) {
    return {
      parts: tw.breakdown,
      partsAudio: tw.breakdownAudio,
      meaning: tw.meaning,
      icon: tw.iconSymbol,
    };
  }

  // Search sentence database (Levels 16, 17, 18) if loaded
  if (sentenceDbCache) {
    for (const lvl of ['level16', 'level17', 'level18'] as const) {
      const list = sentenceDbCache[lvl] || [];
      for (const item of list) {
        if (item.wordsDict && item.wordsDict[clean]) {
          const entry = item.wordsDict[clean];
          return {
            parts: entry.breakdown || clean.split(''),
            partsAudio: entry.partsAudio || clean.split(''),
            meaning: entry.meaning || 'প্রমিত বাংলা শব্দ',
            icon: entry.icon || item.icon || '📖',
          };
        }
      }
    }
  } else {
    loadSentenceDatabase();
  }

  // Search 2-word sentences
  for (const s of TWO_WORD_SENTENCES) {
    if (s.wordBreakdowns[clean]) {
      return s.wordBreakdowns[clean];
    }
  }

  // Search standard sentences
  for (const s of STANDARD_SENTENCES) {
    if (s.wordBreakdowns[clean]) {
      return s.wordBreakdowns[clean];
    }
  }

  // Guaranteed fallback
  const parts = clean.split('');
  return {
    parts,
    partsAudio: parts,
    meaning: 'প্রমিত বাংলা শব্দ',
    icon: '📖',
  };
}
