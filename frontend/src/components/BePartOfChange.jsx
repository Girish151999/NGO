import React from 'react';
import { ArrowRight, Building2, Users, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { SupportHeartIcon } from './CustomIcons';

export default function BePartOfChange({ onOpenDonate, onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  return (
    <section className={`pt-16 pb-14 sm:pt-24 sm:pb-20 transition-colors duration-300 relative z-10 ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0a0d14] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase border border-red-500/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>Join the Movement</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Be Part of <span className="font-serif italic text-red-600 dark:text-red-400 font-normal">the Change</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            There are many ways to contribute to rural empowerment, child education, and senior healthcare. Choose what resonates with you.
          </p>
        </div>

        {/* 3D Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: RED THEME - Partner With Us */}
          <div className="group relative rounded-[32px] p-[2px] bg-gradient-to-b from-red-500 via-rose-500/40 to-red-600/80 shadow-[0_15px_35px_rgba(225,29,72,0.15)] hover:shadow-[0_25px_50px_rgba(225,29,72,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className={`w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between ${
              isLight ? 'bg-white text-slate-900' : 'bg-[#0d121f] text-white'
            }`}>
              {/* Top Photo Showcase Frame */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="/assets/zp/zp-event-26.jpg"
                  alt="Partner With Us - Official CSR Inauguration Event"
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg border border-red-400/50 backdrop-blur-md">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>For Organizations</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    CSR Partner
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className={`text-2xl font-extrabold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Partner With Us
                  </h3>
                  <p className={`text-xs leading-relaxed font-normal ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Co-create impactful CSR programs that transform rural ZP schools and empower local communities across Maharashtra.
                  </p>
                </div>

                {/* Feature Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-red-50 text-red-700 border-red-200/80' : 'bg-red-950/50 text-red-300 border-red-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    <span>Custom CSR design</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-red-50 text-red-700 border-red-200/80' : 'bg-red-950/50 text-red-300 border-red-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    <span>Impact reporting</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-red-50 text-red-700 border-red-200/80' : 'bg-red-950/50 text-red-300 border-red-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    <span>Brand visibility</span>
                  </span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('partners')}
                    className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-red-600/30 group/btn border border-red-400/40 cursor-pointer"
                  >
                    <span>Explore partnership options</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: GREEN / EMERALD THEME - Champion Change */}
          <div className="group relative rounded-[32px] p-[2px] bg-gradient-to-b from-emerald-400 via-teal-400/40 to-emerald-600/80 shadow-[0_15px_35px_rgba(16,185,129,0.15)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className={`w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between ${
              isLight ? 'bg-white text-slate-900' : 'bg-[#0d121f] text-white'
            }`}>
              {/* Top Photo Showcase Frame */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="/assets/zp/zp-students-group.jpg"
                  alt="Champion Change - Joyful ZP School Students Group"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg border border-emerald-400/50 backdrop-blur-md">
                    <Users className="w-3.5 h-3.5" />
                    <span>For Advocates</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    Grassroots Impact
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className={`text-2xl font-extrabold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Champion Change
                  </h3>
                  <p className={`text-xs leading-relaxed font-normal ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Amplify the voices and stories of ZP school children, young girls, and rural change-makers creating a brighter future.
                  </p>
                </div>

                {/* Feature Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Share stories</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Host drives</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Build networks</span>
                  </span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('volunteer')}
                    className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-600/30 group/btn border border-emerald-400/40 cursor-pointer"
                  >
                    <span>Share stories with us</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: AMBER / GOLD THEME - Donate Us */}
          <div className="group relative rounded-[32px] p-[2px] bg-gradient-to-b from-amber-400 via-yellow-400/40 to-amber-600/80 shadow-[0_15px_35px_rgba(245,158,11,0.15)] hover:shadow-[0_25px_50px_rgba(245,158,11,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className={`w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between ${
              isLight ? 'bg-white text-slate-900' : 'bg-[#0d121f]'
            }`}>
              {/* Top Photo Showcase Frame */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="/assets/events/event-3.jpeg"
                  alt="Donate Us - Mid-day Meal Distribution Drive"
                  className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-lg border border-amber-300/60 backdrop-blur-md">
                    <SupportHeartIcon className="w-5 h-5 bg-white p-0.5 rounded-full shadow-sm" />
                    <span>For Supporters</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    Direct Impact
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className={`text-2xl font-extrabold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Donate Us
                  </h3>
                  <p className={`text-xs leading-relaxed font-normal ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Your direct contribution sponsors ZP school desks, dignity uniform kits, nutrition drives, and eldercare checkup camps.
                  </p>
                </div>

                {/* Feature Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-amber-50 text-amber-800 border-amber-200/80' : 'bg-amber-950/50 text-amber-300 border-amber-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-amber-500" />
                    <span>Transparent giving</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-amber-50 text-amber-800 border-amber-200/80' : 'bg-amber-950/50 text-amber-300 border-amber-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-amber-500" />
                    <span>Tax benefits</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight ? 'bg-amber-50 text-amber-800 border-amber-200/80' : 'bg-amber-950/50 text-amber-300 border-amber-800/40'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-amber-500" />
                    <span>100% field impact</span>
                  </span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={onOpenDonate}
                    className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/30 group/btn border border-amber-300/60 cursor-pointer"
                  >
                    <span>Support our drives</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Contact Questions Bar */}
        <div className={`max-w-md mx-auto mt-12 p-2.5 rounded-2xl border shadow-sm flex items-center justify-between transition-colors duration-300 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800 shadow-md'
            : 'bg-[#121724] border-slate-800 text-slate-200'
        }`}>
          <span className="text-xs sm:text-sm font-semibold pl-4">
            Have questions? Let's talk.
          </span>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-[#971237] hover:bg-[#7e0f2e] text-white font-bold text-xs sm:text-sm transition-colors shadow cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
