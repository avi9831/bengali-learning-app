import level1Data from './level_1_alphabets.json';
import level2Data from './level_2_kars.json';
import level3Data from './level_3_phalas.json';
import level4Data from './level_4_juktakkhor.json';
export interface BengaliLetterItem {
  id: string;
  char: string;
  bengaliName: string;
  audioPrompt: string; // Spoken by TTS
  defaultExample: {
    word: string;
    bengaliMeaning: string;
    audioPrompt: string;
  };
  moreExamples: Array<{
    word: string;
    bengaliMeaning: string;
    audioPrompt: string;
  }>;
}

export interface BengaliKarItem {
  id: string;
  sign: string;
  bengaliName: string;
  vowelOrigin: string;
  formulaTts: string;
  examples: Array<{
    word: string;
    breakdown: string;
    audioPrompt: string;
  }>;
}

export const BENGALI_LEVELS_METADATA = [
  { id: 1, bengaliNum: "১", title: "স্বরবর্ণ ও ব্যঞ্জনবর্ণ", subtitle: "৫০টি মৌলিক বর্ণমালা", icon: "BookOpen", color: "#059669" },
  { id: 2, bengaliNum: "২", title: "কার চিহ্ন", subtitle: "১০টি স্বরচিহ্ন ও রূপান্তর", icon: "Sparkles", color: "#4F46E5" },
  { id: 3, bengaliNum: "৩", title: "ফলা চিহ্ন", subtitle: "র-ফলা, য-ফলা, ব-ফলা", icon: "Layers", color: "#7C3AED" },
  { id: 4, bengaliNum: "৪", title: "যুক্তাক্ষর", subtitle: "কঠিন যুক্তবর্ণের মেলবন্ধন", icon: "Puzzle", color: "#E11D48" },
  { id: 5, bengaliNum: "৫", title: "সহজ শব্দ", subtitle: "বই, কলম, আকাশ", icon: "AlignLeft", color: "#D97706" },
  { id: 6, bengaliNum: "৬", title: "কার ও ফলা যুক্ত শব্দ", subtitle: "বিদ্যালয়, সূর্য, বৃষ্টি", icon: "FileText", color: "#0D9488" },
  { id: 7, bengaliNum: "৭", title: "ছোট ছোট বাক্য", subtitle: "সহজ বাক্যের পাঠ", icon: "MessageSquare", color: "#0284C7" },
  { id: 8, bengaliNum: "৮", title: "অনুচ্ছেদ পাঠ", subtitle: "ছোট অনুচ্ছেদ অনুশীলন", icon: "BookMarked", color: "#6366F1" },
  { id: 9, bengaliNum: "৯", title: "ছড়া ও গান", subtitle: "আমাদের ছোট নদী", icon: "Music", color: "#9333EA" },
  { id: 10, bengaliNum: "১০", title: "গল্প ও পরীক্ষা", subtitle: "তৃষ্ণার্ত কাক ও বোধগম্যতা", icon: "Trophy", color: "#CA8A04" },
];

export const SOROBORNO_BENGALI: BengaliLetterItem[] = [
  {
    id: "s1",
    char: "অ",
    bengaliName: "স্বর অ",
    audioPrompt: "অ, স্বর অ। অ-তে অজগর।",
    defaultExample: { word: "অজগর", bengaliMeaning: "সাপ", audioPrompt: "অ-তে অজগর" },
    moreExamples: [
      { word: "অলঙ্কার", bengaliMeaning: "গহনা", audioPrompt: "অ-তে অলঙ্কার" },
      { word: "অমর", bengaliMeaning: "যার মৃত্যু নেই", audioPrompt: "অ-তে অমর" },
      { word: "অনেক", bengaliMeaning: "প্রচুর", audioPrompt: "অ-তে অনেক" },
    ]
  },
  {
    id: "s2",
    char: "আ",
    bengaliName: "স্বর আ",
    audioPrompt: "আ, স্বর আ। আ-তে আম।",
    defaultExample: { word: "আম", bengaliMeaning: "মিষ্টি ফল", audioPrompt: "আ-তে আম" },
    moreExamples: [
      { word: "আকাশ", bengaliMeaning: "নীল গগন", audioPrompt: "আ-তে আকাশ" },
      { word: "আলো", bengaliMeaning: "কিরণ", audioPrompt: "আ-তে আলো" },
      { word: "আনন্দ", bengaliMeaning: "খুশি", audioPrompt: "আ-তে আনন্দ" },
    ]
  },
  {
    id: "s3",
    char: "ই",
    bengaliName: "হ্রস্ব ই",
    audioPrompt: "ই, হ্রস্ব ই। ই-তে ইঁদুর।",
    defaultExample: { word: "ইঁদুর", bengaliMeaning: "ছোট প্রাণী", audioPrompt: "ই-তে ইঁদুর" },
    moreExamples: [
      { word: "ইট", bengaliMeaning: "বাড়ি তৈরির উপাদান", audioPrompt: "ই-তে ইট" },
      { word: "ইলিশ", bengaliMeaning: "রূপালি মাছ", audioPrompt: "ই-তে ইলিশ" },
    ]
  },
  {
    id: "s4",
    char: "ঈ",
    bengaliName: "দীর্ঘ ঈ",
    audioPrompt: "ঈ, দীর্ঘ ঈ। ঈ-তে ঈগল।",
    defaultExample: { word: "ঈগল", bengaliMeaning: "শিকারি পাখি", audioPrompt: "ঈ-তে ঈগল" },
    moreExamples: [
      { word: "ঈদ", bengaliMeaning: "খুশির উৎসব", audioPrompt: "ঈ-তে ঈদ" },
      { word: "ঈশ্বর", bengaliMeaning: "স্রষ্টা", audioPrompt: "ঈ-তে ঈশ্বর" },
    ]
  },
  {
    id: "s5",
    char: "উ",
    bengaliName: "হ্রস্ব উ",
    audioPrompt: "উ, হ্রস্ব উ। উ-তে উট।",
    defaultExample: { word: "উট", bengaliMeaning: "মরুভূমির প্রাণী", audioPrompt: "উ-তে উট" },
    moreExamples: [
      { word: "উপহার", bengaliMeaning: "ভেটের সামগ্রী", audioPrompt: "উ-তে উপহার" },
      { word: "উজ্জ্বল", bengaliMeaning: "দীপ্তিময়", audioPrompt: "উ-তে উজ্জ্বল" },
    ]
  },
  {
    id: "s6",
    char: "ঊ",
    bengaliName: "দীর্ঘ ঊ",
    audioPrompt: "ঊ, দীর্ঘ ঊ। ঊ-তে ঊর্মি।",
    defaultExample: { word: "ঊর্মি", bengaliMeaning: "নদীর ঢেউ", audioPrompt: "ঊ-তে ঊর্মি" },
    moreExamples: [
      { word: "ঊষা", bengaliMeaning: "ভোরের আলো", audioPrompt: "ঊ-তে ঊষা" },
    ]
  },
  {
    id: "s7",
    char: "ঋ",
    bengaliName: "ঋ",
    audioPrompt: "ঋ, যেমন ঋষি।",
    defaultExample: { word: "ঋষি", bengaliMeaning: "সাধু ব্যক্তি", audioPrompt: "ঋ-তে ঋষি" },
    moreExamples: [
      { word: "ঋতু", bengaliMeaning: "কাল / মরশুম", audioPrompt: "ঋ-তে ঋতু" },
      { word: "ঋণ", bengaliMeaning: "ধার করা ধন", audioPrompt: "ঋ-তে ঋণ" },
    ]
  },
  {
    id: "s8",
    char: "এ",
    bengaliName: "স্বর এ",
    audioPrompt: "এ, স্বর এ। এ-তে একতারা।",
    defaultExample: { word: "একতারা", bengaliMeaning: "বাদ্যযন্ত্র", audioPrompt: "এ-তে একতারা" },
    moreExamples: [
      { word: "এক", bengaliMeaning: "সংখ্যা ১", audioPrompt: "এ-তে এক" },
      { word: "একতা", bengaliMeaning: "ঐক্য", audioPrompt: "এ-তে একতা" },
    ]
  },
  {
    id: "s9",
    char: "ঐ",
    bengaliName: "স্বর ঐ",
    audioPrompt: "ঐ, স্বর ঐ। ঐ-তে ঐরাবত।",
    defaultExample: { word: "ঐরাবত", bengaliMeaning: "হাতি", audioPrompt: "ঐ-তে ঐরাবত" },
    moreExamples: [
      { word: "ঐক্য", bengaliMeaning: "মিলন", audioPrompt: "ঐ-তে ঐক্য" },
    ]
  },
  {
    id: "s10",
    char: "ও",
    bengaliName: "স্বর ও",
    audioPrompt: "ও, স্বর ও। ও-তে ওলকপি।",
    defaultExample: { word: "ওলকপি", bengaliMeaning: "সবজি", audioPrompt: "ও-তে ওলকপি" },
    moreExamples: [
      { word: "ওজন", bengaliMeaning: "ভার", audioPrompt: "ও-তে ওজন" },
      { word: "ওষুধ", bengaliMeaning: "রোগ নিরাময়ক", audioPrompt: "ও-তে ওষুধ" },
    ]
  },
  {
    id: "s11",
    char: "ঔ",
    bengaliName: "স্বর ঔ",
    audioPrompt: "ঔ, স্বর ঔ। ঔ-তে ঔষধ।",
    defaultExample: { word: "ঔষধ", bengaliMeaning: "দাওয়াই", audioPrompt: "ঔ-তে ঔষধ" },
    moreExamples: [
      { word: "ঔদার্য", bengaliMeaning: "মহানুভবতা", audioPrompt: "ঔ-তে ঔদার্য" },
    ]
  }
];

export const BANJONBORNO_BENGALI: BengaliLetterItem[] = [
  {
    id: "b1",
    char: "ক",
    bengaliName: "ক",
    audioPrompt: "ক, ক-তে কলম।",
    defaultExample: { word: "কলম", bengaliMeaning: "লেখার কাঠি", audioPrompt: "ক-তে কলম" },
    moreExamples: [
      { word: "কাক", bengaliMeaning: "কালো পাখি", audioPrompt: "ক-তে কাক" },
      { word: "কলা", bengaliMeaning: "মিষ্টি ফল", audioPrompt: "ক-তে কলা" },
    ]
  },
  {
    id: "b2",
    char: "খ",
    bengaliName: "খ",
    audioPrompt: "খ, খ-তে খরগোশ।",
    defaultExample: { word: "খরগোশ", bengaliMeaning: "চঞ্চল প্রাণী", audioPrompt: "খ-তে খরগোশ" },
    moreExamples: [
      { word: "খাতা", bengaliMeaning: "লেখার বই", audioPrompt: "খ-তে খাতা" },
      { word: "খেলনা", bengaliMeaning: "খেলার জিনিস", audioPrompt: "খ-তে খেলনা" },
    ]
  },
  {
    id: "b3",
    char: "গ",
    bengaliName: "গ",
    audioPrompt: "গ, গ-তে গরু।",
    defaultExample: { word: "গরু", bengaliMeaning: "গৃহপালিত পশু", audioPrompt: "গ-তে গরু" },
    moreExamples: [
      { word: "গাছ", bengaliMeaning: "বৃক্ষ", audioPrompt: "গ-তে গাছ" },
      { word: "গান", bengaliMeaning: "সুর", audioPrompt: "গ-তে গান" },
    ]
  },
  {
    id: "b4",
    char: "ঘ",
    bengaliName: "ঘ",
    audioPrompt: "ঘ, ঘ-তে ঘুড়ি।",
    defaultExample: { word: "ঘুড়ি", bengaliMeaning: "উড়ার খেলনা", audioPrompt: "ঘ-তে ঘুড়ি" },
    moreExamples: [
      { word: "ঘর", bengaliMeaning: "বাসস্থান", audioPrompt: "ঘ-তে ঘর" },
      { word: "ঘাস", bengaliMeaning: "সবুজ পাতা", audioPrompt: "ঘ-তে ঘাস" },
    ]
  },
  {
    id: "b5",
    char: "ঙ",
    bengaliName: "ঙ",
    audioPrompt: "ঙ, উঁঙ। ঙ-তে ব্যাঙ।",
    defaultExample: { word: "ব্যাঙ", bengaliMeaning: "জলের প্রাণী", audioPrompt: "ঙ-তে ব্যাঙ" },
    moreExamples: [
      { word: "রঙ", bengaliMeaning: "বর্ণ", audioPrompt: "ঙ-তে রঙ" },
    ]
  },
  {
    id: "b6",
    char: "চ",
    bengaliName: "চ",
    audioPrompt: "চ, চ-তে চশমা।",
    defaultExample: { word: "চশমা", bengaliMeaning: "চোখের কাচ", audioPrompt: "চ-তে চশমা" },
    moreExamples: [
      { word: "চাঁদ", bengaliMeaning: "রাতের কিরণ", audioPrompt: "চ-তে চাঁদ" },
      { word: "চাকা", bengaliMeaning: "গাড়ির চাকা", audioPrompt: "চ-তে চাকা" },
    ]
  },
  {
    id: "b7",
    char: "ছ",
    bengaliName: "ছ",
    audioPrompt: "ছ, ছ-তে ছাতা।",
    defaultExample: { word: "ছাতা", bengaliMeaning: "বৃষ্টির আশ্রয়", audioPrompt: "ছ-তে ছাতা" },
    moreExamples: [
      { word: "ছবি", bengaliMeaning: "চিত্র", audioPrompt: "ছ-তে ছবি" },
      { word: "ছাগল", bengaliMeaning: "পশু", audioPrompt: "ছ-তে ছাগল" },
    ]
  },
  {
    id: "b8",
    char: "জ",
    bengaliName: "বর্গীয় জ",
    audioPrompt: "জ, জ-তে জাহাজ।",
    defaultExample: { word: "জাহাজ", bengaliMeaning: "জলের যান", audioPrompt: "জ-তে জাহাজ" },
    moreExamples: [
      { word: "জল", bengaliMeaning: "পানি", audioPrompt: "জ-তে জল" },
      { word: "জীবন", bengaliMeaning: "প্রাণ", audioPrompt: "জ-তে জীবন" },
    ]
  },
  {
    id: "b9",
    char: "ঝ",
    bengaliName: "ঝ",
    audioPrompt: "ঝ, ঝ-তে ঝুড়ি।",
    defaultExample: { word: "ঝুড়ি", bengaliMeaning: "ডালা", audioPrompt: "ঝ-তে ঝুড়ি" },
    moreExamples: [
      { word: "ঝরনা", bengaliMeaning: "পাহাড়ি জলধারা", audioPrompt: "ঝ-তে ঝরনা" },
    ]
  },
  {
    id: "b10",
    char: "ঞ",
    bengaliName: "ঞ",
    audioPrompt: "ঞ, ইঁয়। ঞ-তে মিঞা।",
    defaultExample: { word: "মিঞা", bengaliMeaning: "সম্মানসূচক ডাক", audioPrompt: "ঞ-তে মিঞা" },
    moreExamples: [
      { word: "মঞ্চ", bengaliMeaning: "নাট্যস্থল", audioPrompt: "মঞ্চ" },
    ]
  },
  {
    id: "b11",
    char: "ট",
    bengaliName: "ট",
    audioPrompt: "ট, ট-তে টুপি।",
    defaultExample: { word: "টুপি", bengaliMeaning: "মাথার টুপি", audioPrompt: "ট-তে টুপি" },
    moreExamples: [
      { word: "টাকা", bengaliMeaning: "মুদ্রা", audioPrompt: "ট-তে টাকা" },
    ]
  },
  {
    id: "b12",
    char: "ঠ",
    bengaliName: "ঠ",
    audioPrompt: "ঠ, ঠ-তে ঠেলাগাড়ি।",
    defaultExample: { word: "ঠেলাগাড়ি", bengaliMeaning: "হাতে টানা যান", audioPrompt: "ঠ-তে ঠেলাগাড়ি" },
    moreExamples: [
      { word: "ঠোঁট", bengaliMeaning: "মুখের অংশ", audioPrompt: "ঠ-তে ঠোঁট" },
    ]
  },
  {
    id: "b13",
    char: "ড",
    bengaliName: "ড",
    audioPrompt: "ড, ড-তে ডাব।",
    defaultExample: { word: "ডাব", bengaliMeaning: "কাঁচা নারিকেল", audioPrompt: "ড-তে ডাব" },
    moreExamples: [
      { word: "ডালিম", bengaliMeaning: "ফল", audioPrompt: "ড-তে ডালিম" },
    ]
  },
  {
    id: "b14",
    char: "ঢ",
    bengaliName: "ঢ",
    audioPrompt: "ঢ, ঢ-তে ঢাক।",
    defaultExample: { word: "ঢাক", bengaliMeaning: "বড় বাদ্য", audioPrompt: "ঢ-তে ঢাক" },
    moreExamples: [
      { word: "ঢাকনা", bengaliMeaning: "হাঁড়ির ঢাকা", audioPrompt: "ঢ-তে ঢাকনা" },
    ]
  },
  {
    id: "b15",
    char: "ণ",
    bengaliName: "মূর্ধন্য ণ",
    audioPrompt: "মূর্ধন্য ণ, ণ-তে হরিণ।",
    defaultExample: { word: "হরিণ", bengaliMeaning: "বনচর পশু", audioPrompt: "ণ-তে হরিণ" },
    moreExamples: [
      { word: "বীণা", bengaliMeaning: "সুরযন্ত্র", audioPrompt: "ণ-তে বীণা" },
    ]
  },
  {
    id: "b16",
    char: "ত",
    bengaliName: "ত",
    audioPrompt: "ত, ত-তে তবলা।",
    defaultExample: { word: "তবলা", bengaliMeaning: "বাদ্যযন্ত্র", audioPrompt: "ত-তে তবলা" },
    moreExamples: [
      { word: "তারা", bengaliMeaning: "নক্ষত্র", audioPrompt: "ত-তে তারা" },
    ]
  },
  {
    id: "b17",
    char: "থ",
    bengaliName: "থ",
    audioPrompt: "থ, থ-তে থালা।",
    defaultExample: { word: "থালা", bengaliMeaning: "খাবার পাত্র", audioPrompt: "থ-তে থালা" },
    moreExamples: [
      { word: "থলি", bengaliMeaning: "ব্যাগ", audioPrompt: "থ-তে থলি" },
    ]
  },
  {
    id: "b18",
    char: "দ",
    bengaliName: "দ",
    audioPrompt: "দ, দ-তে দোয়েল।",
    defaultExample: { word: "দোয়েল", bengaliMeaning: "জাতীয় পাখি", audioPrompt: "দ-তে দোয়েল" },
    moreExamples: [
      { word: "দই", bengaliMeaning: "মিষ্টান্ন", audioPrompt: "দ-তে দই" },
    ]
  },
  {
    id: "b19",
    char: "ধ",
    bengaliName: "ধ",
    audioPrompt: "ধ, ধ-তে ধনুক।",
    defaultExample: { word: "ধনুক", bengaliMeaning: "তীর ছোঁড়ার অস্ত্র", audioPrompt: "ধ-তে ধনুক" },
    moreExamples: [
      { word: "ধান", bengaliMeaning: "শস্য", audioPrompt: "ধ-তে ধান" },
    ]
  },
  {
    id: "b20",
    char: "ন",
    bengaliName: "দন্ত্য ন",
    audioPrompt: "দন্ত্য ন, ন-তে নদী।",
    defaultExample: { word: "নদী", bengaliMeaning: "জলপ্রবাহ", audioPrompt: "ন-তে নদী" },
    moreExamples: [
      { word: "নৌকা", bengaliMeaning: "তরী", audioPrompt: "ন-তে নৌকা" },
    ]
  },
  {
    id: "b21",
    char: "প",
    bengaliName: "প",
    audioPrompt: "প, প-তে পাখি।",
    defaultExample: { word: "পাখি", bengaliMeaning: "উড়ন্ত জীব", audioPrompt: "প-তে পাখি" },
    moreExamples: [
      { word: "পাতা", bengaliMeaning: "গাছের পাতা", audioPrompt: "প-তে পাতা" },
    ]
  },
  {
    id: "b22",
    char: "ফ",
    bengaliName: "ফ",
    audioPrompt: "ফ, ফ-তে ফুল।",
    defaultExample: { word: "ফুল", bengaliMeaning: "পুষ্প", audioPrompt: "ফ-তে ফুল" },
    moreExamples: [
      { word: "ফল", bengaliMeaning: "গাছের ফল", audioPrompt: "ফ-তে ফল" },
    ]
  },
  {
    id: "b23",
    char: "ব",
    bengaliName: "ব",
    audioPrompt: "ব, ব-তে বই।",
    defaultExample: { word: "বই", bengaliMeaning: "পুস্তক", audioPrompt: "ব-তে বই" },
    moreExamples: [
      { word: "বাঘ", bengaliMeaning: "বনের রাজা", audioPrompt: "ব-তে বাঘ" },
    ]
  },
  {
    id: "b24",
    char: "ভ",
    bengaliName: "ভ",
    audioPrompt: "ভ, ভ-তে ভালুক।",
    defaultExample: { word: "ভালুক", bengaliMeaning: "লোমশ পশু", audioPrompt: "ভ-তে ভালুক" },
    moreExamples: [
      { word: "ভাত", bengaliMeaning: "অন্ন", audioPrompt: "ভ-তে ভাত" },
    ]
  },
  {
    id: "b25",
    char: "ম",
    bengaliName: "ম",
    audioPrompt: "ম, ম-তে ময়ূর।",
    defaultExample: { word: "ময়ূর", bengaliMeaning: "পেখম তোলা পাখি", audioPrompt: "ম-তে ময়ূর" },
    moreExamples: [
      { word: "মা", bengaliMeaning: "জননী", audioPrompt: "ম-তে মা" },
    ]
  },
  {
    id: "b26",
    char: "য",
    bengaliName: "অন্তঃস্থ য",
    audioPrompt: "অন্তঃস্থ য, য-তে যাতা।",
    defaultExample: { word: "যাতা", bengaliMeaning: "পেষাই কল", audioPrompt: "য-তে যাতা" },
    moreExamples: [
      { word: "যাত্রা", bengaliMeaning: "গমন", audioPrompt: "য-তে যাত্রা" },
    ]
  },
  {
    id: "b27",
    char: "র",
    bengaliName: "র",
    audioPrompt: "র, র-তে রথ।",
    defaultExample: { word: "রথ", bengaliMeaning: "টানার গাড়ি", audioPrompt: "র-তে রথ" },
    moreExamples: [
      { word: "রাজা", bengaliMeaning: "নৃপতি", audioPrompt: "র-তে রাজা" },
    ]
  },
  {
    id: "b28",
    char: "ল",
    bengaliName: "ল",
    audioPrompt: "ল, ল-তে লাটিম।",
    defaultExample: { word: "লাটিম", bengaliMeaning: "ঘূর্ণায়মান খেলনা", audioPrompt: "ল-তে লাটিম" },
    moreExamples: [
      { word: "লাল", bengaliMeaning: "রক্তবর্ণ", audioPrompt: "ল-তে লাল" },
    ]
  },
  {
    id: "b29",
    char: "শ",
    bengaliName: "তালব্য শ",
    audioPrompt: "তালব্য শ, শ-তে শাপলা।",
    defaultExample: { word: "শাপলা", bengaliMeaning: "জাতীয় ফুল", audioPrompt: "শ-তে শাপলা" },
    moreExamples: [
      { word: "শান্তি", bengaliMeaning: "সুখ", audioPrompt: "শ-তে শান্তি" },
    ]
  },
  {
    id: "b30",
    char: "ষ",
    bengaliName: "মূর্ধন্য ষ",
    audioPrompt: "মূর্ধন্য ষ, ষ-তে ষাঁড়।",
    defaultExample: { word: "ষাঁড়", bengaliMeaning: "বলদ", audioPrompt: "ষ-তে ষাঁড়" },
    moreExamples: [
      { word: "ষড়ঋতু", bengaliMeaning: "ছয়টি কাল", audioPrompt: "ষ-তে ষড়ঋতু" },
    ]
  },
  {
    id: "b31",
    char: "স",
    bengaliName: "দন্ত্য স",
    audioPrompt: "দন্ত্য স, স-তে সিংহ।",
    defaultExample: { word: "সিংহ", bengaliMeaning: "পশুরাজ", audioPrompt: "স-তে সিংহ" },
    moreExamples: [
      { word: "সূর্য", bengaliMeaning: "রবি", audioPrompt: "স-তে সূর্য" },
    ]
  },
  {
    id: "b32",
    char: "হ",
    bengaliName: "হ",
    audioPrompt: "হ, হ-তে হাতি।",
    defaultExample: { word: "হাতি", bengaliMeaning: "গজরাজ", audioPrompt: "হ-তে হাতি" },
    moreExamples: [
      { word: "হাত", bengaliMeaning: "হস্ত", audioPrompt: "হ-তে হাত" },
    ]
  },
  {
    id: "b33",
    char: "ড়",
    bengaliName: "ড-এ শূন্য ড়",
    audioPrompt: "ড-এ শূন্য ড়, ড়-তে গাড়ি।",
    defaultExample: { word: "গাড়ি", bengaliMeaning: "যানবাহন", audioPrompt: "ড়-তে গাড়ি" },
    moreExamples: [
      { word: "বাড়ি", bengaliMeaning: "গৃহ", audioPrompt: "ড়-তে বাড়ি" },
    ]
  },
  {
    id: "b34",
    char: "ঢ়",
    bengaliName: "ঢ-এ শূন্য ঢ়",
    audioPrompt: "ঢ-এ শূন্য ঢ়, ঢ়-তে আষাঢ়।",
    defaultExample: { word: "আষাঢ়", bengaliMeaning: "বর্ষার মাস", audioPrompt: "ঢ়-তে আষাঢ়" },
    moreExamples: [
      { word: "দৃঢ়", bengaliMeaning: "শক্ত", audioPrompt: "ঢ়-তে দৃঢ়" },
    ]
  },
  {
    id: "b35",
    char: "য়",
    bengaliName: "অন্তঃস্থ য়",
    audioPrompt: "অন্তঃস্থ য়, য়-তে পায়রা।",
    defaultExample: { word: "পায়রা", bengaliMeaning: "কপোত / কবুতর", audioPrompt: "য়-তে পায়রা" },
    moreExamples: [
      { word: "আয়না", bengaliMeaning: "দর্পণ", audioPrompt: "য়-তে আয়না" },
    ]
  },
  {
    id: "b36",
    char: "ৎ",
    bengaliName: "খণ্ড ত",
    audioPrompt: "খণ্ড ত, ৎ-তে মৎস্য।",
    defaultExample: { word: "মৎস্য", bengaliMeaning: "মাছ", audioPrompt: "ৎ-তে মৎস্য" },
    moreExamples: [
      { word: "উৎসব", bengaliMeaning: "আনন্দ অনুষ্ঠান", audioPrompt: "ৎ-তে উৎসব" },
    ]
  },
  {
    id: "b37",
    char: "ং",
    bengaliName: "অনুস্বার",
    audioPrompt: "অনুস্বার, যেমন সিংহ।",
    defaultExample: { word: "হংস", bengaliMeaning: "হাঁস", audioPrompt: "অনুস্বার হংস" },
    moreExamples: [
      { word: "মাংস", bengaliMeaning: "গোশত", audioPrompt: "অনুস্বার মাংস" },
    ]
  },
  {
    id: "b38",
    char: "ঃ",
    bengaliName: "বিসর্গ",
    audioPrompt: "বিসর্গ, যেমন দুঃখ।",
    defaultExample: { word: "দুঃখ", bengaliMeaning: "কষ্ট", audioPrompt: "বিসর্গ দুঃখ" },
    moreExamples: [
      { word: "পুনঃ", bengaliMeaning: "আবার", audioPrompt: "বিসর্গ পুনঃ" },
    ]
  },
  {
    id: "b39",
    char: "ঁ",
    bengaliName: "চন্দ্রবিন্দু",
    audioPrompt: "চন্দ্রবিন্দু, যেমন চাঁদ।",
    defaultExample: { word: "চাঁদ", bengaliMeaning: "শশী", audioPrompt: "চন্দ্রবিন্দু চাঁদ" },
    moreExamples: [
      { word: "বাঁশ", bengaliMeaning: "গাছ", audioPrompt: "চন্দ্রবিন্দু বাঁশ" },
    ]
  }
];

export const KAR_LIST_BENGALI: BengaliKarItem[] = [
  {
    id: "k1",
    sign: "া",
    bengaliName: "আ-কার",
    vowelOrigin: "আ",
    formulaTts: "ক যোগ আ-কার সমান কা",
    examples: [
      { word: "বাবা", breakdown: "ব + া + ব + া = বাবা", audioPrompt: "বাবা" },
      { word: "কাকা", breakdown: "ক + া + ক + া = কাকা", audioPrompt: "কাকা" },
      { word: "মামা", breakdown: "ম + া + ম + া = মামা", audioPrompt: "মামা" },
      { word: "গান", breakdown: "গ + া + ন = গান", audioPrompt: "গান" },
    ]
  },
  {
    id: "k2",
    sign: "ি",
    bengaliName: "হ্রস্ব ই-কার",
    vowelOrigin: "ই",
    formulaTts: "ক যোগ ই-কার সমান কি",
    examples: [
      { word: "তিনি", breakdown: "ত + ি + ন + ি = তিনি", audioPrompt: "তিনি" },
      { word: "দিন", breakdown: "দ + ি + ন = দিন", audioPrompt: "দিন" },
      { word: "চিঠি", breakdown: "চ + ি + ঠ + ি = চিঠি", audioPrompt: "চিঠি" },
    ]
  },
  {
    id: "k3",
    sign: "ী",
    bengaliName: "দীর্ঘ ঈ-কার",
    vowelOrigin: "ঈ",
    formulaTts: "ক যোগ দীর্ঘ ঈ-কার সমান কী",
    examples: [
      { word: "নদী", breakdown: "ন + দ + ী = নদী", audioPrompt: "নদী" },
      { word: "পাখি", breakdown: "প + া + খ + ী = পাখি", audioPrompt: "পাখি" },
      { word: "শীত", breakdown: "শ + ী + ত = শীত", audioPrompt: "শীত" },
    ]
  },
  {
    id: "k4",
    sign: "ু",
    bengaliName: "হ্রস্ব উ-কার",
    vowelOrigin: "উ",
    formulaTts: "ক যোগ হ্রস্ব উ-কার সমান কু",
    examples: [
      { word: "ফুল", breakdown: "ফ + ু + ল = ফুল", audioPrompt: "ফুল" },
      { word: "খুকু", breakdown: "খ + ু + ক + ু = খুকু", audioPrompt: "খুকু" },
      { word: "দুধ", breakdown: "দ + ু + ধ = দুধ", audioPrompt: "দুধ" },
    ]
  },
  {
    id: "k5",
    sign: "ূ",
    bengaliName: "দীর্ঘ ঊ-কার",
    vowelOrigin: "ঊ",
    formulaTts: "ক যোগ দীর্ঘ ঊ-কার সমান কূ",
    examples: [
      { word: "মূল", breakdown: "ম + ূ + ল = মূল", audioPrompt: "মূল" },
      { word: "সূর্য", breakdown: "স + ূ + র + ্ + য = সূর্য", audioPrompt: "সূর্য" },
    ]
  },
  {
    id: "k6",
    sign: "ৃ",
    bengaliName: "ঋ-কার",
    vowelOrigin: "ঋ",
    formulaTts: "ক যোগ ঋ-কার সমান কৃ",
    examples: [
      { word: "কৃষক", breakdown: "ক + ৃ + ষ + ক = কৃষক", audioPrompt: "কৃষক" },
      { word: "গৃহ", breakdown: "গ + ৃ + হ = গৃহ", audioPrompt: "গৃহ" },
    ]
  },
  {
    id: "k7",
    sign: "ে",
    bengaliName: "এ-কার",
    vowelOrigin: "এ",
    formulaTts: "ক যোগ এ-কার সমান কে",
    examples: [
      { word: "ছেলে", breakdown: "ছ + ে + ল + ে = ছেলে", audioPrompt: "ছেলে" },
      { word: "মেঘ", breakdown: "ম + ে + ঘ = মেঘ", audioPrompt: "মেঘ" },
    ]
  },
  {
    id: "k8",
    sign: "ৈ",
    bengaliName: "ঐ-কার",
    vowelOrigin: "ঐ",
    formulaTts: "ক যোগ ঐ-কার সমান কৈ",
    examples: [
      { word: "কৈ", breakdown: "ক + ৈ = কৈ মাছ", audioPrompt: "কৈ মাছ" },
      { word: "সৈনিক", breakdown: "স + ৈ + ন + ি + ক = সৈনিক", audioPrompt: "সৈনিক" },
    ]
  },
  {
    id: "k9",
    sign: "ো",
    bengaliName: "ও-কার",
    vowelOrigin: "ও",
    formulaTts: "ক যোগ ও-কার সমান কো",
    examples: [
      { word: "কোকিল", breakdown: "ক + ো + ক + ি + ল = কোকিল", audioPrompt: "কোকিল" },
      { word: "গোলাপ", breakdown: "গ + ো + ল + া + প = গোলাপ", audioPrompt: "গোলাপ" },
    ]
  },
  {
    id: "k10",
    sign: "ৌ",
    bengaliName: "ঔ-কার",
    vowelOrigin: "ঔ",
    formulaTts: "ক যোগ ঔ-কার সমান কৌ",
    examples: [
      { word: "নৌকা", breakdown: "ন + ৌ + ক + া = নৌকা", audioPrompt: "নৌকা" },
      { word: "মৌমাছি", breakdown: "ম + ৌ + ম + া + ছ + ি = মৌমাছি", audioPrompt: "মৌমাছি" },
    ]
  }
];

export const ROOT_CONSONANTS_LIST = ["ক", "খ", "গ", "ঘ", "চ", "জ", "ট", "ত", "দ", "ন", "প", "ব", "ম", "র", "ল", "স", "হ"];
