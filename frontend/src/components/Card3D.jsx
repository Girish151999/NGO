import React, { useState } from 'react';

export default function Card3D({ children, className = "", theme = "dark", glowColor = "rgba(245, 158, 11, 0.25)" }) {
  const [isHovered, setIsHovered] = useState(false);

  const isLight = theme === 'light';

  return (
    <div className="w-full h-full flex flex-col">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0px)',
          boxShadow: isHovered
            ? isLight
              ? '0 20px 40px -15px rgba(0,0,0,0.12), 0 0 20px rgba(245, 158, 11, 0.15)'
              : `0 25px 45px -15px rgba(0,0,0,0.9), 0 0 25px ${glowColor}`
            : isLight
              ? '0 4px 15px -3px rgba(0,0,0,0.06), 0 0 5px rgba(0,0,0,0.02)'
              : '0 10px 25px -10px rgba(0,0,0,0.7)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease'
        }}
        className={`relative rounded-2xl overflow-hidden border transition-colors duration-300 h-full flex flex-col ${
          isLight
            ? isHovered ? 'bg-[#f8fafc] text-slate-900 border-amber-500/60 shadow-xl shadow-amber-500/10' : 'bg-[#f1f5f9] text-slate-900 border-slate-300/90 shadow-lg shadow-slate-300/60'
            : isHovered ? 'bg-[#0d1322] text-slate-100 border-amber-500/60 shadow-2xl shadow-amber-500/20' : 'bg-[#0d1322] text-slate-100 border-slate-800/90 shadow-xl shadow-black/50 dark-vignette-side'
        } ${className}`}
      >
        {/* Top Gold Accent Bar on Hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 transition-opacity duration-300 z-30 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Soft Vignette Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-50"
          style={{
            background: isLight
              ? 'radial-gradient(circle at center, transparent 40%, rgba(241, 245, 249, 0.4) 100%)'
              : 'radial-gradient(circle at center, transparent 30%, rgba(10, 13, 20, 0.6) 100%)'
          }}
        />

        <div className="relative z-0 h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
