import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Sprout, Heart } from 'lucide-react';

export default function PlantGrowth3D({
  theme = 'dark',
  size = 340,
  title = "Give Smile Foundation Growth Journey",
  subtitle = "Watch how your support nurtures a child's future from a tender sprout into full bloom",
  showControls = true,
  className = ""
}) {
  const isLight = theme === 'light';
  
  // Growth state: 'dormant' -> 'growing' -> 'bloomed' (Good ending!)
  const [growthState, setGrowthState] = useState('bloomed'); // default fully grown on mount
  const [key, setKey] = useState(0); // For replay re-renders
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle 3D perspective mouse tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12; // pitch
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;  // yaw
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleReplay = () => {
    setGrowthState('dormant');
    setKey((prev) => prev + 1);
    setTimeout(() => {
      setGrowthState('growing');
    }, 150);
  };

  useEffect(() => {
    // Initial growth trigger on mount
    const timer = setTimeout(() => {
      setGrowthState('growing');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // When growth reaches end, set to 'bloomed' after 4.8s
  useEffect(() => {
    if (growthState === 'growing') {
      const bloomedTimer = setTimeout(() => {
        setGrowthState('bloomed');
      }, 4800);
      return () => clearTimeout(bloomedTimer);
    }
  }, [growthState, key]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 border select-none ${
        isLight
          ? 'bg-gradient-to-b from-slate-50 via-emerald-50/40 to-slate-100 border-emerald-300/80 shadow-xl text-slate-800'
          : 'bg-gradient-to-b from-[#0d1522]/95 via-[#121c2d]/85 to-[#080d16] border-emerald-500/30 shadow-2xl text-slate-100 glass-panel'
      } ${className}`}
    >
      {/* 3D Dynamic Card Wrapper with Smooth Tilt */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="flex flex-col items-center text-center relative z-10 space-y-4"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between w-full max-w-sm px-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${
            isLight
              ? 'bg-emerald-100/90 text-emerald-800 border-emerald-300'
              : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
          }`}>
            <Sprout className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
            <span>NGO Impact Visualizer</span>
          </div>

          {showControls && (
            <button
              onClick={handleReplay}
              title="Re-play Plant Growth Animation"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm hover:scale-105'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-emerald-500/30 hover:scale-105'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${growthState === 'growing' ? 'animate-spin' : ''}`} />
              <span>Re-grow Seed 🌱</span>
            </button>
          )}
        </div>

        {/* Title & Subtitle */}
        {title && (
          <div className="space-y-1 max-w-md">
            <h3 className={`text-base sm:text-lg font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* 3D PLANT CANVAS / SVG GRAPHIC CONTAINER */}
        <div className="relative flex items-center justify-center my-1" style={{ width: size, height: size }}>
          {/* Subtle Ambient Backlight Glow behind the plant */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
            growthState === 'bloomed' ? 'opacity-90' : 'opacity-40'
          } ${
            isLight
              ? 'bg-gradient-to-t from-amber-200/40 via-emerald-300/40 to-lime-200/50'
              : 'bg-gradient-to-t from-amber-900/40 via-emerald-600/30 to-lime-400/25'
          }`} />

          {/* Glowing Bloom Shockwave Ring on Completion */}
          <AnimatePresence>
            {growthState === 'bloomed' && (
              <motion.div
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute w-40 h-40 rounded-full border-2 border-emerald-400/70 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* MAIN 3D SVG STAGE */}
          <svg
            key={key}
            width={size}
            height={size}
            viewBox="0 0 300 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          >
            <defs>
              {/* --- SOIL GRADIENTS (LIGHT BROWN 3D DIRT MOUND) --- */}
              <radialGradient id="ngoSoilBase" cx="50%" cy="50%" r="50%" fx="40%" fy="30%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="30%" stopColor="#b45309" />
                <stop offset="70%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>

              <radialGradient id="ngoSoilHighlight" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>

              {/* --- PLANT STEM GRADIENT (LIGHT GREEN FRESH SPROUT) --- */}
              <linearGradient id="ngoStemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#15803d" />     {/* Deep root green */}
                <stop offset="35%" stopColor="#22c55e" />    {/* Fresh mint */}
                <stop offset="70%" stopColor="#4ade80" />    {/* Light green */}
                <stop offset="100%" stopColor="#bbf7d0" />   {/* Ultra light green tip */}
              </linearGradient>

              {/* --- LEAF TOP GRADIENT (VERY LIGHT GREEN) --- */}
              <linearGradient id="ngoLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0fdf4" />     {/* Specular light green */}
                <stop offset="40%" stopColor="#dcfce7" />    {/* Tender light green */}
                <stop offset="80%" stopColor="#86efac" />    {/* Vibrant lime green */}
                <stop offset="100%" stopColor="#4ade80" />   {/* Fresh green edge */}
              </linearGradient>

              {/* --- LEAF UNDERSIDE GRADIENT --- */}
              <linearGradient id="ngoLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="60%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              {/* --- BLOOMING FLOWER PETALS (WARM AMBER GOLD & LIME BLOSSOM) --- */}
              <linearGradient id="ngoFlowerPetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>

              <radialGradient id="ngoCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
            </defs>

            {/* ======================================================== */}
            {/* LAYER 1: SOIL BASE MOUND (LIGHT BROWN 3D EARTH)          */}
            {/* ======================================================== */}
            <ellipse cx="150" cy="295" rx="105" ry="24" fill="#000000" opacity={isLight ? "0.2" : "0.55"} className="blur-md" />
            <ellipse cx="150" cy="285" rx="98" ry="32" fill="url(#ngoSoilBase)" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="150" cy="278" rx="88" ry="24" fill="url(#ngoSoilHighlight)" />

            {/* Earth Pebbles & Soil Texture */}
            <g opacity="0.85">
              <circle cx="95" cy="280" r="3.5" fill="#f59e0b" />
              <circle cx="115" cy="288" r="2.5" fill="#78350f" />
              <circle cx="138" cy="274" r="4.5" fill="#d97706" />
              <circle cx="165" cy="275" r="3" fill="#b45309" />
              <circle cx="188" cy="286" r="4" fill="#f59e0b" />
              <circle cx="202" cy="278" r="2" fill="#78350f" />
              <path d="M 120 282 Q 130 286 140 283" stroke="#d97706" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M 160 284 Q 172 288 182 282" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
            </g>

            <ellipse cx="150" cy="272" rx="14" ry="6" fill="#451a03" stroke="#b45309" strokeWidth="1.5" />

            {/* ======================================================== */}
            {/* LAYER 2: LIGHT GREEN 3D SPROUT STEM                       */}
            {/* ======================================================== */}
            <motion.path
              d="M 150 272 Q 142 210 152 160 T 150 70"
              fill="none"
              stroke="url(#ngoStemGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: growthState === 'dormant' ? 0 : 1 }}
              transition={{
                duration: 2.6,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            />

            <motion.path
              d="M 149 270 Q 141 210 151 160 T 149 72"
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: growthState === 'dormant' ? 0 : 1 }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
            />

            {/* ======================================================== */}
            {/* LAYER 3: UNFURLING LIGHT GREEN LEAVES                     */}
            {/* ======================================================== */}

            {/* LEAF PAIR 1 (BOTTOM NODE) */}
            <g transform="translate(145, 225)">
              <motion.g
                initial={{ scale: 0, rotate: -40, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? -40 : -15,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 0.8, duration: 1.1, type: "spring", stiffness: 100 }}
              >
                <path d="M 0 0 C -30 -10 -55 -5 -65 15 C -45 25 -20 20 0 0 Z" fill="url(#ngoLeafDark)" />
                <path d="M 0 0 C -28 -15 -58 -10 -65 12 C -42 18 -18 12 0 0 Z" fill="url(#ngoLeafLight)" stroke="#bbf7d0" strokeWidth="0.8" />
                <path d="M 0 0 Q -32 2 -62 11" stroke="#f0fdf4" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              </motion.g>

              <motion.g
                initial={{ scale: 0, rotate: 40, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? 40 : 15,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 1.0, duration: 1.1, type: "spring", stiffness: 100 }}
              >
                <path d="M 0 0 C 30 -10 55 -5 65 15 C 45 25 20 20 0 0 Z" fill="url(#ngoLeafDark)" />
                <path d="M 0 0 C 28 -15 58 -10 65 12 C 42 18 18 12 0 0 Z" fill="url(#ngoLeafLight)" stroke="#bbf7d0" strokeWidth="0.8" />
                <path d="M 0 0 Q 32 2 62 11" stroke="#f0fdf4" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              </motion.g>
            </g>

            {/* LEAF PAIR 2 (MIDDLE NODE) */}
            <g transform="translate(152, 160)">
              <motion.g
                initial={{ scale: 0, rotate: -30, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? -30 : -8,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 1.5, duration: 1.1, type: "spring", stiffness: 90 }}
              >
                <path d="M 0 0 C -35 -15 -68 -10 -78 18 C -52 30 -22 22 0 0 Z" fill="url(#ngoLeafDark)" />
                <path d="M 0 0 C -32 -20 -65 -15 -78 14 C -48 22 -18 14 0 0 Z" fill="url(#ngoLeafLight)" stroke="#dcfce7" strokeWidth="1" />
                <path d="M 0 0 Q -38 0 -74 13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              </motion.g>

              <motion.g
                initial={{ scale: 0, rotate: 30, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? 30 : 8,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 1.7, duration: 1.1, type: "spring", stiffness: 90 }}
              >
                <path d="M 0 0 C 35 -15 68 -10 78 18 C 52 30 22 22 0 0 Z" fill="url(#ngoLeafDark)" />
                <path d="M 0 0 C 32 -20 65 -15 78 14 C 48 22 18 14 0 0 Z" fill="url(#ngoLeafLight)" stroke="#dcfce7" strokeWidth="1" />
                <path d="M 0 0 Q 38 0 74 13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              </motion.g>
            </g>

            {/* LEAF PAIR 3 (UPPER NODE) */}
            <g transform="translate(148, 105)">
              <motion.g
                initial={{ scale: 0, rotate: -25, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? -25 : -5,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 2.2, duration: 0.9, type: "spring" }}
              >
                <path d="M 0 0 C -25 -12 -45 -8 -52 12 C -35 20 -15 15 0 0 Z" fill="url(#ngoLeafLight)" stroke="#f0fdf4" strokeWidth="1" />
                <path d="M 0 0 Q -24 0 -48 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>

              <motion.g
                initial={{ scale: 0, rotate: 25, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? 25 : 5,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 2.4, duration: 0.9, type: "spring" }}
              >
                <path d="M 0 0 C 25 -12 45 -8 52 12 C 35 20 15 15 0 0 Z" fill="url(#ngoLeafLight)" stroke="#f0fdf4" strokeWidth="1" />
                <path d="M 0 0 Q 24 0 48 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>
            </g>

            {/* ======================================================== */}
            {/* LAYER 4: THE GRAND BLOOMING ENDING (APEX FLOWER / CROWN)   */}
            {/* ======================================================== */}
            <g transform="translate(150, 68)">
              <motion.g
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{
                  scale: growthState === 'dormant' ? 0 : 1,
                  rotate: growthState === 'dormant' ? -90 : 0,
                  opacity: growthState === 'dormant' ? 0 : 1,
                }}
                transition={{ delay: 2.9, duration: 1.4, type: "spring", damping: 14 }}
              >
                {/* Outer Fresh Light Green Crown Leaf Trio */}
                <path d="M 0 0 Q -25 -35 0 -55 Q 25 -35 0 0" fill="url(#ngoLeafLight)" stroke="#ffffff" strokeWidth="1" />
                <path d="M 0 0 Q -50 -25 -45 -48 Q -10 -40 0 0" fill="url(#ngoLeafLight)" opacity="0.9" />
                <path d="M 0 0 Q 50 -25 45 -48 Q 10 -40 0 0" fill="url(#ngoLeafLight)" opacity="0.9" />

                {/* Golden Flower Petal Layer (The Good Ending Blossom) */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: growthState === 'bloomed' || growthState === 'growing' ? 1 : 0 }}
                  transition={{ delay: 3.5, duration: 1.1, type: "spring" }}
                >
                  {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                    <g key={idx} transform={`rotate(${angle})`}>
                      <path
                        d="M 0 0 C -12 -22 0 -36 0 -36 C 0 -36 12 -22 0 0 Z"
                        fill="url(#ngoFlowerPetal)"
                        stroke="#fef08a"
                        strokeWidth="0.8"
                        className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                      />
                    </g>
                  ))}

                  <circle cx="0" cy="0" r="10" fill="url(#ngoCoreGlow)" />
                  <circle cx="0" cy="0" r="6" fill="#f59e0b" opacity="0.9" />
                  <circle cx="-2" cy="-2" r="3" fill="#ffffff" />
                </motion.g>
              </motion.g>

              {/* Permanent Good Ending Breeze Sway Motion */}
              {growthState === 'bloomed' && (
                <motion.g
                  animate={{ y: [0, -3, 0], rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <g>
                    <circle cx="-18" cy="-42" r="2.5" fill="#fde047" className="animate-ping" opacity="0.7" />
                    <circle cx="22" cy="-38" r="2" fill="#86efac" className="animate-pulse" />
                    <circle cx="0" cy="-60" r="3" fill="#ffffff" className="animate-bounce" />
                  </g>
                </motion.g>
              )}
            </g>
          </svg>
        </div>

        {/* Bottom Status & NGO Narrative Footer */}
        <div className="w-full max-w-sm pt-2 border-t border-slate-700/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{growthState === 'bloomed' ? 'Empowered & Flourishing' : 'Nurturing Child Future...'}</span>
            </span>

            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              growthState === 'bloomed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {growthState === 'bloomed' ? '🌱 Self-Reliant Future' : 'Growing...'}
            </span>
          </div>

          <p className={`text-[11px] leading-relaxed italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            "When you give a smile today, you plant a tree of hope that shelters underserved children for generations tomorrow."
          </p>
        </div>
      </motion.div>
    </div>
  );
}
