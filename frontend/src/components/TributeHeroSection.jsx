import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function TributeHeroSection({ onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className={`p-6 sm:p-10 rounded-3xl border transition-all duration-300 ${
        isLight 
          ? 'bg-white border-amber-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)]' 
          : 'bg-[#0f1422] border-amber-500/30 shadow-2xl'
      } flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden`}>
        
        {/* Top Gold Subtle Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        {/* Left Side: Copy & Know More Button */}
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>IN LOVING MEMORY & DEDICATED INSPIRATION</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-serif leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Honoring Our Inspiration & Heritage
          </h2>

          <div className="text-base sm:text-xl font-bold font-serif italic text-amber-600 dark:text-amber-400">
            Late Girish Dattatray Sodmise Sir
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Give Smile Foundation pays solemn honor to Late Girish Dattatray Sodmise Sir, the guiding light of Girish Group of Companies whose vision of selfless service continues to illuminate our path.
          </p>

          {/* Know More Button */}
          <div className="pt-2">
            <button
              onClick={() => onNavigate('girish-memorial')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2.5 cursor-pointer border border-amber-300 ring-2 ring-amber-400/30"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>KNOW MORE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Premium 3D Vertical Divider Pillar with Dual Nodes */}
        <div className="hidden md:flex flex-col items-center justify-center self-stretch py-3 px-3 shrink-0 select-none">
          {/* Top Node */}
          <div className={`w-3 h-3 rounded-full shrink-0 ${
            isLight
              ? 'bg-slate-800 ring-2 ring-slate-300/90 shadow-sm'
              : 'bg-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_16px_rgba(245,158,11,0.95)] animate-pulse'
          }`} />

          {/* Stylish 3D Gradient Pillar Line */}
          <div className={`w-1 flex-1 rounded-full my-2 transition-all ${
            isLight
              ? 'bg-gradient-to-b from-slate-300 via-slate-700 to-slate-300 shadow-sm'
              : 'bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.6)]'
          }`} />

          {/* Bottom Node */}
          <div className={`w-3 h-3 rounded-full shrink-0 ${
            isLight
              ? 'bg-slate-800 ring-2 ring-slate-300/90 shadow-sm'
              : 'bg-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_16px_rgba(245,158,11,0.95)] animate-pulse'
          }`} />
        </div>

        {/* Right Side: Photo Card Frame */}
        <div 
          onClick={() => onNavigate('girish-memorial')}
          className={`relative w-full md:w-72 rounded-2xl overflow-hidden border transition-all cursor-pointer group p-3 text-center space-y-3 shrink-0 ${
            isLight 
              ? 'bg-white border-amber-300/80 shadow-xl hover:shadow-2xl' 
              : 'bg-slate-900 border-amber-500/40 shadow-2xl hover:border-amber-400'
          }`}
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950">
            <img
              src="/assets/tribute/tribute-1.jpg"
              alt="Late Girish Dattatray Sodmise Sir"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="space-y-0.5 pb-1">
            <h4 className={`text-xs font-black uppercase tracking-wider ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Late Girish Dattatray Sodmise Sir
            </h4>
            <div className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              In Loving Memory
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
