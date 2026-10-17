import { useNavigate } from 'react-router-dom';
import { useBooks, useWordCount } from '../hooks/useDB';
import { useProgress } from '../hooks/useProgress';

export default function Home() {
  const navigate = useNavigate();
  const { books, loading } = useBooks();
  const { progress, getWrongWordIds } = useProgress();
  const totalWords = useWordCount();
  const wrongCount = getWrongWordIds().length;

  const gradeIcons = { 3: '📗', 4: '📘', 5: '📕', 6: '📓' };
  const gradeColors = {
    3: { bg: 'from-amber-400 to-orange-500', light: 'bg-amber-100', text: 'text-amber-700' },
    4: { bg: 'from-blue-400 to-cyan-500', light: 'bg-blue-100', text: 'text-blue-700' },
    5: { bg: 'from-emerald-400 to-green-500', light: 'bg-emerald-100', text: 'text-emerald-700' },
    6: { bg: 'from-violet-400 to-purple-500', light: 'bg-violet-100', text: 'text-violet-700' },
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🐣</span>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">外校单词小达人</h1>
            <p className="text-sm text-gray-500">Join In 词汇 · 看图记词 · 连词成句</p>
          </div>
        </div>
        {progress.streak.days > 0 && (
          <div className="flex items-center gap-1 mt-2 text-xs text-orange-500 font-medium">
            <span>🔥</span>
            <span>已连续学习 {progress.streak.days} 天</span>
          </div>
        )}
      </div>

      {/* Book cards */}
      <div className="scroll-area px-4 pt-5 pb-6">
        <h2 className="text-sm font-semibold text-gray-400 mb-3 px-1">选择教材</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-400">加载中...</div>
        ) : (
          <div className="space-y-3">
            {books.map((book) => {
              const colors = gradeColors[book.grade] || gradeColors[3];
              return (
                <button
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="tap-card w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                    <span>{gradeIcons[book.grade] || '📖'}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base font-bold text-gray-800">{book.title}</h3>
                    <p className="text-xs text-gray-400">{book.subtitle} · {book.unitCount} 个单元 · {book.wordCount} 词</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}

        {/* Wrong words review */}
        {wrongCount > 0 && (
          <button
            onClick={() => navigate('/review')}
            className="tap-card w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-red-200 text-gray-700 text-sm font-semibold"
          >
            <span className="text-lg">📝</span>
            错词复习
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{wrongCount} 词</span>
          </button>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 pb-8">
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400">已学单元</p>
            <p className="text-2xl font-bold text-gray-800">
              {Object.keys(progress.completedUnits).length}
              <span className="text-sm font-normal text-gray-300"> 个</span>
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400">总词汇量</p>
            <p className="text-2xl font-bold text-gray-800">
              {totalWords || books.reduce((s, b) => s + (b.wordCount || 0), 0)}
              <span className="text-sm font-normal text-gray-300"> 词</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
