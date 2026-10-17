// ============================================================
// 测验页 —— 出题：给单词选僻义，或给中文选单词
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { WORDS } from '../data/words';
import { shuffle, pickRandom } from '../utils/shuffle';
import { useTTS } from '../hooks/useTTS';

const QUESTION_COUNT = 10;

function buildQuestion() {
  // 70% 概率考僻义，30% 考原义 —— 僻义是本表重点
  const focusRare = Math.random() < 0.7;
  const target = pickRandom(WORDS, 1)[0];
  const answer = focusRare
    ? target.meanings.find((m) => m.type === '僻义') || target.meanings[0]
    : target.meanings.find((m) => m.type === '原义') || target.meanings[0];

  const pool = WORDS.flatMap((w) => w.meanings);
  const distractors = shuffle(
    pool.filter(
      (m) => m.meaning !== answer.meaning && m.type === answer.type
    )
  ).slice(0, 3);

  const options = shuffle([answer, ...distractors]);

  return {
    word: target,
    answer,
    options,
    mode: focusRare ? 'rare' : 'common',
  };
}

export default function Quiz({ onResult }) {
  const [questions, setQuestions] = useState(() =>
    Array.from({ length: QUESTION_COUNT }, buildQuestion)
  );
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const { speak } = useTTS();

  const q = questions[qi];

  const pick = useCallback(
    (option) => {
      if (picked) return;
      setPicked(option);
      const ok = option.meaning === q.answer.meaning;
      if (ok) setScore((s) => s + 1);
      onResult?.(q.word.id, ok);
    },
    [picked, q, onResult]
  );

  const nextQuestion = useCallback(() => {
    setPicked(null);
    if (qi + 1 >= questions.length) {
      setDone(true);
    } else {
      setQi((i) => i + 1);
    }
  }, [qi, questions.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!picked) return;
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picked, nextQuestion]);

  const restart = () => {
    setQuestions(Array.from({ length: QUESTION_COUNT }, buildQuestion));
    setQi(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const comment =
      pct >= 90 ? '太棒了，僻义掌握得很牢！' :
      pct >= 70 ? '不错，再巩固一下错题。' :
      pct >= 50 ? '基础在了，重点看僻义。' :
      '建议先回闪卡模式过一遍。';
    return (
      <div className="px-6 pt-16 pb-8 flex flex-col items-center text-center animate-pop">
        <span className="text-6xl">{pct >= 70 ? '🎉' : '📖'}</span>
        <h2 className="mt-5 text-3xl font-extrabold text-gray-900">{pct} 分</h2>
        <p className="mt-1 text-gray-500">
          答对 {score} / {questions.length} 题
        </p>
        <p className="mt-4 text-sm text-gray-600">{comment}</p>
        <button
          onClick={restart}
          className="mt-8 px-8 py-3 bg-indigo-500 text-white rounded-2xl font-bold active:scale-95 transition-transform"
        >
          再来一组
        </button>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="px-4 pt-6 pb-4">
      {/* 进度 */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((qi + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 tabular-nums">
          {qi + 1} / {questions.length}
        </span>
        <span className="text-xs font-bold text-emerald-600 tabular-nums">
          ✓ {score}
        </span>
      </div>

      {/* 题干 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 text-center mb-5">
        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-700 mb-4">
          {q.mode === 'rare' ? '僻义特训' : '原义巩固'}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight break-all">
          {q.word.word}
        </h1>
        <p className="text-base text-gray-400 mt-2 font-mono">{q.word.phonetic}</p>
        <button
          onClick={() => speak(q.word.word)}
          className="mt-4 px-3.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold active:scale-95 transition-transform"
        >
          🔊 朗读
        </button>
        <p className="mt-5 text-xs text-gray-400">该单词的意思是？</p>
      </div>

      {/* 选项 */}
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = opt.meaning === q.answer.meaning;
          const isPicked = picked && opt.meaning === picked.meaning;
          let cls = 'bg-white border-gray-200 text-gray-700';
          if (picked) {
            if (isAnswer) cls = 'bg-emerald-50 border-emerald-400 text-emerald-800';
            else if (isPicked) cls = 'bg-rose-50 border-rose-300 text-rose-700';
            else cls = 'bg-white border-gray-100 text-gray-300';
          }
          return (
            <button
              key={opt.meaning}
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 font-semibold transition-all ${cls} ${
                picked && isPicked && !isAnswer ? 'animate-shake' : ''
              } ${picked && isAnswer ? 'animate-pop' : ''}`}
            >
              <span className="inline-block w-5 text-gray-300 font-bold mr-1">
                {String.fromCharCode(65 + i)}
              </span>
              {opt.meaning}
            </button>
          );
        })}
      </div>

      {/* 反馈 */}
      {picked && (
        <div className="mt-5 animate-pop">
          <div
            className={`rounded-2xl p-4 ${
              picked.meaning === q.answer.meaning
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-rose-50 border border-rose-200'
            }`}
          >
            <p className="font-bold text-gray-800">
              {picked.meaning === q.answer.meaning ? '✅ 答对了' : '❌ 答错了'}
            </p>
            <p className="mt-1.5 text-sm text-gray-700">
              正确释义：<span className="font-semibold">{q.answer.meaning}</span>
            </p>
            {q.answer.example && (
              <p className="mt-2 text-sm text-gray-600 italic leading-relaxed">
                {q.answer.example}
              </p>
            )}
          </div>
          <button
            onClick={nextQuestion}
            className="mt-4 w-full py-3.5 bg-indigo-500 text-white rounded-2xl font-bold active:scale-95 transition-transform"
          >
            {qi + 1 >= questions.length ? '查看结果' : '下一题'}
          </button>
        </div>
      )}
    </div>
  );
}