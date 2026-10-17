// ============================================================
// 学习进度 Hook
// ============================================================
import { useState, useCallback, useEffect } from 'react';
import { loadProgress, saveProgress, resetProgress } from '../utils/progress';

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markMastered = useCallback((wordId) => {
    setProgress((p) => ({
      ...p,
      mastered: { ...p.mastered, [wordId]: true },
    }));
  });

  const markWrong = useCallback((wordId) => {
    setProgress((p) => ({
      ...p,
      mastered: { ...p.mastered, [wordId]: false },
      wrong: { ...p.wrong, [wordId]: (p.wrong[wordId] || 0) + 1 },
    }));
  });

  const recordQuiz = useCallback((correct) => {
    setProgress((p) => ({
      ...p,
      quizStats: {
        total: p.quizStats.total + 1,
        correct: p.quizStats.correct + (correct ? 1 : 0),
      },
    }));
  });

  const clearWrong = useCallback((wordId) => {
    setProgress((p) => {
      const wrong = { ...p.wrong };
      delete wrong[wordId];
      return { ...p, wrong };
    });
  });

  const reset = useCallback(() => {
    setProgress(resetProgress());
  }, []);

  return { progress, markMastered, markWrong, recordQuiz, clearWrong, reset };
}