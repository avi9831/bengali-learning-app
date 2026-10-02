// lib/screens/level1_screen.dart
// Ultra-simple visual alphabet screen: Swaroborno & Byanjonborno with giant cards and native TTS

export const FLUTTER_LEVEL1_SCREEN = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class Level1Screen extends StatefulWidget {
  const Level1Screen({super.key});

  @override
  State<Level1Screen> createState() => _Level1ScreenState();
}

class _Level1ScreenState extends State<Level1Screen> {
  final TtsService _tts = TtsService();
  int _tabIndex = 0; // 0 = স্বরবর্ণ, 1 = ব্যঞ্জনবর্ণ
  int _selectedIdx = 0;

  static const List<Map<String, dynamic>> _vowels = [
    {'char': 'অ', 'word': 'অজগর', 'icon': '🐍', 'tts': 'অ। অজগর।'},
    {'char': 'আ', 'word': 'আম', 'icon': '🥭', 'tts': 'আ। আম।'},
    {'char': 'ই', 'word': 'ইঁদুর', 'icon': '🐁', 'tts': 'হ্রস্ব ই। ইঁদুর।'},
    {'char': 'ঈ', 'word': 'ঈগল', 'icon': '🦅', 'tts': 'দীর্ঘ ঈ। ঈগল।'},
    {'char': 'উ', 'word': 'উট', 'icon': '🐪', 'tts': 'হ্রস্ব উ। উট।'},
    {'char': 'ঊ', 'word': 'ঊষা', 'icon': '🌅', 'tts': 'দীর্ঘ ঊ। ঊষা।'},
    {'char': 'ঋ', 'word': 'ঋষি', 'icon': '🧘', 'tts': 'ঋ। ঋষি।'},
    {'char': 'এ', 'word': 'একতারা', 'icon': '🪕', 'tts': 'এ। একতারা।'},
    {'char': 'ঐ', 'word': 'ঐরাবত', 'icon': '🐘', 'tts': 'ঐ। ঐরাবত।'},
    {'char': 'ও', 'word': 'ওল', 'icon': '🥔', 'tts': 'ও। ওল।'},
    {'char': 'ঔ', 'word': 'ঔষধ', 'icon': '💊', 'tts': 'ঔ। ঔষধ।'},
  ];

  static const List<Map<String, dynamic>> _consonants = [
    {'char': 'ক', 'word': 'কাক', 'icon': '🦅', 'tts': 'ক। কাক।'},
    {'char': 'খ', 'word': 'খরগোশ', 'icon': '🐇', 'tts': 'খ। খরগোশ।'},
    {'char': 'গ', 'word': 'গরু', 'icon': '🐄', 'tts': 'গ। গরু।'},
    {'char': 'ঘ', 'word': 'ঘড়ি', 'icon': '⏰', 'tts': 'ঘ। ঘড়ি।'},
    {'char': 'ঙ', 'word': 'ব্যাঙ', 'icon': '🐸', 'tts': 'ঙ। ব্যাঙ।'},
    {'char': 'চ', 'word': 'চাঁদ', 'icon': '🌙', 'tts': 'চ। চাঁদ।'},
    {'char': 'ছ', 'word': 'ছাতা', 'icon': '☂️', 'tts': 'ছ। ছাতা।'},
    {'char': 'জ', 'word': 'জাহাজ', 'icon': '🚢', 'tts': 'জ। জাহাজ।'},
    {'char': 'ঝ', 'word': 'ঝুড়ি', 'icon': '🧺', 'tts': 'ঝ। ঝুড়ি।'},
    {'char': 'ঞ', 'word': 'মিঞা', 'icon': '🐱', 'tts': 'ঞ। মিঞা।'},
    {'char': 'ট', 'word': 'টিয়া', 'icon': '🦜', 'tts': 'ট। টিয়া।'},
    {'char': 'ঠ', 'word': 'ঠাকুরদা', 'icon': '👴', 'tts': 'ঠ। ঠাকুরদা।'},
    {'char': 'ড', 'word': 'ডালিম', 'icon': '🍎', 'tts': 'ড। ডালিম।'},
    {'char': 'ঢ', 'word': 'ঢাক', 'icon': '🥁', 'tts': 'ঢ। ঢাক।'},
    {'char': 'ণ', 'word': 'হরিণ', 'icon': '🦌', 'tts': 'মূর্ধন্য ণ। হরিণ।'},
    {'char': 'ত', 'word': 'তরমুজ', 'icon': '🍉', 'tts': 'ত। তরমুজ।'},
    {'char': 'থ', 'word': 'থালা', 'icon': '🍽️', 'tts': 'থ। থালা।'},
    {'char': 'দ', 'word': 'দোয়েল', 'icon': '🐦', 'tts': 'দ। দোয়েল পাখি।'},
    {'char': 'ধ', 'word': 'ধান', 'icon': '🌾', 'tts': 'ধ। ধান।'},
    {'char': 'ন', 'word': 'নৌকা', 'icon': '⛵', 'tts': 'দন্ত্য ন। নৌকা।'},
    {'char': 'প', 'word': 'পাখি', 'icon': '🐦', 'tts': 'প। পাখি।'},
    {'char': 'ফ', 'word': 'ফুল', 'icon': '🌸', 'tts': 'ফ। ফুল।'},
    {'char': 'ব', 'word': 'বই', 'icon': '📖', 'tts': 'ব। বই।'},
    {'char': 'ভ', 'word': 'ভালুক', 'icon': '🐻', 'tts': 'ভ। ভালুক।'},
    {'char': 'ম', 'word': 'মাছ', 'icon': '🐟', 'tts': 'ম। মাছ।'},
    {'char': 'য', 'word': 'যাঁতা', 'icon': '⚙️', 'tts': 'অন্তঃস্থ য। যাঁতা।'},
    {'char': 'র', 'word': 'রথ', 'icon': '🛞', 'tts': 'ব-শূন্য র। রথ।'},
    {'char': 'ল', 'word': 'লাটিম', 'icon': '🪀', 'tts': 'ল। লাটিম।'},
    {'char': 'শ', 'word': 'শাপলা', 'icon': '🌺', 'tts': 'তালব্য শ। শাপলা।'},
    {'char': 'ষ', 'word': 'ষাঁড়', 'icon': '🐂', 'tts': 'মূর্ধন্য ষ। ষাঁড়।'},
    {'char': 'স', 'word': 'সিংহ', 'icon': '🦁', 'tts': 'দন্ত্য স। সিংহ।'},
    {'char': 'হ', 'word': 'হাতি', 'icon': '🐘', 'tts': 'হ। হাতি।'},
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final list = _tabIndex == 0 ? _vowels : _consonants;
    final item = list[_selectedIdx];
    _tts.speak(item['tts'], context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(2);
    _tts.speak("অভিনন্দন! আপনি ধাপ ১ সম্পন্ন করেছেন। ধাপ ২ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final list = _tabIndex == 0 ? _vowels : _consonants;
    final current = list[_selectedIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "ধাপ ১: বর্ণমালা",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF34D399)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Tabs: স্বরবর্ণ vs ব্যঞ্জনবর্ণ
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          _tabIndex = 0;
                          _selectedIdx = 0;
                        });
                        _playCurrent();
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        decoration: BoxDecoration(
                          color: _tabIndex == 0 ? const Color(0xFF059669) : const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        alignment: Alignment.center,
                        child: const Text(
                          "স্বরবর্ণ (১১)",
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          _tabIndex = 1;
                          _selectedIdx = 0;
                        });
                        _playCurrent();
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        decoration: BoxDecoration(
                          color: _tabIndex == 1 ? const Color(0xFF059669) : const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        alignment: Alignment.center,
                        child: const Text(
                          "ব্যঞ্জনবর্ণ (৩৯)",
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Giant Selected Letter & Example Card
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: GestureDetector(
                  onTap: _playCurrent,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: const Color(0xFF059669), width: 3),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Giant Letter
                        Text(
                          current['char'],
                          style: const TextStyle(
                            fontSize: 110,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF34D399),
                            height: 1.1,
                          ),
                        ),
                        const SizedBox(height: 12),
                        // Big Visual Icon & Word
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              current['icon'],
                              style: const TextStyle(fontSize: 54),
                            ),
                            const SizedBox(width: 14),
                            Text(
                              current['word'],
                              style: const TextStyle(
                                fontSize: 40,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        // Giant Speaker Icon
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: const BoxDecoration(
                            color: Color(0xFF059669),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.volume_up_rounded, size: 40, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

            // Letter Selection Grid
            Expanded(
              flex: 3,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 5,
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 10,
                    childAspectRatio: 1.0,
                  ),
                  itemCount: list.length,
                  itemBuilder: (context, idx) {
                    final item = list[idx];
                    final isSel = idx == _selectedIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _selectedIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF059669) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: isSel ? Colors.white : Colors.transparent,
                            width: 2,
                          ),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          item['char'],
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: isSel ? Colors.white : Colors.white70,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF059669),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text(
                  "পরবর্তী ধাপ (ধাপ ২ খুলুন)",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL2_SCREEN = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class Level2Screen extends StatefulWidget {
  const Level2Screen({super.key});

  @override
  State<Level2Screen> createState() => _Level2ScreenState();
}

class _Level2ScreenState extends State<Level2Screen> {
  final TtsService _tts = TtsService();
  int _karIdx = 0;
  String _baseConsonant = 'ক';

  static const List<Map<String, dynamic>> _karList = [
    {'sign': 'া', 'name': 'আ-কার', 'sampleWord': 'কাক', 'icon': '🦅', 'tts': 'ক যোগ আ-কার সমান কা। কা-তে কাক।'},
    {'sign': 'ি', 'name': 'ই-কার', 'sampleWord': 'ডিম', 'icon': '🥚', 'tts': 'ড যোগ ই-কার সমান ডি। ডিমে ডিম।'},
    {'sign': 'ী', 'name': 'ঈ-কার', 'sampleWord': 'নদী', 'icon': '🌊', 'tts': 'ন যোগ দীর্ঘ ঈ-কার সমান নদী।'},
    {'sign': 'ু', 'name': 'উ-কার', 'sampleWord': 'ফুল', 'icon': '🌸', 'tts': 'ফ যোগ উ-কার সমান ফু। ফুলে ফুল।'},
    {'sign': 'ূ', 'name': 'ঊ-কার', 'sampleWord': 'সূর্য', 'icon': '☀️', 'tts': 'স যোগ দীর্ঘ ঊ-কার সমান সূ। সূর্য।'},
    {'sign': 'ৃ', 'name': 'ঋ-কার', 'sampleWord': 'গৃহ', 'icon': '🏡', 'tts': 'গ যোগ ঋ-কার সমান গৃহ।'},
    {'sign': 'ে', 'name': 'এ-কার', 'sampleWord': 'মেঘ', 'icon': '☁️', 'tts': 'ম যোগ এ-কার সমান মেঘ।'},
    {'sign': 'ৈ', 'name': 'ঐ-কার', 'sampleWord': 'সৈকত', 'icon': '🏖️', 'tts': 'স যোগ ঐ-কার সমান সৈ। সৈকত।'},
    {'sign': 'ো', 'name': 'ও-কার', 'sampleWord': 'গোল', 'icon': '⚽', 'tts': 'গ যোগ ও-কার সমান গো। গোল।'},
    {'sign': 'ৌ', 'name': 'ঔ-কার', 'sampleWord': 'নৌকা', 'icon': '⛵', 'tts': 'ন যোগ ঔ-কার সমান নৌ। নৌকা।'},
  ];

  static const List<String> _consonantOptions = ['ক', 'খ', 'গ', 'চ', 'ত', 'দ', 'ন', 'প', 'ম', 'র', 'ল', 'স'];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final kar = _karList[_karIdx];
    _tts.speak("\$_baseConsonant যোগ \${kar['name']} সমান \$_baseConsonant\${kar['sign']}। \${kar['sampleWord']}।", context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(3);
    _tts.speak("দারুণ! আপনি ধাপ ২ সম্পন্ন করেছেন। ধাপ ৩ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final kar = _karList[_karIdx];
    final String combinedResult = '\$_baseConsonant\${kar['sign']}';

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "ধাপ ২: কার চিহ্ন",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF818CF8)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Giant Formula Visual Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: GestureDetector(
                onTap: _playCurrent,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF312E81), Color(0xFF1E1B4B)],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: const Color(0xFF6366F1), width: 3),
                  ),
                  child: Column(
                    children: [
                      // Formula Display: ক + া = কা
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildFormulaTile(_baseConsonant),
                          const Padding(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            child: Text("+", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                          ),
                          _buildFormulaTile(kar['sign']),
                          const Padding(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            child: Text("=", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                          ),
                          _buildFormulaTile(combinedResult, highlight: true),
                        ],
                      ),
                      const SizedBox(height: 20),
                      // Example Word and Visual Icon
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(kar['icon'], style: const TextStyle(fontSize: 50)),
                          const SizedBox(width: 14),
                          Text(
                            kar['sampleWord'],
                            style: const TextStyle(fontSize: 38, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      // Big Speaker Button
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: const BoxDecoration(
                          color: Color(0xFF4F46E5),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.volume_up_rounded, size: 36, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Base Consonant Selector
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SizedBox(
                height: 52,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _consonantOptions.length,
                  itemBuilder: (context, idx) {
                    final c = _consonantOptions[idx];
                    final isSel = c == _baseConsonant;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _baseConsonant = c);
                        _playCurrent();
                      },
                      child: Container(
                        width: 52,
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF4F46E5) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          c,
                          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            const SizedBox(height: 12),

            // 10 Kar Signs Grid
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 5,
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 10,
                    childAspectRatio: 1.0,
                  ),
                  itemCount: _karList.length,
                  itemBuilder: (context, idx) {
                    final k = _karList[idx];
                    final isSel = idx == _karIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _karIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF4F46E5) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          k['sign'],
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: isSel ? Colors.white : Colors.white70,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4F46E5),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text(
                  "পরবর্তী ধাপ (ধাপ ৩ খুলুন)",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFormulaTile(String text, {bool highlight = false}) {
    return Container(
      width: 64,
      height: 64,
      decoration: BoxDecoration(
        color: highlight ? const Color(0xFF4F46E5) : const Color(0xFF334155),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: highlight ? const Color(0xFFA5B4FC) : Colors.white24, width: 2),
      ),
      alignment: Alignment.center,
      child: Text(
        text,
        style: TextStyle(
          fontSize: 36,
          fontWeight: FontWeight.bold,
          color: highlight ? const Color(0xFFA5B4FC) : Colors.white,
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL3_SCREEN = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';
import '../widgets/word_breakdown_widget.dart';

class Level3Screen extends StatefulWidget {
  const Level3Screen({super.key});

  @override
  State<Level3Screen> createState() => _Level3ScreenState();
}

class _Level3ScreenState extends State<Level3Screen> {
  final TtsService _tts = TtsService();
  int _phalaIdx = 0;

  static const List<Map<String, dynamic>> _phalaList = [
    {
      'name': 'য-ফলা',
      'sign': '্য',
      'base': 'ক',
      'result': 'ক্য',
      'formulaTts': 'ক যোগ য-ফলা সমান ক্য',
      'word': 'বাক্য',
      'parts': ['ব', 'া', 'ক', '্য'],
      'partsTts': ['ব', 'আ-কার', 'ক', 'য-ফলা'],
      'icon': '💬',
    },
    {
      'name': 'র-ফলা',
      'sign': '্র',
      'base': 'গ',
      'result': 'গ্র',
      'formulaTts': 'গ যোগ র-ফলা সমান গ্র',
      'word': 'গ্রাম',
      'parts': ['গ', '্', 'র', 'া', 'ম'],
      'partsTts': ['গ', 'র-ফলা', 'আ-কার', 'ম'],
      'icon': '🏡',
    },
    {
      'name': 'ব-ফলা',
      'sign': '্ব',
      'base': 'দ',
      'result': 'দ্ব',
      'formulaTts': 'দ যোগ ব-ফলা সমান দ্ব',
      'word': 'দ্বার',
      'parts': ['দ', '্', 'ব', 'া', 'র'],
      'partsTts': ['দ', 'ব-ফলা', 'আ-কার', 'র'],
      'icon': '🚪',
    },
    {
      'name': 'ল-ফলা',
      'sign': '্ল',
      'base': 'ক',
      'result': 'ক্ল',
      'formulaTts': 'ক যোগ ল-ফলা সমান ক্ল',
      'word': 'ক্লান্ত',
      'parts': ['ক', '্', 'ল', 'া', 'ন', '্', 'ত'],
      'partsTts': ['ক', 'ল-ফলা', 'আ-কার', 'ন', 'ত'],
      'icon': '😴',
    },
    {
      'name': 'ম-ফলা',
      'sign': '্ম',
      'base': 'দ',
      'result': 'দ্ম',
      'formulaTts': 'দ যোগ ম-ফলা সমান দ্ম',
      'word': 'পদ্ম',
      'parts': ['প', 'দ', '্', 'ম'],
      'partsTts': ['প', 'দ', 'ম-ফলা'],
      'icon': '🪷',
    },
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final item = _phalaList[_phalaIdx];
    _tts.speak("\${item['formulaTts']}। উদাহরণ: \${item['word']}।", context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(4);
    _tts.speak("চমৎকার! আপনি ধাপ ৩ সম্পন্ন করেছেন। ধাপ ৪ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final item = _phalaList[_phalaIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "ধাপ ৩: ফলা চিহ্ন",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFFC084FC)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Massive Formula Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF581C87), Color(0xFF3B0764)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFA855F7), width: 3),
                ),
                child: Column(
                  children: [
                    // Formula Display: ক + ্য = ক্য
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildTile(item['base']),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Text("+", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                        ),
                        _buildTile(item['sign']),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Text("=", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                        ),
                        _buildTile(item['result'], highlight: true),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      item['name'],
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFFE9D5FF)),
                    ),
                  ],
                ),
              ),
            ),

            // Word Breakdown Engine Feature
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: WordBreakdownWidget(
                word: item['word'],
                parts: List<String>.from(item['parts']),
                partsTts: List<String>.from(item['partsTts']),
                fullWordTts: item['word'],
                iconSymbol: item['icon'],
              ),
            ),

            const SizedBox(height: 12),

            // Phala Selector Buttons
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _phalaList.length,
                  itemBuilder: (context, idx) {
                    final p = _phalaList[idx];
                    final isSel = idx == _phalaIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _phalaIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        width: 80,
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF7C3AED) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              p['result'],
                              style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              p['name'],
                              style: TextStyle(
                                fontSize: 14,
                                color: isSel ? Colors.white : Colors.white70,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF7C3AED),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text(
                  "পরবর্তী ধাপ (ধাপ ৪ খুলুন)",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTile(String text, {bool highlight = false}) {
    return Container(
      width: 64,
      height: 64,
      decoration: BoxDecoration(
        color: highlight ? const Color(0xFF7C3AED) : const Color(0xFF334155),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: highlight ? const Color(0xFFD8B4FE) : Colors.white24, width: 2),
      ),
      alignment: Alignment.center,
      child: Text(
        text,
        style: TextStyle(
          fontSize: 36,
          fontWeight: FontWeight.bold,
          color: highlight ? const Color(0xFFD8B4FE) : Colors.white,
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL4_SCREEN = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';
import '../widgets/word_breakdown_widget.dart';

class Level4Screen extends StatefulWidget {
  const Level4Screen({super.key});

  @override
  State<Level4Screen> createState() => _Level4ScreenState();
}

class _Level4ScreenState extends State<Level4Screen> {
  final TtsService _tts = TtsService();
  int _juktakkhorIdx = 0;

  static const List<Map<String, dynamic>> _juktakkhorList = [
    {
      'first': 'ক',
      'second': 'ষ',
      'result': 'ক্ষ',
      'name': 'খিয়',
      'formulaTts': 'ক যোগ মূর্ধন্য ষ সমান ক্ষ',
      'word': 'বৃক্ষ',
      'parts': ['ব', 'ৃ', 'ক', '্', 'ষ'],
      'partsTts': ['ব', 'ঋ-কার', 'ক', 'ষ'],
      'icon': '🌳',
    },
    {
      'first': 'ক',
      'second': 'ত',
      'result': 'ক্ত',
      'name': 'ক-এ ত',
      'formulaTts': 'ক যোগ ত সমান ক্ত',
      'word': 'রক্ত',
      'parts': ['র', 'ক', '্', 'ত'],
      'partsTts': ['র', 'ক', 'ত'],
      'icon': '🩸',
    },
    {
      'first': 'জ',
      'second': 'ঞ',
      'result': 'জ্ঞ',
      'name': 'জ-এ ঞ',
      'formulaTts': 'জ যোগ ঞ সমান জ্ঞ',
      'word': 'জ্ঞান',
      'parts': ['জ', '্', 'ঞ', 'া', 'ন'],
      'partsTts': ['জ', 'ঞ', 'আ-কার', 'ন'],
      'icon': '💡',
    },
    {
      'first': 'ত',
      'second': 'ত',
      'result': 'ত্ত',
      'name': 'ত-এ ত',
      'formulaTts': 'ত যোগ ত সমান ত্ত',
      'word': 'উত্তর',
      'parts': ['উ', 'ত', '্', 'ত', 'র'],
      'partsTts': ['উ', 'ত', 'ত', 'র'],
      'icon': '🧭',
    },
    {
      'first': 'শ',
      'second': 'র',
      'result': 'শ্র',
      'name': 'তালব্য শ-এ র-ফলা',
      'formulaTts': 'তালব্য শ যোগ র সমান শ্র',
      'word': 'শ্রদ্ধা',
      'parts': ['শ', '্', 'র', 'দ', '্', 'ধ', 'া'],
      'partsTts': ['শ্র', 'দ', 'ধ', 'আ-কার'],
      'icon': '🌸',
    },
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final item = _juktakkhorList[_juktakkhorIdx];
    _tts.speak("\${item['formulaTts']}। শব্দ: \${item['word']}।", context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(5);
    _tts.speak("অসাধারণ! আপনি ধাপ ৪ সম্পন্ন করেছেন। ধাপ ৫ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final item = _juktakkhorList[_juktakkhorIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "ধাপ ৪: যুক্তাক্ষর",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFFFB7185)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Massive Formula Card: ক + ষ = ক্ষ
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF881337), Color(0xFF4C0519)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFF43F5E), width: 3),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildTile(item['first']),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Text("+", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                        ),
                        _buildTile(item['second']),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Text("=", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                        ),
                        _buildTile(item['result'], highlight: true),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      item['name'],
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFFFECDD3)),
                    ),
                  ],
                ),
              ),
            ),

            // Word Breakdown Engine Feature
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: WordBreakdownWidget(
                word: item['word'],
                parts: List<String>.from(item['parts']),
                partsTts: List<String>.from(item['partsTts']),
                fullWordTts: item['word'],
                iconSymbol: item['icon'],
              ),
            ),

            const SizedBox(height: 12),

            // Juktakkhor Selector Buttons
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _juktakkhorList.length,
                  itemBuilder: (context, idx) {
                    final j = _juktakkhorList[idx];
                    final isSel = idx == _juktakkhorIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _juktakkhorIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        width: 80,
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFFE11D48) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              j['result'],
                              style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              j['name'],
                              style: TextStyle(
                                fontSize: 13,
                                color: isSel ? Colors.white : Colors.white70,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFE11D48),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text(
                  "পরবর্তী ধাপ (ধাপ ৫ খুলুন)",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTile(String text, {bool highlight = false}) {
    return Container(
      width: 64,
      height: 64,
      decoration: BoxDecoration(
        color: highlight ? const Color(0xFFE11D48) : const Color(0xFF334155),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: highlight ? const Color(0xFFFDA4AF) : Colors.white24, width: 2),
      ),
      alignment: Alignment.center,
      child: Text(
        text,
        style: TextStyle(
          fontSize: 36,
          fontWeight: FontWeight.bold,
          color: highlight ? const Color(0xFFFDA4AF) : Colors.white,
        ),
      ),
    );
  }
}
`;

export const FLUTTER_WORD_BREAKDOWN_WIDGET = `// lib/widgets/word_breakdown_widget.dart
// Interactive Word Breakdown Engine: Visually splits words into base letters
// and pronounces each part slowly in sequence, followed by the full word.

import 'package:flutter/material.dart';
import '../services/tts_service.dart';

class WordBreakdownWidget extends StatefulWidget {
  final String word;
  final List<String> parts;
  final List<String> partsTts;
  final String fullWordTts;
  final String iconSymbol;

  const WordBreakdownWidget({
    super.key,
    required this.word,
    required this.parts,
    required this.partsTts,
    required this.fullWordTts,
    required this.iconSymbol,
  });

  @override
  State<WordBreakdownWidget> createState() => _WordBreakdownWidgetState();
}

class _WordBreakdownWidgetState extends State<WordBreakdownWidget> {
  final TtsService _tts = TtsService();
  int _activeHighlightIndex = -1;
  bool _isPlayingSequence = false;

  Future<void> _playBreakdownSequence() async {
    if (_isPlayingSequence) return;
    setState(() => _isPlayingSequence = true);

    // Speak each letter slowly with visual highlight
    for (int i = 0; i < widget.parts.length; i++) {
      if (!mounted) return;
      setState(() => _activeHighlightIndex = i);
      await _tts.speak(widget.partsTts[i], context: context);
      await Future.delayed(const Duration(milliseconds: 900));
    }

    // Speak the combined full word
    if (!mounted) return;
    setState(() => _activeHighlightIndex = widget.parts.length); // Highlight full word
    await _tts.speak("সমান \${widget.fullWordTts}", context: context);
    await Future.delayed(const Duration(milliseconds: 1000));

    if (mounted) {
      setState(() {
        _activeHighlightIndex = -1;
        _isPlayingSequence = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white12, width: 1.5),
      ),
      child: Column(
        children: [
          // Word & Visual Icon Header
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(widget.iconSymbol, style: const TextStyle(fontSize: 42)),
              const SizedBox(width: 12),
              Text(
                widget.word,
                style: const TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 16),
              // Giant Audio Play Button
              GestureDetector(
                onTap: _isPlayingSequence ? null : _playBreakdownSequence,
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: _isPlayingSequence ? Colors.amber : const Color(0xFF38BDF8),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    _isPlayingSequence ? Icons.volume_up_rounded : Icons.play_arrow_rounded,
                    size: 32,
                    color: Colors.black87,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),

          // Visual Split Blocks: [ ক ] + [ ্য ] = [ ক্য ]
          Wrap(
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 6,
            runSpacing: 8,
            children: [
              for (int i = 0; i < widget.parts.length; i++) ...[
                _buildPartTile(
                  widget.parts[i],
                  isHighlighted: _activeHighlightIndex == i,
                  onTap: () => _tts.speak(widget.partsTts[i], context: context),
                ),
                if (i < widget.parts.length - 1)
                  const Text("+", style: TextStyle(fontSize: 26, color: Colors.white60, fontWeight: FontWeight.bold)),
              ],
              const Text("=", style: TextStyle(fontSize: 26, color: Colors.white60, fontWeight: FontWeight.bold)),
              _buildPartTile(
                widget.word,
                isHighlighted: _activeHighlightIndex == widget.parts.length,
                isResult: true,
                onTap: () => _tts.speak(widget.fullWordTts, context: context),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPartTile(String char, {required bool isHighlighted, bool isResult = false, required VoidCallback onTap}) {
    Color bgColor = const Color(0xFF334155);
    Color borderColor = Colors.white24;
    Color textColor = Colors.white;

    if (isHighlighted) {
      bgColor = Colors.amber;
      borderColor = Colors.white;
      textColor = Colors.black87;
    } else if (isResult) {
      bgColor = const Color(0xFF0369A1);
      borderColor = const Color(0xFF38BDF8);
      textColor = const Color(0xFFE0F2FE);
    }

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: borderColor, width: 2),
          boxShadow: isHighlighted ? [const BoxShadow(color: Colors.amber, blurRadius: 10)] : null,
        ),
        child: Text(
          char,
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: textColor,
          ),
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL5_SCREEN = `// lib/screens/level5_screen.dart
// Level 5: কঠিন যুক্তাক্ষর (Advanced 3-letter conjuncts with Word Breakdown Engine)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';
import '../widgets/word_breakdown_widget.dart';

class Level5Screen extends StatefulWidget {
  const Level5Screen({super.key});

  @override
  State<Level5Screen> createState() => _Level5ScreenState();
}

class _Level5ScreenState extends State<Level5Screen> {
  final TtsService _tts = TtsService();
  int _conjunctIdx = 0;

  static const List<Map<String, dynamic>> _advancedConjuncts = [
    {
      'first': 'স',
      'second': 'ত',
      'third': '্র',
      'result': 'স্ত্র',
      'name': 'দন্ত্য স-এ ত-এ র-ফলা',
      'formulaTts': 'দন্ত্য স যোগ ত যোগ র-ফলা সমান স্ত্র',
      'word': 'বস্ত্র',
      'parts': ['ব', 'স', '্', 'ত', '্', 'র'],
      'partsTts': ['ব', 'দন্ত্য স', 'ত', 'র-ফলা'],
      'icon': '👗',
    },
    {
      'first': 'স',
      'second': 'ট',
      'third': '্র',
      'result': 'স্ট্র',
      'name': 'দন্ত্য স-এ ট-এ র-ফলা',
      'formulaTts': 'দন্ত্য স যোগ ট যোগ র-ফলা সমান স্ট্র',
      'word': 'স্ট্র',
      'parts': ['স', '্', 'ট', '্', 'র'],
      'partsTts': ['দন্ত্য স', 'ট', 'র-ফলা'],
      'icon': '🥤',
    },
    {
      'first': 'স',
      'second': 'প',
      'third': '্র',
      'result': 'স্প্র',
      'name': 'দন্ত্য স-এ প-এ র-ফলা',
      'formulaTts': 'দন্ত্য স যোগ প যোগ র-ফলা সমান স্প্র',
      'word': 'স্প্রিং',
      'parts': ['স', '্', 'প', '্', 'র', 'ি', 'ং'],
      'partsTts': ['দন্ত্য স', 'প', 'র-ফলা', 'হ্রস্ব ই-কার', 'অনুস্বার'],
      'icon': '🌀',
    },
    {
      'first': 'ন',
      'second': 'ত',
      'third': '্র',
      'result': 'ন্ত্র',
      'name': 'দন্ত্য ন-এ ত-এ র-ফলা',
      'formulaTts': 'দন্ত্য ন যোগ ত যোগ র-ফলা সমান ন্ত্র',
      'word': 'যন্ত্র',
      'parts': ['য', 'ন', '্', 'ত', '্', 'র'],
      'partsTts': ['য', 'দন্ত্য ন', 'ত', 'র-ফলা'],
      'icon': '⚙️',
    },
    {
      'first': 'ক',
      'second': 'ষ',
      'third': '্ম',
      'result': 'ক্ষ্ম',
      'name': 'ক-এ ষ-এ ম-ফলা',
      'formulaTts': 'ক যোগ মূর্ধন্য ষ যোগ ম-ফলা সমান ক্ষ্ম',
      'word': 'সূক্ষ্ম',
      'parts': ['স', 'ূ', 'ক', '্', 'ষ', '্', 'ম'],
      'partsTts': ['দন্ত্য স', 'দীর্ঘ ঊ-কার', 'ক্ষ', 'ম-ফলা'],
      'icon': '🔍',
    },
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final item = _advancedConjuncts[_conjunctIdx];
    _tts.speak("\${item['formulaTts']}। শব্দ: \${item['word']}।", context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(6);
    _tts.speak("অসাধারণ! আপনি ধাপ ৫ সম্পন্ন করেছেন। ধাপ ৬ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final item = _advancedConjuncts[_conjunctIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ৫: কঠিন যুক্তাক্ষর", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFFFBBF24)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // 3-Letter Conjunct Formula Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 14),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF78350F), Color(0xFF451A03)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFF59E0B), width: 3),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildTile(item['first']),
                        const Padding(padding: EdgeInsets.symmetric(horizontal: 6), child: Text("+", style: TextStyle(fontSize: 32, color: Colors.white70, fontWeight: FontWeight.bold))),
                        _buildTile(item['second']),
                        const Padding(padding: EdgeInsets.symmetric(horizontal: 6), child: Text("+", style: TextStyle(fontSize: 32, color: Colors.white70, fontWeight: FontWeight.bold))),
                        _buildTile(item['third']),
                        const Padding(padding: EdgeInsets.symmetric(horizontal: 6), child: Text("=", style: TextStyle(fontSize: 32, color: Colors.white70, fontWeight: FontWeight.bold))),
                        _buildTile(item['result'], highlight: true),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(item['name'], style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFFFDE68A))),
                  ],
                ),
              ),
            ),

            // Word Breakdown Engine Feature
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: WordBreakdownWidget(
                word: item['word'],
                parts: List<String>.from(item['parts']),
                partsTts: List<String>.from(item['partsTts']),
                fullWordTts: item['word'],
                iconSymbol: item['icon'],
              ),
            ),

            const SizedBox(height: 12),

            // Horizontal Selector
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _advancedConjuncts.length,
                  itemBuilder: (context, idx) {
                    final c = _advancedConjuncts[idx];
                    final isSel = idx == _conjunctIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _conjunctIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        width: 86,
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFFD97706) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(c['result'], style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white)),
                            const SizedBox(height: 6),
                            Text(c['name'], style: TextStyle(fontSize: 11, color: isSel ? Colors.white : Colors.white70, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFD97706),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text("পরবর্তী ধাপ (ধাপ ৬ খুলুন)", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTile(String text, {bool highlight = false}) {
    return Container(
      width: 52,
      height: 52,
      decoration: BoxDecoration(
        color: highlight ? const Color(0xFFD97706) : const Color(0xFF334155),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: highlight ? const Color(0xFFFDE68A) : Colors.white24, width: 2),
      ),
      alignment: Alignment.center,
      child: Text(text, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: highlight ? const Color(0xFFFDE68A) : Colors.white)),
    );
  }
}
`;

export const FLUTTER_LEVEL6_SCREEN = `// lib/screens/level6_screen.dart
// Level 6: শব্দ গঠন (Word Mechanics: combining letters and signs into full words)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';
import '../widgets/word_breakdown_widget.dart';

class Level6Screen extends StatefulWidget {
  const Level6Screen({super.key});

  @override
  State<Level6Screen> createState() => _Level6ScreenState();
}

class _Level6ScreenState extends State<Level6Screen> {
  final TtsService _tts = TtsService();
  int _selectedWordIdx = 0;

  static const List<Map<String, dynamic>> _wordList = [
    {
      'word': 'বিদ্যালয়',
      'icon': '🏫',
      'meaning': 'পড়াশোনার স্থান',
      'speech': 'বিদ্যালয়। ব-এ হ্রস্ব ই-কার বি, দ-এ য-ফলা আ-কার দ্যা, ল, য় — বিদ্যালয়।',
      'parts': ['ব', 'ি', 'দ', '্য', 'া', 'ল', 'য়'],
      'partsTts': ['ব', 'হ্রস্ব ই-কার', 'দ', 'য-ফলা', 'আ-কার', 'ল', 'য়'],
    },
    {
      'word': 'বৃষ্টি',
      'icon': '🌧️',
      'meaning': 'মেঘের জলধারা',
      'speech': 'বৃষ্টি। ব-এ ঋ-কার বৃ, ষ-এ ট-এ হ্রস্ব ই-কার ষ্টি — বৃষ্টি।',
      'parts': ['ব', 'ৃ', 'ষ', '্', 'ট', 'ি'],
      'partsTts': ['ব', 'ঋ-কার', 'ষ', 'ট', 'হ্রস্ব ই-কার'],
    },
    {
      'word': 'প্রজাপতি',
      'icon': '🦋',
      'meaning': 'সুন্দর প্রজাপতি',
      'speech': 'প্রজাপতি। প-এ র-ফলা প্র, জ-এ আ-কার জা, প, ত-এ হ্রস্ব ই-কার তি — প্রজাপতি।',
      'parts': ['প', '্', 'র', 'জ', 'া', 'প', 'ত', 'ি'],
      'partsTts': ['প', 'র-ফলা', 'জ', 'আ-কার', 'প', 'ত', 'হ্রস্ব ই-কার'],
    },
    {
      'word': 'ফুটবল',
      'icon': '⚽',
      'meaning': 'খেলার বল',
      'speech': 'ফুটবল। ফ-এ হ্রস্ব উ-কার ফু, ট, ব, ল — ফুটবল।',
      'parts': ['ফ', 'ু', 'ট', 'ব', 'ল'],
      'partsTts': ['ফ', 'হ্রস্ব উ-কার', 'ট', 'ব', 'ল'],
    },
    {
      'word': 'জন্মদিন',
      'icon': '🎂',
      'meaning': 'শুভ জন্মদিন',
      'speech': 'জন্মদিন। জ, ন-এ ম-ফলা জন্ম, দ-এ হ্রস্ব ই-কার দি, ন — জন্মদিন।',
      'parts': ['জ', 'ন', '্', 'ম', 'দ', 'ি', 'ন'],
      'partsTts': ['জ', 'ন', 'ম-ফলা', 'দ', 'হ্রস্ব ই-কার', 'ন'],
    },
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final item = _wordList[_selectedWordIdx];
    _tts.speak(item['speech'], context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(7);
    _tts.speak("চমৎকার! আপনি ধাপ ৬ সম্পন্ন করেছেন। ধাপ ৭ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final item = _wordList[_selectedWordIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ৬: শব্দ গঠন", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF2DD4BF)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Giant Visual Header Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: GestureDetector(
                onTap: _playCurrent,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFF134E4A), Color(0xFF042F2E)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: const Color(0xFF14B8A6), width: 3),
                  ),
                  child: Column(
                    children: [
                      Text(item['icon'], style: const TextStyle(fontSize: 60)),
                      const SizedBox(height: 12),
                      Text(item['word'], style: const TextStyle(fontSize: 44, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 6),
                      Text(item['meaning'], style: const TextStyle(fontSize: 20, color: Color(0xFF99F6E4), fontWeight: FontWeight.w600)),
                      const SizedBox(height: 14),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: const BoxDecoration(color: Color(0xFF0D9488), shape: BoxShape.circle),
                        child: const Icon(Icons.volume_up_rounded, size: 34, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Word Breakdown Engine
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: WordBreakdownWidget(
                word: item['word'],
                parts: List<String>.from(item['parts']),
                partsTts: List<String>.from(item['partsTts']),
                fullWordTts: item['word'],
                iconSymbol: item['icon'],
              ),
            ),

            const SizedBox(height: 12),

            // Word List Selector
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _wordList.length,
                  itemBuilder: (context, idx) {
                    final w = _wordList[idx];
                    final isSel = idx == _selectedWordIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _selectedWordIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        width: 100,
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF0D9488) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(w['icon'], style: const TextStyle(fontSize: 32)),
                            const SizedBox(height: 6),
                            Text(w['word'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0D9488),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text("পরবর্তী ধাপ (ধাপ ৭ খুলুন)", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL7_SCREEN = `// lib/screens/level7_screen.dart
// Level 7: শব্দ পরিচয় (Everyday Vocabulary: Nouns, Verbs, Pronouns with heavy visual context)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class Level7Screen extends StatefulWidget {
  const Level7Screen({super.key});

  @override
  State<Level7Screen> createState() => _Level7ScreenState();
}

class _Level7ScreenState extends State<Level7Screen> {
  final TtsService _tts = TtsService();
  int _categoryTab = 0; // 0 = বিশেষ্য (Nouns), 1 = ক্রিয়া (Verbs), 2 = সর্বনাম (Pronouns)
  int _itemIdx = 0;

  static const List<Map<String, dynamic>> _nouns = [
    {'word': 'ঘর', 'icon': '🏡', 'meaning': 'বাসস্থান', 'tts': 'ঘর। বসবাসের ঘর।'},
    {'word': 'জল', 'icon': '💧', 'meaning': 'মিষ্টি জল', 'tts': 'জল। তৃষ্ণার মিষ্টি জল।'},
    {'word': 'গাছ', 'icon': '🌳', 'meaning': 'সবুজ গাছ', 'tts': 'গাছ। সবুজ ছায়াঘেরা গাছ।'},
    {'word': 'বই', 'icon': '📖', 'meaning': 'পড়ার বই', 'tts': 'বই। জ্ঞানের বই।'},
    {'word': 'ভাত', 'icon': '🍚', 'meaning': 'খাবার', 'tts': 'ভাত। গরম ভাত।'},
  ];

  static const List<Map<String, dynamic>> _verbs = [
    {'word': 'খাওয়া', 'icon': '🍽️', 'meaning': 'আহার করা', 'tts': 'খাওয়া। খাবার খাওয়া।'},
    {'word': 'ঘুমানো', 'icon': '😴', 'meaning': 'বিশ্রাম নেওয়া', 'tts': 'ঘুমানো। রাতে ঘুমানো।'},
    {'word': 'পড়া', 'icon': '📚', 'meaning': 'শেখা', 'tts': 'পড়া। মনোযোগ দিয়ে পড়া।'},
    {'word': 'দৌড়ানো', 'icon': '🏃', 'meaning': 'ছুটে চলা', 'tts': 'দৌড়ানো। মাঠে দৌড়ানো।'},
    {'word': 'দেখা', 'icon': '👁️', 'meaning': 'নয়ন দিয়ে দেখা', 'tts': 'দেখা। চোখ মেলে দেখা।'},
  ];

  static const List<Map<String, dynamic>> _pronouns = [
    {'word': 'আমি', 'icon': '🙋', 'meaning': 'নিজের কথা', 'tts': 'আমি।'},
    {'word': 'তুমি', 'icon': '👉', 'meaning': 'সামনের জন', 'tts': 'তুমি।'},
    {'word': 'সে', 'icon': '👤', 'meaning': 'অন্য একজন', 'tts': 'সে।'},
    {'word': 'আমরা', 'icon': '👥', 'meaning': 'সবাই মিলে', 'tts': 'আমরা।'},
  ];

  List<Map<String, dynamic>> get _currentCategoryList {
    if (_categoryTab == 0) return _nouns;
    if (_categoryTab == 1) return _verbs;
    return _pronouns;
  }

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final item = _currentCategoryList[_itemIdx];
    _tts.speak(item['tts'], context: context);
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(8);
    _tts.speak("দারুণ! আপনি ধাপ ৭ সম্পন্ন করেছেন। ধাপ ৮ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final list = _currentCategoryList;
    final item = list[_itemIdx];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ৭: শব্দ পরিচয়", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF38BDF8)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Category Selector Tabs
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  _buildCatTab(0, "জিনিস ও প্রকৃতি"),
                  const SizedBox(width: 8),
                  _buildCatTab(1, "কাজকর্ম"),
                  const SizedBox(width: 8),
                  _buildCatTab(2, "ব্যক্তি"),
                ],
              ),
            ),

            // Giant Visual Vocab Card
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: GestureDetector(
                  onTap: _playCurrent,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(colors: [Color(0xFF0C4A6E), Color(0xFF082F49)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: const Color(0xFF0284C7), width: 3),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(item['icon'], style: const TextStyle(fontSize: 90)),
                        const SizedBox(height: 16),
                        Text(item['word'], style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 8),
                        Text(item['meaning'], style: const TextStyle(fontSize: 22, color: Color(0xFFBAE6FD), fontWeight: FontWeight.w600)),
                        const SizedBox(height: 20),
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: const BoxDecoration(color: Color(0xFF0284C7), shape: BoxShape.circle),
                          child: const Icon(Icons.volume_up_rounded, size: 40, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

            // Horizontal Word Selector
            Expanded(
              flex: 2,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: list.length,
                  itemBuilder: (context, idx) {
                    final w = list[idx];
                    final isSel = idx == _itemIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _itemIdx = idx);
                        _playCurrent();
                      },
                      child: Container(
                        width: 90,
                        margin: const EdgeInsets.only(right: 10),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF0284C7) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(w['icon'], style: const TextStyle(fontSize: 32)),
                            const SizedBox(height: 6),
                            Text(w['word'], style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0284C7),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text("পরবর্তী ধাপ (ধাপ ৮ খুলুন)", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCatTab(int idx, String title) {
    final isSel = _categoryTab == idx;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _categoryTab = idx;
            _itemIdx = 0;
          });
          _playCurrent();
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSel ? const Color(0xFF0284C7) : const Color(0xFF1E293B),
            borderRadius: BorderRadius.circular(14),
          ),
          alignment: Alignment.center,
          child: Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: isSel ? Colors.white : Colors.white70), maxLines: 1),
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL8_SCREEN = `// lib/screens/level8_screen.dart
// Level 8: বাক্য গঠন (Basic 2-3 Word Sentences with Clickable Word Blocks & Fluid Play All)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class Level8Screen extends StatefulWidget {
  const Level8Screen({super.key});

  @override
  State<Level8Screen> createState() => _Level8ScreenState();
}

class _Level8ScreenState extends State<Level8Screen> {
  final TtsService _tts = TtsService();
  int _sentenceIdx = 0;
  int _activeWordHighlight = -1;
  bool _isPlayingAll = false;

  static const List<Map<String, dynamic>> _sentences = [
    {
      'sentence': 'আমি ভাত খাই।',
      'icon': '🍚',
      'words': ['আমি', 'ভাত', 'খাই।'],
      'wordsTts': ['আমি', 'ভাত', 'খাই'],
      'fullTts': 'আমি ভাত খাই।',
      'meaning': 'খাবার খাওয়ার বাক্য',
    },
    {
      'sentence': 'জল পড়ে।',
      'icon': '💧',
      'words': ['জল', 'পড়ে।'],
      'wordsTts': ['জল', 'পড়ে'],
      'fullTts': 'জল পড়ে।',
      'meaning': 'বৃষ্টি বা জলের ধারা',
    },
    {
      'sentence': 'পাখি গান গায়।',
      'icon': '🐦',
      'words': ['পাখি', 'গান', 'গায়।'],
      'wordsTts': ['পাখি', 'গান', 'গায়'],
      'fullTts': 'পাখি গান গায়।',
      'meaning': 'পাখির মধুর সুর',
    },
    {
      'sentence': 'সূর্য আলো দেয়।',
      'icon': '☀️',
      'words': ['সূর্য', 'আলো', 'দেয়।'],
      'wordsTts': ['সূর্য', 'আলো', 'দেয়'],
      'fullTts': 'সূর্য আলো দেয়।',
      'meaning': 'দিনের রোদ ও আলো',
    },
    {
      'sentence': 'ফুল ফোটে।',
      'icon': '🌸',
      'words': ['ফুল', 'ফোটে।'],
      'wordsTts': ['ফুল', 'ফোটে'],
      'fullTts': 'ফুল ফোটে।',
      'meaning': 'বাগানের ফুল',
    },
    {
      'sentence': 'আমরা স্কুলে যাই।',
      'icon': '🎒',
      'words': ['আমরা', 'স্কুলে', 'যাই।'],
      'wordsTts': ['আমরা', 'স্কুলে', 'যাই'],
      'fullTts': 'আমরা স্কুলে যাই।',
      'meaning': 'পড়াশোনা করতে যাওয়া',
    },
  ];

  @override
  void initState() {
    super.initState();
    _playFullSentence();
  }

  Future<void> _playFullSentence() async {
    if (_isPlayingAll) return;
    setState(() => _isPlayingAll = true);

    final item = _sentences[_sentenceIdx];
    final words = item['words'] as List<String>;
    final wordsTts = item['wordsTts'] as List<String>;

    // Step-by-step fluid read with visual highlighting
    for (int i = 0; i < words.length; i++) {
      if (!mounted) return;
      setState(() => _activeWordHighlight = i);
      await _tts.speak(wordsTts[i], context: context);
      await Future.delayed(const Duration(milliseconds: 700));
    }

    if (!mounted) return;
    setState(() => _activeWordHighlight = -1);
    await _tts.speak(item['fullTts'], context: context);
    await Future.delayed(const Duration(milliseconds: 900));

    if (mounted) {
      setState(() => _isPlayingAll = false);
    }
  }

  void _finishLevel() {
    final progress = context.read<ProgressProvider>();
    progress.unlockLevel(9);
    _tts.speak("অসাধারণ! আপনি ধাপ ৮ সম্পন্ন করেছেন। ধাপ ৯ খুলে গেছে।", context: context);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final item = _sentences[_sentenceIdx];
    final words = item['words'] as List<String>;
    final wordsTts = item['wordsTts'] as List<String>;

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ৮: বাক্য গঠন", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF818CF8)),
            onPressed: _playFullSentence,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Giant Visual Action Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF312E81), Color(0xFF1E1B4B)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFF6366F1), width: 3),
                ),
                child: Column(
                  children: [
                    Text(item['icon'], style: const TextStyle(fontSize: 80)),
                    const SizedBox(height: 14),
                    Text(item['sentence'], style: const TextStyle(fontSize: 34, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center),
                    const SizedBox(height: 6),
                    Text(item['meaning'], style: const TextStyle(fontSize: 18, color: Color(0xFFA5B4FC), fontWeight: FontWeight.w600)),
                    const SizedBox(height: 16),
                    // Giant "Play All" Speaker Button
                    GestureDetector(
                      onTap: _isPlayingAll ? null : _playFullSentence,
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: _isPlayingAll ? Colors.amber : const Color(0xFF6366F1),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          _isPlayingAll ? Icons.volume_up_rounded : Icons.play_arrow_rounded,
                          size: 40,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Clickable Individual Word Blocks
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: Column(
                  children: [
                    const Text("শব্দে চাপ দিন:", style: TextStyle(color: Colors.white60, fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 12,
                      runSpacing: 10,
                      alignment: WrapAlignment.center,
                      children: [
                        for (int i = 0; i < words.length; i++)
                          GestureDetector(
                            onTap: () {
                              setState(() => _activeWordHighlight = i);
                              _tts.speak(wordsTts[i], context: context);
                            },
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                              decoration: BoxDecoration(
                                color: _activeWordHighlight == i ? Colors.amber : const Color(0xFF4338CA),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: _activeWordHighlight == i ? Colors.white : const Color(0xFF818CF8), width: 2),
                              ),
                              child: Text(
                                words[i],
                                style: TextStyle(
                                  fontSize: 28,
                                  fontWeight: FontWeight.bold,
                                  color: _activeWordHighlight == i ? Colors.black87 : Colors.white,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 12),

            // Horizontal Sentence Selector
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _sentences.length,
                  itemBuilder: (context, idx) {
                    final s = _sentences[idx];
                    final isSel = idx == _sentenceIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _sentenceIdx = idx;
                          _activeWordHighlight = -1;
                        });
                        _playFullSentence();
                      },
                      child: Container(
                        width: 100,
                        margin: const EdgeInsets.only(right: 10),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF6366F1) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(s['icon'], style: const TextStyle(fontSize: 32)),
                            const SizedBox(height: 6),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 4),
                              child: Text(s['sentence'], style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center, maxLines: 2),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level (পরবর্তী ধাপ)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF6366F1),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.check_circle_rounded, size: 32, color: Colors.white),
                label: const Text("পরবর্তী ধাপ (ধাপ ৯ খুলুন)", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                onPressed: _finishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_VISUAL_QUIZ_DIALOG = `// lib/widgets/visual_quiz_dialog.dart
// Visual Quiz System: Audio-visual quiz with zero text questions for illiterate learners

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class VisualQuizDialog extends StatefulWidget {
  final int currentLevel;
  final int nextLevel;
  final String audioPrompt;
  final List<Map<String, dynamic>> options;

  const VisualQuizDialog({
    super.key,
    required this.currentLevel,
    required this.nextLevel,
    required this.audioPrompt,
    required this.options,
  });

  static Future<bool?> show(
    BuildContext context, {
    required int currentLevel,
    required int nextLevel,
    required String audioPrompt,
    required List<Map<String, dynamic>> options,
  }) {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (_) => VisualQuizDialog(
        currentLevel: currentLevel,
        nextLevel: nextLevel,
        audioPrompt: audioPrompt,
        options: options,
      ),
    );
  }

  @override
  State<VisualQuizDialog> createState() => _VisualQuizDialogState();
}

class _VisualQuizDialogState extends State<VisualQuizDialog> {
  final TtsService _tts = TtsService();
  String? _selectedOptionId;
  bool? _isCorrect;

  @override
  void initState() {
    super.initState();
    _playPrompt();
  }

  void _playPrompt() {
    _tts.speak(widget.audioPrompt, context: context);
  }

  void _handleOptionTap(Map<String, dynamic> option) async {
    final bool isCorrect = option['isCorrect'] as bool;
    setState(() {
      _selectedOptionId = option['id'];
      _isCorrect = isCorrect;
    });

    if (isCorrect) {
      final progress = context.read<ProgressProvider>();
      progress.unlockLevel(widget.nextLevel);
      await _tts.speak("খুব ভালো! আপনি সঠিক উত্তর দিয়েছেন। পরবর্তী ধাপ খুলে গেছে!", context: context);
      await Future.delayed(const Duration(milliseconds: 1400));
      if (mounted) {
        Navigator.pop(context, true);
      }
    } else {
      await _tts.speak("আবার চেষ্টা করুন।", context: context);
      await Future.delayed(const Duration(milliseconds: 900));
      if (mounted) {
        setState(() {
          _selectedOptionId = null;
          _isCorrect = null;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28), side: const BorderSide(color: Color(0xFF38BDF8), width: 2.5)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Quiz Header with Speaker Replay
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.quiz_rounded, color: Color(0xFF38BDF8), size: 30),
                    SizedBox(width: 8),
                    Text(
                      "ছোট পরীক্ষা",
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF38BDF8), size: 32),
                  onPressed: _playPrompt,
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Visual Status Icon (when tapped)
            if (_isCorrect != null)
              Container(
                margin: const EdgeInsets.only(bottom: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: _isCorrect! ? Colors.green.withOpacity(0.2) : Colors.red.withOpacity(0.2),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  _isCorrect! ? Icons.check_circle_rounded : Icons.cancel_rounded,
                  color: _isCorrect! ? Colors.greenAccent : Colors.redAccent,
                  size: 60,
                ),
              ),

            // 3 Giant Choices
            for (final opt in widget.options) ...[
              GestureDetector(
                onTap: () => _handleOptionTap(opt),
                child: Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                  decoration: BoxDecoration(
                    color: _selectedOptionId == opt['id']
                        ? (_isCorrect == true ? Colors.green : Colors.red)
                        : const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.white24, width: 2),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(opt['icon'] ?? '', style: const TextStyle(fontSize: 40)),
                      const SizedBox(width: 14),
                      Text(
                        opt['displayText'],
                        style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ],

            const SizedBox(height: 10),
            // Tap speaker prompt hint
            TextButton.icon(
              onPressed: _playPrompt,
              icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF38BDF8), size: 24),
              label: const Text(
                "আবার শুনুন",
                style: TextStyle(color: Color(0xFF38BDF8), fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL9_SCREEN = `// lib/screens/level9_screen.dart
// Level 9: অনুচ্ছেদ পাঠ (Short 3-4 sentence paragraphs with Play All & individual sentence taps)

import 'package:flutter/material.dart';
import '../services/tts_service.dart';
import '../widgets/visual_quiz_dialog.dart';

class Level9Screen extends StatefulWidget {
  const Level9Screen({super.key});

  @override
  State<Level9Screen> createState() => _Level9ScreenState();
}

class _Level9ScreenState extends State<Level9Screen> {
  final TtsService _tts = TtsService();
  int _paragraphIdx = 0;
  int _activeSentenceHighlight = -1;
  bool _isPlayingAll = false;

  static const List<Map<String, dynamic>> _paragraphs = [
    {
      'title': 'আমাদের সুন্দর দেশ',
      'icon': '🇧🇩',
      'sentences': [
        'আমাদের দেশ বাংলাদেশ।',
        'এখানে নদী ও সবুজ মাঠ আছে।',
        'পাখিরা গান গায় ও ফুল ফোটে।',
        'আমরা আমাদের দেশকে খুব ভালোবাসি।',
      ],
      'fullAudio': 'আমাদের দেশ বাংলাদেশ। এখানে নদী ও সবুজ মাঠ আছে। পাখিরা গান গায় ও ফুল ফোটে। আমরা আমাদের দেশকে খুব ভালোবাসি।',
    },
    {
      'title': 'ভোরের সকাল',
      'icon': '🌅',
      'sentences': [
        'ভোরে পূর্ব আকাশে সূর্য ওঠে।',
        'পাখিরা মিষ্টি সুরে গান গায়।',
        'শীতল ও স্নিগ্ধ বাতাস বয়।',
        'শিশুরা পাঠশালায় যেতে প্রস্তুত হয়।',
      ],
      'fullAudio': 'ভোরে পূর্ব আকাশে সূর্য ওঠে। পাখিরা মিষ্টি সুরে গান গায়। শীতল ও স্নিগ্ধ বাতাস বয়। শিশুরা পাঠশালায় যেতে প্রস্তুত হয়।',
    },
    {
      'title': 'বর্ষার বৃষ্টি',
      'icon': '🌧️',
      'sentences': [
        'আকাশে ঘন কালো মেঘ ডাকে।',
        'ঝমঝম শব্দে শীতল বৃষ্টি পড়ে।',
        'নদী ও পুকুর জলে ভরে যায়।',
        'চারপাশের গাছপালা সবুজ হয়ে ওঠে।',
      ],
      'fullAudio': 'আকাশে ঘন কালো মেঘ ডাকে। ঝমঝম শব্দে শীতল বৃষ্টি পড়ে। নদী ও পুকুর জলে ভরে যায়। চারপাশের গাছপালা সবুজ হয়ে ওঠে।',
    },
  ];

  @override
  void initState() {
    super.initState();
    _playFullParagraph();
  }

  Future<void> _playFullParagraph() async {
    if (_isPlayingAll) return;
    setState(() => _isPlayingAll = true);

    final current = _paragraphs[_paragraphIdx];
    final sentences = current['sentences'] as List<String>;

    for (int i = 0; i < sentences.length; i++) {
      if (!mounted) return;
      setState(() => _activeSentenceHighlight = i);
      await _tts.speak(sentences[i], context: context);
      await Future.delayed(const Duration(milliseconds: 1400));
    }

    if (mounted) {
      setState(() {
        _activeSentenceHighlight = -1;
        _isPlayingAll = false;
      });
    }
  }

  void _onFinishLevel() async {
    final bool? passed = await VisualQuizDialog.show(
      context,
      currentLevel: 9,
      nextLevel: 10,
      audioPrompt: "'সূর্য ওঠার' ছবিতে চাপ দিন।",
      options: [
        {'id': '1', 'displayText': 'বর্ষার বৃষ্টি', 'icon': '🌧️', 'isCorrect': false},
        {'id': '2', 'displayText': 'ভোরের সকাল', 'icon': '🌅', 'isCorrect': true},
        {'id': '3', 'displayText': 'আমাদের দেশ', 'icon': '🇧🇩', 'isCorrect': false},
      ],
    );

    if (passed == true && mounted) {
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final current = _paragraphs[_paragraphIdx];
    final sentences = current['sentences'] as List<String>;

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ৯: অনুচ্ছেদ পাঠ", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFFC084FC)),
            onPressed: _playFullParagraph,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Paragraph Header with Giant Play All Button
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF581C87), Color(0xFF3B0764)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFA855F7), width: 3),
                ),
                child: Row(
                  children: [
                    Text(current['icon'], style: const TextStyle(fontSize: 60)),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(current['title'], style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white)),
                          const SizedBox(height: 4),
                          const Text("পুরো অনুচ্ছেদ শুনুন", style: TextStyle(fontSize: 16, color: Color(0xFFE9D5FF), fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: _isPlayingAll ? null : _playFullParagraph,
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: _isPlayingAll ? Colors.amber : const Color(0xFFA855F7),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          _isPlayingAll ? Icons.volume_up_rounded : Icons.play_arrow_rounded,
                          size: 36,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Clickable Sentences List
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: ListView.builder(
                  itemCount: sentences.length,
                  itemBuilder: (context, idx) {
                    final sent = sentences[idx];
                    final isLit = _activeSentenceHighlight == idx;
                    return GestureDetector(
                      onTap: () {
                        setState(() => _activeSentenceHighlight = idx);
                        _tts.speak(sent, context: context);
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          color: isLit ? const Color(0xFF7C3AED) : const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: isLit ? Colors.white : Colors.white12, width: 2),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: isLit ? Colors.white24 : const Color(0xFF334155),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                Icons.volume_up_rounded,
                                size: 24,
                                color: isLit ? Colors.white : const Color(0xFFA855F7),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Text(
                                sent,
                                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white, height: 1.3),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Horizontal Paragraph Selector
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SizedBox(
                height: 72,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _paragraphs.length,
                  itemBuilder: (context, idx) {
                    final p = _paragraphs[idx];
                    final isSel = idx == _paragraphIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _paragraphIdx = idx;
                          _activeSentenceHighlight = -1;
                        });
                        _playFullParagraph();
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 12),
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF7C3AED) : const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        child: Row(
                          children: [
                            Text(p['icon'], style: const TextStyle(fontSize: 28)),
                            const SizedBox(width: 8),
                            Text(p['title'], style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Bottom Action: Finish Level Quiz (পরবর্তী ধাপের পরীক্ষা)
            Padding(
              padding: const EdgeInsets.all(16),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF7C3AED),
                  minimumSize: const Size(double.infinity, 60),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                ),
                icon: const Icon(Icons.quiz_rounded, size: 32, color: Colors.white),
                label: const Text("ধাপ ৯ এর পরীক্ষা ও ধাপ ১০ খুলুন", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                onPressed: _onFinishLevel,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_LEVEL10_SCREEN = `// lib/screens/level10_screen.dart
// Level 10: সম্পূর্ণ গল্প (Complete Story with whole-story narration & Word Breakdown on ANY word)

import 'package:flutter/material.dart';
import '../services/tts_service.dart';
import '../widgets/word_breakdown_widget.dart';

class Level10Screen extends StatefulWidget {
  const Level10Screen({super.key});

  @override
  State<Level10Screen> createState() => _Level10ScreenState();
}

class _Level10ScreenState extends State<Level10Screen> {
  final TtsService _tts = TtsService();
  bool _isPlayingAll = false;
  Map<String, dynamic>? _activeBreakdown;

  static const String _storyTitle = "বুদ্ধিমান তৃষ্ণার্ত কাক";
  static const String _storyIcon = "🦅";
  static const String _fullAudio = "এক ছিল তৃষ্ণার্ত কাক। সে জলের খোঁজে বনে গেল। একটি কলসিতে অল্প জল ছিল। কাকটি বুদ্ধি করে নুড়ি পাথর ফেলল। জল ওপরে উঠে এলো। কাকটি জল খেয়ে খুশি হলো।";

  static const List<String> _storyWords = [
    "এক", "ছিল", "তৃষ্ণার্ত", "কাক।", "সে", "জলের", "খোঁজে", "বনে", "গেল।",
    "একটি", "কলসিতে", "অল্প", "জল", "ছিল।", "কাকটি", "বুদ্ধি", "করে", "নুড়ি", "পাথর", "ফেলল।",
    "জল", "ওপরে", "উঠে", "এলো।", "কাকটি", "জল", "খেয়ে", "খুশি", "হলো।"
  ];

  static const Map<String, Map<String, dynamic>> _wordDict = {
    "এক": {
      "word": "এক",
      "parts": ["এ", "ক"],
      "partsTts": ["এ", "ক"],
      "fullTts": "এক",
      "icon": "☝️",
    },
    "ছিল": {
      "word": "ছিল",
      "parts": ["ছ", "ি", "ল"],
      "partsTts": ["ছ", "হ্রস্ব ই-কার", "ল"],
      "fullTts": "ছিল",
      "icon": "⏳",
    },
    "তৃষ্ণার্ত": {
      "word": "তৃষ্ণার্ত",
      "parts": ["ত", "ৃ", "ষ", "্", "ণ", "া", "র", "্", "ত"],
      "partsTts": ["ত", "ঋ-কার", "ষ", "ণ", "আ-কার", "রেফ", "ত"],
      "fullTts": "তৃষ্ণার্ত",
      "icon": "🥵",
    },
    "কাক": {
      "word": "কাক",
      "parts": ["ক", "া", "ক"],
      "partsTts": ["ক", "আ-কার", "ক"],
      "fullTts": "কাক",
      "icon": "🦅",
    },
    "সে": {
      "word": "সে",
      "parts": ["স", "ে"],
      "partsTts": ["দন্ত্য স", "এ-কার"],
      "fullTts": "সে",
      "icon": "👉",
    },
    "জলের": {
      "word": "জলের",
      "parts": ["জ", "ল", "ে", "র"],
      "partsTts": ["জ", "ল", "এ-কার", "র"],
      "fullTts": "জলের",
      "icon": "💧",
    },
    "খোঁজে": {
      "word": "খোঁজে",
      "parts": ["খ", "ো", "ঁ", "জ", "ে"],
      "partsTts": ["খ", "ও-কার", "চন্দ্রবিন্দু", "জ", "এ-কার"],
      "fullTts": "খোঁজে",
      "icon": "🔍",
    },
    "বনে": {
      "word": "বনে",
      "parts": ["ব", "ন", "ে"],
      "partsTts": ["ব", "দন্ত্য ন", "এ-কার"],
      "fullTts": "বনে",
      "icon": "🌲",
    },
    "গেল": {
      "word": "গেল",
      "parts": ["গ", "ে", "ল"],
      "partsTts": ["গ", "এ-কার", "ল"],
      "fullTts": "গেল",
      "icon": "🚶",
    },
    "একটি": {
      "word": "একটি",
      "parts": ["এ", "ক", "ট", "ি"],
      "partsTts": ["এ", "ক", "ট", "হ্রস্ব ই-কার"],
      "fullTts": "একটি",
      "icon": "1️⃣",
    },
    "কলসিতে": {
      "word": "কলসিতে",
      "parts": ["ক", "ল", "স", "ি", "ত", "ে"],
      "partsTts": ["ক", "ল", "দন্ত্য স", "হ্রস্ব ই-কার", "ত", "এ-কার"],
      "fullTts": "কলসিতে",
      "icon": "🏺",
    },
    "অল্প": {
      "word": "অল্প",
      "parts": ["অ", "ল", "্", "প"],
      "partsTts": ["অ", "ল", "প"],
      "fullTts": "অল্প",
      "icon": "🤏",
    },
    "জল": {
      "word": "জল",
      "parts": ["জ", "ল"],
      "partsTts": ["জ", "ল"],
      "fullTts": "জল",
      "icon": "💧",
    },
    "কাকটি": {
      "word": "কাকটি",
      "parts": ["ক", "া", "ক", "ট", "ি"],
      "partsTts": ["ক", "আ-কার", "ক", "ট", "হ্রস্ব ই-কার"],
      "fullTts": "কাকটি",
      "icon": "🦅",
    },
    "বুদ্ধি": {
      "word": "বুদ্ধি",
      "parts": ["ব", "ু", "দ", "্", "ধ", "ি"],
      "partsTts": ["ব", "হ্রস্ব উ-কার", "দ", "ধ", "হ্রস্ব ই-কার"],
      "fullTts": "বুদ্ধি",
      "icon": "💡",
    },
    "করে": {
      "word": "করে",
      "parts": ["ক", "র", "ে"],
      "partsTts": ["ক", "র", "এ-কার"],
      "fullTts": "করে",
      "icon": "⚙️",
    },
    "নুড়ি": {
      "word": "নুড়ি",
      "parts": ["ন", "ু", "ড", "়", "ি"],
      "partsTts": ["দন্ত্য ন", "হ্রস্ব উ-কার", "ড়", "হ্রস্ব ই-কার"],
      "fullTts": "নুড়ি",
      "icon": "🪨",
    },
    "পাথর": {
      "word": "পাথর",
      "parts": ["প", "া", "থ", "র"],
      "partsTts": ["প", "আ-কার", "থ", "র"],
      "fullTts": "পাথর",
      "icon": "🪨",
    },
    "ফেলল": {
      "word": "ফেলল",
      "parts": ["ফ", "ে", "ল", "ল"],
      "partsTts": ["ফ", "এ-কার", "ল", "ল"],
      "fullTts": "ফেলল",
      "icon": "👇",
    },
    "ওপরে": {
      "word": "ওপরে",
      "parts": ["ও", "প", "র", "ে"],
      "partsTts": ["ও", "প", "র", "এ-কার"],
      "fullTts": "ওপরে",
      "icon": "⬆️",
    },
    "উঠে": {
      "word": "উঠে",
      "parts": ["উ", "ঠ", "ে"],
      "partsTts": ["হ্রস্ব উ", "ঠ", "এ-কার"],
      "fullTts": "উঠে",
      "icon": "🔝",
    },
    "এলো": {
      "word": "এলো",
      "parts": ["এ", "ল", "ও"],
      "partsTts": ["এ", "ল", "ও-কার"],
      "fullTts": "এলো",
      "icon": "✨",
    },
    "খেয়ে": {
      "word": "খেয়ে",
      "parts": ["খ", "ে", "য়", "ে"],
      "partsTts": ["খ", "এ-কার", "য়", "এ-কার"],
      "fullTts": "খেয়ে",
      "icon": "😋",
    },
    "খুশি": {
      "word": "খুশি",
      "parts": ["খ", "ু", "শ", "ি"],
      "partsTts": ["খ", "হ্রস্ব উ-কার", "তালব্য শ", "হ্রস্ব ই-কার"],
      "fullTts": "খুশি",
      "icon": "😄",
    },
    "হলো": {
      "word": "হলো",
      "parts": ["হ", "ল", "ও"],
      "partsTts": ["হ", "ল", "ও-কার"],
      "fullTts": "হলো",
      "icon": "🎉",
    },
  };

  @override
  void initState() {
    super.initState();
    _playStory();
  }

  void _playStory() async {
    if (_isPlayingAll) return;
    setState(() => _isPlayingAll = true);
    await _tts.speak(_fullAudio, context: context);
    if (mounted) setState(() => _isPlayingAll = false);
  }

  void _onWordTap(String rawWord) {
    final cleanWord = rawWord.replaceAll(RegExp(r'[।,]'), '');
    final entry = _wordDict[cleanWord];
    if (entry != null) {
      setState(() => _activeBreakdown = entry);
    } else {
      _tts.speak(cleanWord, context: context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ১০: সম্পূর্ণ গল্প", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFFFBBF24)),
            onPressed: _playStory,
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              // Story Illustration & Header
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF713F12), Color(0xFF451A03)], begin: Alignment.topCenter, end: Alignment.bottomCenter),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFCA8A04), width: 3),
                ),
                child: Column(
                  children: [
                    const Text(_storyIcon, style: TextStyle(fontSize: 80)),
                    const SizedBox(height: 10),
                    const Text(_storyTitle, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFCA8A04),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      ),
                      icon: Icon(_isPlayingAll ? Icons.volume_up_rounded : Icons.play_arrow_rounded, color: Colors.black87, size: 28),
                      label: Text(
                        _isPlayingAll ? "গল্পটি চলছে..." : "পুরো গল্প শুনুন",
                        style: const TextStyle(color: Colors.black87, fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      onPressed: _playStory,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Interactive Word Breakdown Container (when any word is tapped)
              if (_activeBreakdown != null) ...[
                WordBreakdownWidget(
                  word: _activeBreakdown!['word'],
                  parts: List<String>.from(_activeBreakdown!['parts']),
                  partsTts: List<String>.from(_activeBreakdown!['partsTts']),
                  fullWordTts: _activeBreakdown!['fullTts'],
                  iconSymbol: _activeBreakdown!['icon'],
                ),
                const SizedBox(height: 16),
              ],

              // Interactive Story Passage with Clickable Words
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.white12, width: 1.5),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.touch_app_rounded, color: Color(0xFFFBBF24), size: 24),
                        SizedBox(width: 8),
                        Text(
                          "যেকোনো শব্দে চাপ দিয়ে বিশ্লেষণ দেখুন:",
                          style: TextStyle(color: Colors.white70, fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 8,
                      runSpacing: 10,
                      children: [
                        for (final word in _storyWords)
                          GestureDetector(
                            onTap: () => _onWordTap(word),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              decoration: BoxDecoration(
                                color: const Color(0xFF334155),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.white24),
                              ),
                              child: Text(
                                word,
                                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Graduation / Trophy Finish Button
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF065F46), Color(0xFF047857)]),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.emoji_events_rounded, color: Colors.amber, size: 60),
                    const SizedBox(height: 8),
                    const Text(
                      "অভিনন্দন! আপনি বাংলা পাঠশালা সম্পন্ন করেছেন!",
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF065F46),
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      icon: const Icon(Icons.home_rounded, size: 28),
                      label: const Text("মূল পাতায় ফিরুন", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;

// -------------------------------------------------------------
// DART DATA MODELS (Strict Exact Binding & 30-Day Curriculum)
// -------------------------------------------------------------
export const FLUTTER_CURRICULUM_MODELS = `// lib/models/curriculum_models.dart

/// Single exact word example strictly mapped to a specific syllable/letter
class ExactWordExample {
  final String word;
  final String icon;
  final String? meaning;
  final String ttsAudio;
  final List<String>? breakdown;

  const ExactWordExample({
    required this.word,
    required this.icon,
    this.meaning,
    required this.ttsAudio,
    this.breakdown,
  });
}

/// Day Curriculum Model for 30-Day Learning Journey (20 minutes/day)
class DayCurriculumItem {
  final int dayNumber; // 1 to 30
  final String bengaliDay; // "দিন ১"
  final String title;
  final String subtitle;
  final String icon;
  final int targetMinutes; // 20
  final int completedMinutes; // 0 to 20
  final bool isUnlocked;
  final bool isCompleted;
  final int mappedLevelId;
  final List<String> focusKeys;
  final String summary;

  const DayCurriculumItem({
    required this.dayNumber,
    required this.bengaliDay,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.targetMinutes = 20,
    this.completedMinutes = 0,
    required this.isUnlocked,
    required this.isCompleted,
    required this.mappedLevelId,
    required this.focusKeys,
    required this.summary,
  });
}
`;

// -------------------------------------------------------------
// DART CURRICULUM REPOSITORY (Scalable Local Architecture)
// -------------------------------------------------------------
export const FLUTTER_CURRICULUM_REPOSITORY = `// lib/repositories/curriculum_repository.dart
import '../models/curriculum_models.dart';

class CurriculumRepository {
  CurriculumRepository._();
  static final CurriculumRepository instance = CurriculumRepository._();

  // STRICT COMPOSITE-KEY LOOKUP MAP FOR CONSONANT + KAR
  // Key is strictly (Consonant + Sign), e.g. 'কা', 'খা', 'গা'
  // Prevents showing 'কাক' for 'খা'!
  static const Map<String, List<ExactWordExample>> _exactKarWordMap = {
    'কা': [
      ExactWordExample(word: 'কাক', icon: '🦅', meaning: 'পাখি', ttsAudio: 'কাক'),
      ExactWordExample(word: 'কাগজ', icon: '📄', meaning: 'লেখার পাতা', ttsAudio: 'কাগজ'),
      ExactWordExample(word: 'কান', icon: '👂', meaning: 'শ্রবণেন্দ্রিয়', ttsAudio: 'কান'),
    ],
    'খা': [
      ExactWordExample(word: 'খাতা', icon: '📓', meaning: 'লেখার খাতা', ttsAudio: 'খাতা'),
      ExactWordExample(word: 'খাবার', icon: '🍲', meaning: 'আহার', ttsAudio: 'খাবার'),
      ExactWordExample(word: 'খাঁচা', icon: '🦜', meaning: 'পাখির খাঁচা', ttsAudio: 'খাঁচা'),
    ],
    'গা': [
      ExactWordExample(word: 'গান', icon: '🎶', meaning: 'সঙ্গীত', ttsAudio: 'গান'),
      ExactWordExample(word: 'গাছ', icon: '🌳', meaning: 'বৃক্ষ', ttsAudio: 'গাছ'),
      ExactWordExample(word: 'গাড়ি', icon: '🚗', meaning: 'যানবাহন', ttsAudio: 'গাড়ি'),
    ],
    'ঘা': [
      ExactWordExample(word: 'ঘাস', icon: '🌱', meaning: 'তৃণ', ttsAudio: 'ঘাস'),
      ExactWordExample(word: 'ঘড়ি', icon: '⏰', meaning: 'সময় নির্দেশক', ttsAudio: 'ঘড়ি'),
    ],
    'চা': [
      ExactWordExample(word: 'চা', icon: '☕', meaning: 'গরম পানীয়', ttsAudio: 'চা'),
      ExactWordExample(word: 'চাবি', icon: '🔑', meaning: 'তালার কাঠি', ttsAudio: 'চাবি'),
      ExactWordExample(word: 'চাদর', icon: '🛏️', meaning: 'বিছানার চাদর', ttsAudio: 'চাদর'),
    ],
    'ছা': [
      ExactWordExample(word: 'ছাতা', icon: '☂️', meaning: 'বৃষ্টির ছাতা', ttsAudio: 'ছাতা'),
      ExactWordExample(word: 'ছাত্র', icon: '🎒', meaning: 'পড়ুয়া', ttsAudio: 'ছাত্র'),
    ],
    'জা': [
      ExactWordExample(word: 'জাম', icon: '🫐', meaning: 'ফল', ttsAudio: 'জাম'),
      ExactWordExample(word: 'জাল', icon: '🕸️', meaning: 'মাছ ধরার জাল', ttsAudio: 'জাল'),
    ],
    'টা': [
      ExactWordExample(word: 'টাকা', icon: '💵', meaning: 'মুদ্রা', ttsAudio: 'টাকা'),
      ExactWordExample(word: 'টমেটো', icon: '🍅', meaning: 'সবজি', ttsAudio: 'টমেটো'),
    ],
    'ডা': [
      ExactWordExample(word: 'ডাল', icon: '🥣', meaning: 'খাবার ডাল', ttsAudio: 'ডাল'),
      ExactWordExample(word: 'ডাক্তার', icon: '🩺', meaning: 'চিকিৎসক', ttsAudio: 'ডাক্তার'),
    ],
    'তা': [
      ExactWordExample(word: 'তালা', icon: '🔒', meaning: 'দরজার তালা', ttsAudio: 'তালা'),
      ExactWordExample(word: 'তারা', icon: '⭐', meaning: 'নক্ষত্র', ttsAudio: 'তারা'),
    ],
    'দা': [
      ExactWordExample(word: 'দাদা', icon: '👴', meaning: 'পিতামহ', ttsAudio: 'দাদা'),
      ExactWordExample(word: 'দালান', icon: '🏢', meaning: 'পাকা ঘর', ttsAudio: 'দালান'),
    ],
    'না': [
      ExactWordExample(word: 'নাম', icon: '🏷️', meaning: 'পরিচয়', ttsAudio: 'নাম'),
      ExactWordExample(word: 'নাক', icon: '👃', meaning: 'নাসিকা', ttsAudio: 'নাক'),
    ],
    'পা': [
      ExactWordExample(word: 'পাখি', icon: '🐦', meaning: 'বিহঙ্গ', ttsAudio: 'পাখি'),
      ExactWordExample(word: 'পাতা', icon: '🍃', meaning: 'গাছের পাতা', ttsAudio: 'পাতা'),
      ExactWordExample(word: 'পাহাড়', icon: '⛰️', meaning: 'পর্বত', ttsAudio: 'পাহাড়'),
    ],
    'বা': [
      ExactWordExample(word: 'বাঘ', icon: '🐅', meaning: 'বনের বাঘ', ttsAudio: 'বাঘ'),
      ExactWordExample(word: 'বাবা', icon: '👨', meaning: 'পিতা', ttsAudio: 'বাবা'),
      ExactWordExample(word: 'বাড়ি', icon: '🏠', meaning: 'গৃহ', ttsAudio: 'বাড়ি'),
    ],
    'ভা': [
      ExactWordExample(word: 'ভাত', icon: '🍚', meaning: 'অন্ন', ttsAudio: 'ভাত'),
      ExactWordExample(word: 'ভালুক', icon: '🐻', meaning: 'পশু', ttsAudio: 'ভালুক'),
    ],
    'মা': [
      ExactWordExample(word: 'মা', icon: '👩', meaning: 'জননী', ttsAudio: 'মা'),
      ExactWordExample(word: 'মাটি', icon: '🪴', meaning: 'মৃত্তিকা', ttsAudio: 'মাটি'),
      ExactWordExample(word: 'মামা', icon: '🧔', meaning: 'মাতুল', ttsAudio: 'মামা'),
    ],
    'রা': [
      ExactWordExample(word: 'রাস্তা', icon: '🛣️', meaning: 'পথ', ttsAudio: 'রাস্তা'),
      ExactWordExample(word: 'রাত', icon: '🌙', meaning: 'রজনী', ttsAudio: 'রাত'),
    ],
    'লা': [
      ExactWordExample(word: 'লাটিম', icon: '🪀', meaning: 'খেলনা', ttsAudio: 'লাটিম'),
      ExactWordExample(word: 'লাল', icon: '🔴', meaning: 'রং', ttsAudio: 'লাল'),
    ],
    'সা': [
      ExactWordExample(word: 'সাদা', icon: '⚪', meaning: 'শুভ্র', ttsAudio: 'সাদা'),
      ExactWordExample(word: 'সাবান', icon: '🧼', meaning: 'পরিষ্কারক', ttsAudio: 'সাবান'),
    ],
    'হা': [
      ExactWordExample(word: 'হাত', icon: '✋', meaning: 'হস্ত', ttsAudio: 'হাত'),
      ExactWordExample(word: 'হাঁস', icon: '🦆', meaning: 'পাখি', ttsAudio: 'হাঁস'),
    ],
    'কি': [
      ExactWordExample(word: 'কিশোর', icon: '👦', meaning: 'বালক', ttsAudio: 'কিশোর'),
      ExactWordExample(word: 'কিনারা', icon: '🌊', meaning: 'নদীর পাড়', ttsAudio: 'কিনারা'),
    ],
    'চি': [
      ExactWordExample(word: 'চিঠি', icon: '✉️', meaning: 'পত্র', ttsAudio: 'চিঠি'),
      ExactWordExample(word: 'চিরুনি', icon: '🪮', meaning: 'কাকই', ttsAudio: 'চিরুনি'),
    ],
    'টি': [
      ExactWordExample(word: 'টিয়া', icon: '🦜', meaning: 'সবুজ পাখি', ttsAudio: 'টিয়া'),
      ExactWordExample(word: 'টিকেট', icon: '🎟️', meaning: 'টিকিট', ttsAudio: 'টিকেট'),
    ],
    'দি': [
      ExactWordExample(word: 'দিন', icon: '☀️', meaning: 'দিবস', ttsAudio: 'দিন'),
      ExactWordExample(word: 'দিঘি', icon: '🌊', meaning: 'বড় জলাশয়', ttsAudio: 'দিঘি'),
    ],
    'কু': [
      ExactWordExample(word: 'কুকুর', icon: '🐕', meaning: 'পোষা প্রাণী', ttsAudio: 'কুকুর'),
      ExactWordExample(word: 'কুঁড়ে', icon: '🛖', meaning: 'ছোট ঘর', ttsAudio: 'কুঁড়ে'),
    ],
    'খু': [
      ExactWordExample(word: 'খুশি', icon: '😊', meaning: 'আনন্দ', ttsAudio: 'খুশি'),
    ],
    'গু': [
      ExactWordExample(word: 'গুড়', icon: '🍯', meaning: 'মিষ্টি গুড়', ttsAudio: 'গুড়'),
      ExactWordExample(word: 'গুহা', icon: '🕳️', meaning: 'গহ্বর', ttsAudio: 'গুহা'),
    ],
    'গী': [
      ExactWordExample(word: 'গীত', icon: '🎵', meaning: 'গান', ttsAudio: 'গীত'),
      ExactWordExample(word: 'গীতা', icon: '📖', meaning: 'পবিত্র গীতা', ttsAudio: 'গীতা'),
      ExactWordExample(word: 'গীতিকা', icon: '🎶', meaning: 'ছোট গান', ttsAudio: 'গীতিকা'),
    ],
    'গূ': [
      ExactWordExample(word: 'গূঢ়', icon: '🔍', meaning: 'গভীর রহস্য', ttsAudio: 'গূঢ়'),
    ],
    'গৃ': [
      ExactWordExample(word: 'গৃহ', icon: '🏠', meaning: 'বাসস্থান', ttsAudio: 'গৃহ'),
      ExactWordExample(word: 'গৃহপালিত', icon: '🐕', meaning: 'পোষা', ttsAudio: 'গৃহপালিত'),
      ExactWordExample(word: 'গৃহিণী', icon: '👩', meaning: 'ঘরের কর্ত্রী', ttsAudio: 'গৃহিণী'),
    ],
    'গে': [
      ExactWordExample(word: 'গেন্দাফুল', icon: '🌼', meaning: 'ফুল', ttsAudio: 'গেন্দাফুল'),
      ExactWordExample(word: 'গেঞ্জি', icon: '👕', meaning: 'পোশাক', ttsAudio: 'গেঞ্জি'),
      ExactWordExample(word: 'গেরুয়া', icon: '🟤', meaning: 'রঙ', ttsAudio: 'গেরুয়া'),
    ],
    'গৈ': [
      ExactWordExample(word: 'গৈরিক', icon: '🟤', meaning: 'গেরুয়া মাটি', ttsAudio: 'গৈরিক'),
    ],
    'গো': [
      ExactWordExample(word: 'গোলাপ', icon: '🌹', meaning: 'ফুল', ttsAudio: 'গোলাপ'),
      ExactWordExample(word: 'গোল', icon: '⚽', meaning: 'বৃত্তাকার', ttsAudio: 'গোল'),
      ExactWordExample(word: 'গোরু', icon: '🐄', meaning: 'গরু', ttsAudio: 'গোরু'),
    ],
    'গৌ': [
      ExactWordExample(word: 'গৌরব', icon: '👑', meaning: 'মর্যাদা', ttsAudio: 'গৌরব'),
      ExactWordExample(word: 'গৌণ', icon: '📉', meaning: 'কম প্রধান', ttsAudio: 'গৌণ'),
    ],
  };

  // STRICT PHALA LOOKUP MAP (Expanded 10-12 verified words per Phala)
  static const Map<String, List<ExactWordExample>> _exactPhalaWordMap = {
    'য-ফলা': [
      ExactWordExample(word: 'বাক্য', icon: '💬', meaning: 'মনের ভাব প্রকাশ', ttsAudio: 'বাক্য', breakdown: ['ব', 'া', 'ক', '্', 'য']),
      ExactWordExample(word: 'সত্য', icon: '⚖️', meaning: 'সততা', ttsAudio: 'সত্য', breakdown: ['স', 'ত', '্', 'য']),
      ExactWordExample(word: 'বিদ্যা', icon: '📚', meaning: 'জ্ঞান শিক্ষা', ttsAudio: 'বিদ্যা', breakdown: ['ব', 'ি', 'দ', '্', 'য', 'া']),
      ExactWordExample(word: 'গদ্য', icon: '📖', meaning: 'গল্প পাঠ', ttsAudio: 'গদ্য', breakdown: ['গ', 'দ', '্', 'য']),
      ExactWordExample(word: 'পদ্য', icon: '📜', meaning: 'কবিতা', ttsAudio: 'পদ্য', breakdown: ['প', 'দ', '্', 'য']),
      ExactWordExample(word: 'জন্য', icon: '🎁', meaning: 'কারণে', ttsAudio: 'জন্য', breakdown: ['জ', 'ন', '্', 'য']),
      ExactWordExample(word: 'ধন্য', icon: '🙏', meaning: 'কৃতার্থ', ttsAudio: 'ধন্য', breakdown: ['ধ', 'ন', '্', 'য']),
      ExactWordExample(word: 'বন্যা', icon: '🌊', meaning: 'প্লাবন', ttsAudio: 'বন্যা', breakdown: ['ব', 'ন', '্', 'য', 'া']),
      ExactWordExample(word: 'কন্যা', icon: '👧', meaning: 'মেয়ে', ttsAudio: 'কন্যা', breakdown: ['ক', 'ন', '্', 'য', 'া']),
      ExactWordExample(word: 'বন্য', icon: '🌲', meaning: 'অরণ্যের', ttsAudio: 'বন্য', breakdown: ['ব', 'ন', '্', 'য']),
      ExactWordExample(word: 'খাদ্য', icon: '🍲', meaning: 'আহার', ttsAudio: 'খাদ্য', breakdown: ['খ', 'া', 'দ', '্', 'য']),
      ExactWordExample(word: 'বাদ্য', icon: '🥁', meaning: 'বাজনা', ttsAudio: 'বাদ্য', breakdown: ['ব', 'া', 'দ', '্', 'য']),
    ],
    'র-ফলা': [
      ExactWordExample(word: 'গ্রাম', icon: '🏡', meaning: 'পল্লী গাঁ', ttsAudio: 'গ্রাম', breakdown: ['গ', '্', 'র', 'া', 'ম']),
      ExactWordExample(word: 'ছাত্র', icon: '🎒', meaning: 'পড়ুয়া', ttsAudio: 'ছাত্র', breakdown: ['ছ', 'া', 'ত', '্', 'র']),
      ExactWordExample(word: 'প্রথম', icon: '🥇', meaning: 'এক নম্বর', ttsAudio: 'প্রথম', breakdown: ['প', '্', 'র', 'থ', 'ম']),
      ExactWordExample(word: 'গ্রহ', icon: '🪐', meaning: 'মহাকাশের গ্রহ', ttsAudio: 'গ্রহ', breakdown: ['গ', '্', 'র', 'হ']),
      ExactWordExample(word: 'প্রাণ', icon: '❤️', meaning: 'জীবন', ttsAudio: 'প্রাণ', breakdown: ['প', '্', 'র', 'া', 'ণ']),
      ExactWordExample(word: 'ঘ্রাণ', icon: '👃', meaning: 'সুগন্ধ', ttsAudio: 'ঘ্রাণ', breakdown: ['ঘ', '্', 'র', 'া', 'ণ']),
      ExactWordExample(word: 'শুভ্র', icon: '⚪', meaning: 'সাদা', ttsAudio: 'শুভ্র', breakdown: ['শ', 'ু', 'ভ', '্', 'র']),
      ExactWordExample(word: 'নম্র', icon: '🙇', meaning: 'বিনয়ী', ttsAudio: 'নম্র', breakdown: ['ন', 'ম', '্', 'র']),
      ExactWordExample(word: 'বজ্র', icon: '⚡', meaning: 'বিদ্যুৎ', ttsAudio: 'বজ্র', breakdown: ['ব', 'জ', '্', 'র']),
      ExactWordExample(word: 'চক্র', icon: '⚙️', meaning: 'চাকা', ttsAudio: 'চক্র', breakdown: ['চ', 'ক', '্', 'র']),
      ExactWordExample(word: 'বক্র', icon: '〰️', meaning: 'বাঁকা', ttsAudio: 'বক্র', breakdown: ['ব', 'ক', '্', 'র']),
      ExactWordExample(word: 'গ্রাস', icon: '🍽️', meaning: 'খাবারের লোকমা', ttsAudio: 'গ্রাস', breakdown: ['গ', '্', 'র', 'া', 'স']),
    ],
    'ল-ফলা': [
      ExactWordExample(word: 'গ্লাস', icon: '🥛', meaning: 'জলপাত্র', ttsAudio: 'গ্লাস', breakdown: ['গ', '্', 'ল', 'া', 'স']),
      ExactWordExample(word: 'ক্লান্ত', icon: '😴', meaning: 'পরিশ্রান্ত', ttsAudio: 'ক্লান্ত', breakdown: ['ক', '্', 'ল', 'া', 'ন', '্', 'ত']),
      ExactWordExample(word: 'শ্লোক', icon: '📜', meaning: 'বাণী', ttsAudio: 'শ্লোক', breakdown: ['শ', '্', 'ল', 'ো', 'ক']),
      ExactWordExample(word: 'ম্লান', icon: '🥀', meaning: 'মলিন', ttsAudio: 'ম্লান', breakdown: ['ম', '্', 'ল', 'া', 'ন']),
      ExactWordExample(word: 'অম্ল', icon: '🍋', meaning: 'টক স্বাদ', ttsAudio: 'অম্ল', breakdown: ['অ', 'ম', '্', 'ল']),
      ExactWordExample(word: 'বিপ্লব', icon: '✊', meaning: 'আন্দোলন', ttsAudio: 'বিপ্লব', breakdown: ['ব', 'ি', 'প', '্', 'ল', 'ব']),
      ExactWordExample(word: 'প্লাবন', icon: '🌊', meaning: 'বন্যা জোয়ার', ttsAudio: 'প্লাবন', breakdown: ['প', '্', 'ল', 'া', 'ব', 'ন']),
      ExactWordExample(word: 'ক্লাস', icon: '🏫', meaning: 'শ্রেণিকক্ষ', ttsAudio: 'ক্লাস', breakdown: ['ক', '্', 'ল', 'া', 'স']),
      ExactWordExample(word: 'উল্লাস', icon: '🎉', meaning: 'আনন্দ', ttsAudio: 'উল্লাস', breakdown: ['উ', 'ল', '্', 'ল', 'া', 'স']),
      ExactWordExample(word: 'পল্লব', icon: '🍃', meaning: 'কচি পাতা', ttsAudio: 'পল্লব', breakdown: ['প', 'ল', '্', 'ল', 'ব']),
      ExactWordExample(word: 'শুক্ল', icon: '🌕', meaning: 'শুভ্র আলো', ttsAudio: 'শুক্ল', breakdown: ['শ', 'ু', 'ক', '্', 'ল']),
      ExactWordExample(word: 'শ্লেষ্মা', icon: '🤧', meaning: 'কফ সর্দি', ttsAudio: 'শ্লেষ্মা', breakdown: ['শ', '্', 'ল', 'ে', 'ষ', '্', 'ম', 'া']),
    ],
    'ব-ফলা': [
      ExactWordExample(word: 'অশ্ব', icon: '🐎', meaning: 'ঘোড়া', ttsAudio: 'অশ্ব', breakdown: ['অ', 'শ', '্', 'ব']),
      ExactWordExample(word: 'দ্বীপ', icon: '🏝️', meaning: 'জলের মাঝে জমি', ttsAudio: 'দ্বীপ', breakdown: ['দ', '্', 'ব', 'ী', 'প']),
      ExactWordExample(word: 'দ্বার', icon: '🚪', meaning: 'দরজা', ttsAudio: 'দ্বার', breakdown: ['দ', '্', 'ব', 'া', 'র']),
      ExactWordExample(word: 'বিশ্বাস', icon: '🤝', meaning: 'আস্থা', ttsAudio: 'বিশ্বাস', breakdown: ['ব', 'ি', 'শ', '্', 'ব', 'া', 'স']),
      ExactWordExample(word: 'ধ্বনি', icon: '🔔', meaning: 'শব্দ সুর', ttsAudio: 'ধ্বনি', breakdown: ['ধ', '্', 'ব', 'ন', 'ি']),
      ExactWordExample(word: 'স্বাদ', icon: '👅', meaning: 'রসাস্বাদন', ttsAudio: 'স্বাদ', breakdown: ['স', '্', 'ব', 'া', 'দ']),
      ExactWordExample(word: 'জ্বর', icon: '🤒', meaning: 'তাপমাত্রা', ttsAudio: 'জ্বর', breakdown: ['জ', '্', 'ব', 'র']),
      ExactWordExample(word: 'স্বপ্ন', icon: '💭', meaning: 'ঘুমের দেখা', ttsAudio: 'স্বপ্ন', breakdown: ['স', '্', 'ব', 'প', '্', 'ন']),
      ExactWordExample(word: 'স্বদেশ', icon: '🇧🇩', meaning: 'নিজের দেশ', ttsAudio: 'স্বদেশ', breakdown: ['স', '্', 'ব', 'দ', 'ে', 'শ']),
      ExactWordExample(word: 'ঈশ্বর', icon: '✨', meaning: 'স্রষ্টা', ttsAudio: 'ঈশ্বর', breakdown: ['ঈ', 'শ', '্', 'ব', 'র']),
      ExactWordExample(word: 'স্বাধীন', icon: '🕊️', meaning: 'মুক্ত', ttsAudio: 'স্বাধীন', breakdown: ['স', '্', 'ব', 'া', 'ধ', 'ী', 'ন']),
      ExactWordExample(word: 'অস্বস্তি', icon: '😣', meaning: 'অশান্তি', ttsAudio: 'অস্বস্তি', breakdown: ['অ', 'স', '্', 'ব', 'স', '্', 'ত', 'ি']),
    ],
    'ম-ফলা': [
      ExactWordExample(word: 'পদ্ম', icon: '🪷', meaning: 'পদ্মফুল', ttsAudio: 'পদ্ম', breakdown: ['প', 'দ', '্', 'ম']),
      ExactWordExample(word: 'ভস্ম', icon: '🌫️', meaning: 'ছাই', ttsAudio: 'ভস্ম', breakdown: ['ভ', 'স', '্', 'ম']),
      ExactWordExample(word: 'স্মৃতি', icon: '🧠', meaning: 'মনে রাখা', ttsAudio: 'স্মৃতি', breakdown: ['স', '্', 'ম', 'ৃ', 'ত', 'ি']),
      ExactWordExample(word: 'স্মরণ', icon: '💭', meaning: 'মনে করা', ttsAudio: 'স্মরণ', breakdown: ['স', '্', 'ম', 'র', 'ণ']),
      ExactWordExample(word: 'আত্মা', icon: '👻', meaning: 'প্রাণ', ttsAudio: 'আত্মা', breakdown: ['আ', 'ত', '্', 'ম', 'া']),
      ExactWordExample(word: 'বিস্ময়', icon: '😲', meaning: 'অবাক হওয়া', ttsAudio: 'বিস্ময়', breakdown: ['ব', 'ি', 'স', '্', 'ম', 'য', '়']),
      ExactWordExample(word: 'রশ্মি', icon: '💡', meaning: 'আলোর রেখা', ttsAudio: 'রশ্মি', breakdown: ['র', 'শ', '্', 'ম', 'ি']),
      ExactWordExample(word: 'গ্রীষ্ম', icon: '☀️', meaning: 'গরম কাল', ttsAudio: 'গ্রীষ্ম', breakdown: ['গ', '্', 'র', 'ী', 'ষ', '্', 'ম']),
      ExactWordExample(word: 'ভীষ্ম', icon: '🏹', meaning: 'বীর যোদ্ধা', ttsAudio: 'ভীষ্ম', breakdown: ['ভ', 'ী', 'ষ', '্', 'ম']),
      ExactWordExample(word: 'আকস্মিক', icon: '⚡', meaning: 'হঠাৎ', ttsAudio: 'আকস্মিক', breakdown: ['আ', 'ক', 'স', '্', 'ম', 'ি', 'ক']),
      ExactWordExample(word: 'মহাত্মা', icon: '🧘', meaning: 'মহান ব্যক্তি', ttsAudio: 'মহাত্মা', breakdown: ['ম', 'হ', 'া', 'ত', '্', 'ম', 'া']),
      ExactWordExample(word: 'ছদ্ম', icon: '🎭', meaning: 'ভেক বেশ', ttsAudio: 'ছদ্ম', breakdown: ['ছ', 'দ', '্', 'ম']),
    ],
    'ন-ফলা': [
      ExactWordExample(word: 'অগ্নি', icon: '🔥', meaning: 'আগুন', ttsAudio: 'অগ্নি', breakdown: ['অ', 'গ', '্', 'ন', 'ি']),
      ExactWordExample(word: 'রত্ন', icon: '💎', meaning: 'মণিমাণিক্য', ttsAudio: 'রত্ন', breakdown: ['র', 'ত', '্', 'ন']),
      ExactWordExample(word: 'যত্ন', icon: '🤲', meaning: 'আদর সেবা', ttsAudio: 'যত্ন', breakdown: ['য', 'ত', '্', 'ন']),
      ExactWordExample(word: 'রান্না', icon: '🍳', meaning: 'পাক করা', ttsAudio: 'রান্না', breakdown: ['র', 'া', 'ন', '্', 'ন', 'া']),
      ExactWordExample(word: 'অন্ন', icon: '🍚', meaning: 'ভাত', ttsAudio: 'অন্ন', breakdown: ['অ', 'ন', '্', 'ন']),
      ExactWordExample(word: 'কৃষ্ণ', icon: '🦚', meaning: 'কালো বা শ্যামল', ttsAudio: 'কৃষ্ণ', breakdown: ['ক', 'ৃ', 'ষ', '্', 'ণ']),
      ExactWordExample(word: 'মধ্যাহ্ন', icon: '☀️', meaning: 'দুপুরবেলা', ttsAudio: 'মধ্যাহ্ন', breakdown: ['ম', 'ধ', '্', 'য', 'া', 'হ', '্', 'ন']),
      ExactWordExample(word: 'পূর্বাহ্ন', icon: '🌅', meaning: 'সকালবেলা', ttsAudio: 'পূর্বাহ্ন', breakdown: ['প', 'ূ', 'র', '্', 'ব', 'া', 'হ', '্', 'ণ']),
      ExactWordExample(word: 'বিঘ্ন', icon: '🛑', meaning: 'বাধা', ttsAudio: 'বিঘ্ন', breakdown: ['ব', 'ি', 'ঘ', '্', 'ন']),
      ExactWordExample(word: 'ভগ্ন', icon: '🔨', meaning: 'ভাঙা', ttsAudio: 'ভগ্ন', breakdown: ['ভ', 'গ', '্', 'ন']),
      ExactWordExample(word: 'চিহ্ন', icon: '📍', meaning: 'নিদর্শন', ttsAudio: 'চিহ্ন', breakdown: ['চ', 'ি', 'হ', '্', 'ন']),
      ExactWordExample(word: 'তৃষ্ণা', icon: '💧', meaning: 'পিপাসা', ttsAudio: 'তৃষ্ণা', breakdown: ['ত', 'ৃ', 'ষ', '্', 'ণ', 'া']),
    ],
    'রেফ': [
      ExactWordExample(word: 'কর্ম', icon: '🛠️', meaning: 'কাজ', ttsAudio: 'কর্ম', breakdown: ['ক', 'র', '্', 'ম']),
      ExactWordExample(word: 'ধর্ম', icon: '🛕', meaning: 'নীতি', ttsAudio: 'ধর্ম', breakdown: ['ধ', 'র', '্', 'ম']),
      ExactWordExample(word: 'বর্ণ', icon: '🔤', meaning: 'অক্ষর', ttsAudio: 'বর্ণ', breakdown: ['ব', 'র', '্', 'ণ']),
      ExactWordExample(word: 'সূর্য', icon: '☀️', meaning: 'রবি', ttsAudio: 'সূর্য', breakdown: ['স', 'ূ', 'র', '্', 'য']),
      ExactWordExample(word: 'পূর্ব', icon: '🧭', meaning: 'পূর্ব দিক', ttsAudio: 'পূর্ব', breakdown: ['প', 'ূ', 'র', '্', 'ব']),
      ExactWordExample(word: 'পর্বত', icon: '⛰️', meaning: 'পাহাড়', ttsAudio: 'পর্বত', breakdown: ['প', 'র', '্', 'ব', 'ত']),
      ExactWordExample(word: 'অর্থ', icon: '💰', meaning: 'টাকাকড়ি', ttsAudio: 'অর্থ', breakdown: ['অ', 'র', '্', 'থ']),
      ExactWordExample(word: 'তর্ক', icon: '🗣️', meaning: 'যুক্তি লড়াই', ttsAudio: 'তর্ক', breakdown: ['ত', 'র', '্', 'ক']),
      ExactWordExample(word: 'গর্ত', icon: '🕳️', meaning: 'খাত', ttsAudio: 'গর্ত', breakdown: ['গ', 'র', '্', 'ত']),
      ExactWordExample(word: 'শর্ত', icon: '📜', meaning: 'নিয়ম চুক্তি', ttsAudio: 'শর্ত', breakdown: ['শ', 'র', '্', 'ত']),
      ExactWordExample(word: 'চর্ম', icon: '👞', meaning: 'চামড়া', ttsAudio: 'চর্ম', breakdown: ['চ', 'র', '্', 'ম']),
      ExactWordExample(word: 'সর্প', icon: '🐍', meaning: 'সাপ', ttsAudio: 'সর্প', breakdown: ['স', 'র', '্', 'প']),
    ],
  };

  // STRICT JUKTAKKHOR LOOKUP MAP (Levels 4 & 5)
  static const Map<String, List<ExactWordExample>> _exactJuktakkhorWordMap = {
    'ক্ত': [
      ExactWordExample(word: 'রক্ত', icon: '🩸', meaning: 'লোহিত রক্ত', ttsAudio: 'রক্ত', breakdown: ['র', 'ক', '্', 'ত']),
      ExactWordExample(word: 'শক্ত', icon: '🪨', meaning: 'কঠিন', ttsAudio: 'শক্ত', breakdown: ['শ', 'ক', '্', 'ত']),
      ExactWordExample(word: 'ভক্ত', icon: '🙏', meaning: 'অনুরাগী', ttsAudio: 'ভক্ত', breakdown: ['ভ', 'ক', '্', 'ত']),
      ExactWordExample(word: 'মুক্ত', icon: '🕊️', meaning: 'স্বাধীন', ttsAudio: 'মুক্ত', breakdown: ['ম', 'ু', 'ক', '্', 'ত']),
      ExactWordExample(word: 'যুক্তি', icon: '💡', meaning: 'বুদ্ধি যুক্তি', ttsAudio: 'যুক্তি', breakdown: ['য', 'ু', 'ক', '্', 'ত', 'ি']),
      ExactWordExample(word: 'ভক্তি', icon: '🤲', meaning: 'শ্রদ্ধা ভক্তি', ttsAudio: 'ভক্তি', breakdown: ['ভ', 'ক', '্', 'ত', 'ি']),
      ExactWordExample(word: 'শক্তি', icon: '⚡', meaning: 'বল ক্ষমতা', ttsAudio: 'শক্তি', breakdown: ['শ', 'ক', '্', 'ত', 'ি']),
      ExactWordExample(word: 'তক্তা', icon: '🪵', meaning: 'কাঠের তক্তা', ttsAudio: 'তক্তা', breakdown: ['ত', 'ক', '্', 'ত', 'া']),
    ],
    'ক্ষ': [
      ExactWordExample(word: 'ক্ষমা', icon: '🕊️', meaning: 'মাফ করা', ttsAudio: 'ক্ষমা', breakdown: ['ক', '্', 'ষ', 'ম', 'া']),
      ExactWordExample(word: 'ক্ষতি', icon: '📉', meaning: 'লোকসান', ttsAudio: 'ক্ষতি', breakdown: ['ক', '্', 'ষ', 'ত', 'ি']),
      ExactWordExample(word: 'পরীক্ষা', icon: '📝', meaning: 'যাচাই', ttsAudio: 'পরীক্ষা', breakdown: ['প', 'র', 'ী', 'ক', '্', 'ষ', 'া']),
      ExactWordExample(word: 'শিক্ষা', icon: '📖', meaning: 'বিদ্যাচর্চা', ttsAudio: 'শিক্ষা', breakdown: ['শ', 'ি', 'ক', '্', 'ষ', 'া']),
      ExactWordExample(word: 'বৃক্ষ', icon: '🌳', meaning: 'বড় গাছ', ttsAudio: 'বৃক্ষ', breakdown: ['ব', 'ৃ', 'ক', '্', 'ষ']),
      ExactWordExample(word: 'যক্ষ', icon: '👺', meaning: 'পৌরাণিক জীব', ttsAudio: 'যক্ষ', breakdown: ['য', 'ক', '্', 'ষ']),
      ExactWordExample(word: 'রক্ষক', icon: '🛡️', meaning: 'যে রক্ষা করে', ttsAudio: 'রক্ষক', breakdown: ['র', 'ক', '্', 'ষ', 'ক']),
      ExactWordExample(word: 'ভক্ষক', icon: '🦁', meaning: 'যে ভক্ষণ করে', ttsAudio: 'ভক্ষক', breakdown: ['ভ', 'ক', '্', 'ষ', 'ক']),
      ExactWordExample(word: 'পক্ষী', icon: '🐦', meaning: 'পাখি', ttsAudio: 'পক্ষী', breakdown: ['প', 'ক', '্', 'ষ', 'ী']),
      ExactWordExample(word: 'দক্ষিণ', icon: '🧭', meaning: 'দক্ষিণ দিক', ttsAudio: 'দক্ষিণ', breakdown: ['দ', 'ক', '্', 'ষ', 'ি', 'ণ']),
    ],
    'ঙ্গ': [
      ExactWordExample(word: 'অঙ্গ', icon: '💪', meaning: 'শরীরের অঙ্গ', ttsAudio: 'অঙ্গ', breakdown: ['অ', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'বঙ্গ', icon: '🇧🇩', meaning: 'বাংলা', ttsAudio: 'বঙ্গ', breakdown: ['ব', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'গঙ্গা', icon: '🌊', meaning: 'পবিত্র নদী', ttsAudio: 'গঙ্গা', breakdown: ['গ', 'ঙ', '্', 'গ', 'া']),
      ExactWordExample(word: 'সঙ্গ', icon: '👥', meaning: 'সাথী মেলবন্ধন', ttsAudio: 'সঙ্গ', breakdown: ['স', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'দাঙ্গা', icon: '💥', meaning: 'সংঘর্ষ', ttsAudio: 'দাঙ্গা', breakdown: ['দ', 'া', 'ঙ', '্', 'গ', 'া']),
      ExactWordExample(word: 'রঙ্গ', icon: '🎭', meaning: 'মজার অভিনয়', ttsAudio: 'রঙ্গ', breakdown: ['র', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'লবঙ্গ', icon: '🌿', meaning: 'সুগন্ধি মসলা', ttsAudio: 'লবঙ্গ', breakdown: ['ল', 'ব', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'সুড়ঙ্গ', icon: '🚇', meaning: 'মাটির তলপথ', ttsAudio: 'সুড়ঙ্গ', breakdown: ['স', 'ু', 'ড়', 'ঙ', '্', 'গ']),
      ExactWordExample(word: 'জঙ্গল', icon: '🌴', meaning: 'অরণ্য বন', ttsAudio: 'জঙ্গল', breakdown: ['জ', 'ঙ', '্', 'গ', 'ল']),
    ],
    'ন্দ': [
      ExactWordExample(word: 'আনন্দ', icon: '🎉', meaning: 'খুশি উল্লাস', ttsAudio: 'আনন্দ', breakdown: ['আ', 'ন', 'ন', '্', 'দ']),
      ExactWordExample(word: 'সুন্দর', icon: '🌸', meaning: 'মনোরম রূপসী', ttsAudio: 'সুন্দর', breakdown: ['স', 'ু', 'ন', '্', 'দ', 'র']),
      ExactWordExample(word: 'ছন্দ', icon: '🎶', meaning: 'কবিতার তাল', ttsAudio: 'ছন্দ', breakdown: ['ছ', 'ন', '্', 'দ']),
      ExactWordExample(word: 'মন্দ', icon: '👎', meaning: 'খারাপ ধীর', ttsAudio: 'মন্দ', breakdown: ['ম', 'ন', '্', 'দ']),
      ExactWordExample(word: 'বিন্দু', icon: '🔘', meaning: 'ফোঁটা কণা', ttsAudio: 'বিন্দু', breakdown: ['ব', 'ি', 'ন', '্', 'দ', 'ু']),
      ExactWordExample(word: 'সিন্দুক', icon: '📦', meaning: 'ধনের বাক্স', ttsAudio: 'সিন্দুক', breakdown: ['স', 'ি', 'ন', '্', 'দ', 'ু', 'ক']),
      ExactWordExample(word: 'চন্দন', icon: '🪵', meaning: 'সুগন্ধি কাঠ', ttsAudio: 'চন্দন', breakdown: ['চ', 'ন', '্', 'দ', 'ন']),
      ExactWordExample(word: 'নন্দন', icon: '🌺', meaning: 'কানন বাগান', ttsAudio: 'নন্দন', breakdown: ['ন', 'ন', '্', 'দ', 'ন']),
    ],
    'স্ট্র': [
      ExactWordExample(word: 'স্ট্রোক', icon: '💓', meaning: 'হৃদরোগের আঘাত', ttsAudio: 'স্ট্রোক', breakdown: ['স', '্', 'ট', '্', 'র', 'ো', 'ক']),
      ExactWordExample(word: 'স্ট্রাইক', icon: '⚡', meaning: 'বলের মোক্ষম আঘাত', ttsAudio: 'স্ট্রাইক', breakdown: ['স', '্', 'ট', '্', 'র', 'া', 'ই', 'ক']),
      ExactWordExample(word: 'স্ট্রিট', icon: '🛣️', meaning: 'রাস্তা গলি', ttsAudio: 'স্ট্রিট', breakdown: ['স', '্', 'ট', '্', 'র', 'ি', 'ট']),
      ExactWordExample(word: 'স্ট্র', icon: '🥤', meaning: 'পানীয়ের নল', ttsAudio: 'স্ট্র', breakdown: ['স', '্', 'ট', '্', 'র']),
      ExactWordExample(word: 'স্ট্রবেরি', icon: '🍓', meaning: 'মিষ্টি লাল ফল', ttsAudio: 'স্ট্রবেরি', breakdown: ['স', '্', 'ট', '্', 'র', 'ব', 'ে', 'র', 'ি']),
    ],
  };

  /// Retrieves strictly exact words for a consonant and kar sign combination
  List<ExactWordExample> getExactKarExamples(String consonant, String karSign) {
    final String key = '\${consonant}\${karSign}';
    return _exactKarWordMap[key] ?? const [];
  }

  /// Whether "আরও উদাহরণ" button should be displayed
  bool hasMoreKarExamples(String consonant, String karSign) {
    final list = getExactKarExamples(consonant, karSign);
    return list.length > 1;
  }

  /// Retrieves strictly exact words for phala combination
  List<ExactWordExample> getExactPhalaExamples(String consonant, String phalaSign) {
    if (phalaSign.contains('য') || phalaSign == '্য') return _exactPhalaWordMap['য-ফলা'] ?? const [];
    if (phalaSign.contains('র') || phalaSign == '্র') return _exactPhalaWordMap['র-ফলা'] ?? const [];
    if (phalaSign.contains('ল') || phalaSign == '্ল') return _exactPhalaWordMap['ল-ফলা'] ?? const [];
    if (phalaSign.contains('ব') || phalaSign == '্ব') return _exactPhalaWordMap['ব-ফলা'] ?? const [];
    if (phalaSign.contains('ম') || phalaSign == '্ম') return _exactPhalaWordMap['ম-ফলা'] ?? const [];
    if (phalaSign.contains('ন') || phalaSign.contains('ণ') || phalaSign == '্ন' || phalaSign == '্ণ') return _exactPhalaWordMap['ন-ফলা'] ?? const [];
    if (phalaSign.contains('রেফ') || phalaSign == 'র্') return _exactPhalaWordMap['রেফ'] ?? const [];
    return const [];
  }

  bool hasMorePhalaExamples(String consonant, String phalaSign) {
    final list = getExactPhalaExamples(consonant, phalaSign);
    return list.length > 1;
  }

  /// Retrieves strictly exact words for juktakkhor combination
  List<ExactWordExample> getExactJuktakkhorExamples(String conjunct) {
    return _exactJuktakkhorWordMap[conjunct] ?? const [];
  }

  bool hasMoreJuktakkhorExamples(String conjunct) {
    final list = getExactJuktakkhorExamples(conjunct);
    return list.length > 1;
  }
}
`;

// -------------------------------------------------------------
// DART PROGRESS PROVIDER (Supporting 30-Day Multi-Day & 20-Min Tracking)
// -------------------------------------------------------------
export const FLUTTER_PROGRESS_PROVIDER_30_DAYS = `// lib/providers/progress_provider.dart
import 'package:flutter/foundation.dart';

class ProgressProvider extends ChangeNotifier {
  int _highestUnlockedLevel = 1;
  int _highestUnlockedDay = 1;
  int _currentSelectedDay = 1;
  final Map<int, int> _dailyMinutesSpent = {1: 0};
  final Set<int> _completedDays = {};

  int get highestUnlockedLevel => _highestUnlockedLevel;
  int get highestUnlockedDay => _highestUnlockedDay;
  int get currentSelectedDay => _currentSelectedDay;
  Set<int> get completedDays => _completedDays;

  int getMinutesSpentForDay(int day) => _dailyMinutesSpent[day] ?? 0;

  bool isDayUnlocked(int day) => day <= _highestUnlockedDay;
  bool isDayCompleted(int day) => _completedDays.contains(day);

  void selectDay(int day) {
    if (isDayUnlocked(day)) {
      _currentSelectedDay = day;
      notifyListeners();
    }
  }

  /// Add practice minutes to today's 20-minute target
  void addPracticeMinutes(int day, int minutes) {
    final current = _dailyMinutesSpent[day] ?? 0;
    final updated = (current + minutes).clamp(0, 20);
    _dailyMinutesSpent[day] = updated;

    if (updated >= 20 && !_completedDays.contains(day)) {
      _completedDays.add(day);
      if (day == _highestUnlockedDay && _highestUnlockedDay < 30) {
        _highestUnlockedDay++;
      }
    }
    notifyListeners();
  }

  void unlockLevel(int level) {
    if (level > _highestUnlockedLevel && level <= 10) {
      _highestUnlockedLevel = level;
      notifyListeners();
    }
  }

  void unlockNextDay() {
    if (_highestUnlockedDay < 30) {
      _highestUnlockedDay++;
      notifyListeners();
    }
  }
}
`;

// -------------------------------------------------------------
// DART LEVEL 2 KAR SCREEN (FIXED: Exact Binding & Safe Button)
// -------------------------------------------------------------
export const FLUTTER_LEVEL2_KAR_SCREEN_FIXED = `// lib/screens/level2_kar_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../repositories/curriculum_repository.dart';
import '../services/tts_service.dart';
import '../models/curriculum_models.dart';

class Level2KarScreenFixed extends StatefulWidget {
  const Level2KarScreenFixed({super.key});

  @override
  State<Level2KarScreenFixed> createState() => _Level2KarScreenFixedState();
}

class _Level2KarScreenFixedState extends State<Level2KarScreenFixed> {
  final TtsService _tts = TtsService();
  final CurriculumRepository _repo = CurriculumRepository.instance;

  String _baseConsonant = 'ক';
  int _karIdx = 0;
  int _exampleIdx = 0;

  static const List<Map<String, String>> _karList = [
    {'sign': 'া', 'name': 'আ-কার'},
    {'sign': 'ি', 'name': 'হ্রস্ব ই-কার'},
    {'sign': 'ী', 'name': 'দীর্ঘ ঈ-কার'},
    {'sign': 'ু', 'name': 'হ্রস্ব উ-কার'},
    {'sign': 'ূ', 'name': 'দীর্ঘ ঊ-কার'},
    {'sign': 'ৃ', 'name': 'ঋ-কার'},
    {'sign': 'ে', 'name': 'এ-কার'},
    {'sign': 'ৈ', 'name': 'ঐ-কার'},
    {'sign': 'ো', 'name': 'ও-কার'},
    {'sign': 'ৌ', 'name': 'ঔ-কার'},
  ];

  static const List<String> _consonants = [
    'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ',
    'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'স', 'হ'
  ];

  @override
  void initState() {
    super.initState();
    _playCurrent();
  }

  void _playCurrent() {
    final kar = _karList[_karIdx];
    final String combined = '\$_baseConsonant\${kar['sign']}';
    final exactExamples = _repo.getExactKarExamples(_baseConsonant, kar['sign']!);

    if (exactExamples.isEmpty) {
      _tts.speak('\$_baseConsonant যোগ \${kar['name']} সমান \$combined।', context: context);
    } else {
      final ex = exactExamples[_exampleIdx % exactExamples.length];
      _tts.speak('\$_baseConsonant যোগ \${kar['name']} সমান \$combined। উদাহরণ: \${ex.word}।', context: context);
    }
  }

  void _nextExample(List<ExactWordExample> exactExamples) {
    if (exactExamples.length <= 1) return;
    setState(() {
      _exampleIdx = (_exampleIdx + 1) % exactExamples.length;
    });
    final kar = _karList[_karIdx];
    final String combined = '\$_baseConsonant\${kar['sign']}';
    final ex = exactExamples[_exampleIdx];
    _tts.speak('\$combined দিয়ে \${ex.word}।', context: context);
  }

  @override
  Widget build(BuildContext context) {
    final kar = _karList[_karIdx];
    final String combinedResult = '\$_baseConsonant\${kar['sign']}';
    final List<ExactWordExample> exactExamples = _repo.getExactKarExamples(_baseConsonant, kar['sign']!);
    final bool hasMore = exactExamples.length > 1;
    final ExactWordExample? currentWord = exactExamples.isNotEmpty
        ? exactExamples[_exampleIdx % exactExamples.length]
        : null;

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, size: 36, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ধাপ ২: কার চিহ্ন", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, size: 34, color: Color(0xFF818CF8)),
            onPressed: _playCurrent,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Giant Formula Visual Card
            Padding(
              padding: const EdgeInsets.all(16),
              child: GestureDetector(
                onTap: _playCurrent,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF312E81), Color(0xFF1E1B4B)],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: const Color(0xFF6366F1), width: 3),
                  ),
                  child: Column(
                    children: [
                      // Formula Display: ক + া = কা
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildTile(_baseConsonant),
                          const Padding(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            child: Text("+", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                          ),
                          _buildTile(kar['sign']!),
                          const Padding(
                            padding: EdgeInsets.symmetric(horizontal: 10),
                            child: Text("=", style: TextStyle(fontSize: 40, color: Colors.white70, fontWeight: FontWeight.bold)),
                          ),
                          _buildTile(combinedResult, isResult: true),
                        ],
                      ),
                      const SizedBox(height: 18),
                      // Exact Word Display or Syllable Badge
                      if (currentWord != null)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1E293B).withOpacity(0.9),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.4)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(currentWord.icon, style: const TextStyle(fontSize: 48)),
                              const SizedBox(width: 14),
                              Text(
                                currentWord.word,
                                style: const TextStyle(fontSize: 38, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                            ],
                          ),
                        )
                      else
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          decoration: BoxDecoration(
                            color: Colors.white10,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Text(
                            combinedResult,
                            style: const TextStyle(fontSize: 34, fontWeight: FontWeight.bold, color: Color(0xFFA5B4FC)),
                          ),
                        ),
                      const SizedBox(height: 16),
                      // Big Speaker Button
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: const BoxDecoration(color: Color(0xFF4F46E5), shape: BoxShape.circle),
                        child: const Icon(Icons.volume_up_rounded, size: 36, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // EXACT LOGIC FIX: HIDE BUTTON IF NO MORE EXAMPLES EXIST
            if (hasMore)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF1E293B),
                      side: const BorderSide(color: Color(0xFF6366F1), width: 1.5),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    icon: const Icon(Icons.refresh_rounded, color: Color(0xFFA5B4FC), size: 28),
                    label: const Text(
                      "আরও উদাহরণ",
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFFA5B4FC)),
                    ),
                    onPressed: () => _nextExample(exactExamples),
                  ),
                ),
              ),

            // Consonant Selector
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              child: SizedBox(
                height: 50,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _consonants.length,
                  itemBuilder: (context, idx) {
                    final c = _consonants[idx];
                    final isSel = c == _baseConsonant;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _baseConsonant = c;
                          _exampleIdx = 0;
                        });
                        _playCurrent();
                      },
                      child: Container(
                        width: 50,
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF4F46E5) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        alignment: Alignment.center,
                        child: Text(c, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Kar Signs Grid
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 5,
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 10,
                    childAspectRatio: 1.0,
                  ),
                  itemCount: _karList.length,
                  itemBuilder: (context, idx) {
                    final k = _karList[idx];
                    final isSel = idx == _karIdx;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _karIdx = idx;
                          _exampleIdx = 0;
                        });
                        _playCurrent();
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: isSel ? const Color(0xFF4F46E5) : const Color(0xFF334155),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: isSel ? Colors.white : Colors.transparent, width: 2),
                        ),
                        alignment: Alignment.center,
                        child: Text(k['sign']!, style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTile(String text, {bool isResult = false}) {
    return Container(
      width: isResult ? 76 : 64,
      height: isResult ? 76 : 64,
      decoration: BoxDecoration(
        color: isResult ? const Color(0xFF4F46E5) : const Color(0xFF334155),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isResult ? const Color(0xFFA5B4FC) : Colors.white24, width: isResult ? 3 : 1.5),
      ),
      alignment: Alignment.center,
      child: Text(
        text,
        style: TextStyle(
          fontSize: isResult ? 44 : 36,
          fontWeight: FontWeight.bold,
          color: isResult ? Colors.white : const Color(0xFFFBBF24),
        ),
      ),
    );
  }
}
`;

// -------------------------------------------------------------
// FLUTTER VISUAL QUIZ ENGINE
// Strictly visual, audio-prompted quiz with giant checkmark & error animations
// -------------------------------------------------------------

export const FLUTTER_VISUAL_QUIZ_ENGINE = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/progress_provider.dart';
import '../services/tts_service.dart';

class VisualQuizDialog extends StatefulWidget {
  final int levelId;
  final String audioPrompt;
  final List<Map<String, dynamic>> options; // {'id': 'o1', 'text': 'কাক', 'icon': '🦅', 'isCorrect': true}
  final VoidCallback onCompleted;

  const VisualQuizDialog({
    super.key,
    required this.levelId,
    required this.audioPrompt,
    required this.options,
    required this.onCompleted,
  });

  @override
  State<VisualQuizDialog> createState() => _VisualQuizDialogState();
}

class _VisualQuizDialogState extends State<VisualQuizDialog> with SingleTickerProviderStateMixin {
  final TtsService _tts = TtsService();
  String? _selectedId;
  String _feedback = 'idle'; // 'idle', 'correct', 'wrong'
  late AnimationController _animCtrl;
  late Animation<double> _scaleAnim;

  @override
  void initState() {
    super.initState();
    _animCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 400));
    _scaleAnim = CurvedAnimation(parent: _animCtrl, curve: Curves.elasticOut);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _playPrompt();
    });
  }

  @override
  void dispose() {
    _animCtrl.dispose();
    super.dispose();
  }

  void _playPrompt() {
    _tts.speak("ছোট পরীক্ষা। \${widget.audioPrompt}", context: context);
  }

  void _handleSelect(Map<String, dynamic> opt) async {
    final bool isCorrect = opt['isCorrect'] == true;
    setState(() {
      _selectedId = opt['id'];
    });

    if (isCorrect) {
      setState(() {
        _feedback = 'correct';
      });
      _animCtrl.forward();
      final progress = context.read<ProgressProvider>();
      progress.unlockLevel(widget.levelId + 1);
      _tts.speak("চমৎকার! আপনি সঠিক উত্তর দিয়েছেন। পরবর্তী ধাপ খুলে গেছে!", context: context);
      await Future.delayed(const Duration(milliseconds: 1800));
      if (mounted) {
        Navigator.pop(context);
        widget.onCompleted();
      }
    } else {
      setState(() {
        _feedback = 'wrong';
      });
      _tts.speak("আবার চেষ্টা করুন।", context: context);
      await Future.delayed(const Duration(milliseconds: 900));
      if (mounted) {
        setState(() {
          _feedback = 'idle';
          _selectedId = null;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(28),
        side: const BorderSide(color: Color(0xFF38BDF8), width: 2.5),
      ),
      insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Header with Voice Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.help_outline_rounded, color: Color(0xFF38BDF8), size: 28),
                        SizedBox(width: 8),
                        Text(
                          "ছবি দেখে পরীক্ষা",
                          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ],
                    ),
                    IconButton(
                      icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF38BDF8), size: 30),
                      onPressed: _playPrompt,
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Audio Question Prompt
                GestureDetector(
                  onTap: _playPrompt,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0369A1).withOpacity(0.25),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFF38BDF8).withOpacity(0.5)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.volume_up_rounded, color: Color(0xFF38BDF8), size: 22),
                        SizedBox(width: 8),
                        Text("প্রশ্ন শুনতে স্পর্শ করুন", style: TextStyle(color: Color(0xFFBAE6FD), fontWeight: FontWeight.bold, fontSize: 16)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Wrong Feedback Warning
                if (_feedback == 'wrong')
                  Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 14),
                    decoration: BoxDecoration(
                      color: const Color(0xFFBE123C).withOpacity(0.3),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: const Color(0xFFFB7185)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.cancel_rounded, color: Color(0xFFFB7185), size: 22),
                        SizedBox(width: 8),
                        Text("ভুল হয়েছে, আবার চেষ্টা করুন ❌", style: TextStyle(color: Color(0xFFFECDD3), fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),

                // 3 Giant Visual Picture/Icon Cards
                ...widget.options.map((opt) {
                  final isSelected = _selectedId == opt['id'];
                  Color bgColor = const Color(0xFF1E293B);
                  Color borderColor = const Color(0xFF334155);

                  if (isSelected && _feedback == 'correct') {
                    bgColor = const Color(0xFF059669);
                    borderColor = Colors.white;
                  } else if (isSelected && _feedback == 'wrong') {
                    bgColor = const Color(0xFFDC2626);
                    borderColor = Colors.white;
                  }

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: InkWell(
                      onTap: _feedback == 'correct' ? null : () => _handleSelect(opt),
                      borderRadius: BorderRadius.circular(20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        decoration: BoxDecoration(
                          color: bgColor,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: borderColor, width: 2),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 4)),
                          ],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(opt['icon'] ?? '', style: const TextStyle(fontSize: 48)),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text(
                                  opt['text'] ?? '',
                                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                                ),
                                const Text("ছবি স্পর্শ করুন", style: TextStyle(fontSize: 12, color: Colors.white54)),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),

          // Giant Green Checkmark Success Overlay
          if (_feedback == 'correct')
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A).withOpacity(0.96),
                  borderRadius: BorderRadius.circular(28),
                ),
                child: ScaleTransition(
                  scale: _scaleAnim,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 96,
                        height: 96,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: const Color(0xFF10B981).withOpacity(0.2),
                          border: Border.all(color: const Color(0xFF34D399), width: 4),
                        ),
                        child: const Icon(Icons.check_rounded, color: Color(0xFF34D399), size: 64),
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        "সঠিক উত্তর! ✔️",
                        style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "পরবর্তী ধাপ খুলে গেছে!",
                        style: TextStyle(fontSize: 18, color: Color(0xFF6EE7B7), fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
`;

// -------------------------------------------------------------
// FLUTTER SENTENCE & STORY REPOSITORIES
// -------------------------------------------------------------

export const FLUTTER_SENTENCE_REPOSITORY = `// lib/repositories/sentence_repository.dart
// Offline Sentences & Thematic Vocabulary Repository for Bengali Literacy

class ThematicItem {
  final String id;
  final String category;
  final String word;
  final String icon;
  final String meaning;
  final List<String> breakdown;

  const ThematicItem({
    required this.id,
    required this.category,
    required this.word,
    required this.icon,
    required this.meaning,
    required this.breakdown,
  });
}

class SentenceItem {
  final String id;
  final String text;
  final String icon;
  final String meaning;
  final List<String> words;

  const SentenceItem({
    required this.id,
    required this.text,
    required this.icon,
    required this.meaning,
    required this.words,
  });
}

class SentenceRepository {
  static const List<ThematicItem> thematicVocab = [
    // প্রকৃতি
    ThematicItem(id: 'n1', category: 'nature', word: 'আকাশ', icon: '🌤️', meaning: 'নীল আকাশ', breakdown: ['আ', 'ক', 'া', 'শ']),
    ThematicItem(id: 'n2', category: 'nature', word: 'নদী', icon: '🌊', meaning: 'প্রবহমান নদী', breakdown: ['ন', 'দ', 'ী']),
    ThematicItem(id: 'n3', category: 'nature', word: 'গাছ', icon: '🌳', meaning: 'সবুজ বৃক্ষ', breakdown: ['গ', 'া', 'ছ']),
    ThematicItem(id: 'n4', category: 'nature', word: 'ফুল', icon: '🌸', meaning: 'সুন্দর ফুল', breakdown: ['ফ', 'ু', 'ল']),
    ThematicItem(id: 'n5', category: 'nature', word: 'জল', icon: '💧', meaning: 'বিশুদ্ধ পানি', breakdown: ['জ', 'ল']),
    // পরিবার
    ThematicItem(id: 'f1', category: 'family', word: 'মা', icon: '🤱', meaning: 'জননী', breakdown: ['ম', 'া']),
    ThematicItem(id: 'f2', category: 'family', word: 'বাবা', icon: '👨‍👧', meaning: 'পিতা', breakdown: ['ব', 'া', 'ব', 'া']),
    ThematicItem(id: 'f3', category: 'family', word: 'ভাই', icon: '👦', meaning: 'সহোদর', breakdown: ['ভ', 'া', 'ই']),
    ThematicItem(id: 'f4', category: 'family', word: 'বোন', icon: '👧', meaning: 'সহোদরা', breakdown: ['ব', 'ো', 'ন']),
    // অঙ্গ
    ThematicItem(id: 'b1', category: 'body', word: 'হাত', icon: '✋', meaning: 'কাজের হাত', breakdown: ['হ', 'া', 'ত']),
    ThematicItem(id: 'b2', category: 'body', word: 'পা', icon: '🦶', meaning: 'চলার পা', breakdown: ['প', 'া']),
    ThematicItem(id: 'b3', category: 'body', word: 'চোখ', icon: '👁️', meaning: 'দর্শনের চোখ', breakdown: ['চ', 'ো', 'খ']),
    ThematicItem(id: 'b4', category: 'body', word: 'কান', icon: '👂', meaning: 'শোনার কান', breakdown: ['ক', 'া', 'ন']),
    // কাজ
    ThematicItem(id: 'a1', category: 'action', word: 'খাওয়া', icon: '🍽️', meaning: 'আহার', breakdown: ['খ', 'া', 'ও', 'য়', 'া']),
    ThematicItem(id: 'a2', category: 'action', word: 'পড়া', icon: '📖', meaning: 'পাঠ', breakdown: ['প', 'ড়', 'া']),
    ThematicItem(id: 'a3', category: 'action', word: 'চলা', icon: '🚶', meaning: 'চলাফেরা', breakdown: ['চ', 'ল', 'া']),
    ThematicItem(id: 'a4', category: 'action', word: 'হাসা', icon: '😄', meaning: 'হাসি', breakdown: ['হ', 'া', 'স', 'া']),
  ];

  static const List<SentenceItem> twoWordSentences = [
    SentenceItem(id: 'tw1', text: 'আমি খাই।', icon: '🍚', meaning: 'খাবার খাওয়া', words: ['আমি', 'খাই']),
    SentenceItem(id: 'tw2', text: 'বাবা আসে।', icon: '👨‍👧', meaning: 'পিতার আগমন', words: ['বাবা', 'আসে']),
    SentenceItem(id: 'tw3', text: 'জল পড়।', icon: '💧', meaning: 'বৃষ্টির জল', words: ['জল', 'পড়']),
    SentenceItem(id: 'tw4', text: 'বই পড়।', icon: '📖', meaning: 'পুস্তক পাঠ', words: ['বই', 'পড়']),
    SentenceItem(id: 'tw5', text: 'পাখি ওড়ে।', icon: '🕊️', meaning: 'আকাশে ওড়া', words: ['পাখি', 'ওড়ে']),
    SentenceItem(id: 'tw6', text: 'রোদ ওঠে।', icon: '🌅', meaning: 'সকালে রোদ', words: ['রোদ', 'ওঠে']),
  ];

  static const List<SentenceItem> standardSentences = [
    SentenceItem(id: 's1', text: 'আমি ভাত খাই।', icon: '🍚', meaning: 'খাবার খাওয়া', words: ['আমি', 'ভাত', 'খাই']),
    SentenceItem(id: 's2', text: 'মাঠে গরু চরে।', icon: '🐄', meaning: 'মাঠে বিচরণ', words: ['মাঠে', 'গরু', 'চরে']),
    SentenceItem(id: 's3', text: 'আকাশে পাখি ওড়ে।', icon: '🕊️', meaning: 'পাখির উড্ডয়ন', words: ['আকাশে', 'পাখি', 'ওড়ে']),
    SentenceItem(id: 's4', text: 'সে বই পড়ে।', icon: '📖', meaning: 'পাঠ করা', words: ['সে', 'বই', 'পড়ে']),
  ];
}
`;

export const FLUTTER_STORY_REPOSITORY = `// lib/repositories/story_repository.dart
// Paragraphs & Moral Stories Repository with complete word breakdown dictionary

class StoryWordItem {
  final String word;
  final List<String> parts;
  final String meaning;
  final String icon;

  const StoryWordItem({
    required this.word,
    required this.parts,
    required this.meaning,
    required this.icon,
  });
}

class StoryData {
  final String id;
  final String title;
  final String moral;
  final String coverEmoji;
  final String fullStoryText;
  final List<String> sentences;

  const StoryData({
    required this.id,
    required this.title,
    required this.moral,
    required this.coverEmoji,
    required this.fullStoryText,
    required this.sentences,
  });
}

class StoryRepository {
  static const List<StoryData> stories = [
    StoryData(
      id: 'story_crow',
      title: 'তৃষ্ণার্ত কাক',
      moral: 'বুদ্ধি থাকলে উপায় হয়',
      coverEmoji: '🏺',
      fullStoryText: 'এক বনে একটি তৃষ্ণার্ত কাক ছিল। সে জলের খোঁজে বনে ঘুরে বেড়াল। হঠাৎ সে একটি মাটির কলসি দেখতে পেল। কলসির তলায় সামান্য একটু জল ছিল। কাকের ঠোঁট জলের নাগাল পেল না। কাকটি বুদ্ধি করে পাশে থাকা নুড়ি পাথর কলসিতে ফেলতে লাগল। ধীরে ধীরে জল কলসির উপরে উঠে এলো। কাকটি পেট ভরে ঠান্ডা জল খেল। তৃষ্ণা মিটিয়ে সে আনন্দে আকাশে উড়ে গেল।',
      sentences: [
        'এক বনে একটি তৃষ্ণার্ত কাক ছিল।',
        'সে জলের খোঁজে বনে ঘুরে বেড়াল।',
        'হঠাৎ সে একটি মাটির কলসি দেখতে পেল।',
        'কলসির তলায় সামান্য একটু জল ছিল।',
        'কাকের ঠোঁট জলের নাগাল পেল না।',
        'কাকটি বুদ্ধি করে পাশে থাকা নুড়ি পাথর কলসিতে ফেলতে লাগল।',
        'ধীরে ধীরে জল কলসির উপরে উঠে এলো।',
        'কাকটি পেট ভরে ঠান্ডা জল খেল।',
        'তৃষ্ণা মিটিয়ে সে আনন্দে আকাশে উড়ে গেল।',
      ],
    ),
    StoryData(
      id: 'story_tortoise',
      title: 'খরগোশ ও কচ্ছপ',
      moral: 'ধৈর্য ও অধ্যাবসায়ে সাফল্য আসে',
      coverEmoji: '🐢',
      fullStoryText: 'বনে একটি দ্রুতগামী খরগোশ ও একটি ধীরগতির কচ্ছপ ছিল। খরগোশ অহংকার করে কচ্ছপকে দৌড় প্রতিযোগিতার প্রস্তাব দিল। দৌড় শুরু হতেই খরগোশ বিদ্যুৎ গতিতে অনেক দূর এগিয়ে গেল। অনেক এগিয়ে গিয়ে সে ভাবল একটু গাছের ছায়ায় বিশ্রাম নেওয়া যাক। গাছের নিচে আরামের বাতাসে খরগোশ গভীর ঘুমে মগ্ন হলো। কিন্তু ধীরগতির কচ্ছপ না থেমে একটানা হেঁটে চলল। কচ্ছপটি ঘুমন্ত খরগোশকে ছাড়িয়ে শেষ সীমায় পৌঁছে গেল। ঘুম ভেঙে খরগোশ দৌড়ে এসে দেখল কচ্ছপ আগেই বিজয়ী হয়েছে।',
      sentences: [
        'বনে একটি দ্রুতগামী খরগোশ ও একটি ধীরগতির কচ্ছপ ছিল।',
        'খরগোশ অহংকার করে কচ্ছপকে দৌড় প্রতিযোগিতার প্রস্তাব দিল।',
        'দৌড় শুরু হতেই খরগোশ বিদ্যুৎ গতিতে অনেক দূর এগিয়ে গেল।',
        'অনেক এগিয়ে গিয়ে সে ভাবল একটু গাছের ছায়ায় বিশ্রাম নেওয়া যাক।',
        'গাছের নিচে আরামের বাতাসে খরগোশ গভীর ঘুমে মগ্ন হলো।',
        'কিন্তু ধীরগতির কচ্ছপ না থেমে একটানা হেঁটে চলল।',
        'কচ্ছপটি ঘুমন্ত খরগোশকে ছাড়িয়ে শেষ সীমায় পৌঁছে গেল।',
        'ঘুম ভেঙে খরগোশ দৌড়ে এসে দেখল কচ্ছপ আগেই বিজয়ী হয়েছে।',
      ],
    ),
  ];
}
`;



