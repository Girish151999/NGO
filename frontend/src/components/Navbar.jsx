import React, { useState, useEffect, useRef } from 'react';
import { Heart, Menu, X, Phone, MessageSquare, Sun, Moon, ChevronDown, Sparkles, MousePointerClick, Bot } from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';
import { SupportHeartIcon } from './CustomIcons';

const NAV_MENU = [
  {
    id: 'who_we_are',
    label: 'Who we are',
    hasDropdown: true,
    children: [
      { id: 'about', label: 'About Us', desc: 'Our nearly 30-year legacy & founder vision' },
      { id: 'girish-memorial', label: 'About Girish Sir ✦', desc: 'Life story, enterprises, 3D chronicle & photo archives' },
      { id: 'mission', label: 'Mission & Vision', desc: 'Core principles & empowering future roadmap' },
      { id: 'stories', label: 'Stories of Change', desc: 'Real beneficiary transformation journals' }
    ]
  },
  {
    id: 'what_we_do',
    label: 'What we do',
    hasDropdown: true,
    children: [
      { id: 'projects', label: 'School Infrastructure & Desks (ZP Drive)', desc: 'Premier Zilla Parishad school transformation' },
      { id: 'programs', label: 'All 25 Actionable Upliftment Tracks', desc: 'Education, vocational training & healthcare' }
    ]
  },
  {
    id: 'get_involved',
    label: 'Get involved',
    hasDropdown: true,
    children: [
      { id: 'volunteer', label: 'Join as Volunteer', desc: 'On-ground drives & virtual mentorship' },
      { id: 'donate', label: 'Support a Local Drive', desc: 'Direct grassroots NGO financial aid' },
      { id: 'partners', label: 'Our Partners & Donors', desc: 'Institutional CSR & Philanthropic Grantors' }
    ]
  },
  {
    id: 'blog',
    label: 'Field Engagements',
    hasDropdown: true,
    children: [
      { id: 'stories', label: 'Stories of Change', desc: 'Real beneficiary transformation journals' },
      { id: 'blogs', label: 'Field Engagements & Photo Proof', desc: 'In-depth journals & 14+ field proof photos' },
      { id: 'events', label: 'Media and Press', desc: 'Print scans, Dainik Rokhathok, Janmat & direct news URLs' },
      { id: 'gallery', label: 'Portal Photo & Video Archive', desc: 'Fullscreen video player & photo gallery' }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    hasDropdown: false,
    targetPage: 'contact'
  }
];

import DynamicLogo from './DynamicLogo';

export default function Navbar({ activePage, onNavigate, onOpenDonate, onOpenChat, theme = "dark", onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Header stays hidden initially at top (scrollY <= 40). Appears smoothly after first scroll.
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timeoutRef = useRef(null);

  const handleMouseEnter = (itemId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(itemId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleNavClick = (pageId) => {
    if (pageId === 'donate') {
      onOpenDonate();
    } else {
      onNavigate(pageId);
    }
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = theme === 'light';

  return (
    <>
      {/* Fixed Navigation Area - Hidden initially at Y=0 on Home page, slides down after first scroll. Always visible on non-Home pages. */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
        (activePage !== 'home' || scrolled)
          ? 'translate-y-0 opacity-100 shadow-2xl pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        {/* Top Utility Announcement Bar */}
        <div className="bg-[#071325] text-slate-100 text-[11px] py-1 px-4 border-b border-slate-800/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-medium">Reg. No: <strong className="text-white">{NGO_INFO.regNo}</strong></span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-amber-400 font-semibold">{NGO_INFO.tagline}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <a href={`tel:${NGO_INFO.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-amber-400 text-slate-200">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{NGO_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${NGO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Give%20Smile%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20NGO%20initiatives.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 font-bold hover:text-emerald-300 transition-colors cursor-pointer"
                title="Chat on WhatsApp (+91 70835 09072)"
              >
                <svg className="w-3.5 h-3.5 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.852 0-3.664-.499-5.253-1.442l-.377-.225-3.905 1.024 1.042-3.807-.247-.393c-1.036-1.648-1.583-3.551-1.583-5.503 0-5.65 4.596-10.247 10.246-10.247 2.737 0 5.309 1.066 7.243 3.001 1.935 1.936 3.001 4.508 3.001 7.245 0 5.65-4.596 10.247-10.246 10.247m0-18.796c-4.71 0-8.541 3.831-8.541 8.549 0 1.847.591 3.555 1.694 4.966l-.669 2.443 2.502-.656c1.353.945 2.97 1.492 4.673 1.492 4.71 0 8.541-3.831 8.541-8.549 0-4.718-3.831-8.549-8.541-8.549"/>
                </svg>
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Container - Solid Navy Blue background with shadow on scroll */}
        <header className="bg-[#0a192f] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between" ref={navRef}>
          {/* Logo & Brand Name - Click to Navigate Home */}
          <DynamicLogo
            size="md"
            theme="dark"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Items matching Udyogini slim layout */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_MENU.map((item) => {
              const isDropdownOpen = openDropdown === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 select-none ${
                        isDropdownOpen
                          ? 'text-amber-400 bg-amber-500/20 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                          : 'text-slate-200 hover:text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-amber-400' : 'opacity-70'}`} />
                    </button>

                    {/* Dropdown Floating Card with Solid Navy Background & Sharp Contrast */}
                    {isDropdownOpen && (
                      <div
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-0 pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-2"
                      >
                        <div className="rounded-2xl p-2 shadow-2xl border-2 border-amber-500/40 bg-[#0a192f] text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                          <div className="space-y-1">
                            {item.children.map((child) => (
                              <button
                                key={child.id}
                                onClick={() => handleNavClick(child.id)}
                                className="w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer group flex flex-col hover:bg-[#142642] hover:border-amber-500/40 border border-transparent"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className={`text-xs font-extrabold transition-colors ${
                                    activePage === child.id
                                      ? 'text-amber-400'
                                      : 'text-white group-hover:text-amber-400'
                                  }`}>
                                    {child.label}
                                  </span>
                                  <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                                <span className="text-[11px] mt-1 font-medium text-slate-300 group-hover:text-slate-100 leading-snug">
                                  {child.desc}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Direct link items (Where We Work, Contact)
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetPage)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activePage === item.targetPage
                      ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'text-slate-200 hover:text-amber-300 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Switcher, CTA & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg transition-all duration-300 border flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 bg-slate-800/80 text-amber-400 border-slate-700/80 hover:bg-slate-700 hover:border-amber-500/50 shrink-0"
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
            </button>

            {/* Donate Us CTA Button with Animated Yellow Index Finger Click Effect */}
            <div className="relative inline-flex items-center shrink-0">
              <button
                onClick={onOpenDonate}
                className="relative group px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] sm:text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer border border-red-500 shrink-0 select-none"
              >
                <SupportHeartIcon className="w-4 h-4 sm:w-5 sm:h-5 bg-white p-0.5 rounded-full shrink-0" />
                <span className="tracking-wide font-black text-white whitespace-nowrap">
                  <span className="inline sm:hidden">Donate</span>
                  <span className="hidden sm:inline">Donate Us</span>
                </span>
              </button>

              {/* Continuously Clicking Yellow Pointer Index Finger on Bottom Right Corner */}
              <div className="absolute -bottom-3.5 right-0 sm:-right-2.5 pointer-events-none z-30 flex items-center justify-center hidden sm:flex">
                {/* Yellow Click Ripple Effect Ring */}
                <span className="absolute w-5 h-5 rounded-full border-2 border-amber-400 animate-click-burst-ring pointer-events-none -top-1 -left-1" />
                
                {/* Vibrant Yellow Index Finger Pointer Icon with Continuous Tap Animation */}
                <div className="animate-vecteezy-click drop-shadow-[0_4px_12px_rgba(245,158,11,0.9)]">
                  <svg className="w-7 h-7 transform -rotate-45" viewBox="0 0 24 24">
                    <path
                      d="M10 2a1.5 1.5 0 0 0-1.5 1.5v9.36l-1.6-1.6a1.5 1.5 0 0 0-2.12 2.12l4.8 4.8A6.5 6.5 0 0 0 14.18 20H16a5 5 0 0 0 5-5v-3.5a1.5 1.5 0 0 0-3 0V12h-1v-1.5a1.5 1.5 0 0 0-3 0V11h-1V3.5A1.5 1.5 0 0 0 10 2z"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border cursor-pointer glass-panel text-slate-200 border-slate-700 shrink-0 flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
    </div>

      {/* Mobile Drawer Menu - Solid 100% Opaque Backdrop Overlay with Full Contrast */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[99999] lg:hidden flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200 ${
          isLight ? 'bg-white text-slate-900' : 'bg-[#0a192f] text-slate-100'
        }`}>
          {/* Drawer Top Navigation Bar */}
          <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-10 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#071325] border-slate-800'
          }`}>
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-2 select-none shrink-0">
              <div className="relative w-8 h-8 rounded-lg bg-white p-0.5 border border-amber-500/40 shadow-sm flex items-center justify-center shrink-0">
                <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className={`font-black text-sm tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>GIVE SMILE</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-400/40 shrink-0">NGO</span>
                </div>
                <span className={`text-[8px] uppercase font-bold tracking-widest block whitespace-nowrap ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Girish Group Foundation</span>
              </div>
            </div>

            {/* Theme Toggle & Close Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                }`}
              >
                {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-lg border cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200'
                    : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                }`}
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Menu List (Compact Interactive Accordion Dropdowns) */}
          <div className="p-4 space-y-2.5 flex-1 overflow-y-auto">
            {NAV_MENU.map((item) => {
              const isAccordionOpen = mobileAccordionOpen === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="space-y-1.5">
                    <button
                      onClick={() => setMobileAccordionOpen(isAccordionOpen ? null : item.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border select-none cursor-pointer ${
                        isAccordionOpen
                          ? 'bg-amber-500/15 text-amber-500 border-amber-500/40 shadow-sm'
                          : isLight
                            ? 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                            : 'bg-[#121927] text-slate-100 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>

                    {isAccordionOpen && (
                      <div className="space-y-1.5 pl-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavClick(child.id)}
                            className={`w-full text-left p-3 rounded-xl text-xs font-extrabold transition-all flex flex-col cursor-pointer border ${
                              activePage === child.id
                                ? 'bg-amber-500/20 text-amber-500 border-amber-400/50 shadow-sm'
                                : isLight
                                  ? 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                                  : 'bg-[#162030] text-slate-100 border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs">{child.label}</span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-amber-400 opacity-60" />
                            </div>
                            <span className={`text-[10.5px] font-medium mt-0.5 leading-snug ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {child.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.targetPage)}
                    className={`w-full text-left p-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                      activePage === item.targetPage
                        ? 'bg-amber-500/20 text-amber-500 border-amber-400/50 shadow-sm'
                        : isLight
                          ? 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                          : 'bg-[#121927] text-slate-100 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Sticky Action Area */}
          <div className={`p-5 border-t sticky bottom-0 z-10 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#071325] border-slate-800'
          }`}>
            <button
              onClick={() => {
                onOpenDonate();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-black text-sm text-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-400/40"
            >
              <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
              <span>Donate Us</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
