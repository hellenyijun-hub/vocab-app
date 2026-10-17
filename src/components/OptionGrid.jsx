/**
 * OptionGrid — display 4 word options as large tap-friendly buttons.
 * Used by MatchGame for the "look at picture, pick word" quiz.
 */
export default function OptionGrid({ options, selectedAnswer, correctAnswer, showResult, onSelect, disabled }) {
  // options: [{ text: "apple", originalIndex: 0 }, ...]
  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-3">
      {options.map((opt, idx) => {
        let cardClass = 'bg-white border-gray-200';
        if (showResult) {
          if (opt.originalIndex === correctAnswer) {
            cardClass = 'answer-correct border-green-300';
          } else if (opt.originalIndex === selectedAnswer && opt.originalIndex !== correctAnswer) {
            cardClass = 'answer-wrong border-red-300';
          }
        }

        return (
          <button
            key={idx}
            onClick={() => !disabled && onSelect(opt.originalIndex)}
            disabled={disabled}
            className={`option-card w-full flex items-center gap-3 p-4 rounded-2xl border-2 ${cardClass} text-left disabled:cursor-default`}
          >
            <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
              ${showResult && opt.originalIndex === correctAnswer ? 'bg-green-500 text-white' :
                showResult && opt.originalIndex === selectedAnswer && opt.originalIndex !== correctAnswer ? 'bg-red-500 text-white' :
                'bg-gray-100 text-gray-500'}`}>
              {labels[idx]}
            </span>
            <span className={`text-lg flex-1 font-medium ${
              showResult && opt.originalIndex === correctAnswer ? 'text-green-700' :
              showResult && opt.originalIndex === selectedAnswer && opt.originalIndex !== correctAnswer ? 'text-red-700' :
              'text-gray-700'}`}>
              {opt.text}
            </span>
            {showResult && opt.originalIndex === correctAnswer && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {showResult && opt.originalIndex === selectedAnswer && opt.originalIndex !== correctAnswer && (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
