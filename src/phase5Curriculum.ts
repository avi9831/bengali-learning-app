import { WordBreakdown } from './phase3Curriculum';

// Level 9: অনুচ্ছেদ পাঠ (Paragraphs)
export interface ParagraphItem {
  id: string;
  title: string;
  iconSymbol: string;
  sentences: string[];
  fullAudio: string;
}

export const PARAGRAPH_LIST: ParagraphItem[] = [
  {
    id: "p1",
    title: "আমাদের সুন্দর দেশ",
    iconSymbol: "🇧🇩",
    sentences: [
      "আমাদের দেশ বাংলাদেশ।",
      "এখানে নদী ও সবুজ মাঠ আছে।",
      "পাখিরা গান গায় ও ফুল ফোটে।",
      "আমরা আমাদের দেশকে খুব ভালোবাসি।",
    ],
    fullAudio: "আমাদের দেশ বাংলাদেশ। এখানে নদী ও সবুজ মাঠ আছে। পাখিরা গান গায় ও ফুল ফোটে। আমরা আমাদের দেশকে খুব ভালোবাসি।",
  },
  {
    id: "p2",
    title: "ভোরের সকাল",
    iconSymbol: "🌅",
    sentences: [
      "ভোরে পূর্ব আকাশে সূর্য ওঠে।",
      "পাখিরা মিষ্টি সুরে গান গায়।",
      "শীতল ও স্নিগ্ধ বাতাস বয়।",
      "শিশুরা পাঠশালায় যেতে প্রস্তুত হয়।",
    ],
    fullAudio: "ভোরে পূর্ব আকাশে সূর্য ওঠে। পাখিরা মিষ্টি সুরে গান গায়। শীতল ও স্নিগ্ধ বাতাস বয়। শিশুরা পাঠশালায় যেতে প্রস্তুত হয়।",
  },
  {
    id: "p3",
    title: "বর্ষার বৃষ্টি",
    iconSymbol: "🌧️",
    sentences: [
      "আকাশে ঘন কালো মেঘ ডাকে।",
      "ঝমঝম শব্দে শীতল বৃষ্টি পড়ে।",
      "নদী ও পুকুর জলে ভরে যায়।",
      "চারপাশের গাছপালা সবুজ হয়ে ওঠে।",
    ],
    fullAudio: "আকাশে ঘন কালো মেঘ ডাকে। ঝমঝম শব্দে শীতল বৃষ্টি পড়ে। নদী ও পুকুর জলে ভরে যায়। চারপাশের গাছপালা সবুজ হয়ে ওঠে।",
  },
];

// Level 10: সম্পূর্ণ গল্প (Complete Stories with Interactive Word Breakdown for EVERY word)
export interface StoryWordData {
  word: string;
  parts: string[];
  partsAudio: string[];
  fullAudio: string;
  meaning: string;
  iconSymbol: string;
}

export interface StoryItem {
  id: string;
  title: string;
  iconSymbol: string;
  fullStoryText: string;
  sentences: string[];
  fullAudio: string;
  wordsDict: Record<string, StoryWordData>;
}

export const STORY_DATA: StoryItem = {
  id: "s1",
  title: "বুদ্ধিমান তৃষ্ণার্ত কাক",
  iconSymbol: "🦅",
  fullStoryText: "এক ছিল তৃষ্ণার্ত কাক। সে জলের খোঁজে বনে গেল। একটি কলসিতে অল্প জল ছিল। কাকটি বুদ্ধি করে নুড়ি পাথর ফেলল। জল ওপরে উঠে এলো। কাকটি জল খেয়ে খুশি হলো।",
  sentences: [
    "এক ছিল তৃষ্ণার্ত কাক।",
    "সে জলের খোঁজে বনে গেল।",
    "একটি কলসিতে অল্প জল ছিল।",
    "কাকটি বুদ্ধি করে নুড়ি পাথর ফেলল।",
    "জল ওপরে উঠে এলো।",
    "কাকটি জল খেয়ে খুশি হলো।",
  ],
  fullAudio: "এক ছিল তৃষ্ণার্ত কাক। সে জলের খোঁজে বনে গেল। একটি কলসিতে অল্প জল ছিল। কাকটি বুদ্ধি করে নুড়ি পাথর ফেলল। জল ওপরে উঠে এলো। কাকটি জল খেয়ে খুশি হলো।",
  wordsDict: {
    "এক": {
      word: "এক",
      parts: ["এ", "ক"],
      partsAudio: ["এ", "ক"],
      fullAudio: "এক",
      meaning: "সংখ্যা এক",
      iconSymbol: "☝️",
    },
    "ছিল": {
      word: "ছিল",
      parts: ["ছ", "ি", "ল"],
      partsAudio: ["ছ", "হ্রস্ব ই-কার", "ল"],
      fullAudio: "ছিল",
      meaning: "অতীত অবস্থা",
      iconSymbol: "⏳",
    },
    "তৃষ্ণার্ত": {
      word: "তৃষ্ণার্ত",
      parts: ["ত", "ৃ", "ষ", "্", "ণ", "া", "র", "্", "ত"],
      partsAudio: ["ত", "ঋ-কার", "ষ", "ণ", "আ-কার", "রেফ", "ত"],
      fullAudio: "তৃষ্ণার্ত",
      meaning: "যার জল পিপাসা পেয়েছে",
      iconSymbol: "🥵",
    },
    "কাক": {
      word: "কাক",
      parts: ["ক", "া", "ক"],
      partsAudio: ["ক", "আ-কার", "ক"],
      fullAudio: "কাক",
      meaning: "কালো পাখি",
      iconSymbol: "🦅",
    },
    "সে": {
      word: "সে",
      parts: ["স", "ে"],
      partsAudio: ["দন্ত্য স", "এ-কার"],
      fullAudio: "সে",
      meaning: "ব্যক্তি বা পাখি",
      iconSymbol: "👉",
    },
    "জলের": {
      word: "জলের",
      parts: ["জ", "ল", "ে", "র"],
      partsAudio: ["জ", "ল", "এ-কার", "র"],
      fullAudio: "জলের",
      meaning: "পানির",
      iconSymbol: "💧",
    },
    "খোঁজে": {
      word: "খোঁজে",
      parts: ["খ", "ো", "ঁ", "জ", "ে"],
      partsAudio: ["খ", "ও-কার", "চন্দ্রবিন্দু", "জ", "এ-কার"],
      fullAudio: "খোঁজে",
      meaning: "সন্ধানে",
      iconSymbol: "🔍",
    },
    "বনে": {
      word: "বনে",
      parts: ["ব", "ন", "ে"],
      partsAudio: ["ব", "দন্ত্য ন", "এ-কার"],
      fullAudio: "বনে",
      meaning: "জঙ্গলে বা অরণ্যে",
      iconSymbol: "🌲",
    },
    "গেল": {
      word: "গেল",
      parts: ["গ", "ে", "ল"],
      partsAudio: ["গ", "এ-কার", "ল"],
      fullAudio: "গেল",
      meaning: "প্রস্থান করল",
      iconSymbol: "🚶",
    },
    "একটি": {
      word: "একটি",
      parts: ["এ", "ক", "ট", "ি"],
      partsAudio: ["এ", "ক", "ট", "হ্রস্ব ই-কার"],
      fullAudio: "একটি",
      meaning: "একটি জিনিস",
      iconSymbol: "1️⃣",
    },
    "কলসিতে": {
      word: "কলসিতে",
      parts: ["ক", "ল", "স", "ি", "ত", "ে"],
      partsAudio: ["ক", "ল", "দন্ত্য স", "হ্রস্ব ই-কার", "ত", "এ-কার"],
      fullAudio: "কলসিতে",
      meaning: "মাটির পাত্রে",
      iconSymbol: "🏺",
    },
    "অল্প": {
      word: "অল্প",
      parts: ["অ", "ল", "্", "প"],
      partsAudio: ["অ", "ল", "প"],
      fullAudio: "অল্প",
      meaning: "সামান্য",
      iconSymbol: "🤏",
    },
    "জল": {
      word: "জল",
      parts: ["জ", "ল"],
      partsAudio: ["জ", "ল"],
      fullAudio: "জল",
      meaning: "পানি",
      iconSymbol: "💧",
    },
    "কাকটি": {
      word: "কাকটি",
      parts: ["ক", "া", "ক", "ট", "ি"],
      partsAudio: ["ক", "আ-কার", "ক", "ট", "হ্রস্ব ই-কার"],
      fullAudio: "কাকটি",
      meaning: "পাখিটি",
      iconSymbol: "🦅",
    },
    "বুদ্ধি": {
      word: "বুদ্ধি",
      parts: ["ব", "ু", "দ", "্", "ধ", "ি"],
      partsAudio: ["ব", "হ্রস্ব উ-কার", "দ", "ধ", "হ্রস্ব ই-কার"],
      fullAudio: "বুদ্ধি",
      meaning: "মেধা ও উপায়",
      iconSymbol: "💡",
    },
    "করে": {
      word: "করে",
      parts: ["ক", "র", "ে"],
      partsAudio: ["ক", "র", "এ-কার"],
      fullAudio: "করে",
      meaning: "কাজের মাধ্যমে",
      iconSymbol: "⚙️",
    },
    "নুড়ি": {
      word: "নুড়ি",
      parts: ["ন", "ু", "ড", "়", "ি"],
      partsAudio: ["দন্ত্য ন", "হ্রস্ব উ-কার", "ড়", "হ্রস্ব ই-কার"],
      fullAudio: "নুড়ি",
      meaning: "ছোট পাথর",
      iconSymbol: "🪨",
    },
    "পাথর": {
      word: "পাথর",
      parts: ["প", "া", "থ", "র"],
      partsAudio: ["প", "আ-কার", "থ", "র"],
      fullAudio: "পাথর",
      meaning: "শিলাখণ্ড",
      iconSymbol: "🪨",
    },
    "ফেলল": {
      word: "ফেলল",
      parts: ["ফ", "ে", "ল", "ল"],
      partsAudio: ["ফ", "এ-কার", "ল", "ল"],
      fullAudio: "ফেলল",
      meaning: "নিচে রাখল",
      iconSymbol: "👇",
    },
    "ওপরে": {
      word: "ওপরে",
      parts: ["ও", "প", "র", "ে"],
      partsAudio: ["ও", "প", "র", "এ-কার"],
      fullAudio: "ওপরে",
      meaning: "উঁচু স্থানে",
      iconSymbol: "⬆️",
    },
    "উঠে": {
      word: "উঠে",
      parts: ["উ", "ঠ", "ে"],
      partsAudio: ["হ্রস্ব উ", "ঠ", "এ-কার"],
      fullAudio: "উঠে",
      meaning: "উপরে আসা",
      iconSymbol: "🔝",
    },
    "এলো": {
      word: "এলো",
      parts: ["এ", "ল", "ো"],
      partsAudio: ["এ", "ল", "ও-কার"],
      fullAudio: "এলো",
      meaning: "পৌঁছাল",
      iconSymbol: "✨",
    },
    "খেয়ে": {
      word: "খেয়ে",
      parts: ["খ", "ে", "য়", "ে"],
      partsAudio: ["খ", "এ-কার", "য়", "এ-কার"],
      fullAudio: "খেয়ে",
      meaning: "পান করে",
      iconSymbol: "😋",
    },
    "খুশি": {
      word: "খুশি",
      parts: ["খ", "ু", "শ", "ি"],
      partsAudio: ["খ", "হ্রস্ব উ-কার", "তালব্য শ", "হ্রস্ব ই-কার"],
      fullAudio: "খুশি",
      meaning: "আনন্দিত",
      iconSymbol: "😄",
    },
    "হলো": {
      word: "হলো",
      parts: ["হ", "ল", "ো"],
      partsAudio: ["হ", "ল", "ও-কার"],
      fullAudio: "হলো",
      meaning: "সম্পন্ন হলো",
      iconSymbol: "🎉",
    },
  },
};

// Visual Quiz System (Level Unlocker)
export interface QuizOption {
  id: string;
  displayText: string;
  iconSymbol: string;
  isCorrect: boolean;
}

export interface LevelQuizItem {
  levelId: number;
  audioPrompt: string; // The app speaks this out loud for illiterate learners
  options: QuizOption[];
}

export const LEVEL_QUIZZES: Record<number, LevelQuizItem> = {
  1: {
    levelId: 1,
    audioPrompt: "পাখির ছবিতে চাপ দিন। কোনটি 'কাক'?",
    options: [
      { id: "o1", displayText: "কাক", iconSymbol: "🦅", isCorrect: true },
      { id: "o2", displayText: "সাপ", iconSymbol: "🐍", isCorrect: false },
      { id: "o3", displayText: "গরু", iconSymbol: "🐄", isCorrect: false },
    ],
  },
  2: {
    levelId: 2,
    audioPrompt: "কোনটি 'কাক'? পাখির ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "প্রশ্ন", iconSymbol: "❓", isCorrect: false },
      { id: "o2", displayText: "কাক", iconSymbol: "🦅", isCorrect: true },
      { id: "o3", displayText: "ফুল", iconSymbol: "🌸", isCorrect: false },
    ],
  },
  3: {
    levelId: 3,
    audioPrompt: "কোনটি 'পদ্ম' ফুল? ফুলের ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "বাড়ি", iconSymbol: "🏡", isCorrect: false },
      { id: "o2", displayText: "দরজা", iconSymbol: "🚪", isCorrect: false },
      { id: "o3", displayText: "পদ্ম", iconSymbol: "🪷", isCorrect: true },
    ],
  },
  4: {
    levelId: 4,
    audioPrompt: "কোনটি 'গাছ'? সবুজ গাছের ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "গাছ", iconSymbol: "🌳", isCorrect: true },
      { id: "o2", displayText: "রক্ত", iconSymbol: "🩸", isCorrect: false },
      { id: "o3", displayText: "বাতি", iconSymbol: "💡", isCorrect: false },
    ],
  },
  5: {
    levelId: 5,
    audioPrompt: "কোনটি 'পোশাক'? সুন্দর জামা বা বস্ত্রের ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "নল", iconSymbol: "🥤", isCorrect: false },
      { id: "o2", displayText: "পোশাক", iconSymbol: "👗", isCorrect: true },
      { id: "o3", displayText: "যন্ত্র", iconSymbol: "⚙️", isCorrect: false },
    ],
  },
  6: {
    levelId: 6,
    audioPrompt: "স্কুল বা বিদ্যালয়ের ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "বিদ্যালয়", iconSymbol: "🏫", isCorrect: true },
      { id: "o2", displayText: "বৃষ্টি", iconSymbol: "🌧️", isCorrect: false },
      { id: "o3", displayText: "ফুটবল", iconSymbol: "⚽", isCorrect: false },
    ],
  },
  7: {
    levelId: 7,
    audioPrompt: "কোনটি 'জল'? মিষ্টি পানির ফোঁটার ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "ঘর", iconSymbol: "🏡", isCorrect: false },
      { id: "o2", displayText: "ভাত", iconSymbol: "🍚", isCorrect: false },
      { id: "o3", displayText: "জল", iconSymbol: "💧", isCorrect: true },
    ],
  },
  8: {
    levelId: 8,
    audioPrompt: "'আমি ভাত খাই'। গরম ভাতের থালার ছবিতে চাপ দিন।",
    options: [
      { id: "o1", displayText: "ভাত", iconSymbol: "🍚", isCorrect: true },
      { id: "o2", displayText: "জল", iconSymbol: "💧", isCorrect: false },
      { id: "o3", displayText: "ফুল", iconSymbol: "🌸", isCorrect: false },
    ],
  },
  9: {
    levelId: 9,
    audioPrompt: "সূর্য ওঠার ছবিতে চাপ দিন। সকালের সুন্দর সূর্য কোনটি?",
    options: [
      { id: "o1", displayText: "বৃষ্টি", iconSymbol: "🌧️", isCorrect: false },
      { id: "o2", displayText: "সূর্য", iconSymbol: "🌅", isCorrect: true },
      { id: "o3", displayText: "পতাকা", iconSymbol: "🇧🇩", isCorrect: false },
    ],
  },
  10: {
    levelId: 10,
    audioPrompt: "বুদ্ধিমান তৃষ্ণার্ত কাকের ছবিতে চাপ দিন। কাক কোনটি?",
    options: [
      { id: "o1", displayText: "কাক", iconSymbol: "🦅", isCorrect: true },
      { id: "o2", displayText: "খরগোশ", iconSymbol: "🐇", isCorrect: false },
      { id: "o3", displayText: "কচ্ছপ", iconSymbol: "🐢", isCorrect: false },
    ],
  },
};
