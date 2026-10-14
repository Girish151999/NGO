import React, { useState } from 'react';
import {
  Sparkles, Heart, ArrowRight, CheckCircle2, Play, Calendar, Newspaper, ChevronRight, ChevronLeft, Image as ImageIcon, Film, ArrowDown, Gift, Lock, Clock, Flame, Bell, Crown, Radio, Camera
} from 'lucide-react';
import { SupportHeartIcon } from '../components/CustomIcons';
import HeroSlider from '../components/HeroSlider';
import TributeHeroSection from '../components/TributeHeroSection';
import Card3D from '../components/Card3D';
import AnimatedCounter from '../components/AnimatedCounter';
import OurPrograms from '../components/OurPrograms';
import MaharashtraMap from '../components/MaharashtraMap';
import PartnerTicker from '../components/PartnerTicker';
import BePartOfChange from '../components/BePartOfChange';
import StoriesOfChange from '../components/StoriesOfChange';
import { ZP_SCHOOL_PROJECT, PRESS_EVENTS, AUG_26_GALLERY_ITEMS } from '../data/ngoData';
import PlantGrowth3D from '../components/PlantGrowth3D';
import EventCountdownTicker from '../components/EventCountdownTicker';
import CelebrationConfetti from '../components/CelebrationConfetti';

const ANNOUNCEMENT_DRIVES = [
  {
    id: '15oct_upcoming',
    isUpcoming: true,
    date: '15th October 2026',
    title: "Celebrating Mr. Dattatray Laxman Sodmise's Birthday",
    subtitle: "Turning one life's milestone into many little comebacks.",
    description: "Tune in with us to our founder's birthday turned into a food carnival, heartiest charity drive, and celebration for kids! Dedicated in honor and celebration of Mr. Dattatray Laxman Sodmise's birthday with educational supplies, dual-desk classroom upgrades, solar power solutions, and celebratory nutritious meal kits for rural school children.",
    buttonText: 'Photos & Videos Available Oct 15th',
    badge: '✨ UPCOMING SPECIAL EVENT',
  },
  {
    id: '26sep',
    isUpcoming: false,
    date: '26th September 2026 Drive',
    title: '26th September ZP School Digital & Solar Handover',
    description: 'Completed multi-school adoption handover of smart digital learning tools, solar panel setup, and 100+ dual desk seating units at ZP Primary School.',
    buttonText: 'View 26th September Drive Photos ↗',
    badge: '✓ COMPLETED DRIVE',
  },
  
  {
    id: '15aug',
    isUpcoming: false,
    date: '15th August 2026 Drive',
    title: '15th August Independence Day ZP Drive',
    description: 'Celebrated Swatantryadin with Somthali ZP Primary School children. Conducted flag hoisting, dual-desk classroom handovers, uniform distribution, and student cultural drills.',
    buttonText: 'View 15th August Drive Photos ↗',
    badge: '✓ COMPLETED DRIVE',
  },
  {
    id: '24jan',
    isUpcoming: false,
    date: '24th January 2024 Drive',
    title: '24th January Inaugural Grassroots Drive',
    description: 'Inaugural foundation drive distributing student learning kits, sweater uniforms, and educational supplies to 250+ rural children.',
    buttonText: 'View 24th January Drive Photos ↗',
    badge: '✓ COMPLETED DRIVE',
  }
];

export default function Home({ onOpenDonate, onOpenVolunteer, onOpenVideo, onNavigate, theme = "dark", isTributeOpen }) {
  const isLight = theme === 'light';
  const [currentDriveIdx, setCurrentDriveIdx] = useState(0);
  const [reminderSaved, setReminderSaved] = useState(false);
  const [eventDateTarget] = useState("2026-10-15T00:00:00");

  const isLive = new Date(eventDateTarget).getTime() <= new Date().getTime();

  const handlePrevDrive = () => {
    setCurrentDriveIdx((prev) => (prev === 0 ? ANNOUNCEMENT_DRIVES.length - 1 : prev - 1));
  };

  const handleNextDrive = () => {
    setCurrentDriveIdx((prev) => (prev === ANNOUNCEMENT_DRIVES.length - 1 ? 0 : prev + 1));
  };

  const activeDrive = ANNOUNCEMENT_DRIVES[currentDriveIdx];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden">
      {/* 1. Full-Page Hero Slider */}
      <HeroSlider
        onOpenDonate={onOpenDonate}
        onOpenVolunteer={onOpenVolunteer}
        onOpenVideo={onOpenVideo}
        onNavigate={onNavigate}
        isTributeOpen={isTributeOpen}
      />

      {/* 2. Udyogini-Style "Our Impact in Numbers - Transforming Lives" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className={`p-6 sm:p-10 rounded-2xl border shadow-3d-hover text-center relative overflow-hidden transition-colors duration-300 ${
          isLight
            ? 'bg-white border-slate-300/80 text-slate-800 shadow-[0_12px_36px_rgba(15,23,42,0.08)]'
            : 'glass-panel border-brand-500/30 dark-vignette-side text-slate-100'
        }`}>
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          
          <div className="max-w-3xl mx-auto space-y-3 mb-10 text-center">
            {/* Group A: Eyebrow Accent text with red underline */}
            <div className="inline-block relative">
              <span className={`text-xs sm:text-sm font-bold tracking-wider uppercase ${
                isLight ? 'text-red-800' : 'text-red-400'
              }`}>
                Our Impact in Numbers
              </span>
              <div className={`w-full h-0.5 ${isLight ? 'bg-red-800' : 'bg-red-400'} mt-1 rounded-full`} />
            </div>

            {/* Group B: Hybrid Dual-Font Main Heading ("Transforming Lives") */}
            <h2 className={`text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight ${
              isLight ? 'text-slate-800' : 'text-white'
            }`}>
              Transforming <span className={`font-serif italic font-bold ${isLight ? 'text-red-800' : 'text-red-500'}`}>Lives</span>
            </h2>

            {/* Group C: Lead Description Paragraph */}
            <p className={`text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              For over three decades, we have been empowering young girls, school students, senior citizens, and underserved families to build a resilient, self-reliant future.
            </p>
          </div>

          {/* Group D: 4-Column Udyogini-Identical Impact Metrics Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x rounded-xl overflow-hidden border shadow-sm mb-8 ${
            isLight
              ? 'bg-white border-slate-200 divide-slate-200 text-slate-900'
              : 'bg-[#0f172a] border-slate-800 divide-slate-800 text-white'
          }`}>
            {/* Box 1 */}
            <div className={`p-6 text-left space-y-2 transition-colors ${
              isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/60'
            }`}>
              <div className={`text-4xl sm:text-5xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <AnimatedCounter target={10480} suffix="+" duration={2200} />
              </div>
              <div className={`text-sm sm:text-base font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                Students & Girls Empowered
              </div>
              <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Equipped with learning kits, dignity uniform sets, and digital literacy tools across rural ZP schools.
              </p>
            </div>

            {/* Box 2 */}
            <div className={`p-6 text-left space-y-2 transition-colors ${
              isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/60'
            }`}>
              <div className={`text-4xl sm:text-5xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <AnimatedCounter target={30} suffix="+ Yrs" duration={1800} />
              </div>
              <div className={`text-sm sm:text-base font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                Legacy of Trust
              </div>
              <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                A multi-generational foundation of community devotion backed by Girish Group of Companies.
              </p>
            </div>

            {/* Box 3 */}
            <div className={`p-6 text-left space-y-2 transition-colors ${
              isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/60'
            }`}>
              <div className={`text-4xl sm:text-5xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <AnimatedCounter target={25} suffix="+" duration={1800} />
              </div>
              <div className={`text-sm sm:text-base font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                Upliftment Tracks
              </div>
              <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Spanning basic education, vocational training, mental health resilience, and eldercare.
              </p>
            </div>

            {/* Box 4 */}
            <div className={`p-6 text-left space-y-2 transition-colors ${
              isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/60'
            }`}>
              <div className={`text-4xl sm:text-5xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <AnimatedCounter target={100} suffix="%" duration={1600} />
              </div>
              <div className={`text-sm sm:text-base font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                Direct Grassroots Aid
              </div>
              <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Absolute devotion measuring our impact by the depth of lives transformed rather than numbers.
              </p>
            </div>
          </div>

          {/* Group E: Bottom Sub-caption */}
          <div className="space-y-2 text-center">
            <p className={`text-sm font-medium italic ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Every number represents a story of transformation
            </p>
            <div>
              <button
                onClick={() => onNavigate('projects')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer group ${
                  isLight ? 'text-red-800 hover:text-red-900' : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <span>Read Their Stories & ZP Drive Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2.2 Announcement Section - Eye-Catching Flagship Event & Drive Carousel */}
      <section id="announcement-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-500 rounded-3xl p-6 sm:p-8 relative overflow-hidden text-slate-100 ${
          activeDrive.isUpcoming && isLive
            ? 'animate-festive-live-gradient border-2 border-emerald-400 shadow-[0_0_70px_rgba(16,185,129,0.5)]'
            : 'bg-gradient-to-br from-[#0c1222] via-[#121a2d] to-[#090d18] border-2 border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
        }`}>
          {/* Subtle Ambient Top Accent Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 animate-pulse ${
            activeDrive.isUpcoming && isLive
              ? 'bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-cyan-400'
              : 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400'
          }`} />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/40">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Field Drive Announcements & Event Records</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                {activeDrive.isUpcoming ? (
                  isLive ? (
                    <>
                      <span className="text-emerald-400 animate-bounce">🎉</span>
                      <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-cyan-300 bg-clip-text text-transparent">Flagship Drive Happening Live Today!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-amber-400 animate-pulse">🔥</span>
                      <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-100 bg-clip-text text-transparent">Flagship Upcoming Event</span>
                    </>
                  )
                ) : (
                  <span>Recent Completed Drives</span>
                )}
              </h3>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border flex items-center gap-1.5 ${
                activeDrive.isUpcoming
                  ? isLive
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white border-emerald-400 animate-live-pulse-ring shadow-lg shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white border-amber-400 animate-flash-blink shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {activeDrive.isUpcoming && (isLive ? <Radio className="w-4 h-4 text-emerald-300 animate-ping" /> : <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />)}
                <span>{activeDrive.isUpcoming ? (isLive ? '🎉 HAPPENING LIVE TODAY!' : 'UPCOMING EVENT • OCT 15') : 'STATUS: ARCHIVED & COMPLETED'}</span>
              </span>
              <span className="text-xs font-bold text-amber-400/80">
                ({currentDriveIdx + 1} of {ANNOUNCEMENT_DRIVES.length})
              </span>
            </div>
          </div>

          {/* Single Full-Width Event Carousel Card with Navigation Arrows */}
          <div className="relative group px-1 sm:px-4">
            {/* Left Chevron Button */}
            <button
              onClick={handlePrevDrive}
              aria-label="Previous Drive Event"
              className="absolute -left-3 sm:-left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full border border-amber-500/60 bg-slate-900/90 hover:bg-slate-800 text-amber-400 hover:text-white shadow-2xl hover:scale-110 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={handleNextDrive}
              aria-label="Next Drive Event"
              className="absolute -right-3 sm:-right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full border border-amber-500/60 bg-slate-900/90 hover:bg-slate-800 text-amber-400 hover:text-white shadow-2xl hover:scale-110 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
            </button>

            {/* INNER CARD BOX */}
            {activeDrive.isUpcoming ? (
              <div className={`p-5 sm:p-7 rounded-2xl border-2 text-slate-100 transition-all relative overflow-hidden flex flex-col justify-between min-h-[250px] ${
                isLive
                  ? 'border-emerald-400/80 bg-gradient-to-br from-[#1e102f] via-[#0f172a] to-[#091422] shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                  : 'border-amber-400/80 bg-gradient-to-br from-[#271f3f] via-[#1a1f33] to-[#0f1424] shadow-[0_0_35px_rgba(245,158,11,0.2)]'
              }`}>
                {/* Confetti falling animation when live today */}
                {isLive && <CelebrationConfetti count={35} />}

                {/* 2-Column Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center mb-4 relative z-20">
                  {/* Left Column (Details & Copy) */}
                  <div className="lg:col-span-8 space-y-2.5">
                    {/* Top Status & Date Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className={`text-xs font-black uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-400'}`}>
                          {isLive ? 'TODAY • FOOD CARNIVAL & CHARITY DRIVE LIVE' : activeDrive.date}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider border ${
                        isLive 
                          ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/50 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {isLive ? '🎉 LIVE EVENT TODAY' : activeDrive.badge}
                      </span>
                    </div>

                    {/* Drive Title */}
                    <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white flex items-center gap-2.5">
                      <Gift className={`w-6 h-6 shrink-0 animate-bounce ${isLive ? 'text-emerald-300' : 'text-amber-400'}`} />
                      <span className={isLive ? "bg-gradient-to-r from-emerald-300 via-amber-300 via-rose-300 to-cyan-200 bg-clip-text text-transparent drop-shadow" : "bg-gradient-to-r from-amber-300 via-rose-300 to-amber-100 bg-clip-text text-transparent"}>
                        {activeDrive.title}
                      </span>
                    </h4>

                    {/* Tagline Quote */}
                    {activeDrive.subtitle && (
                      <div className={`p-3 rounded-xl border backdrop-blur-sm ${
                        isLive ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}>
                        <p className="text-xs sm:text-sm font-serif italic font-bold leading-relaxed">
                          "{activeDrive.subtitle}"
                        </p>
                      </div>
                    )}

                    {/* Description - FULL TEXT WITHOUT TRUNCATION */}
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-normal">
                      {activeDrive.description}
                    </p>
                  </div>

                  {/* Right Column (Live Countdown / Celebration Ticker Box) */}
                  <div className={`lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl border-2 shadow-inner text-center backdrop-blur-md ${
                    isLive 
                      ? 'bg-[#06141d]/90 border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-[#080d1a]/90 border-amber-500/50'
                  }`}>
                    <div className="text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 mb-2">
                      {isLive ? (
                        <span className="text-emerald-400 flex items-center gap-1.5 animate-pulse">
                          <Radio className="w-4 h-4 text-emerald-300" />
                          <span>LIVE TODAY: FOOD CARNIVAL</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-rose-500 animate-spin" />
                          <span>LIVE COUNTDOWN TO OCT 15</span>
                        </span>
                      )}
                    </div>
                    <EventCountdownTicker theme="dark" targetDate={eventDateTarget} forceLive={isLive} />
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={onOpenDonate}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white animate-pulse" />
                      <span>Donate Us</span>
                    </button>

                    {isLive ? (
                      <button
                        onClick={() => {
                          if (activeDrive.date.includes('15th October')) {
                            sessionStorage.setItem('ngo_gallery_filter', '15oct_upcoming');
                          } else if (activeDrive.date.includes('26th September')) {
                            sessionStorage.setItem('ngo_gallery_filter', '26 September 2026 Drive');
                          } else if (activeDrive.date.includes('15th August')) {
                            sessionStorage.setItem('ngo_gallery_filter', '15 August 2026 Drive');
                          } else if (activeDrive.date.includes('24th January')) {
                            sessionStorage.setItem('ngo_gallery_filter', 'ZP School Infrastructure');
                          } else {
                            sessionStorage.setItem('ngo_gallery_filter', '26 September 2026 Drive');
                          }
                          onNavigate('gallery');
                        }}
                        className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-slate-950" />
                        <span>View Live Photos & Media Stream ?</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="py-2.5 px-4 rounded-xl bg-slate-800/80 text-slate-300 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-700/80 cursor-not-allowed opacity-90 shadow-inner"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Media Available Post Event</span>
                      </button>
                    )}
                   </div>
                </div>
              </div>
            ) : (
              <div className={`p-6 sm:p-8 rounded-2xl border-2 text-slate-100 transition-all min-h-[250px] flex flex-col justify-between ${isLight ? 'bg-slate-900 border-slate-700' : 'bg-[#0f1422] border-slate-700/60'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      {activeDrive.date}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white">
                    {activeDrive.title}
                  </h4>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                    {activeDrive.description}
                  </p>
                </div>

                {/* Action Button Bar & Pagination Dots */}
                <div className="pt-4 border-t border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      if (activeDrive.date.includes('15th October')) {
                        sessionStorage.setItem('ngo_gallery_filter', '15oct_upcoming');
                      } else if (activeDrive.date.includes('26th September')) {
                        sessionStorage.setItem('ngo_gallery_filter', '26 September 2026 Drive');
                      } else if (activeDrive.date.includes('15th August')) {
                        sessionStorage.setItem('ngo_gallery_filter', '15 August 2026 Drive');
                      } else if (activeDrive.date.includes('24th January')) {
                        sessionStorage.setItem('ngo_gallery_filter', 'ZP School Infrastructure');
                      } else {
                        sessionStorage.setItem('ngo_gallery_filter', '26 September 2026 Drive');
                      }
                      onNavigate('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-amber-400 shadow-md cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{activeDrive.buttonText}</span>
                  </button>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2">
                    {ANNOUNCEMENT_DRIVES.map((drive, idx) => (
                      <button
                        key={drive.id}
                        onClick={() => setCurrentDriveIdx(idx)}
                        aria-label={`Go to ${drive.date}`}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === currentDriveIdx
                            ? 'w-7 bg-amber-400 shadow-md'
                            : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2.5 Give Smile Foundation 3D Plant Growth & Transformation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-3d-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors ${
          isLight ? 'bg-white border-slate-300/80 shadow-[0_12px_36px_rgba(15,23,42,0.08)]' : 'glass-panel border-emerald-500/30'
        }`}>
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Give Smile Foundation • Sustainable Community Growth</span>
            </div>

            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Nurturing Lives from <span className="font-serif italic text-emerald-500 font-normal">Sprout to Self-Reliance</span>
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              At Give Smile Foundation, every donation, volunteer effort, and partnership acts as a seed planted in fertile ground—growing into long-term dignity, education, and opportunity for rural children across Maharashtra.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/40">
                  1
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Grounded in Devotion (Soil Base)</h4>
                  <p className={`text-[11px] leading-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Rooted in 30+ years of community trust, family heritage, and direct grassroots action.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/40">
                  2
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Tender Sprout of Literacy (Light Green Leaves)</h4>
                  <p className={`text-[11px] leading-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Equipping 10,480+ ZP school students & young girls with dignity uniform kits and desks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/40">
                  3
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Flourishing Self-Reliance (Golden Bloom)</h4>
                  <p className={`text-[11px] leading-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Empowering children and underserved families to live with pride, confidence, and independence.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenDonate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                <span>Support Give Smile Foundation</span>
              </button>

              <button
                onClick={onOpenVolunteer}
                className={`px-5 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 cursor-pointer ${
                  isLight ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200' : 'glass-panel text-white border-slate-700 hover:text-emerald-400'
                }`}
              >
                <span>Join as Growth Volunteer</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <PlantGrowth3D
              theme={theme}
              size={340}
              title="Give Smile Foundation Growth Journey"
              subtitle="Watch how your support nurtures a child's future from a tender sprout into full bloom"
              showControls={true}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* 3. Interactive Udyogini-Style "Our Programs" 4-Pillar Section */}
      <OurPrograms theme={theme} onNavigate={onNavigate} />

      {/* 4. Interactive Maharashtra State Reach Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaharashtraMap theme={theme} onOpenDonate={onOpenDonate} />
      </section>

      {/* 5. Udyogini-Style "Stories of Change" Interactive Beneficiary Showcase */}
      <StoriesOfChange theme={theme} onOpenDonate={onOpenDonate} onNavigate={onNavigate} />

      {/* 6. Featured Premier Project: ZP School Infrastructure Drive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-2xl overflow-hidden p-6 lg:p-10 border shadow-3d-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-xl' : 'glass-panel border-brand-500/30 dark-vignette-side'
        }`}>
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-amber-700 text-[11px] font-bold uppercase tracking-wider border border-brand-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Premier Project Highlight
            </div>

            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {ZP_SCHOOL_PROJECT.title}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {ZP_SCHOOL_PROJECT.problem}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              {ZP_SCHOOL_PROJECT.afterState.slice(0, 4).map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-xs font-medium leading-snug ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('projects')}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-amber-500 text-black font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenVideo}
                className={`px-5 py-2.5 rounded-lg border font-bold text-xs flex items-center gap-2 cursor-pointer ${
                  isLight ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200' : 'glass-panel text-white border-slate-700 hover:text-brand-400'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Watch On-Ground Video</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-xl group">
              <img
                src={ZP_SCHOOL_PROJECT.images[0]}
                alt="ZP School Infrastructure Drive"
                className="w-full h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-brand-400 uppercase">On-Ground Transformation</span>
                <h4 className="text-base font-bold text-white mt-0.5">Baramati ZP School Desk & Uniform Kit Distribution</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Media & Press Highlights & Latest 26th September 2026 Media */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[11px] font-extrabold uppercase tracking-wider border border-amber-500/30">
            <Newspaper className="w-3.5 h-3.5 text-amber-600" />
            <span>Recognized in Media & News • 26th September 2026 Field Drive</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Recognized in <span className="font-serif italic text-amber-500 font-normal">Media & News</span>
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Official front-page e-paper news coverage & latest authentic 26th September 2026 field photo and video documentation.
          </p>
        </div>

        {/* 3 Print Press News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESS_EVENTS.map((ev) => (
            <Card3D key={ev.id} theme={theme} className="h-full flex flex-col overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-black/90">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/85 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/40">
                  {ev.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className={`flex items-center gap-1.5 text-[11px] font-bold mb-1.5 text-amber-500`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date}</span>
                  </div>
                  <h3 className={`text-base font-extrabold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {ev.titleEnglish || ev.title}
                  </h3>
                  {ev.titleMarathi && (
                    <div className="text-xs font-semibold text-amber-400 mt-1 font-sans">
                      {ev.titleMarathi}
                    </div>
                  )}
                  <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{ev.summary}</p>
                </div>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-xs font-extrabold text-amber-600 hover:text-amber-500 flex items-center gap-1 cursor-pointer pt-2 group-hover:underline"
                >
                  <span>Read Press Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Latest 26th September 2026 Field Photos & Videos Quick Preview */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
                <ImageIcon className="w-4 h-4" />
              </span>
              <h3 className={`text-base sm:text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Latest 26th September 2026 On-Ground Photos & Videos
              </h3>
            </div>
            <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider hidden sm:inline">
              35 Media Files Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {AUG_26_GALLERY_ITEMS.slice(0, 4).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="relative h-44 rounded-xl overflow-hidden cursor-pointer group border border-slate-700/60 bg-black/90 shadow-md"
              >
                <img
                  src={item.type === 'video' ? (item.poster || item.url) : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-amber-400 text-[9px] font-black uppercase">
                  {item.date}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2.5">
                  <span className="text-[10px] font-bold text-white line-clamp-1 group-hover:text-amber-300">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHOW MORE IMAGES BUTTON WITH ARROW BELOW - Redirects to Image & Video Page in Blogs / Gallery */}
        <div className="text-center pt-4 space-y-3">
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-amber-300/60 group"
          >
            <span>Show More Images & Videos</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform stroke-[3]" />
          </button>

          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('blogs')}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer group"
            >
              <span>Explore Blog Field Photo Proof & In-Depth Stories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Join Us CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-brand-500 via-amber-400 to-brand-600 p-6 sm:p-12 text-black shadow-3d-hover overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Give a Smile Today?
            </h2>
            <p className="mt-2 text-black/80 font-medium text-xs sm:text-sm">
              Join hands with Give Smile Foundation. Whether through volunteering, recurring donations, or partnerships, your involvement changes lives forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenDonate}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-400/40"
            >
              <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
              <span>Donate Us</span>
            </button>

            <button
              onClick={onOpenVolunteer}
              className="px-6 py-3 rounded-xl bg-white/30 backdrop-blur-md text-black font-extrabold text-xs sm:text-sm hover:bg-white/50 transition-all text-center cursor-pointer font-bold"
            >
              <span>Join as Volunteer</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. Be Part of the Change (Color Tinted Cards Section) */}
      <BePartOfChange
        onOpenDonate={onOpenDonate}
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* 10. In Loving Memory & Dedicated Inspiration Section */}
      <TributeHeroSection onNavigate={onNavigate} theme={theme} />

      {/* 11. Infinite Scrollable Partner Ticker (Udyogini-Style Partners) */}
      <PartnerTicker theme={theme} />
    </div>
  );
}
