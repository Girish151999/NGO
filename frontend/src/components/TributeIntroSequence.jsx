import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, X, CheckCircle2, MousePointerClick } from 'lucide-react';

const INTRO_SLIDES = [
  {
    id: 1,
    src: '/assets/tribute/tribute-1.jpg',
    title: "Late Mr. Girish Dattatray Sodmise Sir",
    category: "FOUNDER & ETERNAL INSPIRATION",
    points: [
      "Guiding light & visionary founder of Girish Group of Companies.",
      "Selfless commitment to rural development, youth & healthcare.",
      "His vision continues to illuminate every Give Smile NGO initiative."
    ]
  },
  {
    id: 2,
    src: '/assets/tribute/tribute-2.png',
    title: "Give Smile NGO Foundation",
    category: "COMMUNITY TRANSFORMATIONS",
    points: [
      "Upgrading Baramati Zilla Parishad classroom infrastructure & desks.",
      "Digital learning kits, wholesome nutrition & sports equipment drives.",
      "Free medical checkup camps & eldercare care for rural senior citizens."
    ]
  },
  {
    id: 3,
    src: '/assets/tribute/tribute-3.png',
    title: "Core Pillars & Impact",
    category: "WOMEN • CHILDREN • ELDERLY",
    points: [
      "Women: Empowering rural women through skill building & dignity.",
      "Children: Quality education, nutrition & school desk distribution.",
      "Elderly: Healthcare support, vision screenings & elder care camps."
    ]
  }
];

export default function TributeIntroSequence({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0); // 0, 1, 2 = Photos | 3 = Merged View
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [activeDetailSlide, setActiveDetailSlide] = useState(null);

  // Lock page scrolling while intro sequence is playing
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, [isOpen]);

  // Reset timeline when modal first opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setIsFadingOut(false);
      setProgressWidth(0);
      setActiveDetailSlide(null);
    }
  }, [isOpen]);

  // Unified timer loop with PAUSE when activeDetailSlide is open & RESUME from exact point when closed
  useEffect(() => {
    if (!isOpen || isFadingOut) return;

    const progressInterval = setInterval(() => {
      // PAUSE TIMER IF A PHOTO HIGHLIGHTS MODAL IS OPEN
      if (activeDetailSlide !== null) {
        return;
      }

      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsFadingOut(true);
          setTimeout(() => {
            onClose();
          }, 900);
          return 100;
        }

        const nextProgress = prev + (100 / 118); // 11.8s total (118 ticks of 100ms)

        // Sync currentSlide based on progress
        if (nextProgress < 25) {
          setCurrentSlide(0);
        } else if (nextProgress < 50) {
          setCurrentSlide(1);
        } else if (nextProgress < 75) {
          setCurrentSlide(2);
        } else {
          setCurrentSlide(3); // Merged phase (3-in-1 collage)
        }

        return nextProgress;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isOpen, isFadingOut, activeDetailSlide, onClose]);

  const handlePhotoClick = (slide) => {
    setActiveDetailSlide(slide);
  };

  if (!isOpen) return null;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientX / innerWidth) - 0.5) * 16; // -8deg to +8deg
    const y = ((clientY / innerHeight) - 0.5) * -16; // -8deg to +8deg
    setMouseTilt({ x, y });
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onClose();
    }, 500);
  };

  const isMerged = currentSlide === 3;
  const slide = INTRO_SLIDES[Math.min(currentSlide, 2)];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[99999] flex flex-col justify-between items-center overflow-hidden transition-opacity duration-1000 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Base Layer: Solid Dark Background (#020408) */}
      <div className="absolute inset-0 bg-[#020408] pointer-events-none z-0" />

      {/* Layer 2: Half Yellow & Half Navy Blue Background (Smooth 1-second crossfade transition) */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(135deg,#f59e0b_0%,#eab308_50%,#0c1838_50%,#050a18_100%)] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
          isMerged ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Volumetric Ambient Gold & Amber Light Halo (Background) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-amber-500/25 via-yellow-400/15 to-rose-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse-gold transition-opacity duration-1000 ${
          isMerged ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Top Floating Control Bar - Skip Button */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2 flex items-center justify-end">
        <button
          onClick={handleSkip}
          className={`px-5 py-2.5 rounded-2xl border text-xs font-extrabold tracking-wider uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer backdrop-blur-xl hover:scale-105 active:scale-95 z-40 ${
            isMerged
              ? 'bg-slate-950 text-amber-300 border-slate-900/80 hover:bg-black shadow-2xl'
              : 'bg-amber-500/15 hover:bg-amber-500/30 border-amber-500/40 text-amber-300'
          }`}
        >
          <span>Skip to Website</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Center Stage: Mobile & Desktop 3D Responsive Experience */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-6 perspective-3d-stage overflow-hidden">
        {!isMerged ? (
          <>
            {/* MOBILE ONLY: TOP TEXT BADGE OVERLAY */}
            <div className="w-full md:hidden flex flex-col items-center justify-center text-center shrink-0 pt-1 z-30">
              {currentSlide === 0 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-base sm:text-xl font-black uppercase text-amber-400 drop-shadow-md tracking-tight block">In Loving Memory Of</span>
                  <span className="text-lg sm:text-2xl font-black uppercase text-white drop-shadow-lg tracking-tight block">Late Mr. Girish Dattatray Sodmise Sir</span>
                </div>
              )}
              {currentSlide === 1 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-base sm:text-xl font-black uppercase text-amber-400 drop-shadow-md tracking-tight block">Uplifting Communities</span>
                  <span className="text-xs sm:text-sm font-extrabold uppercase text-amber-200/90 italic font-serif block">& Empowering Lives</span>
                </div>
              )}
              {currentSlide === 2 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-base sm:text-xl font-black uppercase text-amber-400 drop-shadow-md tracking-tight block">His Dream Didn't End</span>
                  <span className="text-xs sm:text-sm font-extrabold uppercase text-white/90 italic font-serif block">A Legacy of Hope</span>
                </div>
              )}
            </div>

            {/* DESKTOP ONLY: LEFT COLUMN */}
            <div className="hidden md:flex w-1/3 items-center justify-start shrink-0">
              {currentSlide === 0 && (
                <div className="space-y-2 text-left pointer-events-none animate-[fadeIn_0.6s_ease-out]">
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.6)]">
                    In Loving
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Memory Of
                  </div>
                  <div className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-amber-400 drop-shadow-lg">
                    Late Mr. Girish Dattatray
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                    Sodmise Sir
                  </div>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="space-y-2 text-left pointer-events-none animate-[fadeIn_0.6s_ease-out]">
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.6)]">
                    Uplifting
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Communities
                  </div>
                  <div className="text-2xl lg:text-4xl font-extrabold uppercase tracking-widest text-amber-300/90 italic font-serif">
                    & Lives
                  </div>
                </div>
              )}
            </div>

            {/* CENTER COLUMN: FLOATING 3D PHOTO CANVAS */}
            <div className="flex-1 flex items-center justify-center max-w-[340px] sm:max-w-[460px] md:max-w-[540px] shrink-0 my-auto">
              <div
                className="relative z-20 flex items-center justify-center transition-transform duration-300 ease-out animate-float-3d"
                style={{
                  transform: `perspective(1200px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) scale(1.02)`
                }}
              >
                {/* Soft Ambient Volumetric Backlight Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-600/30 rounded-3xl blur-2xl opacity-80 pointer-events-none animate-pulse-gold" />

                {/* Floating 3D Photo Element */}
                <div className="relative max-h-[62vh] sm:max-h-[66vh] md:max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_80px_rgba(245,158,11,0.45)] border-0">
                  <img
                    key={slide.id}
                    src={slide.src}
                    alt={`Photo ${slide.id}`}
                    className="max-h-[60vh] sm:max-h-[64vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl transition-all duration-700 animate-[fadeIn_0.8s_ease-out]"
                  />
                </div>
              </div>
            </div>

            {/* MOBILE ONLY: BOTTOM TEXT BADGE OVERLAY */}
            <div className="w-full md:hidden flex flex-col items-center justify-center text-center shrink-0 pb-1 z-30">
              {currentSlide === 0 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-[10px] sm:text-xs font-mono text-amber-300 uppercase tracking-widest block">Founder Heritage • Est. 2024</span>
                </div>
              )}
              {currentSlide === 1 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-base sm:text-xl font-black uppercase text-white drop-shadow-md tracking-tight block">Spreading Smiles</span>
                  <span className="text-xs sm:text-sm font-extrabold uppercase text-amber-400 tracking-tight block">Every Single Day</span>
                </div>
              )}
              {currentSlide === 2 && (
                <div className="space-y-0.5 animate-[fadeIn_0.5s_ease-out]">
                  <span className="text-base sm:text-xl font-black uppercase text-amber-400 drop-shadow-md tracking-tight block">It Became</span>
                  <span className="text-lg sm:text-2xl font-black uppercase text-white drop-shadow-lg tracking-tight block">Give Smile NGO</span>
                </div>
              )}
            </div>

            {/* DESKTOP ONLY: RIGHT COLUMN */}
            <div className="hidden md:flex w-1/3 items-center justify-end shrink-0">
              {currentSlide === 1 && (
                <div className="space-y-2 text-right pointer-events-none animate-[fadeIn_0.6s_ease-out]">
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Spreading
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.6)]">
                    Smiles
                  </div>
                  <div className="text-2xl lg:text-4xl font-extrabold uppercase tracking-widest text-white/90 italic font-serif">
                    Every Day
                  </div>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="space-y-2 text-right pointer-events-none animate-[fadeIn_0.6s_ease-out]">
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.6)]">
                    His Dream
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Didn't End
                  </div>
                  <div className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-amber-400">
                    It Became
                  </div>
                  <div className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                    Give Smile NGO
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* PHASE 4: THE MERGE - YELLOW 3-IN-1 ARTISTIC PHOTO COLLAGE CANVAS (FULL SCREEN YELLOW & CENTERED) */
          <div className="w-full max-w-5xl my-auto flex flex-col items-center justify-center p-2 sm:p-4 animate-[fadeIn_0.8s_ease-out]">
            
            {/* Top Phase Header Badge */}
            <div className="mb-2.5 px-6 py-2 rounded-full bg-slate-950/90 border border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-widest shadow-2xl flex items-center gap-2.5 z-30 shrink-0 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>LEGACY IN PICTURES • 3 MOMENTS OF INSPIRATION</span>
            </div>

            {/* Main Half-Yellow Half-Navy 3-Photo Collage Frame */}
            <div
              className="relative w-full flex-1 min-h-0 rounded-3xl overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95),0_0_70px_rgba(245,158,11,0.5)] border-4 border-amber-400/80 bg-[linear-gradient(135deg,#f59e0b_0%,#d97706_45%,#0c1838_55%,#040814_100%)] p-4 sm:p-8 flex flex-col justify-between items-center transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1200px) rotateX(${mouseTilt.y * 0.5}deg) rotateY(${mouseTilt.x * 0.5}deg)`
              }}
            >
              {/* Dark Ambient Backlight Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none overflow-hidden">
                <div className="w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-black/80 to-transparent blur-2xl transform scale-110" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10" />
              </div>

              {/* 3 Tilted White-Bordered Photo Cards: Mobile (1 Top + 2 Below) | Desktop (3 Side-by-Side) */}
              <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 px-2 sm:px-6 py-2 overflow-y-auto">
                
                {/* MOBILE: TOP SINGLE CARD (Photo 1) | DESKTOP: LEFT CARD */}
                <div className="w-full md:w-auto flex justify-center">
                  <div
                    onClick={() => handlePhotoClick(INTRO_SLIDES[0])}
                    className="w-[170px] sm:w-[220px] md:flex-1 md:max-w-[310px] aspect-[3/4] bg-white p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform -rotate-3 md:-rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col border-2 border-slate-100"
                  >
                    <div className="w-full flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                      <img
                        src={INTRO_SLIDES[0].src}
                        alt="Photo 1"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-amber-300 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 backdrop-blur-sm">
                        <MousePointerClick className="w-3 h-3" />
                        <span>Click for Highlights</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOBILE: BOTTOM 2 CARDS ROW (Photo 2 & Photo 3) | DESKTOP: CENTER & RIGHT CARDS */}
                <div className="w-full md:w-auto flex items-center justify-center gap-3 sm:gap-6">
                  {/* Frame 2: Center Photo */}
                  <div
                    onClick={() => handlePhotoClick(INTRO_SLIDES[1])}
                    className="w-[145px] sm:w-[200px] md:flex-1 md:max-w-[320px] aspect-[3/4] bg-white p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] transform rotate-2 z-20 hover:rotate-0 hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer group flex flex-col border-2 border-slate-100"
                  >
                    <div className="w-full flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                      <img
                        src={INTRO_SLIDES[1].src}
                        alt="Photo 2"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-amber-300 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 backdrop-blur-sm">
                        <MousePointerClick className="w-3 h-3" />
                        <span>Click for Highlights</span>
                      </div>
                    </div>
                  </div>

                  {/* Frame 3: Right Photo */}
                  <div
                    onClick={() => handlePhotoClick(INTRO_SLIDES[2])}
                    className="w-[145px] sm:w-[200px] md:flex-1 md:max-w-[310px] aspect-[3/4] bg-white p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform rotate-3 md:rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group flex flex-col border-2 border-slate-100"
                  >
                    <div className="w-full flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                      <img
                        src={INTRO_SLIDES[2].src}
                        alt="Photo 3"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-amber-300 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 backdrop-blur-sm">
                        <MousePointerClick className="w-3 h-3" />
                        <span>Click for Highlights</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Serif Title Matching Mockup */}
              <div className="relative z-10 pt-3 pb-1 text-center">
                <div className="text-amber-400 font-black uppercase text-lg sm:text-2xl tracking-widest font-serif drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  MEMORIAL PHOTO COLLAGE
                </div>
                <div className="text-amber-200/90 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase pt-0.5">
                  In Loving Memory of Late Mr. Girish Dattatray Sodmise Sir • Click images to read key points
                </div>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* Bottom Sleek Gold Glow Progress Timeline */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 pt-2">
        <div className="w-full h-1 rounded-full bg-slate-950/80 overflow-hidden backdrop-blur-md shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* INTERACTIVE KEY POINTS MODAL OVERLAY */}
      {activeDetailSlide && (
        <div 
          onClick={() => setActiveDetailSlide(null)}
          className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActiveDetailSlide(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black shrink-0 border border-amber-500/40 shadow-md">
                <img src={activeDetailSlide.src} alt={activeDetailSlide.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{activeDetailSlide.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                  {activeDetailSlide.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Key Story Highlights:
              </div>
              <ul className="space-y-2.5">
                {activeDetailSlide.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveDetailSlide(null)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg cursor-pointer"
              >
                Close Highlights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
