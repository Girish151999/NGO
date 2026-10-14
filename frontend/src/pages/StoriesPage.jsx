import React from 'react';
import StoriesOfChange from '../components/StoriesOfChange';
import Card3D from '../components/Card3D';
import { Sparkles, Heart, Users, ShieldCheck, Award } from 'lucide-react';
import { SupportHeartIcon } from '../components/CustomIcons';

export default function StoriesPage({ onOpenDonate, theme = "dark" }) {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-16 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Dynamic Cool Ambient Backdrop Glow Mesh */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-sky-100/30 to-slate-200/50'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Hero Header Banner */}
        <Card3D theme={theme} className="p-8 sm:p-12 relative overflow-hidden text-center space-y-6">
          <div className="flex justify-center w-full">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all self-center mx-auto ${
              isLight
                ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
                : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
            }`}>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Field Impact Showcase</span>
            </div>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Stories of{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Change & Hope
            </span>
          </h1>

          <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Every smile has a backstory. Dive into authentic field journals detailing how Give Smile Foundation turns financial & infrastructure deficits into self-reliance across Baramati and rural Maharashtra.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-2xl font-extrabold text-amber-400">500+</div>
              <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Students Empowered</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-2xl font-extrabold text-amber-400">12+</div>
              <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>ZP Schools Transformed</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-2xl font-extrabold text-amber-400">200+</div>
              <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Seniors Cared For</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-2xl font-extrabold text-amber-400">100%</div>
              <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>On-Ground Field Proof</div>
            </div>
          </div>
        </Card3D>

        {/* Main Stories Grid Component */}
        <StoriesOfChange onOpenDonate={onOpenDonate} theme={theme} isStandalonePage={true} />

        {/* Bottom CTA Banner */}
        <div className="pb-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-black text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Help Us Write the Next Story of Change
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Your support directly provides school desks, uniform kits, midday meals, and eldercare for families in rural Maharashtra.
            </p>
            <button
              onClick={onOpenDonate}
              className="px-8 py-4 rounded-2xl bg-black text-white font-extrabold text-sm shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
              <span>Donate Us & Sponsor a Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
