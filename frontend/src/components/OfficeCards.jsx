import React from 'react';
import { Building2, MapPin, ExternalLink, Navigation, Sparkles, ShieldCheck } from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';

export default function OfficeCards({ theme = "dark", showMapLinks = true }) {
  const isLight = theme === 'light';

  const headquarterData = {
    title: "Headquarter Office",
    subtitle: "Baramati Operational Base",
    badge: "PRIMARY HQ",
    icon: Building2,
    unit: "Office No. 25",
    road: "Baramati-Bhigwan Road",
    colony: "Anand Nagar Colony",
    cityState: "Baramati, Maharashtra",
    pincode: "413102",
    fullAddress: NGO_INFO.headquarter.address,
    mapQuery: "Baramati-Bhigwan Rd, Anand Nagar Colony, Baramati, Maharashtra 413102",
    accentGradient: "from-amber-500 via-yellow-400 to-indigo-500"
  };

  const corporateData = {
    title: "Corporate Office",
    subtitle: "Pune Strategic Hub",
    badge: "PUNE CORPORATE",
    icon: MapPin,
    unit: "Office No. 105",
    road: "Pride Purple Square, Kalewadi Phata",
    colony: "Vishnu Dev Nagar, Wakad",
    cityState: "Pimpri-Chinchwad, Pune",
    pincode: "411057",
    fullAddress: NGO_INFO.corporateOffice.address,
    mapQuery: "Pride Purple Square, Wakad, Pimpri-Chinchwad, Maharashtra 411057",
    accentGradient: "from-indigo-500 via-sky-400 to-amber-500"
  };

  const cards = [headquarterData, corporateData];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
      {cards.map((office, idx) => {
        const IconComponent = office.icon;

        return (
          <div
            key={idx}
            className={`relative rounded-3xl overflow-hidden transition-all duration-500 group flex flex-col justify-between border shadow-2xl h-full ${
              isLight
                ? idx === 0
                  ? 'bg-gradient-to-br from-amber-50/70 via-white to-indigo-50/50 border-amber-200/90 shadow-[0_15px_35px_rgba(245,158,11,0.08)] hover:shadow-[0_25px_50px_rgba(245,158,11,0.18)] hover:border-amber-400'
                  : 'bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/50 border-indigo-200/90 shadow-[0_15px_35px_rgba(99,102,241,0.08)] hover:shadow-[0_25px_50px_rgba(99,102,241,0.18)] hover:border-indigo-400'
                : idx === 0
                  ? 'bg-gradient-to-br from-[#1c160c] via-[#0f172a] to-[#0d1426] border-amber-500/30 shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]'
                  : 'bg-gradient-to-br from-[#0d1426] via-[#0f172a] to-[#1c160c] border-indigo-500/30 shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:border-indigo-400/80 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
            }`}
          >
            {/* Top Gradient Edge Accent Beam */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${office.accentGradient}`} />

            {/* Ambient Background Glow Effect on Hover */}
            <div className={`absolute -right-20 -top-20 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-60 ${
              idx === 0 ? 'bg-amber-500' : 'bg-sky-500'
            }`} />

            {/* Main Card Content */}
            <div className="p-6 space-y-5 relative z-10 flex-1 flex flex-col justify-between">
              
              {/* Header: Icon Squircle + Tag Pill */}
              <div className="flex items-center justify-between gap-4">
                
                {/* 3D Chamfered Icon Squircle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg border ${
                  isLight
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-400 shadow-amber-500/25'
                    : 'bg-gradient-to-br from-[#2a1d0d] via-[#1f1509] to-[#120d06] text-amber-400 border-amber-500/40 shadow-[inset_0_2px_12px_rgba(245,158,11,0.25)]'
                }`}>
                  <IconComponent className="w-6 h-6 text-amber-400 filter drop-shadow-md" />
                </div>

                {/* Status Badge Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{office.badge}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className={`text-2xl font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {office.title}
                </h3>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{office.subtitle}</span>
                </div>
              </div>

              {/* Beautifully Formatted Address Cards & Badges */}
              <div className={`p-4 rounded-2xl border space-y-2.5 transition-all min-h-[105px] flex flex-col justify-between ${
                isLight
                  ? 'bg-white/80 border-slate-200/80 shadow-inner'
                  : 'bg-slate-900/60 border-slate-800/80 backdrop-blur-md'
              }`}>
                {/* Unit & Street */}
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-sm" />
                  <div className="space-y-0.5">
                    <div className={`text-sm font-extrabold ${
                      isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {office.unit} — {office.road}
                    </div>
                    <div className={`text-xs ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {office.colony}
                    </div>
                  </div>
                </div>

                {/* City & Zip */}
                <div className={`pt-2 border-t flex items-center justify-between text-xs font-semibold ${
                  isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
                }`}>
                  <span className="flex items-center gap-1 truncate">
                    <Navigation className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{office.cityState}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold shrink-0">
                    PIN {office.pincode}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Action Footer */}
            <div className={`px-6 py-3.5 border-t flex items-center justify-between gap-3 relative z-10 ${
              isLight ? 'bg-amber-50/40 border-amber-200/60' : 'bg-slate-950/60 border-slate-800/80'
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 truncate">
                <MapPin className="w-4 h-4 shrink-0 text-amber-500" />
                <span className="truncate">{office.cityState} {office.pincode}</span>
              </div>

              {showMapLinks && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wider flex items-center gap-1.5 shadow-md hover:shadow-amber-500/30 transition-all transform hover:scale-105 shrink-0 group/btn"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
