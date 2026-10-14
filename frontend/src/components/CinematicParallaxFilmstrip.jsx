import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Eye,
  GraduationCap,
  Utensils,
  Leaf,
  Users
} from 'lucide-react';
import { AUG_26_GALLERY_ITEMS } from '../data/ngoData';

// Legacy photos list to combine for 40+ total images
const LEGACY_PHOTOS = [
  { id: 'greenery-1', title: 'Tree Plantation & Environmental Leadership', category: 'Plantation', url: '/assets/greenery/greenery_01.jpg', date: '23 Sept 2026' },
  { id: 'greenery-2', title: 'Greener Communities Garden Plantation Drive', category: 'Plantation', url: '/assets/greenery/greenery_02.jpg', date: '23 Sept 2026' },
  { id: 'greenery-3', title: 'Organic Native Tree Sapling Planting', category: 'Plantation', url: '/assets/greenery/greenery_03.jpg', date: '23 Sept 2026' },
  { id: 'sep23-1', title: 'Mid-Day Meal Distribution Drive for Students', category: 'Nutrition', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg', date: '23 Sept 2026' },
  { id: 'sep23-2', title: 'Children Enjoying Wholesome Nutrition Meal', category: 'Nutrition', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg', date: '23 Sept 2026' },
  { id: 'sep23-4', title: 'Free Health Diagnostic Camp for Elderly', category: 'Eldercare', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg', date: '23 Sept 2026' },
  { id: 'press-1', title: 'Somthali ZP School Adoption Press Launch', category: 'Press & Media', url: '/assets/press/press-1.jpeg', date: '19 Aug 2026' },
  { id: 'press-2', title: 'Community Tree Plantation Leadership', category: 'Plantation', url: '/assets/press/press-2.jpeg', date: '19 Aug 2026' },
  { id: 'press-3', title: 'Digital E-Learning & Classroom Mentorship', category: 'ZP Education', url: '/assets/press/press-3.jpeg', date: '19 Aug 2026' },
  { id: 'press-4', title: 'Rural Community Leaders Assembly', category: 'Community', url: '/assets/press/press-4.jpeg', date: '19 Aug 2026' },
  { id: 'aug15-1', title: 'Somthali ZP School Independence Day Ceremony', category: 'Events', url: '/assets/aug15/aug15-1.jpg', date: '15 Aug 2026' },
  { id: 'aug15-2', title: 'Village Gathering at Somthali Center', category: 'Events', url: '/assets/aug15/aug15-2.jpg', date: '15 Aug 2026' },
  { id: 'zp-1', title: 'Baramati ZP School Bench & Desk Handover', category: 'ZP Education', url: '/assets/zp/zp-students-group.jpg', date: '24 Jan 2024' },
  { id: 'zp-2', title: 'Classroom Infrastructure Transformation', category: 'ZP Education', url: '/assets/zp/zp-event-26.jpg', date: '24 Jan 2024' },
  { id: 'zp-3', title: 'Uniform Kit & Learning Supplies Presentation', category: 'ZP Education', url: '/assets/zp/zp-1.jpeg', date: '24 Jan 2024' },
  { id: 'women-1', title: 'Rural Women Vocational Tailoring Training', category: 'Women Empowerment', url: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg', date: '19 Aug 2026' },
  { id: 'women-2', title: 'Sewing Machine Handover for Self-Reliance', category: 'Women Empowerment', url: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg', date: '19 Aug 2026' }
];

const MASTER_IMAGE_POOL = [
  ...AUG_26_GALLERY_ITEMS.filter(i => i.type === 'image'),
  ...LEGACY_PHOTOS
];

const CATEGORIES = [
  { id: 'All', label: 'All NGO Photos', icon: Sparkles },
  { id: '26 August 2026 Drive', label: 'Somthali ZP Drive', icon: GraduationCap },
  { id: 'ZP Education', label: 'ZP Classrooms', icon: GraduationCap },
  { id: 'Plantation', label: 'Greenery Drive', icon: Leaf },
  { id: 'Nutrition', label: 'Mid-Day Meals', icon: Utensils },
  { id: 'Women Empowerment', label: 'Women Skills', icon: Users }
];

export default function CinematicParallaxFilmstrip({ theme = "dark" }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter image pool
  const filteredImages = MASTER_IMAGE_POOL.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Split images into 3 rows for multi-lane infinite parallax
  const row1 = filteredImages.filter((_, idx) => idx % 3 === 0);
  const row2 = filteredImages.filter((_, idx) => idx % 3 === 1);
  const row3 = filteredImages.filter((_, idx) => idx % 3 === 2);

  const isLight = theme === 'light';

  // Modal navigation shortcuts
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  return (
    <section className={`py-10 px-3 sm:px-8 relative overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-slate-900 text-slate-100' : 'bg-[#050811] text-white'
    }`}>
      {/* 60 FPS GPU Hardware Acceleration Keyframes */}
      <style>{`
        @keyframes gpu-marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes gpu-marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .gpu-track-left {
          animation: gpu-marquee-left var(--speed, 40s) linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .gpu-track-right {
          animation: gpu-marquee-right var(--speed, 40s) linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .filmstrip-row-wrapper:hover .gpu-track-left,
        .filmstrip-row-wrapper:hover .gpu-track-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Ambient Glow (Lightweight GPU blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#971237]/20 via-amber-500/10 to-[#971237]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>60 FPS Smooth • 40+ Impact Moments</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
            Grassroots Impact{' '}
            <span className="bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 bg-clip-text text-transparent italic">
              Filmstrip Showcase
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Experience our 40+ on-ground NGO photos in a hardware-accelerated 60 FPS 3-lane cinematic stream. Hover any photo frame to freeze.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md scale-105'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* PARALLAX 3-ROW FILMSTRIP CONTAINER */}
        <div className="filmstrip-row-wrapper space-y-3 overflow-hidden py-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 relative contain-paint">
          {/* Left & Right Shadow Gradients for Vignette */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#050811] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#050811] to-transparent z-20 pointer-events-none" />

          {/* ROW 1: Left to Right */}
          <GPUFilmstripRow 
            images={row1} 
            direction="left" 
            speed="38s" 
            onSelectImage={(img) => {
              const fullIdx = filteredImages.findIndex(i => i.id === img.id);
              setSelectedImageIndex(fullIdx !== -1 ? fullIdx : 0);
            }} 
          />

          {/* ROW 2: Right to Left */}
          <GPUFilmstripRow 
            images={row2} 
            direction="right" 
            speed="32s" 
            onSelectImage={(img) => {
              const fullIdx = filteredImages.findIndex(i => i.id === img.id);
              setSelectedImageIndex(fullIdx !== -1 ? fullIdx : 0);
            }} 
          />

          {/* ROW 3: Left to Right */}
          <GPUFilmstripRow 
            images={row3} 
            direction="left" 
            speed="42s" 
            onSelectImage={(img) => {
              const fullIdx = filteredImages.findIndex(i => i.id === img.id);
              setSelectedImageIndex(fullIdx !== -1 ? fullIdx : 0);
            }} 
          />
        </div>
      </div>

      {/* FULLSCREEN CINEMATIC LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950">
                  {filteredImages[selectedImageIndex].category || 'Field Moment'}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {filteredImages[selectedImageIndex].date || 'Give Smile NGO Archive'}
                </span>
              </div>

              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Image Display */}
            <div className="relative flex-1 flex items-center justify-center my-4">
              <button 
                onClick={() => setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
                className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-slate-700 shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div 
                key={selectedImageIndex}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl max-h-[70vh] rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl relative"
              >
                <img 
                  src={filteredImages[selectedImageIndex].url} 
                  alt={filteredImages[selectedImageIndex].title}
                  style={{
                    maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)'
                  }}
                  className="w-full h-full object-contain max-h-[70vh] bg-slate-950"
                  decoding="async"
                />
              </motion.div>

              <button 
                onClick={() => setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length)}
                className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-slate-700 shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                {filteredImages[selectedImageIndex].title || 'Give Smile NGO Impact Drive'}
              </h3>
              <p className="text-xs text-slate-400">
                Image {selectedImageIndex + 1} of {filteredImages.length} • Press keyboard arrows or click buttons to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 60 FPS GPU Hardware-Accelerated Marquee Strip Row
function GPUFilmstripRow({ images, direction = 'left', speed = '35s', onSelectImage }) {
  if (!images || images.length === 0) return null;

  // Duplicate list twice for seamless 0% -> -50% GPU loop
  const duplicatedList = [...images, ...images];

  return (
    <div className="flex overflow-hidden select-none w-full">
      <div 
        className={`flex gap-3.5 shrink-0 ${direction === 'left' ? 'gpu-track-left' : 'gpu-track-right'}`}
        style={{ '--speed': speed }}
      >
        {duplicatedList.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            onClick={() => onSelectImage(img)}
            className="w-60 sm:w-72 h-36 sm:h-44 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-800 bg-slate-900 shadow-sm hover:border-amber-400 hover:shadow-xl shrink-0 transition-transform duration-200 transform-gpu hover:scale-[1.03]"
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />

            {/* Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            {/* Category Tag */}
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-slate-950/90 text-amber-400 border border-amber-500/30">
              {img.category || 'Impact'}
            </div>

            {/* Title & View Icon */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
              <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                {img.title}
              </h4>
              <p className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
                <span>{img.date || 'Give Smile'}</span>
                <span className="text-amber-400 font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3" /> View
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
