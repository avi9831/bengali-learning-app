export interface DualTextExample {
  id: string;
  displayText: string;
  ttsText: string;
  phoneticGuide: string;
  meaning: string;
  explanation?: string;
}

export interface DualTextItem {
  id: string;
  charOrWord: string;
  displayText: string;
  ttsText: string;
  phoneticGuide: string;
  category: 'soroborno' | 'banjonborno' | 'kar' | 'phala' | 'juktakkhor' | 'word';
  defaultExample: DualTextExample;
  moreExamples: DualTextExample[];
  breakdownFormula?: {
    baseDisplayText: string;
    signDisplayText: string;
    resultDisplayText: string;
    formulaTtsText: string;
  };
}

export const DUAL_TEXT_CURRICULUM: DualTextItem[] = [
  {
    id: "vowel_o",
    charOrWord: "অ",
    displayText: "অ",
    // Raw standalone 'অ' often gets pronounced as English 'O' or swallowed; 'স্বর অ' forces Bengali vowel phonetics
    ttsText: "স্বর অ",
    phoneticGuide: "Shoro O",
    category: "soroborno",
    defaultExample: {
      id: "ex_ojogor",
      displayText: "অজগর",
      ttsText: "অজগর",
      phoneticGuide: "Ojogor",
      meaning: "Python",
      explanation: "Standard inherent O sound"
    },
    moreExamples: [
      {
        id: "ex_olongkar",
        displayText: "অলঙ্কার",
        ttsText: "অলোংকার", // Fixes nasal conjunct timing in Google TTS
        phoneticGuide: "Olongkar",
        meaning: "Jewelry / Ornament"
      },
      {
        id: "ex_onek",
        displayText: "অনেক",
        ttsText: "ওনেক", // In Bengali phonology, initial 'অ' before 'এ' turns into 'ও' sound (O-nek)
        phoneticGuide: "Onek (pronounced as O-nek)",
        meaning: "Many / A lot",
        explanation: "Vowel harmony rule: অ shifts to ও sound"
      }
    ]
  },
  {
    id: "vowel_aa",
    charOrWord: "আ",
    displayText: "আ",
    ttsText: "স্বর আ",
    phoneticGuide: "Shoro Aa",
    category: "soroborno",
    defaultExample: {
      id: "ex_aam",
      displayText: "আম",
      ttsText: "আম",
      phoneticGuide: "Aam",
      meaning: "Mango"
    },
    moreExamples: [
      {
        id: "ex_aakash",
        displayText: "আকাশ",
        ttsText: "আকাশ",
        phoneticGuide: "Aakash",
        meaning: "Sky"
      },
      {
        id: "ex_alo",
        displayText: "আলো",
        ttsText: "আলো",
        phoneticGuide: "Aalo",
        meaning: "Light"
      }
    ]
  },
  {
    id: "vowel_rri",
    charOrWord: "ঋ",
    displayText: "ঋ",
    // Standalone 'ঋ' is often mispronounced or skipped by TTS; respelling with 'ঋষি' or 'রি' provides accurate vocalization
    ttsText: "স্বর ঋ, রি",
    phoneticGuide: "Rri",
    category: "soroborno",
    defaultExample: {
      id: "ex_rishi",
      displayText: "ঋষি",
      ttsText: "রিশি", // TTS reads 'রিশি' cleanly without stuttering on Sanskrit vocalic R
      phoneticGuide: "Rishi",
      meaning: "Sage / Saint",
      explanation: "Phonetically optimized: ঋ pronounced as রি"
    },
    moreExamples: [
      {
        id: "ex_ritu",
        displayText: "ঋতু",
        ttsText: "রিতু",
        phoneticGuide: "Ritu",
        meaning: "Season"
      },
      {
        id: "ex_rin",
        displayText: "ঋণ",
        ttsText: "রিন",
        phoneticGuide: "Rin",
        meaning: "Debt / Loan"
      }
    ]
  },
  {
    id: "cons_kh",
    charOrWord: "ক্ষ",
    displayText: "ক্ষ",
    // Google TTS often fails to synthesize standalone ক্ষ; writing 'ক ও মূর্ধন্য ষ মিলে ক্ষ' provides perfect pronunciation
    ttsText: "যুক্তবর্ণ ক্ষ, খিয়",
    phoneticGuide: "Khya / Khyo",
    category: "juktakkhor",
    defaultExample: {
      id: "ex_khoma",
      displayText: "ক্ষমা",
      ttsText: "খমা", // At word beginning, ক্ষ is pronounced as aspirated 'খ'
      phoneticGuide: "Khoma",
      meaning: "Forgiveness",
      explanation: "Initial conjunct 'ক্ষ' softens to aspirated 'খ'"
    },
    moreExamples: [
      {
        id: "ex_brikkho",
        displayText: "বৃক্ষ",
        ttsText: "ব্রিক্খো", // Medial 'ক্ষ' doubles to 'ক্খ' with vowel rounding
        phoneticGuide: "Brikkho",
        meaning: "Tree",
        explanation: "Medial conjunct 'ক্ষ' doubles into ক্ + খ"
      },
      {
        id: "ex_porikkha",
        displayText: "পরীক্ষা",
        ttsText: "পোরিক্খা",
        phoneticGuide: "Porikkha",
        meaning: "Examination / Test"
      }
    ]
  },
  {
    id: "kar_aa",
    charOrWord: "া",
    displayText: "া",
    ttsText: "আ-কার",
    phoneticGuide: "Aa-kar",
    category: "kar",
    breakdownFormula: {
      baseDisplayText: "ক",
      signDisplayText: "া",
      resultDisplayText: "কা",
      formulaTtsText: "ক যোগ আ-কার সমান কা"
    },
    defaultExample: {
      id: "ex_baba",
      displayText: "বাবা",
      ttsText: "বাবা",
      phoneticGuide: "Baba",
      meaning: "Father"
    },
    moreExamples: [
      {
        id: "ex_kaka",
        displayText: "কাকা",
        ttsText: "কাকা",
        phoneticGuide: "Kaka",
        meaning: "Paternal Uncle"
      },
      {
        id: "ex_poddo",
        displayText: "পদ্ম",
        // The word 'পদ্ম' has silent 'ম' phala that causes gemination and vowel rounding: 'পদ্দো'
        ttsText: "পদ্দো",
        phoneticGuide: "Poddo",
        meaning: "Lotus",
        explanation: "ব-ফলা/ম-ফলা gemination rule: পদ্ম is spoken as পদ্দো"
      },
      {
        id: "ex_bidda",
        displayText: "বিদ্যা",
        ttsText: "বিদ্দা", // য-ফলা geminates previous consonant: দ্ + য = দ্দ
        phoneticGuide: "Bid-da",
        meaning: "Knowledge / Education",
        explanation: "য-ফলা gemination: বিদ্যা spoken as বিদ্দা"
      }
    ]
  }
];
