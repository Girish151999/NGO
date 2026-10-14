import React from 'react';
import { MapPin, Phone, Mail, Heart, MessageSquare, Shield, Sparkles, Building2, ArrowUp } from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';
import DynamicLogo from './DynamicLogo';
import { SupportHeartIcon } from './CustomIcons';
import {
  InstagramLogo, WhatsappLogo,
  YoutubeLogo, XTwitterLogo, PinterestLogo,
  SnapchatLogo
} from './SocialLogos';

export default function Footer({ onNavigate, onOpenDonate, theme = "dark", activePage = "home" }) {
  const isLight = theme === 'light';

  return (
    <footer className={`relative border-t pt-16 pb-0 overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#07090e] border-slate-800 text-slate-400'
    }`}>
      {/* Background Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800/10 rounded-full blur-[140px] pointer-events-none" />



      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {/* Col 1: About & Reg Details */}
        <div className="space-y-4">
          <DynamicLogo
            size="md"
            theme={theme}
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {NGO_INFO.tagline}. Dedicated to empowering individuals through education, skill development, healthcare, and crisis aid across generations.
          </p>

          <div className={`p-4 rounded-2xl border space-y-2.5 text-xs transition-all ${
            isLight
              ? 'bg-white/90 border-slate-200/90 shadow-sm'
              : 'bg-[#0b1019]/90 border-slate-800/90 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <span className={isLight ? "text-slate-500 font-medium" : "text-slate-400 font-medium"}>Reg No:</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">{NGO_INFO.regNo}</span>
            </div>
            <div className={`flex items-center justify-between pt-2 border-t ${isLight ? 'border-slate-200/60' : 'border-slate-800/60'}`}>
              <span className={isLight ? "text-slate-500" : "text-slate-400"}>Parent Group:</span>
              <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>{NGO_INFO.parentGroup}</span>
            </div>
            <div className={`flex items-center justify-between pt-2 border-t ${isLight ? 'border-slate-200/60' : 'border-slate-800/60'}`}>
              <span className={isLight ? "text-slate-500" : "text-slate-400"}>Founder:</span>
              <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>{NGO_INFO.founder}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Headquarters & Offices */}
        <div className="space-y-4">
          <h4 className="text-base font-bold uppercase tracking-wider text-[#e5a93c] flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs shrink-0">📍</span>
            <span>Our Offices</span>
          </h4>
          <div className="space-y-3.5">
            {/* Headquarter Card */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 group hover:-translate-y-0.5 ${
              isLight
                ? 'bg-white border-amber-200/80 shadow-sm hover:shadow-md hover:border-amber-400'
                : 'bg-[#0b1019] border-slate-800/90 shadow-md hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Headquarter Office</div>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">HQ</span>
              </div>
              <div className={`text-xs leading-relaxed mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {NGO_INFO.headquarter.address}
              </div>
              <div className="text-amber-500 font-bold text-xs flex items-center gap-1">
                <span>Baramati, Maharashtra 413102</span>
              </div>
            </div>

            {/* Corporate Card */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 group hover:-translate-y-0.5 ${
              isLight
                ? 'bg-white border-indigo-200/80 shadow-sm hover:shadow-md hover:border-indigo-400'
                : 'bg-[#0b1019] border-slate-800/90 shadow-md hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Corporate Office</div>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">PUNE</span>
              </div>
              <div className={`text-xs leading-relaxed mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {NGO_INFO.corporateOffice.address}
              </div>
              <div className="text-indigo-400 font-bold text-xs flex items-center gap-1">
                <span>Wakad, Pune, Maharashtra 411057</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="space-y-4">
          <h4 className="text-base font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs shrink-0">🧭</span>
            <span>Quick Navigation</span>
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { id: 'about', label: 'About Our 30-Yr Legacy' },
              { id: 'mission', label: 'Mission & Vision' },
              { id: 'programs', label: '25+ Causes & Programs' },
              { id: 'projects', label: 'ZP School Drive Case Study' },
              { id: 'events', label: 'Press & Media Coverage' },
              { id: 'gallery', label: 'Photo & Video Gallery' },
              { id: 'volunteer', label: 'Volunteer Application' },
              { id: 'contact', label: 'Contact Us' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    onNavigate(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-all duration-300 text-sm font-medium flex items-center gap-2 cursor-pointer py-0.5 hover:translate-x-1.5 ${
                    isLight ? 'text-slate-700 hover:text-amber-600' : 'text-slate-300 hover:text-amber-400'
                  }`}
                >
                  <span className="text-amber-500 font-bold text-base transition-transform group-hover:scale-125">›</span>
                  <span className="leading-snug">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Social App Logos */}
        <div className="space-y-4">
          <h4 className="text-base font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs shrink-0">💬</span>
            <span>Get In Touch</span>
          </h4>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Connect with us on WhatsApp, Instagram, or our official communication channels:
          </p>

          {/* Clean 12 Official Brand SVG Logos Grid */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {[
              { 
                name: 'Instagram', 
                href: NGO_INFO.instagram, 
                icon: InstagramLogo, 
                colorClass: 'text-[#E4405F] hover:bg-[#E4405F]/15 hover:border-[#E4405F]/50 hover:shadow-[0_0_12px_rgba(228,64,95,0.35)]'
              },
              { 
                name: 'WhatsApp', 
                href: NGO_INFO.whatsapp, 
                icon: WhatsappLogo, 
                colorClass: 'text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/50 hover:shadow-[0_0_12px_rgba(37,211,102,0.35)]'
              },
              { 
                name: 'YouTube', 
                href: NGO_INFO.youtube, 
                icon: YoutubeLogo, 
                colorClass: 'text-[#FF0000] hover:bg-[#FF0000]/15 hover:border-[#FF0000]/50 hover:shadow-[0_0_12px_rgba(255,0,0,0.35)]'
              },
              { 
                name: 'X (Twitter)', 
                href: NGO_INFO.twitter, 
                icon: XTwitterLogo, 
                customBgClass: isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-950 hover:bg-slate-200 hover:border-slate-400 hover:text-black shadow-slate-200/60'
                  : 'bg-black border-slate-800 text-white hover:bg-slate-900 hover:border-slate-700 hover:shadow-[0_0_12px_rgba(0,0,0,0.6)]'
              },
              { 
                name: 'Pinterest', 
                href: NGO_INFO.pinterest, 
                icon: PinterestLogo, 
                colorClass: 'text-[#E60023] hover:bg-[#E60023]/15 hover:border-[#E60023]/50 hover:shadow-[0_0_12px_rgba(230,0,35,0.35)]'
              },
              { 
                name: 'Snapchat', 
                href: NGO_INFO.snapchat, 
                icon: SnapchatLogo, 
                colorClass: 'text-amber-400 hover:bg-amber-400/20 hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(251,191,36,0.35)]'
              }
            ].map((app, i) => {
              const IconComp = app.icon;
              return (
                <a
                  key={i}
                  href={app.href}
                  target={app.href !== '#' ? '_blank' : undefined}
                  rel={app.href !== '#' ? 'noopener noreferrer' : undefined}
                  title={app.name}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm ${
                    app.customBgClass
                      ? app.customBgClass
                      : `${app.colorClass} ${
                          isLight
                            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                            : 'bg-[#0c121e] border-slate-800/90 shadow-black/40'
                        }`
                  }`}
                >
                  <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenDonate}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-500 via-amber-400 to-amber-500 text-black font-black text-sm shadow-md hover:shadow-amber-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
              <span>Support Give Smile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Tier Legal, Copyright & Cookie Banner Section */}
      <div className="w-full border-t border-slate-800/60 mt-16 pt-0">
        
        {/* Tier 1: Privacy Policy & Personal Data Consent Notice Banner */}
        <div className={`py-5 px-4 sm:px-8 text-center text-xs leading-relaxed transition-colors ${
          isLight
            ? 'bg-[#1e293b] text-slate-200'
            : 'bg-[#090d18] text-slate-300 border-b border-slate-800/60'
        }`}>
          <div className="max-w-5xl mx-auto font-normal">
            By submitting your details or personal data to us in connection with your registration of interest in this, you are deemed to have read and agreed to the terms of our Privacy Policy and consented to the collection, use, and disclosure of your data by us and our affiliates, following our Privacy Policy. Please visit <a href="#privacy" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="underline text-amber-400 hover:text-amber-300 font-semibold">www.givesmilefoundation.com/privacy-policy</a> for a copy of our Privacy Policy. If you wish to withdraw your consent in the future, contact us at <a href="mailto:dataprotection@givesmilefoundation.com" className="underline text-amber-400 hover:text-amber-300 font-semibold">dataprotection@givesmilefoundation.com</a> to let us know.
          </div>
        </div>

        {/* Tier 2: Highlighted Copyright Banner Strip */}
        <div className={`py-3.5 px-4 text-center text-xs font-bold tracking-wide transition-colors ${
          isLight
            ? 'bg-[#e2e8f0] text-slate-900 border-y border-slate-300'
            : 'bg-slate-200 text-slate-950 shadow-inner'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span>@ {new Date().getFullYear()} Copyright Give Smile Foundation. All rights reserved. Registered NGO Reg. No. AAETG6500DE20231.</span>
          </div>
        </div>

        {/* Tier 3: Cookies & Site Interaction Notice Banner */}
        <div className={`py-5 px-4 sm:px-8 text-center text-xs leading-relaxed transition-colors ${
          isLight
            ? 'bg-[#1e293b] text-slate-200'
            : 'bg-[#050812] text-slate-400'
        }`}>
          <div className="max-w-4xl mx-auto text-center font-normal">
            When you visit or interact with our sites, services or tools, we or our authorized service providers may use cookies for storing information to help provide you with a better, faster and safer experience and for Foundation initiative purposes.
          </div>
        </div>

      </div>
    </footer>
  );
}
