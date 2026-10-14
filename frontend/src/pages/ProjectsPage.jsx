import React, { useState, useEffect, useRef } from 'react';
import Card3D from '../components/Card3D';
import {
  Sparkles, Play, CheckCircle2, AlertCircle, MapPin, Heart, ZoomIn, X,
  Sliders, ArrowRight, GraduationCap, Utensils, HeartHandshake,
  Sprout, Scissors, Eye, ChevronRight, Layers, DollarSign, Calculator
} from 'lucide-react';
import { EldercareIcon, WomenSkillsIcon, GreeneryIcon, EducationIcon, SupportHeartIcon } from '../components/CustomIcons';

const ALL_PROJECTS_DATA = [
  {
    id: 'zp-school-drive',
    title: 'Premier Zilla Parishad (ZP) School Infrastructure & Uniform Drive',
    category: 'Education & Schools',
    categoryCode: 'education',
    location: 'Somthali & Baramati Rural ZP Schools',
    status: 'Active Premier Drive',
    fundedPercent: 90,
    goalAmount: '₹5,00,000',
    raisedAmount: '₹4,50,000',
    beneficiaries: '500+ Students',
    icon: GraduationCap,
    accentColor: 'from-amber-500 to-amber-600',
    problem: 'Underfunded rural Zilla Parishad primary schools face acute shortages of sitting desks, student uniform sets, and digital learning infrastructure.',
    solution: 'Providing standardized dual-bench sitting desks, standardized uniform sets, solar panels, and digital e-learning packages.',
    stats: [
      { label: 'Students Empowered', value: '500+' },
      { label: 'Classrooms Upgraded', value: '12+' },
      { label: 'Uniform Kits Handed Over', value: '350+' },
      { label: 'Solar Power Installed', value: '100%' }
    ],
    beforeState: [
      'Students sat on cold, damp concrete floors during monsoon classes',
      'High absenteeism due to lack of basic uniform dignity and desk space',
      'Absence of interactive teaching boards and digital learning tools'
    ],
    afterState: [
      'Durable dual-bench sitting desks installed across all primary classrooms',
      'Standardized dignity uniform sets provided to 100% of enrolled students',
      'Rooftop solar power and interactive digital e-learning packages delivered'
    ],
    images: [
      '/assets/zp/zp-event-26.jpg',
      '/assets/zp/zp-students-group.jpg',
      '/assets/zp/zp-1.jpeg',
      '/assets/zp/zp-2.jpeg',
      '/assets/zp/zp-3.jpeg',
      '/assets/zp/zp-4.jpeg',
      '/assets/zp/zp-5.jpeg',
      '/assets/zp/zp-6.jpeg'
    ],
    videoUrl: '/assets/videos/video-zp1.mp4'
  },
  {
    id: 'eldercare-health-camp',
    title: 'Generational Eldercare & Free Rural Diagnostic Health Camps',
    category: 'Healthcare & Eldercare',
    categoryCode: 'healthcare',
    location: 'Baramati & Satara Rural Villages',
    status: 'Ongoing Community Drive',
    fundedPercent: 85,
    goalAmount: '₹3,00,000',
    raisedAmount: '₹2,55,000',
    beneficiaries: '200+ Senior Citizens',
    icon: HeartHandshake,
    accentColor: 'from-rose-500 to-rose-600',
    problem: 'Rural senior citizens face severe social isolation, lack of accessible chronic health diagnostics, and unmanaged eye vision loss.',
    solution: 'Organizing mobile healthcare diagnostic camps with general physicians, free prescription medicines, eye checkups, and senior care kits.',
    stats: [
      { label: 'Seniors Screened', value: '200+' },
      { label: 'Free Medicines Given', value: '100%' },
      { label: 'Cataract Referrals', value: '24' },
      { label: 'Health Advisory Cards', value: '200+' }
    ],
    beforeState: [
      'Seniors lived with unmanaged hypertension and untreated age-related ailments',
      'No local diagnostic facilities requiring expensive travel to urban hospitals',
      'High incidence of preventable vision loss among elderly villagers'
    ],
    afterState: [
      'On-ground diagnostic health camps conducted directly in rural village squares',
      'Free distribution of essential prescription medicines and vision spectacles',
      'Continuous health advisory cards issued for follow-up care and monitoring'
    ],
    images: [
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM (1).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM (1).jpeg'
    ]
  },
  {
    id: 'nutrition-meal-drive',
    title: 'Hot Mid-Day Meals & Malnutrition Relief Drive',
    category: 'Nutrition & Meals',
    categoryCode: 'nutrition',
    location: 'Primary School Verandas across Pune Region',
    status: 'Daily Active Program',
    fundedPercent: 95,
    goalAmount: '₹4,00,000',
    raisedAmount: '₹3,80,000',
    beneficiaries: '1,000+ Daily Meals',
    icon: Utensils,
    accentColor: 'from-amber-400 to-amber-600',
    problem: 'Childhood hunger and nutritional deficits in rural primary schools lead to fatigue, low attention spans, and school dropouts.',
    solution: 'Serving freshly cooked, hygienic, fortified mid-day meals and nutrition kits directly to primary school children.',
    stats: [
      { label: 'Meals Served Daily', value: '1,000+' },
      { label: 'School Attendance', value: '95%+' },
      { label: 'Schools Covered', value: '8' },
      { label: 'Hygiene Rating', value: '100%' }
    ],
    beforeState: [
      'Underprivileged children arrived at school with empty stomachs',
      'Nutritional deficits caused low concentration during morning lessons',
      'Irregular meal patterns contributed to childhood growth stunting'
    ],
    afterState: [
      'Daily distribution of hot, balanced, micro-nutrient enriched meals',
      'School attendance jumped to 95%+ following meal program rollout',
      'Clean hygiene protocols and regular weight/growth monitoring'
    ],
    images: [
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (2).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.05 PM.jpeg'
    ]
  },
  {
    id: 'green-plantation-drive',
    title: 'Green Earth Community Tree Plantation & Watershed Drive',
    category: 'Environment',
    categoryCode: 'environment',
    location: 'Baramati Soil Conservation Corridors',
    status: 'Active Seasonal Project',
    fundedPercent: 75,
    goalAmount: '₹2,00,000',
    raisedAmount: '₹1,50,000',
    beneficiaries: '2,000+ Saplings Planted',
    icon: Sprout,
    accentColor: 'from-emerald-500 to-teal-600',
    problem: 'De-forestation and drought vulnerability in semi-arid zones cause soil erosion and deplete groundwater tables.',
    solution: 'Engaging rural youth and volunteers to plant native drought-resistant saplings and construct small rain water catchments.',
    stats: [
      { label: 'Trees Planted', value: '2,000+' },
      { label: 'Youth Volunteers', value: '150+' },
      { label: 'Survival Rate', value: '92%' },
      { label: 'Villages Covered', value: '5' }
    ],
    beforeState: [
      'Barren soil patches vulnerable to topsoil erosion during unseasonal rains',
      'Low awareness regarding water conservation among local school youth'
    ],
    afterState: [
      '2,000+ native saplings growing under volunteer adoption care',
      'Improved groundwater retention and green canopy cover'
    ],
    images: [
      '/assets/greenery/greenery_01.jpg',
      '/assets/greenery/greenery_02.jpg',
      '/assets/greenery/greenery_03.jpg',
      '/assets/greenery/greenery_04.jpg'
    ]
  },
  {
    id: 'women-tailoring-center',
    title: 'Rural Women Vocational Tailoring & Skill Incubation Center',
    category: 'Women Empowerment',
    categoryCode: 'empowerment',
    location: 'Wakad & Baramati Community Centers',
    status: 'Active Skill Center',
    fundedPercent: 80,
    goalAmount: '₹3,50,000',
    raisedAmount: '₹2,80,000',
    beneficiaries: '150+ Women Certified',
    icon: Scissors,
    accentColor: 'from-purple-500 to-indigo-600',
    problem: 'Financial dependency and limited employment avenues for rural homemakers and young women.',
    solution: 'Establishing fully equipped vocational tailoring centers with sewing machines, pattern training, and market linkage support.',
    stats: [
      { label: 'Women Certified', value: '150+' },
      { label: 'Machines Installed', value: '25' },
      { label: 'Self-Reliance Rate', value: '88%' },
      { label: 'Micro-Businesses', value: '35+' }
    ],
    beforeState: [
      'Complete financial dependency with no independent income stream',
      'Zero access to structured vocational training equipment in local villages'
    ],
    afterState: [
      'Over 150 women certified in professional tailoring and embroidery',
      '35+ women successfully launched independent tailoring micro-enterprises'
    ],
    images: [
      '/assets/women_upskilling/IMG-20261003-WA0112~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0113~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0114~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0117~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0118~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0119.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0119~2.jpg',
      '/assets/women_upskilling/IMG-20261003-WA0121~2.jpg',
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg',
      '/assets/blogs/imgi_35_IMG-20260818-WA0132.jpg'
    ]
  }
];

const HORIZONTAL_CATEGORY_TABS = [
  { id: 'all', label: 'All Initiatives', icon: Sparkles },
  { id: 'education', label: 'ZP Schools', icon: GraduationCap },
  { id: 'healthcare', label: 'Eldercare', icon: HeartHandshake },
  { id: 'nutrition', label: 'Meals Drive', icon: Utensils },
  { id: 'environment', label: 'Greenery', icon: Sprout },
  { id: 'empowerment', label: 'Women Skills', icon: Scissors }
];

const VERTICAL_DOCK_TABS = [
  { id: 'all', label: 'All Initiatives', icon: Sparkles },
  { id: 'education', label: 'ZP Schools', icon: EducationIcon },
  { id: 'healthcare', label: 'Eldercare', icon: EldercareIcon },
  { id: 'nutrition', label: 'Meals Drive', icon: Utensils },
  { id: 'environment', label: 'Greenery', icon: GreeneryIcon },
  { id: 'empowerment', label: 'Women Skills', icon: WomenSkillsIcon }
];

export default function ProjectsPage({ onOpenDonate, onOpenVideo, theme = 'dark' }) {
  const isLight = theme === 'light';

  // Interactive States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState('after'); // 'before' or 'after'
  const [calculatorAmount, setCalculatorAmount] = useState(5000);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [activeModalImgIndex, setActiveModalImgIndex] = useState(0);
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  const handleOpenProjectModal = (proj) => {
    setSelectedProjectModal(proj);
    setActiveModalImgIndex(0);
  };
  const [showFloatingDock, setShowFloatingDock] = useState(false);
  const [isDockHovered, setIsDockHovered] = useState(false);

  // Scroll listener: activates floating dock past 280px
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingDock(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Projects dynamically based on category
  const filteredProjects = ALL_PROJECTS_DATA.filter((proj) => {
    return selectedCategory === 'all' || proj.categoryCode === selectedCategory;
  });

  // Dynamic featured project for case study based on selected category tab
  const featuredProject = filteredProjects[0] || ALL_PROJECTS_DATA[0];

  // Calculate Impact Metrics based on Calculator Amount
  const desksEquipped = Math.floor(calculatorAmount / 1000);
  const mealsServed = Math.floor(calculatorAmount / 25);
  const seniorsHelped = Math.floor(calculatorAmount / 500);
  const classroomsSupported = (calculatorAmount / 25000).toFixed(1);

  // Dynamically compile category gallery images matching selected initiative category (Strictly 1-for-1 Unique URLs)
  const categoryGalleryImages = filteredProjects
    .flatMap((proj) =>
      proj.images.map((imgUrl) => ({
        url: imgUrl,
        projectTitle: proj.title,
        category: proj.category
      }))
    )
    .filter((item, index, self) => index === self.findIndex((t) => t.url === item.url));

  // Lock body scrolling when project detail modal or full-resolution image modal is open
  useEffect(() => {
    if (!selectedProjectModal && !selectedImageModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, [selectedProjectModal, selectedImageModal]);

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-6 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Light Bulb Ambient Glow Backdrop */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* 1. Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Grassroots On-Ground Action</span>
          </div>
          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Give Smile NGO{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Projects & Impact
            </span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Explore our physical transformation drives, interact with our live impact calculator, and inspect before vs. after case studies.
          </p>
        </div>

        {/* 2. Interactive Category Filter Toolbar */}
        <div className={`p-4 sm:p-6 rounded-3xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-lg' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {HORIZONTAL_CATEGORY_TABS.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-400 shadow-md scale-105'
                      : isLight
                        ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-amber-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Interactive Live Impact Calculator Widget */}
        <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden transition-all shadow-2xl ${
          isLight
            ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-100/50 border-amber-300/60 text-slate-900'
            : 'bg-gradient-to-br from-[#121927] via-[#090d14] to-[#16130b] border-amber-500/30 text-white'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Calculator Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-extrabold uppercase tracking-wider border border-amber-500/30">
                <Calculator className="w-4 h-4" />
                <span>Interactive Impact Calculator</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                Calculate What Your Support Creates
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Move the interactive slider or choose a preset amount to calculate your live real-world impact across ZP schools, child nutrition, and senior healthcare.
              </p>

              {/* Amount Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider opacity-75">Sponsorship Amount:</span>
                  <span className="text-2xl font-black text-amber-500">₹{calculatorAmount.toLocaleString('en-IN')}</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-amber-500"
                />

                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[1000, 2500, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCalculatorAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer border transition-all ${
                        calculatorAmount === amt
                          ? 'bg-amber-500 text-black border-amber-400 shadow-md scale-105'
                          : isLight
                            ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Calculated Outcomes */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border text-center transition-all transform hover:scale-105 ${
                isLight ? 'bg-white border-amber-200 shadow-md' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <GraduationCap className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <div className="text-3xl font-black text-amber-500">{desksEquipped}</div>
                <div className="text-[11px] font-extrabold uppercase mt-1 opacity-80">Students Equipped with Desks</div>
              </div>

              <div className={`p-5 rounded-2xl border text-center transition-all transform hover:scale-105 ${
                isLight ? 'bg-white border-amber-200 shadow-md' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <Utensils className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-amber-500">{mealsServed}</div>
                <div className="text-[11px] font-extrabold uppercase mt-1 opacity-80">Fresh Midday Meals Served</div>
              </div>

              <div className={`p-5 rounded-2xl border text-center transition-all transform hover:scale-105 ${
                isLight ? 'bg-white border-amber-200 shadow-md' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <HeartHandshake className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-amber-500">{seniorsHelped}</div>
                <div className="text-[11px] font-extrabold uppercase mt-1 opacity-80">Senior Care Consultations</div>
              </div>

              <div className={`p-5 rounded-2xl border text-center transition-all transform hover:scale-105 ${
                isLight ? 'bg-white border-amber-200 shadow-md' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-amber-500">{classroomsSupported}</div>
                <div className="text-[11px] font-extrabold uppercase mt-1 opacity-80">Classrooms Upgraded</div>
              </div>

              <div className="col-span-2 pt-2">
                <button
                  onClick={onOpenDonate}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                  <span>Sponsor ₹{calculatorAmount.toLocaleString('en-IN')} Live Impact</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive "Before vs After" Case Study Switcher - Dynamic per Selected Category */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">
                On-Ground Verified Impact ({featuredProject.category})
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Interactive Case Study: "Before" vs "After"
              </h2>
            </div>

            {/* Interactive Switcher Buttons */}
            <div className={`p-1.5 rounded-2xl border flex items-center gap-1 ${
              isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-800'
            }`}>
              <button
                onClick={() => setActiveCaseStudyTab('before')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCaseStudyTab === 'before'
                    ? 'bg-rose-600 text-white shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>"Before" Resource Deficit</span>
              </button>

              <button
                onClick={() => setActiveCaseStudyTab('after')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCaseStudyTab === 'after'
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>"After" On-Ground Impact</span>
              </button>
            </div>
          </div>

          {/* Dynamic Switcher Content Card */}
          <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-500 ${
            activeCaseStudyTab === 'before'
              ? isLight
                ? 'bg-rose-50/80 border-rose-200 text-slate-900'
                : 'bg-rose-950/20 border-rose-500/30 text-white'
              : isLight
                ? 'bg-emerald-50/80 border-emerald-200 text-slate-900'
                : 'bg-emerald-950/20 border-emerald-500/30 text-white'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border">
                  {activeCaseStudyTab === 'before' ? (
                    <span className="text-rose-500 border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
                      Initial Challenge • {featuredProject.category}
                    </span>
                  ) : (
                    <span className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Achieved Dignity & Impact • {featuredProject.category}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                  {activeCaseStudyTab === 'before'
                    ? (featuredProject.problem || featuredProject.title)
                    : featuredProject.title}
                </h3>

                <ul className="space-y-3 pt-2">
                  {(activeCaseStudyTab === 'before'
                    ? (featuredProject.beforeState || [featuredProject.problem])
                    : (featuredProject.afterState || [featuredProject.solution])
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                      {activeCaseStudyTab === 'before' ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <button
                    onClick={() => handleOpenProjectModal(featuredProject)}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer group"
                  >
                    <span>Inspect Full {featuredProject.title} Case Study & Photos</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Best Image Preview for Selected Category & State */}
              <div 
                className={`lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border flex items-center justify-center group cursor-pointer ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-[#080d17] border-slate-700/80'
                }`}
                onClick={() => setSelectedImageModal(featuredProject.images[activeCaseStudyTab === 'before' ? (featuredProject.images.length > 1 ? 1 : 0) : 0])}
              >
                <img
                  src={featuredProject.images[activeCaseStudyTab === 'before' ? (featuredProject.images.length > 1 ? 1 : 0) : 0]}
                  alt={featuredProject.title}
                  className="w-full h-64 sm:h-72 object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-400 font-extrabold text-xs">
                  <ZoomIn className="w-5 h-5" />
                  <span>Click to Expand High-Res Photo</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 5. Projects Portfolio Directory Cards */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-700/50 pb-4">
            <div>
              <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">Full Project Roster</span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Active On-Ground Initiatives ({filteredProjects.length})
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Click any project card to open complete details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const IconComp = proj.icon || GraduationCap;
              return (
                <Card3D key={proj.id} theme={theme} className="h-full flex flex-col justify-between overflow-hidden group">
                  <div className="space-y-4">
                    {/* Card Header Image */}
                    <div className="relative h-52 overflow-hidden bg-black cursor-pointer" onClick={() => handleOpenProjectModal(proj)}>
                      <img
                        src={proj.images[0]}
                        alt={proj.title}
                        className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/80 text-amber-400 text-[10px] font-extrabold uppercase border border-amber-500/30">
                        {proj.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase">
                        {proj.fundedPercent}% Funded
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>

                      <h3 className={`text-lg font-extrabold leading-snug cursor-pointer group-hover:text-amber-500 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`} onClick={() => handleOpenProjectModal(proj)}>
                        {proj.title}
                      </h3>

                      <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {proj.problem}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Raised: {proj.raisedAmount}</span>
                          <span className="text-amber-500">Goal: {proj.goalAmount}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${proj.fundedPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenProjectModal(proj)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'glass-panel hover:bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      <span>Explore Case Study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onOpenDonate}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-md transition-all flex items-center justify-center cursor-pointer shrink-0"
                      title="Sponsor Project"
                    >
                      <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                    </button>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>

        {/* 6. On-Ground Field Photo Gallery */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Field Drive Visual Proof Gallery ({categoryGalleryImages.length} Photos)
            </h2>
            <p className={`text-xs font-semibold ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
              Showing visual proof for:{' '}
              <span className="font-extrabold underline">
                {selectedCategory === 'all'
                  ? 'All Initiatives'
                  : ({
                      education: 'ZP Schools Infrastructure',
                      healthcare: 'Eldercare & Diagnostics',
                      nutrition: 'Meals Drive',
                      environment: 'Greenery & Saplings',
                      empowerment: 'Women Tailoring & Skills'
                    }[selectedCategory] || selectedCategory)}
              </span>{' '}
              • Click any photo to view in 100% full uncropped resolution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryGalleryImages.map((item, idx) => (
              <Card3D key={idx} theme={theme} className="overflow-hidden group cursor-pointer p-2 flex flex-col justify-center items-center">
                <div
                  onClick={() => setSelectedImageModal(item.url)}
                  className={`relative w-full h-64 rounded-2xl overflow-hidden flex items-center justify-center ${
                    isLight ? 'bg-slate-100 border border-slate-200' : 'bg-[#0b1019] border border-slate-800'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`${item.category} ${idx + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-amber-400 font-bold text-xs p-4 text-center backdrop-blur-[2px]">
                    <ZoomIn className="w-5 h-5" />
                    <span>Expand Full Photo</span>
                    <span className="text-[11px] text-slate-200 font-semibold line-clamp-1">{item.projectTitle}</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

      </div>

      {/* 7. Full Project Detailed Modal */}
      {selectedProjectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className={`relative max-w-3xl w-full rounded-3xl p-6 sm:p-8 space-y-6 border shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto ${
              isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#0f1522] text-white border-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 hover:text-black cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-extrabold uppercase">
                {selectedProjectModal.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">{selectedProjectModal.title}</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedProjectModal.location}</span>
              </div>
            </div>

            {/* Photo & Interactive Proof Gallery */}
            <div className="space-y-3">
              <div
                className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black group cursor-pointer border border-amber-500/20"
                onClick={() => setSelectedImageModal(selectedProjectModal.images[activeModalImgIndex || 0] || selectedProjectModal.images[0])}
              >
                <img
                  src={selectedProjectModal.images[activeModalImgIndex || 0] || selectedProjectModal.images[0]}
                  alt={selectedProjectModal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-400 font-extrabold text-xs backdrop-blur-[1px]">
                  <ZoomIn className="w-5 h-5" />
                  <span>Click to Expand Full High-Res Photo</span>
                </div>
              </div>

              {selectedProjectModal.images.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>On-Ground Photo Proofs ({selectedProjectModal.images.length} Photos Available)</span>
                    <span className="text-amber-500">Click thumbnail to switch photo</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {selectedProjectModal.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModalImgIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          (activeModalImgIndex || 0) === idx
                            ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/30'
                            : 'border-slate-700/60 opacity-60 hover:opacity-100 hover:border-slate-400'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <strong className="text-rose-500 uppercase text-[11px] block">Problem Addressed:</strong>
                <p>{selectedProjectModal.problem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <strong className="text-emerald-500 uppercase text-[11px] block">Implemented Solution:</strong>
                <p>{selectedProjectModal.solution}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {selectedProjectModal.stats.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                  <div className="text-lg font-black text-amber-500">{st.value}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex flex-wrap gap-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedProjectModal(null);
                  onOpenDonate();
                }}
                className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                <span>Sponsor This Initiative</span>
              </button>

              {selectedProjectModal.videoUrl && (
                <button
                  onClick={() => {
                    setSelectedProjectModal(null);
                    onOpenVideo();
                  }}
                  className="px-6 py-3.5 rounded-xl glass-panel text-white font-bold text-xs sm:text-sm border border-slate-700 hover:text-amber-400 flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Watch Video</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. Fullscreen High-Res Image Modal */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          onClick={() => setSelectedImageModal(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedImageModal}
              alt="Expanded photo preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-amber-500/30 bg-black"
            />
          </div>
        </div>
      )}

      {/* 9. FLOATING LEFT-SIDE CATEGORY SWITCHER DOCK (Stays tucked left, peeks only on hover) */}
      {showFloatingDock && (
        <div 
          onMouseEnter={() => setIsDockHovered(true)}
          onMouseLeave={() => setIsDockHovered(false)}
          className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 pl-3 sm:pl-5 transition-transform duration-500 ease-out ${
            !isDockHovered
              ? '-translate-x-[calc(100%-18px)] hover:translate-x-0'
              : 'translate-x-0'
          }`}
        >
          {/* Main Navy Blue Glass Dock */}
          <div className="relative p-2.5 sm:p-3 rounded-3xl border-2 border-amber-500/70 bg-[#080d1a] text-white shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.3)] backdrop-blur-2xl flex flex-col items-center gap-3 transition-all">
            
            {/* Top Sparkle Indicator */}
            <div className="p-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 fill-amber-400 animate-pulse" />
            </div>

            <div className="w-8 h-px bg-amber-500/40 my-0.5" />

            {/* Icon-Only Big & Stylish Buttons */}
            <div className="flex flex-col gap-2.5">
              {VERTICAL_DOCK_TABS.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsDockHovered(false);
                    }}
                    className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 border-slate-950 shadow-[0_0_22px_rgba(245,158,11,0.9)] scale-110 font-black'
                        : 'bg-white text-slate-950 border-slate-200 hover:bg-amber-100 hover:border-slate-950 hover:scale-105 shadow-md font-bold'
                    }`}
                  >
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:scale-110 text-slate-950" />

                    {/* Floating Tooltip Label on Hover (Pops out to the right) */}
                    <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-950 text-white text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl border border-amber-500/40 z-50 transform -translate-x-2 group-hover:translate-x-0">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
