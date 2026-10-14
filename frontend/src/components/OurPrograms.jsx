import React, { useState } from 'react';
import {
  ArrowRight, Sparkles, Layers, GraduationCap, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const PROGRAM_PILLARS = [
  {
    id: 1,
    num: '01',
    icon: GraduationCap,
    subtitle: 'End-to-End Classroom Infrastructure',
    title: 'School Infrastructure & Desk Support',
    desc: 'Equipping rural Zilla Parishad (ZP) schools with durable sitting desks, modern blackboard kits, and solar-powered classroom learning environments.',
    stat: '10,480+',
    statLabel: 'Students Empowered',
    image: '/assets/zp/zp-students-group.jpg',
    targetTab: 'projects'
  },
  {
    id: 2,
    num: '02',
    icon: HeartHandshake,
    subtitle: 'Basket Approach to Dignity',
    title: 'Uniform Kits & Healthcare Drives',
    desc: 'Providing standardized dignity uniform kits, essential study books, and free medical check-up camps across underserved rural districts.',
    stat: '350+',
    statLabel: 'Uniform Kits Distributed',
    image: '/assets/events/event-2.jpeg',
    targetTab: 'projects'
  },
  {
    id: 3,
    num: '03',
    icon: Sparkles,
    subtitle: 'Youth & Girl Child Mentorship',
    title: 'Digital Literacy & Skill Training',
    desc: 'Empowering young girls and youth with e-learning tools, computer literacy labs, leadership workshops, and structured career mentorship.',
    stat: '25+',
    statLabel: 'Active Upliftment Tracks',
    image: '/assets/press/press-3.jpeg',
    targetTab: 'causes'
  },
  {
    id: 4,
    num: '04',
    icon: ShieldCheck,
    subtitle: 'Generational Sanctuary & Well-being',
    title: 'Mental Health & Eldercare Support',
    desc: 'Championing universal mental health resilience without social stigma while building dedicated companion and health support networks for senior citizens.',
    stat: '100%',
    statLabel: 'Direct Grassroots Aid',
    image: '/assets/events/event-3.jpeg',
    targetTab: 'causes'
  }
];

export default function OurPrograms({ theme = 'dark', onNavigate }) {
  const [activeId, setActiveId] = useState(1);
  const isLight = theme === 'light';

  const activeProgram = PROGRAM_PILLARS.find(p => p.id === activeId) || PROGRAM_PILLARS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
      {/* Header section with refined modern typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 border-b pb-5 border-slate-700/30"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-extrabold uppercase tracking-widest border border-amber-500/20 mb-2.5">
            <Layers className="w-3.5 h-3.5" />
            Empowerment Pillars
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Our <span className="font-serif italic text-amber-500 font-normal">Programs</span>
          </h2>
        </div>
        <p className={`text-xs sm:text-sm font-medium max-w-md leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Four pillars of intervention creating comprehensive, multi-generational impact across rural and semi-urban communities.
        </p>
      </motion.div>

      {/* Main 2-Column Grid: Left (Interactive 4-Pillar Stack Cards), Right (Dynamic Photo & Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Stack of 4 Interactive Pillar Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5 order-2 lg:order-1">
          {PROGRAM_PILLARS.map((pillar, idx) => {
            const isActive = pillar.id === activeId;
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -35, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => setActiveId(pillar.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden group select-none ${
                  isActive
                    ? isLight
                      ? 'bg-slate-900 text-white border-amber-500 shadow-2xl scale-[1.01]'
                      : 'bg-gradient-to-r from-[#121826] via-[#162032] to-[#121826] text-white border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.18)] scale-[1.01]'
                    : isLight
                      ? 'bg-white text-slate-800 border-slate-200 hover:border-amber-400/70 hover:bg-slate-50 hover:shadow-md'
                      : 'bg-[#0f141f]/70 text-slate-200 border-slate-800/80 hover:border-slate-700 hover:bg-[#141b2a]'
                }`}
              >
                {/* Active left indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-r-full" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 pl-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black tracking-widest ${
                        isActive ? 'text-amber-400' : isLight ? 'text-amber-600' : 'text-amber-500'
                      }`}>
                        {pillar.num}
                      </span>
                      <span className="text-slate-500 text-[10px]">•</span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isActive ? 'text-amber-400/90' : isLight ? 'text-amber-700' : 'text-slate-400'
                      }`}>
                        {pillar.subtitle}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-extrabold tracking-tight leading-snug ${
                      isActive ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {pillar.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${
                      isActive ? 'text-slate-300' : isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Top Right Icon Badge */}
                  <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : isLight
                        ? 'bg-slate-100 text-slate-500 border-slate-200 group-hover:text-amber-600 group-hover:bg-amber-50'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 group-hover:text-amber-400 group-hover:border-slate-700'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Program Image Display */}
        <motion.div
          initial={{ opacity: 0, x: 35, y: 15 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="lg:col-span-6 relative flex flex-col min-h-[360px] lg:min-h-[440px] order-1 lg:order-2"
        >
          <div className="relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 group flex flex-col justify-end bg-[#080d16]">
            {/* Background Image with smooth transition & 100% full fit */}
            <img
              key={activeProgram.id}
              src={activeProgram.image}
              alt={activeProgram.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Top Accent Tag */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 max-w-[calc(100%-32px)] sm:max-w-md">
              <span className="px-3 sm:px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                <span className="truncate">{activeProgram.subtitle}</span>
              </span>
            </div>

            {/* Bottom Content Overlay (Stat Box & Read More Button) */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              {/* Stat Overlay Badge */}
              <div className="bg-black/80 backdrop-blur-md border border-slate-700/80 px-4 sm:px-5 py-3.5 rounded-2xl shadow-xl max-w-xs">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                  {activeProgram.stat}
                </div>
                <div className="text-[10px] font-bold text-slate-300 mt-0.5 uppercase tracking-wider">
                  {activeProgram.statLabel}
                </div>
              </div>

              {/* Read More Action Button */}
              <button
                onClick={() => onNavigate(activeProgram.targetTab)}
                className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-amber-400 hover:text-black font-extrabold text-xs tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer flex-shrink-0 group/btn"
              >
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
