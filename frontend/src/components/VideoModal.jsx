import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Volume2, VolumeX, Play, Film, CheckCircle2 } from 'lucide-react';

const DEFAULT_PLAYLIST = [
  {
    id: 'zp1',
    url: "/assets/videos/cartoon-intro.mp4",
    title: "1. On-Ground Field Documentary",
    subtitle: "Baramati Zilla Parishad Classroom Infrastructure & Desk Distribution Drive",
    poster: "/assets/videos/field-cover.png",
    category: "ON-GROUND FIELD DOCUMENTARY"
  },
  {
    id: 'cartoon',
    url: "/assets/videos/video-zp1.mp4",
    title: "2. Give Smile Animated Story 🎨",
    subtitle: "Official Give Smile Foundation Community Cartoon Animation",
    poster: "/assets/videos/cartoon-cover.png",
    category: "ANIMATED COMMUNITY STORY"
  }
];

export default function VideoModal({ isOpen, onClose, videoData }) {
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(DEFAULT_PLAYLIST[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync active video whenever modal opens or videoData prop changes
  useEffect(() => {
    if (isOpen) {
      if (videoData && videoData.url) {
        const found = DEFAULT_PLAYLIST.find((item) => item.url === videoData.url);
        setActiveVideo(found || {
          id: 'custom',
          url: videoData.url,
          title: videoData.title || "Zilla Parishad School Drive",
          subtitle: videoData.subtitle || "On-Ground ZP School Video Documentation",
          poster: videoData.poster || "/assets/hero-start.jpg",
          category: "FEATURED DOCUMENTARY"
        });
      } else {
        setActiveVideo(DEFAULT_PLAYLIST[0]);
      }
    }
  }, [isOpen, videoData]);

  // Lock body scroll & handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle Mobile Autoplay Restrictions & Sound Playback
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;

      const globalMuted = localStorage.getItem('portal_global_video_muted') === 'true';
      video.muted = globalMuted;
      setIsMuted(globalMuted);
      setShowSoundPrompt(false);

      if (globalMuted) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("Muted autoplay failed:", e));
      } else {
        video.volume = 1.0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsMuted(false);
              setShowSoundPrompt(false);
            })
            .catch((err) => {
              console.log("Mobile browser blocked unmuted autoplay:", err);
              video.muted = true;
              setIsMuted(true);
              setShowSoundPrompt(true);
              video.play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log("Muted autoplay failed:", e));
            });
        }
      }
    }
  }, [isOpen, activeVideo.url]);

  const handleEnableSound = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      video.volume = 1.0;
      localStorage.setItem('portal_global_video_muted', 'false');
      video.play()
        .then(() => {
          setIsMuted(false);
          setShowSoundPrompt(false);
          setIsPlaying(true);
        })
        .catch((e) => console.log("Sound enable failed:", e));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      localStorage.setItem('portal_global_video_muted', newMuted ? 'true' : 'false');
      if (!newMuted) {
        setShowSoundPrompt(false);
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto selection:bg-red-600 selection:text-white animate-in fade-in duration-300"
    >
      
      {/* UDYOGINI-STYLE CLEAN VIDEO SHOWCASE MODAL CONTAINER (NO GOLD BORDERS) */}
      <div className="relative w-full max-w-6xl rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col border border-slate-200 max-h-[92vh]">
        
        {/* TOP MODAL HEADER */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/90 backdrop-blur-md">
          <div className="space-y-1 min-w-0 pr-4">
            <div className="text-[11px] font-extrabold text-red-600 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-red-600" />
              <span>WATCH STORY • DOCUMENTARIES & ANIMATION</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight truncate">
              {activeVideo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium truncate hidden sm:block">
              {activeVideo.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 flex items-center justify-center cursor-pointer border border-slate-300 transition-all shrink-0 shadow-sm"
            title="Close Story (Esc)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* MAIN BODY: LEFT VIDEO PLAYER (65%) | RIGHT PLAYLIST SHOWCASE (35%) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto bg-slate-900">
          
          {/* LEFT COLUMN: HIGH-DEFINATION VIDEO PLAYER */}
          <div className="lg:col-span-8 bg-black flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
            <video
              ref={videoRef}
              key={activeVideo.url}
              controls
              autoPlay
              playsInline
              webkit-playsinline="true"
              preload="auto"
              controlsList="nodownload"
              src={activeVideo.url}
              poster={activeVideo.poster}
              onPlay={() => setIsPlaying(true)}
              onVolumeChange={() => {
                if (videoRef.current) {
                  const currentMuted = videoRef.current.muted || videoRef.current.volume === 0;
                  setIsMuted(currentMuted);
                  localStorage.setItem('portal_global_video_muted', currentMuted ? 'true' : 'false');
                }
              }}
              className="w-full h-full max-h-[72vh] object-contain shadow-2xl"
            >
              Your browser does not support playing HTML5 video.
            </video>

            {/* Mobile Sound Enable Touch Prompt Overlay (Only when browser blocked autoplay while sound was desired) */}
            {showSoundPrompt && (
              <div
                onClick={handleEnableSound}
                className="absolute inset-0 z-30 w-full h-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 cursor-pointer group transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-3 border-2 border-white animate-bounce">
                  <Volume2 className="w-7 h-7 fill-white" />
                </div>
                <div className="text-base sm:text-xl font-black tracking-tight text-white text-center">
                  Tap Anywhere to Enable Audio Sound 🔊
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1 text-center max-w-xs">
                  Mobile browsers require 1-tap interaction to un-mute video audio
                </p>
              </div>
            )}

            {/* Quick Unmute Sound Button Floating in Player Top Right */}
            <button
              onClick={toggleMute}
              className={`absolute top-4 right-4 z-40 px-3.5 py-2 rounded-xl text-xs font-extrabold backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-xl border ${
                isMuted
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-black/70 text-emerald-400 border-white/20 hover:bg-black/90'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Unmute Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT COLUMN: PLAYLIST SHOWCASE (UDYOGINI STYLE PLAYLIST) */}
          <div className="lg:col-span-4 p-4 sm:p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-start space-y-4 overflow-y-auto max-h-[480px]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                OUR DOCUMENTARIES
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                2 Videos Available
              </span>
            </div>

            {/* PLAYLIST CARDS */}
            <div className="space-y-3">
              {DEFAULT_PLAYLIST.map((item) => {
                const isActive = activeVideo.url === item.url;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveVideo(item)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border p-3 flex flex-col space-y-2.5 ${
                      isActive
                        ? 'border-2 border-red-600 bg-white shadow-xl ring-2 ring-red-600/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Image Box with Play Overlay */}
                    <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />

                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          isActive ? 'bg-red-600 text-white' : 'bg-white/90 text-slate-900 group-hover:bg-red-600 group-hover:text-white'
                        }`}>
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {isActive && (
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-red-600 text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Now Playing</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        {item.category}
                      </div>
                      <h4 className={`text-sm font-extrabold leading-snug ${isActive ? 'text-red-600' : 'text-slate-900 group-hover:text-red-600'} transition-colors`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM MODAL FOOTER */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="font-semibold text-slate-500 text-center sm:text-left">
            Give Smile NGO (Give Smile Foundation) • Reg. No. AAETG6500DE20231
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
}
