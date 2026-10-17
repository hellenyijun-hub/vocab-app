// ============================================================
// 完整词表页 —— 检索 / 筛选
// ============================================================
import { useState, useMemo } from 'react';
import { WORDS } from '../data/words';
import { useTTS } from '../hooks/useTTS';

export default function WordList({ progress, onMarkMastered }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all'); // all | rare | common | mastered
  const { speak } = useTTS();

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return WORDS.filter((w) => {
      // 搜索：单词本身 + 所有释义 + 例句
      if (kw) {
        const inWord = w.word.toLowerCase().includes(kw);
        const inMeaning = w.meanings.some((m) => m.meaning.toLowerCase().includes(kw));
        const inExample = w.meanings.some((m) => m.example.toLowerCase().includes(kw));
        if (!inWord && !inMeaning && !inExample) return false;
      }
      if (filter === 'rare') {
        return w.meanings.some((m) => m.meaning.toLowerCase().includes(kw) || m.type === '僻义')
          && w.meanings.some((m) => m.type === '僻义');
      }
      if (filter === 'common') {
        return w.meanings.some((m) => m.type === '原义');
      }
      if (filter === 'mastered') return progress.mastered[w.id];
      return true;
    });
  }, [q, filter, progress.mastered]);

  const tabs = [
    { id: 'all', label: '全部', count: WORDS.length },
    { id: 'rare', label: '僻义', count: WORDS.length },
    { id: 'common', label: '原义', count: WORDS.length },
    { id: 'mastered', label: '已掌握', count: Object.values(progress.mastered).filter(Boolean).length },
  ];

  return (
    <div>
      {/* 头部 */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-lg font-extrabold text-gray-900 mb-3">完整词表</h1>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索单词、释义或例句…"
          className="w-full px-4 py-2.5 bg-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-gray-400"
        />
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filter === t.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {t.label} {t.count}
            </button>
          ))}
        </div>
      </div>

      {/* 列表 */}
      <div className="px-4 py-4 space-y-2.5">
        {!list.length && (
          <p className="text-center text-gray-400 text-sm py-12">没有匹配的词条</p>
        )}

        {list.map((w) => (
          <div key={w.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* 词头 */}
            <div className="px-4 py-3 flex items-center gap-3">
              <span className="text-xs font-bold text-gray-300 tabular-nums w-6">
                {String(w.id).padStart(2, '0')}
              </span>
              <button
                onClick={() => speak(w.word)}
                className="flex-1 text-left active:opacity-60"
              >
                <span className="text-lg font-extrabold text-gray-900">{w.word}</span>
                <span className="text-xs text-gray-400 ml-2 font-mono">{w.phonetic}</span>
              </button>
              <button
                onClick={() => onMarkMastered(w.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm active:scale-90 transition-transform ${
                  progress.mastered[w.id]
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-300'
                }`}
                title="标记已掌握"
              >
                ✓
              </button>
            </div>

            {/* 释义 */}
            <div className="px-4 pb-3 space-y-2">
              {w.meanings.map((m) => (
                <div
                  key={m.type}
                  className={`rounded-xl px-3 py-2 ${
                    m.type === '僻义'
                      ? 'bg-amber-50'
                      : 'bg-sky-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        m.type === '僻义'
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-sky-200 text-sky-800'
                      }`}
                    >
                      {m.type}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{m.meaning}</span>
                  </div>
                  {m.example && (
                    <p className="mt-1 text-xs text-gray-500 italic leading-relaxed">
                      {m.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}