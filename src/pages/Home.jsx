// ============================================================
// 首页 —— 学习入口 + 进度总览
// ============================================================
import { WORDS } from '../data/words';

export default function Home({ progress, onNavigate }) {
  const mastered = Object.values(progress.mastered).filter(Boolean).length;
  const wrongCount = Object.keys(progress.wrong).length;
  const { total, correct } = progress.quizStats;
  const rate = total ? Math.round((correct / total) * 100) : 0;
  const pct = Math.round((mastered / WORDS.length) * 100);

  const stats = [
    { label: '总词数', value: WORDS.length, unit: '词', color: 'text-indigo-600' },
    { label: '已掌握', value: mastered, unit: '词', color: 'text-emerald-600' },
    { label: '错词本', value: wrongCount, unit: '词', color: 'text-rose-600' },
    { label: '测验正确率', value: total ? `${rate}%` : '—', unit: '', color: 'text-amber-600' },
  ];

  const entries = [
    { id: 'cards', emoji: '🃏', title: '闪卡背词', desc: '原义 / 僻义 对比记忆', color: 'from-indigo-500 to-blue-600' },
    { id: 'quiz', emoji: '✏️', title: '僻义测验', desc: '每组 10 题，检验掌握情况', color: 'from-emerald-500 to-teal-600' },
    { id: 'list', emoji: '📋', title: '完整词表', desc: '检索全部 92 条释义', color: 'from-amber-500 to-orange-600' },
    { id: 'wrong', emoji: '🔁', title: '错词复习', desc: wrongCount ? `${wrongCount} 词待攻克` : '暂无错词', color: 'from-rose-500 to-pink-600' },
  ];

  return (
    <div>
      {/* 头部 */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 px-5 pt-14 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-4xl">📗</span>
          <div>
            <h1 className="text-xl font-extrabold text-white">初一英语熟词僻义</h1>
            <p className="text-sm text-indigo-200">
              46 个高频词 · 92 条释义
            </p>
          </div>
        </div>

        {/* 掌握进度条 */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-indigo-100 mb-1.5">
            <span>学习进度</span>
            <span className="font-bold">{pct}%</span>
          </div>
          <div className="h-2 bg-white/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 数据卡 */}
      <div className="px-4 -mt-4 grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm py-3 text-center border border-gray-100">
            <div className={`text-xl font-extrabold ${s.color} tabular-nums`}>
              {s.value}
              {s.unit && <span className="text-[10px] ml-0.5 font-medium">{s.unit}</span>}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 功能入口 */}
      <div className="px-4 mt-5 grid grid-cols-2 gap-3">
        {entries.map((e) => (
          <button
            key={e.id}
            onClick={() => onNavigate(e.id)}
            className="text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-4 active:scale-95 transition-transform"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center text-xl shadow-sm`}>
              {e.emoji}
            </div>
            <h3 className="mt-3 font-bold text-gray-800 text-[15px]">{e.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{e.desc}</p>
          </button>
        ))}
      </div>

      {/* 说明 */}
      <div className="px-4 mt-5">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-amber-800 mb-1.5">💡 学习建议</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            这份表的核心价值在「僻义」—— 很多词考试里考的不是课本常见的那层意思。
            建议先用闪卡过一遍建立对比，再用测验检验，错词自动进错词本反复攻。
          </p>
        </div>
      </div>
    </div>
  );
}