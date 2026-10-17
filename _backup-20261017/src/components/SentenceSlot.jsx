/**
 * SentenceSlot — a single slot in the sentence builder answer area.
 * Can be empty (drop target) or filled with a word tile.
 * Clicking a filled slot removes the word back to the pool.
 */
export default function SentenceSlot({ word, index, onClick, isCorrect, showResult }) {
  let bgClass = 'bg-gray-50 border-gray-200 border-dashed';
  if (word) {
    bgClass = 'bg-white border-amber-300 border-solid shadow-sm';
  }
  if (showResult) {
    bgClass = isCorrect
      ? 'bg-green-100 border-green-400 border-solid'
      : 'bg-red-100 border-red-400 border-solid animate-shake';
  }

  return (
    <button
      onClick={() => word && onClick(index)}
      className={`flex-1 min-w-[50px] h-12 rounded-xl border-2 flex items-center justify-center
        text-base font-semibold transition-all tap-card ${bgClass}`}
      disabled={showResult}
    >
      {word ? (
        <span className={showResult ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-gray-800'}>
          {word}
        </span>
      ) : (
        <span className="text-gray-300 text-xs">?</span>
      )}
    </button>
  );
}
