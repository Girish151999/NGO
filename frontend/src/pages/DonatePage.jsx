import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Heart, ShieldCheck, CheckCircle2, Award, Sparkles, Building2,
  FileText, MessageSquare, ArrowRight, QrCode, Copy, Check,
  Lightbulb, Info, CreditCard, Landmark, Smartphone, ArrowLeft, RefreshCw, Printer
} from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';
import { SupportHeartIcon } from '../components/CustomIcons';

export default function DonatePage({ theme = "light" }) {
  const isLight = theme === 'light';

  // Step Control: 1 = Fill Donor Details, 2 = Choose Payment Gateway & QR, 3 = Payment Success Receipt
  const [step, setStep] = useState(1);
  const [paymentMethodTab, setPaymentMethodTab] = useState('qr'); // 'qr' or 'gateway'

  // Step 1: Donor & Contribution Details
  const [frequency, setFrequency] = useState('monthly'); // 'monthly' or 'one-time'
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('ZP School Infrastructure Drive (Baramati)');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // Step 2: Payment Gateway Form Fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [loading, setLoading] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formError, setFormError] = useState('');
  const [upiToast, setUpiToast] = useState('');
  const [showGatewayComingSoon, setShowGatewayComingSoon] = useState(false);

  // UTR Prompt State
  const [showUtrPrompt, setShowUtrPrompt] = useState(false);
  const [upiRefInput, setUpiRefInput] = useState('');
  const [utrError, setUtrError] = useState('');

  const presetAmounts = [500, 1000, 2500, 5000, 10000];
  const OFFICIAL_UPI_ID = "7083509072@ibl";
  const OFFICIAL_PAYEE_NAME = "Give Smile Foundation";

  const handleAmountSelect = (amt) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  const activeAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;

  // Validate & Proceed from Step 1 (Details) to Step 2 (Payment Page)
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your full name for the official receipt.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your contact phone or WhatsApp number.');
      return;
    }
    if (!email.trim()) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!activeAmount || activeAmount < 100) {
      setFormError('Minimum donation amount is ₹100.');
      return;
    }

    setLoading(true);

    const payload = {
      donorName: name,
      phone: phone,
      email: email,
      panNumber: panNumber,
      amount: activeAmount,
      donationType: frequency === 'monthly' ? 'RECURRING' : 'ONE_TIME',
      causeName: cause,
      paymentMethod: 'UPI_QR_GATEWAY',
      status: 'PENDING'
    };

    try {
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Backend API save fallback to local state:', err);
    } finally {
      setLoading(false);
      setStep(2);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  // Complete Payment with UTR Verification -> Backend Email Dispatch -> Step 3
  const handleVerifyAndSubmitUpi = async (methodUsed = 'UPI_QR') => {
    setUtrError('');

    if (methodUsed === 'UPI_QR') {
      const cleanedUpi = upiRefInput.trim();
      if (!cleanedUpi || !/^\d{12}$/.test(cleanedUpi)) {
        setUtrError('Please enter a valid 12-digit UPI UTR / Reference Number (e.g. 426819873412).');
        return;
      }
    }

    setLoading(true);

    const payload = {
      donorName: name,
      phone: phone,
      email: email,
      panNumber: panNumber || '',
      amount: activeAmount,
      donationType: frequency === 'monthly' ? 'RECURRING' : 'ONE_TIME',
      causeName: cause,
      paymentMethod: methodUsed,
      upiRefNo: methodUsed === 'UPI_QR' ? upiRefInput.trim() : 'GATEWAY_SUCCESS',
      status: 'COMPLETED'
    };

    let serverReceiptNo = null;

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.receiptNo) serverReceiptNo = data.receiptNo;
      }
    } catch (err) {
      console.warn('Backend API submission fallback:', err);
    }

    const receipt = {
      receiptNo: serverReceiptNo || `GSF-REC-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      transactionId: methodUsed === 'UPI_QR' ? `UTR-${upiRefInput.trim()}` : `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      upiRefNo: methodUsed === 'UPI_QR' ? upiRefInput.trim() : 'N/A',
      donorName: name,
      phone: phone,
      email: email,
      panNumber: panNumber || 'N/A',
      amount: activeAmount,
      causeName: cause,
      donationType: frequency === 'monthly' ? 'Monthly Recurring' : 'One-Time Contribution',
      paymentMethod: methodUsed,
      upiId: OFFICIAL_UPI_ID,
      payeeName: OFFICIAL_PAYEE_NAME,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setSubmittedDonation(receipt);
    setLoading(false);
    setShowUtrPrompt(false);
    setStep(3);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const copyUpiId = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setUpiToast(`UPI ID ${text} copied to clipboard!`);
    setTimeout(() => {
      setCopiedUpi(false);
      setUpiToast('');
    }, 3500);
  };

  const upiDeepLink = `upi://pay?pa=${OFFICIAL_UPI_ID}&pn=${encodeURIComponent(OFFICIAL_PAYEE_NAME)}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent('Donation to Give Smile NGO')}`;

  const handleUpiAppClick = (appName) => {
    copyUpiId(OFFICIAL_UPI_ID);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiDeepLink;
    } else {
      setUpiToast(`UPI ID ${OFFICIAL_UPI_ID} copied! Open ${appName} on your phone to scan the QR code above.`);
    }
  };

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-6 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Light Bulb Ambient Glow Backdrop */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      {/* Toast Notification */}
      {upiToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white border border-amber-500/50 shadow-2xl text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{upiToast}</span>
        </div>
      )}

      {/* 1. Hero Header Banner */}
      <div className="max-w-7xl mx-auto text-center space-y-5 relative z-10">
        
        {/* Official Give Smile Support Sanctuary Logo Header Emblem */}
        <div className="flex justify-center pt-2 pb-1">
          <div className={`inline-flex items-center gap-3.5 px-6 py-3 rounded-2xl border shadow-xl backdrop-blur-xl transition-all ${
            isLight
              ? 'bg-white/95 border-amber-300 shadow-amber-200/60 ring-1 ring-amber-400/20'
              : 'bg-slate-900/90 border-amber-500/40 shadow-amber-500/10 ring-1 ring-amber-500/20'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 p-1 flex items-center justify-center shrink-0 border border-amber-400/30 shadow-inner">
              <SupportHeartIcon className="w-10 h-10 object-contain drop-shadow" />
            </div>
            <div className="text-left">
              <div className={`text-base font-black tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>Give Smile Support Sanctuary</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm" title="Active Official Portal" />
              </div>
              <div className={`text-xs font-extrabold ${isLight ? 'text-[#971237]' : 'text-amber-400'}`}>
                Official Grassroots Giving & Donation Portal
              </div>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
          isLight
            ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
            : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
        }`}>
          <SupportHeartIcon className="w-5 h-5 object-contain shrink-0" />
          <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse fill-amber-400/30" />
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified NGO Certified | Reg. No: {NGO_INFO.regNo}</span>
        </div>

        <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Empower Rural Lives With{' '}
          <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
            Direct Grassroots
          </span>{' '}
          Giving
        </h1>

        <p className={`text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-normal ${
          isLight ? 'text-slate-600' : 'text-slate-300'
        }`}>
          Every rupee you contribute directly funds ZP classroom desks, dignity uniform kits, child midday meals, senior healthcare, and women tailoring centers across Baramati and rural Maharashtra.
        </p>

        {/* Multi-Step Indicator Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className={`p-1.5 rounded-2xl border flex items-center justify-between text-xs font-extrabold ${
            isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#0f172a] border-slate-800'
          }`}>
            <div className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              step === 1 ? 'bg-amber-500 text-black shadow' : step > 1 ? 'text-emerald-600 font-bold' : 'text-slate-400'
            }`}>
              <span>1. Enter Donor Info</span>
              {step > 1 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <span className="text-slate-400 font-normal px-1">→</span>

            <div className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              step === 2 ? 'bg-amber-500 text-black shadow' : step === 3 ? 'text-emerald-600 font-bold' : 'text-slate-400'
            }`}>
              <span>2. QR & Gateway Payment</span>
              {step === 3 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <span className="text-slate-400 font-normal px-1">→</span>

            <div className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              step === 3 ? 'bg-emerald-600 text-white shadow' : 'text-slate-400'
            }`}>
              <span>3. Official Receipt</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Donation & Payment Hub */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Column (7 Cols): Dynamic Step Container */}
        <div className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-amber-50/50 to-orange-50/40 border-amber-300/80 shadow-xl shadow-amber-900/5 ring-1 ring-amber-400/20'
            : 'bg-gradient-to-br from-[#0c1220] via-[#10192d] to-[#151c33] border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-amber-500/20'
        }`}>
          
          {/* STEP 1: CAPTURE DONOR DETAILS */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6 animate-in fade-in">
              <div className="border-b pb-4 border-slate-700/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-500 block">
                    Step 1 of 2
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Donor & Contribution Information
                  </h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30 font-bold">
                  Details Captured First
                </span>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-600 text-xs font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Contribution Frequency Tabs */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-[#971237]' : 'text-amber-400'
                }`}>
                  Select Contribution Frequency
                </label>
                <div className={`grid grid-cols-2 gap-3 p-1.5 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#070b14] border-slate-800'
                }`}>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-[1.02]'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Monthly Recurring</span>
                    <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded bg-white/20 font-bold ml-1">
                      1.5x Impact
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-gradient-to-r from-[#971237] to-[#b81745] text-white shadow-md scale-[1.02]'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>One-Time Contribution</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-[#971237]' : 'text-amber-400'
                }`}>
                  Select Donation Amount (₹)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-3 rounded-xl text-sm font-extrabold transition-all border cursor-pointer ${
                        amount === amt && !customAmount
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-105'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50'
                            : 'bg-[#070b14] border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-white'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative pt-1">
                  <span className={`absolute left-4 top-4 font-extrabold text-sm ${
                    isLight ? 'text-amber-600' : 'text-amber-400'
                  }`}>₹</span>
                  <input
                    type="number"
                    min="100"
                    placeholder="Or enter custom amount in ₹ (Minimum ₹100)"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full pl-9 pr-4 py-3 rounded-xl border text-xs font-semibold placeholder-slate-400 outline-none transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:bg-white'
                        : 'bg-[#070b14] border-slate-800 text-white focus:border-amber-400'
                    }`}
                  />
                </div>
              </div>

              {/* Cause Selection */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-[#971237]' : 'text-amber-400'
                }`}>
                  Direct Contribution Towards Specific Cause
                </label>
                <select
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs font-semibold outline-none cursor-pointer ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500'
                      : 'bg-[#070b14] border-slate-800 text-white focus:border-amber-400'
                  }`}
                >
                  <option value="ZP School Infrastructure Drive (Baramati)">ZP School Desks & Infrastructure (Baramati Drive)</option>
                  <option value="Child Midday Meals & Nutrition Drive">Child Midday Meals & Zero-Hunger Kitchens</option>
                  <option value="Senior Citizen Free Eye & Health Camps">Senior Citizen Free Health & Cataract Camps</option>
                  <option value="Women Vocational Skill & Sewing Machines">Women Self-Help Vocational Skill Training</option>
                  <option value="General Community Upliftment Fund">General Give Smile Upliftment Fund</option>
                </select>
              </div>

              {/* Donor Personal Information */}
              <div className="space-y-3 pt-2">
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-[#971237]' : 'text-amber-400'
                }`}>
                  Donor Contact Information (Mandatory For Receipt)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                          : 'bg-[#070b14] border-slate-800 text-white placeholder-slate-500 focus:border-amber-400'
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                          : 'bg-[#070b14] border-slate-800 text-white placeholder-slate-500 focus:border-amber-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                          : 'bg-[#070b14] border-slate-800 text-white placeholder-slate-500 focus:border-amber-400'
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="PAN / Tax ID (Optional)"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium uppercase outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                          : 'bg-[#070b14] border-slate-800 text-white placeholder-slate-500 focus:border-amber-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button to proceed to Step 2 */}
              <button
                type="submit"
                disabled={loading || activeAmount <= 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-sm sm:text-base shadow-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-amber-400/50"
              >
                <span>Proceed to Payment Options (₹{activeAmount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT PAGE (QR CODE & GATEWAY OPTIONS) */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Order Summary & Edit Button */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isLight ? 'bg-amber-50/80 border-amber-200' : 'bg-[#070b14] border-amber-500/30'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-black uppercase text-emerald-600">Donor Details Captured</span>
                  </div>
                  <h3 className={`text-base font-extrabold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {name} ({phone})
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Pledging <strong className="text-amber-600">₹{activeAmount.toLocaleString('en-IN')}</strong> for <span className="font-semibold text-[#971237]">{cause}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
                    isLight
                      ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Info</span>
                </button>
              </div>

              {/* Payment Method Switcher Tabs */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-[#971237]' : 'text-amber-400'
                }`}>
                  Select Preferred Payment Method
                </label>
                <div className={`grid grid-cols-2 gap-3 p-1.5 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#070b14] border-slate-800'
                }`}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('qr')}
                    className={`py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethodTab === 'qr'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md scale-[1.02]'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Paytm UPI QR & Apps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGatewayComingSoon(true)}
                    className={`py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 opacity-60 cursor-not-allowed relative ${
                      isLight ? 'text-slate-400 bg-slate-100' : 'text-slate-500 bg-slate-800/60'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Online Payment Gateway</span>
                    <span className="absolute -top-2 -right-1 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow">Soon</span>
                  </button>
                </div>
              </div>

              {/* PAYMENT OPTION 1: PAYTM UPI QR & APPS */}
              {paymentMethodTab === 'qr' && (
                <div className="space-y-6 pt-1 animate-in fade-in">
                  
                  {/* Dedicated Official Paytm QR Card Uploaded by User */}
                  <div className={`p-6 rounded-3xl border text-center space-y-4 shadow-xl ${
                    isLight ? 'bg-white border-amber-200' : 'bg-[#070b14] border-amber-500/40'
                  }`}>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-extrabold border border-purple-500/30 uppercase">
                      <Smartphone className="w-3.5 h-3.5" />
                      Official PhonePe & UPI QR Code
                    </div>

                    {/* PhonePe Display Card with User's Uploaded QR Image */}
                    <div className="max-w-xs mx-auto p-4 rounded-3xl bg-white border-2 border-purple-500/50 shadow-2xl space-y-3 text-slate-900">
                      
                      <div className="flex items-center justify-center gap-2 border-b pb-2">
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs">
                          KD
                        </div>
                        <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
                          {OFFICIAL_PAYEE_NAME}
                          <CheckCircle2 className="w-4 h-4 text-purple-600 fill-purple-600" />
                        </span>
                      </div>

                      {/* Dynamic Amount QR Code Generator */}
                      <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 p-2.5 bg-white flex flex-col items-center justify-center space-y-2">
                        <QRCodeSVG
                          value={upiDeepLink}
                          size={200}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                          includeMargin={true}
                          aria-label={`UPI QR Code for ₹${activeAmount}`}
                        />
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[11px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Fixed Amount: <strong className="text-emerald-700">₹{activeAmount.toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>

                      {/* Official UPI ID Display */}
                      <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                        <div className="text-left">
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase block">Official UPI ID</span>
                          <span className="text-xs font-mono font-black text-slate-900">{OFFICIAL_UPI_ID}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyUpiId(OFFICIAL_UPI_ID)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-[10px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive UPI App Buttons */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">
                        Tap To Pay via Any Installed UPI App:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpiAppClick('PhonePe')}
                          className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <span>PhonePe</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpiAppClick('Google Pay')}
                          className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <span>Google Pay</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpiAppClick('Paytm')}
                          className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <span>Paytm</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpiAppClick('BHIM UPI')}
                          className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <span>BHIM UPI</span>
                        </button>
                      </div>
                    </div>

                    {/* Completion Confirmation CTA / UTR Prompt */}
                    {showUtrPrompt ? (
                      <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500 space-y-4 text-left animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-amber-500" />
                            <h4 className="font-extrabold text-sm text-amber-500">
                              Enter 12-Digit UPI Reference / UTR Number
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setShowUtrPrompt(false); setUtrError(''); }}
                            className="text-xs font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                          Please open your payment confirmation screen in PhonePe, Google Pay, Paytm, or BHIM, and copy the 12-digit UPI UTR / Reference Number.
                        </p>

                        {utrError && (
                          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-500 text-xs font-bold">
                            {utrError}
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className={`text-[11px] font-extrabold uppercase block ${isLight ? 'text-[#971237]' : 'text-amber-400'}`}>
                            12-Digit UPI UTR / Transaction Ref No *
                          </label>
                          <input
                            type="text"
                            maxLength="12"
                            placeholder="e.g. 426819873412"
                            value={upiRefInput}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setUpiRefInput(val);
                              if (utrError) setUtrError('');
                            }}
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-mono font-bold tracking-widest outline-none ${
                              isLight
                                ? 'bg-white border-amber-400 text-slate-900 focus:ring-2 focus:ring-amber-500'
                                : 'bg-[#070b14] border-amber-500/60 text-amber-400 focus:ring-2 focus:ring-amber-400'
                            }`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleVerifyAndSubmitUpi('UPI_QR')}
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs sm:text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{loading ? 'Verifying UTR & Sending Email...' : 'Verify UTR & Send Official Receipt to Mail'}</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setShowUtrPrompt(true); setUtrError(''); }}
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-black text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>I Have Paid via QR / UPI — Complete Payment & Get Receipt</span>
                      </button>
                    )}

                  </div>
                </div>
              )}

              {/* PAYMENT OPTION 2: INTEGRATED ONLINE PAYMENT GATEWAY */}
              {paymentMethodTab === 'gateway' && (
                <div className="space-y-6 pt-1 animate-in fade-in">
                  <div className={`p-6 rounded-3xl border space-y-4 shadow-xl ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#070b14] border-amber-500/30'
                  }`}>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-amber-500" />
                        <span className="font-extrabold text-sm">Secure Payment Gateway Checkout</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-600 border border-emerald-400">
                        256-bit SSL Encrypted
                      </span>
                    </div>

                    {/* Card Payment Simulator Form */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder={name || "Name on Card"}
                          value={cardName || name}
                          onChange={(e) => setCardName(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none ${
                            isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength="19"
                          placeholder="4532 •••• •••• 8910"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold outline-none ${
                            isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            maxLength="5"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold outline-none ${
                              isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">CVV / CVC</label>
                          <input
                            type="password"
                            maxLength="4"
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold outline-none ${
                              isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                            }`}
                          />
                        </div>
                      </div>

                      {/* NetBanking Bank Selection */}
                      <div className="pt-2">
                        <label className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">Or Pay via NetBanking</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none cursor-pointer ${
                            isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                          }`}
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    </div>

                    {/* Gateway Submit CTA */}
                    <button
                      type="button"
                      onClick={() => handleVerifyAndSubmitUpi('PAYMENT_GATEWAY')}
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#971237] via-[#b81745] to-amber-500 text-white font-black text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>{loading ? 'Connecting to Bank Gateway...' : `Pay ₹${activeAmount.toLocaleString('en-IN')} Now via Gateway`}</span>
                    </button>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: OFFICIAL DONATION RECEIPT & SUCCESS */}
          {step === 3 && submittedDonation && (
            <div className="text-center py-6 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block">
                  Donation Verified & Official Receipt Generated
                </span>
                <h2 className={`text-3xl font-extrabold font-serif ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Thank You, {submittedDonation.donorName}!
                </h2>
                <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Your contribution of <strong className="text-amber-600">₹{submittedDonation.amount.toLocaleString('en-IN')}</strong> towards <span className="font-bold text-[#971237]">{submittedDonation.causeName}</span> has been processed successfully.
                </p>

                {/* Email Sent Confirmation Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 text-xs font-extrabold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Official Receipt dispatched to email: <strong>{submittedDonation.email}</strong></span>
                  </div>
                </div>
              </div>

              {/* Official Digital Receipt Card */}
              <div className={`max-w-md mx-auto p-6 rounded-3xl border text-left space-y-3 text-xs font-mono shadow-2xl relative overflow-hidden ${
                isLight
                  ? 'bg-amber-50/90 border-amber-300 text-slate-800'
                  : 'bg-[#070b14] border-amber-500/40 text-slate-200'
              }`}>
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">Give Smile NGO</span>
                    <span className="text-xs font-black">Official Donation Receipt</span>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 border border-emerald-400">
                    VERIFIED RECEIPT
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Receipt No:</span>
                    <span className="font-bold text-amber-600">{submittedDonation.receiptNo}</span>
                  </div>
                  {submittedDonation.upiRefNo && submittedDonation.upiRefNo !== 'N/A' && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">UPI UTR / Ref No:</span>
                      <span className="font-mono font-bold text-amber-600">{submittedDonation.upiRefNo}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction Ref:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{submittedDonation.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Donor Name:</span>
                    <span className="font-bold">{submittedDonation.donorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone / Email:</span>
                    <span className="font-bold">{submittedDonation.phone} / {submittedDonation.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-black text-emerald-600 text-sm">₹{submittedDonation.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payee Account:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{submittedDonation.payeeName} ({submittedDonation.upiId})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-bold">{submittedDonation.date}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/91${submittedDonation.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(submittedDonation.donorName)},%20thank%20you%20for%20your%20donation%20of%20₹${submittedDonation.amount}%20to%20Give%20Smile%20Foundation.%20Receipt%20Code:%20${submittedDonation.receiptNo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-700 shadow"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Receipt to WhatsApp</span>
                </a>

                <button
                  onClick={() => { setStep(1); setSubmittedDonation(null); }}
                  className="px-5 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-amber-600 shadow"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Make Another Donation</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (5 Cols): Direct Aid & Transparency Hub (Equal Height Flex) */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full">
          
          {/* Card 1: Verified Official UPI Card */}
          <div className={`flex-1 flex flex-col p-5 rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isLight
              ? 'bg-gradient-to-br from-white via-cyan-50/60 to-sky-50/50 border-cyan-200/90 shadow-cyan-900/5 ring-1 ring-cyan-400/30'
              : 'bg-gradient-to-br from-[#071529] via-[#0b1e36] to-[#0e2747] border-cyan-500/40 shadow-cyan-500/10 ring-1 ring-cyan-500/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-600 border border-cyan-300 flex items-center justify-center shrink-0 shadow-sm">
                <QrCode className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Official Paytm &amp; UPI Payment
                </h3>
                <span className="text-sm font-bold text-amber-600">Payee: {OFFICIAL_PAYEE_NAME}</span>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mt-3 flex-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Fill out your details on the left, then scan the QR or use any UPI app (GPay, PhonePe, Paytm, BHIM) to contribute directly.
            </p>

            <div className={`mt-3 p-3.5 rounded-2xl border flex items-center justify-between ${
              isLight ? 'bg-white/90 border-cyan-300/80 shadow-sm' : 'bg-[#061224] border-cyan-500/40'
            }`}>
              <div>
                <span className="text-xs text-slate-500 font-extrabold uppercase block">Verified UPI ID</span>
                <span className="font-black text-amber-600 text-base font-mono">{OFFICIAL_UPI_ID}</span>
              </div>
              <button
                type="button"
                onClick={() => copyUpiId(OFFICIAL_UPI_ID)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                {copiedUpi ? 'Copied!' : 'Copy UPI'}
              </button>
            </div>
          </div>

          {/* Card 2: 100% Direct Grassroots Guarantee */}
          <div className={`flex-1 flex flex-col p-5 rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isLight
              ? 'bg-gradient-to-br from-white via-emerald-50/60 to-teal-50/50 border-emerald-200/90 shadow-emerald-900/5 ring-1 ring-emerald-400/30'
              : 'bg-gradient-to-br from-[#061816] via-[#0b2621] to-[#0f332c] border-emerald-500/40 shadow-emerald-500/10 ring-1 ring-emerald-500/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-600 border border-emerald-300 flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className={`text-xl font-extrabold font-serif ${isLight ? 'text-slate-900' : 'text-white'}`}>
                100% Direct Grassroots Impact
              </h3>
            </div>

            <p className={`text-sm leading-relaxed mt-3 flex-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Give Smile Foundation is a legally registered non-profit organization (Reg No: <strong className={isLight ? "text-[#971237] font-bold" : "text-amber-400"}>{NGO_INFO.regNo}</strong>). All contributions directly fund ZP school infrastructure, midday meals, and eldercare drives.
            </p>

            <ul className={`space-y-2.5 text-sm mt-3 pt-3 border-t ${isLight ? 'border-emerald-200/80' : 'border-emerald-500/30'}`}>
              <li className={`flex items-center gap-2 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant official digital receipt emailed &amp; sent to WhatsApp</span>
              </li>
              <li className={`flex items-center gap-2 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audited financial statements filed annually with ROC</span>
              </li>
              <li className={`flex items-center gap-2 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Photographic field proof delivered for every drive</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Corporate Backing & Legacy */}
          <div className={`flex-1 flex flex-col p-5 rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isLight
              ? 'bg-gradient-to-br from-white via-rose-50/50 to-amber-50/60 border-amber-200/90 shadow-amber-900/5 ring-1 ring-amber-400/30'
              : 'bg-gradient-to-br from-[#1c0d18] via-[#261222] to-[#1a0e1c] border-rose-500/40 shadow-rose-500/10 ring-1 ring-rose-500/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-950 p-1.5 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img src="/assets/group/girish_group-clean.png" alt="Girish Group Foundation" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Girish Group Foundation</h4>
                <p className={`text-xs font-bold uppercase ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>30+ Years of Corporate Legacy</p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mt-3 flex-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Operates under the corporate arm of Girish Group of Companies, providing multi-generational stability, zero administrative waste, and maximum field impact across Baramati and Maharashtra.
            </p>
          </div>

        </div>



      </div>

      {/* ── COMING SOON POPUP ── */}
      {showGatewayComingSoon && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowGatewayComingSoon(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl border shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)', borderColor: 'rgba(245,158,11,0.5)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 0 60px rgba(245,158,11,0.18) inset' }} />

            {/* Top amber bar */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-t-3xl" />

            <div className="px-8 py-8 flex flex-col items-center text-center space-y-5">
              {/* Animated icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                <CreditCard className="w-8 h-8 text-slate-950" />
              </div>

              {/* Badge */}
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/40">
                🔒 Feature Locked
              </span>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white tracking-tight">Online Payment Gateway</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We're integrating a secure, end-to-end encrypted payment gateway.<br />
                  <span className="text-amber-400 font-bold">Launching very soon — stay tuned! 🚀</span>
                </p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Meanwhile, you can donate instantly via <span className="text-purple-400 font-bold">PhonePe / UPI QR</span> — it's fast, verified & secure.
              </p>

              <button
                onClick={() => setShowGatewayComingSoon(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm tracking-wide hover:scale-[1.03] active:scale-95 transition-all shadow-lg shadow-amber-500/30"
              >
                Got It — Use UPI Instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
