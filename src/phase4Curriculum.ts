import { WordBreakdown } from './phase3Curriculum';

// Level 5: কঠিন যুক্তাক্ষর (Advanced 3-letter conjuncts)
export interface AdvancedConjunctItem {
  id: string;
  firstLetter: string;
  secondLetter: string;
  thirdLetter: string;
  result: string;
  name: string;
  formulaAudio: string;
  sampleWord: WordBreakdown;
  moreWords: WordBreakdown[];
}

export const ADVANCED_CONJUNCTS_LIST: AdvancedConjunctItem[] = [
  {
    id: "ac1",
    firstLetter: "স",
    secondLetter: "ত",
    thirdLetter: "্র",
    result: "স্ত্র",
    name: "দন্ত্য স-এ ত-এ র-ফলা",
    formulaAudio: "দন্ত্য স যোগ ত যোগ র-ফলা সমান স্ত্র",
    sampleWord: {
      word: "বস্ত্র",
      parts: ["ব", "স", "্", "ত", "্", "র"],
      partsAudio: ["ব", "দন্ত্য স", "ত", "র-ফলা"],
      fullAudio: "বস্ত্র",
      meaning: "পোশাক / জামাকাপড়",
      iconSymbol: "👗",
    },
    moreWords: [
      {
        word: "অস্ত্র",
        parts: ["অ", "স", "্", "ত", "্", "র"],
        partsAudio: ["অ", "দন্ত্য স", "ত", "র-ফলা"],
        fullAudio: "অস্ত্র",
        meaning: "হাতিয়ার",
        iconSymbol: "⚔️",
      },
      {
        word: "স্ত্রী",
        parts: ["স", "্", "ত", "্", "র", "ী"],
        partsAudio: ["দন্ত্য স", "ত", "র-ফলা", "দীর্ঘ ঈ-কার"],
        fullAudio: "স্ত্রী",
        meaning: "নারী / গৃহিণী",
        iconSymbol: "👩",
      },
    ],
  },
  {
    id: "ac2",
    firstLetter: "স",
    secondLetter: "ট",
    thirdLetter: "্র",
    result: "স্ট্র",
    name: "দন্ত্য স-এ ট-এ র-ফলা",
    formulaAudio: "দন্ত্য স যোগ ট যোগ র-ফলা সমান স্ট্র",
    sampleWord: {
      word: "স্ট্র",
      parts: ["স", "্", "ট", "্", "র"],
      partsAudio: ["দন্ত্য স", "ট", "র-ফলা"],
      fullAudio: "স্ট্র",
      meaning: "পানীয় পানের নল",
      iconSymbol: "🥤",
    },
    moreWords: [
      {
        word: "স্ট্রিট",
        parts: ["স", "্", "ট", "্", "র", "ি", "ট"],
        partsAudio: ["দন্ত্য স", "ট", "র-ফলা", "হ্রস্ব ই-কার", "ট"],
        fullAudio: "স্ট্রিট",
        meaning: "রাস্তা",
        iconSymbol: "🛣️",
      },
    ],
  },
  {
    id: "ac3",
    firstLetter: "স",
    secondLetter: "প",
    thirdLetter: "্র",
    result: "স্প্র",
    name: "দন্ত্য স-এ প-এ র-ফলা",
    formulaAudio: "দন্ত্য স যোগ প যোগ র-ফলা সমান স্প্র",
    sampleWord: {
      word: "স্প্রিং",
      parts: ["স", "্", "প", "্", "র", "ি", "ং"],
      partsAudio: ["দন্ত্য স", "প", "র-ফলা", "হ্রস্ব ই-কার", "অনুস্বার"],
      fullAudio: "স্প্রিং",
      meaning: "স্প্রিং",
      iconSymbol: "🌀",
    },
    moreWords: [
      {
        word: "স্প্রে",
        parts: ["স", "্", "প", "্", "র", "ে"],
        partsAudio: ["দন্ত্য স", "প", "র-ফলা", "এ-কার"],
        fullAudio: "স্প্রে",
        meaning: "ছিটানো",
        iconSymbol: "💨",
      },
    ],
  },
  {
    id: "ac4",
    firstLetter: "ন",
    secondLetter: "ত",
    thirdLetter: "্র",
    result: "ন্ত্র",
    name: "দন্ত্য ন-এ ত-এ র-ফলা",
    formulaAudio: "দন্ত্য ন যোগ ত যোগ র-ফলা সমান ন্ত্র",
    sampleWord: {
      word: "যন্ত্র",
      parts: ["য", "ন", "্", "ত", "্", "র"],
      partsAudio: ["য", "দন্ত্য ন", "ত", "র-ফলা"],
      fullAudio: "যন্ত্র",
      meaning: "কলকব্জা",
      iconSymbol: "⚙️",
    },
    moreWords: [
      {
        word: "মন্ত্র",
        parts: ["ম", "ন", "্", "ত", "্", "র"],
        partsAudio: ["ম", "দন্ত্য ন", "ত", "র-ফলা"],
        fullAudio: "মন্ত্র",
        meaning: "জপমালা",
        iconSymbol: "📿",
      },
    ],
  },
  {
    id: "ac5",
    firstLetter: "ক",
    secondLetter: "ষ",
    thirdLetter: "্ম",
    result: "ক্ষ্ম",
    name: "ক-এ মূর্ধন্য ষ-এ ম-ফলা",
    formulaAudio: "ক যোগ মূর্ধন্য ষ যোগ ম-ফলা সমান ক্ষ্ম",
    sampleWord: {
      word: "সূক্ষ্ম",
      parts: ["স", "ূ", "ক", "্", "ষ", "্", "ম"],
      partsAudio: ["দন্ত্য স", "দীর্ঘ ঊ-কার", "ক্ষ", "ম-ফলা"],
      fullAudio: "সূক্ষ্ম",
      meaning: "খুব ছোট / সূক্ষ্ম",
      iconSymbol: "🔍",
    },
    moreWords: [
      {
        word: "লক্ষ্মী",
        parts: ["ল", "ক", "্", "ষ", "্", "ম", "ী"],
        partsAudio: ["ল", "ক্ষ", "ম-ফলা", "দীর্ঘ ঈ-কার"],
        fullAudio: "লক্ষ্মী",
        meaning: "মঙ্গলময়",
        iconSymbol: "🪷",
      },
    ],
  },
];

// Level 6: শব্দ গঠন (Word Mechanics)
export interface WordMechanicsItem {
  id: string;
  word: string;
  iconSymbol: string;
  meaning: string;
  breakdown: WordBreakdown;
  soundSequence: string; // audio guidance
}

export const WORD_MECHANICS_LIST: WordMechanicsItem[] = [
  {
    id: "wm1",
    word: "বিদ্যালয়",
    iconSymbol: "🏫",
    meaning: "পড়াশোনার স্থান",
    soundSequence: "ব-এ হ্রস্ব ই-কার বি, দ-এ য-ফলা আ-কার দ্যা, ল, অন্তস্থ য় — বিদ্যালয়",
    breakdown: {
      word: "বিদ্যালয়",
      parts: ["ব", "ি", "দ", "্য", "া", "ল", "য়"],
      partsAudio: ["ব", "হ্রস্ব ই-কার", "দ", "য-ফলা", "আ-কার", "ল", "য়"],
      fullAudio: "বিদ্যালয়",
      meaning: "স্কুল / পাঠশালা",
      iconSymbol: "🏫",
    },
  },
  {
    id: "wm2",
    word: "বৃষ্টি",
    iconSymbol: "🌧️",
    meaning: "মেঘের জলধারা",
    soundSequence: "ব-এ ঋ-কার বৃ, মূর্ধন্য ষ-এ ট-এ হ্রস্ব ই-কার ষ্টি — বৃষ্টি",
    breakdown: {
      word: "বৃষ্টি",
      parts: ["ব", "ৃ", "ষ", "্", "ট", "ি"],
      partsAudio: ["ব", "ঋ-কার", "ষ", "ট", "হ্রস্ব ই-কার"],
      fullAudio: "বৃষ্টি",
      meaning: "মেঘের বৃষ্টি",
      iconSymbol: "🌧️",
    },
  },
  {
    id: "wm3",
    word: "প্রজাপতি",
    iconSymbol: "🦋",
    meaning: "রঙিন ডানাওয়ালা পোকা",
    soundSequence: "প-এ র-ফলা প্র, জ-এ আ-কার জা, প, ত-এ হ্রস্ব ই-কার তি — প্রজাপতি",
    breakdown: {
      word: "প্রজাপতি",
      parts: ["প", "্", "র", "জ", "া", "প", "ত", "ি"],
      partsAudio: ["প", "র-ফলা", "জ", "আ-কার", "প", "ত", "হ্রস্ব ই-কার"],
      fullAudio: "প্রজাপতি",
      meaning: "সুন্দর প্রজাপতি",
      iconSymbol: "🦋",
    },
  },
  {
    id: "wm4",
    word: "ফুটবল",
    iconSymbol: "⚽",
    meaning: "পায়ের বল খেলা",
    soundSequence: "ফ-এ হ্রস্ব উ-কার ফু, ট, ব, ল — ফুটবল",
    breakdown: {
      word: "ফুটবল",
      parts: ["ফ", "ু", "ট", "ব", "ল"],
      partsAudio: ["ফ", "হ্রস্ব উ-কার", "ট", "ব", "ল"],
      fullAudio: "ফুটবল",
      meaning: "খেলার বল",
      iconSymbol: "⚽",
    },
  },
  {
    id: "wm5",
    word: "জন্মদিন",
    iconSymbol: "🎂",
    meaning: "শুভ জন্মদিবস",
    soundSequence: "জ, দন্ত্য ন-এ ম-ফলা জন্ম, দ-এ হ্রস্ব ই-কার দি, দন্ত্য ন — জন্মদিন",
    breakdown: {
      word: "জন্মদিন",
      parts: ["জ", "ন", "্", "ম", "দ", "ি", "ন"],
      partsAudio: ["জ", "ন", "ম-ফলা", "দ", "হ্রস্ব ই-কার", "ন"],
      fullAudio: "জন্মদিন",
      meaning: "জন্মদিন",
      iconSymbol: "🎂",
    },
  },
];

// Level 7: শব্দ পরিচয় (Vocabulary - Nouns, Verbs, Pronouns)
export interface VocabularyItem {
  id: string;
  category: "noun" | "verb" | "pronoun";
  categoryBengali: string;
  word: string;
  iconSymbol: string;
  meaning: string;
  audioPrompt: string;
}

export const VOCABULARY_LIST: VocabularyItem[] = [
  // বিশেষ্য (Nouns / জিনিস ও স্থান)
  {
    id: "v1",
    category: "noun",
    categoryBengali: "জিনিস ও প্রকৃতি",
    word: "ঘর",
    iconSymbol: "🏡",
    meaning: "বাসস্থান",
    audioPrompt: "ঘর। বসবাসের ঘর।",
  },
  {
    id: "v2",
    category: "noun",
    categoryBengali: "জিনিস ও প্রকৃতি",
    word: "জল",
    iconSymbol: "💧",
    meaning: "পানি",
    audioPrompt: "জল। তৃষ্ণার মিষ্টি জল।",
  },
  {
    id: "v3",
    category: "noun",
    categoryBengali: "জিনিস ও প্রকৃতি",
    word: "গাছ",
    iconSymbol: "🌳",
    meaning: "সবুজ গাছপালা",
    audioPrompt: "গাছ। সবুজ ছায়াঘেরা গাছ।",
  },
  {
    id: "v4",
    category: "noun",
    categoryBengali: "জিনিস ও প্রকৃতি",
    word: "বই",
    iconSymbol: "📖",
    meaning: "পড়ার বই",
    audioPrompt: "বই। জ্ঞানের বই।",
  },
  {
    id: "v5",
    category: "noun",
    categoryBengali: "জিনিস ও প্রকৃতি",
    word: "ভাত",
    iconSymbol: "🍚",
    meaning: "খাবার",
    audioPrompt: "ভাত। গরম ভাত।",
  },

  // ক্রিয়া (Verbs / কাজ)
  {
    id: "v6",
    category: "verb",
    categoryBengali: "কাজকর্ম",
    word: "খাওয়া",
    iconSymbol: "🍽️",
    meaning: "আহার করা",
    audioPrompt: "খাওয়া। খাবার খাওয়া।",
  },
  {
    id: "v7",
    category: "verb",
    categoryBengali: "কাজকর্ম",
    word: "ঘুমানো",
    iconSymbol: "😴",
    meaning: "বিশ্রাম নেওয়া",
    audioPrompt: "ঘুমানো। রাতে ঘুমানো।",
  },
  {
    id: "v8",
    category: "verb",
    categoryBengali: "কাজকর্ম",
    word: "পড়া",
    iconSymbol: "📚",
    meaning: "শেখা",
    audioPrompt: "পড়া। মনোযোগ দিয়ে পড়া।",
  },
  {
    id: "v9",
    category: "verb",
    categoryBengali: "কাজকর্ম",
    word: "দৌড়ানো",
    iconSymbol: "🏃",
    meaning: "ছুটে চলা",
    audioPrompt: "দৌড়ানো। মাঠে দৌড়ানো।",
  },
  {
    id: "v10",
    category: "verb",
    categoryBengali: "কাজকর্ম",
    word: "দেখা",
    iconSymbol: "👁️",
    meaning: "নয়ন দিয়ে দেখা",
    audioPrompt: "দেখা। চোখ মেলে দেখা।",
  },

  // সর্বনাম (Pronouns / ব্যক্তি)
  {
    id: "v11",
    category: "pronoun",
    categoryBengali: "ব্যক্তি",
    word: "আমি",
    iconSymbol: "🙋",
    meaning: "নিজেকে বোঝায়",
    audioPrompt: "আমি।",
  },
  {
    id: "v12",
    category: "pronoun",
    categoryBengali: "ব্যক্তি",
    word: "তুমি",
    iconSymbol: "👉",
    meaning: "সামনের মানুষ",
    audioPrompt: "তুমি।",
  },
  {
    id: "v13",
    category: "pronoun",
    categoryBengali: "ব্যক্তি",
    word: "সে",
    iconSymbol: "👤",
    meaning: "অন্য একজন",
    audioPrompt: "সে।",
  },
  {
    id: "v14",
    category: "pronoun",
    categoryBengali: "ব্যক্তি",
    word: "আমরা",
    iconSymbol: "👥",
    meaning: "সবাই একসাথে",
    audioPrompt: "আমরা।",
  },
];

// Level 8: বাক্য গঠন (Basic 2-3 Word Sentences)
export interface SentenceItem {
  id: string;
  sentenceText: string;
  iconSymbol: string;
  words: string[];
  wordsAudio: string[];
  fullAudio: string;
  meaning: string;
}

export const SENTENCE_LIST: SentenceItem[] = [
  {
    id: "s1",
    sentenceText: "আমি ভাত খাই।",
    iconSymbol: "🍚",
    words: ["আমি", "ভাত", "খাই।"],
    wordsAudio: ["আমি", "ভাত", "খাই"],
    fullAudio: "আমি ভাত খাই।",
    meaning: "খাবার খাওয়ার বাক্য",
  },
  {
    id: "s2",
    sentenceText: "জল পড়ে।",
    iconSymbol: "💧",
    words: ["জল", "পড়ে।"],
    wordsAudio: ["জল", "পড়ে"],
    fullAudio: "জল পড়ে।",
    meaning: "বৃষ্টি বা জলের ধারা",
  },
  {
    id: "s3",
    sentenceText: "পাখি গান গায়।",
    iconSymbol: "🐦",
    words: ["পাখি", "গান", "গায়।"],
    wordsAudio: ["পাখি", "গান", "গায়"],
    fullAudio: "পাখি গান গায়।",
    meaning: "পাখির মধুর সুর",
  },
  {
    id: "s4",
    sentenceText: "সূর্য আলো দেয়।",
    iconSymbol: "☀️",
    words: ["সূর্য", "আলো", "দেয়।"],
    wordsAudio: ["সূর্য", "আলো", "দেয়"],
    fullAudio: "সূর্য আলো দেয়।",
    meaning: "দিনের রোদ ও আলো",
  },
  {
    id: "s5",
    sentenceText: "ফুল ফোটে।",
    iconSymbol: "🌸",
    words: ["ফুল", "ফোটে।"],
    wordsAudio: ["ফুল", "ফোটে"],
    fullAudio: "ফুল ফোটে।",
    meaning: "বাগানের ফুল",
  },
  {
    id: "s6",
    sentenceText: "আমরা স্কুলে যাই।",
    iconSymbol: "🎒",
    words: ["আমরা", "স্কুলে", "যাই।"],
    wordsAudio: ["আমরা", "স্কুলে", "যাই"],
    fullAudio: "আমরা স্কুলে যাই।",
    meaning: "পড়াশোনা করতে যাওয়া",
  },
];
