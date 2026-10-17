// ============================================================
// useProgress — learning progress backed by IndexedDB
// ============================================================
import { useState, useCallback, useEffect } from 'react';
import { getProgress, saveProgress } from '../db/database';

export function useProgress() {
  const [progress, setProgress] = useState({
    wrongWords: {},
    completedUnits: {},
    streak: { days: 0, lastDate: null },
  });
  const [ready, setReady] = useState(false);

  // Load from DB on mount
  useEffect(() => {
    getProgress().then(data => {
      setProgress(data);
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  // Save helper
  const persist = useCallback((newProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress).catch(() => {});
  }, []);

  // Update streak
  useEffect(() => {
    if (!ready) return;
    const today = new Date().toDateString();
    if (progress.streak.lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = {
      days: progress.streak.lastDate === yesterday ? progress.streak.days + 1 : 1,
      lastDate: today,
    };
    persist({ ...progress, streak: newStreak });
  }, [ready]);

  const markWrong = useCallback((wordId) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        wrongWords: { ...prev.wrongWords, [wordId]: (prev.wrongWords[wordId] || 0) + 1 },
      };
      saveProgress(updated).catch(() => {});
      return updated;
    });
  }, []);

  const markCorrect = useCallback((wordId) => {
    setProgress(prev => {
      const { [wordId]: _, ...rest } = prev.wrongWords;
      const updated = { ...prev, wrongWords: rest };
      saveProgress(updated).catch(() => {});
      return updated;
    });
  }, []);

  const getWrongWordIds = useCallback(() => {
    return Object.keys(progress.wrongWords).map(Number);
  }, [progress.wrongWords]);

  const getWrongCount = useCallback((wordId) => {
    return progress.wrongWords[wordId] || 0;
  }, [progress.wrongWords]);

  const saveUnitScore = useCallback((bookId, unitId, score) => {
    setProgress(prev => {
      const key = `${bookId}-${unitId}`;
      const updated = {
        ...prev,
        completedUnits: {
          ...prev.completedUnits,
          [key]: Math.max(prev.completedUnits[key] || 0, score),
        },
      };
      saveProgress(updated).catch(() => {});
      return updated;
    });
  }, []);

  const clearWord = useCallback((wordId) => {
    setProgress(prev => {
      const { [wordId]: _, ...rest } = prev.wrongWords;
      const updated = { ...prev, wrongWords: rest };
      saveProgress(updated).catch(() => {});
      return updated;
    });
  }, []);

  return {
    progress,
    ready,
    markWrong,
    markCorrect,
    getWrongWordIds,
    getWrongCount,
    saveUnitScore,
    clearWord,
  };
}
