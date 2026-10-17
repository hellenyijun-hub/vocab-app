// ============================================================
// 学习进度存储 —— 基于 localStorage，无需后端
// ============================================================

const KEY = 'shuci-progress-v1';

const DEFAULT = {
  mastered: {},      // wordId -> true 表示已掌握
  wrong: {},         // wordId -> 错误次数
  quizStats: { total: 0, correct: 0 },
  lastStudied: null,
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    /* 忽略写入失败（如隐私模式） */
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
  return { ...DEFAULT };
}