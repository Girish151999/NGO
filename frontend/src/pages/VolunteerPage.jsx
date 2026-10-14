import React, { useState } from 'react';
import { UserPlus, CheckCircle2, Send, User, Phone, Mail, MapPin, MessageSquare, Sparkles, HeartHandshake } from 'lucide-react';

export default function VolunteerPage({ theme = "dark" }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [purpose, setPurpose] = useState('');
  const [attendEvents, setAttendEvents] = useState(true);
  const [raiseFunds, setRaiseFunds] = useState(false);
  const [skills, setSkills] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLight = theme === 'light';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      _subject: `New Volunteer Application: ${fullName}`,
      _captcha: 'false',
      _template: 'table',
      fullName,
      email,
      phone,
      city,
      purpose,
      attendEvents: attendEvents ? 'Yes' : 'No',
      raiseFunds: raiseFunds ? 'Yes' : 'No',
      skillsAndResources: skills
    };

    try {
      // Direct Email Delivery for Volunteering to k.d.sodmise@gsgroupofcompanies.co.in
      await fetch('https://formsubmit.co/ajax/k.d.sodmise@gsgroupofcompanies.co.in', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('FormSubmit notice:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // User Request Theme Swap:
  // On Light Mode page -> Form gets darkish effect with heavy dark shadows & gold accents
  // On Dark Mode page  -> Form gets lightish effect with light ambient shadows & crimson accents
  const labelStyle = isLight
    ? 'text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5 drop-shadow-sm'
    : 'text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5';

  const inputStyle = isLight
    ? 'bg-[#131b2e] hover:bg-[#18233c] focus:bg-[#0f172a] border-2 border-amber-500/30 focus:border-amber-400 text-white placeholder:text-slate-400 focus:ring-4 focus:ring-amber-400/30 shadow-inner font-bold transition-all duration-200'
    : 'bg-slate-50/90 hover:bg-amber-50/30 focus:bg-white border-2 border-amber-200/90 focus:border-amber-500 text-slate-950 placeholder:text-slate-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm font-bold transition-all duration-200';

  const iconBadgeStyle = isLight
    ? 'w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0'
    : 'w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#971237] flex items-center justify-center shrink-0';

  const optionCardStyle = isLight
    ? 'bg-[#131b2e] hover:bg-[#18233c] border-2 border-amber-500/30 hover:border-amber-400 text-slate-100 shadow-md transition-all rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer'
    : 'bg-white hover:bg-amber-50/50 border-2 border-amber-200 hover:border-amber-400 text-slate-900 shadow-sm transition-all rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer';

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-16 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Ambient Glow Backdrop */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <UserPlus className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Join Our Movement</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Become a Give Smile{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Volunteer
            </span>
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            We warmly invite social activists, fundraisers, educators, and change-makers to contribute skills and time towards holistic community upliftment.
          </p>
        </div>

        {/* Master Form Card Container */}
        <div className={`rounded-3xl border-2 transition-all shadow-2xl relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-b from-[#0d1322] via-[#0f172a] to-[#0a0f1d] text-white border-amber-500/40 shadow-2xl shadow-slate-900/60'
            : 'bg-gradient-to-br from-white via-[#fffdfa] to-amber-50/40 text-slate-900 border-amber-300/90 shadow-2xl shadow-amber-500/20'
        }`}>
          {/* Top Gradient Ribbon Header */}
          <div className="h-2 w-full bg-gradient-to-r from-[#971237] via-amber-500 to-[#971237]" />

          <div className="p-8 sm:p-12 space-y-8">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className={`text-3xl font-extrabold ${isLight ? 'text-white' : 'text-slate-900'}`}>Application Received!</h2>
                <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thank you <strong>{fullName}</strong> for stepping forward to join Give Smile Foundation. Our volunteer coordinator will reach out to you on <strong>{phone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section Header Banner */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                  isLight ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-500/10 border-amber-300/60 text-[#971237]'
                }`}>
                  <HeartHandshake className="w-6 h-6 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="text-sm font-extrabold">Official Volunteer Registration</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>Fill details below to join our Baramati & Rural Maharashtra drive team.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>
                      <User className="w-4 h-4 text-amber-500" />
                      <span>Full Name *</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      <div className={iconBadgeStyle}>
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      <div className={iconBadgeStyle}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 070835 09072"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span>Email Address</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      <div className={iconBadgeStyle}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="your.email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>City / District *</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      <div className={iconBadgeStyle}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Baramati / Pune"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Primary Purpose for Volunteering *</span>
                  </label>
                  <div className="flex items-start gap-2.5">
                    <div className={`${iconBadgeStyle} mt-1`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={3}
                      required
                      placeholder="What motivates you to volunteer with Give Smile NGO?"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <label className={optionCardStyle}>
                    <input
                      type="checkbox"
                      checked={attendEvents}
                      onChange={(e) => setAttendEvents(e.target.checked)}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer shrink-0"
                    />
                    <div>
                      <div className={`text-xs font-black ${isLight ? 'text-slate-100' : 'text-slate-900'}`}>Physical On-Ground Drives</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>Available to attend & manage events</div>
                    </div>
                  </label>

                  <label className={optionCardStyle}>
                    <input
                      type="checkbox"
                      checked={raiseFunds}
                      onChange={(e) => setRaiseFunds(e.target.checked)}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer shrink-0"
                    />
                    <div>
                      <div className={`text-xs font-black ${isLight ? 'text-slate-100' : 'text-slate-900'}`}>Fundraising & Outreach</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>Interested in campaign outreach</div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className={labelStyle}>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Unique Skills, Expertise, or Resources</span>
                  </label>
                  <div className="flex items-start gap-2.5">
                    <div className={`${iconBadgeStyle} mt-1`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Teaching, graphic design, healthcare, event management, IT skills, etc."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none ${inputStyle}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4.5 rounded-2xl font-black text-base tracking-wide shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer border border-amber-400/40 ${
                    isLight
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-amber-500/30 hover:shadow-amber-500/50'
                      : 'bg-gradient-to-r from-[#971237] via-amber-500 to-[#971237] text-white shadow-amber-500/20 hover:shadow-amber-500/40'
                  }`}
                >
                  <Send className={`w-5 h-5 ${isLight ? 'fill-slate-950 text-slate-950' : 'fill-white text-white'}`} />
                  <span>{loading ? 'Submitting Application...' : 'Submit Volunteer Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
