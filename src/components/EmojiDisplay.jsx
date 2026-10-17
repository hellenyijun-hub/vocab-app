/**
 * EmojiDisplay — large emoji display for a word.
 * Renders the emoji in a big, visually appealing card.
 */
export default function EmojiDisplay({ emoji, size = 'lg', className = '' }) {
  const sizeClasses = {
    md: 'text-5xl',
    lg: 'text-7xl',
    xl: 'text-8xl',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        className={`${sizeClasses[size]} select-none`}
        style={{ animation: 'bounceEmoji 2s ease-in-out infinite' }}
        role="img"
        aria-label="word illustration"
      >
        {emoji || '📖'}
      </span>
    </div>
  );
}
