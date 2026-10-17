import { useTTS } from '../hooks/useTTS';

/**
 * AudioBtn — TTS pronunciation button.
 * Shows a speaker icon that speaks `text` on click.
 */
export default function AudioBtn({ text, size = 'md' }) {
  const { speak } = useTTS();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      className={`${sizeClasses[size]} rounded-full bg-white border-2 border-gray-200 flex items-center justify-center
        active:scale-90 transition-transform hover:border-amber-300 hover:bg-amber-50 shadow-sm`}
      title={`Listen: ${text}`}
    >
      <span role="img" aria-label="pronounce">🔊</span>
    </button>
  );
}
