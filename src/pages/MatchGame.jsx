import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useWords } from '../hooks/useDB';
import { useProgress } from '../hooks/useProgress';
import { useTTS } from '../hooks/useTTS';
import { shuffle, pickRandom } from '../utils/shuffle';
import EmojiDisplay from '../components/EmojiDisplay';
import OptionGrid from '../components/OptionGrid';
import ProgressBar from '../components/ProgressBar';
import AudioBtn from '../components/AudioBtn';
import { getAllWords } from '../data/vocabulary';

const ROUND_SIZE = 10;

export default function MatchGame() {
  const { bookId, unitId } = useParams();
  const navigate = useNavigate();
  const { book } = useBook(bookId);
  const { words: unitWords, loading } = useWords(bookId, unitId);
  const { markWrong, markCorrect, saveUnitScore } = useProgress();
  const { speak } = useTTS();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOpts, setShuffledOpts] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const gradeColors = {
    3: { bg: 'bg-amber-500', light: 'bg-amber-100', btn: 'from-amber-400 to-orange-500' },
    4: { bg: 'bg-blue-500', light: 'bg-blue-100', btn: 'from-blue-400 to-cyan-500' },
    5: { bg: 'bg-emerald-500', light: 'bg-emerald-100', btn: 'from-emerald-400 to-green-500' },
    6: { bg: 'bg-violet-500', light: 'bg-violet-100', btn: 'from-violet-400 to-purple-500' },
  };
  const colors = gradeColors[book?.grade] || gradeColors[3];

  useEffect(() => {
    if (loading || unitWords.length === 0) return;
    const pool = unitWords.length >= 4 ? unitWords : [...unitWords, ...getAllWords().filter(w => w.grade === book?.grade)];
    const selected = pickRandom(pool, Math.min(ROUND_SIZE, pool.length));
    const qs = selected.map(w => {
      const wrongPool = getAllWords().filter(x => x.id !== w.id && x.grade === book?.grade);
      const wrongOpts = pickRandom(wrongPool, 3).map(x => x.word);
      const allOpts = shuffle([w.word, ...wrongOpts]);
      const correctIdx = allOpts.indexOf(w.word);
      return { wordData: w, options: allOpts, correctIdx };
    });
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  }, [loading, bookId, unitId]);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      const opts = q.options.map((text, idx) => ({ text, originalIndex: idx }));
      setShuffledOpts(shuffle(opts));
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentIndex, questions]);

  const handleSelect = useCallback((originalIndex) => {
    if (showResult) return;
    setSelectedAnswer(originalIndex);
    setShowResult(true);
    const q = questions[currentIndex];
    const isCorrect = originalIndex === q.correctIdx;
    if (isCorrect) { setScore(s => s + 10); markCorrect(q.wordData.id); speak(q.wordData.word); }
    else { markWrong(q.wordData.id); }
    setAnswers(prev => [...prev, { wordData: q.wordData, selected: originalIndex, correct: q.correctIdx, isCorrect }]);
  }, [showResult, currentIndex, questions, markCorrect, markWrong, speak]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      saveUnitScore(bookId, unitId, score);
    }
  };

  const handleQuit = () => {
    if (answers.length > 0) saveUnitScore(bookId, unitId, score);
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-4xl animate-bounce">🎯</span>
        <p className="text-gray-400 mt-3">加载中...</p>
      </div>
    );
  }

  // Results
  if (questions.length > 0 && currentIndex >= questions.length) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const wrongWords = answers.filter(a => !a.isCorrect).map(a => a.wordData);
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white px-5 pt-14 pb-6 text-center">
          <span className="text-6xl">{score >= 80 ? '🎉' : score >= 50 ? '💪' : '📚'}</span>
          <h1 className="text-2xl font-extrabold text-gray-800 mt-3">答题完成！</h1>
          <div className="flex justify-center gap-6 mt-4">
            <div><p className="text-3xl font-bold text-gray-800">{score}</p><p className="text-xs text-gray-400">得分</p></div>
            <div><p className="text-3xl font-bold text-green-600">{correctCount}</p><p className="text-xs text-gray-400">正确</p></div>
            <div><p className="text-3xl font-bold text-red-500">{answers.length - correctCount}</p><p className="text-xs text-gray-400">错误</p></div>
          </div>
        </div>
        {wrongWords.length > 0 && (
          <div className="scroll-area px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">需要复习的词：</h3>
            <div className="space-y-2">
              {wrongWords.map(w => (
                <div key={w.id} className="bg-white rounded-xl p-3 border border-red-100 flex items-center gap-3">
                  <span className="text-3xl">{w.emoji}</span>
                  <div className="flex-1"><p className="text-base font-bold text-gray-800">{w.word}</p><p className="text-xs text-gray-400">{w.chinese}</p></div>
                  <AudioBtn text={w.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white px-4 py-4 border-t border-gray-100 safe-bottom space-y-2">
          <button onClick={() => navigate(`/book/${bookId}`)} className="w-full py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-base active:scale-[0.98]">返回单元列表</button>
          {wrongWords.length > 0 && (
            <button onClick={() => navigate('/review')} className="w-full py-3 rounded-2xl bg-red-50 text-red-600 font-semibold text-sm active:scale-[0.98]">📝 复习错词 ({wrongWords.length}词)</button>
          )}
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <span className="text-5xl">📭</span>
        <p className="text-gray-500">该单元单词不足，无法出题</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-full bg-gray-200 text-gray-600 text-sm">返回</button>
      </div>
    );
  }

  const q = questions[currentIndex];
  const progress = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

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
            <ProgressBar current={progress} total={100} colorClass={colors.bg} />
          </div>
        </div>
      </div>

      <div className="scroll-area px-4 pt-5 pb-4">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 mb-5 flex flex-col items-center">
          <EmojiDisplay emoji={q.wordData.emoji} size="xl" />
          <p className="text-xs text-gray-300 mt-2">这是什么单词？</p>
        </div>

        <OptionGrid options={shuffledOpts} selectedAnswer={selectedAnswer} correctAnswer={q.correctIdx}
          showResult={showResult} onSelect={handleSelect} disabled={showResult} />

        {showResult && (
          <div className={`mt-4 p-4 rounded-2xl border animate-pop-in ${selectedAnswer === q.correctIdx ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{selectedAnswer === q.correctIdx ? '✅' : '❌'}</span>
              <span className={`text-base font-bold ${selectedAnswer === q.correctIdx ? 'text-green-700' : 'text-red-700'}`}>
                {selectedAnswer === q.correctIdx ? '正确！+10分' : `错误！正确答案: ${q.wordData.word}`}
              </span>
            </div>
            <p className="text-sm text-gray-500">{q.wordData.chinese} — {q.wordData.phonetic}</p>
          </div>
        )}
      </div>

      {showResult && (
        <div className="bg-white px-4 py-4 border-t border-gray-100 safe-bottom">
          <button onClick={handleNext} className={`w-full py-4 rounded-2xl text-white font-bold text-base active:scale-[0.98] transition-transform shadow-lg bg-gradient-to-r ${colors.btn}`}>
            {currentIndex < questions.length - 1 ? '下一题' : '查看成绩'}
          </button>
        </div>
      )}
    </div>
  );
}
