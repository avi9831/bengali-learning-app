// Data Models for Offline Bengali Learning Curriculum
// Strictly typed, supporting exact letter-sign binding and 30-Day Multi-Day Curriculum

export interface ExactWordExample {
  word: string;
  icon: string;
  meaning?: string;
  ttsAudio: string;
  breakdown?: string[];
}

export interface LetterItem {
  char: string;
  word: string;
  icon: string;
  tts: string;
  breakdown?: string[];
  more?: Array<{ word: string; icon: string; tts?: string; breakdown?: string[] }>;
}

export interface KarSignItem {
  id: string;
  sign: string;
  name: string;
  vowelOrigin: string;
  sampleConsonant: string;
}

export interface PhalaSignItem {
  id: string;
  name: string;
  sign: string;
  baseFormula: string;
  consonantOptions: string[];
}

export interface JuktakkhorCombination {
  id: string;
  first: string;
  second: string;
  third?: string;
  combined: string;
  formulaAudio: string;
}

// 5-7 Mandatory Sub-lessons per Level (Infinite Sub-Level Architecture)
export interface QuizOptionItem {
  id: string;
  displayText: string;
  iconSymbol: string;
  isCorrect: boolean;
}

export interface SubLessonQuiz {
  audioPrompt: string;
  options: QuizOptionItem[];
}

export interface SubLessonItem {
  id: string; // e.g. "lvl-1-sub-1" or "day-1-sub-1"
  levelId?: number; // 1 to 20
  dayNumber?: number; // 1 to 30 (for 30-day mode compatibility)
  subIndex: number; // 1 to 7
  subNumber: string; // "পাঠ ১.১", "পাঠ ১.২", etc.
  title: string; // Bengali title
  summary: string; // Bengali short description
  type: 'learn' | 'practice' | 'recognition' | 'quiz' | 'mastery';
  targetMinutes: number; // e.g. 4 minutes
  isCompleted: boolean;
  isLocked: boolean;
  focusKeys: string[]; // Specific letters or words for this sub-lesson
  instructionAudio: string; // Bengali spoken instruction
  icon: string; // Emoji
  words?: ExactWordExample[]; // Dedicated words for this sub-level
  quiz?: SubLessonQuiz;
}

// 20-Level Comprehensive Long-term Curriculum Item
export interface LevelCurriculumItem {
  id: number; // 1 to 20
  bengaliNum: string; // "১" to "২০"
  title: string; // e.g. "স্বরবর্ণ", "ব্যঞ্জনবর্ণ (ক ও চ বর্গ)", etc.
  subtitle: string;
  category: 'alphabet' | 'kar' | 'phala' | 'juktakkhor' | 'compound' | 'sentences' | 'paragraphs' | 'stories' | 'advanced';
  icon: string;
  color: string;
  description: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  subLessons: SubLessonItem[];
  sampleWords: ExactWordExample[];
}

// Multi-day curriculum item (30-Day Curriculum, 20 minutes/day)
export interface DayCurriculumItem {
  dayNumber: number; // 1 to 30
  bengaliDay: string; // "দিন ১", "দিন ২", ...
  title: string; // Bengali title
  subtitle: string; // Bengali short subtitle
  icon: string; // Universal visual emoji/icon
  targetMinutes: number; // Always 20
  completedMinutes: number; // 0 to 20
  isUnlocked: boolean;
  isCompleted: boolean;
  mappedLevelId: number; // Corresponding Level 1 to 20
  focusKeys: string[]; // Specific characters / syllables studied this day
  summary: string;
  subLessons: SubLessonItem[]; // Sub-lessons for this day
}

export interface UserCurriculumProgress {
  highestUnlockedLevel: number; // 1 to 20
  highestUnlockedDay: number; // 1 to 30
  currentDay: number;
  dailyMinutes: Record<number, number>; // dayNumber -> minutes spent (0-20)
  completedDays: number[]; // Array of completed day numbers
  completedSubLessons: Record<string, boolean>; // subLessonId -> boolean
  highestUnlockedSubLesson: Record<number, number>; // levelId -> subIndex
}

