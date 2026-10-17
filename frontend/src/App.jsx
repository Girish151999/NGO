import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import AIChatbot from './components/AIChatbot';
import TributeIntroSequence from './components/TributeIntroSequence';
import Portal3DTransitionOverlay from './components/Portal3DTransitionOverlay';
import MediaProtectionGuard from './components/MediaProtectionGuard';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MissionVision from './pages/MissionVision';
import CausesPage from './pages/CausesPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import StoriesPage from './pages/StoriesPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import VolunteerPage from './pages/VolunteerPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import PartnersPage from './pages/PartnersPage';
import GirishMemorialPortal from './pages/GirishMemorialPortal';

const VALID_PAGES = [
  'home', 'about', 'mission', 'programs', 'projects',
  'blogs', 'stories', 'events', 'gallery', 'volunteer',
  'donate', 'contact', 'partners', 'girish-memorial'
];

export default function App() {
  const parseRoute = () => {
    let raw = window.location.hash.replace('#', '').trim();
    if (!raw) {
      raw = window.location.pathname.replace('/', '').trim();
    }

    if (raw.startsWith('girish-memorial')) {
      const parts = raw.split('/');
      const subTab = parts[1] || 'overview';
      const validSubTabs = ['overview', 'journey', 'enterprises', 'gallery'];
      const safeSubTab = validSubTabs.includes(subTab) ? subTab : 'overview';
      return { page: 'girish-memorial', subTab: safeSubTab };
    }

    if (raw && VALID_PAGES.includes(raw)) {
      return { page: raw, subTab: 'overview' };
    }

    return { page: 'home', subTab: 'overview' };
  };

  const initialRoute = parseRoute();
  const [activePage, setActivePage] = useState(initialRoute.page);
  const [memorialSubTab, setMemorialSubTab] = useState(initialRoute.subTab);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ngo_theme_preference');
    return savedTheme ? savedTheme : 'light';
  });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTributeOpen, setIsTributeOpen] = useState(true);
  const [isPortalTransitioning, setIsPortalTransitioning] = useState(false);
  const [activeVideoData, setActiveVideoData] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (pageId, pushToHistory = true) => {
    let targetPage = 'home';
    let targetSubTab = 'overview';

    if (pageId.startsWith('girish-memorial')) {
      targetPage = 'girish-memorial';
      const parts = pageId.split('/');
      if (parts[1]) {
        targetSubTab = parts[1];
      } else {
        targetSubTab = 'overview';
      }
    } else if (VALID_PAGES.includes(pageId)) {
      targetPage = pageId;
    }

    const hashString = targetPage === 'girish-memorial' 
      ? `#girish-memorial/${targetSubTab}` 
      : `#${targetPage}`;

    if (targetPage === 'girish-memorial' && activePage !== 'girish-memorial') {
      setIsPortalTransitioning(true);
      setTimeout(() => {
        setActivePage('girish-memorial');
        setMemorialSubTab(targetSubTab);
        if (pushToHistory) {
          window.history.pushState({ pageId: targetPage, subTab: targetSubTab }, '', hashString);
        }
        window.scrollTo({ top: 0 });
      }, 2000);

      setTimeout(() => {
        setIsPortalTransitioning(false);
      }, 2600);
      return;
    }

    setActivePage(targetPage);
    if (targetPage === 'girish-memorial') {
      setMemorialSubTab(targetSubTab);
    }
    if (pushToHistory) {
      const currentState = window.history.state;
      if (!currentState || currentState.pageId !== targetPage || currentState.subTab !== targetSubTab) {
        window.history.pushState({ pageId: targetPage, subTab: targetSubTab }, '', hashString);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = () => {
    handleNavigate('donate');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenVideo = (videoData) => {
    if (videoData && videoData.url) {
      setActiveVideoData(videoData);
    } else {
      setActiveVideoData({
        url: "/assets/videos/cartoon-intro.mp4",
        title: "Give Smile NGO Documentary",
        subtitle: "Baramati Zilla Parishad Infrastructure & Community Drive"
      });
    }
    setIsVideoOpen(true);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const { page, subTab } = parseRoute();
      setActivePage(page);
      if (page === 'girish-memorial') {
        setMemorialSubTab(subTab);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const initial = parseRoute();
    const initialHashString = initial.page === 'girish-memorial' 
      ? `#girish-memorial/${initial.subTab}` 
      : `#${initial.page}`;

    if (!window.history.state || !window.history.state.pageId) {
      window.history.replaceState({ pageId: initial.page, subTab: initial.subTab }, '', initialHashString);
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('ngo_theme_preference', theme);
    if (theme === 'light') {
      document.body.style.backgroundColor = '#eef2f6';
      document.body.style.color = '#0f172a';
    } else {
      document.body.style.backgroundColor = '#0a0d14';
      document.body.style.color = '#e2e8f0';
    }
  }, [theme]);

  return (
    <MediaProtectionGuard>
      <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#eef2f6] text-slate-900' : 'bg-[#0a0d14] text-slate-100'
    }`}>
      {activePage !== 'girish-memorial' && (
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenDonate={handleOpenDonate}
          onOpenChat={() => setIsChatOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      <main className={`flex-grow ${activePage !== 'home' && activePage !== 'girish-memorial' ? 'pt-16 sm:pt-18' : 'pt-0'}`}>
        {activePage === 'home' && (
          <Home
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={() => handleNavigate('volunteer')}
            onOpenVideo={handleOpenVideo}
            onNavigate={handleNavigate}
            onOpenTribute={() => setIsTributeOpen(true)}
            theme={theme}
            isTributeOpen={isTributeOpen}
          />
        )}

        {activePage === 'about' && (
          <AboutUs onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'mission' && (
          <MissionVision theme={theme} />
        )}

        {activePage === 'programs' && (
          <CausesPage onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'projects' && (
          <ProjectsPage
            onOpenDonate={handleOpenDonate}
            onOpenVideo={handleOpenVideo}
            theme={theme}
          />
        )}

        {activePage === 'blogs' && (
          <BlogsPage onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'stories' && (
          <StoriesPage onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'events' && (
          <EventsPage onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'gallery' && (
          <GalleryPage onOpenVideo={handleOpenVideo} theme={theme} />
        )}

        {activePage === 'volunteer' && (
          <VolunteerPage theme={theme} />
        )}

        {activePage === 'donate' && (
          <DonatePage onOpenDonate={handleOpenDonate} theme={theme} />
        )}

        {activePage === 'contact' && (
          <ContactPage theme={theme} />
        )}

        {activePage === 'partners' && (
          <PartnersPage
            theme={theme}
            onOpenDonate={handleOpenDonate}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'girish-memorial' && (
          <GirishMemorialPortal 
            onNavigate={handleNavigate}
            activeSubTab={memorialSubTab}
            onTabChange={(tab) => handleNavigate(`girish-memorial/${tab}`)}
          />
        )}
      </main>

      {activePage !== 'girish-memorial' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenDonate={handleOpenDonate}
          theme={theme}
          activePage={activePage}
        />
      )}

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoData={activeVideoData}
      />

      <TributeIntroSequence
        isOpen={isTributeOpen}
        onClose={() => setIsTributeOpen(false)}
        isLight={theme === 'light'}
      />

      <Portal3DTransitionOverlay isTransitioning={isPortalTransitioning} />

      {activePage !== 'girish-memorial' && (
        <AIChatbot
          theme={theme}
          isOpen={isChatOpen}
          onOpen={() => setIsChatOpen(true)}
          onClose={() => setIsChatOpen(false)}
          onNavigate={handleNavigate}
          onOpenDonate={handleOpenDonate}
          activePage={activePage}
        />
      )}

      {/* Floating Back to Top Button - Circle arrow by default, expands to reveal "Back to top" on hover */}
      <button
        onClick={scrollToTop}
        className={`group fixed bottom-6 left-6 z-40 p-2.5 rounded-full shadow-2xl transition-all duration-300 ease-in-out flex items-center cursor-pointer border select-none backdrop-blur-md ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-6 pointer-events-none scale-90'
        } ${
          theme === 'light'
            ? 'bg-white/95 text-slate-900 border-amber-400/60 hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-amber-500/20'
            : 'bg-[#0f172a]/95 text-slate-100 border-amber-500/40 hover:bg-amber-500 hover:text-black hover:border-amber-400 shadow-black/80'
        }`}
        title="Back to Top"
        aria-label="Back to top"
      >
        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-500 group-hover:bg-black/20 group-hover:text-black transition-colors flex items-center justify-center shrink-0">
          <ArrowUp className="w-4 h-4 stroke-[3]" />
        </div>
        
        {/* Revealed on hover only */}
        <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <span className="text-[11px] font-black tracking-wider uppercase pl-2 pr-2 block">
            Back to top
          </span>
        </div>
      </button>
    </div>
    </MediaProtectionGuard>
  );
}
