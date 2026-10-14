import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
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
  Users,
  Maximize2,
  Compass,
  ArrowDown
} from 'lucide-react';
import { AUG_26_GALLERY_ITEMS } from '../data/ngoData';

// Combine all 40+ NGO photos
const LEGACY_PHOTOS = [
  { id: 'greenery-1', title: 'Tree Plantation & Environmental Leadership', category: 'Plantation', url: '/assets/greenery/greenery_01.jpg', date: '23 Sept 2026', desc: 'Mass tree plantation drive empowering rural youth and greening school premises.' },
  { id: 'greenery-2', title: 'Greener Communities Garden Plantation Drive', category: 'Plantation', url: '/assets/greenery/greenery_02.jpg', date: '23 Sept 2026', desc: 'Creating native botanical gardens for rural schools.' },
  { id: 'greenery-3', title: 'Organic Native Tree Sapling Planting', category: 'Plantation', url: '/assets/greenery/greenery_03.jpg', date: '23 Sept 2026', desc: 'Student eco-clubs adopting native tree saplings.' },
  { id: 'sep23-1', title: 'Mid-Day Meal Distribution Drive for Students', category: 'Nutrition', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg', date: '23 Sept 2026', desc: 'Serving freshly cooked nutritious meals to underserved school children.' },
  { id: 'sep23-2', title: 'Children Enjoying Wholesome Nutrition Meal', category: 'Nutrition', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg', date: '23 Sept 2026', desc: 'Promoting student health and zero-hunger in rural communities.' },
  { id: 'sep23-4', title: 'Free Health Diagnostic Camp for Elderly', category: 'Eldercare', url: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg', date: '23 Sept 2026', desc: 'Providing free medical checkups and vision diagnostics for senior citizens.' },
  { id: 'press-1', title: 'Somthali ZP School Adoption Press Launch', category: 'Press & Media', url: '/assets/press/press-1.jpeg', date: '19 Aug 2026', desc: 'Landmark media launch announcing Somthali ZP School adoption.' },
  { id: 'press-2', title: 'Community Tree Plantation Leadership', category: 'Plantation', url: '/assets/press/press-2.jpeg', date: '19 Aug 2026', desc: 'Environmental leadership and sapling handover.' },
  { id: 'press-3', title: 'Digital E-Learning & Classroom Mentorship', category: 'ZP Education', url: '/assets/press/press-3.jpeg', date: '19 Aug 2026', desc: 'Equipping rural classrooms with smart digital screens.' },
  { id: 'press-4', title: 'Rural Community Leaders Assembly', category: 'Community', url: '/assets/press/press-4.jpeg', date: '19 Aug 2026', desc: 'Grassroots leaders collaborating for rural school upliftment.' },
  { id: 'aug15-1', title: 'Somthali ZP School Independence Day Ceremony', category: 'Events', url: '/assets/aug15/aug15-1.jpg', date: '15 Aug 2026', desc: 'Swatantryadin flag hoisting and cultural celebrations with students.' },
  { id: 'aug15-2', title: 'Village Gathering at Somthali Center', category: 'Events', url: '/assets/aug15/aug15-2.jpg', date: '15 Aug 2026', desc: 'Community assembly celebrating rural educational infrastructure.' },
  { id: 'zp-1', title: 'Baramati ZP School Bench & Desk Handover', category: 'ZP Education', url: '/assets/zp/zp-students-group.jpg', date: '24 Jan 2024', desc: 'Dual-bench sitting desks provided to ZP primary students.' },
  { id: 'zp-2', title: 'Classroom Infrastructure Transformation', category: 'ZP Education', url: '/assets/zp/zp-event-26.jpg', date: '24 Jan 2024', desc: 'Restoring dignity and comfort in rural classrooms.' },
  { id: 'zp-3', title: 'Uniform Kit & Learning Supplies Presentation', category: 'ZP Education', url: '/assets/zp/zp-1.jpeg', date: '24 Jan 2024', desc: 'Distributing uniform kits and study supplies.' },
  { id: 'women-1', title: 'Rural Women Vocational Tailoring Training', category: 'Women Empowerment', url: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg', date: '19 Aug 2026', desc: 'Empowering women with vocational sewing skills and micro-entrepreneurship.' },
  { id: 'women-2', title: 'Sewing Machine Handover for Self-Reliance', category: 'Women Empowerment', url: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg', date: '19 Aug 2026', desc: 'Distributing heavy-duty tailoring equipment for economic independence.' },
  { id: 'women-upskill-1', title: 'Rural Women Vocational Tailoring & Skill Incubation Drive', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0112~2.jpg', date: '3 Oct 2026', desc: 'Comprehensive tailoring and pattern-making workshop session.' },
  { id: 'women-upskill-2', title: 'Garment Fabrication & Pattern Machine Training Workshop', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0113~2.jpg', date: '3 Oct 2026', desc: 'Practical machine stitching and pattern cutting mentorship.' },
  { id: 'women-upskill-3', title: 'Artisan Embroidery & Sewing Machine Practical Session', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0114~2.jpg', date: '3 Oct 2026', desc: 'Advanced garment finishing and boutique tailoring techniques.' },
  { id: 'women-upskill-4', title: 'Women Entrepreneurship & Micro-Business Machine Handover', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0117~2.jpg', date: '3 Oct 2026', desc: 'Equipping rural women entrepreneurs with sewing machinery.' },
  { id: 'women-upskill-5', title: 'Self-Reliance Certification & Tailoring Mentorship Assembly', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0118~2.jpg', date: '3 Oct 2026', desc: 'Certifying skilled rural women artisans for economic independence.' },
  { id: 'women-upskill-6', title: 'Community Women Vocational Upskilling Workshop Session A', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0119.jpg', date: '3 Oct 2026', desc: 'On-ground vocational skill center training group.' },
  { id: 'women-upskill-7', title: 'Community Women Vocational Upskilling Workshop Session B', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0119~2.jpg', date: '3 Oct 2026', desc: 'Group pattern fabrication and tailoring session.' },
  { id: 'women-upskill-8', title: 'Heavy-Duty Tailoring Equipment Handover for Rural Women', category: 'Women Empowerment', url: '/assets/women_upskilling/IMG-20261003-WA0121~2.jpg', date: '3 Oct 2026', desc: 'Supporting rural households with tailoring micro-enterprises.' }
];

const MASTER_IMAGE_POOL = [
  ...AUG_26_GALLERY_ITEMS.filter(i => i.type === 'image'),
  ...LEGACY_PHOTOS
];

const CATEGORIES = [
  { id: '26 August 2026 Drive', label: 'Somthali ZP Drive', icon: GraduationCap },
  { id: 'ZP Education', label: 'ZP Classrooms', icon: GraduationCap },
  { id: 'Plantation', label: 'Greenery Drive', icon: Leaf },
  { id: 'Nutrition', label: 'Mid-Day Meals', icon: Utensils },
  { id: 'Women Empowerment', label: 'Women Skills', icon: Users }
];

export default function Cinematic3DScrollPortal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('26 August 2026 Drive');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const scrollContainerRef = useRef(null);

  // Filter image pool
  const filteredImages = MASTER_IMAGE_POOL.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Framer motion scroll progress hook
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    restDelta: 0.001
  });

  // Prevent background body scroll when portal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#040711] text-white flex flex-col overflow-hidden select-none"
      >
        {/* Ambient GPU Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-[#971237]/25 via-amber-500/15 to-[#971237]/25 rounded-full blur-[140px] pointer-events-none" />

        {/* TOP FIXED PORTAL NAVBAR */}
        <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif leading-none text-white">
                3D Cinematic Scroll Portal
              </h2>
              <p className="text-[11px] text-amber-400 font-medium">
                Scroll mouse wheel down to navigate 40+ NGO moments in 3D depth
              </p>
            </div>
          </div>

          {/* Category Filter Pills inside Portal */}
          <div className="hidden lg:flex items-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all border border-rose-500/40"
          >
            <X className="w-4 h-4" />
            <span>Close Portal</span>
          </button>
        </div>

        {/* SCROLL ENGINE CONTAINER (Mouse wheel scroll drives 3D position) */}
        <div 
          ref={scrollContainerRef}
          className="relative flex-1 overflow-y-auto scroll-smooth custom-portal-scrollbar"
        >
          {/* Scroll Track Space */}
          <div className="min-h-[350vh] px-4 sm:px-12 py-16 max-w-6xl mx-auto relative">
            
            {/* Scroll Indicator Prompt */}
            <div className="text-center space-y-2 mb-12 sticky top-6 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-2xl">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>Scroll Down Mouse Wheel to Fly Through 3D Corridor</span>
              </div>
            </div>

            {/* 3D PERSPECTIVE IMAGE CORRIDOR GRID */}
            <div className="space-y-24 sm:space-y-36 relative z-10 pb-32">
              {filteredImages.map((img, index) => (
                <Scroll3DCard 
                  key={img.id} 
                  img={img} 
                  index={index} 
                  total={filteredImages.length}
                  onSelect={() => setSelectedPhoto(img)} 
                />
              ))}
            </div>

          </div>
        </div>

        {/* SPOTLIGHT MODAL FOR SELECTED IMAGE */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
            >
              <div className="flex items-center justify-between text-white border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950">
                    {selectedPhoto.category || 'Field Moment'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {selectedPhoto.date || 'Give Smile NGO Archive'}
                  </span>
                </div>

                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center my-4">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-5xl max-h-[70vh] rounded-2xl overflow-hidden relative"
                >
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title}
                    style={{
                      maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)'
                    }}
                    className="w-full h-full object-contain max-h-[70vh] bg-[#040711]"
                  />
                  <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_60px_25px_#040711]" />
                </motion.div>
              </div>

              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h3 className="text-lg font-bold text-white font-serif">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedPhoto.desc || 'On-ground field photo documentation from Give Smile NGO.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

// Individual 3D Scroll Perspective Card Component
function Scroll3DCard({ img, index, total, onSelect }) {
  const cardRef = useRef(null);

  // Determine alternate alignment (Left vs Center vs Right for 3D staggered layout)
  const alignClass = index % 3 === 0 ? 'mr-auto md:w-[60%]' : index % 3 === 1 ? 'mx-auto md:w-[70%]' : 'ml-auto md:w-[60%]';

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      className={`w-full ${alignClass} group cursor-pointer`}
    >
      <div className="rounded-3xl bg-[#040711] overflow-hidden transition-all duration-500 hover:scale-[1.02] transform-gpu relative">
        
        {/* Photo Container with 4-Side Feathered Edge Blend */}
        <div className="aspect-[16/9] w-full overflow-hidden relative bg-[#040711]">
          <img 
            src={img.url} 
            alt={img.title}
            style={{
              maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)'
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
            loading="lazy"
            decoding="async"
          />

          {/* 4-Side Soft Inset Shadow Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_60px_25px_#040711]" />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950/90 text-amber-400 border border-amber-500/40 backdrop-blur-md shadow-md">
              {img.category || 'Impact Drive'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-950/90 text-slate-300 border border-slate-800 backdrop-blur-md">
              {index + 1} / {total}
            </span>
          </div>

          {/* Bottom Caption Overlay inside Photo Card */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1.5 z-10 text-left">
            <h3 className="text-lg sm:text-2xl font-extrabold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {img.title}
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2">
              {img.desc || 'Field Engagement & Community Upliftment Drive'}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-bold border-t border-white/10">
              <span className="flex items-center gap-1 text-amber-400">
                <Calendar className="w-3.5 h-3.5" /> {img.date || 'Give Smile Archive'}
              </span>
              <span className="text-amber-400 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <Eye className="w-3.5 h-3.5" /> Click to Expand Photo
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
