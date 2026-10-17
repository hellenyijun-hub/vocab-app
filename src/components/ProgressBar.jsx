/**
 * ProgressBar — animated progress bar for quiz/flashcard progress.
 * @param {number} current - current step
 * @param {number} total - total steps
 * @param {string} colorClass - Tailwind bg class (e.g. "bg-amber-500")
 */
export default function ProgressBar({ current, total, colorClass = 'bg-amber-500' }) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full progress-fill ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
