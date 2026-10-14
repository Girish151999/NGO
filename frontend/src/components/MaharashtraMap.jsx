import React, { useState } from 'react';
import { MapPin, Building, ShieldCheck, ArrowRight, Phone, CheckCircle2, Navigation, Globe, Layers, ExternalLink } from 'lucide-react';

const LOCATIONS = [
  {
    id: 'maharashtra',
    name: 'Maharashtra State Overview',
    shortLabel: 'Maharashtra State',
    type: 'Statewide Intervention Zone',
    address: 'Maharashtra State, India (Baramati HQ & Pune Wakad Hubs)',
    phone: '070835 09072',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maharashtra+India',
    embedUrlRoad: 'https://maps.google.com/maps?q=Maharashtra,India&t=m&z=7&ie=UTF8&iwloc=&output=embed',
    embedUrlSat: 'https://maps.google.com/maps?q=Maharashtra,India&t=k&z=7&ie=UTF8&iwloc=&output=embed',
    drivesCount: 'Statewide Coverage',
    beneficiaries: '1000+ Students Empowered',
    description: 'Give Smile Foundation operates direct Zilla Parishad school infrastructure drives, uniform kits, and youth mentorship across rural Maharashtra, with primary headquarters in Baramati and corporate office in Wakad Pune.',
    highlights: [
      'Comprehensive ZP school classroom desk & infrastructure drives',
      'Rural healthcare check-up & dignity uniform kit distribution',
      'Statewide youth mentorship & digital literacy programs',
      'Dual active office hubs in Baramati (HQ) and Wakad Pune'
    ]
  },
  {
    id: 'baramati',
    name: 'Baramati (Headquarters)',
    shortLabel: 'Baramati (HQ)',
    type: 'Headquarter Office & Field Hub',
    address: 'Office No.25, Baramati-Bhigwan Rd, Anand Nagar Colony, Baramati, Maharashtra 413102',
    phone: '070835 09072',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baramati-Bhigwan+Rd+Anand+Nagar+Colony+Baramati+Maharashtra+413102',
    embedUrlRoad: 'https://maps.google.com/maps?q=Baramati-Bhigwan%20Rd,%20Anand%20Nagar%20Colony,%20Baramati,%20Maharashtra%20413102&t=m&z=15&ie=UTF8&iwloc=&output=embed',
    embedUrlSat: 'https://maps.google.com/maps?q=Baramati-Bhigwan%20Rd,%20Anand%20Nagar%20Colony,%20Baramati,%20Maharashtra%20413102&t=k&z=16&ie=UTF8&iwloc=&output=embed',
    drivesCount: 'ZP School Drive Premier Hub',
    beneficiaries: '500+ Students Empowered',
    description: 'Serving as the operational heart of Give Smile Foundation, executing on-ground ZP school infrastructure deployment, sitting desk distribution, and student welfare.',
    highlights: [
      'Direct on-ground deployment of sitting benches & classroom desks',
      'Standardized dignity uniform kit distribution drives',
      'Local ZP school headmaster & community leader coordination',
      'Rural healthcare check-up & mental resilience camps'
    ]
  },
  {
    id: 'pune',
    name: 'Pune (Wakad Corporate Office)',
    shortLabel: 'Pune (Wakad)',
    type: 'Corporate Office & Mentorship Hub',
    address: 'Office No. 105, Pride Purple Square, Kalewadi Phata, Vishnu Dev Nagar, Wakad, Pimpri-Chinchwad, Maharashtra 411057',
    phone: '070835 09072',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pride+Purple+Square+Wakad+Pimpri-Chinchwad+Maharashtra+411057',
    embedUrlRoad: 'https://maps.google.com/maps?q=Pride%20Purple%20Square,%20Wakad,%20Pimpri-Chinchwad,%20Maharashtra%20411057&t=m&z=15&ie=UTF8&iwloc=&output=embed',
    embedUrlSat: 'https://maps.google.com/maps?q=Pride%20Purple%20Square,%20Wakad,%20Pimpri-Chinchwad,%20Maharashtra%20411057&t=k&z=16&ie=UTF8&iwloc=&output=embed',
    drivesCount: 'Youth & Girl Child Mentorship',
    beneficiaries: 'Strategic Corporate Partnerships',
    description: 'Located at Pride Purple Square in Wakad Pune, leading corporate CSR mobilization with Girish Group of Companies, youth mentorship, and platform development.',
    highlights: [
      'Youth mentorship & career counseling programs',
      'Corporate partnership & CSR mobilization',
      'Digital literacy & e-library tech development',
      'Statewide volunteer application & donor coordination'
    ]
  }
];

export default function MaharashtraMap({ theme = "dark", onOpenDonate }) {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]);
  const [mapType, setMapType] = useState('sat'); // 'sat' for Satellite Globe View, 'road' for Street Map
  const isLight = theme === 'light';

  return (
    <div className="w-full space-y-8">
      
      {/* Section Header */}
      <div className="space-y-3">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
          isLight ? 'bg-amber-100/80 text-amber-900 border-amber-300' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        }`}>
          <Globe className="w-3.5 h-3.5 text-amber-600" />
          Real Globe Map & Footprint
        </div>

        <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Give Smile’s reach in Maharashtra
        </h2>

        <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          Real interactive satellite globe map of Maharashtra showing our active operations across Baramati Headquarters and Wakad Pune Corporate Office.
        </p>
      </div>

      {/* Main Grid: Left Real Interactive Globe Map + Right Udyogini-Style Metrics Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: 100% Real Interactive Globe & Map View */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className={`relative rounded-3xl border p-6 sm:p-8 flex-grow flex flex-col justify-between overflow-hidden shadow-2xl transition-all ${
            isLight
              ? 'bg-[#fdfbf7] border-amber-200 shadow-amber-500/5'
              : 'bg-[#080d16] border-slate-800'
          }`}>
            
            {/* Top Bar with Map Mode Switcher (Satellite Globe vs Street Map) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Real Interactive Map Canvas
              </span>

              {/* Satellite Globe vs Street Map Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setMapType('sat')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapType === 'sat'
                      ? 'bg-amber-500 text-black shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Satellite Globe</span>
                </button>

                <button
                  onClick={() => setMapType('road')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapType === 'road'
                      ? 'bg-amber-500 text-black shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Street Map</span>
                </button>
              </div>
            </div>

            {/* REAL INTERACTIVE GOOGLE MAP / SATELLITE GLOBE EMBED */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-black">
              <iframe
                title="Real Maharashtra Interactive Globe Map"
                src={mapType === 'sat' ? activeLocation.embedUrlSat : activeLocation.embedUrlRoad}
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Badge Indicator */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/90 text-amber-400 font-extrabold text-[11px] border border-amber-500/50 shadow-xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {activeLocation.name}
                </span>
              </div>
            </div>

            {/* Real Location Selector Tabs Below Map */}
            <div className="pt-4 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Select View Position:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center ${
                      activeLocation.id === loc.id
                        ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-md scale-105'
                        : isLight
                          ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span>{loc.shortLabel || loc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Udyogini-Style Information Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className={`rounded-3xl border p-8 space-y-6 shadow-xl transition-all ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0e1626] border-amber-500/30 text-white'
          }`}>
            
            <div className="space-y-4">
              <span className="text-xs uppercase font-extrabold text-red-700 tracking-wider">
                CURRENT PROGRAMME STATE
              </span>

              <h3 className={`text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Maharashtra
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {activeLocation.description}
              </p>

              {/* 3 Box Metrics Summary Grid matching Udyogini */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-900/90 border-slate-800'}`}>
                  <div className={`text-[10px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>DISTRICTS</div>
                  <div className="text-sm sm:text-base font-extrabold text-red-700 mt-0.5">2 (Pune & Baramati)</div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-900/90 border-slate-800'}`}>
                  <div className={`text-[10px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>DRIVES</div>
                  <div className="text-sm sm:text-base font-extrabold text-red-700 mt-0.5">15+ Drives</div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-900/90 border-slate-800'}`}>
                  <div className={`text-[10px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>IMPACT</div>
                  <div className="text-sm sm:text-base font-extrabold text-red-700 mt-0.5">1000+ Students</div>
                </div>
              </div>

              {/* Actionable Bullet Points matching Udyogini */}
              <div className="space-y-3 pt-2">
                {activeLocation.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {hl}
                    </p>
                  </div>
                ))}
              </div>

              {/* Address details */}
              <div className={`pt-4 border-t space-y-1 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Active Location Address:</div>
                <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{activeLocation.address}</div>
              </div>

              {/* Red Action CTA Button matching Udyogini */}
              <div className="pt-2">
                <a
                  href={activeLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-red-800 hover:bg-red-700 text-white font-extrabold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open {activeLocation.name} in Google Maps</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
