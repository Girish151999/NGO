import React, { useState } from 'react';
import { ArrowRight, Newspaper, Sparkles } from 'lucide-react';
import { PRESS_EVENTS } from '../data/ngoData';

export default function MediaPressShowcase({ theme = 'dark', onNavigate }) {
  const [activeId, setActiveId] = useState(1);
  const isLight = theme === 'light';

  const activePress = PRESS_EVENTS.find(p => p.id === activeId) || PRESS_EVENTS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 border-b pb-5 border-slate-700/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[11px] font-bold uppercase tracking-wider border border-amber-500/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            Press Releases & News Scans
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Recognized in <span className="font-serif italic text-amber-500 font-normal">Media & News</span>
          </h2>
        </div>
        <p className={`text-xs sm:text-sm font-medium max-w-md leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Featured across Dainik Rokhathok, Dainik Janmat, and regional press scans for grassroots ZP school infrastructure drives.
        </p>
      </div>

      {/* Main 2-Column Grid: Left (Interactive Press Item Cards), Right (Dynamic Picture Display) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Interactive Press Stack */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3 order-2 lg:order-1">
          {PRESS_EVENTS.map((press) => {
            const isActive = press.id === activeId;
            return (
              <div
                key={press.id}
                onClick={() => setActiveId(press.id)}
                className={`p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                  isActive
                    ? isLight
                      ? 'bg-slate-900 text-white border-amber-500 shadow-xl scale-[1.01]'
                      : 'bg-[#121722] text-white border-amber-500 shadow-glow-gold scale-[1.01]'
                    : isLight
                      ? 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-slate-50'
                      : 'glass-panel text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Active left indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600" />
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? 'text-amber-400' : isLight ? 'text-amber-700' : 'text-slate-400'
                    }`}>
                      {press.category}
                    </span>
                    <span className={`text-[11px] font-semibold ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {press.date}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold tracking-tight ${
                    isActive ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}>
                    {press.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    isActive ? 'text-slate-300' : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {press.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Press Picture Display */}
        <div className="lg:col-span-6 relative flex flex-col order-1 lg:order-2">
          <div className="relative w-full flex-1 min-h-[360px] lg:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group flex flex-col justify-end">
            {/* Background Image with smooth transition & fallback error handler */}
            <img
              key={activePress.id}
              src={activePress.image}
              alt={activePress.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/press/press-1.jpeg';
              }}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom Gradient Overlay (Only at bottom to keep image bright and readable) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Top Accent Tag */}
            <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-32px)]">
              <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{activePress.category} • {activePress.date}</span>
              </span>
            </div>

            {/* Bottom Content Overlay (Press Title & Action Button) */}
            <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="bg-black/80 backdrop-blur-md border border-slate-700/80 px-4 py-3 rounded-xl shadow-lg max-w-sm space-y-0.5">
                <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-snug">
                  {activePress.titleEnglish || activePress.title}
                </div>
                {activePress.titleMarathi && (
                  <div className="text-[11px] font-bold text-amber-400 leading-tight">
                    {activePress.titleMarathi}
                  </div>
                )}
                <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider pt-0.5">
                  Verified Regional News Scan
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigate('events')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:scale-105 font-extrabold text-xs tracking-wider transition-all duration-300 shadow-xl flex items-center gap-1.5 cursor-pointer flex-shrink-0 border border-amber-400/50"
              >
                <span>Read press details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
