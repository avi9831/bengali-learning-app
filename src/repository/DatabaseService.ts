/**
 * DatabaseService.ts
 * High-Speed O(1) Pre-Indexed Local Database Service with Lazy Dynamic Imports.
 * Strictly avoids loading the entire 2.1MB dictionary globally on boot.
 * Dynamically imports category chunks on-demand when the user clicks a specific level.
 */

export interface IndexedWord {
  w: string;
  m: string;
  b: string[];
}

export type DictCategory = 'alphabets' | 'kars' | 'phalas' | 'juktakkhor';

// Lightweight instant cache for common essential words before dynamic chunk resolves
const IMMEDIATE_WORD_CACHE: Record<string, { m: string; b: string[] }> = {
  'অজগর': { m: '১ বড় নির্বিষ সাপ।', b: ['অ', 'জ', 'গ', 'র'] },
  'আম': { m: '১ সুস্বাদু মিষ্টি গ্রীষ্মকালীন ফল।', b: ['আ', 'ম'] },
  'ইঁদুর': { m: '১ ছোট কৃন্তক স্তন্যপায়ী প্রাণী।', b: ['ই', 'ঁ', 'দ', 'ু', 'র'] },
  'ঈগল': { m: '১ তীক্ষ্ণদৃষ্টি শিকারি পাখি।', b: ['ঈ', 'গ', 'ল'] },
  'উট': { m: '১ মরুভূমির কুঁজওয়ালা প্রাণী।', b: ['উ', 'ট'] },
  'ঋষি': { m: '১ তপস্বী মুনি বা সাধক।', b: ['ঋ', 'ষ', 'ি'] },
  'একতারা': { m: '১ এক তারের বাদ্যযন্ত্র।', b: ['এ', 'ক', 'ত', 'া', 'র', 'া'] },
  'ঐরাবত': { m: '১ দেবরাজ ইন্দ্রের শ্বেত হস্তী।', b: ['ঐ', 'র', 'া', 'ব', 'ত'] },
  'ওল': { m: '১ সুস্বাদু পুষ্টিকর কন্দজাতীয় সবজি।', b: ['ও', 'ল'] },
  'ঔষধ': { m: '১ রোগ নিরাময়ের ভেষজ বা ওষুধ।', b: ['ঔ', 'ষ', 'ধ'] },
  'কাক': { m: '১ কালো রঙের চতুর পাখি।', b: ['ক', 'া', 'ক'] },
  'কলসি': { m: '১ জল রাখার মাটির পাত্র।', b: ['ক', 'ল', 'স', 'ি'] },
  'তৃষ্ণার্ত': { m: '১ জলপিপাসায় কাতর বা পিপাসার্ত।', b: ['ত', 'ৃ', 'ষ', '্', 'ণ', 'া', 'র', '্', 'ত'] },
  'খরগোশ': { m: '১ দ্রুতগামী চঞ্চল রোমশ স্তন্যপায়ী প্রাণী।', b: ['খ', 'র', 'গ', 'ো', 'শ'] },
  'কচ্ছপ': { m: '১ শক্ত খোলসযুক্ত ধীরগতির প্রাণী।', b: ['ক', 'চ', '্', 'ছ', 'প'] },
  'গরু': { m: '১ উপকারী গৃহপালিত চতুষ্পদ প্রাণী।', b: ['গ', 'র', 'ু'] },
  'গাছ': { m: '১ বৃক্ষ বা তরু যা ছায়া ও ফল দেয়।', b: ['গ', 'া', 'ছ'] },
  'ঘড়ি': { m: '১ সময় দেখার যন্ত্র।', b: ['ঘ', 'ড়', 'ি'] },
  'চাঁদ': { m: '১ পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ।', b: ['চ', 'া', 'ঁ', 'দ'] },
  'ছাতা': { m: '১ রোদ ও বৃষ্টি থেকে রক্ষার আচ্ছাদন।', b: ['ছ', 'া', 'ত', 'া'] },
  'জাহাজ': { m: '১ জলে চলাচলকারী বৃহৎ জলযান।', b: ['জ', 'া', 'হ', 'া', 'জ'] },
  'ঝুড়ি': { m: '১ ফল বা জিনিসপত্র রাখার বাঁশের পাত্র।', b: ['ঝ', 'ু', 'ড়', 'ি'] },
  'তোতা': { m: '১ সবুজ রঙের মিষ্টি বুলি বলা সুন্দর গৃহপালিত পাখিবিশেষ, টিয়া।', b: ['ত', 'ো', 'ত', 'া'] },
  'তোরণ': { m: '১ প্রধান প্রবেশদ্বার, সুরম্য ফটক, বিজয়দ্বার।', b: ['ত', 'ো', 'র', 'ণ'] },
  'তোষক': { m: '১ কার্পাস তুলোভরা নরম আরামদায়ক বিছানা, জাজিম।', b: ['ত', 'ো', 'ষ', 'ক'] },
  'তোপ': { m: '১ কামান দেগে সম্মান প্রদর্শন বা আওয়াজ করা, কামান দাগা।', b: ['ত', 'ো', 'প'] },
  'তোফা': { m: '১ উপঢৌকন, চমৎকার উপহার বা ভেট। ২ চমৎকার বা অতি উত্তম।', b: ['ত', 'ো', 'ফ', 'া'] },
  'তোষামোদ': { m: '১ স্তাবকতা, চাটুকারিতা, মন জুগিয়ে কথা বলা।', b: ['ত', 'ো', 'ষ', 'া', 'ম', 'ো', 'দ'] },
};

export class DatabaseService {
  private static instance: DatabaseService;
  private categoryData: Partial<Record<DictCategory, Record<string, IndexedWord[]>>> = {};
  private wordLookupMap: Map<string, IndexedWord> = new Map();
  private categoryPromises: Map<DictCategory, Promise<void>> = new Map();
  private loadedCategories: Set<DictCategory> = new Set();
  private fullLoadPromise: Promise<void> | null = null;

  private constructor() {
    // Populate immediate cache first for instant synchronous zero-latency lookups
    for (const [w, entry] of Object.entries(IMMEDIATE_WORD_CACHE)) {
      this.wordLookupMap.set(w, { w, m: entry.m, b: entry.b });
    }
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Granular Dynamic Importer:
   * Only loads the specific category data chunk into memory when needed.
   * e.g. clicking Kar levels loads only dict_kars.json (~600KB) instead of the whole 2.1MB DB.
   */
  public async loadCategory(category: DictCategory): Promise<void> {
    if (this.loadedCategories.has(category)) return;

    const existingPromise = this.categoryPromises.get(category);
    if (existingPromise) return existingPromise;

    const promise = (async () => {
      try {
        let chunk: Record<string, IndexedWord[]> = {};
        if (category === 'alphabets') {
          const mod = await import('./data/dict_alphabets.json');
          chunk = (mod.default || mod) as Record<string, IndexedWord[]>;
        } else if (category === 'kars') {
          const mod = await import('./data/dict_kars.json');
          chunk = (mod.default || mod) as Record<string, IndexedWord[]>;
        } else if (category === 'phalas') {
          const mod = await import('./data/dict_phalas.json');
          chunk = (mod.default || mod) as Record<string, IndexedWord[]>;
        } else if (category === 'juktakkhor') {
          const mod = await import('./data/dict_juktakkhor.json');
          chunk = (mod.default || mod) as Record<string, IndexedWord[]>;
        }

        this.categoryData[category] = chunk;
        for (const key of Object.keys(chunk)) {
          const list = chunk[key];
          if (Array.isArray(list)) {
            for (const item of list) {
              if (item && item.w) {
                this.wordLookupMap.set(item.w, item);
              }
            }
          }
        }
        this.loadedCategories.add(category);
      } catch (err) {
        console.warn(`Failed to dynamically load ${category} dictionary chunk:`, err);
      }
    })();

    this.categoryPromises.set(category, promise);
    return promise;
  }

  /**
   * On-Demand Loader triggered when the user taps on any level (1..20).
   * Maps each level exactly to its required dictionary slice.
   */
  public async loadLevelData(levelId: number): Promise<void> {
    if (levelId === 1) {
      await this.loadCategory('alphabets');
    } else if (levelId === 2) {
      await Promise.all([this.loadCategory('kars'), this.loadCategory('alphabets')]);
    } else if (levelId >= 3 && levelId <= 5) {
      await this.loadCategory('kars');
    } else if (levelId >= 6 && levelId <= 7) {
      await this.loadCategory('phalas');
    } else if (levelId >= 8 && levelId <= 15) {
      await this.loadCategory('juktakkhor');
    }
  }

  /**
   * Lazy Dynamic Importer for all categories in background.
   */
  public async ensureLoaded(): Promise<void> {
    if (this.loadedCategories.size === 4) return;
    if (this.fullLoadPromise) return this.fullLoadPromise;

    this.fullLoadPromise = (async () => {
      await Promise.all([
        this.loadCategory('alphabets'),
        this.loadCategory('kars'),
        this.loadCategory('phalas'),
        this.loadCategory('juktakkhor'),
      ]);
    })();

    return this.fullLoadPromise;
  }

  public isCategoryLoaded(category: DictCategory): boolean {
    return this.loadedCategories.has(category);
  }

  /**
   * Asynchronously loads a specific category and returns word examples.
   */
  public async getExamplesForAsync(category: DictCategory, key: string): Promise<IndexedWord[]> {
    await this.loadCategory(category);
    return this.categoryData[category]?.[key] || [];
  }

  /**
   * Synchronous accessor for fast render paths.
   * Immediately triggers lazy loading of the requested category in the background if not yet loaded.
   */
  public getExamplesFor(category: DictCategory, key: string): IndexedWord[] {
    const list = this.categoryData[category]?.[key];
    if (!list) {
      this.loadCategory(category);
      return [];
    }
    return list;
  }

  /**
   * Asynchronous meaning lookup with guaranteed dictionary resolution.
   */
  public async getMeaningAsync(word: string): Promise<string | undefined> {
    if (!word) return undefined;
    const clean = word.trim().replace(/[।,!?]/g, '');
    const found = this.wordLookupMap.get(clean)?.m;
    if (found) return found;

    await this.ensureLoaded();
    return this.wordLookupMap.get(clean)?.m;
  }

  /**
   * Synchronous meaning lookup for instant UI binding.
   */
  public getMeaning(word: string): string | undefined {
    if (!word) return undefined;
    const clean = word.trim().replace(/[।,!?]/g, '');
    const found = this.wordLookupMap.get(clean)?.m;
    if (!found) {
      // Lazy background trigger
      this.ensureLoaded();
    }
    return found;
  }

  /**
   * Visual breakdown lookup.
   */
  public getBreakdown(word: string): string[] {
    if (!word) return [];
    const clean = word.trim().replace(/[।,!?]/g, '');
    const entry = this.wordLookupMap.get(clean);
    if (!entry) {
      this.ensureLoaded();
    }
    return entry?.b || clean.split('');
  }
}

export const databaseService = DatabaseService.getInstance();
