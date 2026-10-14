import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export default function Portal3DTransitionOverlay({ isTransitioning }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing 3D Vault...");

  useEffect(() => {
    if (!isTransitioning) {
      setProgress(0);
      setStatusText("Initializing 3D Vault...");
      return;
    }

    setProgress(5);
    const totalSteps = 24; // 24 * 90ms = ~2.2 seconds
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusText("Synchronizing Executive Archives...");
      } else if (currentProgress < 65) {
        setStatusText("Loading Milestone Photo Archives...");
      } else if (currentProgress < 90) {
        setStatusText("Building 3D Interactive Timeline...");
      } else {
        setStatusText("Entering Girish Memorial Portal...");
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-[#05070e] text-white flex items-center justify-center overflow-hidden animate-fadeIn select-none">
      
      {/* LEFT HALF BACKGROUND: GIRISH SIR EXECUTIVE DIRECTOR POSTER & GIANT BACKGROUND TYPOGRAPHY (MATCHING USER SCREENSHOT EXACTLY) */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] pointer-events-none overflow-hidden z-0">
        {/* Giant Background Typography "GIRISH SIR" */}
        <div className="absolute inset-y-0 left-6 flex flex-col justify-center font-black font-serif uppercase tracking-tighter leading-none text-7xl sm:text-9xl select-none text-slate-800/40 opacity-40 z-0">
          <div>GIRISH</div>
          <div className="text-red-950/50">SIR</div>
          <div className="text-slate-900/30 text-5xl sm:text-7xl">SODMISE</div>
        </div>

        {/* Director Executive Photo */}
        <img
          src="/assets/girish_memorial/girish_photo_01.jpeg"
          alt="Late Mr. Girish Sodmise Director Poster"
          className="w-full h-full object-cover object-[center_20%] scale-105 animate-[pulse_6s_ease-in-out_infinite] opacity-60 lg:opacity-75 filter contrast-110 relative z-1"
        />

        {/* Soft Radial & Linear Gradients Fading Smoothly Into Center Dark Space */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#05070e]/80 to-[#05070e] z-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070e] via-transparent to-[#05070e]/80 z-2" />
      </div>

      {/* 3D GEOMETRIC GRID & FUTURISTIC CYBERNETIC LASER LINES */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35 z-0"
        style={{
          perspective: '1000px',
          background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.18) 0%, rgba(5, 7, 14, 0.98) 75%)'
        }}
      >
        {/* 3D Perspective Grid Warp */}
        <div 
          className="w-full h-[200%] absolute -top-1/2 left-0 animate-grid-warp"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(239, 68, 68, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(239, 68, 68, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'rotateX(62deg) scale(1.6)',
            transformOrigin: 'center center'
          }}
        />

        {/* Diagonal Geometric Laser Accent Lines */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent rotate-[35deg] blur-xs animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent -rotate-[25deg] blur-xs animate-pulse" />
      </div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] animate-ping pointer-events-none" />

      {/* MAIN OVERLAY CONTENT: DEAD CENTERED SLEEK FLOATING GLASS CAPSULE (MATCHING SCREENSHOT EXACTLY) */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
        
        {/* Floating Glass Capsule Container */}
        <div className="w-full flex flex-col items-center text-center space-y-6 bg-slate-950/75 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(239,68,68,0.25)] relative overflow-hidden">
          
          {/* Top Neon Accent Glow Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.9)]" />

          {/* Central 3D Glowing Emblem Badge */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 rounded-2xl border-2 border-red-500/40 animate-[spin_6s_linear_infinite]" />
            <div className="absolute -inset-1.5 rounded-2xl border border-amber-400/30 animate-[spin_10s_linear_infinite_reverse]" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-amber-600 text-white font-serif italic font-black text-3xl flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.8)] border border-amber-400/60">
              G
            </div>

            <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950 animate-pulse" />
            </div>
          </div>

          {/* Holographic Header & Status */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-[10px] font-black uppercase tracking-widest shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>3D MEMORIAL PORTAL TRANSITION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              Late Mr. Girish Dattatray <span className="text-amber-400 italic">Sodmise Sir</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-serif italic max-w-md">
              "Honoring Our Visionary Founder & Global Tech Leader"
            </p>
          </div>

          {/* Laser Progress Bar & Live Counter */}
          <div className="w-full space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-mono font-extrabold text-slate-300 px-1">
              <span className="flex items-center gap-2 text-amber-400">
                <Cpu className="w-4 h-4 animate-spin text-amber-400" />
                <span>{statusText}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/80 text-[11px] font-black shadow-md">
                {progress}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-red-500/40 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_20px_rgba(239,68,68,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Ecosystem Footer Tag */}
          <div className="pt-2 border-t border-slate-800/80 w-full flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Gsinfotechvis • GILS GLOBAL • TALENTIC360.AI LLP</span>
            <span className="text-amber-400 font-extrabold flex items-center gap-1">
              <span>EXPLORE PORTAL</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
