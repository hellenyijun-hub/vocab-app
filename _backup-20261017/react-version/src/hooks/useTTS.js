// ============================================================
// 语音朗读 Hook —— 基于浏览器 SpeechSynthesis
// ============================================================
import { useCallback } from 'react';

export function useTTS() {
  const speak = useCallback((text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return false;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
      return true;
    } catch {
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop };
}