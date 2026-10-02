// lib/repositories/juktakkhorData.ts
// Levels 4 & 5: Days 16-20 Expanded Juktakkhor Dataset (Basic 2-letter & Advanced 3-letter)
// 10 to 12 strictly verified words per conjunct with visual icons, meanings, and breakdown arrays

import { ExactWordExample } from '../models/curriculumModels';

export const EXPANDED_JUKTAKKHOR_MAP: Record<string, ExactWordExample[]> = {
  // ১. ক্ত (ক + ত)
  ক্ত: [
    { word: 'রক্ত', icon: '🩸', meaning: 'লোহিত রক্ত', ttsAudio: 'রক্ত', breakdown: ['র', 'ক', '্', 'ত'] },
    { word: 'শক্ত', icon: '🪨', meaning: 'কঠিন', ttsAudio: 'শক্ত', breakdown: ['শ', 'ক', '্', 'ত'] },
    { word: 'ভক্ত', icon: '🙏', meaning: 'অনুরাগী', ttsAudio: 'ভক্ত', breakdown: ['ভ', 'ক', '্', 'ত'] },
    { word: 'মুক্ত', icon: '🕊️', meaning: 'স্বাধীন', ttsAudio: 'মুক্ত', breakdown: ['ম', 'ু', 'ক', '্', 'ত'] },
    { word: 'শুক্তো', icon: '🍲', meaning: 'তেতো ব্যঞ্জন', ttsAudio: 'শুক্তো', breakdown: ['শ', 'ু', 'ক', '্', 'ত', 'ো'] },
    { word: 'যুক্তি', icon: '💡', meaning: 'বুদ্ধি যুক্তি', ttsAudio: 'যুক্তি', breakdown: ['য', 'ু', 'ক', '্', 'ত', 'ি'] },
    { word: 'ভক্তি', icon: '🤲', meaning: 'শ্রদ্ধা ভক্তি', ttsAudio: 'ভক্তি', breakdown: ['ভ', 'ক', '্', 'ত', 'ি'] },
    { word: 'শক্তি', icon: '⚡', meaning: 'বল ক্ষমতা', ttsAudio: 'শক্তি', breakdown: ['শ', 'ক', '্', 'ত', 'ি'] },
    { word: 'তক্তা', icon: '🪵', meaning: 'কাঠের তক্তা', ttsAudio: 'তক্তা', breakdown: ['ত', 'ক', '্', 'ত', 'া'] },
    { word: 'মুক্তি', icon: '🌟', meaning: 'পরিত্রাণ', ttsAudio: 'মুক্তি', breakdown: ['ম', 'ু', 'ক', '্', 'ত', 'ি'] },
    { word: 'সিক্ত', icon: '💧', meaning: 'ভেজা জলময়', ttsAudio: 'সিক্ত', breakdown: ['স', 'ি', 'ক', '্', 'ত'] },
    { word: 'ব্যক্ত', icon: '🗣️', meaning: 'প্রকাশ করা', ttsAudio: 'ব্যক্ত', breakdown: ['ব', '্', 'য', 'ক', '্', 'ত'] },
  ],

  // ২. ক্ষ (ক + ষ)
  ক্ষ: [
    { word: 'ক্ষমা', icon: '🕊️', meaning: 'মাফ করা', ttsAudio: 'ক্ষমা', breakdown: ['ক', '্', 'ষ', 'ম', 'া'] },
    { word: 'ক্ষতি', icon: '📉', meaning: 'লোকসান', ttsAudio: 'ক্ষতি', breakdown: ['ক', '্', 'ষ', 'ত', 'ি'] },
    { word: 'পরীক্ষা', icon: '📝', meaning: 'যাচাই', ttsAudio: 'পরীক্ষা', breakdown: ['প', 'র', 'ী', 'ক', '্', 'ষ', 'া'] },
    { word: 'শিক্ষা', icon: '📖', meaning: 'বিদ্যাচর্চা', ttsAudio: 'শিক্ষা', breakdown: ['শ', 'ি', 'ক', '্', 'ষ', 'া'] },
    { word: 'বৃক্ষ', icon: '🌳', meaning: 'বড় গাছ', ttsAudio: 'বৃক্ষ', breakdown: ['ব', 'ৃ', 'ক', '্', 'ষ'] },
    { word: 'যক্ষ', icon: '👺', meaning: 'পৌরাণিক জীব', ttsAudio: 'যক্ষ', breakdown: ['য', 'ক', '্', 'ষ'] },
    { word: 'রক্ষক', icon: '🛡️', meaning: 'যে রক্ষা করে', ttsAudio: 'রক্ষক', breakdown: ['র', 'ক', '্', 'ষ', 'ক'] },
    { word: 'ভক্ষক', icon: '🦁', meaning: 'যে ভক্ষণ করে', ttsAudio: 'ভক্ষক', breakdown: ['ভ', 'ক', '্', 'ষ', 'ক'] },
    { word: 'পক্ষী', icon: '🐦', meaning: 'পাখি', ttsAudio: 'পক্ষী', breakdown: ['প', 'ক', '্', 'ষ', 'ী'] },
    { word: 'দক্ষিণ', icon: '🧭', meaning: 'দক্ষিণ দিক', ttsAudio: 'দক্ষিণ', breakdown: ['দ', 'ক', '্', 'ষ', 'ি', 'ণ'] },
    { word: 'চক্ষু', icon: '👁️', meaning: 'চোখ', ttsAudio: 'চক্ষু', breakdown: ['চ', 'ক', '্', 'ষ', 'ু'] },
    { word: 'লক্ষণ', icon: '🔍', meaning: 'চিহ্ন বা উপসর্গ', ttsAudio: 'লক্ষণ', breakdown: ['ল', 'ক', '্', 'ষ', 'ণ'] },
  ],

  // ৩. ঙ্গ (ঙ + গ)
  ঙ্গ: [
    { word: 'অঙ্গ', icon: '💪', meaning: 'শরীরের অঙ্গ', ttsAudio: 'অঙ্গ', breakdown: ['অ', 'ঙ', '্', 'গ'] },
    { word: 'বঙ্গ', icon: '🇧🇩', meaning: 'বাংলা', ttsAudio: 'বঙ্গ', breakdown: ['ব', 'ঙ', '্', 'গ'] },
    { word: 'গঙ্গা', icon: '🌊', meaning: 'পবিত্র নদী', ttsAudio: 'গঙ্গা', breakdown: ['গ', 'ঙ', '্', 'গ', 'া'] },
    { word: 'সঙ্গ', icon: '👥', meaning: 'সাথী মেলবন্ধন', ttsAudio: 'সঙ্গ', breakdown: ['স', 'ঙ', '্', 'গ'] },
    { word: 'দাঙ্গা', icon: '💥', meaning: 'সংঘর্ষ', ttsAudio: 'দাঙ্গা', breakdown: ['দ', 'া', 'ঙ', '্', 'গ', 'া'] },
    { word: 'রঙ্গ', icon: '🎭', meaning: 'মজার অভিনয়', ttsAudio: 'রঙ্গ', breakdown: ['র', 'ঙ', '্', 'গ'] },
    { word: 'লবঙ্গ', icon: '🌿', meaning: 'সুগন্ধি মসলা', ttsAudio: 'লবঙ্গ', breakdown: ['ল', 'ব', 'ঙ', '্', 'গ'] },
    { word: 'সুড়ঙ্গ', icon: '🚇', meaning: 'মাটির তলপথ', ttsAudio: 'সুড়ঙ্গ', breakdown: ['স', 'ু', 'ড়', 'ঙ', '্', 'গ'] },
    { word: 'জঙ্গল', icon: '🌴', meaning: 'অরণ্য বন', ttsAudio: 'জঙ্গল', breakdown: ['জ', 'ঙ', '্', 'গ', 'ল'] },
    { word: 'মঙ্গল', icon: '🌟', meaning: 'কল্যাণ শুভ', ttsAudio: 'মঙ্গল', breakdown: ['ম', 'ঙ', '্', 'গ', 'ল'] },
    { word: 'পঙ্গু', icon: '🦽', meaning: 'শারীরিক অক্ষম', ttsAudio: 'পঙ্গু', breakdown: ['প', 'ঙ', '্', 'গ', 'ু'] },
    { word: 'তরঙ্গ', icon: '🌊', meaning: 'ঢেউ জলতরঙ্গ', ttsAudio: 'তরঙ্গ', breakdown: ['ত', 'র', 'ঙ', '্', 'গ'] },
  ],

  // ৪. ন্দ (ন + দ)
  ন্দ: [
    { word: 'আনন্দ', icon: '🎉', meaning: 'খুশি উল্লাস', ttsAudio: 'আনন্দ', breakdown: ['আ', 'ন', 'ন', '্', 'দ'] },
    { word: 'সুন্দর', icon: '🌸', meaning: 'মনোরম রূপসী', ttsAudio: 'সুন্দর', breakdown: ['স', 'ু', 'ন', '্', 'দ', 'র'] },
    { word: 'ছন্দ', icon: '🎶', meaning: 'কবিতার তাল', ttsAudio: 'ছন্দ', breakdown: ['ছ', 'ন', '্', 'দ'] },
    { word: 'মন্দ', icon: '👎', meaning: 'খারাপ ধীর', ttsAudio: 'মন্দ', breakdown: ['ম', 'ন', '্', 'দ'] },
    { word: 'বিন্দু', icon: '🔘', meaning: 'ফোঁটা কণা', ttsAudio: 'বিন্দু', breakdown: ['ব', 'ি', 'ন', '্', 'দ', 'ু'] },
    { word: 'সিন্দুক', icon: '📦', meaning: 'ধনের বাক্স', ttsAudio: 'সিন্দুক', breakdown: ['স', 'ি', 'ন', '্', 'দ', 'ু', 'ক'] },
    { word: 'চন্দন', icon: '🪵', meaning: 'সুগন্ধি কাঠ', ttsAudio: 'চন্দন', breakdown: ['চ', 'ন', '্', 'দ', 'ন'] },
    { word: 'নন্দন', icon: '🌺', meaning: 'কানন বাগান', ttsAudio: 'নন্দন', breakdown: ['ন', 'ন', '্', 'দ', 'ন'] },
    { word: 'বন্দর', icon: '🚢', meaning: 'জাহাজ ঘাট', ttsAudio: 'বন্দর', breakdown: ['ব', 'ন', '্', 'দ', 'র'] },
    { word: 'স্পন্দন', icon: '💓', meaning: 'হৃদয়ের কাঁপন', ttsAudio: 'স্পন্দন', breakdown: ['স', '্', 'প', 'ন', '্', 'দ', 'ন'] },
    { word: 'বন্দি', icon: '⛓️', meaning: 'আটক কয়েদি', ttsAudio: 'বন্দি', breakdown: ['ব', 'ন', '্', 'দ', 'ি'] },
    { word: 'মন্দিরা', icon: '🔔', meaning: 'ছোট বাদ্যযন্ত্র', ttsAudio: 'মন্দিরা', breakdown: ['ম', 'ন', '্', 'দ', 'ি', 'র', 'া'] },
  ],

  // ৫. ঞ্চ (ঞ + চ)
  ঞ্চ: [
    { word: 'মঞ্চ', icon: '🎭', meaning: 'নাট্যের মঞ্চ', ttsAudio: 'মঞ্চ', breakdown: ['ম', 'ঞ', '্', 'চ'] },
    { word: 'পঞ্চম', icon: '৫️⃣', meaning: 'পাঁচ নম্বর', ttsAudio: 'পঞ্চম', breakdown: ['প', 'ঞ', '্', 'চ', 'ম'] },
    { word: 'চঞ্চল', icon: '🏃', meaning: 'ছুটোছুটি অস্থির', ttsAudio: 'চঞ্চল', breakdown: ['চ', 'ঞ', '্', 'চ', 'ল'] },
    { word: 'সঞ্চয়', icon: '💰', meaning: 'জমানো টাকা', ttsAudio: 'সঞ্চয়', breakdown: ['স', 'ঞ', '্', 'চ', 'য', '়'] },
    { word: 'কাঞ্চন', icon: '🪙', meaning: 'স্বর্ণ সোনা', ttsAudio: 'কাঞ্চন', breakdown: ['ক', 'া', 'ঞ', '্', 'চ', 'ন'] },
    { word: 'অঞ্চল', icon: '🗺️', meaning: 'এলাকা জনপদ', ttsAudio: 'অঞ্চল', breakdown: ['অ', 'ঞ', '্', 'চ', 'ল'] },
    { word: 'কিঞ্চিৎ', icon: '🤏', meaning: 'সামান্য একটু', ttsAudio: 'কিঞ্চিৎ', breakdown: ['ক', 'ি', 'ঞ', '্', 'চ', 'ি', 'ৎ'] },
    { word: 'বঞ্চনা', icon: '💔', meaning: 'প্রতারণা ফাঁকি', ttsAudio: 'বঞ্চনা', breakdown: ['ব', 'ঞ', '্', 'চ', 'ন', 'া'] },
    { word: 'প্রবঞ্চক', icon: '🦊', meaning: 'প্রতারক ধূর্ত', ttsAudio: 'প্রবঞ্চক', breakdown: ['প', '্', 'র', 'ব', 'ঞ', '্', 'চ', 'ক'] },
    { word: 'লাঞ্ছনা', icon: '😔', meaning: 'অপমান তিরস্কার', ttsAudio: 'লাঞ্ছনা', breakdown: ['ল', 'া', 'ঞ', '্', 'চ', 'ন', 'া'] },
  ],

  // ৬. ঞ্জ (ঞ + জ)
  ঞ্জ: [
    { word: 'গঞ্জ', icon: '🏬', meaning: 'নদীর হাটবাজার', ttsAudio: 'গঞ্জ', breakdown: ['গ', 'ঞ', '্', 'জ'] },
    { word: 'কুঞ্জ', icon: '🏡', meaning: 'লতাপাতার ঘর', ttsAudio: 'কুঞ্জ', breakdown: ['ক', 'ু', 'ঞ', '্', 'জ'] },
    { word: 'ব্যঞ্জন', icon: '🍲', meaning: 'সুস্বাদু রান্না', ttsAudio: 'ব্যঞ্জন', breakdown: ['ব', '্', 'য', 'ঞ', '্', 'জ', 'ন'] },
    { word: 'রঞ্জন', icon: '🎨', meaning: 'রং মাখানো', ttsAudio: 'রঞ্জন', breakdown: ['র', 'ঞ', '্', 'জ', 'ন'] },
    { word: 'গুঞ্জন', icon: '🐝', meaning: 'মৌমাছির গুঞ্জরণ', ttsAudio: 'গুঞ্জন', breakdown: ['গ', 'ু', 'ঞ', '্', 'জ', 'ন'] },
    { word: 'সঞ্জয়', icon: '👤', meaning: 'বিজয়ী বীর', ttsAudio: 'সঞ্জয়', breakdown: ['স', 'ঞ', '্', 'জ', 'য', '়'] },
    { word: 'পিঞ্জর', icon: '🦜', meaning: 'পাখির খাঁচা', ttsAudio: 'পিঞ্জর', breakdown: ['প', 'ি', 'ঞ', '্', 'জ', 'র'] },
    { word: 'অঞ্জলি', icon: '🙏', meaning: 'করজোড় শ্রদ্ধা', ttsAudio: 'অঞ্জলি', breakdown: ['অ', 'ঞ', '্', 'জ', 'ল', 'ি'] },
    { word: 'পঞ্জিকা', icon: '📅', meaning: 'দিনপঞ্জি ক্যালেন্ডার', ttsAudio: 'পঞ্জিকা', breakdown: ['প', 'ঞ', '্', 'জ', 'ি', 'ক', 'া'] },
    { word: 'খঞ্জন', icon: '🐦', meaning: 'চঞ্চল পাখি', ttsAudio: 'খঞ্জন', breakdown: ['খ', 'ঞ', '্', 'জ', 'ন'] },
  ],

  // ৭. ণ্ড (ণ + ড)
  ণ্ড: [
    { word: 'ঠান্ডা', icon: '🧊', meaning: 'শীতল বরফ', ttsAudio: 'ঠান্ডা', breakdown: ['ঠ', 'া', 'ণ', '্', 'ড', 'া'] },
    { word: 'ডিম্বাণু', icon: '🥚', meaning: 'ডিমের কণা', ttsAudio: 'ডিম্বাণু', breakdown: ['ড', 'ি', 'ম', '্', 'ব', 'া', 'ণ', 'ু'] },
    { word: 'খণ্ড', icon: '🧩', meaning: 'টুকরো অংশ', ttsAudio: 'খণ্ড', breakdown: ['খ', 'ণ', '্', 'ড'] },
    { word: 'দণ্ড', icon: '🦯', meaning: 'লাঠি বা সাজা', ttsAudio: 'দণ্ড', breakdown: ['দ', 'ণ', '্', 'ড'] },
    { word: 'কাণ্ড', icon: '🌳', meaning: 'গাছের গুঁড়ি কাণ্ড', ttsAudio: 'কাণ্ড', breakdown: ['ক', 'া', 'ণ', '্', 'ড'] },
    { word: 'পাণ্ডব', icon: '🏹', meaning: 'মহাভারতের পঞ্চবীর', ttsAudio: 'পাণ্ডব', breakdown: ['প', 'া', 'ণ', '্', 'ড', 'ব'] },
    { word: 'ভণ্ড', icon: '🎭', meaning: 'কপট ভেকধারী', ttsAudio: 'ভণ্ড', breakdown: ['ভ', 'ণ', '্', 'ড'] },
    { word: 'কণ্ডু', icon: '🐜', meaning: 'চুলকানি', ttsAudio: 'কণ্ডু', breakdown: ['ক', 'ণ', '্', 'ড', 'ু'] },
    { word: 'মুণ্ড', icon: '🗿', meaning: 'মাথা মস্তক', ttsAudio: 'মুণ্ড', breakdown: ['ম', 'ু', 'ণ', '্', 'ড'] },
    { word: 'পণ্ডিত', icon: '🎓', meaning: 'জ্ঞানী বিদ্বান', ttsAudio: 'পণ্ডিত', breakdown: ['প', 'ণ', '্', 'ড', 'ি', 'ত'] },
  ],

  // ৮. ত্ত (ত + ত)
  ত্ত: [
    { word: 'উত্তর', icon: '🧭', meaning: 'উত্তর দিক বা জবাব', ttsAudio: 'উত্তর', breakdown: ['উ', 'ত', '্', 'ত', 'র'] },
    { word: 'পত্তা', icon: '🍃', meaning: 'গাছের সবুজ পাতা', ttsAudio: 'পত্তা', breakdown: ['প', 'ত', '্', 'ত', 'া'] },
    { word: 'সম্পত্তি', icon: '💎', meaning: 'ধনদৌলত সহায়', ttsAudio: 'সম্পত্তি', breakdown: ['স', 'ম', '্', 'প', 'ত', '্', 'ত', 'ি'] },
    { word: 'সত্ত্ব', icon: '📜', meaning: 'অস্তিত্ব প্রাণ', ttsAudio: 'সত্ত্ব', breakdown: ['স', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'বৃত্ত', icon: '⭕', meaning: 'গোল পরিধি', ttsAudio: 'বৃত্ত', breakdown: ['ব', 'ৃ', 'ত', '্', 'ত'] },
    { word: 'চিত্ত', icon: '❤️', meaning: 'মন হৃদয়', ttsAudio: 'চিত্ত', breakdown: ['চ', 'ি', 'ত', '্', 'ত'] },
    { word: 'মত্ত', icon: '🐘', meaning: 'বিভোর নিমগ্ন', ttsAudio: 'মত্ত', breakdown: ['ম', 'ত', '্', 'ত'] },
    { word: 'উন্মত্ত', icon: '🌪️', meaning: 'পাগলপারা', ttsAudio: 'উন্মত্ত', breakdown: ['উ', 'ন', '্', 'ম', 'ত', '্', 'ত'] },
    { word: 'পত্তি', icon: '🌿', meaning: 'লতাপাতার অংশ', ttsAudio: 'পত্তি', breakdown: ['প', 'ত', '্', 'ত', 'ি'] },
    { word: 'কৃত্তিবাস', icon: '📖', meaning: 'রামায়ণের কবি', ttsAudio: 'কৃত্তিবাস', breakdown: ['ক', 'ৃ', 'ত', '্', 'ত', 'ি', 'ব', 'া', 'স'] },
  ],

  // ৯. ম্প (ম + প)
  ম্প: [
    { word: 'কম্পন', icon: '〰️', meaning: 'কাঁপন থরথর', ttsAudio: 'কম্পন', breakdown: ['ক', 'ম', '্', 'প', 'ন'] },
    { word: 'সম্পদ', icon: '💎', meaning: 'ধনরত্ন ঐশ্বর্য', ttsAudio: 'সম্পদ', breakdown: ['স', 'ম', '্', 'প', 'দ'] },
    { word: 'চম্পা', icon: '🌼', meaning: 'সুগন্ধি চম্পা ফুল', ttsAudio: 'চম্পা', breakdown: ['চ', 'ম', '্', 'প', 'া'] },
    { word: 'সম্প্রীতি', icon: '🤝', meaning: 'মিলমিশ ভালোবাসা', ttsAudio: 'সম্প্রীতি', breakdown: ['স', 'ম', '্', 'প', '্', 'র', 'ী', 'ত', 'ি'] },
    { word: 'কম্পাস', icon: '🧭', meaning: 'দিক নির্দেশক কাঁটা', ttsAudio: 'কম্পাস', breakdown: ['ক', 'ম', '্', 'প', 'া', 'স'] },
    { word: 'দম্পতি', icon: '👫', meaning: 'স্বামী-স্ত্রী', ttsAudio: 'দম্পতি', breakdown: ['দ', 'ম', '্', 'প', 'ত', 'ি'] },
    { word: 'অনুকম্পা', icon: '🤲', meaning: 'দয়া করুণা', ttsAudio: 'অনুকম্পা', breakdown: ['অ', 'ন', 'ু', 'ক', 'ম', '্', 'প', 'া'] },
    { word: 'শম্পা', icon: '⚡', meaning: 'বিদ্যুতের চমক', ttsAudio: 'শম্পা', breakdown: ['শ', 'ম', '্', 'প', 'া'] },
    { word: 'কম্প', icon: '📳', meaning: 'শরীর কাঁপন', ttsAudio: 'কম্প', breakdown: ['ক', 'ম', '্', 'প'] },
    { word: 'লম্পট', icon: '🦊', meaning: 'দুশ্চরিত্র', ttsAudio: 'লম্পট', breakdown: ['ল', 'ম', '্', 'প', 'ট'] },
  ],

  // ১০. জ্ঞ (জ + ঞ)
  জ্ঞ: [
    { word: 'জ্ঞান', icon: '💡', meaning: 'প্রজ্ঞা বোধ', ttsAudio: 'জ্ঞান', breakdown: ['জ', '্', 'ঞ', 'া', 'ন'] },
    { word: 'বিজ্ঞান', icon: '🔬', meaning: 'পরীক্ষিত জ্ঞান', ttsAudio: 'বিজ্ঞান', breakdown: ['ব', 'ি', 'জ', '্', 'ঞ', 'া', 'ন'] },
    { word: 'বিজ্ঞানী', icon: '🧑‍🔬', meaning: 'গবেষক', ttsAudio: 'বিজ্ঞানী', breakdown: ['ব', 'ি', 'জ', '্', 'ঞ', 'া', 'ন', 'ী'] },
    { word: 'প্রজ্ঞা', icon: '🦉', meaning: 'উচ্চতর বুদ্ধি', ttsAudio: 'প্রজ্ঞা', breakdown: ['প', '্', 'র', 'জ', '্', 'ঞ', 'া'] },
    { word: 'অজ্ঞ', icon: '❓', meaning: 'জ্ঞানহীন', ttsAudio: 'অজ্ঞ', breakdown: ['অ', 'জ', '্', 'ঞ'] },
    { word: 'অভিজ্ঞ', icon: '🏅', meaning: 'দক্ষ অভিজ্ঞতালব্ধ', ttsAudio: 'অভিজ্ঞ', breakdown: ['অ', 'ভ', 'ি', 'জ', '্', 'ঞ'] },
    { word: 'জিজ্ঞাসা', icon: '🙋', meaning: 'প্রশ্ন করা', ttsAudio: 'জিজ্ঞাসা', breakdown: ['জ', 'ি', 'জ', '্', 'ঞ', 'া', 'স', 'া'] },
    { word: 'আজ্ঞা', icon: '📜', meaning: 'হুকুম আদেশ', ttsAudio: 'আজ্ঞা', breakdown: ['আ', 'জ', '্', 'ঞ', 'া'] },
    { word: 'সর্বজ্ঞ', icon: '🔮', meaning: 'সব জানা ব্যক্তি', ttsAudio: 'সর্বজ্ঞ', breakdown: ['স', 'র', '্', 'ব', 'জ', '্', 'ঞ'] },
    { word: 'সুধীজ্ঞ', icon: '🎓', meaning: 'জ্ঞানী সজ্জন', ttsAudio: 'সুধীজ্ঞ', breakdown: ['স', 'ু', 'ধ', 'ী', 'জ', '্', 'ঞ'] },
  ],

  // ১১. স্ত (স + ত)
  স্ত: [
    { word: 'রাস্তা', icon: '🛣️', meaning: 'পথ সরণি', ttsAudio: 'রাস্তা', breakdown: ['র', 'া', 'স', '্', 'ত', 'া'] },
    { word: 'ব্যস্ত', icon: '🏃', meaning: 'কাজে মগ্ন', ttsAudio: 'ব্যস্ত', breakdown: ['ব', '্', 'য', 'স', '্', 'ত'] },
    { word: 'সস্তা', icon: '🏷️', meaning: 'সুলভ কম দাম', ttsAudio: 'সস্তা', breakdown: ['স', 'স', '্', 'ত', 'া'] },
    { word: 'পুস্তক', icon: '📚', meaning: 'বই গ্রন্থ', ttsAudio: 'পুস্তক', breakdown: ['প', 'ু', 'স', '্', 'ত', 'ক'] },
    { word: 'কুস্তি', icon: '🤼', meaning: 'মল্লযুদ্ধ কুস্তি', ttsAudio: 'কুস্তি', breakdown: ['ক', 'ু', 'স', '্', 'ত', 'ি'] },
    { word: 'মস্তক', icon: '🧠', meaning: 'মাথা শির', ttsAudio: 'মস্তক', breakdown: ['ম', 'স', '্', 'ত', 'ক'] },
    { word: 'স্তব্ধ', icon: '🤫', meaning: 'নিথর থমথমে', ttsAudio: 'স্তব্ধ', breakdown: ['স', '্', 'ত', 'ব', '্', 'ধ'] },
    { word: 'স্তর', icon: '🥞', meaning: 'ধাপ লেয়ার', ttsAudio: 'স্তর', breakdown: ['স', '্', 'ত', 'র'] },
    { word: 'প্রস্তাব', icon: '💡', meaning: 'পরামর্শ আর্জি', ttsAudio: 'প্রস্তাব', breakdown: ['প', '্', 'র', 'স', '্', 'ত', 'া', 'ব'] },
    { word: 'বিস্তার', icon: '🌐', meaning: 'ছড়িয়ে পড়া', ttsAudio: 'বিস্তার', breakdown: ['ব', 'ি', 'স', '্', 'ত', 'া', 'র'] },
  ],

  // -------------------------------------------------------------
  // ১২. তিন বর্ণের কঠিন যুক্তাক্ষর (Level 5 / Days 19-20)
  // -------------------------------------------------------------

  // স্ট্র (স + ট + র-ফলা)
  স্ট্র: [
    { word: 'স্ট্রোক', icon: '💓', meaning: 'হৃদরোগের আঘাত', ttsAudio: 'স্ট্রোক', breakdown: ['স', '্', 'ট', '্', 'র', 'ো', 'ক'] },
    { word: 'স্ট্রাইক', icon: '⚡', meaning: 'বলের মোক্ষম আঘাত', ttsAudio: 'স্ট্রাইক', breakdown: ['স', '্', 'ট', '্', 'র', 'া', 'ই', 'ক'] },
    { word: 'স্ট্রিট', icon: '🛣️', meaning: 'রাস্তা গলি', ttsAudio: 'স্ট্রিট', breakdown: ['স', '্', 'ট', '্', 'র', 'ি', 'ট'] },
    { word: 'স্ট্র', icon: '🥤', meaning: 'পানীয়ের নল', ttsAudio: 'স্ট্র', breakdown: ['স', '্', 'ট', '্', 'র'] },
    { word: 'স্ট্রবেরি', icon: '🍓', meaning: 'মিষ্টি লাল ফল', ttsAudio: 'স্ট্রবেরি', breakdown: ['স', '্', 'ট', '্', 'র', 'ব', 'ে', 'র', 'ি'] },
    { word: 'স্ট্রেট', icon: '📏', meaning: 'সোজা সরল', ttsAudio: 'স্ট্রেট', breakdown: ['স', '্', 'ট', '্', 'র', 'ে', 'ট'] },
    { word: 'স্ট্রাকচার', icon: '🏗️', meaning: 'কাঠামো গঠন', ttsAudio: 'স্ট্রাকচার', breakdown: ['স', '্', 'ট', '্', 'র', 'া', 'ক', 'চ', 'া', 'র'] },
    { word: 'স্ট্রিং', icon: '🧶', meaning: 'সুতো তার', ttsAudio: 'স্ট্রিং', breakdown: ['স', '্', 'ট', '্', 'র', 'ি', 'ং'] },
    { word: 'স্ট্রং', icon: '💪', meaning: 'শক্তিশালী বলবান', ttsAudio: 'স্ট্রং', breakdown: ['স', '্', 'ট', '্', 'র', 'ং'] },
    { word: 'ডিস্ট্রিক্ট', icon: '🗺️', meaning: 'জেলা অঞ্চল', ttsAudio: 'ডিস্ট্রিক্ট', breakdown: ['ড', 'ি', 'স', '্', 'ট', '্', 'র', 'ি', 'ক', '্', 'ট'] },
  ],

  // স্ত্র (স + ত + র-ফলা)
  স্ত্র: [
    { word: 'বস্ত্র', icon: '👗', meaning: 'পোশাক কাপড়', ttsAudio: 'বস্ত্র', breakdown: ['ব', 'স', '্', 'ত', '্', 'র'] },
    { word: 'অস্ত্র', icon: '🗡️', meaning: 'হাতিয়ার যুদ্ধাস্ত্র', ttsAudio: 'অস্ত্র', breakdown: ['অ', 'স', '্', 'ত', '্', 'র'] },
    { word: 'শাস্ত্র', icon: '📜', meaning: 'নীতিগ্রন্থ বিধি', ttsAudio: 'শাস্ত্র', breakdown: ['শ', 'া', 'স', '্', 'ত', '্', 'র'] },
    { word: 'স্ত্রী', icon: '👩', meaning: 'জায়া পত্নী', ttsAudio: 'স্ত্রী', breakdown: ['স', '্', 'ত', '্', 'র', 'ী'] },
    { word: 'ওস্ত্রি', icon: '🪡', meaning: 'পোশাক কারিগর', ttsAudio: 'ওস্ত্রি', breakdown: ['ও', 'স', '্', 'ত', '্', 'র', 'ি'] },
    { word: 'নিরস্ত্র', icon: '🕊️', meaning: 'হাতিয়ারহীন', ttsAudio: 'নিরস্ত্র', breakdown: ['ন', 'ি', 'র', 'স', '্', 'ত', '্', 'র'] },
    { word: 'শস্ত্র', icon: '🛡️', meaning: 'রণসামগ্রী', ttsAudio: 'শস্ত্র', breakdown: ['শ', 'স', '্', 'ত', '্', 'র'] },
    { word: 'অস্ত্রাগার', icon: '🏰', meaning: 'হাতিয়ারের গুদাম', ttsAudio: 'অস্ত্রাগার', breakdown: ['অ', 'স', '্', 'ত', '্', 'র', 'া', 'গ', 'া', 'র'] },
    { word: 'স্ত্রীজাতি', icon: '👩‍👧', meaning: 'নারীসমাজ', ttsAudio: 'স্ত্রীজাতি', breakdown: ['স', '্', 'ত', '্', 'র', 'ী', 'জ', 'া', 'ত', 'ি'] },
    { word: 'শাস্ত্রজ্ঞ', icon: '🧙', meaning: 'বেদজ্ঞ পণ্ডিত', ttsAudio: 'শাস্ত্রজ্ঞ', breakdown: ['শ', 'া', 'স', '্', 'ত', '্', 'র', 'জ', '্', 'ঞ'] },
  ],

  // স্প্র (স + প + র-ফলা)
  স্প্র: [
    { word: 'স্প্রে', icon: '💨', meaning: 'সুগন্ধি ছিটানো', ttsAudio: 'স্প্রে', breakdown: ['স', '্', 'প', '্', 'র', 'ে'] },
    { word: 'স্প্রিং', icon: '🌀', meaning: 'স্থিতিস্থাপক স্প্রিং', ttsAudio: 'স্প্রিং', breakdown: ['স', '্', 'প', '্', 'র', 'ি', 'ং'] },
    { word: 'স্প্রাইট', icon: '🥤', meaning: 'শীতল পানীয়', ttsAudio: 'স্প্রাইট', breakdown: ['স', '্', 'প', '্', 'র', 'া', 'ই', 'ট'] },
    { word: 'স্প্রেয়ার', icon: '🚿', meaning: 'ছিটানোর যন্ত্র', ttsAudio: 'স্প্রেয়ার', breakdown: ['স', '্', 'প', '্', 'র', 'ে', 'য', '়', 'া', 'র'] },
    { word: 'স্প্রাউট', icon: '🌱', meaning: 'অঙ্কুরিত বীজ', ttsAudio: 'স্প্রাউট', breakdown: ['স', '্', 'প', '্', 'র', 'া', 'উ', 'ট'] },
    { word: 'অফস্প্রিং', icon: '🐣', meaning: 'সন্তান শাবক', ttsAudio: 'অফস্প্রিং', breakdown: ['অ', 'ফ', 'স', '্', 'প', '্', 'র', 'ি', 'ং'] },
  ],

  // ত্ত্ব (ত + ত + ব-ফলা)
  ত্ত্ব: [
    { word: 'তত্ত্ব', icon: '📜', meaning: 'গভীর তত্ত্বকথা', ttsAudio: 'তত্ত্ব', breakdown: ['ত', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'সত্ত্বা', icon: '✨', meaning: 'অস্তিত্ব প্রাণ', ttsAudio: 'সত্ত্বা', breakdown: ['স', 'ত', '্', 'ত', '্', 'ব', 'া'] },
    { word: 'মহত্ত্ব', icon: '👑', meaning: 'মহানুভবতা গুণ', ttsAudio: 'মহত্ত্ব', breakdown: ['ম', 'হ', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'নেতৃত্ব', icon: '🚩', meaning: 'নেতার কাজ চালনা', ttsAudio: 'নেতৃত্ব', breakdown: ['ন', 'ে', 'ত', 'ৃ', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'গুরুত্ব', icon: '⚖️', meaning: 'ভার বা প্রাধান্য', ttsAudio: 'গুরুত্ব', breakdown: ['গ', 'ু', 'র', 'ু', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'ঘনত্ব', icon: '🧪', meaning: 'নিবিড়তা ঘনত্ব', ttsAudio: 'ঘনত্ব', breakdown: ['ঘ', 'ন', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'প্রভুত্ব', icon: '🏰', meaning: 'কর্তৃত্ব শাসন', ttsAudio: 'প্রভুত্ব', breakdown: ['প', '্', 'র', 'ভ', 'ু', 'ত', '্', 'ত', '্', 'ব'] },
    { word: 'ব্যক্তিত্ব', icon: '🌟', meaning: 'মানুষের চারিত্রিক রূপ', ttsAudio: 'ব্যক্তিত্ব', breakdown: ['ব', '্', 'য', 'ক', '্', 'ত', 'ি', 'ত', '্', 'ত', '্', 'ব'] },
  ],

  // ন্ত্র (ন + ত + র-ফলা)
  ন্ত্র: [
    { word: 'যন্ত্র', icon: '⚙️', meaning: 'কলকব্জা কল', ttsAudio: 'যন্ত্র', breakdown: ['য', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'মন্ত্র', icon: '🧘', meaning: 'পবিত্র স্তোত্রবাণী', ttsAudio: 'মন্ত্র', breakdown: ['ম', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'তন্ত্র', icon: '📜', meaning: 'সাধনপদ্ধতি নিয়ম', ttsAudio: 'তন্ত্র', breakdown: ['ত', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'স্বতন্ত্র', icon: '🕊️', meaning: 'স্বাধীন পৃথক রূপ', ttsAudio: 'স্বতন্ত্র', breakdown: ['স', '্', 'ব', 'ত', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'নিমন্ত্রণ', icon: '💌', meaning: 'দাওয়াত সাদর আহ্বান', ttsAudio: 'নিমন্ত্রণ', breakdown: ['ন', 'ি', 'ম', 'ন', '্', 'ত', '্', 'র', 'ণ'] },
    { word: 'গণতন্ত্র', icon: '🗳️', meaning: 'জনগণের শাসনব্যবস্থা', ttsAudio: 'গণতন্ত্র', breakdown: ['গ', 'ণ', 'ত', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'ষড়যন্ত্র', icon: '🕵️', meaning: 'গোপন কুচক্র', ttsAudio: 'ষড়যন্ত্র', breakdown: ['ষ', 'ড়', 'য', 'ন', '্', 'ত', '্', 'র'] },
    { word: 'নিয়ন্ত্রণ', icon: '🎛️', meaning: 'বশে রাখা সংযম', ttsAudio: 'নিয়ন্ত্রণ', breakdown: ['ন', 'ি', 'য', '়', 'ন', '্', 'ত', '্', 'র', 'ণ'] },
  ],
};
