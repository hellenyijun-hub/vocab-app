import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { useWordsByIds } from '../hooks/useDB';
import WordCard from '../components/WordCard';

export default function Review() {
  const navigate = useNavigate();
  const { getWrongWordIds, getWrongCount, clearWord, markCorrect } = useProgress();
  const wrongIds = getWrongWordIds();
  const { words: wrongWords, loading } = useWordsByIds(wrongIds);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cleared, setCleared] = useState(new Set());

  const handleSwipe = useCallback((direction) => {
    const word = wrongWords[currentIndex];
    if (direction === 'right') {
      clearWord(word.id);
      markCorrect(word.id);
      setCleared(prev => new Set([...prev, word.id]));
    }
    if (currentIndex < wrongWords.length - 1) setCurrentIndex(prev => prev + 1);
  }, [currentIndex, wrongWords, clearWord, markCorrect]);

  const gradeColors = {
    3: { bg: 'bg-amber-500' },
    4: { bg: 'bg-blue-500' },
    5: { bg: 'bg-emerald-500' },
    6: { bg: 'bg-violet-500' },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-4xl animate-bounce">📝</span>
        <p className="text-gray-400 mt-3">加载错词...</p>
      </div>
    );
  }

  if (wrongWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6">
        <span className="text-7xl mb-4">🏆</span>
        <h2 className="text-xl font-bold text-gray-800 mb-2">没有需要复习的单词！</h2>
        <p className="text-gray-400 text-sm text-center">你已掌握所有学过的单词，太棒了！</p>
        <button onClick={() => navigate('/')} className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-base active:scale-95 transition-transform shadow-lg">
          返回首页
        </button>
      </div>
    );
  }

  const word = wrongWords[currentIndex];
  const remaining = wrongWords.length - cleared.size;
  const colors = gradeColors[word?.grade] || gradeColors[3];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 pt-12 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/')} className="p-1.5 -ml-1.5 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-800">📝 错词复习</h1>
            <p className="text-xs text-gray-400">剩余 <span className="text-red-500 font-bold">{remaining}</span> 个错词</p>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {wrongWords.map((w, idx) => (
            <button key={w.id} onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? `${colors.bg} w-6` : cleared.has(w.id) ? 'bg-green-400' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>

      <div className="scroll-area px-4 pt-3 pb-4">
        <WordCard word={word} onSwipe={handleSwipe} />
        <div className="flex justify-center mt-3">
          <span className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full font-medium">错过 {getWrongCount(word.id)} 次</span>
        </div>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-100 safe-bottom flex items-center justify-between">
        <span className="text-sm text-gray-400">{currentIndex + 1} / {wrongWords.length}</span>
        <span className="text-sm text-gray-500">点击卡片翻转 · 左右滑动判断</span>
      </div>
    </div>
  );
}
