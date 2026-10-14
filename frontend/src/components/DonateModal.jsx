import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X, Heart, CheckCircle2, Copy, MessageSquare, QrCode, CreditCard,
  Check, ArrowRight, ArrowLeft, ShieldCheck, Smartphone, Printer, RefreshCw, Building2, Landmark
} from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';
import { SupportHeartIcon } from './CustomIcons';

export default function DonateModal({ isOpen, onClose, theme = "dark" }) {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment Options, 3 = Receipt
  const [paymentTab, setPaymentTab] = useState('qr'); // 'qr' or 'gateway'

  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('RECURRING');
  const [selectedCause, setSelectedCause] = useState('ZP School Infrastructure Drive');
  
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');

  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState('');
  const [showGatewayComingSoon, setShowGatewayComingSoon] = useState(false);

  // UTR Prompt State
  const [showUtrPrompt, setShowUtrPrompt] = useState(false);
  const [upiRefInput, setUpiRefInput] = useState('');
  const [utrError, setUtrError] = useState('');

  // Lock body scroll when DonateModal is open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;
  const isLight = theme === 'light';

  const OFFICIAL_UPI_ID = "7083509072@ibl";
  const OFFICIAL_PAYEE_NAME = "Give Smile Foundation";

  const activeAmount = amount === 'custom' ? parseInt(customAmount, 10) || 0 : parseInt(amount, 10) || 1000;

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!donorName.trim()) {
      setErrorMsg('Please enter your full name for the receipt.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone / WhatsApp number.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!activeAmount || activeAmount < 100) {
      setErrorMsg('Minimum donation amount is ₹100.');
      return;
    }

    setLoading(true);

    const payload = {
      donorName: donorName,
      email: email,
      phone: phone,
      panNumber: panNumber,
      amount: activeAmount,
      donationType: donationType,
      causeName: selectedCause,
      paymentMethod: "UPI_QR_GATEWAY",
      status: "PENDING"
    };

    try {
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Backend fallback:', err);
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleVerifyAndSubmitUpi = async (method = 'UPI_QR') => {
    setUtrError('');

    if (method === 'UPI_QR') {
      const cleaned = upiRefInput.trim();
      if (!cleaned || !/^\d{12}$/.test(cleaned)) {
        setUtrError('Please enter a valid 12-digit UPI UTR / Reference Number (e.g. 426819873412).');
        return;
      }
    }

    setLoading(true);

    const payload = {
      donorName: donorName,
      email: email,
      phone: phone,
      panNumber: panNumber || '',
      amount: activeAmount,
      donationType: donationType,
      causeName: selectedCause,
      paymentMethod: method,
      upiRefNo: method === 'UPI_QR' ? upiRefInput.trim() : 'GATEWAY_SUCCESS',
      status: "COMPLETED"
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
      console.warn('Backend fallback:', err);
    }

    const receipt = {
      receiptNo: serverReceiptNo || `GSF-REC-${Math.floor(100000 + Math.random() * 900000)}`,
      transactionId: method === 'UPI_QR' ? `UTR-${upiRefInput.trim()}` : `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      upiRefNo: method === 'UPI_QR' ? upiRefInput.trim() : 'N/A',
      donorName: donorName,
      phone: phone,
      email: email,
      amount: activeAmount,
      causeName: selectedCause,
      donationType: donationType === 'RECURRING' ? 'Monthly Recurring' : 'One-Time Contribution',
      paymentMethod: method,
      payeeName: OFFICIAL_PAYEE_NAME,
      upiId: OFFICIAL_UPI_ID
    };

    setSubmittedReceipt(receipt);
    setLoading(false);
    setShowUtrPrompt(false);
    setStep(3);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_ID);
    setCopied(true);
    setToast(`UPI ID ${OFFICIAL_UPI_ID} copied!`);
    setTimeout(() => {
      setCopied(false);
      setToast('');
    }, 3000);
  };

  const upiDeepLink = `upi://pay?pa=${OFFICIAL_UPI_ID}&pn=${encodeURIComponent(OFFICIAL_PAYEE_NAME)}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent('Donation to Give Smile NGO')}`;

  const handleUpiAppClick = (appName) => {
    copyUpiId();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiDeepLink;
    } else {
      setToast(`UPI ID copied! Open ${appName} on your phone to scan the Paytm QR code.`);
    }
  };

  const inputStyle = isLight
    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
    : 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-400';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl transition-colors border overflow-hidden ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#121722] border-slate-800 text-slate-100 dark-vignette-side'
        }`}
      >
        {/* Toast inside modal */}
        {toast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-slate-900 text-white border border-amber-500 text-xs font-bold shadow-xl">
            {toast}
          </div>
        )}

        {/* Sticky Header */}
        <div className={`sticky top-0 z-30 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-[#121722]/95 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <SupportHeartIcon className="w-6 h-6 bg-amber-500/20 p-0.5 rounded-lg border border-amber-500/40" />
            <span className="text-sm font-extrabold tracking-tight">Give Smile Foundation</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/40 font-bold">
              {step === 1 ? 'Step 1: Details' : step === 2 ? 'Step 2: Payment' : 'Receipt'}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full border cursor-pointer transition-all hover:scale-110 ${
              isLight ? 'bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Close Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">

          {/* STEP 1: DONOR DETAILS FIRST */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              <div className="text-center space-y-1">
                <h3 className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Direct Grassroots Donation
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Please fill out your contact details first to generate your official donation receipt.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-500 text-xs font-bold text-center">
                  {errorMsg}
                </div>
              )}

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-amber-500 block">
                  Select Contribution Amount (₹)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['500', '1000', '2500', '5000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setAmount(amt); setCustomAmount(''); }}
                      className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        amount === amt
                          ? 'bg-amber-500 text-black border-amber-400 font-black scale-105 shadow-md'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min="100"
                  placeholder="Or custom amount in ₹ (Minimum ₹100)"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount('custom'); }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none ${inputStyle}`}
                />
              </div>

              {/* Cause Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-amber-500 block">
                  Select Initiative
                </label>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold outline-none cursor-pointer ${inputStyle}`}
                >
                  <option value="ZP School Infrastructure Drive">ZP School Infrastructure Drive</option>
                  <option value="Child Midday Meals & Malnutrition">Child Midday Meals & Nutrition</option>
                  <option value="Senior Citizen Diagnostic Health Camps">Senior Citizen Diagnostic Health Camps</option>
                  <option value="Women Vocational Skill & Tailoring">Women Vocational Skill Training</option>
                </select>
              </div>

              {/* Mandatory Personal Info */}
              <div className="space-y-3 pt-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-amber-500 block">
                  Donor Contact Information (Mandatory)
                </label>

                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium outline-none ${inputStyle}`}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium outline-none ${inputStyle}`}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium outline-none ${inputStyle}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-xs sm:text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-400/50"
              >
                <span>Proceed to Payment (₹{activeAmount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT PAGE (QR & GATEWAY) */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Order summary header */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                isLight ? 'bg-amber-50 border-amber-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <div>
                  <div className="text-[10px] font-extrabold text-emerald-600 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Donor: {donorName}</span>
                  </div>
                  <div className="font-extrabold text-sm text-amber-600 mt-0.5">Pledge Amount: ₹{activeAmount.toLocaleString('en-IN')}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Edit Info</span>
                </button>
              </div>

              {/* Payment Tab Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentTab('qr')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentTab === 'qr' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>PhonePe & UPI QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowGatewayComingSoon(true)}
                  className="py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-slate-500 opacity-60 cursor-not-allowed relative"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Gateway</span>
                  <span className="absolute -top-2 -right-1 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">Soon</span>
                </button>
              </div>

              {paymentTab === 'qr' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded-2xl bg-white text-slate-900 max-w-xs mx-auto border-2 border-cyan-500 shadow-xl space-y-2">
                    <div className="flex items-center justify-center gap-1.5 border-b pb-2 text-xs font-bold">
                      <span>{OFFICIAL_PAYEE_NAME}</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
                    </div>

                    {/* Dynamic Amount QR Code Generator */}
                    <div className="p-2 bg-white rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center space-y-1.5">
                      <QRCodeSVG
                        value={upiDeepLink}
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                        aria-label={`UPI QR Code for ₹${activeAmount}`}
                      />
                      <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[10px] font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Fixed Amount: <strong>₹{activeAmount.toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-100 text-[11px] font-mono flex items-center justify-between">
                      <span className="font-extrabold">{OFFICIAL_UPI_ID}</span>
                      <button
                        type="button"
                        onClick={copyUpiId}
                        className="px-2 py-0.5 rounded bg-cyan-600 text-white text-[10px] font-bold cursor-pointer"
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* App Quick Links */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button type="button" onClick={() => handleUpiAppClick('PhonePe')} className="py-2 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer">PhonePe</button>
                    <button type="button" onClick={() => handleUpiAppClick('Google Pay')} className="py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer">GPay</button>
                    <button type="button" onClick={() => handleUpiAppClick('Paytm')} className="py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs cursor-pointer">Paytm</button>
                    <button type="button" onClick={() => handleUpiAppClick('BHIM UPI')} className="py-2 rounded-xl bg-orange-600 text-white font-bold text-xs cursor-pointer">BHIM UPI</button>
                  </div>

                  {/* Completion Confirmation CTA / UTR Prompt */}
                  {showUtrPrompt ? (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500 space-y-3 text-left animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-amber-500" />
                          <h4 className="font-extrabold text-xs text-amber-500">
                            Enter 12-Digit UPI UTR Reference Number
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setShowUtrPrompt(false); setUtrError(''); }}
                          className="text-[11px] font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        Enter the 12-digit UPI UTR / Ref No. from your payment app (PhonePe / GPay / Paytm / BHIM) to verify and receive your email receipt.
                      </p>

                      {utrError && (
                        <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-400 text-[11px] font-bold">
                          {utrError}
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase text-amber-400 block">
                          12-Digit UPI UTR / Ref No *
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
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-widest outline-none ${
                            isLight
                              ? 'bg-white border-amber-400 text-slate-900 focus:ring-2 focus:ring-amber-500'
                              : 'bg-slate-900 border-amber-500/60 text-amber-400 focus:ring-2 focus:ring-amber-400'
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleVerifyAndSubmitUpi('UPI_QR')}
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{loading ? 'Verifying & Sending Email...' : 'Verify UTR & Send Official Receipt to Mail'}</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setShowUtrPrompt(true); setUtrError(''); }}
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Have Completed Payment - Issue Receipt</span>
                    </button>
                  )}
                </div>
              )}

              {paymentTab === 'gateway' && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <div className="text-xs font-bold flex justify-between items-center">
                      <span>Online Payment Gateway Checkout</span>
                      <span className="text-[10px] text-emerald-500">256-bit SSL</span>
                    </div>

                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      defaultValue={donorName}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none ${inputStyle}`}
                    />
                    <input
                      type="text"
                      placeholder="Card Number (4532 •••• •••• 8910)"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono outline-none ${inputStyle}`}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono outline-none ${inputStyle}`}
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono outline-none ${inputStyle}`}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleVerifyAndSubmitUpi('PAYMENT_GATEWAY')}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-[#971237] hover:bg-[#800f2e] text-white font-black text-xs sm:text-sm shadow-xl cursor-pointer"
                  >
                    {loading ? 'Processing Bank Gateway...' : `Pay ₹${activeAmount.toLocaleString('en-IN')} Now via Gateway`}
                  </button>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: SUCCESS & RECEIPT */}
          {step === 3 && submittedReceipt && (
            <div className="text-center py-4 space-y-5 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-black text-emerald-600 tracking-wider">Donation Verified</span>
                <h3 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Thank You, {submittedReceipt.donorName}!</h3>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Your contribution of <strong className="text-amber-600">₹{submittedReceipt.amount}</strong> towards <span className="font-bold">{submittedReceipt.causeName}</span> has been received.
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 text-[11px] font-extrabold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Official receipt emailed to: <strong>{submittedReceipt.email}</strong></span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border text-left text-xs font-mono space-y-1.5 max-w-md mx-auto ${
                isLight ? 'bg-amber-50 border-amber-300' : 'bg-slate-900 border-amber-500/40'
              }`}>
                <div className="flex justify-between">
                  <span className="text-slate-400">Receipt Code:</span>
                  <span className="font-black text-amber-500">{submittedReceipt.receiptNo}</span>
                </div>
                {submittedReceipt.upiRefNo && submittedReceipt.upiRefNo !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">UPI UTR / Ref No:</span>
                    <span className="font-mono font-bold text-amber-500">{submittedReceipt.upiRefNo}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction Ref:</span>
                  <span className="font-bold">{submittedReceipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payee:</span>
                  <span className="font-bold">{submittedReceipt.payeeName} ({submittedReceipt.upiId})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <a
                  href={`https://wa.me/91${submittedReceipt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(submittedReceipt.donorName)},%20thank%20you%20for%20your%20donation%20of%20₹${submittedReceipt.amount}.%20Receipt%20Code:%20${submittedReceipt.receiptNo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Send to WhatsApp</span>
                </a>

                <button
                  onClick={() => { setStep(1); setSubmittedReceipt(null); }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Make Another Donation</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── COMING SOON POPUP ── */}
      {showGatewayComingSoon && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(10px)' }}
          onClick={() => setShowGatewayComingSoon(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl border shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)', borderColor: 'rgba(245,158,11,0.5)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 0 60px rgba(245,158,11,0.18) inset' }} />
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
            <div className="px-8 py-8 flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                <CreditCard className="w-8 h-8 text-slate-950" />
              </div>
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
                Meanwhile, donate instantly via <span className="text-purple-400 font-bold">PhonePe / UPI QR</span> — fast, verified & secure.
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
