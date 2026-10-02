#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sorter.py - Production-Ready Multi-Level Bengali Word Sorter

Processes the local text file 'BengaliWordList_439.txt', cleans & normalizes
the Bengali words, and categorizes them into lightweight, pre-indexed JSON
databases for each learning level:

1. level_1_alphabets.json: Simple words formed ONLY with standalone vowels and consonants.
2. level_2_kars.json: Words containing vowel signs (kars) grouped by letter-kar combination.
3. level_3_phalas.json: Words containing phala forms (্য, ্র, ্ল, ্ব, ্ম, ্ন, ্ণ, র্).
4. level_4_juktakkhor.json: Words containing conjunct consonants joined by hasant/virama (্).

Data Structure:
{"w": "খোকা", "b": ["খ", "ো", "ক", "া"]}
Capped at a maximum of 250 high-quality words per letter or combination key.
"""

import sys
import os
import re
import json
import unicodedata
from typing import Dict, List, Set, Any, Tuple

# ---------------------------------------------------------------------------
# Bengali Linguistic Alphabets & Signs
# ---------------------------------------------------------------------------
STANDALONE_VOWELS = [
    'অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'
]

ALL_CONSONANTS = [
    'ক', 'খ', 'গ', 'ঘ', 'ঙ',
    'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
    'ট', 'ঠ', 'ড', 'ঢ', 'ণ',
    'ত', 'থ', 'দ', 'ধ', 'ন',
    'প', 'ফ', 'ব', 'ভ', 'ম',
    'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ',
    'ড়', 'ঢ়', 'য়', 'ৎ'
]

ALL_KARS = ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ']

# Distinct Phala forms and regex patterns for detection
PHALA_PATTERNS = {
    '্য': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD[\u09AF\u09DF]'),  # য-ফলা
    '্র': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD\u09B0'),          # র-ফলা
    '্ল': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD\u09B2'),          # ল-ফলা
    '্ব': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD\u09AC'),          # ব-ফলা
    '্ম': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD\u09AE'),          # ম-ফলা
    '্ন': re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD[\u09A8\u09A3]'),  # ন/ণ-ফলা
    'র্': re.compile(r'\u09B0\u09CD[\u0995-\u09B9\u09DC-\u09DF]')           # রেফ
}

# General regex for extracting any conjunct: Consonant + Virama + Consonant (+ optional Virama + Consonant)
JUKTAKKHOR_PATTERN = re.compile(r'[\u0995-\u09B9\u09DC-\u09DF]\u09CD[\u0995-\u09B9\u09DC-\u09DF](?:\u09CD[\u0995-\u09B9\u09DC-\u09DF])?')

MAX_WORDS_PER_KEY = 250


# ---------------------------------------------------------------------------
# 1. Cleaning & Normalization Engine
# ---------------------------------------------------------------------------
def clean_and_normalize_word(raw_text: str) -> str:
    """
    Cleans and normalizes a candidate Bengali word:
    - Strips whitespace, digits (0-9, ০-৯), punctuation, and non-Bengali characters.
    - Recombines decomposed O-kar (\u09C7\u09BE -> \u09CB) and Ou-kar (\u09C7\u09D7 -> \u09CC).
    - Applies unicodedata.normalize('NFC', word).
    """
    if not raw_text:
        return ""

    # Recombine broken/decomposed Bengali vowel combinations before NFC
    text = raw_text.replace('\u09C7\u09BE', '\u09CB').replace('\u09C7\u09D7', '\u09CC')
    text = unicodedata.normalize('NFC', text)

    # Filter to only valid Bengali linguistic characters
    valid_chars: List[str] = []
    for ch in text:
        code = ord(ch)
        # Modifiers: ঁ (0981), ং (0982), ঃ (0983), ় (09BC)
        # Vowels: 0985-098C, 098F-0990, 0993-0994
        # Consonants: 0995-09B9, 09DC-09DD, 09DF, 09CE (khanda ta)
        # Kars: 09BE-09C4, 09C7-09C8, 09CB-09CC
        # Virama (Hasant): 09CD
        if (
            (0x0981 <= code <= 0x0983) or
            (0x0985 <= code <= 0x098C) or
            (0x098F <= code <= 0x0990) or
            (0x0993 <= code <= 0x09B9) or
            (code == 0x09BC) or
            (0x09BE <= code <= 0x09CD) or
            (code == 0x09CE) or
            (0x09DC <= code <= 0x09DF)
        ):
            valid_chars.append(ch)

    word = unicodedata.normalize('NFC', ''.join(valid_chars).strip())

    # Ensure the cleaned word contains at least one authentic vowel or consonant
    has_base_letter = any(c in (set(STANDALONE_VOWELS) | set(ALL_CONSONANTS)) for c in word)
    return word if has_base_letter else ""


def get_breakdown(word: str) -> List[str]:
    """
    Returns the exact grapheme breakdown array for a Bengali word.
    e.g. 'খোকা' -> ['খ', 'ো', 'ক', 'া']
    e.g. 'রক্ত' -> ['র', 'ক', '্', 'ত']
    """
    return list(unicodedata.normalize('NFC', word))


# ---------------------------------------------------------------------------
# 2. File Ingestion & Deduplication
# ---------------------------------------------------------------------------
def load_clean_wordlist(file_path: str) -> List[str]:
    """
    Reads BengaliWordList_439.txt line by line using utf-8 encoding.
    Strips metadata, punctuation, digits, normalizes to NFC, and removes duplicates.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Input file '{file_path}' not found.")

    unique_words: Dict[str, bool] = {}

    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            # Strip bracketed metadata like [বি.], (ক্রি.), etc.
            stripped_line = re.sub(r'[\(\[\{⟨【〔<][^\)\]\}⟩】〕>]*[\)\]\}⟩】〕>]', ' ', line)
            # Split line on whitespace and common delimiters to handle single or multi-word lines
            tokens = re.split(r'[\s,;|/]+', stripped_line)
            for tok in tokens:
                cleaned = clean_and_normalize_word(tok)
                if cleaned and cleaned not in unique_words:
                    unique_words[cleaned] = True

    return list(unique_words.keys())


# ---------------------------------------------------------------------------
# 3. Categorization & Segmentation
# ---------------------------------------------------------------------------
def process_and_sort_words(words: List[str]) -> Tuple[
    Dict[str, List[Dict[str, Any]]],
    Dict[str, List[Dict[str, Any]]],
    Dict[str, List[Dict[str, Any]]],
    Dict[str, List[Dict[str, Any]]]
]:
    """
    Sorts clean unique Bengali words into four distinct category structures:
    - Level 1: Standalone vowels and consonants ONLY (strictly NO kars, NO phalas, NO hasant).
    - Level 2: Grouped by letter-kar combination key with balanced coverage.
    - Level 3: Grouped by phala forms (্য, ্র, ্ল, ্ব, ্ম, ্ন, র্).
    - Level 4: Grouped by conjunct consonants joined by hasant/virama (্).
    """
    level_1_allowed = set(STANDALONE_VOWELS) | set(ALL_CONSONANTS)
    has_kar_set = set(ALL_KARS)

    # 1. Level 1: Alphabets (Strictly standalone letters, no kars, no virama/hasant, no modifiers)
    # Initialize all 50 letters in canonical order
    canonical_letters = STANDALONE_VOWELS + ALL_CONSONANTS
    level_1_data: Dict[str, List[Dict[str, Any]]] = {letter: [] for letter in canonical_letters}

    # 2. Level 2: Kars (Pre-initialize all 350+ Consonant x Kar combination keys)
    kar_combinations: List[str] = [
        unicodedata.normalize('NFC', f"{c}{k}")
        for c in ALL_CONSONANTS
        for k in ALL_KARS
    ]
    level_2_data: Dict[str, List[Dict[str, Any]]] = {comb: [] for comb in kar_combinations}

    # 3. Level 3: Phalas (Grouped by phala forms)
    level_3_data: Dict[str, List[Dict[str, Any]]] = {
        '্য': [], '্র': [], '্ল': [], '্ব': [], '্ম': [], '্ন': [], 'র্': []
    }

    # 4. Level 4: Juktakkhor (Grouped by conjunct consonants)
    level_4_data: Dict[str, List[Dict[str, Any]]] = {}

    # Track seen words per key to ensure clean entries
    seen_in_l1: Dict[str, Set[str]] = {k: set() for k in level_1_data}
    seen_in_l2: Dict[str, Set[str]] = {k: set() for k in level_2_data}
    seen_in_l3: Dict[str, Set[str]] = {k: set() for k in level_3_data}
    seen_in_l4: Dict[str, Set[str]] = {}

    for word in words:
        b_array = get_breakdown(word)
        entry = {"w": word, "b": b_array}

        has_virama = '\u09CD' in word
        has_kar = any(k in word for k in has_kar_set)

        # -------------------------------------------------------------------
        # Check Level 1: Simple Alphabet Words
        # Strictly formed ONLY with standalone vowels and consonants
        # (NO kars, NO phalas, NO hasant/virama).
        # -------------------------------------------------------------------
        if not has_virama and not has_kar:
            if all(ch in level_1_allowed for ch in word):
                first_letter = word[0]
                if first_letter in level_1_data and len(level_1_data[first_letter]) < MAX_WORDS_PER_KEY:
                    if word not in seen_in_l1[first_letter]:
                        level_1_data[first_letter].append(entry)
                        seen_in_l1[first_letter].add(word)

        # -------------------------------------------------------------------
        # Check Level 3: Phalas
        # Words containing phala forms (্য, ্র, ্ল, ্ব, etc.)
        # -------------------------------------------------------------------
        if has_virama:
            for phala_key, pattern in PHALA_PATTERNS.items():
                if pattern.search(word):
                    if len(level_3_data[phala_key]) < MAX_WORDS_PER_KEY:
                        if word not in seen_in_l3[phala_key]:
                            level_3_data[phala_key].append(entry)
                            seen_in_l3[phala_key].add(word)

        # -------------------------------------------------------------------
        # Check Level 4: Juktakkhor
        # Words containing conjunct consonants joined by hasant/virama (্)
        # -------------------------------------------------------------------
        if has_virama:
            conjuncts = JUKTAKKHOR_PATTERN.findall(word)
            for conj in conjuncts:
                norm_conj = unicodedata.normalize('NFC', conj)
                if norm_conj not in level_4_data:
                    level_4_data[norm_conj] = []
                    seen_in_l4[norm_conj] = set()

                if len(level_4_data[norm_conj]) < MAX_WORDS_PER_KEY:
                    if word not in seen_in_l4[norm_conj]:
                        level_4_data[norm_conj].append(entry)
                        seen_in_l4[norm_conj].add(word)

        # -------------------------------------------------------------------
        # Check Level 2: Kars
        # Group words by their letter-kar combination key.
        # Prefer direct prefix matches (e.g. 'খোকা' -> 'খো')
        # -------------------------------------------------------------------
        if has_kar:
            # Detect primary starting combination: Consonant + (optional Nukta/Chandrabindu) + Kar
            primary_match = re.match(r'^([\u0995-\u09B9\u09DC-\u09DF])\u09BC?(?:\u0981)?([\u09BE-\u09CC])', word)
            if primary_match:
                c, k = primary_match.group(1), primary_match.group(2)
                key = unicodedata.normalize('NFC', f"{c}{k}")
                if key in level_2_data and len(level_2_data[key]) < MAX_WORDS_PER_KEY:
                    if word not in seen_in_l2[key]:
                        level_2_data[key].append(entry)
                        seen_in_l2[key].add(word)

    # Secondary Pass for Level 2:
    # Ensure balanced coverage across all combinations.
    # For any combination key with fewer than 20 entries, populate from words containing the combination anywhere.
    for word in words:
        if not any(k in word for k in has_kar_set):
            continue
        entry = {"w": word, "b": get_breakdown(word)}

        for comb in kar_combinations:
            if len(level_2_data[comb]) >= 30:  # Sufficient coverage already reached
                continue
            if comb in word and word not in seen_in_l2[comb]:
                level_2_data[comb].append(entry)
                seen_in_l2[comb].add(word)
                if len(level_2_data[comb]) >= MAX_WORDS_PER_KEY:
                    break

    # Clean up empty keys for juktakkhor to keep JSON lightweight
    level_4_clean = {k: v for k, v in level_4_data.items() if len(v) > 0}

    return level_1_data, level_2_data, level_3_data, level_4_clean


# ---------------------------------------------------------------------------
# 4. Clean Overwrite & Export
# ---------------------------------------------------------------------------
def save_json_file(filename: str, data: Any) -> None:
    """
    Saves JSON data with ensure_ascii=False, UTF-8 encoding, and clean indentation.
    """
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[*] Successfully saved: {filename} ({len(data)} keys)")


def main():
    input_path = sys.argv[1] if len(sys.argv) > 1 else 'BengaliWordList_439.txt'

    print(f"=== Bengali Multi-Level Word Sorter ===")
    print(f"[*] Input File: {input_path}")

    if not os.path.exists(input_path):
        print(f"[!] Warning: File '{input_path}' not found in current directory.")
        print(f"[*] Usage: python3 sorter.py [path_to_BengaliWordList_439.txt]")
        sys.exit(1)

    print(f"[*] Reading and cleaning words from '{input_path}'...")
    clean_words = load_clean_wordlist(input_path)
    print(f"[*] Total unique clean words extracted: {len(clean_words)}")

    print(f"[*] Segmenting words into curriculum levels (capped at {MAX_WORDS_PER_KEY} words per key)...")
    l1, l2, l3, l4 = process_and_sort_words(clean_words)

    save_json_file('level_1_alphabets.json', l1)
    save_json_file('level_2_kars.json', l2)
    save_json_file('level_3_phalas.json', l3)
    save_json_file('level_4_juktakkhor.json', l4)

    print(f"=== Processing Complete ===")


if __name__ == '__main__':
    main()
