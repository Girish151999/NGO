import React, { useState, useEffect } from 'react';

export default function EventCountdownTicker({ targetDate = "2026-10-15T00:00:00", theme = "dark", forceLive = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEventLive, setIsEventLive] = useState(forceLive);

  useEffect(() => {
    if (forceLive) {
      setIsEventLive(true);
      return;
    }

    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setIsEventLive(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setIsEventLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, forceLive]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds }
  ];

  if (isEventLive) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-1 w-full">
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          {[
            { label: 'DAYS', val: '00' },
            { label: 'HRS', val: '00' },
            { label: 'MINS', val: '00' },
            { label: 'SECS', val: '00' }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="w-13 sm:w-16 h-13 sm:h-16 rounded-2xl flex items-center justify-center border-2 border-emerald-400 bg-gradient-to-b from-emerald-950 via-[#06141d] to-[#030a0f] shadow-[0_0_20px_rgba(16,185,129,0.45)] relative overflow-hidden transition-all transform hover:scale-105">
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-xl pointer-events-none" />
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/30 pointer-events-none z-10" />
                  
                  <span className="relative z-20 text-xl sm:text-2xl lg:text-3xl font-black font-mono text-emerald-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                    {item.val}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-black tracking-widest mt-1.5 text-emerald-400 uppercase drop-shadow">
                  {item.label}
                </span>
              </div>
              {i < 3 && <span className="text-emerald-400 font-black text-xl sm:text-2xl pb-5 opacity-90 animate-pulse drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">:</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>EVENT IS HAPPENING LIVE TODAY!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-1">
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            {/* 3D Glassmorphic Dark Box with Vibrant Yellow-Gold Digits */}
            <div className="w-13 sm:w-16 h-13 sm:h-16 rounded-2xl flex items-center justify-center border-2 border-amber-400 bg-gradient-to-b from-[#2a1e12] via-[#161009] to-[#0a0704] shadow-[0_0_22px_rgba(245,158,11,0.45)] relative overflow-hidden transition-all transform hover:scale-105">
              {/* Top glossy glass sheen */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 via-white/10 to-transparent rounded-t-xl pointer-events-none" />
              
              {/* Center flip clock divider line */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-500/40 pointer-events-none z-10" />

              {/* Brilliant High-Contrast Yellow Gold Digits */}
              <span className="relative z-20 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-mono text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] select-none">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>

            {/* Label below */}
            <span className="text-[10px] sm:text-xs font-black tracking-widest mt-1.5 uppercase text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {unit.label}
            </span>
          </div>

          {/* Separator Colon */}
          {idx < units.length - 1 && (
            <div className="text-amber-400 font-black text-2xl sm:text-3xl pb-6 animate-pulse select-none drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
