import React, { useState } from 'react';
import { Newspaper, Calendar, User, ArrowRight, X, Heart, Eye, Filter, Camera, CheckCircle2, Share2, Globe, ExternalLink, Link2 } from 'lucide-react';
import Card3D from '../components/Card3D';
import { ONLINE_NEWS_PORTALS } from '../data/ngoData';
import { SupportHeartIcon } from '../components/CustomIcons';


// Comprehensive list of all 14 authentic WhatsApp blog & field photos
const ALL_BLOG_PHOTOS = [
  {
    id: 'p1',
    title: 'Somthali ZP School Official Adoption & Inauguration Board',
    category: 'Somthali ZP School',
    image: '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.06 AM.jpeg',
    caption: 'Mr. Dattatray Sodmise and village headmasters at the official inauguration of Somthali ZP Primary School, adopted in memory of Late Girish Dattatray Sodmise Sir.'
  },
  {
    id: 'p2',
    title: 'Ribbon Cutting Inauguration Ceremony at Somthali School',
    category: 'Somthali ZP School',
    image: '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.07 AM.jpeg',
    caption: 'Official ribbon cutting by Mr. Dattatray Sodmise and local Panchayati Raj leaders to launch classroom renovation and desk drives.'
  },
  {
    id: 'p3',
    title: 'Founder Dattatray Sodmise Felicitated by School Committee',
    category: 'Somthali ZP School',
    image: '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.07 AM (1).jpeg',
    caption: 'School headmasters and village elders honoring founder Mr. Dattatray Sodmise for adopting the school under GS Foundation.'
  },
  {
    id: 'p4',
    title: 'Classroom Infrastructure & Garland Ceremony',
    category: 'Somthali ZP School',
    image: '/assets/blogs/imgi_35_IMG-20260818-WA0132.jpg',
    caption: 'School committee and staff gathered inside the decorated ZP school classroom after desk installation.'
  },
  {
    id: 'p5',
    title: 'Dainik Rokhathok Vision - Front Page News Article',
    category: 'Press News',
    image: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg',
    caption: 'Full front-page coverage in Dainik Rokhathok highlighting Give Smile Foundation’s educational adoption drive.'
  },
  {
    id: 'p6',
    title: 'Dainik Janmat - Front Page News Release',
    category: 'Press News',
    image: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg',
    caption: 'Dainik Janmat newspaper featuring Kai. Girish Dattatray Sodmise Sir memorial coverage and ZP school transformation.'
  },
  {
    id: 'p7',
    title: 'Mid-Day Meal Distribution Drive for School Children',
    category: 'Nutrition Drive',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg',
    caption: 'Give Smile NGO volunteers serving fresh hot mid-day meals to primary school children.'
  },
  {
    id: 'p8',
    title: 'Students Enjoying Wholesome Nutrition in School Veranda',
    category: 'Nutrition Drive',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg',
    caption: 'School children in blue uniforms sitting together enjoying nutritious meals.'
  },
  {
    id: 'p9',
    title: 'Healthy Children Stronger Tomorrow Wall Banner & Meal Station',
    category: 'Nutrition Drive',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (2).jpeg',
    caption: 'Volunteers serving meals under the "Healthy Children Stronger Tomorrow" Give Smile banner.'
  },
  {
    id: 'p10',
    title: 'Joyful Student During Nutritional Food Distribution',
    category: 'Nutrition Drive',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.05 PM.jpeg',
    caption: 'Young primary girl smiling while having a nutritious meal served by foundation team.'
  },
  {
    id: 'p11',
    title: 'Free Health Camp for the Elderly - General Physician Station',
    category: 'Eldercare Camp',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg',
    caption: 'General physician conducting free consultations for village senior citizens.'
  },
  {
    id: 'p12',
    title: 'Blood Pressure & Health Diagnostic Checkup for Seniors',
    category: 'Eldercare Camp',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM (1).jpeg',
    caption: 'Doctor checking blood pressure and vital parameters for an elderly patient.'
  },
  {
    id: 13,
    title: 'Volunteers Handing Over Prescription Cards & Medicine Kits',
    category: 'Eldercare Camp',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM.jpeg',
    caption: 'Give Smile volunteer handing free medical diagnostic cards to a senior citizen woman.'
  },
  {
    id: 14,
    title: 'Senior Citizens Queueing at Health Registration Desk',
    category: 'Eldercare Camp',
    image: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM (1).jpeg',
    caption: 'Over 200 senior citizens registered and received free checkups during the drive.'
  }
];

// In-depth blog articles linked with galleries of real photos
const BLOG_ARTICLES = [
  {
    id: 1,
    title: 'Transforming Somthali ZP School: A Memorial Adoption Drive',
    subtitle: 'Official Adoption Ceremony & Press Coverage',
    date: '19 August 2026',
    author: 'Girish Group Editorial Desk',
    readTime: '4 min read',
    category: 'Somthali ZP School',
    mainImage: '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.06 AM.jpeg',
    gallery: [
      '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.06 AM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.07 AM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-07 at 11.29.07 AM (1).jpeg',
      '/assets/blogs/imgi_35_IMG-20260818-WA0132.jpg',
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg'
    ],
    summary: 'Mr. Dattatray Sodmise officially adopted Somthali ZP Primary School in memory of Late Girish Dattatray Sodmise Sir, delivering dual desks, blackboard packages, solar power, and uniform kits.',
    content: `In an emotional and inspiring ceremony, entrepreneur Mr. Dattatray Sodmise (Founder, Girish Group of Companies) adopted the Zilla Parishad Primary School at Somthali village (Taluka Phaltan, District Satara). 

    The initiative, launched in loving memory of Late Girish Dattatray Sodmise Sir under the banner of Give Smile Foundation (GS Foundation Baramati), addresses the critical infrastructural shortages that government rural schools face. 

    The comprehensive transformation drive delivered:
    • Durable dual-bench sitting desks for all classrooms
    • Classroom blackboards and interactive teaching packages
    • Standardized dignity uniform sets for all enrolled students
    • Rooftop solar power setup to ensure uninterrupted power supply for digital learning

    Both Dainik Rokhathok Vision and Dainik Janmat featured front-page news articles praising the project as a benchmark for CSR and community engagement.`
  },
  {
    entry: 2,
    id: 2,
    title: 'Nourishing Young Minds: Mid-Day Meal & Health Distribution Drives',
    subtitle: 'Direct School Nutrition Program',
    date: 'Recent Drive 2026',
    author: 'Nutrition & Health Wing',
    readTime: '3 min read',
    category: 'Nutrition Drive',
    mainImage: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (2).jpeg',
    gallery: [
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (2).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.05 PM.jpeg'
    ],
    summary: 'Serving hot, hygienic, fortified mid-day meals and nutritional packages to primary school children across rural ZP schools.',
    content: `Recognizing that hunger is a major barrier to learning, Give Smile Foundation launched its dedicated Nutrition Drive across rural ZP schools in Pune and Satara districts. 

    Under the banner "Healthy Children, Stronger Tomorrow", foundation volunteers serve hot, balanced meals prepared under strict hygiene guidelines. Attendance records across participating schools showed a 95%+ increase following the rollout of regular meal distributions.`
  },
  {
    id: 3,
    title: 'Free Health Camp for the Elderly: Bringing Healthcare to Rural Elders',
    subtitle: 'Generational Eldercare Initiative',
    date: 'Recent Drive 2026',
    author: 'Healthcare Outreach Team',
    readTime: '4 min read',
    category: 'Eldercare Camp',
    mainImage: '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM (1).jpeg',
    gallery: [
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM (1).jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.36 PM (1).jpeg'
    ],
    summary: 'Over 200 senior citizens received free medical diagnostic consultations, blood pressure checks, and free medicines in rural village camps.',
    content: `Seniors in rural Maharashtra often lack accessible healthcare for age-related chronic conditions. Give Smile Foundation organized a specialized "Free Health Camp for the Elderly" featuring general physicians, cardiologists, and volunteer care assistants.

    Each senior citizen received comprehensive vital diagnostic checks, free prescribed medicines, and personalized health advisory cards for follow-up care.`
  },
  {
    id: 4,
    title: 'Dainik Rokhathok & Dainik Janmat Front-Page Media Coverage',
    subtitle: 'Widespread Regional Media Recognition',
    date: 'August 2026',
    author: 'Media Relations Cell',
    readTime: '3 min read',
    category: 'Press News',
    mainImage: '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg',
    gallery: [
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg',
      '/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg'
    ],
    summary: 'Leading Marathi daily newspapers highlight Give Smile Foundation’s educational adoption and village upliftment models.',
    content: `Major daily news publications across Satara, Sangli, Pune, and Solapur covered the groundbreaking educational work of Give Smile Foundation. Headline articles in Dainik Rokhathok and Dainik Janmat emphasized how corporate stewardship by Girish Group is setting a new benchmark for grassroots social impact.`
  }
];

export default function BlogsPage({ onOpenDonate, theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' or 'photo_proof'
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState(null);

  // Lock body scroll when blog article modal or lightbox photo is open
  React.useEffect(() => {
    if (activeArticle !== null || activeLightboxPhoto !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [activeArticle, activeLightboxPhoto]);

  const isLight = theme === 'light';

  const photoCategories = ['All', 'Somthali ZP School', 'Press News', 'Nutrition Drive', 'Eldercare Camp'];

  const filteredPhotos = selectedPhotoCategory === 'All'
    ? ALL_BLOG_PHOTOS
    : ALL_BLOG_PHOTOS.filter(p => p.category === selectedPhotoCategory);

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-8 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Dynamic Cool Ambient Backdrop Glow Mesh */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-sky-100/30 to-slate-200/50'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Page Header */}
        <section className="text-center space-y-4 pt-2 sm:pt-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Newspaper className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Field Engagements & Transparent Impact</span>
          </div>
          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Give Smile{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Field Engagements
            </span>
          </h1>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Explore real newspaper press reports, inaugural school photos, nutritional drives, and eldercare health camps on the ground.
          </p>

        {/* View Switcher Tabs: Articles vs Field Photo Proof vs Online News Portals */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                : isLight
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>In-Depth Articles ({BLOG_ARTICLES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photo_proof')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
              activeTab === 'photo_proof'
                ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                : isLight
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-500" />
            <span>Field Photo Proof Gallery ({ALL_BLOG_PHOTOS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
              activeTab === 'portals'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 scale-105'
                : isLight
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-300" />
            <span>Online News Portals & Links ({ONLINE_NEWS_PORTALS.length})</span>
          </button>
        </div>
      </section>

      {/* Tab 1: Articles View */}
      {activeTab === 'articles' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_ARTICLES.map((art) => (
              <Card3D key={art.id} theme={theme} className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={art.mainImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/85 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/40">
                    {art.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/85 text-white text-[10px] font-bold flex items-center gap-1 border border-slate-700">
                    <Camera className="w-3 h-3 text-amber-400" />
                    <span>{art.gallery.length} Field Photos</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className={`text-xl font-bold tracking-tight leading-snug group-hover:text-amber-500 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {art.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {art.summary}
                    </p>
                  </div>

                  {/* Thumbnail gallery preview bar */}
                  <div className="pt-3">
                    <div className="text-[10px] uppercase font-bold text-amber-600 mb-2">Inside Gallery Preview:</div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {art.gallery.slice(0, 4).map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt="Gallery thumbnail"
                          className="w-14 h-14 object-cover rounded-lg border border-slate-700 hover:scale-110 transition-transform cursor-pointer"
                          onClick={() => setActiveArticle(art)}
                        />
                      ))}
                      {art.gallery.length > 4 && (
                        <div
                          onClick={() => setActiveArticle(art)}
                          className="w-14 h-14 rounded-lg bg-slate-800 text-amber-400 font-extrabold text-xs flex items-center justify-center border border-slate-700 cursor-pointer"
                        >
                          +{art.gallery.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                    <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      By {art.author}
                    </span>
                    <button
                      onClick={() => setActiveArticle(art)}
                      className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-500/30"
                    >
                      <span>Read Full Story & Photos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Field Photo Proof Gallery View */}
      {activeTab === 'photo_proof' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Sub-category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {photoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPhotoCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedPhotoCategory === cat
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md scale-105'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 14 Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxPhoto(photo)}
                className="group relative rounded-xl overflow-hidden border border-slate-700/60 cursor-pointer shadow-lg aspect-[4/3] bg-slate-900"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400">
                    {photo.category}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 mt-0.5">
                    {photo.title}
                  </h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-300 group-hover:underline">
                    <Eye className="w-3 h-3" />
                    <span>View Photo Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Online News Portals & Direct Article Links View */}
      {activeTab === 'portals' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-4 border-slate-700/40">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/30 mb-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Verified Online News Portals</span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Online News Portals & <span className="font-serif italic text-blue-400 font-normal">Direct Article Links</span>
              </h2>
            </div>
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">
              {ONLINE_NEWS_PORTALS.length} Verified Live URLs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ONLINE_NEWS_PORTALS.map((portal) => (
              <Card3D key={portal.id} theme={theme} className="p-6 flex flex-col justify-between space-y-4 h-full border border-blue-500/30">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {portal.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {portal.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-black text-blue-400">
                    <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{portal.name}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className={`text-base font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {portal.titleEnglish}
                    </h3>
                    <div className="text-xs font-semibold text-amber-400 font-sans leading-tight">
                      {portal.titleMarathi}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {portal.desc}
                  </p>

                  <div className={`p-3 rounded-xl border font-mono text-[11px] truncate flex items-center gap-2 ${
                    isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-black/60 border-slate-800 text-slate-300'
                  }`}>
                    <Link2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{portal.url}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open Live News Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      )}

      {/* Article Detail Modal with Full Photo Gallery */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl transition-all overflow-hidden ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#121722] border-slate-700 text-slate-100'
            }`}
          >
            {/* Sticky Header with Close X Button */}
            <div className={`sticky top-0 z-30 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
              isLight ? 'bg-white/95 border-slate-200' : 'bg-[#121722]/95 border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs font-extrabold uppercase tracking-wider border border-amber-500/30">
                  {activeArticle.category}
                </span>
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Field Article Detail</span>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className={`p-2 rounded-full border cursor-pointer transition-all hover:scale-110 ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
                title="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {activeArticle.title}
                </h2>
                <div className={`flex flex-wrap items-center gap-4 text-xs font-medium mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>By {activeArticle.author}</span>
                  <div>•</div>
                  <span>{activeArticle.date}</span>
                  <div>•</div>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Article Main Image */}
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 border border-slate-700/60 shadow-lg">
                <img src={activeArticle.mainImage} alt={activeArticle.title} className="w-full h-full object-cover" />
              </div>

              {/* Article Summary & Text */}
              <div className={`space-y-4 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                <p className="font-semibold text-sm sm:text-base leading-relaxed text-amber-600">
                  {activeArticle.summary}
                </p>
                <div className="whitespace-pre-line leading-relaxed">
                  {activeArticle.content}
                </div>
              </div>

              {/* Embedded Multi-Photo Gallery for this Article */}
              {activeArticle.gallery && activeArticle.gallery.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-700/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-amber-500 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span>On-Ground Field Photos ({activeArticle.gallery.length} Images)</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">Click any image to expand</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeArticle.gallery.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveLightboxPhoto({ image: imgUrl, title: `${activeArticle.title} - Photo ${idx + 1}`, caption: activeArticle.summary })}
                        className="relative rounded-xl overflow-hidden border border-slate-700 h-28 group cursor-pointer shadow-md"
                      >
                        <img src={imgUrl} alt={`Field Photo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer CTA */}
            <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0f141f] border-slate-800'
            }`}>
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                <span>Support This Initiative</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                  isLight ? 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100' : 'glass-panel text-white border-slate-700 hover:bg-slate-800'
                }`}
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Field Photo Proof Zoom */}
      {activeLightboxPhoto && (
        <div
          onClick={() => setActiveLightboxPhoto(null)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] flex flex-col bg-[#121722] rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden"
          >
            {/* Sticky Header with Close Button */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#121722]">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                Field Photo Detail
              </span>
              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white cursor-pointer transition-all hover:scale-110"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="relative rounded-xl overflow-hidden max-h-[55vh] flex items-center justify-center bg-black border border-slate-800">
                <img
                  src={activeLightboxPhoto.image}
                  alt={activeLightboxPhoto.title}
                  className="max-h-[55vh] w-auto object-contain rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {activeLightboxPhoto.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLightboxPhoto.caption}
                </p>
              </div>
            </div>

            {/* Lightbox Footer */}
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-[#0f141f]">
              <button
                onClick={onOpenDonate}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
                <span>Fund This Local Drive</span>
              </button>

              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs cursor-pointer hover:bg-slate-700"
              >
                Close Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
