import React, { useState } from 'react';
import { PRESS_EVENTS, ONLINE_NEWS_PORTALS } from '../data/ngoData';
import Card3D from '../components/Card3D';
import { Newspaper, Calendar, FileText, ZoomIn, X, ExternalLink, Globe, Link2, Lock } from 'lucide-react';



export default function EventsPage({ onOpenDonate, theme = "dark" }) {
  const [activeCutting, setActiveCutting] = useState(null);
  const [activeTab, setActiveTab] = useState('portals'); // 'portals', 'cuttings', or 'all'
  const isLight = theme === 'light';

  // Lock body scroll when newspaper cutting lightbox is open
  React.useEffect(() => {
    if (activeCutting !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [activeCutting]);

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-6 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Ambient Light Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Newspaper className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Media Coverage & Press Features</span>
          </div>

          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Media Coverage and{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Press Features
            </span>
          </h1>

          <p className={`text-xs sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Official e-paper scans, full front-page newspaper features, page numbers, and publication archives covering Give Smile NGO's Somthali ZP School transformation.
          </p>

          {/* View Switcher Tabs: Portals vs Print Cuttings vs All */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
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

            <button
              onClick={() => setActiveTab('cuttings')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                activeTab === 'cuttings'
                  ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                  : isLight
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Newspaper className="w-4 h-4 text-amber-500" />
              <span>Physical Print Cuttings ({PRESS_EVENTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-blue-600 text-white border-white/20 shadow-lg scale-105'
                  : isLight
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'glass-panel text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Show All Coverage ({ONLINE_NEWS_PORTALS.length + PRESS_EVENTS.length})</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: PHYSICAL NEWSPAPER PRINT CUTTINGS GRID */}
        {(activeTab === 'cuttings' || activeTab === 'all') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-700/40">
              <h2 className={`text-xl sm:text-2xl font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Newspaper className="w-6 h-6 text-amber-500" />
                <span>Physical Newspaper Print Cuttings & Page 3 Scans</span>
              </h2>
              <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">
                {PRESS_EVENTS.length} Verified Scans
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRESS_EVENTS.map((ev) => (
                <Card3D key={ev.id} theme={theme} className="h-full flex flex-col justify-between overflow-hidden group border border-slate-700/50">
                  <div>
                    {/* Image Container with Zoom Badge */}
                    <div 
                      onClick={() => setActiveCutting(ev)}
                      className="relative h-64 sm:h-72 overflow-hidden cursor-pointer group/img bg-black/90"
                    >
                      <img 
                        src={ev.image} 
                        alt={ev.title} 
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Date Overlay Badge on Image */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                          <Calendar className="w-3 h-3 text-black stroke-[3]" />
                          <span>{ev.date}</span>
                        </span>
                      </div>

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-4 py-2 rounded-full bg-amber-500 text-black font-extrabold text-xs shadow-2xl flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform">
                          <ZoomIn className="w-4 h-4" />
                          <span>View Full Newspaper Cutting</span>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {ev.date}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                          isLight ? 'bg-amber-100 text-amber-800' : 'bg-slate-800 text-amber-400 border border-amber-500/20'
                        }`}>
                          {ev.category}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className={`text-base sm:text-lg font-extrabold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {ev.titleEnglish || ev.title}
                        </h3>
                        {ev.titleMarathi && (
                          <div className="text-xs font-semibold text-amber-400 font-sans tracking-wide">
                            {ev.titleMarathi}
                          </div>
                        )}
                      </div>

                      <div className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}>
                        <div className="font-extrabold text-[10px] uppercase tracking-wider text-amber-500 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{ev.newspaperName} • {ev.pageNumber}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {ev.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Inspect Full News Cutting */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setActiveCutting(ev)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>Inspect Full News Cutting ({ev.pageNumber})</span>
                    </button>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: DEDICATED SEPARATE ONLINE NEWS PORTALS & DIRECT LINKS */}
        {(activeTab === 'portals' || activeTab === 'all') && (
          <div className={`${activeTab === 'all' ? 'pt-8 border-t border-slate-700/50' : ''} space-y-6`}>
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
              <div key={portal.id} className="rounded-2xl overflow-hidden border border-blue-500/40 bg-[#0f1422] shadow-2xl flex flex-col justify-between group hover:border-blue-400 transition-all duration-300">
                {/* Browser Window Header Frame */}
                <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3">
                  {/* 3 Mac-style window dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Browser Mock URL Bar */}
                  <div className="flex-1 bg-black/60 px-3 py-1 rounded-md border border-slate-800 flex items-center gap-1.5 font-mono text-[10px] text-slate-300 truncate">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate text-slate-300">{portal.url}</span>
                  </div>

                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                </div>

                {/* Browser Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
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
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

      </div>

      {/* Full Cutting Image Lightbox Modal */}
      {activeCutting && (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          {/* Top Bar */}
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-white border-b border-slate-800 pb-4">
            <div>
              <span className="px-3 py-1 rounded bg-amber-500 text-black text-[11px] font-black uppercase tracking-wider">
                {activeCutting.newspaperName} • {activeCutting.pageNumber}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-white mt-1 max-w-2xl leading-snug">
                {activeCutting.titleEnglish || activeCutting.title}
              </h2>
              {activeCutting.titleMarathi && (
                <div className="text-xs font-bold text-amber-400 mt-0.5 max-w-2xl">
                  {activeCutting.titleMarathi}
                </div>
              )}
            </div>
            <button
              onClick={() => setActiveCutting(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Full Image Container */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center overflow-auto bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-2xl">
            <img
              src={activeCutting.image}
              alt={activeCutting.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800 pt-3">
            <div>
              Publication Date: <strong className="text-amber-400">{activeCutting.date}</strong> | Location: <strong className="text-white">Somthali ZP School, Baramati</strong>
            </div>
            <div className="flex items-center gap-2">
              {activeCutting.newsUrl && (
                <a
                  href={activeCutting.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Direct News URL 🔗</span>
                </a>
              )}
              <button
                onClick={() => setActiveCutting(null)}
                className="px-5 py-2 rounded-xl bg-white text-black font-extrabold text-xs cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
