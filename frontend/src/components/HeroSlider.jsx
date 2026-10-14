import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Play, Film, MousePointerClick } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { SupportHeartIcon } from './CustomIcons';

const SLIDES = [
  {
    isTribute: true,
    image: "/assets/in-memory.jpg?v=3",
    category: "In Loving Memory & Dedicated Inspiration",
    line1: "From Eternal Inspiration",
    dynamicPhrase: "To Selfless Service",
    subtitle: "Give Smile NGO pays deep respect to Late Girish Dattatray Sodmise Sir, the guiding light of Girish Group of Companies whose vision of selfless community service continues to illuminate our path.",
    objectPosition: "center 20%",
    mobileObjectPosition: "center 2%"
  },
  {
    image: "/assets/hero-start.jpg",
    category: "ZP School Infrastructure Inauguration",
    line1: "From Vision",
    dynamicPhrase: "To Grassroots Transformation",
    subtitle: "Inaugurating upgraded classroom infrastructure, desk distribution, and digital facilities at Zilla Parishad schools in Baramati and rural Maharashtra.",
    objectPosition: "right 35%",
    mobileObjectPosition: "85% 15%"
  },
  {
    image: "/assets/press/press-2.jpeg",
    category: "Environmental Stewardship",
    line1: "From Deficit",
    dynamicPhrase: "To Green Futures",
    subtitle: "Community tree plantation and environmental conservation drives empowering local youth to protect ecosystem biodiversity across rural Maharashtra.",
    objectPosition: "center 25%",
    mobileObjectPosition: "70% 15%"
  },
  {
    image: "/assets/events/event-1.jpeg",
    category: "Wholesome Nutrition",
    line1: "From Hunger",
    dynamicPhrase: "To Healthy Futures",
    subtitle: "Serving freshly cooked, nutritious midday meals to underprivileged children and rural families to combat malnutrition and foster healthy growth.",
    objectPosition: "center 15%",
    mobileObjectPosition: "65% 10%"
  },
  {
    image: "/assets/events/event-3.jpeg",
    category: "Eldercare & Health",
    line1: "From Isolation",
    dynamicPhrase: "To Eldercare & Dignity",
    subtitle: "Free comprehensive health checkup camps, vision screenings, and medical care for rural senior citizens to ensure dignity and wellness in old age.",
    objectPosition: "center 20%",
    mobileObjectPosition: "70% 15%"
  },
  {
    image: "/assets/events/event-5.jpeg",
    category: "Youth & Sports Development",
    line1: "From Struggle",
    dynamicPhrase: "To Joy & Excellence",
    subtitle: "Organizing sports equipment drives, tug-of-war competitions, and athletic events for rural Zilla Parishad school students to build teamwork and confidence.",
    objectPosition: "center 30%",
    mobileObjectPosition: "60% 15%"
  },
  {
    image: "/assets/blogs/imgi_35_IMG-20260818-WA0132.jpg",
    category: "ZP School Transformation",
    line1: "From Survival",
    dynamicPhrase: "To Self-Reliance",
    subtitle: "Inaugurating upgraded classrooms, modern learning kits, desks, and solar infrastructure at Somthali ZP Primary School and rural educational hubs.",
    objectPosition: "right 20%",
    mobileObjectPosition: "64% 15%"
  }
];

export default function HeroSlider({ onOpenDonate, onOpenVolunteer, onOpenVideo, onNavigate, isTributeOpen }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);
  const [showVideoMenu, setShowVideoMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger initial landing text animation when opening/landing on the page for the first time
  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setFade(true);
    }, 150);
    return () => clearTimeout(entranceTimer);
  }, []);

  // Hold slide on Index 0 (Girish Sir / Bro's profile photo) while Tribute Intro sequence is open
  useEffect(() => {
    if (isTributeOpen) {
      setCurrentSlide(0);
      setFade(true);
    }
  }, [isTributeOpen]);

  // Helper for Sentence Reframing Transition
  const changeSlide = (newIndexGetter) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(newIndexGetter);
      setTimeout(() => {
        setFade(true);
      }, 40);
    }, 280);
  };

  // Synchronized 7-second auto rotation for background photos & matching text (paused while tribute intro is open)
  useEffect(() => {
    if (isTributeOpen) return;

    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isTributeOpen]);

  const nextSlide = () => {
    changeSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    changeSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const slide = SLIDES[currentSlide];

  // Sentence reframing word parsers
  const line1Parts = slide.line1.split(' ');
  const line1Anchor = line1Parts[0]; // "From"
  const line1Morph = line1Parts.slice(1).join(' ');

  const phraseParts = slide.dynamicPhrase.split(' ');
  const phraseAnchor = phraseParts[0]; // "To"
  const phraseMorph = phraseParts.slice(1).join(' ');

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0d14]"
    >
      {/* Background Image Slideshow */}
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none -z-10'
          }`}
        >
          <img
            src={s.image}
            alt={s.line1}
            style={{
              objectPosition: isMobile ? (s.mobileObjectPosition || 'center 2%') : (s.objectPosition || 'center center')
            }}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-[6000ms] ease-out"
          />
          
          {/* Udyogini Style Vignette Overlays (Dark sides & bottom shadow gradient) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/30 to-transparent" />
        </div>
      ))}

      {/* Subtle Texture Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none z-0" />

      {/* Main Content Overlay matching Udyogini.org layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-14 pb-28 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 h-full">
        {/* Soft Backlight Glow behind Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[320px] sm:w-[550px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-5 flex-1 flex flex-col justify-center h-full">
          
          {/* Category Accent Label (Udyogini style eyebrow accent) */}
          <div>
            <div className={`inline-block border-b border-amber-400/80 pb-0.5 mb-1.5 sm:mb-2 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              fade ? 'duration-700 delay-0 opacity-100 translate-y-0 scale-100' : 'duration-300 delay-0 opacity-0 -translate-y-2 scale-95'
            }`}>
              <span className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                <span>{slide.category}</span>
              </span>
            </div>
          </div>

          {/* Dynamic Sentence Reframing Headline (Perfectly proportioned 2-line layout) */}
          <div className="space-y-0.5 sm:space-y-1 my-0.5 sm:my-1">
            {/* Line 1: Anchored "From" + Reframing Word */}
            <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight leading-tight flex items-center gap-1.5 sm:gap-3 flex-wrap">
              <span className={`transition-opacity duration-500 ${fade ? 'opacity-90' : 'opacity-60'}`}>
                {line1Anchor}
              </span>

              <span className="inline-block relative">
                <span
                  className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                    fade
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 -translate-y-2 scale-95'
                  }`}
                >
                  {line1Morph}
                </span>
              </span>
            </h1>

            {/* Line 2: Anchored "To" + Reframing Serif Italic Phrase */}
            <div className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif italic font-bold leading-tight flex items-center gap-1.5 sm:gap-3 flex-wrap overflow-visible">
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] shrink-0">
                {phraseAnchor}
              </span>

              <span className="inline-block relative overflow-visible">
                <span
                  className={`inline-block leading-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                    fade
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-2 scale-95'
                  }`}
                >
                  {phraseMorph}
                </span>
              </span>
            </div>
          </div>

          {/* Subtitle Paragraph */}
          <p className={`text-xs xs:text-sm sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl p-2.5 sm:p-0 rounded-xl sm:rounded-2xl bg-black/60 sm:bg-transparent border border-white/10 sm:border-none backdrop-blur-md sm:backdrop-blur-none transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            fade ? 'duration-700 delay-200 opacity-100 translate-y-0' : 'duration-300 delay-0 opacity-0 translate-y-2'
          }`}>
            {slide.subtitle}
          </p>

          {/* Dual CTAs matching Udyogini screenshot */}
          <div className={`pt-2 sm:pt-5 flex flex-wrap items-center gap-2 sm:gap-4 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            fade ? 'duration-700 delay-300 opacity-100 translate-y-0' : 'duration-300 delay-0 opacity-0 translate-y-2'
          }`}>
            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (slide.isTribute) {
                  onNavigate('girish-memorial');
                } else {
                  onNavigate('about');
                }
              }}
              className="px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-xl bg-red-800 hover:bg-red-700 text-white font-extrabold text-xs xs:text-sm sm:text-base shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>{slide.isTribute ? 'Know More' : 'Explore Our Impact'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>

            {/* Secondary Action Button - Dark Glass with Play Icon matching screenshot */}
            <button
              onClick={() => onOpenVideo()}
              className="px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white font-bold text-xs xs:text-sm sm:text-base border border-slate-400/40 backdrop-blur-md transition-all flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap shadow-xl"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white shrink-0" />
              <span>Watch Story</span>
            </button>

            <button
              onClick={onOpenDonate}
              className="px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap border border-red-400/40"
            >
              <SupportHeartIcon className="w-4 h-4 sm:w-5 sm:h-5 bg-white/90 p-0.5 rounded-full shadow-sm animate-pulse shrink-0" />
              <span>Donate Us</span>
            </button>
          </div>
        </div>

        {/* Right Side Ultra-Dynamic 3D Holographic Tribute Card */}
        {slide.isTribute && (
          <div className={`relative w-full max-w-[240px] xs:max-w-xs sm:max-w-sm rounded-3xl transition-all duration-700 transform group ${
            fade ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-6 scale-95'
          }`}>
            {/* Ambient Multi-Layer Glowing Backdrop Aura */}
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-r from-amber-500 via-amber-300 to-sky-500 blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 pointer-events-none animate-pulse" />

            {/* 3D Holographic Liquid Border Frame (Zero heavy black block) */}
            <div className="relative p-[2px] rounded-[26px] bg-gradient-to-tr from-amber-500 via-amber-200 to-amber-600 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_60px_rgba(245,158,11,0.65)] group-hover:scale-[1.02] transition-all duration-500 overflow-hidden">
              
              {/* Flowing Conic Gradient Beam */}
              <div
                className="absolute -inset-[200%] animate-[spin_4s_linear_infinite] pointer-events-none opacity-85"
                style={{
                  background: 'conic-gradient(from 0deg, #f59e0b, #fbbf24, #ffffff, #0284c7, #f59e0b)'
                }}
              />

              {/* Inner Glassmorphic Card Container */}
              <div className="relative z-10 w-full rounded-[24px] bg-[#0c1017]/95 backdrop-blur-2xl p-2.5 sm:p-4 flex flex-col items-center justify-center border border-amber-500/40">
                
                {/* Floating Top Badge Tag */}
                <div className="w-full flex items-center justify-between gap-2 mb-1.5 sm:mb-2 px-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 rounded-full bg-amber-500/20 text-amber-300 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider border border-amber-500/40 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 animate-pulse" />
                    <span>In Loving Memory</span>
                  </div>
                </div>

                {/* High-Resolution Portrait Poster Container */}
                <div className="relative w-full rounded-xl overflow-hidden border border-amber-500/30 shadow-xl bg-white p-1">
                  <img
                    src="/assets/in-memory.jpg?v=3"
                    alt="Late Girish Dattatray Sodmise Sir"
                    className="w-full h-auto max-h-48 sm:max-h-64 object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Metallic Gold Typography Footer */}
                <div className="mt-2 sm:mt-3 text-center border-t border-amber-500/20 pt-2 sm:pt-2.5 w-full space-y-0.5">
                  <span className="text-[11px] sm:text-xs font-black tracking-tight bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400 bg-clip-text text-transparent uppercase block">
                    Late Girish Dattatray Sodmise Sir
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-500 uppercase block tracking-widest">
                    Girish Group Dedicated Heritage
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Udyogini-Style Right Vertical Slide Selector (Minimal & Sweet Stack on Far Right - Top Right on Mobile, Centered on Desktop) */}
      <div className="flex flex-col items-end gap-1.5 sm:gap-3 absolute right-2.5 sm:right-6 lg:right-10 top-20 xs:top-24 sm:top-1/2 translate-y-0 sm:-translate-y-1/2 z-30 pointer-events-auto bg-black/50 sm:bg-transparent p-1.5 sm:p-0 rounded-2xl backdrop-blur-md sm:backdrop-blur-none border border-white/15 sm:border-none">
        {SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          const numStr = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentSlide(idx);
                  setFade(true);
                }, 200);
              }}
              title={s.category}
              className={`group flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 cursor-pointer ${
                isActive ? 'scale-105' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider transition-colors ${
                isActive ? 'text-amber-400 font-extrabold' : 'text-white/70 group-hover:text-white'
              }`}>
                {numStr}
              </span>

              {/* Accent Dash / Active Gold Bar */}
              <div className={`transition-all duration-300 ${
                isActive
                  ? 'w-5 sm:w-7 h-0.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                  : 'w-2.5 sm:w-3.5 h-0.5 bg-white/30 group-hover:bg-white/80 group-hover:w-4 sm:group-hover:w-5 rounded-full'
              }`} />
            </button>
          );
        })}
      </div>

      {/* STATIC GROUNDED BOTTOM IMPACT NUMBERS BAR (Pinned at absolute bottom - Zero fade effect) */}
      <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/85 to-transparent pt-3 pb-3 sm:pt-5 sm:pb-5 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* 4-Column Impact Metrics (Static & Unaffected by slide transitions) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-8 lg:gap-12 w-full sm:w-auto text-center sm:text-left">
            <div>
              <div className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                <AnimatedCounter target={10480} suffix="+" duration={2000} />
              </div>
              <div className="text-[9px] sm:text-xs font-extrabold text-amber-400 uppercase tracking-wider mt-0.5 leading-snug">
                Students Empowered
              </div>
            </div>

            <div>
              <div className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                <AnimatedCounter target={30} suffix="+" duration={1800} />
              </div>
              <div className="text-[9px] sm:text-xs font-extrabold text-amber-400 uppercase tracking-wider mt-0.5 leading-snug">
                Years of Impact
              </div>
            </div>

            <div>
              <div className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                <AnimatedCounter target={25} suffix="+" duration={1600} />
              </div>
              <div className="text-[9px] sm:text-xs font-extrabold text-amber-400 uppercase tracking-wider mt-0.5 leading-snug">
                Active Causes
              </div>
            </div>

            <div>
              <div className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                <AnimatedCounter target={100} suffix="%" duration={1500} />
              </div>
              <div className="text-[9px] sm:text-xs font-extrabold text-amber-400 uppercase tracking-wider mt-0.5 leading-snug">
                Direct Aid
              </div>
            </div>
          </div>

          {/* Udyogini-Style Bottom Right "Scroll to explore ∨" Indicator */}
          <div
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
            className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-slate-300 uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity cursor-pointer group shrink-0"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
