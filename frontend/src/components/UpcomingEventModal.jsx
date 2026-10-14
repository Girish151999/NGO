import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, X, Clock, Lock, ArrowRight, Gift, Flame, Camera, Radio } from 'lucide-react';
import EventCountdownTicker from './EventCountdownTicker';
import CelebrationConfetti from './CelebrationConfetti';

export default function UpcomingEventModal({ 
  isOpen, 
  onClose, 
  onOpenDonate, 
  onNavigateToAnnouncement, 
  theme = "dark",
  targetDate = "2026-10-15T00:00:00"
}) {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  
  // Check if target is today / live
  const targetTime = new Date(targetDate).getTime();
  const currentTime = new Date().getTime();
  const isLive = targetTime <= currentTime;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto backdrop-blur-md bg-black/90 animate-fade-in">
      <div className={`w-full max-w-lg max-h-[90vh] flex flex-col relative rounded-[1.25rem] p-0.5 transition-all duration-500 my-auto ${
        isLive
          ? 'animate-festive-live-gradient border-2 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)]'
          : 'flashy-gradient-border shadow-[0_0_50px_rgba(245,158,11,0.4)]'
      }`}>
        <div 
          className="relative w-full rounded-[1.15rem] overflow-y-auto max-h-[88vh] transition-all duration-300 custom-scrollbar bg-gradient-to-b from-[#181d30] via-[#0f1424] to-[#090c17] text-white shadow-2xl"
        >
          {/* Confetti Animation overlay on event day */}
          {isLive && <CelebrationConfetti count={35} className="z-10" />}

          {/* Top Decorative Sparkle Glow Banner */}
          <div className={`h-2 w-full bg-gradient-to-r ${
            isLive
              ? 'from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-rose-500 animate-pulse bg-[length:200%_200%]'
              : 'from-amber-500 via-rose-500 to-emerald-400 animate-pulse'
          }`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-1.5 rounded-full border transition-all cursor-pointer bg-slate-800/90 hover:bg-slate-700 border-slate-600 text-slate-200 hover:text-white shadow-lg"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-4 sm:p-5 space-y-3.5 relative z-20">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
              <div className="flex items-center gap-2">
                {isLive ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider shadow-lg border border-emerald-400/50 animate-live-pulse-ring">
                    <Radio className="w-3.5 h-3.5 text-emerald-300 animate-ping" />
                    <span>HAPPENING LIVE TODAY • FOOD CARNIVAL</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg border border-amber-400/50 animate-flash-blink">
                    <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                    <span>UPCOMING SPECIAL EVENT • OCT 15TH</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Gift className="w-7 h-7 shrink-0 text-amber-400 animate-bounce" />
                <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  <span className={isLive ? "bg-gradient-to-r from-emerald-300 via-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent drop-shadow animate-pulse" : "bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow"}>
                    Celebrating Mr. Dattatray Laxman Sodmise's Birthday
                  </span>
                </h2>
              </div>
              
              <div className="p-2.5 rounded-xl border backdrop-blur-md shadow-inner bg-amber-950/40 border-amber-400/40 text-amber-200">
                <p className="text-xs sm:text-sm font-serif italic font-bold leading-snug text-amber-200">
                  "{`Turning one life's milestone into many little comebacks.`}"
                </p>
              </div>
            </div>

            {/* Live Status / Countdown Ticker Box */}
            <div className={`p-2.5 sm:p-3 rounded-xl border backdrop-blur-md text-center space-y-1.5 transition-all ${
              isLive
                ? 'bg-slate-900/90 border border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/90 border border-amber-500/50 shadow-lg'
            }`}>
              <div className="text-[10px] sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5">
                {isLive ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 animate-bounce">
                    <Radio className="w-3.5 h-3.5 text-emerald-300" />
                    <span>FOOD CARNIVAL & CHARITY DRIVE IS LIVE NOW!</span>
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400 animate-spin" />
                    <span>LIVE COUNTDOWN TO OCT 15TH EVENT</span>
                  </span>
                )}
              </div>
              <EventCountdownTicker theme="dark" targetDate={targetDate} forceLive={isLive} />
            </div>

            {/* Event Context & Details Card */}
            <div className="p-3 rounded-xl border space-y-1 transition-all bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-md">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{isLive ? 'DATE: TODAY • FOOD CARNIVAL & CHARITY DRIVE LIVE' : 'EVENT DATE: OCTOBER 15, 2026 • FOOD CARNIVAL & CHARITY DRIVE'}</span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-200">
                🎉 <strong className="text-amber-300 font-bold">Tune in with us to our founder's birthday turned into a food carnival, heartiest charity drive, and celebration for kids!</strong> Educational supplies, dual-desk classroom upgrades, solar power solutions, and celebratory meal kits for rural school children.
              </p>
            </div>

            {/* Photos & Videos Media Box (Dynamic State) */}
            <div className="p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-all bg-slate-900/95 border-emerald-500/50 text-slate-100 shadow-md">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isLive ? 'bg-emerald-500/20 border-emerald-400/60 animate-bounce' : 'bg-slate-800 border-slate-700'
                }`}>
                  {isLive ? <Camera className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4 text-amber-400" />}
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 text-white">
                    <span>Event Photos & Videos</span>
                    {isLive ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[9px] font-black animate-pulse border border-emerald-400/50">
                        🔴 LIVE STREAM UNLOCKED
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold border border-amber-400/30">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight">
                    {isLive
                      ? 'Live drive photos & celebration clips updating in real-time today!'
                      : 'Media unlocks live on October 15, 2026.'}
                  </p>
                </div>
              </div>

              {isLive ? (
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateToAnnouncement) onNavigateToAnnouncement();
                  }}
                  className="w-full sm:w-auto py-2 px-3.5 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transform hover:scale-105 transition-all shrink-0"
                >
                  <Camera className="w-3.5 h-3.5 text-slate-950" />
                  <span>View Live Stream</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto py-2 px-3.5 rounded-lg bg-slate-800 text-slate-400 font-extrabold text-[11px] flex items-center justify-center gap-1.5 border border-slate-700 cursor-not-allowed opacity-80 shrink-0"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Oct 15th 🔒</span>
                </button>
              )}
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-end gap-2.5 border-t border-slate-700/40">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenDonate) onOpenDonate();
                }}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-500/30 cursor-pointer transform hover:scale-[1.02]"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
                <span>Support & Donate Now</span>
              </button>

              <button
                onClick={onNavigateToAnnouncement}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/30 cursor-pointer transform hover:scale-[1.02]"
              >
                <span>View Announcement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
