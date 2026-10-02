export interface WordBreakdown {
  word: string;
  parts: string[]; // e.g. ["প", "দ", "ম"]
  partsAudio: string[]; // e.g. ["প", "দ", "ম"]
  fullAudio: string; // e.g. "পদ্ম"
  meaning: string; // e.g. "পদ্ম ফুল"
  iconSymbol: string; // e.g. "🪷"
}

export interface PhalaItem {
  id: string;
  name: string;
  sign: string;
  baseLetter: string;
  result: string;
  formulaAudio: string;
  sampleWord: WordBreakdown;
  moreWords: WordBreakdown[];
}

export interface JuktakkhorItem {
  id: string;
  firstLetter: string;
  secondLetter: string;
  result: string;
  name: string;
  formulaAudio: string;
  sampleWord: WordBreakdown;
  moreWords: WordBreakdown[];
}

// Level 3: ফলা চিহ্ন (Phala Modifier Signs)
export const PHALA_LIST: PhalaItem[] = [
  {
    id: "p1",
    name: "য-ফলা",
    sign: "্য",
    baseLetter: "ক",
    result: "ক্য",
    formulaAudio: "ক যোগ য-ফলা সমান ক্য",
    sampleWord: {
      word: "বাক্য",
      parts: ["ব", "া", "ক", "্য"],
      partsAudio: ["ব", "আ-কার", "ক", "য-ফলা"],
      fullAudio: "বাক্য",
      meaning: "কথা / বাক্য",
      iconSymbol: "💬"
    },
    moreWords: [
      {
        word: "সূর্য",
        parts: ["স", "ূ", "র", "্", "য"],
        partsAudio: ["স", "দীর্ঘ ঊ-কার", "র", "য"],
        fullAudio: "সূর্য",
        meaning: "সূর্য মামা",
        iconSymbol: "☀️"
      },
      {
        word: "বিদ্যা",
        parts: ["ব", "ি", "দ", "্য", "া"],
        partsAudio: ["ব", "হ্রস্ব ই-কার", "দ", "য-ফলা", "আ-কার"],
        fullAudio: "বিদ্যা",
        meaning: "পড়াশোনা",
        iconSymbol: "📚"
      }
    ]
  },
  {
    id: "p2",
    name: "র-ফলা",
    sign: "্র",
    baseLetter: "ক",
    result: "ক্র",
    formulaAudio: "ক যোগ র-ফলা সমান ক্র",
    sampleWord: {
      word: "গ্রাম",
      parts: ["গ", "্", "র", "া", "ম"],
      partsAudio: ["গ", "র-ফলা", "আ-কার", "ম"],
      fullAudio: "গ্রাম",
      meaning: "সুন্দর গ্রাম",
      iconSymbol: "🏡"
    },
    moreWords: [
      {
        word: "চক্র",
        parts: ["চ", "ক", "্", "র"],
        partsAudio: ["চ", "ক", "র-ফলা"],
        fullAudio: "চক্র",
        meaning: "চাকা",
        iconSymbol: "☸️"
      },
      {
        word: "ছাত্র",
        parts: ["ছ", "া", "ত", "্", "র"],
        partsAudio: ["ছ", "আ-কার", "ত", "র-ফলা"],
        fullAudio: "ছাত্র",
        meaning: "শিক্ষার্থী",
        iconSymbol: "🎒"
      }
    ]
  },
  {
    id: "p3",
    name: "ব-ফলা",
    sign: "্ব",
    baseLetter: "দ",
    result: "দ্ব",
    formulaAudio: "দ যোগ ব-ফলা সমান দ্ব",
    sampleWord: {
      word: "দ্বার",
      parts: ["দ", "্", "ব", "া", "র"],
      partsAudio: ["দ", "ব-ফলা", "আ-কার", "র"],
      fullAudio: "দ্বার",
      meaning: "দরজা",
      iconSymbol: "🚪"
    },
    moreWords: [
      {
        word: "শ্বাস",
        parts: ["শ", "্", "ব", "া", "স"],
        partsAudio: ["তালব্য শ", "ব-ফলা", "আ-কার", "দন্ত্য স"],
        fullAudio: "শ্বাস",
        meaning: "নিশ্বাস",
        iconSymbol: "🫁"
      },
      {
        word: "ধ্বনি",
        parts: ["ধ", "্", "ব", "ন", "ি"],
        partsAudio: ["ধ", "ব-ফলা", "দন্ত্য ন", "হ্রস্ব ই-কার"],
        fullAudio: "ধ্বনি",
        meaning: "আওয়াজ",
        iconSymbol: "🔔"
      }
    ]
  },
  {
    id: "p4",
    name: "ল-ফলা",
    sign: "্ল",
    baseLetter: "ক",
    result: "ক্ল",
    formulaAudio: "ক যোগ ল-ফলা সমান ক্ল",
    sampleWord: {
      word: "ক্লান্ত",
      parts: ["ক", "্", "ল", "া", "ন", "্", "ত"],
      partsAudio: ["ক", "ল-ফলা", "আ-কার", "দন্ত্য ন", "ত"],
      fullAudio: "ক্লান্ত",
      meaning: "পরিশ্রান্ত",
      iconSymbol: "😴"
    },
    moreWords: [
      {
        word: "গ্লাস",
        parts: ["গ", "্", "ল", "া", "স"],
        partsAudio: ["গ", "ল-ফলা", "আ-কার", "দন্ত্য স"],
        fullAudio: "গ্লাস",
        meaning: "জলের পাত্র",
        iconSymbol: "🥛"
      }
    ]
  },
  {
    id: "p5",
    name: "ম-ফলা",
    sign: "্ম",
    baseLetter: "প",
    result: "দ্ম",
    formulaAudio: "দ যোগ ম-ফলা সমান দ্ম",
    sampleWord: {
      word: "পদ্ম",
      parts: ["প", "দ", "্", "ম"],
      partsAudio: ["প", "দ", "ম-ফলা"],
      fullAudio: "পদ্ম",
      meaning: "পদ্ম ফুল",
      iconSymbol: "🪷"
    },
    moreWords: [
      {
        word: "ভস্ম",
        parts: ["ভ", "স", "্", "ম"],
        partsAudio: ["ভ", "দন্ত্য স", "ম-ফলা"],
        fullAudio: "ভস্ম",
        meaning: "ছাই",
        iconSymbol: "🔥"
      }
    ]
  }
];

// Level 4: যুক্তাক্ষর (Conjunct Consonants)
export const JUKTAKKHOR_LIST: JuktakkhorItem[] = [
  {
    id: "j1",
    firstLetter: "ক",
    secondLetter: "ষ",
    result: "ক্ষ",
    name: "খিয়",
    formulaAudio: "ক যোগ মূর্ধন্য ষ সমান ক্ষ",
    sampleWord: {
      word: "বৃক্ষ",
      parts: ["ব", "ৃ", "ক", "্", "ষ"],
      partsAudio: ["ব", "ঋ-কার", "ক", "মূর্ধন্য ষ"],
      fullAudio: "বৃক্ষ",
      meaning: "গাছপালা",
      iconSymbol: "🌳"
    },
    moreWords: [
      {
        word: "শিক্ষক",
        parts: ["শ", "ি", "ক", "্", "ষ", "ক"],
        partsAudio: ["তালব্য শ", "হ্রস্ব ই-কার", "ক্ষ", "ক"],
        fullAudio: "শিক্ষক",
        meaning: "গুরুজন",
        iconSymbol: "👨‍🏫"
      },
      {
        word: "পক্ষী",
        parts: ["প", "ক", "্", "ষ", "ী"],
        partsAudio: ["প", "ক্ষ", "দীর্ঘ ঈ-কার"],
        fullAudio: "পক্ষী",
        meaning: "পাখি",
        iconSymbol: "🐦"
      }
    ]
  },
  {
    id: "j2",
    firstLetter: "ক",
    secondLetter: "ত",
    result: "ক্ত",
    name: "ক-এ ত",
    formulaAudio: "ক যোগ ত সমান ক্ত",
    sampleWord: {
      word: "রক্ত",
      parts: ["র", "ক", "্", "ত"],
      partsAudio: ["র", "ক", "ত"],
      fullAudio: "রক্ত",
      meaning: "লাল রক্ত",
      iconSymbol: "🩸"
    },
    moreWords: [
      {
        word: "ভক্তি",
        parts: ["ভ", "ক", "্", "ত", "ি"],
        partsAudio: ["ভ", "ক", "ত", "হ্রস্ব ই-কার"],
        fullAudio: "ভক্তি",
        meaning: "শ্রদ্ধা",
        iconSymbol: "🙏"
      },
      {
        word: "শক্তি",
        parts: ["শ", "ক", "্", "ত", "ি"],
        partsAudio: ["তালব্য শ", "ক", "ত", "হ্রস্ব ই-কার"],
        fullAudio: "শক্তি",
        meaning: "বল",
        iconSymbol: "💪"
      }
    ]
  },
  {
    id: "j3",
    firstLetter: "জ",
    secondLetter: "ঞ",
    result: "জ্ঞ",
    name: "জ-এ ঞ",
    formulaAudio: "জ যোগ ঞ সমান জ্ঞ",
    sampleWord: {
      word: "জ্ঞান",
      parts: ["জ", "্", "ঞ", "া", "ন"],
      partsAudio: ["জ", "ঞ", "আ-কার", "দন্ত্য ন"],
      fullAudio: "জ্ঞান",
      meaning: "বুদ্ধি",
      iconSymbol: "💡"
    },
    moreWords: [
      {
        word: "বিজ্ঞান",
        parts: ["ব", "ি", "জ", "্", "ঞ", "া", "ন"],
        partsAudio: ["ব", "হ্রস্ব ই-কার", "জ্ঞ", "আ-কার", "দন্ত্য ন"],
        fullAudio: "বিজ্ঞান",
        meaning: "আবিষ্কার",
        iconSymbol: "🔬"
      }
    ]
  },
  {
    id: "j4",
    firstLetter: "ত",
    secondLetter: "ত",
    result: "ত্ত",
    name: "ত-এ ত",
    formulaAudio: "ত যোগ ত সমান ত্ত",
    sampleWord: {
      word: "উত্তর",
      parts: ["উ", "ত", "্", "ত", "র"],
      partsAudio: ["হ্রস্ব উ", "ত", "ত", "র"],
      fullAudio: "উত্তর",
      meaning: "জবাব",
      iconSymbol: "🧭"
    },
    moreWords: [
      {
        word: "বিত্ত",
        parts: ["ব", "ি", "ত", "্", "ত"],
        partsAudio: ["ব", "হ্রস্ব ই-কার", "ত", "ত"],
        fullAudio: "বিত্ত",
        meaning: "ধন-সম্পদ",
        iconSymbol: "💰"
      }
    ]
  },
  {
    id: "j5",
    firstLetter: "শ",
    secondLetter: "র",
    result: "শ্র",
    name: "তালব্য শ-এ র-ফলা",
    formulaAudio: "তালব্য শ যোগ র সমান শ্র",
    sampleWord: {
      word: "শ্রদ্ধা",
      parts: ["শ", "্", "র", "দ", "্", "ধ", "া"],
      partsAudio: ["শ্র", "দ", "ধ", "আ-কার"],
      fullAudio: "শ্রদ্ধা",
      meaning: "ভক্তি ও সম্মান",
      iconSymbol: "🌸"
    },
    moreWords: [
      {
        word: "শ্রম",
        parts: ["শ", "্", "র", "ম"],
        partsAudio: ["শ্র", "ম"],
        fullAudio: "শ্রম",
        meaning: "কঠোর কাজ",
        iconSymbol: "⚒️"
      }
    ]
  }
];

export const ALL_LEVELS = [
  { id: 1, bengaliNum: "১", title: "স্বরবর্ণ ও ব্যঞ্জনবর্ণ", icon: "⭐" },
  { id: 2, bengaliNum: "২", title: "কার চিহ্ন", icon: "✨" },
  { id: 3, bengaliNum: "৩", title: "ফলা চিহ্ন", icon: "🌿" },
  { id: 4, bengaliNum: "৪", title: "যুক্তাক্ষর", icon: "🧩" },
  { id: 5, bengaliNum: "৫", title: "সহজ শব্দ", icon: "📖" },
  { id: 6, bengaliNum: "৬", title: "কার ও ফলা যুক্ত শব্দ", icon: "📝" },
  { id: 7, bengaliNum: "৭", title: "ছোট বাক্য", icon: "💬" },
  { id: 8, bengaliNum: "৮", title: "অনুচ্ছেদ", icon: "📜" },
  { id: 9, bengaliNum: "৯", title: "ছড়া", icon: "🎵" },
  { id: 10, bengaliNum: "১০", title: "গল্প", icon: "🏆" },
];
