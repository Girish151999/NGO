import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const PARTNERS = [
  {
    id: 'girish-group',
    name: 'Girish Group of Companies',
    logoImg: '/assets/group/girish_group-darkicon.png'
  },
  {
    id: 'gsinfotechvis',
    name: 'Gsinfotechvis',
    logoImg: '/assets/group/gsinfotechvis-clean.png'
  },
  {
    id: 'gils',
    name: 'GILS Pvt Ltd',
    logoImg: '/assets/group/gils-clean.png'
  },
  {
    id: 'gpi',
    name: 'GPI India',
    logoImg: '/assets/group/gpi-clean.png'
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logoImg: '/assets/partners/samsung-clean.png'
  },
  {
    id: 'symantec',
    name: 'Symantec',
    logoImg: '/assets/partners/symantec-clean.png'
  },
  {
    id: 'sap-labs',
    name: 'SAP Labs',
    logoImg: '/assets/partners/sap-clean.png'
  },
  {
    id: 'pubmatic',
    name: 'PubMatic',
    logoImg: '/assets/partners/pubmatic-clean.png'
  },
  {
    id: 'vi',
    name: 'Vodafone Idea VI',
    logoImg: '/assets/partners/vi-clean.png'
  },
  {
    id: 'informatica',
    name: 'Informatica',
    logoImg: '/assets/partners/informatica-clean.png'
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    logoImg: '/assets/partners/techmahindra-clean.png'
  },
  {
    id: 'jcb',
    name: 'JCB',
    logoImg: '/assets/partners/jcb-clean.png'
  },
  {
    id: 'thermax',
    name: 'Thermax Global',
    logoImg: '/assets/partners/thermax-clean.png'
  },
  {
    id: '360-tianfu-ai',
    name: 'Talentic.360 AI LLP',
    logoImg: '/assets/partners/360-tianfu-darkicon.png'
  },
  {
    id: 'techvis',
    name: 'Techvis',
    logoImg: '/assets/partners/techvis-clean.png'
  },
  {
    id: 'nabard',
    name: 'NABARD',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#00875A"/>
          <path d="M50 18L78 35V72L50 88L22 72V35L50 18Z" stroke="#FFFFFF" strokeWidth="6" fill="none"/>
          <path d="M50 32L66 42V62L50 72L34 62V42L50 32Z" fill="#F4C430"/>
          <circle cx="50" cy="52" r="7" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">NABARD</span>
      </div>
    )
  },
  {
    id: 'tata-trusts',
    name: 'TATA TRUSTS',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#0A2540"/>
          <path d="M20 30H80V40H56V80H44V40H20V30Z" fill="#0066CC"/>
          <path d="M26 30H74V36H53V76H47V36H26V30Z" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">TATA TRUSTS</span>
      </div>
    )
  },
  {
    id: 'axis-bank',
    name: 'AXIS BANK',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#971237"/>
          <polygon points="50,20 80,78 62,78 50,52 38,78 20,78" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">AXIS BANK</span>
      </div>
    )
  },
  {
    id: 'hdfc-parivartan',
    name: 'HDFC BANK',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#004B87"/>
          <rect x="20" y="20" width="60" height="60" rx="8" stroke="#ED232A" strokeWidth="8" fill="none"/>
          <rect x="42" y="42" width="16" height="16" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">HDFC BANK</span>
      </div>
    )
  },
  {
    id: 'hsbc-india',
    name: 'HSBC',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#1A1A1A"/>
          <polygon points="20,20 80,20 80,80 20,80" fill="#DB0011"/>
          <polygon points="20,20 50,50 20,80" fill="#FFFFFF"/>
          <polygon points="80,20 50,50 80,80" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">HSBC</span>
      </div>
    )
  },
  {
    id: 'accenture',
    name: 'ACCENTURE',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#0F172A"/>
          <path d="M25 70L55 25L65 35L45 70H25Z" fill="#A100FF"/>
          <path d="M50 45L75 70H60L42 52L50 45Z" fill="#C084FC"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">ACCENTURE</span>
      </div>
    )
  },
  {
    id: 'sbi-foundation',
    name: 'SBI FOUNDATION',
    customLogo: (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#1E3A8A"/>
          <circle cx="50" cy="50" r="28" fill="#2563EB"/>
          <circle cx="50" cy="42" r="10" fill="#FFFFFF"/>
          <rect x="45" y="42" width="10" height="30" fill="#FFFFFF"/>
        </svg>
        <span className="font-extrabold text-slate-900 text-sm tracking-wider">SBI</span>
      </div>
    )
  }
];

export default function PartnerTicker({ theme = 'dark' }) {
  const isLight = theme === 'light';
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const isHoveredRef = useRef(false);

  // Repeat partners 4 times for smooth continuous loop
  const marqueeItems = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  const ITEM_WIDTH = 190; // optimized item width preventing text cuts
  const GAP = 36; // ample gap preventing overlap
  const TOTAL_SINGLE_SET_WIDTH = PARTNERS.length * (ITEM_WIDTH + GAP);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateScroll = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      // FAST & Lively Scroll Speed (~85px per sec as requested!)
      const speed = isHoveredRef.current ? 0.012 : 0.085;
      
      setScrollX((prev) => {
        const next = prev + delta * speed;
        return next >= TOTAL_SINGLE_SET_WIDTH ? next % TOTAL_SINGLE_SET_WIDTH : next;
      });

      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [TOTAL_SINGLE_SET_WIDTH]);

  // Instant Center Growth & Collapse Pop Calculator - Zero Overlap
  const getItemStyle = (index) => {
    const itemLeft = index * (ITEM_WIDTH + GAP) - scrollX;
    const itemCenter = itemLeft + ITEM_WIDTH / 2;
    const centerPoint = containerWidth / 2;
    const distance = Math.abs(itemCenter - centerPoint);

    // Tight center trigger zone (~100px)
    const isCenter = distance < 100;

    return {
      scale: isCenter ? 1.25 : 0.82,
      opacity: isCenter ? 1.0 : 0.55,
      filter: isCenter ? 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))' : 'none',
      isCenter
    };
  };

  return (
    <section className={`py-12 border-t border-b overflow-hidden relative transition-colors duration-300 ${
      isLight ? 'bg-[#eef2f6] border-slate-300/70' : 'bg-[#080b11] border-slate-800/80'
    }`}>
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[11px] font-extrabold uppercase tracking-wider border border-amber-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Strategic Partners & CSR Institutional Donors</span>
        </div>
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Supported by Leading Global & Institutional <span className="text-amber-600 dark:text-brand-400 font-serif italic">Partners</span>
        </h2>
        <p className={`text-xs sm:text-sm mt-1.5 max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Collaborating with national banks, corporate CSR foundations, and UN bodies to drive long-term grassroots impact.
        </p>
      </div>

      {/* DEDICATED LOGO STRIP BANNER - Pure Transparent PNG Logos Only */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className={`relative w-full rounded-2xl border overflow-hidden shadow-xl py-8 ${
          isLight ? 'bg-white border-slate-200/90' : 'bg-[#0d1320] border-slate-800'
        }`}>
          {/* Edge Fade Gradients inside strip */}
          <div className={`absolute top-0 left-0 bottom-0 w-24 sm:w-40 z-30 pointer-events-none bg-gradient-to-r ${
            isLight ? 'from-white via-white/80 to-transparent' : 'from-[#0d1320] via-[#0d1320]/80 to-transparent'
          }`} />
          <div className={`absolute top-0 right-0 bottom-0 w-24 sm:w-40 z-30 pointer-events-none bg-gradient-to-l ${
            isLight ? 'from-white via-white/80 to-transparent' : 'from-[#0d1320] via-[#0d1320]/80 to-transparent'
          }`} />

          {/* Fast Scrolling Track */}
          <div
            ref={containerRef}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            className="w-full overflow-hidden select-none"
          >
            <div
              className="flex items-center"
              style={{
                transform: `translateX(${-scrollX}px)`,
                width: `${marqueeItems.length * (ITEM_WIDTH + GAP)}px`,
                willChange: 'transform'
              }}
            >
              {marqueeItems.map((partner, index) => {
                const styleProps = getItemStyle(index);

                return (
                  <div
                    key={`${partner.id}-${index}`}
                    style={{
                      width: `${ITEM_WIDTH}px`,
                      marginRight: `${GAP}px`,
                      transform: `scale(${styleProps.scale})`,
                      opacity: styleProps.opacity,
                      filter: styleProps.filter,
                      transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease',
                      willChange: 'transform, opacity'
                    }}
                    className="flex-shrink-0 h-16 sm:h-20 flex items-center justify-center cursor-pointer"
                  >
                    {partner.customLogo ? (
                      partner.customLogo
                    ) : (
                      <img
                        src={partner.logoImg}
                        alt={partner.name}
                        className="max-h-16 max-w-full w-auto object-contain"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
