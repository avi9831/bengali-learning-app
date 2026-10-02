// lib/repositories/phalaData.ts
// Level 3: Days 11-15 Expanded Phala Dataset (য, র, ল, ব, ম, ন/ণ, রেফ)
// 10 to 12 strictly verified words per Phala with visual icons, meanings, and breakdown arrays

import { ExactWordExample } from '../models/curriculumModels';

export const EXPANDED_PHALA_MAP: Record<string, ExactWordExample[]> = {
  // ১. য-ফলা (্য)
  'য-ফলা': [
    { word: 'বাক্য', icon: '💬', meaning: 'মনের ভাব প্রকাশ', ttsAudio: 'বাক্য', breakdown: ['ব', 'া', 'ক', '্', 'য'] },
    { word: 'সত্য', icon: '⚖️', meaning: 'সততা', ttsAudio: 'সত্য', breakdown: ['স', 'ত', '্', 'য'] },
    { word: 'বিদ্যা', icon: '📚', meaning: 'জ্ঞান শিক্ষা', ttsAudio: 'বিদ্যা', breakdown: ['ব', 'ি', 'দ', '্', 'য', 'া'] },
    { word: 'গদ্য', icon: '📖', meaning: 'গল্প পাঠ', ttsAudio: 'গদ্য', breakdown: ['গ', 'দ', '্', 'য'] },
    { word: 'পদ্য', icon: '📜', meaning: 'কবিতা', ttsAudio: 'পদ্য', breakdown: ['প', 'দ', '্', 'য'] },
    { word: 'জন্য', icon: '🎁', meaning: 'কারণে', ttsAudio: 'জন্য', breakdown: ['জ', 'ন', '্', 'য'] },
    { word: 'ধন্য', icon: '🙏', meaning: 'কৃতার্থ', ttsAudio: 'ধন্য', breakdown: ['ধ', 'ন', '্', 'য'] },
    { word: 'বন্যা', icon: '🌊', meaning: 'প্লাবন', ttsAudio: 'বন্যা', breakdown: ['ব', 'ন', '্', 'য', 'া'] },
    { word: 'কন্যা', icon: '👧', meaning: 'মেয়ে', ttsAudio: 'কন্যা', breakdown: ['ক', 'ন', '্', 'য', 'া'] },
    { word: 'বন্য', icon: '🌲', meaning: 'অরণ্যের', ttsAudio: 'বন্য', breakdown: ['ব', 'ন', '্', 'য'] },
    { word: 'খাদ্য', icon: '🍲', meaning: 'আহার', ttsAudio: 'খাদ্য', breakdown: ['খ', 'া', 'দ', '্', 'য'] },
    { word: 'বাদ্য', icon: '🥁', meaning: 'বাজনা', ttsAudio: 'বাদ্য', breakdown: ['ব', 'া', 'দ', '্', 'য'] },
  ],

  // ২. র-ফলা (্র)
  'র-ফলা': [
    { word: 'গ্রাম', icon: '🏡', meaning: 'পল্লী গাঁ', ttsAudio: 'গ্রাম', breakdown: ['গ', '্', 'র', 'া', 'ম'] },
    { word: 'ছাত্র', icon: '🎒', meaning: 'পড়ুয়া', ttsAudio: 'ছাত্র', breakdown: ['ছ', 'া', 'ত', '্', 'র'] },
    { word: 'প্রথম', icon: '🥇', meaning: 'এক নম্বর', ttsAudio: 'প্রথম', breakdown: ['প', '্', 'র', 'থ', 'ম'] },
    { word: 'গ্রহ', icon: '🪐', meaning: 'মহাকাশের গ্রহ', ttsAudio: 'গ্রহ', breakdown: ['গ', '্', 'র', 'হ'] },
    { word: 'প্রাণ', icon: '❤️', meaning: 'জীবন', ttsAudio: 'প্রাণ', breakdown: ['প', '্', 'র', 'া', 'ণ'] },
    { word: 'ঘ্রাণ', icon: '👃', meaning: 'সুগন্ধ', ttsAudio: 'ঘ্রাণ', breakdown: ['ঘ', '্', 'র', 'া', 'ণ'] },
    { word: 'শুভ্র', icon: '⚪', meaning: 'সাদা', ttsAudio: 'শুভ্র', breakdown: ['শ', 'ু', 'ভ', '্', 'র'] },
    { word: 'নম্র', icon: '🙇', meaning: 'বিনয়ী', ttsAudio: 'নম্র', breakdown: ['ন', 'ম', '্', 'র'] },
    { word: 'বজ্র', icon: '⚡', meaning: 'বিদ্যুৎ', ttsAudio: 'বজ্র', breakdown: ['ব', 'জ', '্', 'র'] },
    { word: 'চক্র', icon: '⚙️', meaning: 'চাকা', ttsAudio: 'চক্র', breakdown: ['চ', 'ক', '্', 'র'] },
    { word: 'বক্র', icon: '〰️', meaning: 'বাঁকা', ttsAudio: 'বক্র', breakdown: ['ব', 'ক', '্', 'র'] },
    { word: 'গ্রাস', icon: '🍽️', meaning: 'খাবারের লোকমা', ttsAudio: 'গ্রাস', breakdown: ['গ', '্', 'র', 'া', 'স'] },
  ],

  // ৩. ল-ফলা (্ল)
  'ল-ফলা': [
    { word: 'গ্লাস', icon: '🥛', meaning: 'জলপাত্র', ttsAudio: 'গ্লাস', breakdown: ['গ', '্', 'ল', 'া', 'স'] },
    { word: 'ক্লান্ত', icon: '😴', meaning: 'পরিশ্রান্ত', ttsAudio: 'ক্লান্ত', breakdown: ['ক', '্', 'ল', 'া', 'ন', '্', 'ত'] },
    { word: 'শ্লোক', icon: '📜', meaning: 'বাণী', ttsAudio: 'শ্লোক', breakdown: ['শ', '্', 'ল', 'ো', 'ক'] },
    { word: 'ম্লান', icon: '🥀', meaning: 'মলিন', ttsAudio: 'ম্লান', breakdown: ['ম', '্', 'ল', 'া', 'ন'] },
    { word: 'অম্ল', icon: '🍋', meaning: 'টক স্বাদ', ttsAudio: 'অম্ল', breakdown: ['অ', 'ম', '্', 'ল'] },
    { word: 'বিপ্লব', icon: '✊', meaning: 'আন্দোলন', ttsAudio: 'বিপ্লব', breakdown: ['ব', 'ি', 'প', '্', 'ল', 'ব'] },
    { word: 'প্লাবন', icon: '🌊', meaning: 'বন্যা জোয়ার', ttsAudio: 'প্লাবন', breakdown: ['প', '্', 'ল', 'া', 'ব', 'ন'] },
    { word: 'ক্লাস', icon: '🏫', meaning: 'শ্রেণিকক্ষ', ttsAudio: 'ক্লাস', breakdown: ['ক', '্', 'ল', 'া', 'স'] },
    { word: 'উল্লাস', icon: '🎉', meaning: 'আনন্দ', ttsAudio: 'উল্লাস', breakdown: ['উ', 'ল', '্', 'ল', 'া', 'স'] },
    { word: 'পল্লব', icon: '🍃', meaning: 'কচি পাতা', ttsAudio: 'পল্লব', breakdown: ['প', 'ল', '্', 'ল', 'ব'] },
    { word: 'শুক্ল', icon: '🌕', meaning: 'শুভ্র আলো', ttsAudio: 'শুক্ল', breakdown: ['শ', 'ু', 'ক', '্', 'ল'] },
    { word: 'শ্লেষ্মা', icon: '🤧', meaning: 'কফ সর্দি', ttsAudio: 'শ্লেষ্মা', breakdown: ['শ', '্', 'ল', 'ে', 'ষ', '্', 'ম', 'া'] },
  ],

  // ৪. ব-ফলা (্ব)
  'ব-ফলা': [
    { word: 'অশ্ব', icon: '🐎', meaning: 'ঘোড়া', ttsAudio: 'অশ্ব', breakdown: ['অ', 'শ', '্', 'ব'] },
    { word: 'দ্বীপ', icon: '🏝️', meaning: 'জলের মাঝে জমি', ttsAudio: 'দ্বীপ', breakdown: ['দ', '্', 'ব', 'ী', 'প'] },
    { word: 'দ্বার', icon: '🚪', meaning: 'দরজা', ttsAudio: 'দ্বার', breakdown: ['দ', '্', 'ব', 'া', 'র'] },
    { word: 'বিশ্বাস', icon: '🤝', meaning: 'আস্থা', ttsAudio: 'বিশ্বাস', breakdown: ['ব', 'ি', 'শ', '্', 'ব', 'া', 'স'] },
    { word: 'ধ্বনি', icon: '🔔', meaning: 'শব্দ সুর', ttsAudio: 'ধ্বনি', breakdown: ['ধ', '্', 'ব', 'ন', 'ি'] },
    { word: 'স্বাদ', icon: '👅', meaning: 'রসাস্বাদন', ttsAudio: 'স্বাদ', breakdown: ['স', '্', 'ব', 'া', 'দ'] },
    { word: 'জ্বর', icon: '🤒', meaning: 'তাপমাত্রা', ttsAudio: 'জ্বর', breakdown: ['জ', '্', 'ব', 'র'] },
    { word: 'স্বপ্ন', icon: '💭', meaning: 'ঘুমের দেখা', ttsAudio: 'স্বপ্ন', breakdown: ['স', '্', 'ব', 'প', '্', 'ন'] },
    { word: 'স্বদেশ', icon: '🇧🇩', meaning: 'নিজের দেশ', ttsAudio: 'স্বদেশ', breakdown: ['স', '্', 'ব', 'দ', 'ে', 'শ'] },
    { word: 'ঈশ্বর', icon: '✨', meaning: 'স্রষ্টা', ttsAudio: 'ঈশ্বর', breakdown: ['ঈ', 'শ', '্', 'ব', 'র'] },
    { word: 'স্বাধীন', icon: '🕊️', meaning: 'মুক্ত', ttsAudio: 'স্বাধীন', breakdown: ['স', '্', 'ব', 'া', 'ধ', 'ী', 'ন'] },
    { word: 'অস্বস্তি', icon: '😣', meaning: 'অশান্তি', ttsAudio: 'অস্বস্তি', breakdown: ['অ', 'স', '্', 'ব', 'স', '্', 'ত', 'ি'] },
  ],

  // ৫. ম-ফলা (্ম)
  'ম-ফলা': [
    { word: 'পদ্ম', icon: '🪷', meaning: 'পদ্মফুল', ttsAudio: 'পদ্ম', breakdown: ['প', 'দ', '্', 'ম'] },
    { word: 'ভস্ম', icon: '🌫️', meaning: 'ছাই', ttsAudio: 'ভস্ম', breakdown: ['ভ', 'স', '্', 'ম'] },
    { word: 'স্মৃতি', icon: '🧠', meaning: 'মনে রাখা', ttsAudio: 'স্মৃতি', breakdown: ['স', '্', 'ম', 'ৃ', 'ত', 'ি'] },
    { word: 'স্মরণ', icon: '💭', meaning: 'মনে করা', ttsAudio: 'স্মরণ', breakdown: ['স', '্', 'ম', 'র', 'ণ'] },
    { word: 'আত্মা', icon: '👻', meaning: 'প্রাণ', ttsAudio: 'আত্মা', breakdown: ['আ', 'ত', '্', 'ম', 'া'] },
    { word: 'বিস্ময়', icon: '😲', meaning: 'অবাক হওয়া', ttsAudio: 'বিস্ময়', breakdown: ['ব', 'ি', 'স', '্', 'ম', 'য', '়'] },
    { word: 'রশ্মি', icon: '💡', meaning: 'আলোর রেখা', ttsAudio: 'রশ্মি', breakdown: ['র', 'শ', '্', 'ম', 'ি'] },
    { word: 'গ্রীষ্ম', icon: '☀️', meaning: 'গরম কাল', ttsAudio: 'গ্রীষ্ম', breakdown: ['গ', '্', 'র', 'ী', 'ষ', '্', 'ম'] },
    { word: 'ভীষ্ম', icon: '🏹', meaning: 'বীর যোদ্ধা', ttsAudio: 'ভীষ্ম', breakdown: ['ভ', 'ী', 'ষ', '্', 'ম'] },
    { word: 'আকস্মিক', icon: '⚡', meaning: 'হঠাৎ', ttsAudio: 'আকস্মিক', breakdown: ['আ', 'ক', 'স', '্', 'ম', 'ি', 'ক'] },
    { word: 'মহাত্মা', icon: '🧘', meaning: 'মহান ব্যক্তি', ttsAudio: 'মহাত্মা', breakdown: ['ম', 'হ', 'া', 'ত', '্', 'ম', 'া'] },
    { word: 'ছদ্ম', icon: '🎭', meaning: 'ভেক বেশ', ttsAudio: 'ছদ্ম', breakdown: ['ছ', 'দ', '্', 'ম'] },
  ],

  // ৬. ন/ণ-ফলা (্ন/্ণ)
  'ন-ফলা': [
    { word: 'অগ্নি', icon: '🔥', meaning: 'আগুন', ttsAudio: 'অগ্নি', breakdown: ['অ', 'গ', '্', 'ন', 'ি'] },
    { word: 'রত্ন', icon: '💎', meaning: 'মণিমাণিক্য', ttsAudio: 'রত্ন', breakdown: ['র', 'ত', '্', 'ন'] },
    { word: 'যত্ন', icon: '🤲', meaning: 'আদর সেবা', ttsAudio: 'যত্ন', breakdown: ['য', 'ত', '্', 'ন'] },
    { word: 'রান্না', icon: '🍳', meaning: 'পাক করা', ttsAudio: 'রান্না', breakdown: ['র', 'া', 'ন', '্', 'ন', 'া'] },
    { word: 'অন্ন', icon: '🍚', meaning: 'ভাত', ttsAudio: 'অন্ন', breakdown: ['অ', 'ন', '্', 'ন'] },
    { word: 'কৃষ্ণ', icon: '🦚', meaning: 'কালো বা শ্যামল', ttsAudio: 'কৃষ্ণ', breakdown: ['ক', 'ৃ', 'ষ', '্', 'ণ'] },
    { word: 'মধ্যাহ্ন', icon: '☀️', meaning: 'দুপুরবেলা', ttsAudio: 'মধ্যাহ্ন', breakdown: ['ম', 'ধ', '্', 'য', 'া', 'হ', '্', 'ন'] },
    { word: 'পূর্বাহ্ন', icon: '🌅', meaning: 'সকালবেলা', ttsAudio: 'পূর্বাহ্ন', breakdown: ['প', 'ূ', 'র', '্', 'ব', 'া', 'হ', '্', 'ণ'] },
    { word: 'বিঘ্ন', icon: '🛑', meaning: 'বাধা', ttsAudio: 'বিঘ্ন', breakdown: ['ব', 'ি', 'ঘ', '্', 'ন'] },
    { word: 'ভগ্ন', icon: '🔨', meaning: 'ভাঙা', ttsAudio: 'ভগ্ন', breakdown: ['ভ', 'গ', '্', 'ন'] },
    { word: 'চিহ্ন', icon: '📍', meaning: 'নিদর্শন', ttsAudio: 'চিহ্ন', breakdown: ['চ', 'ি', 'হ', '্', 'ন'] },
    { word: 'তৃষ্ণা', icon: '💧', meaning: 'পিপাসা', ttsAudio: 'তৃষ্ণা', breakdown: ['ত', 'ৃ', 'ষ', '্', 'ণ', 'া'] },
  ],

  // ৭. রেফ (র্)
  'রেফ': [
    { word: 'কর্ম', icon: '🛠️', meaning: 'কাজ', ttsAudio: 'কর্ম', breakdown: ['ক', 'র', '্', 'ম'] },
    { word: 'ধর্ম', icon: '🛕', meaning: 'নীতি', ttsAudio: 'ধর্ম', breakdown: ['ধ', 'র', '্', 'ম'] },
    { word: 'বর্ণ', icon: '🔤', meaning: 'অক্ষর', ttsAudio: 'বর্ণ', breakdown: ['ব', 'র', '্', 'ণ'] },
    { word: 'সূর্য', icon: '☀️', meaning: 'রবি', ttsAudio: 'সূর্য', breakdown: ['স', 'ূ', 'র', '্', 'য'] },
    { word: 'পূর্ব', icon: '🧭', meaning: 'পূর্ব দিক', ttsAudio: 'পূর্ব', breakdown: ['প', 'ূ', 'র', '্', 'ব'] },
    { word: 'পর্বত', icon: '⛰️', meaning: 'পাহাড়', ttsAudio: 'পর্বত', breakdown: ['প', 'র', '্', 'ব', 'ত'] },
    { word: 'অর্থ', icon: '💰', meaning: 'টাকাকড়ি', ttsAudio: 'অর্থ', breakdown: ['অ', 'র', '্', 'থ'] },
    { word: 'তর্ক', icon: '🗣️', meaning: 'যুক্তি লড়াই', ttsAudio: 'তর্ক', breakdown: ['ত', 'র', '্', 'ক'] },
    { word: 'গর্ত', icon: '🕳️', meaning: 'খাত', ttsAudio: 'গর্ত', breakdown: ['গ', 'র', '্', 'ত'] },
    { word: 'শর্ত', icon: '📜', meaning: 'নিয়ম চুক্তি', ttsAudio: 'শর্ত', breakdown: ['শ', 'র', '্', 'ত'] },
    { word: 'চর্ম', icon: '👞', meaning: 'চামড়া', ttsAudio: 'চর্ম', breakdown: ['চ', 'র', '্', 'ম'] },
    { word: 'সর্প', icon: '🐍', meaning: 'সাপ', ttsAudio: 'সর্প', breakdown: ['স', 'র', '্', 'প'] },
  ],
};

// Aliases for modifier signs so lookups work by character as well as by name
EXPANDED_PHALA_MAP['্য'] = EXPANDED_PHALA_MAP['য-ফলা'];
EXPANDED_PHALA_MAP['্র'] = EXPANDED_PHALA_MAP['র-ফলা'];
EXPANDED_PHALA_MAP['্ল'] = EXPANDED_PHALA_MAP['ল-ফলা'];
EXPANDED_PHALA_MAP['্ব'] = EXPANDED_PHALA_MAP['ব-ফলা'];
EXPANDED_PHALA_MAP['্ম'] = EXPANDED_PHALA_MAP['ম-ফলা'];
EXPANDED_PHALA_MAP['্ন'] = EXPANDED_PHALA_MAP['ন-ফলা'];
EXPANDED_PHALA_MAP['্ণ'] = EXPANDED_PHALA_MAP['ন-ফলা'];
EXPANDED_PHALA_MAP['ণ-ফলা'] = EXPANDED_PHALA_MAP['ন-ফলা'];
EXPANDED_PHALA_MAP['র্'] = EXPANDED_PHALA_MAP['রেফ'];
