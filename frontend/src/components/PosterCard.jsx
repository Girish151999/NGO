import React from 'react';

export default function PosterCard({ image, title, category, location = "Baramati, Maharashtra", className = "" }) {
  return (
    <div className={`relative group max-w-lg mx-auto w-full ${className}`}>
      {/* Wall Shadow & Ambient Blending */}
      <div className="absolute inset-0 bg-black/40 blur-xl transform translate-y-4 scale-95 opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Main Poster Body */}
      <div className="relative bg-[#fbf9f4] dark:bg-[#141923] p-3 sm:p-4 rounded-sm border border-amber-900/20 dark:border-amber-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.35)] transform -rotate-1 sm:-rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out">
        
        {/* Top-Left Translucent Scotch Tape */}
        <div className="absolute -top-3.5 left-6 w-14 h-7 bg-amber-200/60 dark:bg-amber-500/20 border border-amber-300/40 dark:border-amber-400/30 backdrop-blur-sm transform -rotate-12 shadow-sm z-30 rounded-xs pointer-events-none" />

        {/* Top-Right Translucent Scotch Tape */}
        <div className="absolute -top-3.5 right-6 w-14 h-7 bg-amber-200/60 dark:bg-amber-500/20 border border-amber-300/40 dark:border-amber-400/30 backdrop-blur-sm transform rotate-12 shadow-sm z-30 rounded-xs pointer-events-none" />

        {/* Torn Top Edge SVG Accent */}
        <div className="absolute -top-2 left-0 right-0 h-3 overflow-hidden z-20 pointer-events-none opacity-80">
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-full fill-[#fbf9f4] dark:fill-[#141923]">
            <path d="M0,0 L0,20 Q30,10 60,25 Q90,5 120,20 Q150,12 180,22 Q210,8 240,25 Q270,15 300,28 Q330,8 360,22 Q390,12 420,26 Q450,5 480,20 Q510,10 540,25 Q570,12 600,22 Q630,8 660,26 Q690,14 720,24 Q750,8 780,22 Q810,12 840,28 Q870,10 900,22 Q930,14 960,26 Q990,8 1020,22 Q1050,10 1080,25 Q1110,12 1140,24 Q1170,8 1200,20 L1200,0 Z" />
          </svg>
        </div>

        {/* Image Frame with Vintage Border */}
        <div className="relative overflow-hidden rounded-xs border border-amber-900/10 dark:border-amber-500/20 shadow-inner">
          <img
            src={image}
            alt={title}
            className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 sm:p-5 flex flex-col justify-end">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-xs w-fit border border-amber-500/30">
              {category}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug drop-shadow-md">
              {title}
            </h4>
          </div>
        </div>

        {/* Poster Footer Stamp & Hand-Torn Margin Details */}
        <div className="pt-3 px-1 flex items-center justify-between border-t border-dashed border-amber-900/20 dark:border-amber-500/25 mt-3">
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase font-bold flex items-center gap-1">
              <span>📍 {location}</span>
              <span>•</span>
              <span>OFFICIAL POSTER</span>
            </div>
            <div className="text-xs font-serif italic text-slate-800 dark:text-slate-200 font-bold">
              Give Smile Foundation • Grassroots Field Report
            </div>
          </div>
        </div>

        {/* Bottom Torn Edge SVG Accent */}
        <div className="absolute -bottom-2 left-0 right-0 h-3 overflow-hidden z-20 pointer-events-none opacity-80">
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-full fill-[#fbf9f4] dark:fill-[#141923] transform rotate-180">
            <path d="M0,0 L0,20 Q30,10 60,25 Q90,5 120,20 Q150,12 180,22 Q210,8 240,25 Q270,15 300,28 Q330,8 360,22 Q390,12 420,26 Q450,5 480,20 Q510,10 540,25 Q570,12 600,22 Q630,8 660,26 Q690,14 720,24 Q750,8 780,22 Q810,12 840,28 Q870,10 900,22 Q930,14 960,26 Q990,8 1020,22 Q1050,10 1080,25 Q1110,12 1140,24 Q1170,8 1200,20 L1200,0 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
