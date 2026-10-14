import React from 'react';
import { NGO_INFO } from '../data/ngoData';
import Card3D from '../components/Card3D';
import OfficeCards from '../components/OfficeCards';
import { Award, Building, MapPin, Phone, ShieldCheck, Heart, User, Sparkles } from 'lucide-react';

export default function AboutUs({ onOpenDonate, theme = "dark" }) {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-8 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Fancy Light Bulb Ambient Glow Backdrop Effect */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-6 flex flex-col items-center pt-2 sm:pt-4">
          <div className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest shadow-xl border-2 transition-all transform hover:scale-105 ${
            isLight
              ? 'bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] text-white border-amber-400/90 shadow-amber-900/20'
              : 'bg-gradient-to-r from-[#971237]/80 via-amber-500/30 to-[#971237]/80 text-amber-300 border-amber-400 shadow-amber-500/30'
          }`}>
            <Award className="w-5 h-5 text-amber-400 animate-bounce shrink-0" />
            <span>Our Heritage & Legacy</span>
          </div>

          {/* Enlarged Circular Badge with Ultra-Radiant Moving Navy Blue, Yellow & White Aura */}
          <div className="relative my-3 group flex items-center justify-center">
            {/* Multi-Layered Hyper-Glowing Moving Backdrop Aura (Navy Blue #0f172a + Golden Yellow #f59e0b + Pure White #ffffff) */}
            <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[conic-gradient(from_0deg,#0f172a,#eab308,#ffffff,#0f172a,#fbbf24,#0f172a)] blur-3xl opacity-75 animate-[spin_8s_linear_infinite] pointer-events-none" />
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-amber-500 via-sky-400 to-indigo-950 blur-2xl opacity-70 animate-pulse pointer-events-none" />

            {/* Main Outer Circular Ring Container with Navy Blue + Yellow + White Glow */}
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full p-[6px] overflow-hidden shadow-[0_0_50px_rgba(15,23,42,0.9),0_0_60px_rgba(245,158,11,0.8),0_0_90px_rgba(255,255,255,0.6)] bg-slate-950 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
              
              {/* Continuous Flowing Liquid Beam (Navy Blue #0f172a + Golden Yellow #f59e0b / #fbbf24 + Pure White #ffffff) */}
              <div
                className="absolute -inset-[180%] animate-[spin_3s_linear_infinite] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, #0f172a 0deg, #1e293b 70deg, #f59e0b 140deg, #fbbf24 190deg, #ffffff 240deg, #ffffff 270deg, #f59e0b 310deg, #0f172a 360deg)'
                }}
              />

              {/* Inner Circular Photo Container (Seamless Fill - Zero Square Edges) */}
              <div className="relative z-10 w-full h-full rounded-full bg-white p-2.5 sm:p-3 flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(15,23,42,0.25)] border-2 border-amber-400/90">
                <img
                  src="/assets/logo.jpg"
                  alt="Give Smile NGO Official Logo"
                  className="w-full h-full object-cover rounded-full transform scale-105 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Corner Lens Flare Sparkle Accent */}
              <div className="absolute top-2 right-2 z-20 pointer-events-none">
                <Sparkles className="w-5.5 h-5.5 text-amber-300 animate-pulse drop-shadow-[0_0_10px_#fbbf24]" />
              </div>
            </div>
          </div>

          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            About Give Smile{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Foundation
            </span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Rooted in our nearly 30-year legacy of community presence, formalizing our commitment to transform survival into self-reliance.
          </p>
        </div>

        {/* Legacy & Founder Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className={`text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              30 Years of Community Presence
            </h2>
            <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Having been in existence for nearly 30 years, our organization made a solemn pledge to continuously give back to the society that has supported us. We realized that true, sustainable community development cannot happen in isolation.
            </p>
            <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Recognizing that underserved girls need opportunities, the elderly deserve protection, and people from all walks of life fight unseen battles with mental health, we stepped forward to formalize our commitment as <strong>Give Smile Foundation</strong>, part of the <strong>Girish Group of Companies</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel border-slate-800'}`}>
                <div className="text-xs uppercase text-amber-600 font-bold">Founded On</div>
                <div className={`text-xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{NGO_INFO.startDate}</div>
              </div>
              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel border-slate-800'}`}>
                <div className="text-xs uppercase text-amber-600 font-bold">Official Registration</div>
                <div className={`text-xl font-mono font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{NGO_INFO.regNo}</div>
              </div>
            </div>
          </div>

          {/* Founder Badge Image Card */}
          <div className="lg:col-span-5">
            <Card3D theme={theme} className="p-6 text-center space-y-6">
              <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-amber-500/50 shadow-glow-gold">
                <img
                  src="/assets/logo-badge.jpg"
                  alt="Founder Mr. Dattatray Sodmise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase text-amber-600 tracking-wider">Founder & Director</div>
                <h3 className={`text-2xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{NGO_INFO.founder}</h3>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Girish Group of Companies & Give Smile NGO</p>
              </div>
              <p className={`text-xs italic px-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                "We measure our impact by the depth of the lives we transform, rather than a checklist of numbers."
              </p>
            </Card3D>
          </div>
        </div>

        {/* Press Recognition & Newspaper Feature */}
        <div className={`p-8 rounded-3xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-xl' : 'glass-panel border-amber-500/30'
        } flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-extrabold uppercase border border-amber-500/40">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Dainik Rokhathok Vision Newspaper Feature</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Somthali ZP School Gets New Identity In Memory of Late Girish Dattatray Sodmise Sir
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Published in Dainik Rokhathok Vision on 5th September 2026: On-ground news coverage documenting the formal inauguration of the Somthali Zilla Parishad Primary School nameplate sponsored by GS Foundation & Dattatray Laxman Sodmise Saheb in sacred memory of Late Girish Dattatray Sodmise Sir.
            </p>
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

          <div className="relative w-full md:w-80 rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl flex-shrink-0 group bg-white p-2">
            <img
              src="/assets/press/press-somthali.jpg"
              alt="Dainik Rokhathok Vision Somthali ZP School Nameplate Unveiling Feature"
              className="w-full h-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Offices Location Cards matching company screenshot */}
        <div className="pt-8">
          <OfficeCards theme={theme} showMapLinks={true} />
        </div>
      </div>
    </div>
  );
}
