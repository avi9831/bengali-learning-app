/**
 * audioService.ts
 * Memory-safe Text-To-Speech (TTS) & Web Audio synthesizer.
 * Prevents memory leaks and background crashes by strictly clearing and canceling
 * active utterance instances when navigating away or closing modals.
 */

import { useEffect } from 'react';

let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Cancels any currently playing SpeechSynthesis utterance and clears callbacks to avoid memory leaks.
 */
export function cancelTTS(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    if (currentUtterance) {
      currentUtterance.onend = null;
      currentUtterance.onerror = null;
      currentUtterance = null;
    }
  } catch {
    // Graceful fallback if window or speechSynthesis is in bad state
  }
}

// Ensure audio is canceled if page unloads or user switches tabs
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', cancelTTS);
  window.addEventListener('beforeunload', cancelTTS);
}

/**
 * Plays Bengali speech cleanly with automatic cancellation of prior speech.
 */
export function speakBengaliText(text: string, rate: number = 0.65): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (!text) return;

  try {
    cancelTTS();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Detach callbacks on completion to allow GC cleanup
    utterance.onend = () => {
      if (currentUtterance === utterance) {
        currentUtterance.onend = null;
        currentUtterance.onerror = null;
        currentUtterance = null;
      }
    };

    utterance.onerror = () => {
      if (currentUtterance === utterance) {
        currentUtterance.onend = null;
        currentUtterance.onerror = null;
        currentUtterance = null;
      }
    };

    const voices = window.speechSynthesis.getVoices();
    const bengaliVoice = voices.find(
      (v) => v.lang.startsWith('bn') || v.lang.includes('Bengali')
    );
    if (bengaliVoice) {
      utterance.voice = bengaliVoice;
    }

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('TTS playback error:', e);
  }
}

/**
 * React hook that guarantees TTS is canceled when a screen or modal unmounts.
 */
export function useTTSCleanup(dependencies: any[] = []): void {
  useEffect(() => {
    return () => {
      cancelTTS();
    };
  }, dependencies);
}
