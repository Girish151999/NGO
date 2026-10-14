import React, { useMemo } from 'react';

export default function CelebrationConfetti({ count = 40, className = "" }) {
  const pieces = useMemo(() => {
    const colors = [
      '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', 
      '#8b5cf6', '#eab308', '#06b6d4', '#f43f5e', '#a855f7'
    ];
    const shapes = ['rounded-full', 'rounded-sm', 'rotate-45', 'rounded-xs'];
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.floor(Math.random() * 8) + 6, // 6px to 14px
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      duration: (Math.random() * 3 + 2.5).toFixed(2), // 2.5s to 5.5s
      delay: (Math.random() * 2).toFixed(2), // 0s to 2s
      opacity: (Math.random() * 0.4 + 0.6).toFixed(2)
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-confetti-fall ${piece.shape}`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * (Math.random() > 0.5 ? 1.5 : 1)}px`,
            backgroundColor: piece.color,
            opacity: piece.opacity,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}
    </div>
  );
}
