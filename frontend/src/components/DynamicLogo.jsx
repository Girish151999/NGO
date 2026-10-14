import React from 'react';

export default function DynamicLogo({ size = "md", theme = "dark", onClick, className = "" }) {
  const isLight = theme === 'light';

  // Significantly larger, crystal-clear logo size mapping
  const sizeMap = {
    sm: {
      box: "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12",
      title: "text-xs xs:text-sm sm:text-base",
      badge: "text-[7.5px] xs:text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5",
      sub: "text-[7.5px] xs:text-[8px] sm:text-[9px]"
    },
    md: {
      box: "w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14",
      title: "text-xs xs:text-sm sm:text-xl",
      badge: "text-[7.5px] xs:text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5",
      sub: "text-[7.5px] xs:text-[8px] sm:text-[10px]"
    },
    lg: {
      box: "w-14 h-14 sm:w-20 sm:h-20",
      title: "text-xl sm:text-3xl",
      badge: "text-xs sm:text-sm px-2 sm:px-2.5 py-0.5",
      sub: "text-[9px] sm:text-xs"
    },
    xl: {
      box: "w-24 h-24 sm:w-36 sm:h-36",
      title: "text-3xl sm:text-5xl",
      badge: "text-xs sm:text-base px-2.5 sm:px-3 py-1",
      sub: "text-xs sm:text-sm"
    }
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-1.5 sm:gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* Clean, Non-Shining Emblem Container - Large, High Visibility */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className={`relative ${s.box} rounded-xl sm:rounded-2xl bg-white border ${
          isLight ? 'border-slate-300 shadow-sm' : 'border-slate-600 shadow-md'
        } p-0.5 sm:p-1 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
          <img
            src="/assets/logo.jpg"
            alt="Give Smile NGO Emblem Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className={`font-black tracking-tight ${s.title} ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            GIVE SMILE
          </span>
          <span className={`rounded-full font-extrabold tracking-wider ${
            isLight
              ? 'bg-slate-100 text-slate-800 border border-slate-300'
              : 'bg-slate-800 text-amber-400 border border-slate-700'
          } ${s.badge}`}>
            NGO
          </span>
        </div>
        <div className={`uppercase font-extrabold tracking-widest ${s.sub} ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        } whitespace-nowrap`}>
          Girish Group Foundation
        </div>
      </div>
    </div>
  );
}
