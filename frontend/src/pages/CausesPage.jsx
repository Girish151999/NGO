import React, { useState } from 'react';
import { CAUSES } from '../data/ngoData';
import Card3D from '../components/Card3D';
import { Heart, Search, Layers, Sparkles } from 'lucide-react';
import { SupportHeartIcon } from '../components/CustomIcons';

const CATEGORIES = ['All', 'Education', 'Healthcare', 'Empowerment', 'Protection', 'Livelihood', 'Community', 'Environment', 'Innovation', 'Advocacy'];

export default function CausesPage({ onOpenDonate, theme = "dark" }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const isLight = theme === 'light';

  const filteredCauses = CAUSES.filter((c) => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-10 px-4 sm:px-6 lg:px-8 space-y-12 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Fancy Light Bulb Ambient Glow Backdrop Effect */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Layers className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Full Causes Spectrum</span>
          </div>
          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            25 Actionable Causes &{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Programs
            </span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            From basic literacy and ZP school drives to mental health resilience and eldercare, explore our comprehensive multi-generational programs.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search causes (e.g., ZP School, Meals, Eldercare)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border text-xs font-semibold placeholder-slate-400 outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-amber-500 shadow-sm'
                  : 'bg-[#0b1019] border-slate-800 text-white focus:border-amber-500'
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedCat === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-500 shadow-md'
                    : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'glass-panel border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCauses.map((cause) => (
            <Card3D key={cause.id} theme={theme} className="p-6 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/30">
                    {cause.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-500">{cause.impact}</span>
                </div>

                <h3 className={`text-xl font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>{cause.title}</h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{cause.desc}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDonate}
                  className={`w-full py-2.5 rounded-lg border font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isLight
                      ? 'bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-black border-amber-200'
                      : 'bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border-amber-500/30'
                  }`}
                >
                  <SupportHeartIcon className="w-4 h-4 bg-white/90 p-0.5 rounded-full shadow-sm" />
                  <span>Support Cause</span>
                </button>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
}
