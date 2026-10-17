import { useState } from 'react';
import AudioBtn from './AudioBtn';

/**
 * WordCard — a flippable flashcard.
 * Front: big emoji + English word + phonetic + audio button
 * Back: Chinese meaning + example sentence
 */
export default function WordCard({ word, onSwipe }) {
  const [flipped, setFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60 && onSwipe) {
      onSwipe(diff > 0 ? 'right' : 'left');
    }
    setTouchStart(null);
  };

  return (
    <div
      className="w-full select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Flashcard */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer tap-card"
        style={{ minHeight: '320px' }}
      >
        {/* Front */}
        <div
          className={`p-6 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${flipped ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'}`}
          style={{ minHeight: '320px' }}
        >
          {/* Emoji */}
          <span className="text-7xl select-none">{word.emoji || '📖'}</span>

          {/* Word */}
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide text-center">
            {word.word}
          </h2>

          {/* Phonetic + Audio */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{word.phonetic}</span>
            <AudioBtn text={word.word} size="sm" />
          </div>

          {/* Tap hint */}
          <p className="text-xs text-gray-300 mt-2">👆 点击翻转看中文</p>
        </div>

        {/* Back */}
        <div
          className={`p-6 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}
          style={{ minHeight: '320px' }}
        >
          {/* Chinese */}
          <span className="text-5xl select-none">{word.emoji}</span>
          <h2 className="text-2xl font-bold text-amber-600">{word.chinese}</h2>
          <span className="text-sm text-gray-400">{word.word}</span>

          {/* Example sentence */}
          <div className="mt-3 bg-amber-50 rounded-2xl px-5 py-3 text-center">
            <p className="text-base text-gray-700 font-medium">{word.exampleSentence}</p>
            <p className="text-sm text-gray-400 mt-1">{word.sentenceChinese}</p>
          </div>

          {/* Tap hint */}
          <p className="text-xs text-gray-300 mt-2">👆 点击翻转回英文</p>
        </div>
      </div>

      {/* Swipe action buttons */}
      {onSwipe && (
        <div className="flex justify-between mt-4 gap-4">
          <button
            onClick={() => onSwipe('left')}
            className="flex-1 py-3.5 rounded-2xl bg-white border-2 border-red-200 text-red-500 font-bold text-base active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>😕</span> 不认识
          </button>
          <button
            onClick={() => onSwipe('right')}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-base active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-2"
          >
            <span>😊</span> 认识
          </button>
        </div>
      )}
    </div>
  );
}
