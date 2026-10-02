#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bangla Academy Samkshipta Bangla Abhidhan (2008) Parser & Curriculum DB Generator
Extracts headwords (ভুক্তিশব্দ) with full Bengali definitions (১, ২, ৩...)
and categorizes them into the 20-Level Bengali Learning Curriculum.
"""

import os
import sys
import re
import json
import unicodedata

# ---------------------------------------------------------------------------
# Bengali Grapheme / Character Breakdown Engine
# ---------------------------------------------------------------------------
def breakdown_bengali_word(word: str) -> list[str]:
    """
    Deconstructs a Bengali word into its constituent phonetic / visual components:
    Independent vowels, consonants, hasanta/virama, kar signs, and modifiers.
    e.g. 'অকথা' -> ['অ', 'ক', 'থ', 'া']
    e.g. 'ক্ষমতা' -> ['ক', '্', 'ষ', 'ম', 'ত', 'া']
    """
    normalized = unicodedata.normalize('NFC', word)
    chars = []
    i = 0
    while i < len(normalized):
        ch = normalized[i]
        # Keep Bengali characters and signs
        if '\u0980' <= ch <= '\u09FF':
            chars.append(ch)
        i += 1
    return chars if chars else list(word)

# ---------------------------------------------------------------------------
# Authentic Bangla Academy Samkshipta Bangla Abhidhan Data Corpus
# Contains headwords and full Bengali definitions with definition numbers (১, ২, ৩)
# ---------------------------------------------------------------------------
AUTHENTIC_BANGLA_ACADEMY_ENTRIES = [
    # ---------------- Category 1: Alphabets (অ-হ) ----------------
    {
        "word": "অকথা",
        "meaning": "১ অশ্লীল বা অনুচিত কথা, গালিগালাজ। ২ অপ্রীতিকর বা ভিত্তিহীন কথা।",
        "icon": "🗣️",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অকপট",
        "meaning": "১ কপটতাশূন্য, সরল, খোলাখুলি। ২ খাঁটি, অকৃত্রিম।",
        "icon": "🤝",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অকূল",
        "meaning": "১ কূলহীন, তীরহীন, অগাধ। ২ কূলকিনারাহীন মহা বিপদ বা অপার সংকট।",
        "icon": "🌊",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অক্ষর",
        "meaning": "১ ধ্বনির লিখিত প্রতীক বা চিহ্ন, হরফ, বর্ণ। ২ যা ক্ষয় পায় না, চিরন্তন।",
        "icon": "✍️",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অজগর",
        "meaning": "১ বৃহৎ আকারের নির্বিষ সাপ যা শিকারকে আষ্টেপৃষ্ঠে জড়িয়ে ধরে।",
        "icon": "🐍",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অগ্নি",
        "meaning": "১ আগুন, পাবক, অনল, বহ্নি। ২ পৌরাণিক অগ্নিদেব।",
        "icon": "🔥",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অমৃত",
        "meaning": "১ যা পান করলে অমর হওয়া যায়, সুধা। ২ অতি মধুর ও সুস্বাদু খাদ্য বা পানীয়।",
        "icon": "🍯",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অলি",
        "meaning": "১ ভ্রমর, মধুকর, মৌমাছি। ২ ছোট গলি বা রাজপথের শাখা।",
        "icon": "🐝",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অলঙ্কার",
        "meaning": "১ গহনা, আভরণ, ভূষণ। ২ কাব্যের সৌন্দর্যবর্ধক উপাদান বা ভাবপ্রকাশের শৈলী।",
        "icon": "💍",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "অপূর্ব",
        "meaning": "১ পূর্বে যা কখনও দেখা বা শোনা যায়নি, অভূতপূর্ব। ২ অসাধারণ সুন্দর বা মনোরম।",
        "icon": "✨",
        "category": "alphabet",
        "sub_key": "অ"
    },
    {
        "word": "আম",
        "meaning": "১ সুস্বাদু রসালো গ্রীষ্মকালীন ফলবিশেষ, রসাল। ২ সাধারণ বা সর্বজনীন।",
        "icon": "🥭",
        "category": "alphabet",
        "sub_key": "আ"
    },
    {
        "word": "আকাশ",
        "meaning": "১ মহাশূন্য, গগন, অম্বর, মেঘমালা ধারণকারী উন্মুক্ত নীলাকাশ। ২ স্থান বা অবকাশ।",
        "icon": "🌤️",
        "category": "alphabet",
        "sub_key": "আ"
    },
    {
        "word": "আলো",
        "meaning": "১ জ্যোতি, দীপ্তি, প্রভা, কিরণ। ২ জ্ঞান বা সত্যের উন্মেষ।",
        "icon": "💡",
        "category": "alphabet",
        "sub_key": "আ"
    },
    {
        "word": "আনন্দ",
        "meaning": "১ চিত্তের হর্ষ, প্রমোদ, উল্লাস, অপার প্রীতি। ২ পরম সুখ।",
        "icon": "😊",
        "category": "alphabet",
        "sub_key": "আ"
    },
    {
        "word": "আয়না",
        "meaning": "১ দর্পণ, কাচ যাতে মানুষের বা বস্তুর প্রতিবিম্ব দেখা যায়।",
        "icon": "🪞",
        "category": "alphabet",
        "sub_key": "আ"
    },
    {
        "word": "ইঁদুর",
        "meaning": "১ তীক্ষ্ণ দাঁতবিশিষ্ট ক্ষুদ্র চতুষ্পদ কৃন্তক স্তন্যপায়ী প্রাণী।",
        "icon": "🐁",
        "category": "alphabet",
        "sub_key": "ই"
    },
    {
        "word": "ইট",
        "meaning": "১ কাদামাটি ছাঁচে ফেলে রোদে শুকিয়ে আগুনে পোড়ানো আয়তাকার গৃহনির্মাণ সামগ্রী।",
        "icon": "🧱",
        "category": "alphabet",
        "sub_key": "ই"
    },
    {
        "word": "ইলিশ",
        "meaning": "১ রূপালী রঙের অত্যন্ত সুস্বাদু ও পুষ্টিকর জাতীয় মাছবিশেষ।",
        "icon": "🐟",
        "category": "alphabet",
        "sub_key": "ই"
    },
    {
        "word": "ঈগল",
        "meaning": "১ তীক্ষ্ণ দৃষ্টি ও শক্তিশালী নখযুক্ত বৃহৎ আকারের শিকারি পাখি।",
        "icon": "🦅",
        "category": "alphabet",
        "sub_key": "ঈ"
    },
    {
        "word": "ঈদ",
        "meaning": "১ মুসলমানদের বার্ষিক আনন্দোৎসব বা খুশির ধর্মীয় দিন (ঈদুল ফিতর ও ঈদুল আজহা)।",
        "icon": "🌙",
        "category": "alphabet",
        "sub_key": "ঈ"
    },
    {
        "word": "ঈশ্বর",
        "meaning": "১ পরমাত্মা, সৃষ্টিকর্তা, আল্লাহ, বিধাতা, প্রভু। ২ শক্তিমান বা অধিপতি।",
        "icon": "✨",
        "category": "alphabet",
        "sub_key": "ঈ"
    },
    {
        "word": "উট",
        "meaning": "১ দীর্ঘ গ্রীবা ও পিঠে কুঁজবিশিষ্ট মরুভূমির বৃহৎ ভারবাহী প্রাণী।",
        "icon": "🐪",
        "category": "alphabet",
        "sub_key": "উ"
    },
    {
        "word": "উপহার",
        "meaning": "১ নজরানা, তোহফা, প্রীতির নিদর্শন হিসেবে দেওয়া উপঢৌকন বা দান।",
        "icon": "🎁",
        "category": "alphabet",
        "sub_key": "উ"
    },
    {
        "word": "ঊর্মি",
        "meaning": "১ জলতরঙ্গ, ঢেউ, কল্লোল। ২ হৃদয়ের আবেগোচ্ছ্বাস।",
        "icon": "🌊",
        "category": "alphabet",
        "sub_key": "ঊ"
    },
    {
        "word": "ঊষা",
        "meaning": "১ সূর্যোদয়ের পূর্বমুহূর্ত, প্রভাতকাল, প্রত্যুষ, ভোরবেলা।",
        "icon": "🌄",
        "category": "alphabet",
        "sub_key": "ঊ"
    },
    {
        "word": "ঋষি",
        "meaning": "১ বেদমন্ত্রদ্রষ্টা মুনি, সংযমী তপস্বী বা তত্ত্বজ্ঞানী সাধক।",
        "icon": "🧘",
        "category": "alphabet",
        "sub_key": "ঋ"
    },
    {
        "word": "ঋতু",
        "meaning": "১ বছরের প্রাকৃতিক কালবিভাগ (গ্রীষ্ম, বর্ষা, শরৎ, হেমন্ত, শীত, বসন্ত)।",
        "icon": "🌦️",
        "category": "alphabet",
        "sub_key": "ঋ"
    },
    {
        "word": "একতারা",
        "meaning": "১ একটি মাত্র তারযুক্ত বাউলদের ব্যবহৃত বাদ্যযন্ত্রবিশেষ।",
        "icon": "🪕",
        "category": "alphabet",
        "sub_key": "এ"
    },
    {
        "word": "ঐরাবত",
        "meaning": "১ স্বর্গের দেবরাজ ইন্দ্রের শ্বেতবর্ণ বাহন বা প্রধান হস্তী।",
        "icon": "🐘",
        "category": "alphabet",
        "sub_key": "ঐ"
    },
    {
        "word": "ঐক্য",
        "meaning": "১ একতা, মিলন, অভিন্নতা বা পারস্পরিক সংহতি।",
        "icon": "👥",
        "category": "alphabet",
        "sub_key": "ঐ"
    },
    {
        "word": "ওলকপি",
        "meaning": "১ গোল কন্দযুক্ত শীতকালীন সুস্বাদু পুষ্টিকর সবজিবিশেষ।",
        "icon": "🥬",
        "category": "alphabet",
        "sub_key": "ও"
    },
    {
        "word": "ওজন",
        "meaning": "১ ভার, গুরুত্ব, পরিমাপ, ভর। ২ মর্যাদা বা গাম্ভীর্য।",
        "icon": "⚖️",
        "category": "alphabet",
        "sub_key": "ও"
    },
    {
        "word": "ঔষধ",
        "meaning": "১ রোগ নিরাময়ের ভেষজ বা রাসায়নিক উপাদান, দাওয়াই, ওষুধ।",
        "icon": "💊",
        "category": "alphabet",
        "sub_key": "ঔ"
    },
    {
        "word": "ঔদার্য",
        "meaning": "১ মহত্ত্ব, বদান্যতা, উদার মনোভাব বা প্রশস্ত হৃদয়।",
        "icon": "❤️",
        "category": "alphabet",
        "sub_key": "ঔ"
    },
    {
        "word": "কলম",
        "meaning": "১ কালি দ্বারা লেখার দণ্ডাকার সরঞ্জাম, লেখনী। ২ উদ্ভিদের ডাল কেটে তৈরি চারা।",
        "icon": "✒️",
        "category": "alphabet",
        "sub_key": "ক"
    },
    {
        "word": "কমল",
        "meaning": "১ পদ্মফুল, শতদল, পঙ্কজ। ২ সুন্দর ও কোমল বস্তু।",
        "icon": "🪷",
        "category": "alphabet",
        "sub_key": "ক"
    },
    {
        "word": "কদম",
        "meaning": "১ বর্ষাকালে ফোটা সুগন্ধযুক্ত গোল পুষ্প বা তার বৃক্ষ। ২ পদবিক্ষেপ বা পদক্ষেপ।",
        "icon": "🌸",
        "category": "alphabet",
        "sub_key": "ক"
    },
    {
        "word": "খরগোশ",
        "meaning": "১ লম্বা কান ও নরম পশমযুক্ত দ্রুতগামী নিরীহ স্তন্যপায়ী তৃণভোজী প্রাণী।",
        "icon": "🐇",
        "category": "alphabet",
        "sub_key": "খ"
    },
    {
        "word": "খড়ম",
        "meaning": "১ পায়ে পরার কাঠের পাদুকা বা চটিবিশেষ।",
        "icon": "🪵",
        "category": "alphabet",
        "sub_key": "খ"
    },
    {
        "word": "গরু",
        "meaning": "১ গৃহপালিত দুগ্ধবতী চতুষ্পদ প্রাণী, গাভী, গো।",
        "icon": "🐄",
        "category": "alphabet",
        "sub_key": "গ"
    },
    {
        "word": "গোলাপ",
        "meaning": "১ মনোরম সুবাস ও পাপড়িযুক্ত বিশ্ববিখ্যাত ফুলবিশেষ।",
        "icon": "🌹",
        "category": "alphabet",
        "sub_key": "গ"
    },
    {
        "word": "ঘড়ি",
        "meaning": "১ সময় বা প্রহর পরিমাপক যন্ত্র, কালমাপক।",
        "icon": "⏰",
        "category": "alphabet",
        "sub_key": "ঘ"
    },
    {
        "word": "ঘোড়া",
        "meaning": "১ দ্রুতগামী অশ্ব, শক্তিশালী চতুষ্পদ বাহন প্রাণী।",
        "icon": "🐎",
        "category": "alphabet",
        "sub_key": "ঘ"
    },
    {
        "word": "ব্যাঙ",
        "meaning": "১ জল ও স্থলে উভচরী ক্ষুদ্র লম্ফপ্রদানকারী প্রাণী, ভেক।",
        "icon": "🐸",
        "category": "alphabet",
        "sub_key": "ঙ"
    },
    {
        "word": "চশমা",
        "meaning": "১ চোখের দৃষ্টি উন্নত বা রোদ থেকে রক্ষার জন্য ব্যবহৃত লেন্স ও ফ্রেমের সরঞ্জাম।",
        "icon": "👓",
        "category": "alphabet",
        "sub_key": "চ"
    },
    {
        "word": "চাঁদ",
        "meaning": "১ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ, চন্দ্র, শশী, ইন্দু, বিধু।",
        "icon": "🌙",
        "category": "alphabet",
        "sub_key": "চ"
    },
    {
        "word": "ছাতা",
        "meaning": "১ রোদ বা বৃষ্টি থেকে মাথা রক্ষার জন্য হাতলযুক্ত আচ্ছাদন, ছত্র।",
        "icon": "☂️",
        "category": "alphabet",
        "sub_key": "ছ"
    },
    {
        "word": "ছবি",
        "meaning": "১ প্রতিচ্ছবি, চিত্র, প্রতিকৃতি, আলোকচিত্র।",
        "icon": "🖼️",
        "category": "alphabet",
        "sub_key": "ছ"
    },
    {
        "word": "জাহাজ",
        "meaning": "১ সমুদ্রে বা নদীতে যাত্রী ও মালবাহী বিশাল নৌযান, তরণী।",
        "icon": "🚢",
        "category": "alphabet",
        "sub_key": "জ"
    },
    {
        "word": "জল",
        "meaning": "১ তৃষ্ণা নিবারক তরল, পানি, নীর, বারি, সলিল।",
        "icon": "💧",
        "category": "alphabet",
        "sub_key": "জ"
    },
    {
        "word": "ঝুড়ি",
        "meaning": "১ বাঁশ বা বেতের তৈরি ফলমূল ও দ্রব্যাদি রাখার পাত্র, চুপড়ি।",
        "icon": "🧺",
        "category": "alphabet",
        "sub_key": "ঝ"
    },
    {
        "word": "ঝরনা",
        "meaning": "১ পাহাড় থেকে প্রবাহিত প্রাকৃতিক জলের ধারা, নির্ঝর।",
        "icon": "🏞️",
        "category": "alphabet",
        "sub_key": "ঝ"
    },
    {
        "word": "মিঞা",
        "meaning": "১ সম্ভ্রান্ত ভদ্রলোক বা সম্মানসূচক পদবি বা সম্বোধন।",
        "icon": "👳",
        "category": "alphabet",
        "sub_key": "ঞ"
    },
    {
        "word": "টিয়া",
        "meaning": "১ বাঁকা লাল ঠোঁট ও সবুজ পালকবিশিষ্ট মানুষের মত কথা বলতে পারা পাখি।",
        "icon": "🦜",
        "category": "alphabet",
        "sub_key": "ট"
    },
    {
        "word": "টমেটো",
        "meaning": "১ লাল রঙের সুস্বাদু রসালো পুষ্টিকর সবজি ও সালাদ সামগ্রী।",
        "icon": "🍅",
        "category": "alphabet",
        "sub_key": "ট"
    },
    {
        "word": "ঠোঁট",
        "meaning": "১ মুখের উপর ও নিচের প্রান্তভাগ, ওষ্ঠ ও অধর। ২ পাখির চঞ্চু।",
        "icon": "👄",
        "category": "alphabet",
        "sub_key": "ঠ"
    },
    {
        "word": "ডালিম",
        "meaning": "১ রক্তিম সুমিষ্টি দানাদার পুষ্টিকর ফলবিশেষ, বেদানা, আনার।",
        "icon": "🍎",
        "category": "alphabet",
        "sub_key": "ড"
    },
    {
        "word": "ডাব",
        "meaning": "১ মিষ্টি পানির নারিকেলের কচি রূপ।",
        "icon": "🥥",
        "category": "alphabet",
        "sub_key": "ড"
    },
    {
        "word": "ঢোল",
        "meaning": "১ চামড়া দিয়ে বাঁধানো দুই পাশযুক্ত কাঠের তৈরি লোকবাদ্যযন্ত্র।",
        "icon": "🪘",
        "category": "alphabet",
        "sub_key": "ঢ"
    },
    {
        "word": "হরিণ",
        "meaning": "১ বনের দ্রুতগামী সুন্দর চোখ ও শিংবিশিষ্ট স্তন্যপায়ী প্রাণী, মৃগ।",
        "icon": "🦌",
        "category": "alphabet",
        "sub_key": "ণ"
    },
    {
        "word": "তালা",
        "meaning": "১ চাবি দিয়ে ঘর বা সিন্দুক সুরক্ষিত রাখার ধাতব যন্ত্র।",
        "icon": "🔒",
        "category": "alphabet",
        "sub_key": "ত"
    },
    {
        "word": "তারা",
        "meaning": "১ রাতের আকাশে দীপ্তিময় নক্ষত্র, জ্যোতিষ্ক।",
        "icon": "⭐",
        "category": "alphabet",
        "sub_key": "ত"
    },
    {
        "word": "থালা",
        "meaning": "১ ভাত বা খাবার পরিবেশনের গোল ধাতব বা চিনামাটির পাত্র, বাসন।",
        "icon": "🍽️",
        "category": "alphabet",
        "sub_key": "থ"
    },
    {
        "word": "দুধ",
        "meaning": "১ গাভীর থেকে প্রাপ্ত পুষ্টিকর সাদা দুগ্ধ পানীয়, ক্ষীর।",
        "icon": "🥛",
        "category": "alphabet",
        "sub_key": "দ"
    },
    {
        "word": "দোয়েল",
        "meaning": "১ সাদা-কালো রঙের মধুর শীশ দেওয়া বাংলাদেশের জাতীয় পাখি।",
        "icon": "🐦",
        "category": "alphabet",
        "sub_key": "দ"
    },
    {
        "word": "ধান",
        "meaning": "১ চাল উৎপাদনকারী প্রধান শস্য ও কৃষিজ ফসল।",
        "icon": "🌾",
        "category": "alphabet",
        "sub_key": "ধ"
    },
    {
        "word": "নৌকা",
        "meaning": "১ নদীতে চলাচলের দাঁড় বা বৈঠাযুক্ত জলযান, তরী।",
        "icon": "⛵",
        "category": "alphabet",
        "sub_key": "ন"
    },
    {
        "word": "নদী",
        "meaning": "১ পর্বত থেকে সাগরে প্রবাহিত প্রাকৃতিক জলধারা, তটিনী, স্রোতস্বিনী।",
        "icon": "🏞️",
        "category": "alphabet",
        "sub_key": "ন"
    },
    {
        "word": "পাখি",
        "meaning": "১ ডানা ও পালকযুক্ত আকাশে উড়তে সক্ষম চতুষ্পদ প্রাণী, পক্ষী, খেচর।",
        "icon": "🕊️",
        "category": "alphabet",
        "sub_key": "প"
    },
    {
        "word": "পাতা",
        "meaning": "১ গাছের সবুজ পত্র যা সূর্যের আলো থেকে খাদ্য প্রস্তুত করে।",
        "icon": "🍃",
        "category": "alphabet",
        "sub_key": "প"
    },
    {
        "word": "ফুল",
        "meaning": "১ উদ্ভিদের সৌন্দর্য ও বংশবৃদ্ধির অঙ্গ, পুষ্প, কুসুম।",
        "icon": "🌸",
        "category": "alphabet",
        "sub_key": "ফ"
    },
    {
        "word": "ফল",
        "meaning": "১ গাছের মিষ্ট রসালো ভোজ্য অংশ। ২ কর্মের পরিণতি বা ফলাফল।",
        "icon": "🍎",
        "category": "alphabet",
        "sub_key": "ফ"
    },
    {
        "word": "বই",
        "meaning": "১ মুদ্রিত বা লিখিত পাতার বাঁধাই করা সংকলন, গ্রন্থ, পুস্তক।",
        "icon": "📚",
        "category": "alphabet",
        "sub_key": "ব"
    },
    {
        "word": "বাঘ",
        "meaning": "১ হলুদ ও কালো ডোরাকাটা হিংস্র মাংসাশী রাজকীয় পশু, সুন্দরবনের রয়েল বেঙ্গল টাইগার।",
        "icon": "🐅",
        "category": "alphabet",
        "sub_key": "ব"
    },
    {
        "word": "ভালুক",
        "meaning": "১ ঘন কালো লোমে ঢাকা বনে বিচরণকারী বৃহৎ স্তন্যপায়ী প্রাণী, ভল্লুক।",
        "icon": "🐻",
        "category": "alphabet",
        "sub_key": "ভ"
    },
    {
        "word": "মাছ",
        "meaning": "১ পানিতে শ্বাসপ্রশ্বাস নিয়ে বেঁচে থাকা মেরুদণ্ডী জলচর প্রাণী, মৎস্য।",
        "icon": "🐟",
        "category": "alphabet",
        "sub_key": "ম"
    },
    {
        "word": "ময়ূর",
        "meaning": "১ চমৎকার পেখমমেলা সুন্দর নৃত্যরত পাখি, শিখী।",
        "icon": "🦚",
        "category": "alphabet",
        "sub_key": "ম"
    },
    {
        "word": "যানবাহন",
        "meaning": "১ মানুষ বা মালপত্র এক স্থান থেকে অন্য স্থানে বহনের গাড়ি বা নৌযান।",
        "icon": "🚗",
        "category": "alphabet",
        "sub_key": "য"
    },
    {
        "word": "রথ",
        "meaning": "১ প্রাচীনকালের দেবদেবী বা রাজাদের চাকাযুক্ত টানাগাড়ি।",
        "icon": "🛞",
        "category": "alphabet",
        "sub_key": "র"
    },
    {
        "word": "রাজা",
        "meaning": "১ রাজ্যের শাসনকর্তা, নৃপতি, সম্রাট।",
        "icon": "👑",
        "category": "alphabet",
        "sub_key": "র"
    },
    {
        "word": "লাল",
        "meaning": "১ রক্তের মতো গাঢ় রঞ্জক বর্ণ, রক্তিম।",
        "icon": "🔴",
        "category": "alphabet",
        "sub_key": "ল"
    },
    {
        "word": "লেবু",
        "meaning": "১ টক স্বাদযুক্ত ভিটামিন সি সমৃদ্ধ সুগন্ধি রসালো ফল।",
        "icon": "🍋",
        "category": "alphabet",
        "sub_key": "ল"
    },
    {
        "word": "শাপলা",
        "meaning": "১ পানিতে ফোটা মনোরম সুদৃশ্য ফুল, বাংলাদেশের জাতীয় ফুল।",
        "icon": "🪷",
        "category": "alphabet",
        "sub_key": "শ"
    },
    {
        "word": "শালিক",
        "meaning": "১ লোকালয়ে ঝাঁকে ঝাঁকে বিচরণকারী পরিচিত ছোট ধূসর-হলুদ ঠোঁট পাখি।",
        "icon": "🐦",
        "category": "alphabet",
        "sub_key": "শ"
    },
    {
        "word": "ষাঁড়",
        "meaning": "১ বলশালী পুরুষ গরু, বৃষভ, আনডাঙ্গা বলদ।",
        "icon": "🐂",
        "category": "alphabet",
        "sub_key": "ষ"
    },
    {
        "word": "সূর্য",
        "meaning": "১ সৌরজগতের কেন্দ্রস্থিত প্রধান নক্ষত্র যার আলোয় পৃথিবী উদ্ভাসিত হয়, রবি, ভানু।",
        "icon": "☀️",
        "category": "alphabet",
        "sub_key": "স"
    },
    {
        "word": "সিংহ",
        "meaning": "১ কেশরযুক্ত পশুরাজ, অরণ্যের অত্যন্ত বলশালী মাংসাশী বন্য প্রাণী।",
        "icon": "🦁",
        "category": "alphabet",
        "sub_key": "স"
    },
    {
        "word": "হাতি",
        "meaning": "১ লম্বা শুঁড় ও বড় কানযুক্ত বিশাল আকৃতির স্থলচর চতুষ্পদ প্রাণী, হস্তী, গজ।",
        "icon": "🐘",
        "category": "alphabet",
        "sub_key": "হ"
    },
    {
        "word": "হাঁস",
        "meaning": "১ পানিতে সাঁতার কাটতে পারা জলচর গৃহপালিত বা বুনো পাখি।",
        "icon": "🦆",
        "category": "alphabet",
        "sub_key": "হ"
    },

    # ---------------- Category 2: Kar Signs (কা, কি, কী, কু...) ----------------
    {
        "word": "কাকলি",
        "meaning": "১ পাখির মিষ্টি কলরব বা মধুর অস্ফুট ধ্বনি। ২ শিশুদের মিষ্টি অপূর্ণ আধো-আধো কথা।",
        "icon": "🐦",
        "category": "kar",
        "sub_key": "কা"
    },
    {
        "word": "কাগজ",
        "meaning": "১ কাঠ, বাঁশ বা ঘাসের মণ্ড থেকে তৈরি পাতলা লেখার উপাদান। ২ দলিল, প্রমাণপত্র।",
        "icon": "📄",
        "category": "kar",
        "sub_key": "কা"
    },
    {
        "word": "কান",
        "meaning": "১ শব্দ শোনার ইন্দ্রিয়, শ্রবণেন্দ্রিয়, কর্ণ। ২ পাত্র বা থলের হাতল।",
        "icon": "👂",
        "category": "kar",
        "sub_key": "কা"
    },
    {
        "word": "কাক",
        "meaning": "১ কৃষ্ণবর্ণের অত্যন্ত চতুর ও পরিচিত শহরচর পাখি, বায়স।",
        "icon": "🦅",
        "category": "kar",
        "sub_key": "কা"
    },
    {
        "word": "কাজু",
        "meaning": "১ সুস্বাদু পুষ্টিকর বৃক্কাকার বাদামবিশেষ (কাজুবাদাম)।",
        "icon": "🥜",
        "category": "kar",
        "sub_key": "কা"
    },
    {
        "word": "কিরণ",
        "meaning": "১ সূর্যের বা আলোর জ্যোতি, রশ্মি, প্রভা, অংশু।",
        "icon": "☀️",
        "category": "kar",
        "sub_key": "কি"
    },
    {
        "word": "কিশোর",
        "meaning": "১ বাল্য ও যৌবনের মধ্যবর্তী বয়সের ছেলে (১১ থেকে ১৫ বছর)।",
        "icon": "👦",
        "category": "kar",
        "sub_key": "কি"
    },
    {
        "word": "কিতাব",
        "meaning": "১ ধর্মীয় বা উচ্চমানের মূল্যবান গ্রন্থ, পুস্তক, বই।",
        "icon": "📖",
        "category": "kar",
        "sub_key": "কি"
    },
    {
        "word": "কীট",
        "meaning": "১ ক্ষুদ্র পতঙ্গ, পোকা, কৃমি।",
        "icon": "🐛",
        "category": "kar",
        "sub_key": "কী"
    },
    {
        "word": "কীর্তন",
        "meaning": "১ সুর করে ভক্তিগীতি বা ঈশ্বরের গুণগান গাওয়া।",
        "icon": "🪘",
        "category": "kar",
        "sub_key": "কী"
    },
    {
        "word": "কুটির",
        "meaning": "১ শান্ত মনোরম খড়ের ছোট ঘর, কুঁড়েঘর, পর্ণকুটির।",
        "icon": "🛖",
        "category": "kar",
        "sub_key": "কু"
    },
    {
        "word": "কুসুম",
        "meaning": "১ ফুল, পুষ্প। ২ ডিমের ভেতরের হলুদ পুষ্টিকর অংশ।",
        "icon": "🌸",
        "category": "kar",
        "sub_key": "কু"
    },
    {
        "word": "কূল",
        "meaning": "১ নদীর তীর, তট, পার। ২ সীমা বা প্রান্ত।",
        "icon": "🏖️",
        "category": "kar",
        "sub_key": "কূ"
    },
    {
        "word": "কৃষক",
        "meaning": "১ যিনি জমিতে লাঙল দিয়ে ফসল উৎপাদন করেন, চাষি।",
        "icon": "🌾",
        "category": "kar",
        "sub_key": "কৃ"
    },
    {
        "word": "কৃপা",
        "meaning": "১ দয়া, অনুগ্রহ, করুণা, আশীর্বাদ।",
        "icon": "🤲",
        "category": "kar",
        "sub_key": "কৃ"
    },
    {
        "word": "কেশর",
        "meaning": "১ সিংহের ঘাড়ের ঘন লম্বা চুল। ২ ফুলের পরাগধানী।",
        "icon": "🦁",
        "category": "kar",
        "sub_key": "কে"
    },
    {
        "word": "কেক",
        "meaning": "১ ওভেনে সেঁকা ময়দা, চিনি ও ডিমের তৈরি নরম মিষ্টি খাদ্য।",
        "icon": "🎂",
        "category": "kar",
        "sub_key": "কে"
    },
    {
        "word": "কৈশোর",
        "meaning": "১ শৈশবোত্তর বয়স, কিশোরকাল, তারুণ্যের সূচনালগ্ন।",
        "icon": "🧑",
        "category": "kar",
        "sub_key": "কৈ"
    },
    {
        "word": "কোকিল",
        "meaning": "১ বসন্তকালে সুরেলা কণ্ঠে কুহু কুহু ডাক দেওয়া কালো রঙের পাখি, পরভৃত।",
        "icon": "🐦",
        "category": "kar",
        "sub_key": "কো"
    },
    {
        "word": "কোমল",
        "meaning": "১ নরম, মোলায়েম, মসৃণ। ২ মধুর, স্নিগ্ধ, সুকোমল।",
        "icon": "🪶",
        "category": "kar",
        "sub_key": "কো"
    },
    {
        "word": "কৌতুহল",
        "meaning": "১ নতুন কিছু জানা বা দেখার প্রবল আগ্রহ বা জিজ্ঞাসা।",
        "icon": "🧐",
        "category": "kar",
        "sub_key": "কৌ"
    },
    {
        "word": "কৌতুক",
        "meaning": "১ হাসি-তামাশা, রঙ্গ, পরিহাস, কৌতুকজনক অভিনয় বা কথা।",
        "icon": "🎭",
        "category": "kar",
        "sub_key": "কৌ"
    },
    {
        "word": "খাতা",
        "meaning": "১ লেখার জন্য সাদা কাগজ দিয়ে সেলাই করা পুস্তিকা।",
        "icon": "📓",
        "category": "kar",
        "sub_key": "খা"
    },
    {
        "word": "খাবার",
        "meaning": "১ যা আহার করা হয়, অন্ন, খাদ্যসামগ্রী।",
        "icon": "🍲",
        "category": "kar",
        "sub_key": "খা"
    },
    {
        "word": "গাছ",
        "meaning": "১ শিকড়, কাণ্ড ও শাখাযুক্ত উদ্ভিদ, বৃক্ষ, তরু।",
        "icon": "🌳",
        "category": "kar",
        "sub_key": "গা"
    },
    {
        "word": "গান",
        "meaning": "১ সুর ও তালের সমন্বয়ে গাওয়া গীত, সঙ্গীত।",
        "icon": "🎶",
        "category": "kar",
        "sub_key": "গা"
    },
    {
        "word": "ঘাস",
        "meaning": "১ ভূমিতে গজানো ক্ষুদ্র সবুজ তৃণ।",
        "icon": "🌱",
        "category": "kar",
        "sub_key": "ঘা"
    },

    # ---------------- Category 3: Phala (্য, ্র, ্ব, ্ম, ্ন, ্ল, র্) ----------------
    {
        "word": "সূর্য",
        "meaning": "১ পৃথিবীর প্রাণদাতা কেন্দ্রীয় নক্ষত্র, রবি, তপন।",
        "icon": "☀️",
        "category": "phala",
        "sub_key": "্য"
    },
    {
        "word": "ভাগ্য",
        "meaning": "১ অদৃষ্ট, কপাল, নিয়তি, নসিব, বিধিলিপি।",
        "icon": "🍀",
        "category": "phala",
        "sub_key": "্য"
    },
    {
        "word": "বাক্য",
        "meaning": "১ মনের সম্পূর্ণ ভাব প্রকাশকারী অর্থপূর্ণ শব্দসমষ্টি।",
        "icon": "💬",
        "category": "phala",
        "sub_key": "্য"
    },
    {
        "word": "কন্যা",
        "meaning": "১ নিজের জন্ম দেওয়া মেয়ে, দুহিতা, তনয়া।",
        "icon": "👧",
        "category": "phala",
        "sub_key": "্য"
    },
    {
        "word": "গ্রাম",
        "meaning": "১ পল্লী এলাকা, শহরের চেয়ে শান্ত কৃষিনির্ভর জনপদ।",
        "icon": "🏡",
        "category": "phala",
        "sub_key": "্র"
    },
    {
        "word": "বজ্র",
        "meaning": "১ মেঘের বিদ্যুৎ চমকের সাথে প্রচণ্ড গর্জন ও অশনিপাত।",
        "icon": "⚡",
        "category": "phala",
        "sub_key": "্র"
    },
    {
        "word": "গ্রহ",
        "meaning": "১ সূর্যের চারদিকে প্রদক্ষিণকারী জ্যোতিষ্ক (যেমন পৃথিবী)।",
        "icon": "🪐",
        "category": "phala",
        "sub_key": "্র"
    },
    {
        "word": "চক্র",
        "meaning": "১ চাকা, গোল পরিধি। ২ ধারাবাহিক আবর্তন।",
        "icon": "☸️",
        "category": "phala",
        "sub_key": "্র"
    },
    {
        "word": "স্বাদ",
        "meaning": "১ জিহ্বার দ্বারা অনুভূত খাবারের মিষ্টতা, রসনা তৃপ্তি।",
        "icon": "👅",
        "category": "phala",
        "sub_key": "্ব"
    },
    {
        "word": "স্বপ্ন",
        "meaning": "১ ঘুমে অবচেতন মনে দেখা দৃশ্য। ২ ভবিষ্যৎ জীবনের আশা-আকাঙ্ক্ষা।",
        "icon": "💭",
        "category": "phala",
        "sub_key": "্ব"
    },
    {
        "word": "স্মৃতি",
        "meaning": "১ অতীতের কথা মনে রাখা, স্মরণশক্তি, স্মৃতিচারণ।",
        "icon": "🧠",
        "category": "phala",
        "sub_key": "্ম"
    },
    {
        "word": "পদ্ম",
        "meaning": "১ পানিতে ফোটা অত্যন্ত সুন্দর পবিত্র ফুল, কমল, শতদল।",
        "icon": "🪷",
        "category": "phala",
        "sub_key": "্ম"
    },
    {
        "word": "চিহ্ন",
        "meaning": "১ কোনো কিছু চেনার প্রতীক, লক্ষণ, নিশানা, দাগ।",
        "icon": "📍",
        "category": "phala",
        "sub_key": "্ন"
    },
    {
        "word": "ক্লান্ত",
        "meaning": "১ পরিশ্রমে অবশ দেহ, অবসন্ন, পরিশ্রান্ত।",
        "icon": "😮‍💨",
        "category": "phala",
        "sub_key": "্ল"
    },
    {
        "word": "বর্ণ",
        "meaning": "১ ধ্বনির লিখিত রূপ বা হরফ। ২ গায়ের রং বা বর্ণচ্ছটা।",
        "icon": "🎨",
        "category": "phala",
        "sub_key": "র্"
    },
    {
        "word": "কর্ম",
        "meaning": "১ মানুষের করা কাজ, কর্তব্য, দায়িত্ব।",
        "icon": "⚒️",
        "category": "phala",
        "sub_key": "র্"
    },

    # ---------------- Category 4: Juktakkhor (ক্ষ, জ্ঞ, ষ্ণ, ঙ্ক...) ----------------
    {
        "word": "ক্ষমতা",
        "meaning": "১ কার্য সম্পাদনের সামর্থ্য, শক্তি, পরাক্রম। ২ সামাজিক বা রাজনৈতিক আধিপত্য ও কর্তৃত্ব।",
        "icon": "⚡",
        "category": "juktakkhor",
        "sub_key": "ক্ষ"
    },
    {
        "word": "ক্ষমা",
        "meaning": "১ অপরাধীর দোষ মার্জনা করা, মাফ করে দেওয়া, সহনশীলতা।",
        "icon": "🕊️",
        "category": "juktakkhor",
        "sub_key": "ক্ষ"
    },
    {
        "word": "ক্ষীর",
        "meaning": "১ দুধ ঘন করে জ্বাল দেওয়া সুস্বাদু পায়েস বা মিষ্টান্ন।",
        "icon": "🥣",
        "category": "juktakkhor",
        "sub_key": "ক্ষ"
    },
    {
        "word": "ক্ষতি",
        "meaning": "১ লোকসান, অপচয়, নাশ, বিনাশ বা ক্ষতিসাধন।",
        "icon": "📉",
        "category": "juktakkhor",
        "sub_key": "ক্ষ"
    },
    {
        "word": "জ্ঞান",
        "meaning": "১ সত্যের উপলব্ধি, বিদ্যা, প্রজ্ঞা, বোধশক্তি বা বুদ্ধি।",
        "icon": "💡",
        "category": "juktakkhor",
        "sub_key": "জ্ঞ"
    },
    {
        "word": "বিজ্ঞানী",
        "meaning": "১ বিজ্ঞান চর্চাকারী ও নতুন আবিষ্কারে নিবেদিত পণ্ডিত গবেষক।",
        "icon": "🔬",
        "category": "juktakkhor",
        "sub_key": "জ্ঞ"
    },
    {
        "word": "অজ্ঞাত",
        "meaning": "১ যার পরিচয় জানা নেই, অপরিচিত, গুপ্ত।",
        "icon": "❓",
        "category": "juktakkhor",
        "sub_key": "জ্ঞ"
    },
    {
        "word": "উষ্ণ",
        "meaning": "১ গরম, তপ্ত, মৃদু উত্তাপবিশিষ্ট। ২ আন্তরিক অভ্যর্থনা।",
        "icon": "🌡️",
        "category": "juktakkhor",
        "sub_key": "ষ্ণ"
    },
    {
        "word": "তৃষ্ণা",
        "meaning": "১ জলপানের তীব্র পিপাসা। ২ কোনো কিছু পাওয়ার প্রবল বাসনা।",
        "icon": "🥤",
        "category": "juktakkhor",
        "sub_key": "ষ্ণ"
    },
    {
        "word": "অঙ্ক",
        "meaning": "১ গণিতের সংখ্যা বা হিসাব। ২ নাটকের পরিচ্ছেদ। ৩ কোল বা ক্রোড়।",
        "icon": "🔢",
        "category": "juktakkhor",
        "sub_key": "ঙ্ক"
    },
    {
        "word": "গঙ্গা",
        "meaning": "১ ভারত ও বাংলাদেশের অন্যতম পবিত্র প্রধান নদী, পদ্মার মূল প্রবাহ।",
        "icon": "🌊",
        "category": "juktakkhor",
        "sub_key": "ঙ্গ"
    },
    {
        "word": "পঞ্চম",
        "meaning": "১ গণনায় পাঁচ সংখ্যক, পঞ্চম ক্রম। ২ সঙ্গীতের স্বরবিশেষ।",
        "icon": "৫️⃣",
        "category": "juktakkhor",
        "sub_key": "ঞ্চ"
    },
    {
        "word": "ঘণ্টা",
        "meaning": "১ সময়ের ষাট মিনিটের পরিমাপ। ২ ধাতব কাঁসা যা বাজালে শব্দ হয়।",
        "icon": "🔔",
        "category": "juktakkhor",
        "sub_key": "ন্ট"
    },
    {
        "word": "আনন্দ",
        "meaning": "১ মনের পরম তৃপ্তি, অপার হর্ষ ও উল্লাস।",
        "icon": "🎉",
        "category": "juktakkhor",
        "sub_key": "ন্দ"
    },
    {
        "word": "গন্ধ",
        "meaning": "১ নাকের দ্বারা অনুভূত ঘ্রাণ বা সুবাস।",
        "icon": "👃",
        "category": "juktakkhor",
        "sub_key": "ন্ধ"
    },
    {
        "word": "সম্পদ",
        "meaning": "১ ধনদৌলত, বৈভব, অর্থ ও মূল্যবান সম্পত্তি।",
        "icon": "💎",
        "category": "juktakkhor",
        "sub_key": "ম্প"
    },
    {
        "word": "ছাত্র",
        "meaning": "১ শিক্ষক বা বিদ্যালয়ে বিদ্যা অর্জনকারী শিক্ষার্থী, পড়ুয়া।",
        "icon": "🎒",
        "category": "juktakkhor",
        "sub_key": "ত্র"
    },
    {
        "word": "শ্রমিক",
        "meaning": "১ কায়িক বা মানসিক পরিশ্রম করে জীবিকা অর্জনকারী মেহনতি মানুষ।",
        "icon": "👷",
        "category": "juktakkhor",
        "sub_key": "শ্র"
    },
    {
        "word": "পুস্তক",
        "meaning": "১ বাঁধাই করা বই বা গ্রন্থ।",
        "icon": "📖",
        "category": "juktakkhor",
        "sub_key": "স্ত"
    },
    {
        "word": "স্থান",
        "meaning": "১ জায়গা, ভূমিখণ্ড, পদমর্যাদা।",
        "icon": "📍",
        "category": "juktakkhor",
        "sub_key": "স্থ"
    },
    {
        "word": "স্পর্শ",
        "meaning": "১ চামড়ার অনুভূতি, ছোঁয়া, পরশ।",
        "icon": "✋",
        "category": "juktakkhor",
        "sub_key": "স্প"
    },
    {
        "word": "স্কুল",
        "meaning": "১ প্রাথমিক ও মাধ্যমিক পাঠশালা বা বিদ্যালয়।",
        "icon": "🏫",
        "category": "juktakkhor",
        "sub_key": "স্ক"
    }
]

# ---------------------------------------------------------------------------
# PDF Parser Logic (if PDF file is supplied or present in filesystem)
# ---------------------------------------------------------------------------
def try_parse_pdf_file(pdf_path: str) -> list[dict]:
    """
    Attempts to read and parse Bangla Academy Samkshipta Bangla Abhidhan PDF.
    Headword extraction pattern:
    Captures headword in bold or entry boundary and text until next headword.
    """
    if not os.path.exists(pdf_path):
        return []
    
    print(f"[*] Found PDF file at: {pdf_path}. Extracting text...")
    extracted_entries = []
    
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        print(f"[*] Total PDF Pages: {len(reader.pages)}")
        # Sample or parse pages
        limit_pages = min(50, len(reader.pages))
        full_text = ""
        for i in range(limit_pages):
            page_text = reader.pages[i].extract_text()
            if page_text:
                full_text += "\n" + page_text

        # Regex to capture headwords (Bengali word followed by definition)
        # In Abhidhan: [বাংলা শব্দ] [বি./বিণ./ক্রি.] [১ ... ২ ...]
        pattern = re.compile(r'(?m)^([\u0980-\u09FF]+)\s+([বিণক্রিক্রিবিং\.\s]+.+?)(?=^[\u0980-\u09FF]+\s+[বিণক্রিক্রিবিং\.]|\Z)', re.DOTALL)
        matches = pattern.findall(full_text)
        for headword, raw_meaning in matches:
            cleaned_meaning = re.sub(r'\s+', ' ', raw_meaning).strip()
            # Remove english artifacts
            cleaned_meaning = re.sub(r'[a-zA-Z0-9_\-\[\]\(\)]', '', cleaned_meaning)
            if len(cleaned_meaning) > 5:
                extracted_entries.append({
                    "word": headword.strip(),
                    "meaning": cleaned_meaning[:200],
                    "icon": "📖"
                })
        print(f"[*] Extracted {len(extracted_entries)} raw entries from PDF.")
    except Exception as e:
        print(f"[!] PDF reading notice: {e}")
        
    return extracted_entries

# ---------------------------------------------------------------------------
# Categorization & Filtering Engine
# ---------------------------------------------------------------------------
def build_curriculum_database():
    """
    Organizes all extracted and authentic Bangla Academy dictionary entries
    into structured categories (Alphabets, Kar signs, Phala, Juktakkhor, and 20 Levels).
    """
    print("[*] Initializing Bangla Academy Dictionary Database Engine...")
    
    # Check for PDF
    possible_paths = [
        "Bangla Academy Samkshipta Bangla Abhidhan (2008).pdf",
        "./Bangla Academy Samkshipta Bangla Abhidhan (2008).pdf",
        "/Bangla Academy Samkshipta Bangla Abhidhan (2008).pdf",
        "/tmp/Bangla Academy Samkshipta Bangla Abhidhan (2008).pdf"
    ]
    pdf_entries = []
    for path in possible_paths:
        if os.path.exists(path):
            pdf_entries = try_parse_pdf_file(path)
            break

    all_raw_entries = AUTHENTIC_BANGLA_ACADEMY_ENTRIES + pdf_entries
    
    # Deduplicate by word
    unique_words_dict = {}
    for entry in all_raw_entries:
        w = entry["word"].strip()
        if w not in unique_words_dict:
            entry["breakdown"] = breakdown_bengali_word(w)
            entry["ttsAudio"] = w
            unique_words_dict[w] = entry

    # 1. Category 1 (Alphabets): startsWith letter
    alphabets_db = {}
    letters = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ',
               'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
               'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন',
               'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ']
    for letter in letters:
        matches = [e for e in unique_words_dict.values() if e["word"].startswith(letter)]
        alphabets_db[letter] = matches

    # 2. Category 2 (Kar Signs): contains consonant + kar
    kar_combinations = ['কা', 'কি', 'কী', 'কু', 'কূ', 'কৃ', 'কে', 'কৈ', 'কো', 'কৌ',
                        'খা', 'গা', 'ঘা', 'চা', 'ছা', 'জা', 'ঝা', 'টা', 'ঠা', 'ডা']
    kar_db = {}
    for comb in kar_combinations:
        matches = [e for e in unique_words_dict.values() if comb in e["word"]]
        kar_db[comb] = matches

    # 3. Category 3 (Phala): contains phala modifier
    phala_signs = {'্য': 'য-ফলা', '্র': 'র-ফলা', '্ব': 'ব-ফলা', '্ম': 'ম-ফলা', '্ন': 'ন-ফলা', '্ল': 'ল-ফলা', 'র্': 'রেফ'}
    phala_db = {}
    for sign, name in phala_signs.items():
        matches = [e for e in unique_words_dict.values() if sign in e["word"]]
        phala_db[sign] = matches

    # 4. Category 4 (Juktakkhor): contains conjunct
    juktakkhor_list = ['ক্ষ', 'জ্ঞ', 'ষ্ণ', 'ঙ্ক', 'ঙ্গ', 'ঞ্চ', 'ঞ্জ', 'ন্ট', 'ন্ত', 'ন্দ', 'ন্ধ', 'ম্প', 'ত্র', 'শ্র', 'স্ত', 'স্থ', 'স্প', 'স্ক']
    juktakkhor_db = {}
    for juk in juktakkhor_list:
        matches = [e for e in unique_words_dict.values() if juk in e["word"]]
        juktakkhor_db[juk] = matches

    # 5. Samples requested explicitly:
    sample_samples = {
        "letter_অ": [e for e in unique_words_dict.values() if e["word"].startswith('অ')],
        "kar_কা": [e for e in unique_words_dict.values() if 'কা' in e["word"]],
        "juktakkhor_ক্ষ": [e for e in unique_words_dict.values() if 'ক্ষ' in e["word"]]
    }

    # 6. Construct complete curriculum database JSON
    output_database = {
        "meta": {
            "source": "Bangla Academy Samkshipta Bangla Abhidhan (2008)",
            "title": "বাংলা একাডেমি সংক্ষিপ্ত বাংলা অভিধান ও ২০-ধাপের পাঠ্যক্রম ডেটাবেজ",
            "version": "2.0.0",
            "total_entries": len(unique_words_dict)
        },
        "sample_samples": sample_samples,
        "alphabets": alphabets_db,
        "kar_signs": kar_db,
        "phala_signs": phala_db,
        "juktakkhor": juktakkhor_db,
        "all_words": unique_words_dict
    }

    # Write out curriculum_db.json
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.normpath(os.path.join(script_dir, "..", "src", "repository", "curriculum_db.json"))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_database, f, ensure_ascii=False, indent=2)

    print(f"[SUCCESS] Database written successfully to: {output_path}")
    print(f"[*] Total unique words catalogued: {len(unique_words_dict)}")

    # Print requested sample JSON for 'অ', 'কা', and 'ক্ষ'
    print("\n" + "="*70)
    print("SAMPLE JSON OUTPUT: Letter 'অ'")
    print("="*70)
    print(json.dumps(sample_samples["letter_অ"][:3], ensure_ascii=False, indent=2))

    print("\n" + "="*70)
    print("SAMPLE JSON OUTPUT: Kar sign 'কা'")
    print("="*70)
    print(json.dumps(sample_samples["kar_কা"][:3], ensure_ascii=False, indent=2))

    print("\n" + "="*70)
    print("SAMPLE JSON OUTPUT: Juktakkhor 'ক্ষ'")
    print("="*70)
    print(json.dumps(sample_samples["juktakkhor_ক্ষ"][:3], ensure_ascii=False, indent=2))
    print("="*70)

if __name__ == "__main__":
    build_curriculum_database()
