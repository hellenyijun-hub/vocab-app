// ============================================================
// 闪卡背词页—— 原义/僻义对比学习
// ============================================================
import { useState, useEffect, useMemo, useCallback } from 'react';
import { WORDS } from '../data/words';
import { shuffle } from '../utils/shuffle';
import { useTTS } from '../hooks/useTTS';

function TypeBadge({ type }) {
  const isRare = type === '僻义';
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${
        isRare ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
      }`}
    >
      {type}
    </span>
  );
}

export default function Flashcards({ mode = 'all', onProgress }) {
  const pool = useMemo(() => {
    if (mode === 'wrong') return WORDS.filter((w) => onProgress?.(w.id));
    if (mode === 'unmastered') return WORDS.filter((w) => !onProgress?.(w.id));
    return WORDS;
  }, [mode, onProgress]);

  const [deck, setDeck] = useState(() => shuffle(pool));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { speak } = useTTS();

  // 题库变化时重置（key 变化时由父级重新挂载，此处兜底处理 pool 长度变化）
  const poolKey = pool.length;
  const [lastPoolKey, setLastPoolKey] = useState(poolKey);
  if (lastPoolKey !== poolKey) {
    setLastPoolKey(poolKey);
    setDeck(shuffle(pool));
    setIdx(0);
    setFlipped(false);
  }

  const current = deck[idx];

  const next = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i + 1) % deck.length);
  }, [deck.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i - 1 + deck.length) % deck.length);
  }, [deck.length]);

  // 快捷键：空格翻面，左右方向键切换
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!pool.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 px-8 text-center">
        <span className="text-5xl">🎉</span>
        <p className="text-gray-600 font-medium">该分类下没有单词了</p>
        <p className="text-sm text-gray-400">换个模式试试</p>
      </div>
    );
  }

  if (!current) return null;

  const rare = current.meanings.find((m) => m.type === '僻义');
  const common = current.meanings.find((m) => m.type === '原义');

  return (
    <div className="px-4 pt-6 pb-4">
      {/* 进度条 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${((idx + 1) / deck.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 tabular-nums">
          {idx + 1} / {deck.length}
        </span>
      </div>

      {/* 卡片 */}
      <div
        className="flip-scene cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
          {/* 正面 */}
          <div className="flip-face bg-white rounded-3xl shadow-lg border border-gray-100 p-8 min-h-[380px] flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-gray-400 tracking-widest mb-5">
              WORD {String(current.id).padStart(2, '0')}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center break-all">
              {current.word}
            </h1>
            <p className="text-lg text-gray-500 mt-3 font-mono">{current.phonetic}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(current.word);
              }}
              className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold active:scale-95 transition-transform"
            >
              🔊 朗读
            </button>

            <p className="mt-8 text-xs text-gray-300">点击卡片查看释义</p>
          </div>

          {/* 背面 */}
          <div className="flip-face flip-back">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 min-h-[380px] flex flex-col">
              <div className="text-center pb-4 border-b border-gray-100 mb-4">
                <h2 className="text-2xl font-extrabold text-gray-900 break-all">
                  {current.word}
                </h2>
                <p className="text-sm text-gray-400 font-mono mt-1">
                  {current.phonetic}
                </p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {[common, rare].filter(Boolean).map((m) => (
                  <div
                    key={m.type}
                    className={`rounded-2xl p-4 ${
                      m.type === '僻义'
                        ? 'bg-amber-50 border border-amber-200'
                        : 'bg-sky-50 border border-sky-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TypeBadge type={m.type} />
                    </div>
                    <p className="text-lg font-bold text-gray-800">{m.meaning}</p>
                    {m.example && (
                      <p className="mt-2 text-sm text-gray-600 italic leading-relaxed">
                        {m.example}
                      </p>
                    )}
                    {m.example && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(m.example);
                        }}
                        className="mt-2 text-xs text-gray-400 active:text-indigo-600"
                      >
                        🔊 朗读例句
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={prev}
          className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-semibold active:scale-95 transition-transform"
        >
          ← 上一个
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex-1 py-3 bg-indigo-500 text-white rounded-2xl font-bold active:scale-95 transition-transform"
        >
          {flipped ? '隐藏释义' : '显示释义'}
        </button>
        <button
          onClick={next}
          className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-semibold active:scale-95 transition-transform"
        >
          下一个 →
        </button>
      </div>
    </div>
  );
}