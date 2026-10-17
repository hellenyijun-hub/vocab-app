import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useWords } from '../hooks/useDB';
import { useProgress } from '../hooks/useProgress';
import { useTTS } from '../hooks/useTTS';
import { shuffle, pickRandom } from '../utils/shuffle';
import SentenceSlot from '../components/SentenceSlot';
import ProgressBar from '../components/ProgressBar';

const ROUND_SIZE = 10;

export default function SentenceBuilder() {
  const { bookId, unitId } = useParams();
  const navigate = useNavigate();
  const { book } = useBook(bookId);
  const { words: unitWords, loading } = useWords(bookId, unitId);
  const { markWrong, markCorrect, saveUnitScore } = useProgress();
  const { speak } = useTTS();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slots, setSlots] = useState([]);
  const [pool, setPool] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const gradeColors = {
    3: { bg: 'bg-amber-500', btn: 'from-amber-400 to-orange-500' },
    4: { bg: 'bg-blue-500', btn: 'from-blue-400 to-cyan-500' },
    5: { bg: 'bg-emerald-500', btn: 'from-emerald-400 to-green-500' },
    6: { bg: 'bg-violet-500', btn: 'from-violet-400 to-purple-500' },
  };
  const colors = gradeColors[book?.grade] || gradeColors[3];

  useEffect(() => {
    if (loading || unitWords.length === 0) return;
    const candidates = unitWords.filter(w => w.sentenceWords && w.sentenceWords.length >= 3);
    const selected = pickRandom(candidates.length > 0 ? candidates : unitWords, Math.min(ROUND_SIZE, Math.max(1, candidates.length || unitWords.length)));
    setQuestions(selected.map(w => ({ wordData: w, targetWords: w.sentenceWords || [w.word] })));
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
  }, [loading, bookId, unitId]);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      setSlots(new Array(q.targetWords.length).fill(null));
      setPool(shuffle(q.targetWords.map((word, idx) => ({ word, originalIndex: idx }))));
      setShowResult(false);
    }
  }, [currentIndex, questions]);

  const firstEmptySlot = useCallback(() => slots.findIndex(s => s === null), [slots]);

  const handlePoolClick = (poolIdx) => {
    if (showResult) return;
    const emptyIdx = firstEmptySlot();
    if (emptyIdx === -1) return;
    const item = pool[poolIdx];
    setSlots(prev => { const n = [...prev]; n[emptyIdx] = { word: item.word, poolIndex: poolIdx }; return n; });
    setPool(prev => { const n = [...prev]; n[poolIdx] = null; return n; });
  };

  const handleSlotClick = (slotIdx) => {
    if (showResult) return;
    const slot = slots[slotIdx];
    if (!slot) return;
    setSlots(prev => { const n = [...prev]; n[slotIdx] = null; return n; });
    setPool(prev => { const n = [...prev]; n[slot.poolIndex] = { word: slot.word, originalIndex: slot.poolIndex }; return n; });
  };

  const handleCheck = () => {
    if (showResult) return;
    const q = questions[currentIndex];
    const correct = slots.map(s => s?.word || '').join(' ') === q.targetWords.join(' ');
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) { setScore(s => s + 10); markCorrect(q.wordData.id); speak(q.wordData.exampleSentence); }
    else { markWrong(q.wordData.id); }
    setAnswers(prev => [...prev, { wordData: q.wordData, correct }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) { setCurrentIndex(prev => prev + 1); }
    else { saveUnitScore(bookId, unitId, score); }
  };

  const handleQuit = () => {
    if (answers.length > 0) saveUnitScore(bookId, unitId, score);
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return <div className="flex flex-col items-center justify-center h-full"><span className="text-4xl animate-bounce">✏️</span><p className="text-gray-400 mt-3">加载中...</p></div>;
  }

  // Results
  if (questions.length > 0 && currentIndex >= questions.length) {
    const correctCount = answers.filter(a => a.correct).length;
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white px-5 pt-14 pb-6 text-center">
          <span className="text-6xl">{score >= 80 ? '🎉' : score >= 50 ? '💪' : '📚'}</span>
          <h1 className="text-2xl font-extrabold text-gray-800 mt-3">连词成句完成！</h1>
          <div className="flex justify-center gap-6 mt-4">
            <div><p className="text-3xl font-bold text-gray-800">{score}</p><p className="text-xs text-gray-400">得分</p></div>
            <div><p className="text-3xl font-bold text-green-600">{correctCount}</p><p className="text-xs text-gray-400">正确</p></div>
          </div>
        </div>
        <div className="bg-white px-4 py-4 border-t border-gray-100 safe-bottom">
          <button onClick={() => navigate(`/book/${bookId}`)} className="w-full py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-base active:scale-[0.98]">返回单元列表</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <span className="text-5xl">📭</span><p className="text-gray-500">该单元暂无可用的句子练习</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-full bg-gray-200 text-gray-600 text-sm">返回</button>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 pt-12 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={handleQuit} className="p-1.5 -ml-1.5 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-600">{currentIndex + 1}<span className="text-gray-300">/{questions.length}</span></span>
              <span className="text-xs font-bold text-amber-500">⭐ {score}分</span>
            </div>
            <ProgressBar current={currentIndex} total={questions.length} colorClass={colors.bg} />
          </div>
        </div>
      </div>

      <div className="scroll-area px-4 pt-4 pb-4">
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-5 text-center">
          <p className="text-xs text-amber-600 font-medium mb-1">💡 中文提示</p>
          <p className="text-lg font-bold text-gray-800">{q.wordData.sentenceChinese}</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {slots.map((slot, idx) => (
            <SentenceSlot key={idx} word={slot?.word || null} index={idx} onClick={handleSlotClick}
              isCorrect={isCorrect} showResult={showResult} />
          ))}
        </div>

        {showResult && (
          <div className={`mb-4 p-4 rounded-2xl border animate-pop-in text-center ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-base font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? '✅ 完全正确！' : '❌ 再想一想'}
            </p>
            {!isCorrect && <p className="text-sm text-gray-600 mt-2">正确答案: <span className="font-bold text-green-600">{q.targetWords.join(' ')}</span></p>}
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center">
          {pool.map((item, idx) => !item ? <div key={idx} className="w-20 h-12" /> : (
            <button key={idx} onClick={() => handlePoolClick(idx)} disabled={showResult}
              className="px-4 py-2.5 rounded-xl bg-white border-2 border-amber-300 shadow-sm text-base font-semibold text-gray-800 tap-card disabled:opacity-50 hover:border-amber-400 hover:bg-amber-50 transition-colors">
              {item.word}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white px-4 py-4 border-t border-gray-100 safe-bottom">
        {!showResult ? (
          <button onClick={handleCheck} disabled={slots.every(s => s === null)}
            className={`w-full py-4 rounded-2xl text-white font-bold text-base active:scale-[0.98] transition-transform shadow-lg bg-gradient-to-r ${colors.btn} disabled:opacity-50`}>
            检查答案
          </button>
        ) : (
          <button onClick={handleNext} className={`w-full py-4 rounded-2xl text-white font-bold text-base active:scale-[0.98] transition-transform shadow-lg bg-gradient-to-r ${colors.btn}`}>
            {currentIndex < questions.length - 1 ? '下一题' : '查看成绩'}
          </button>
        )}
      </div>
    </div>
  );
}
