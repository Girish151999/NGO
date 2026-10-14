import React from 'react';

export default function IndexFinger3D({ size = 52, className = "" }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* 1. Live Click Shockwave Burst Ring emanating from the fingertip */}
      <span className="absolute -top-1 -left-1 w-10 h-10 rounded-full border-2 border-red-500/90 animate-click-burst-ring pointer-events-none" />
      <span className="absolute top-0 left-0 w-8 h-8 rounded-full bg-red-600/30 blur-md pointer-events-none animate-pulse" />

      {/* 2. Animated 3D Hand Cursor */}
      <div className="animate-vecteezy-click relative">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)] drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
        >
          <defs>
            {/* Dark Metallic 3D Body Gradient */}
            <linearGradient id="vecteezyHandBody" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="25%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="85%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* Dark Red Crimson Accent Gradient for 3D Palm & Joints */}
            <linearGradient id="vecteezyRedAccent" x1="20" y1="10" x2="60" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#991b1b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#450a0a" stopOpacity="0" />
            </linearGradient>

            {/* Specular White Gloss Top Highlight */}
            <linearGradient id="vecteezyGlossHighlight" x1="22" y1="8" x2="28" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Layer A: Outer Thick White Contour Outline & Black 3D Base */}
          <path
            d="
              M 25 8
              C 20.5 8 17 11.5 17 16
              L 17 48
              L 12.5 43.5
              C 10 41 6 41 3.5 43.5
              C 1 46 1 50 3.5 52.5
              L 23 72
              C 30 79 39 83 49 83
              L 65 83
              C 77 83 87 73 87 61
              L 87 42
              C 87 38.5 84 35.5 80.5 35.5
              C 79.5 35.5 78.5 35.8 77.5 36.3
              C 76.5 33.5 73.8 31.5 70.5 31.5
              C 69.5 31.5 68.5 31.8 67.5 32.3
              C 66.5 29.5 63.8 27.5 60.5 27.5
              C 59.5 27.5 58.5 27.8 57.5 28.3
              L 57.5 16
              C 57.5 11.5 54 8 49.5 8
              C 46 8 43 10.3 42 13.5
              C 41 10.3 38 8 34.5 8
              C 31 8 28 10.3 27 13.5
              C 26 10.3 23 8 25 8
              Z
            "
            fill="#000000"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Layer B: Ultra-Smooth Realist Hand Path */}
          {/* Index Finger Tip to Palm Base */}
          <path
            d="
              M 26 10
              C 22.5 10 19.5 13 19.5 16.5
              L 19.5 47.5
              L 14.5 42.5
              C 12.8 40.8 10 40.8 8.3 42.5
              C 6.6 44.2 6.6 47 8.3 48.7
              L 26.5 66.9
              C 32.5 72.9 40.5 76.5 49 76.5
              L 65 76.5
              C 74.4 76.5 82 68.9 82 59.5
              L 82 42.5
              C 82 40 80 38 77.5 38
              C 75.5 38 73.8 39.3 73.2 41.2
              L 72 45
              L 68.5 45
              L 68.5 37.5
              C 68.5 35 66.5 33 64 33
              C 62 33 60.3 34.3 59.7 36.2
              L 58.5 40
              L 55 40
              L 55 33.5
              C 55 31 53 29 50.5 29
              C 48.5 29 46.8 30.3 46.2 32.2
              L 45 36
              L 41.5 36
              L 41.5 16.5
              C 41.5 13 38.5 10 35 10
              C 32.5 10 30.3 11.4 29.2 13.5
              C 28.1 11.4 25.9 10 26 10
              Z
            "
            fill="url(#vecteezyHandBody)"
          />

          {/* Layer C: Red Dark Crimson Ambient Glow on Palm & Joint Boundaries */}
          <path
            d="
              M 26 10
              L 26 48
              C 32 60 40 70 52 74
              L 65 74
              C 72 74 78 68 78 60
              L 78 44
              C 74 44 70 42 66 40
              C 62 40 58 38 54 36
              L 42 36
              L 42 16
              Z
            "
            fill="url(#vecteezyRedAccent)"
          />

          {/* Layer D: 3D Glossy White Specular Edge Highlight along Index Finger */}
          <path
            d="M 21.5 16 L 21.5 46 L 16.5 41"
            stroke="url(#vecteezyGlossHighlight)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Layer E: Finger Joint Crease Lines for Authentic 3D Depth */}
          <path d="M 21.5 28 H 39.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 21.5 38 H 39.5" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 45.5 44 H 54.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 59 47 H 67.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

          {/* Layer F: Dark Crimson Fingertip Laser Touch Spot */}
          <circle cx="25.5" cy="15.5" r="4.5" fill="#dc2626" opacity="0.85" />
          <circle cx="25.5" cy="15.5" r="2.2" fill="#fef08a" />
        </svg>
      </div>
    </div>
  );
}
