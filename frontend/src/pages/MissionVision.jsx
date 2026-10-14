import React from 'react';
import { NGO_INFO, CORE_VALUES } from '../data/ngoData';
import Card3D from '../components/Card3D';
import { Target, Eye, Sparkles } from 'lucide-react';
import PlantGrowth3D from '../components/PlantGrowth3D';

export default function MissionVision({ theme = "dark" }) {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-10 px-4 sm:px-6 lg:px-8 space-y-16 relative overflow-hidden transition-colors duration-300 ${
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

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Target className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Purpose & Long-Term Vision</span>
          </div>
          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Mission & Vision{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Framework
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card3D theme={theme} className="p-8 sm:p-10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 border border-amber-500/40 flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <h2 className={`text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Our Mission</h2>
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
              {NGO_INFO.missionFull}
            </p>
            <div className={`p-4 rounded-xl border text-xs font-medium ${isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'glass-panel border-slate-800 text-brand-300'}`}>
              "Helping people move from dependence to self-reliance through sustainable resources and opportunities."
            </div>
          </Card3D>

          <Card3D theme={theme} className="p-8 sm:p-10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 border border-amber-500/40 flex items-center justify-center">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className={`text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Our Vision</h2>
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
              {NGO_INFO.visionFull}
            </p>
            <div className={`p-4 rounded-xl border text-xs font-medium ${isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'glass-panel border-slate-800 text-amber-300'}`}>
              "A world where access to education, opportunity, and support enables everyone to live with dignity and confidence."
            </div>
          </Card3D>
        </div>

        {/* Interactive 3D Growth Symbol of Self-Reliance */}
        <div className="flex justify-center my-8">
          <PlantGrowth3D
            theme={theme}
            size={320}
            title="Give Smile NGO Lifecycle of Self-Reliance"
            subtitle="From a seed of support in rich soil to a flourishing, dignified life."
            showControls={true}
            className="w-full max-w-xl"
          />
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <h2 className={`text-3xl font-extrabold text-center ${isLight ? 'text-slate-900' : 'text-white'}`}>Core Value Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <Card3D key={idx} theme={theme} className="p-6">
                <Sparkles className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{val.title}</h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{val.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
