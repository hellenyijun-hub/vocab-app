import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { seedDatabase } from './db/seed';
import Home from './pages/Home';
import Units from './pages/Units';
import Flashcards from './pages/Flashcards';
import MatchGame from './pages/MatchGame';
import SentenceBuilder from './pages/SentenceBuilder';
import Review from './pages/Review';

function LoadingScreen({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
      <span className="text-6xl animate-bounce">🐣</span>
      <h2 className="text-lg font-bold text-gray-700 text-center">外校单词小达人</h2>
      <p className="text-sm text-gray-400 text-center">{message}</p>
      <div className="w-40 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-amber-400 rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
    </div>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [dbMessage, setDbMessage] = useState('正在初始化数据库...');

  useEffect(() => {
    seedDatabase()
      .then((seeded) => {
        setDbMessage(seeded ? '正在导入词汇数据...' : '正在加载数据库...');
        // Small delay for smooth UX
        setTimeout(() => setDbReady(true), 600);
      })
      .catch((err) => {
        console.error('DB seed error:', err);
        setDbReady(true); // Proceed anyway, will fall back to memory
      });
  }, []);

  if (!dbReady) {
    return (
      <div className="app-container">
        <LoadingScreen message={dbMessage} />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<Units />} />
          <Route path="/flashcards/:bookId/:unitId" element={<Flashcards />} />
          <Route path="/match/:bookId/:unitId" element={<MatchGame />} />
          <Route path="/sentence/:bookId/:unitId" element={<SentenceBuilder />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
