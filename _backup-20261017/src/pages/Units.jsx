import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useUnits, useWordsByBook } from '../hooks/useDB';
import { useProgress } from '../hooks/useProgress';

export default function Units() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { book, loading: bookLoading } = useBook(bookId);
  const { units, loading: unitsLoading } = useUnits(bookId);
  const { words: allWords } = useWordsByBook(bookId);
  const { progress } = useProgress();

  if (bookLoading || unitsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-4xl animate-bounce">📖</span>
        <p className="text-gray-400 mt-3">加载中...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-5xl mb-4">📭</span>
        <p className="text-gray-500">未找到该教材</p>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2.5 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
          返回首页
        </button>
      </div>
    );
  }

  const gradeColors = {
    3: { bg: 'from-amber-400 to-orange-500', light: 'bg-amber-100', text: 'text-amber-700', btn: 'bg-amber-500' },
    4: { bg: 'from-blue-400 to-cyan-500', light: 'bg-blue-100', text: 'text-blue-700', btn: 'bg-blue-500' },
    5: { bg: 'from-emerald-400 to-green-500', light: 'bg-emerald-100', text: 'text-emerald-700', btn: 'bg-emerald-500' },
    6: { bg: 'from-violet-400 to-purple-500', light: 'bg-violet-100', text: 'text-violet-700', btn: 'bg-violet-500' },
  };
  const colors = gradeColors[book.grade] || gradeColors[3];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate('/')} className="p-1.5 -ml-1.5 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{book.title}</h1>
            <p className="text-xs text-gray-400">{book.subtitle} · {book.wordCount} 个单词</p>
          </div>
        </div>
      </div>

      {/* Unit list */}
      <div className="scroll-area px-4 pt-4 pb-6">
        {units.map((unit) => {
          const unitWords = allWords.filter(w => w.unit === unit.id);
          const key = `${bookId}-${unit.id}`;
          const bestScore = progress.completedUnits[key];
          return (
            <div key={unit.id} className="mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className={`px-4 py-3 ${colors.light} border-b border-gray-50`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{unit.name}</h3>
                    <p className="text-xs text-gray-500">{unitWords.length} 个单词</p>
                  </div>
                  {bestScore != null && (
                    <span className={`text-xs font-bold ${colors.text} bg-white px-2.5 py-1 rounded-full`}>
                      最佳 {bestScore}分
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 space-y-2">
                <button
                  onClick={() => navigate(`/flashcards/${bookId}/${unit.id}`)}
                  className={`tap-card w-full py-3 rounded-xl bg-gradient-to-r ${colors.bg} text-white text-sm font-bold shadow-md flex items-center justify-center gap-2`}
                >
                  <span className="text-lg">🖼️</span> 看图记词
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/match/${bookId}/${unit.id}`)}
                    className="tap-card py-2.5 rounded-xl bg-white border-2 border-gray-100 text-gray-700 text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>🎯</span> 看图选词
                  </button>
                  <button
                    onClick={() => navigate(`/sentence/${bookId}/${unit.id}`)}
                    className="tap-card py-2.5 rounded-xl bg-white border-2 border-gray-100 text-gray-700 text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>✏️</span> 连词成句
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
