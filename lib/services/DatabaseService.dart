import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

/// ---------------------------------------------------------------------------
/// Word Model
/// Represents an authentic Bangla Academy dictionary entry with:
/// - [word]: Headword (ভুক্তিশব্দ) e.g. "অকথা", "আকাশ"
/// - [meaning]: Full Bengali definition with numbered list (১, ২, ৩...)
/// - [breakdown]: Visual phonetic breakdown array e.g. ["অ", "ক", "থ", "া"]
/// ---------------------------------------------------------------------------
class Word {
  final String word;
  final String meaning;
  final List<String> breakdown;

  const Word({
    required this.word,
    required this.meaning,
    required this.breakdown,
  });

  factory Word.fromJson(Map<String, dynamic> json) {
    return Word(
      word: (json['w'] ?? json['word'] ?? '') as String,
      meaning: (json['m'] ?? json['meaning'] ?? '') as String,
      breakdown: (json['b'] ?? json['breakdown'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() => {
        'w': word,
        'm': meaning,
        'b': breakdown,
      };

  @override
  String toString() => 'Word(word: $word, meaning: $meaning, breakdown: $breakdown)';
}

/// ---------------------------------------------------------------------------
/// DatabaseService
/// High-Speed O(1) Pre-Indexed Local Database Service for Flutter.
/// Loads `assets/dictionary_indexed.json` entirely into memory on app startup.
///
/// Categories:
/// - 'alphabets'  : 'অ', 'আ', 'ক', 'খ', ...
/// - 'kars'       : 'কা', 'কি', 'কী', 'কু', ...
/// - 'phalas'     : '্য', '্র', '্ব', '্ম', '্ন', '্ল', 'র্'
/// - 'juktakkhor' : 'ক্ষ', 'জ্ঞ', 'ষ্ণ', 'ঙ্ক', ...
/// ---------------------------------------------------------------------------
class DatabaseService {
  // Singleton pattern for zero-latency globally shared memory cache
  static final DatabaseService _instance = DatabaseService._internal();
  factory DatabaseService() => _instance;
  DatabaseService._internal();

  // Internal O(1) indexed storage: Category -> (Key -> List<Word>)
  final Map<String, Map<String, List<Word>>> _indexedDb = {
    'alphabets': {},
    'kars': {},
    'phalas': {},
    'juktakkhor': {},
  };

  // Direct word lookup map: word -> Word
  final Map<String, Word> _wordLookupMap = {};

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  /// Loads `assets/dictionary_indexed.json` into memory on app launch.
  /// Call this once in `main()` or splash screen:
  /// ```dart
  /// await DatabaseService().init();
  /// ```
  Future<void> init({String assetPath = 'assets/dictionary_indexed.json'}) async {
    if (_isInitialized) return;

    try {
      final jsonString = await rootBundle.loadString(assetPath);
      final dynamic decoded = jsonDecode(jsonString);

      if (decoded is Map<String, dynamic>) {
        for (final category in ['alphabets', 'kars', 'phalas', 'juktakkhor']) {
          if (decoded.containsKey(category) && decoded[category] is Map) {
            final categoryMap = decoded[category] as Map<String, dynamic>;
            final targetBucket = <String, List<Word>>{};

            categoryMap.forEach((key, listRaw) {
              if (listRaw is List) {
                final wordsList = listRaw
                    .map((item) => Word.fromJson(item as Map<String, dynamic>))
                    .toList(growable: false);
                targetBucket[key] = wordsList;

                // Also index in fast direct word lookup map
                for (final w in wordsList) {
                  _wordLookupMap[w.word] = w;
                }
              }
            });

            _indexedDb[category] = targetBucket;
          }
        }
      }

      _isInitialized = true;
      // ignore: avoid_print
      print('[DatabaseService] Successfully loaded dictionary with ${_wordLookupMap.length} unique words.');
    } catch (e) {
      // ignore: avoid_print
      print('[DatabaseService] Error loading local dictionary database: $e');
    }
  }

  /// O(1) Instant Fetching Engine.
  /// Example:
  /// `DatabaseService().getExamplesFor('kars', 'কা')`
  /// `DatabaseService().getExamplesFor('alphabets', 'অ')`
  /// `DatabaseService().getExamplesFor('juktakkhor', 'ক্ষ')`
  List<Word> getExamplesFor(String category, String key) {
    final bucket = _indexedDb[category];
    if (bucket != null && bucket.containsKey(key)) {
      return bucket[key]!;
    }
    return const [];
  }

  /// O(1) Instant Meaning Lookup for "মানে" (Meaning) button.
  Word? getWord(String word) {
    return _wordLookupMap[word];
  }

  /// O(1) Meaning text lookup.
  String getMeaning(String word, {String defaultMeaning = 'বাংলা একাডেমি প্রমিত অর্থ প্রস্তুত হচ্ছে।'}) {
    final entry = _wordLookupMap[word];
    if (entry != null && entry.meaning.isNotEmpty) {
      return entry.meaning;
    }
    return defaultMeaning;
  }

  /// O(1) Visual breakdown array lookup for Visual Learning Engine.
  List<String> getBreakdown(String word) {
    final entry = _wordLookupMap[word];
    if (entry != null && entry.breakdown.isNotEmpty) {
      return entry.breakdown;
    }
    // Fallback: split graphemes
    return word.split('');
  }

  /// Returns total words count currently indexed in memory.
  int get totalWordsCount => _wordLookupMap.length;
}
