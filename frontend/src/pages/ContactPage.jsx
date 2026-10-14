import React, { useState } from 'react';
import Card3D from '../components/Card3D';
import OfficeCards from '../components/OfficeCards';
import { NGO_INFO } from '../data/ngoData';
import { 
  MapPin, Phone, Send, CheckCircle2, Instagram, MessageSquare, 
  Building2, ExternalLink, ShieldCheck, Clock, Mail,
  HeartHandshake, Award
} from 'lucide-react';

export default function ContactPage({ theme = "dark" }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLight = theme === 'light';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('https://formsubmit.co/ajax/K.d.sodmise@gsgroupofcompanies.co.in', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New NGO Inquiry from ${name} [${subject || 'Contact Form'}]`,
          name,
          email,
          phone,
          subject,
          message
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('FormSubmit notice:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = isLight
    ? 'text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1 block'
    : 'text-[11px] font-black uppercase tracking-wider text-amber-400 drop-shadow-sm mb-1 block';

  const inputStyle = isLight
    ? 'bg-slate-100/90 hover:bg-slate-200/80 focus:bg-white border-2 border-slate-300 focus:border-amber-600 text-slate-950 placeholder:text-slate-400 focus:ring-4 focus:ring-amber-500/20 shadow-sm font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 transition-all duration-200'
    : 'bg-[#141c2e] hover:bg-[#1a253d] focus:bg-[#0f172a] border-2 border-amber-500/30 focus:border-amber-400 text-white placeholder:text-slate-400 focus:ring-4 focus:ring-amber-400/20 shadow-[0_4px_12px_rgba(0,0,0,0.4)] font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 transition-all duration-200';

  return (
    <div className={`min-h-screen pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 space-y-10 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/40 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Ambient Radial Spotlight */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-200/40 via-rose-100/30 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/25 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <MapPin className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Reach Out To Us</span>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Contact Give Smile{' '}
            <span className="inline-block pb-1 bg-gradient-to-r from-[#971237] via-amber-500 to-amber-600 bg-clip-text text-transparent italic">
              Foundation
            </span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Have questions about our initiatives, wish to partner, volunteer, or support a rural school transformation drive? We are here to listen and collaborate.
          </p>

          {/* Quick Header Stat Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-300'
            }`}>
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Helpline: 070835 09072</span>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-300'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Baramati HQ & Pune Corporate Office</span>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-300'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Reg. No: {NGO_INFO.regNo}</span>
            </div>
          </div>
        </div>

        {/* TIER 1: Direct Message Form (Left) & 4-Box Contact Channels (Right) - 100% Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Direct Message Form (6 Cols - Equal Stretched Height) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all shadow-2xl h-full flex flex-col justify-between relative overflow-hidden ${
              isLight
                ? 'bg-white/95 text-slate-900 border-slate-200/90 shadow-slate-300/50'
                : 'bg-[#0c1220] text-white border-amber-500/30 shadow-black/80'
            }`}>
              
              {/* Subtle Decorative Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-[#971237]" />

              {submitted ? (
                <div className="text-center my-auto py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Message Sent Successfully!</h3>
                  <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Thank you <strong>{name}</strong> for reaching out to Give Smile Foundation. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                        <Mail className="w-4 h-4" />
                        <span>Direct Inquiry</span>
                      </div>
                      <h3 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Send Us a Message
                      </h3>
                      <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Fill out the form below and we will get back to you as quickly as possible.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelStyle}>Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full focus:outline-none ${inputStyle}`}
                        />
                      </div>
                      <div>
                        <label className={labelStyle}>Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="070835 09072"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full focus:outline-none ${inputStyle}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelStyle}>Email Address</label>
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full focus:outline-none ${inputStyle}`}
                        />
                      </div>
                      <div>
                        <label className={labelStyle}>Subject</label>
                        <input
                          type="text"
                          placeholder="Inquiry / Partnership"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={`w-full focus:outline-none ${inputStyle}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelStyle}>Your Message *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us how we can help, collaborate, or answer your questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`w-full focus:outline-none resize-none ${inputStyle}`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] border border-amber-400/60 mt-2"
                  >
                    <Send className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>{loading ? 'Sending Message...' : 'Send Message Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 6 Quick Contact Channels Grid (6 Cols - 2x3 Auto Stretched Height) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            
            {/* BOX 1: HELPLINE & WHATSAPP CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-amber-500/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-wider border border-amber-500/20">
                    24/7 HELPLINE
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Call / WhatsApp
                  </h4>
                  <div className="text-base font-black text-amber-500 tracking-tight">
                    {NGO_INFO.phone}
                  </div>
                  <div className={`text-[11px] flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Mon–Sat 9AM-7PM</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={`tel:${NGO_INFO.phone}`}
                  className="py-1.5 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 font-black text-[11px] flex items-center justify-center gap-1 transition-all text-center"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href={NGO_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 font-black text-[11px] flex items-center justify-center gap-1 transition-all text-center"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-amber-500 shadow-[0_0_15px_3px_rgba(245,158,11,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-amber-500 shadow-[0_0_15px_3px_rgba(245,158,11,0.8)] z-20"></div>
            </Card3D>

            {/* BOX 2: INSTAGRAM & SOCIAL CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-pink-500/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/30 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4 text-pink-500" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-[9px] font-black uppercase tracking-wider border border-pink-500/20">
                    INSTAGRAM
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Give Smile NGO
                  </h4>
                  <div className="text-xs font-extrabold text-pink-500 tracking-tight">
                    {NGO_INFO.instagramHandle || '@give_smile_ngo'}
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Reels & daily photo updates
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={NGO_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] transition-all text-center"
                >
                  <Instagram className="w-3 h-3" />
                  <span>Follow @give_smile_ngo ↗</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-pink-500 shadow-[0_0_15px_3px_rgba(236,72,153,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-pink-500 shadow-[0_0_15px_3px_rgba(236,72,153,0.8)] z-20"></div>
            </Card3D>

            {/* BOX 3: YOUTUBE CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-red-500/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-wider border border-red-500/20">
                    YOUTUBE
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Give Smile NGO
                  </h4>
                  <div className="text-xs font-extrabold text-red-500 tracking-tight">
                    @givesmilengo
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Field drives & campaign videos
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={NGO_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] transition-all text-center"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>Subscribe on YouTube ↗</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-red-500 shadow-[0_0_15px_3px_rgba(239,68,68,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-red-500 shadow-[0_0_15px_3px_rgba(239,68,68,0.8)] z-20"></div>
            </Card3D>

            {/* BOX 4: X / TWITTER CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-slate-500/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-slate-700'}`}>
                    <svg className={`w-4 h-4 ${isLight ? 'text-slate-900' : 'text-white'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                    X / TWITTER
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Give Smile NGO
                  </h4>
                  <div className={`text-xs font-extrabold tracking-tight ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    @givesmilengo
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Updates, news & announcements
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={NGO_INFO.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-1.5 px-3 rounded-lg font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] transition-all text-center border ${isLight ? 'bg-slate-950 text-white border-slate-800 hover:bg-slate-800' : 'bg-slate-950 text-white border-slate-700 hover:bg-slate-800'}`}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>Follow on X ↗</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-slate-400 shadow-[0_0_15px_3px_rgba(148,163,184,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-slate-400 shadow-[0_0_15px_3px_rgba(148,163,184,0.8)] z-20"></div>
            </Card3D>

            {/* BOX 5: PINTEREST CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-red-600/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#E60023]/10 border border-[#E60023]/30 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#E60023]/10 text-[#E60023] text-[9px] font-black uppercase tracking-wider border border-[#E60023]/20">
                    PINTEREST
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Give Smile NGO
                  </h4>
                  <div className="text-xs font-extrabold text-[#E60023] tracking-tight">
                    @givesmilengo
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Inspiration boards & drives
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={NGO_INFO.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-[#E60023] hover:bg-[#c0001d] text-white font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] transition-all text-center"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  <span>Follow on Pinterest ↗</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#E60023] shadow-[0_0_15px_3px_rgba(230,0,35,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-[#E60023] shadow-[0_0_15px_3px_rgba(230,0,35,0.8)] z-20"></div>
            </Card3D>

            {/* BOX 6: SNAPCHAT CARD */}
            <Card3D theme={theme} className="group relative overflow-hidden p-4 sm:p-5 flex flex-col justify-between border hover:border-yellow-400/50 transition-all">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400/15 border border-yellow-400/40 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.363.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.046-.15-.046-.226.014-.24.194-.465.45-.509 3.264-.54 4.73-3.878 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074l.016.015c.49.195.99.3 1.394.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.301-4.837C7.867 1.04 11.218.807 12.206.807z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-500 text-[9px] font-black uppercase tracking-wider border border-yellow-400/30">
                    SNAPCHAT
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Give Smile NGO
                  </h4>
                  <div className="text-xs font-extrabold text-yellow-500 tracking-tight">
                    @givesmilengo
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Behind-the-scenes & stories
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/20 relative z-10">
                <a
                  href={NGO_INFO.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] transition-all text-center"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.363.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.046-.15-.046-.226.014-.24.194-.465.45-.509 3.264-.54 4.73-3.878 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074l.016.015c.49.195.99.3 1.394.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.301-4.837C7.867 1.04 11.218.807 12.206.807z"/></svg>
                  <span>Add on Snapchat ↗</span>
                </a>
              </div>
              {/* Top Expanding Neon Fire Line */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-yellow-400 shadow-[0_0_15px_3px_rgba(250,204,21,0.8)] z-20"></div>
              {/* Bottom Expanding Neon Fire Line */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out bg-yellow-400 shadow-[0_0_15px_3px_rgba(250,204,21,0.8)] z-20"></div>
            </Card3D>

          </div>

        </div>

        {/* TIER 2: Registered & Regional Offices (Full-Width Row, 2-Column Equal Height Cards) */}
        <div className="space-y-4 pt-4 border-t border-slate-800/40">
          <div className="flex items-center justify-between px-1">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <h3 className={`text-xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Registered & Regional Offices
                </h3>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Visit our primary operational base in Baramati or our strategic corporate hub in Wakad, Pune.
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              2 LOCATIONS
            </span>
          </div>

          {/* OFFICE CARDS COMPONENT (Full-Width 2-Col Side-by-Side Equal Height) */}
          <OfficeCards theme={theme} showMapLinks={true} />
        </div>

        {/* TIER 3: Official Registration, Parent Group & Field Impact Banner */}
        <div className={`p-6 rounded-3xl border transition-all ${
          isLight 
            ? 'bg-white/80 border-slate-200/90 shadow-lg text-slate-800' 
            : 'bg-[#0d1322] border-slate-800 text-slate-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-500">Official NGO Registration</h4>
                <p className="text-xs font-bold">{NGO_INFO.regNo}</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Government Recognized & Tax Exempt</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400">Parent Foundation</h4>
                <p className="text-xs font-bold">{NGO_INFO.parentGroup}</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>30+ Years of Regional Legacy & Trust</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">Community Outreach</h4>
                <p className="text-xs font-bold">100% Direct Field Impact</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Education, Healthcare & Eldercare</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
