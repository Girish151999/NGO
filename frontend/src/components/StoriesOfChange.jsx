import React, { useState } from 'react';
import { STORIES_OF_CHANGE } from '../data/ngoData';
import {
  Sparkles, MapPin, Quote, ArrowRight, X, Heart, Award, CheckCircle2,
  GraduationCap, ShieldCheck, Sprout, BookOpen, Users, HeartPulse
} from 'lucide-react';

// Custom category track styling config for Give Smile NGO custom theme
const TRACK_THEMES = {
  education: {
    headerGradient: 'from-[#0a192f] via-[#12233f] to-[#071325]',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: GraduationCap,
    watermarkIcon: GraduationCap,
    glowColor: 'hover:border-amber-500/50 hover:shadow-amber-500/10'
  },
  health: {
    headerGradient: 'from-emerald-950 via-teal-900 to-[#062419]',
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: HeartPulse,
    watermarkIcon: HeartPulse,
    glowColor: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10'
  },
  eldercare: {
    headerGradient: 'from-slate-950 via-indigo-950 to-[#0b1021]',
    accentColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    icon: ShieldCheck,
    watermarkIcon: ShieldCheck,
    glowColor: 'hover:border-sky-500/50 hover:shadow-sky-500/10'
  },
  women: {
    headerGradient: 'from-[#850f2e] via-[#971237] to-[#400717]',
    accentColor: 'text-rose-300',
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-500/40',
    icon: Award,
    watermarkIcon: Award,
    glowColor: 'hover:border-rose-500/50 hover:shadow-rose-500/10'
  },
  environment: {
    headerGradient: 'from-teal-950 via-emerald-950 to-[#032014]',
    accentColor: 'text-teal-400',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    icon: Sprout,
    watermarkIcon: Sprout,
    glowColor: 'hover:border-teal-500/50 hover:shadow-teal-500/10'
  }
};

export default function StoriesOfChange({ onOpenDonate, onNavigate, theme = "dark", isStandalonePage = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStoryModal, setSelectedStoryModal] = useState(null);

  // Lock body scroll when story detail modal is open
  React.useEffect(() => {
    if (selectedStoryModal !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [selectedStoryModal]);

  const isLight = theme === 'light';

  const categories = [
    { id: 'all', label: 'All Field Stories' },
    { id: 'education', label: 'ZP School Education' },
    { id: 'health', label: 'Child Nutrition & Health' },
    { id: 'eldercare', label: 'Senior Eldercare & Dignity' }
  ];

  const displayStories = isStandalonePage
    ? (activeCategory === 'all' ? STORIES_OF_CHANGE : STORIES_OF_CHANGE.filter(s => s.categoryCode === activeCategory))
    : STORIES_OF_CHANGE.slice(0, 9);

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isStandalonePage
        ? ''
        : isLight
          ? 'bg-slate-100/70 border-y border-slate-200'
          : 'bg-[#0a0d14] border-y border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wider uppercase border border-amber-500/30 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Give Smile Field Impact</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Stories of <span className="font-serif italic text-amber-600 dark:text-amber-400">Change & Hope</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Explore authentic transformation journals detailing how Give Smile Foundation empowers rural school students, senior citizens, and women across Maharashtra.
          </p>

          {/* Category Filter Pills (Only shown on standalone Stories page) */}
          {isStandalonePage && (
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer shadow-sm ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20 scale-105'
                      : isLight
                        ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                        : 'glass-panel text-slate-300 hover:text-white border border-slate-700/80 hover:border-amber-500/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Give Smile Custom Themed 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayStories.map((story) => {
            const trackStyle = TRACK_THEMES[story.categoryCode] || TRACK_THEMES.education;
            const IconComp = trackStyle.icon;
            const WatermarkComp = trackStyle.watermarkIcon;

            return (
              <div
                key={story.id}
                className={`rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group relative shadow-lg hover:shadow-2xl ${
                  trackStyle.glowColor
                } ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-[#101622] border-slate-800 text-slate-100'
                }`}
              >
                {/* Custom Gradient Header Banner (No Photos! Custom Give Smile Graphic Mesh) */}
                <div className={`relative h-44 p-6 bg-gradient-to-br ${trackStyle.headerGradient} text-white flex flex-col justify-between overflow-hidden shadow-inner`}>
                  {/* Subtle Floating Decorative Glow & Watermark Icon */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                  <WatermarkComp className="absolute -bottom-5 -right-5 w-32 h-32 text-white/[0.07] pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                  <Quote className="absolute top-8 right-6 w-12 h-12 text-white/[0.04] pointer-events-none" />

                  {/* Top Row Badges */}
                  <div className="flex items-center justify-between z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold border shadow-sm backdrop-blur-md ${trackStyle.badgeBg}`}>
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{story.category}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-black/50 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified
                    </span>
                  </div>

                  {/* Header Bottom Info */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200/90">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{story.location}</span>
                    </div>

                    <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wide">
                      Give Smile Drive
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                      <span>{story.role} • {story.age}</span>
                    </div>

                    <h3 className={`text-xl font-bold leading-snug tracking-tight font-serif transition-colors ${
                      isLight ? 'text-[#850f2e] group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
                    }`}>
                      {story.name}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-3 font-normal ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {story.excerpt || story.beforeText}
                    </p>
                  </div>

                  {/* Impact Highlight Badge & Read Story Action Bar */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                    {/* Impact Metric Pill */}
                    <div className="inline-block w-full px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                        {story.impactTag || 'Grassroots Impact'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setSelectedStoryModal(story)}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#850f2e] dark:text-amber-400 hover:underline cursor-pointer group/link"
                      >
                        <span>Read Full Journal</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </button>

                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        Field Audit ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Click for More Stories CTA Button */}
        {!isStandalonePage && (
          <div className="pt-6 text-center">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('stories');
                } else {
                  window.location.hash = '#stories';
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <span>Click for More Stories</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Story Narrative Modal */}
      {selectedStoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#121722] border-slate-700 text-slate-100'
          }`}>
            <button
              onClick={() => setSelectedStoryModal(null)}
              className="sticky top-4 right-4 ml-auto w-10 h-10 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition-all z-20 border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="-mt-14 p-6 sm:p-8 space-y-6">
              {/* Modal Brand Mesh Header */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#850f2e] via-[#971237] to-[#590b20] p-6 text-white flex flex-col justify-between border border-amber-500/30">
                <Quote className="absolute top-6 right-6 w-20 h-20 text-white/10 pointer-events-none" />
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/25">
                    {selectedStoryModal.category}
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedStoryModal.location}
                  </span>
                </div>
                <div className="z-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                    {selectedStoryModal.name}
                  </h2>
                  <span className="text-xs text-amber-200 font-semibold">{selectedStoryModal.role} • {selectedStoryModal.age}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-serif italic">
                "{selectedStoryModal.quote}"
              </div>

              {/* Impact Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                <Award className="w-4 h-4" />
                <span>{selectedStoryModal.impactTag}</span>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4.5 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/20 border-rose-900/40'
                }`}>
                  <div className="text-xs font-extrabold uppercase text-rose-500">Before Give Smile Support</div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {selectedStoryModal.beforeText}
                  </p>
                </div>

                <div className={`p-4.5 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-900/40'
                }`}>
                  <div className="text-xs font-extrabold uppercase text-emerald-500">Transformation & Impact</div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {selectedStoryModal.afterText}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {selectedStoryModal.stats.map((st, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-lg font-black text-amber-400">{st.value}</div>
                    <div className={`text-[10px] uppercase font-bold mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedStoryModal(null);
                    onOpenDonate();
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-extrabold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-black" />
                  <span>Sponsor a Drive Like This</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
