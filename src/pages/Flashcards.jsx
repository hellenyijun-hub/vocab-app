import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useWords } from '../hooks/useDB';
import { useProgress } from '../hooks/useProgress';
import { useTTS } from '../hooks/useTTS';
import WordCard from '../components/WordCard';
import ProgressBar from '../components/ProgressBar';

export default function Flashcards() {
  const { bookId, unitId } = useParams();
  const navigate = useNavigate();
  const { book, loading: bookLoading } = useBook(bookId);
  const { words, loading: wordsLoading } = useWords(bookId, unitId);
  const { markWrong, markCorrect, saveUnitScore } = useProgress();
  const { stop } = useTTS();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongIds, setWrongIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);

  const gradeColors = {
    3: { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700' },
    4: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700' },
    5: { bg: 'bg-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-700' },
    6: { bg: 'bg-violet-500', light: 'bg-violet-100', text: 'text-violet-700' },
  };
  const colors = gradeColors[book?.grade] || gradeColors[3];

  useEffect(() => { return () => stop(); }, [stop]);

  const handleSwipe = useCallback((direction) => {
    const word = words[currentIndex];
    if (direction === 'right') {
      setCorrectIds(prev => [...prev, word.id]);
      markCorrect(word.id);
    } else {
      setWrongIds(prev => [...prev, word.id]);
      markWrong(word.id);
    }
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, words, markCorrect, markWrong]);

  const handleFinish = () => {
    const total = words.length;
    const correct = correctIds.length;
    const score = Math.round((correct / Math.max(1, total)) * 100);
    saveUnitScore(bookId, unitId, score);
    navigate(`/book/${bookId}`);
  };

  if (bookLoading || wordsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-4xl animate-bounce">📖</span>
        <p className="text-gray-400 mt-3">加载单词中...</p>
      </div>
    );
  }

  if (!book || words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <span className="text-5xl">📭</span>
        <p className="text-gray-500">该单元暂无单词</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-full bg-gray-200 text-gray-600 text-sm">返回</button>
      </div>
    );
  }

  const word = words[currentIndex];
  const learned = wrongIds.length + correctIds.length;
  const isComplete = currentIndex >= words.length - 1 && learned >= words.length;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-white px-4 pt-12 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => { stop(); navigate(-1); }} className="p-1.5 -ml-1.5 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-600">
                {learned + 1}<span className="text-gray-300">/{words.length}</span>
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {word.unitName}
              </span>
            </div>
            <ProgressBar current={learned} total={words.length} colorClass={colors.bg} />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="scroll-area px-4 pt-4 pb-4">
        <WordCard word={word} onSwipe={handleSwipe} />
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full font-medium">😕 不认识: {wrongIds.length}</span>
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium">😊 认识: {correctIds.length}</span>
        </div>
      </div>

      {isComplete && (
        <div className="bg-white px-4 py-4 border-t border-gray-100 safe-bottom animate-float-up">
          <button onClick={handleFinish}
            className={`w-full py-4 rounded-2xl text-white font-bold text-base active:scale-[0.98] transition-transform shadow-lg bg-gradient-to-r ${colors.bg === 'bg-amber-500' ? 'from-amber-400 to-orange-500' : colors.bg === 'bg-blue-500' ? 'from-blue-400 to-cyan-500' : colors.bg === 'bg-violet-500' ? 'from-violet-400 to-purple-500' : 'from-emerald-400 to-green-500'}`}>
            完成学习 🎉
          </button>
        </div>
      )}
    </div>
  );
}
