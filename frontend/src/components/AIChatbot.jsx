import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Bot, Send, X, Sparkles, RefreshCw, ChevronDown, User, Heart, ShieldCheck } from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';

const GROQ_API_KEY = "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";
const GROQ_PRIMARY_MODEL = "openai/gpt-oss-120b";
const GROQ_FALLBACK_MODEL = "openai/gpt-oss-20b";

const SYSTEM_PROMPT = `You are "Give Smile Bot", the official AI Chatbot assistant for Give Smile NGO (backed by Girish Group of Companies).

STRICT CONVERSATIONAL & RESPONSE RULES:
1. Speak naturally in a warm, empathetic, trustworthy human assistant tone.
2. DO NOT output raw textbook dumps or rigid markdown tables unless requested.
3. Keep responses concise, helpful, and engaging (2 to 4 sentences maximum for general queries).
4. Provide exact verified details whenever asked about donations, UPI ID, helpline numbers, registration numbers, or office addresses.

COMPLETE OFFICIAL KNOWLEDGE BASE OF GIVE SMILE NGO:

1. ORGANIZATIONAL IDENTITY & HISTORY:
- Full Name: Give Smile NGO (Give Smile Foundation).
- Tagline: "Girish’s Smile, Our Mission, Their Future."
- Established Date: 24 January 2024 by Founder & Director Mr. Dattatray Sodmise.
- Parent Organization: Girish Group of Companies (with over 30 years of trusted community presence in Maharashtra).
- Registration Number: AAETG6500DE20231 (Legally registered under the Societies & Trust Act).
- Branding: Official visual logo, letterhead, and donation receipt books established.

2. LOCATIONS & DIRECT CONTACTS:
- Headquarters (Baramati): Office No. 25, Baramati-Bhigwan Rd, Anand Nagar Colony, Baramati, Maharashtra 413102.
- Corporate Office (Pune/Wakad): Office No. 105, Pride Purple Square, Kalewadi Phata, Vishnu Dev Nagar, Wakad, Pimpri-Chinchwad, Maharashtra 411057.
- Phone Helpline & WhatsApp: 070835 09072 (+91 70835 09072).
- Official Email: contact@givesmilefoundation.com
- Instagram: @give_smile_ngo

3. MISSION, VISION & CORE VALUES:
- Mission: Empowering individuals and communities to move from dependence to self-reliance through education, skill development, healthcare, social support, and emergency crisis intervention.
- Vision: An inclusive and equitable society where every individual has the opportunity to learn, grow, and thrive with dignity, confidence, and a smile.
- Four Core Values: 1) Holistic Empowerment, 2) Inclusivity & Dignity, 3) Compassionate Well-being, 4) Generational Connection.

4. THREE KEY INTERCONNECTED CHALLENGES ADDRESSED:
- Girls' Education & Growth: Overcoming financial and infrastructural deficits through uniform distribution, dual desk-benches, digital literacy, and scholarships.
- Eldercare & Social Sanctuary: Providing free medical health checkup camps, blood pressure diagnostics, free prescription medicines, and companionship for senior citizens.
- Universal Mental Health Stigma: Offering open, stigma-free counseling, peer support clubs, and compassionate crisis intervention.

5. PREMIER ON-GROUND PROJECTS & ACHIEVEMENTS:
- Zilla Parishad (ZP) School Transformation Drive: Somthali ZP Primary School adoption in Baramati/Phaltan region.
- Key Impact Metrics: 500+ students empowered, 12+ classrooms renovated, 350+ dignity uniform kits distributed, 50+ dual sitting desks provided, 2.5kW rooftop solar power with smart digital displays installed.
- Historical Events & Drives:
  • 15 August 2026: Swatantryadin Independence Day Celebration & School Cultural Assembly.
  • 19 August 2026: Press & Media Outreach featured on Page 3 of Dainik Rokhathok, Dainik Janmat, Dainik Sthairya, and Samarth 24 Taas.
  • 26 August 2026: Somthali ZP School Student Games, Activity Day & Desk Handover.
  • 23 September 2026: Mid-Day Nutrition Meal Distribution & Free Senior Citizen Health Diagnostic Camp.

6. DONATIONS & FINANCIAL TRANSPARENCY:
- Accepts both One-Time and Recurring Donations.
- Official UPI ID: 7083509072@ibl
- Official Payee Name: Give Smile Foundation
- Receipts: Official donation receipts with registration details are issued for all contributions.

7. GETTING INVOLVED (VOLUNTEER, MEMBERSHIP, PARTNERSHIPS):
- Volunteer: Open website form for fundraising, on-ground event management, skills contribution, or community outreach.
- Membership: Structured official membership process with eligibility to participate in official NGO events.
- Partnerships: Open to corporate CSR, institutional, and organizational collaborations.
- Community Submissions: Anyone can report a local community need or propose a project directly via WhatsApp or website.`;

const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: "Welcome to Give Smile NGO! 👋 How can I help you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export default function AIChatbot({ theme = "dark", isOpen: externalIsOpen, onOpen: externalOnOpen, onClose: externalOnClose, onNavigate, onOpenDonate }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleOpen = (val) => {
    if (val) {
      if (externalOnOpen) externalOnOpen();
      setInternalIsOpen(true);
    } else {
      if (externalOnClose) externalOnClose();
      setInternalIsOpen(false);
    }
  };

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('give_smile_ai_messages_v2');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const isLight = theme === 'light';

  const chatbotRef = useRef(null);
  const triggerRef = useRef(null);
  const messagesListRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('give_smile_ai_messages_v2', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isLoading]);

  // Prevent background page scrolling whenever cursor is inside the chatbot window
  useEffect(() => {
    if (!isOpen || !chatbotRef.current) return;

    const modalEl = chatbotRef.current;

    const handleWheel = (e) => {
      e.stopPropagation();

      const messagesEl = messagesListRef.current;
      if (messagesEl && messagesEl.contains(e.target)) {
        const { scrollTop, scrollHeight, clientHeight } = messagesEl;
        const delta = e.deltaY;
        const isScrollingUp = delta < 0;

        if ((isScrollingUp && scrollTop <= 0) || (!isScrollingUp && scrollTop + clientHeight >= scrollHeight - 1)) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
    };

    modalEl.addEventListener('wheel', handleWheel, { passive: false });
    modalEl.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      modalEl.removeEventListener('wheel', handleWheel);
      modalEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  // Minimize chatbot automatically when user explicitly scrolls main webpage, presses back button, changes hash, ESC key, or clicks outside
  useEffect(() => {
    if (!isOpen) return;

    const initialScrollY = window.scrollY;

    const handleWindowScroll = () => {
      // If user scrolls the main webpage by more than 15px, automatically minimize
      if (Math.abs(window.scrollY - initialScrollY) > 15) {
        toggleOpen(false);
      }
    };

    const handleMinimize = () => {
      toggleOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        toggleOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        toggleOpen(false);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('popstate', handleMinimize);
    window.addEventListener('hashchange', handleMinimize);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('popstate', handleMinimize);
      window.removeEventListener('hashchange', handleMinimize);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (userTextToSend) => {
    const text = userTextToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userTextToSend) setInput("");
    setIsLoading(true);

    try {
      // Format messages history for Groq API
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-8).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: "user", content: text.trim() }
      ];

      const fetchGroqResponse = async (modelName) => {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: apiMessages,
            temperature: 0.5,
            max_tokens: 350
          })
        });
        return res;
      };

      let response = await fetchGroqResponse(GROQ_PRIMARY_MODEL);

      if (!response.ok) {
        console.warn(`Primary Groq model ${GROQ_PRIMARY_MODEL} returned ${response.status}. Trying fallback model ${GROQ_FALLBACK_MODEL}...`);
        response = await fetchGroqResponse(GROQ_FALLBACK_MODEL);
      }

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const botReplyText = data?.choices?.[0]?.message?.content || "I apologize, but I am currently unable to fetch a response. Please feel free to call our helpline at " + NGO_INFO.phone;

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Chatbot Error:", err);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I am experiencing a momentary connection issue. You can reach our team directly at **" + NGO_INFO.phone + "** or via email at **" + NGO_INFO.email + "**. How else can I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('give_smile_ai_messages');
  };

  const ACTION_BUTTON_MAP = {
    DONATE: {
      label: "❤️ Support & Donate Now",
      target: "donate",
      type: "navigate",
      style: "bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white font-extrabold shadow-md hover:scale-105 border border-red-400/40"
    },
    VOLUNTEER: {
      label: "🙋 Become a Volunteer",
      target: "volunteer",
      type: "navigate",
      style: "bg-amber-500 text-slate-950 font-black shadow-md hover:scale-105 border border-amber-300"
    },
    GALLERY: {
      label: "🖼️ View Media Gallery",
      target: "gallery",
      type: "navigate",
      style: "bg-emerald-600 text-white font-bold shadow-md hover:scale-105 border border-emerald-400/40"
    },
    PROJECTS: {
      label: "🏫 View ZP School Projects",
      target: "projects",
      type: "navigate",
      style: "bg-blue-600 text-white font-bold shadow-md hover:scale-105 border border-blue-400/40"
    },
    CAUSES: {
      label: "🎯 Explore Causes",
      target: "programs",
      type: "navigate",
      style: "bg-purple-600 text-white font-bold shadow-md hover:scale-105 border border-purple-400/40"
    },
    BLOGS: {
      label: "📰 Read Press & News",
      target: "blogs",
      type: "navigate",
      style: "bg-indigo-600 text-white font-bold shadow-md hover:scale-105 border border-indigo-400/40"
    },
    CONTACT: {
      label: "📞 Contact & Address Details",
      target: "contact",
      type: "navigate",
      style: "bg-slate-800 text-white font-bold shadow-md hover:scale-105 border border-slate-600"
    },
    WHATSAPP: {
      label: "💬 Chat on WhatsApp",
      target: "https://wa.me/917083509072",
      type: "external",
      style: "bg-emerald-500 text-slate-950 font-black shadow-md hover:scale-105 border border-emerald-300"
    }
  };

  const handleActionClick = (actionKey) => {
    const action = ACTION_BUTTON_MAP[actionKey];
    if (!action) return;

    if (action.type === 'external') {
      window.open(action.target, '_blank');
    } else if (action.target === 'donate') {
      if (onOpenDonate) {
        onOpenDonate();
      } else if (onNavigate) {
        onNavigate('donate');
      }
    } else if (onNavigate) {
      onNavigate(action.target);
    }
  };

  // Render markdown bold and linebreaks nicely with strict text-wrapping
  const formatText = (content) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      // Replace **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={lIdx}>
          {renderedParts}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const renderBotMessage = (text) => {
    // 1. Extract explicit [ACTION:KEY|LABEL] tags if present
    let cleanText = text;
    const actionsFound = [];

    const actionRegex = /\[ACTION:([A-Z_]+)(?:\|([^\]]+))?\]/g;
    let match;
    while ((match = actionRegex.exec(text)) !== null) {
      const key = match[1];
      const customLabel = match[2];
      if (ACTION_BUTTON_MAP[key]) {
        actionsFound.push({
          key,
          label: customLabel || ACTION_BUTTON_MAP[key].label
        });
      }
    }

    cleanText = cleanText.replace(actionRegex, '').trim();

    // 2. Intelligent keyword detection fallback if no explicit tags exist
    if (actionsFound.length === 0) {
      const lower = cleanText.toLowerCase();
      if (lower.includes('donate') || lower.includes('support') || lower.includes('contribution') || lower.includes('upi') || lower.includes('financial') || lower.includes('receipt') || lower.includes('give smile support')) {
        actionsFound.push({ key: 'DONATE', label: '❤️ Support & Donate Now' });
      }
      if (lower.includes('volunteer') || lower.includes('join') || lower.includes('fundraising') || lower.includes('skills')) {
        actionsFound.push({ key: 'VOLUNTEER', label: '🙋 Become a Volunteer' });
      }
      if (lower.includes('gallery') || lower.includes('photo') || lower.includes('video') || lower.includes('media') || lower.includes('august') || lower.includes('september')) {
        actionsFound.push({ key: 'GALLERY', label: '🖼️ View Media Gallery' });
      }
      if (lower.includes('project') || lower.includes('zp school') || lower.includes('somthali') || lower.includes('desk') || lower.includes('solar')) {
        actionsFound.push({ key: 'PROJECTS', label: '🏫 View ZP School Projects' });
      }
      if (lower.includes('cause') || lower.includes('eldercare') || lower.includes('mental health') || lower.includes('girl')) {
        actionsFound.push({ key: 'CAUSES', label: '🎯 Explore Causes' });
      }
      if (lower.includes('contact') || lower.includes('address') || lower.includes('baramati') || lower.includes('pune') || lower.includes('phone') || lower.includes('email')) {
        actionsFound.push({ key: 'CONTACT', label: '📞 Contact Details' });
      }
      if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('talk to team')) {
        actionsFound.push({ key: 'WHATSAPP', label: '💬 Chat on WhatsApp' });
      }
    }

    // Deduplicate action buttons by key
    const uniqueActions = Array.from(new Set(actionsFound.map(a => a.key)))
      .map(key => actionsFound.find(a => a.key === key));

    return (
      <div className="space-y-2.5 break-words [overflow-wrap:anywhere] whitespace-pre-wrap text-xs leading-relaxed">
        <div className="space-y-1 break-words [overflow-wrap:anywhere]">
          {formatText(cleanText)}
        </div>

        {/* Dynamic Interactive Action Buttons */}
        {uniqueActions.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-700/20">
            {uniqueActions.map(({ key, label }) => {
              const btnConfig = ACTION_BUTTON_MAP[key];
              if (!btnConfig) return null;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleActionClick(key)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${btnConfig.style}`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Living Chatbot Floating Motion CSS */}
      <style>{`
        @keyframes livingChatbotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .animate-living-chatbot {
          animation: livingChatbotFloat 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Floating Trigger Button at Bottom Right (Living Motion & Perfect Geometric Round Orb) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[999999] pointer-events-auto select-none block">
          <div className="animate-living-chatbot relative group">
            {/* Floating Tooltip Pill (Appears smoothly on hover on desktop) */}
            <div className="hidden sm:flex absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0a192f]/95 backdrop-blur-md text-amber-300 border border-amber-400/50 px-4 py-2 rounded-full text-xs font-extrabold shadow-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-x-1.5 transition-all duration-300 pointer-events-none items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Give Smile AI Assistant</span>
            </div>

            {/* Perfect 100% Round Circular Orb */}
            <button
              ref={triggerRef}
              onClick={() => toggleOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#0a192f] via-[#12233f] to-[#071325] text-white shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.55)] border-2 border-amber-400 hover:border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative cursor-pointer"
              title="Open Give Smile AI Assistant"
              aria-label="Give Smile AI Chatbot"
            >
              <div className="w-9.5 h-9.5 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0a192f] rounded-full flex items-center justify-center">
                  <Bot className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
              </div>

              {/* Pulsating Green Online Status Dot */}
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0a192f] animate-ping" />
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0a192f]" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating AI Chatbot Modal Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] w-[calc(100vw-2rem)] sm:w-96 max-w-lg h-[520px] max-h-[82vh] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 pointer-events-auto ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#0f1522] border-slate-700/80 text-slate-100 backdrop-blur-2xl'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#071325] via-[#0a192f] to-[#12233f] text-white border-b border-slate-800 flex items-center justify-between select-none shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0a192f] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold tracking-tight text-white">Give Smile AI</h3>
                  <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium">Official NGO Impact Advisor</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Banner */}
          <div className="px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-[10px] text-amber-600 dark:text-amber-400 font-semibold select-none shrink-0">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              Certified NGO Field Guide
            </span>
            <span className="text-slate-400 dark:text-slate-500">Powered by Groq LLM</span>
          </div>

          {/* Messages Thread Container */}
          <div
            ref={messagesListRef}
            className={`flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed ${
              isLight ? 'bg-slate-50' : 'bg-[#0a0d14]/60'
            }`}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm break-words [overflow-wrap:anywhere] whitespace-pre-wrap select-text ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-tr-none'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow'
                    : 'bg-[#161f30] border border-slate-800 text-slate-100 rounded-tl-none'
                }`}>
                  {msg.sender === 'user' ? (
                    <div className="space-y-1 break-words [overflow-wrap:anywhere]">
                      {formatText(msg.text)}
                    </div>
                  ) : (
                    renderBotMessage(msg.text)
                  )}
                  <div className={`text-[9px] mt-1.5 text-right font-medium opacity-60 ${
                    msg.sender === 'user' ? 'text-black' : isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-amber-400 animate-bounce" />
                </div>
                <div className={`px-3.5 py-2.5 rounded-2xl rounded-tl-none border flex items-center gap-1.5 ${
                  isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#161f30] border-slate-800 text-slate-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-semibold text-[11px]">Give Smile AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#071325] border-t border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ZP drive, programs, volunteering..."
                className={`flex-1 px-3.5 py-2 rounded-xl text-xs font-medium border outline-none transition-all ${
                  isLight
                    ? 'bg-slate-900 text-white placeholder-slate-400 border-slate-700 focus:border-amber-400'
                    : 'bg-[#0f172a] text-white placeholder-slate-500 border-slate-700 focus:border-amber-400'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 cursor-pointer shadow-md shrink-0"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
