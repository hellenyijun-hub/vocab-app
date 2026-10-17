import { useState, useCallback } from 'react';
import { useProgress } from './hooks/useProgress';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import WordList from './pages/WordList';

const TABS = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'cards', label: '背词', icon: '🃏' },
  { id: 'quiz', label: '测验', icon: '✏️' },
  { id: 'list', label: '词表', icon: '📋' },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const { progress, markMastered, markWrong, recordQuiz, clearWrong } =
    useProgress();

  // 判断某词是否在错词本
  const isWrong = useCallback((id) => !!progress.wrong[id], [progress.wrong]);

  // 测验结果回调
  const handleQuizResult = useCallback(
    (wordId, correct) => {
      recordQuiz(correct);
      if (correct) {
        markMastered(wordId);
        clearWrong(wordId);
      } else {
        markWrong(wordId);
      }
    },
    [recordQuiz, markMastered, markWrong, clearWrong]
  );

  return (
    <div className="app-container">
      {tab === 'home' && (
        <Home progress={progress} onNavigate={setTab} />
      )}

      {tab === 'cards' && (
        <Flashcards mode="all" onProgress={isWrong} />
      )}

      {tab === 'quiz' && (
        <Quiz onResult={handleQuizResult} />
      )}

      {tab === 'list' && (
        <WordList progress={progress} onMarkMastered={markMastered} />
      )}

      {/* 底部导航 */}
      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={tab === t.id ? 'active' : ''}
          >
            <span className="text-lg leading-none">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}