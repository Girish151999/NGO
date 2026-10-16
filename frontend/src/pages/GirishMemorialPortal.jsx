import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Heart, Award, GraduationCap, Briefcase, Globe, Cpu, Users,
  ChevronLeft, ChevronRight, ChevronDown, X, Maximize2, Quote, Sparkles,
  Building2, CheckCircle2, ArrowRight, Calendar, MapPin, Layers, Compass, BookOpen, Menu, ExternalLink, Film,
  Sprout, Leaf, Sun, Moon, Linkedin
} from 'lucide-react';

import { CATEGORIZED_MEMORIAL_PHOTOS } from '../data/girishMemorialData';
import Cinematic3DScrollPortal from '../components/Cinematic3DScrollPortal';
import CinematicSplitStoryPage from '../components/CinematicSplitStoryPage';
import CinematicFullPageDeck from '../components/CinematicFullPageDeck';

const PORTFOLIO_NAV_TABS = [
  { id: 'overview', label: "GIRISH SODMISE'S PORTFOLIO" },
  { id: 'journey', label: 'LIFE JOURNEY' },
  { id: 'enterprises', label: 'GIRISH GROUP OF COMPANIES' },
  { id: 'gallery', label: 'PHOTO ARCHIVES' }
];

const CAMPUS_SUB_CATEGORIES = [
  { 
    id: 'baramati', 
    name: '1. College of Agriculture & Allied Sciences, Baramati', 
    shortName: '1. Agriculture College, Baramati',
    count: 6 
  },
  { 
    id: 'dattakala', 
    name: '2. Dattakala Shikshan Sanstha', 
    shortName: '2. Dattakala Sanstha',
    count: 5 
  },
  { 
    id: 'iiebm', 
    name: '3. IIEBM Campus Placement Drive', 
    shortName: '3. IIEBM Placement',
    count: 5 
  },
  { 
    id: 'tuljaram', 
    name: '4. Tuljaram Chaturchand College', 
    shortName: '4. TC College, Baramati',
    count: 6 
  },
  { 
    id: 'vidya', 
    name: '5. Vidya Pratishthan Campus Drive', 
    shortName: '5. Vidya Pratishthan',
    count: 6 
  },
  { 
    id: 'all', 
    name: 'All 5 Campus Institutes Combined', 
    shortName: 'All 5 Institutes Combined',
    count: 28 
  }
];

const PHOTO_CATEGORIES = [
  { id: 'childhood', name: '1. Childhood Photos', count: 5, icon: Flame, desc: 'Early childhood, family roots in Phaltan & formative years' },
  { id: 'school', name: '2. School Photos', count: 8, icon: GraduationCap, desc: 'New Era High School Panchgani & school days visual archives' },
  { id: 'vit_pune', name: '3. VIT Pune', count: 6, icon: GraduationCap, desc: 'Vishwakarma Institute of Technology Pune academic & exchange visual archives' },
  { id: 'corporate', name: '4. TIAA Photos & Executive Leadership', count: 9, icon: Building2, desc: 'TIAA corporate leadership, executive portraits & 60-member team stewardship' },
  { id: 'natcon', name: "5. NATCON'23", count: 5, icon: Award, desc: 'National convention & industry leadership visual archives' },
  { id: 'job_fair', name: '6. Job Fair_24 Photos', count: 8, icon: Briefcase, desc: 'Mass employment drives, youth hiring initiatives & career expos' },
  { id: 'coaltrans', name: '7. Coaltrans Asia_24', count: 8, icon: Award, desc: 'Keynote speeches & global energy trade leadership at Coaltrans Asia 2024' },
  { id: 'dubai', name: '8. Dubai_26', count: 8, icon: Globe, desc: 'GILS Global LLC UAE operations, overseas staffing & international summits' },
  { id: 'campus', name: '9. Campus Drives', count: 28, icon: GraduationCap, desc: 'Statewide campus recruitment drives across 5 engineering & agriculture institutes' },
  { id: 'sept26', name: '10. 26 Sept Drive', count: 7, icon: Users, desc: 'Give Smile NGO community outreach & social empowerment drive' }
];

const HERO_COOL_IMAGES = [
  {
    id: 'hero-1',
    src: '/assets/girish_memorial/studio_executive_portrait.png',
    title: 'Visionary Leader Studio Executive Portrait',
    category: 'Executive Leadership',
    desc: 'Studio executive portrait capturing the sharp determination, foresight, and passion of Girish Sir.'
  },
  {
    id: 'hero-2',
    src: '/assets/girish_memorial/black_suit_portrait.jpg',
    title: 'Visionary Tech Leader Executive Portrait',
    category: 'Executive Leadership',
    desc: 'Executive portrait capturing the sharp determination and leadership of Girish Sir.'
  },
  {
    id: 'hero-3',
    src: '/assets/girish_memorial/girish_mg_car_portrait.jpg',
    title: 'Visionary Entrepreneur & Executive Portrait',
    category: 'Executive Leadership',
    desc: 'Executive portrait of Girish Sir representing entrepreneurial excellence, leadership, and vision.'
  },
  {
    id: 'hero-4',
    src: '/assets/girish_memorial/girish_executive_armchair.jpg',
    title: 'Global Tech Leader & Executive Architect',
    category: 'Executive Leadership',
    desc: 'From leading 60 professionals at age 22 at TIAA to founding Gsinfotechvis & Talentic360.AI.'
  }
];
const LIFE_TIMELINE_STORY = [
  {
    year: '1999',
      badge: '15 March 1999',
      title: 'I. The Little Years',
      subtitle: 'Where his beautiful story began.',
      desc: (
        <>
          On <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">15 March 1999 in Phaltan, Maharashtra</strong>, Girish was born into a family rooted in entrepreneurship, hard work, and strong values. These early influences would later shape the leader, innovator, and visionary he became.
        </>
      ),
      photos: [
        { src: '/assets/girish_memorial/childhood/3.jpg', title: 'A Winner Even Then', desc: 'A little boy, a proud moment, the first of many dreams.', objectPos: 'object-top' },
        { src: '/assets/girish_memorial/childhood/4.jpg', title: 'That Million-Dollar Smile', desc: 'The kind of smile that made everything brighter.', objectPos: 'object-top' },
        { src: '/assets/girish_memorial/childhood/5.jpg', title: 'Born to Be Fearless', desc: 'A tiny adventurer with a world of possibilities ahead.', objectPos: 'object-top' }
      ]
  },
  {
    year: '2007 - 2017',
    badge: 'Formative Schooling Years',
    title: 'The Foundation Years',
    subtitle: 'Pinewood International & New Era High School, Panchgani',
    desc: (
      <>
        Girish began his educational journey at <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Pinewood International School, Panchgani</strong>, where he completed his preschool and Grade 1. He later joined <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">New Era High School, Panchgani</strong> where he continued his education from Grade 2 through Grade 12, spending the majority of his formative years developing discipline and consistency.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/school/1.png', title: 'New Era High School Panchgani Academic Landmark', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/school/2.jpg', title: 'Singapore Student Academic Exchange Programme', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/school/3.png', title: 'Formative Leadership & School Archives', objectPos: 'object-center' }
    ]
  },
  {
    year: '2017 - 2021',
    badge: 'B.Tech Engineering',
    title: 'Engineering the Future',
    subtitle: 'Vishwakarma Institute of Technology (VIT), Pune',
    desc: (
      <>
        Pursuing his <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Bachelor of Technology from Vishwakarma Institute of Technology Pune</strong>, Girish immersed himself in technology, problem-solving, and innovation. While many students focused solely on academics, he was already envisioning how technology could be used to solve real-world challenges and create opportunities for others.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/vit_pune/1.png', title: 'VIT Pune Engineering Innovation Landmark' },
      { src: '/assets/girish_memorial/vit_pune/2.png', title: 'B.Tech Classroom & Student Engineering Group' },
      { src: '/assets/girish_memorial/vit_pune/3.jpg', title: 'Academic Excellence & Mentorship Landmark' }
    ]
  },
  {
    year: '2021 - 2023',
    badge: 'Age 22 Corporate Leader',
    title: 'The Young Leader',
    subtitle: 'TIAA Corporate Stewardship (60-Member Team)',
    desc: (
      <>
        Breaking barriers from the very beginning, Girish became that student from his college placement batch to secure an opportunity with <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">TIAA as a Technology Trainee</strong>. After a year he was promoted to <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Analyst</strong>. Within a remarkably short span, he rose to become one of the youngest team leaders, managing a team of over <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">60 experienced professionals</strong>. It was an achievement he carried with immense pride and a testament to the trust his leadership inspired at such a young age.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/corporate/1.jpg', title: 'TIAA 60-Member Team Leadership Recognition', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/corporate/tiaa_team_wetnjoy.jpg', title: 'Youngest Team Leader Corporate Stewardship', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/corporate/3.jpg', title: 'Corporate Stewardship Landmark', objectPos: 'object-center' }
    ]
  },
  {
    year: '2023',
    badge: 'Age 24 Entrepreneurial Leap',
    title: 'The Leap of Faith',
    subtitle: 'Founding Gsinfotechvis Pvt Ltd (2021)',
    desc: (
      <>
        At just <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">24 years old</strong>, Girish made a decision that many only dream of making — <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">he walked away from the security of a successful corporate career</strong> to build something of his own. Guided by a vision to provide innovative and dependable technology solutions, he founded <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Gsinfotechvis Pvt Ltd</strong>, marking the beginning of an entrepreneurial journey that would soon extend far beyond IT services.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/girish_office_desk.jpg', title: 'Founding Gsinfotechvis Headquarters Office', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/girish_founding_leadership_desk.jpg', title: 'Founding Executive Leadership & Mentorship', objectPos: 'object-[center_15%]' },
      { src: '/assets/girish_memorial/girish_mg_car_portrait.jpg', title: 'Founding Gsinfotechvis Executive Portrait', objectPos: 'object-[center_35%]' }
    ]
  },
  {
    year: '2024',
    badge: 'International Keynote & Summits',
    title: 'Thinking Bigger Than Technology',
    subtitle: 'Coaltrans Asia 2024 Conference (Indonesia)',
    desc: (
      <>
        What began as an IT venture quickly evolved into something much larger. Girish expanded Gsinfotechvis into a broader business ecosystem, introducing new service verticals and transforming the company into an IT-enabled enterprise. His vision extended beyond borders as he represented the organization at the prestigious <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Coaltrans Asia Conference 2024 in Indonesia</strong>, forging international relationships and exploring opportunities on a global stage.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/coaltrans/1.jpg', title: 'Addressing Energy Sector International Delegates', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/coaltrans/2.jpg', title: 'Global Energy Trade & Manpower Strategy', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/coaltrans/3.jpg', title: 'Coaltrans Asia Keynote & Delegation', objectPos: 'object-center' }
    ]
  },
  {
    year: '2025',
    badge: 'US Expansion & AI HRMS',
    title: 'Building Beyond Boundaries',
    subtitle: 'Gsinfotechvis Global LLC (USA) & Talentic360.AI',
    desc: (
      <>
        With an eye on global expansion, Girish established <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Gsinfotechvis Global LLC in Wyoming, USA</strong>, extending the company's reach into international markets and launching specialized <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">US IT Recruitment Services</strong>.<br /><br />The same year, Girish founded <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Talentic360.AI LLP</strong>. More than just an EdTech platform, it was a mission to bridge the gap between education, employability, and opportunity. Designed to support students, institutions, and professionals, the platform brought together higher education partnerships, apprenticeships, certifications, skill enhancement, vocational learning, corporate training, government initiatives, volunteering opportunities, and remote learning pathways under one ecosystem.
      </>
    ),
    photos: [
      {
        src: '/assets/girish_memorial/gsinfotechvis_global_wyoming_filing.png',
        title: 'Gsinfotechvis Global LLC Wyoming (USA) Incorporation Filing',
        desc: 'State of Wyoming Secretary of State Business Division official Certificate & Filing Information.',
        objectFit: 'object-cover',
        objectPos: 'object-top'
      },
      {
        src: '/assets/girish_memorial/talentic360_black_logo.png',
        title: 'Talentic360.AI Official Platform Identity',
        desc: 'AI-driven educational, talent, and workforce development platform founded by Girish Sir.',
        objectFit: 'object-contain',
        objectPos: 'object-center'
      }
    ]
  },
  {
    year: '2026',
    badge: 'Overseas Manpower & Dubai UAE',
    title: 'Creating Global Pathways',
    subtitle: 'GILS Global LLC (Dubai, UAE) Expansion',
    desc: (
      <>
        Never one to settle for limitations, Girish expanded the legacy of <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">GILS Pvt. Ltd.</strong> beyond domestic workforce solutions and into <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Overseas Manpower Deployment</strong>. Under his leadership, operations expanded across the <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Middle East, Germany, Russia, and Europe</strong>, opening new opportunities for skilled professionals seeking careers abroad.<br /><br />To strengthen this vision, he established <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">GILS Global LLC in Dubai</strong>, creating an international gateway for overseas workforce solutions. Personally visiting <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Dubai</strong> to build partnerships and drive expansion, he continued pursuing a future where talent could connect with opportunities across borders.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/dubai/1.jpg', title: 'GILS Global LLC Dubai UAE Executive Summit' },
      { src: '/assets/girish_memorial/dubai/2.jpg', title: 'Middle East Overseas Staffing Delegation' },
      { src: '/assets/girish_memorial/dubai/3.jpg', title: 'Dubai Enterprise Leadership Conference' }
    ]
  },
  {
    year: '2026',
    badge: 'Philanthropic Legacy',
    title: 'A Vision Beyond Business',
    subtitle: 'Give Smile NGO Initiative',
    desc: (
      <>
        By the age of 27, Girish was not only building companies but also envisioning ways to give back to society. Believing that success carries a responsibility toward the community, he conceptualized <strong className="font-extrabold text-[#0a192f] dark:text-amber-400">Give Smile NGO</strong> — an initiative dedicated to creating opportunities through education, skill development, community welfare, and social impact. It was a reflection of the values that had guided him throughout his journey: growth, service, and the belief that every success story should create opportunities for others.
      </>
    ),
    photos: [
      { src: '/assets/girish_memorial/sept26/photo_1.jpg', title: 'Give Smile NGO Community Outreach & Field Drive', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/sept26/photo_2.jpg', title: 'Baramati & Rural Maharashtra Empowerment Drive', objectPos: 'object-center' },
      { src: '/assets/girish_memorial/sept26/photo_3.jpg', title: 'ZP School Infrastructure & Desk Upliftment', objectPos: 'object-center' }
    ]
  }
];

const CHAPTERS = LIFE_TIMELINE_STORY;

const ENTERPRISES = [
  {
    id: 'gils_1998',
    name: '1. Girish Industrial Labour Services (GILS)',
    tag: 'Industrial Labor & Workforce Support',
    location: 'Maharashtra, India',
    est: 'Est. 1998',
    desc: 'The foundational enterprise of Girish Group, established in 1998 with 20 blue-collar workers. Provided industrial labor support to manufacturing units and factories for shop-floor operations, material handling, and daily manpower.',
    metrics: ['20+ Blue-Collar Foundations', 'Industrial Labor Support', 'Shop-Floor Operations'],
    isNGO: false
  },
  {
    id: 'gils_pvt_ltd',
    name: '2. GILS PVT LTD',
    tag: 'Manpower Supply & Specialized Overseas Recruitment',
    location: 'Maharashtra, India • Global',
    est: 'Est. 2006',
    website: 'https://www.gilspvtltd.com',
    desc: 'Established force in manpower supply services with industry accolades, expanding offerings to include specialized overseas recruitment services and international workforce deployment.',
    metrics: ['Specialized Overseas Recruitment', 'Manpower Supply Services', 'Industry Accolades'],
    isNGO: false
  },
  {
    id: 'techvis',
    name: '3. TECHVIS',
    tag: 'Facility Services & Industrial Deep Cleaning',
    location: 'Maharashtra, India',
    est: 'Est. 2010',
    desc: 'Trailblazer entity in the facility management sector, delivering comprehensive manpower supply alongside specialized industrial deep cleaning services.',
    metrics: ['Facility Sector Trailblazer', 'Industrial Deep Cleaning', 'Specialized Manpower'],
    isNGO: false
  },
  {
    id: 'girish_polychem',
    name: '4. Girish Polychem Industries',
    tag: 'Manufacturing — Mulching & Industrial Films',
    location: 'Maharashtra, India',
    est: 'Est. 2012',
    desc: 'Flagship manufacturing company with over a decade of production excellence, producing high-grade agricultural mulching films and industrial packaging films.',
    metrics: ['Mulching & Industrial Films', '10+ Years Manufacturing', 'High-Grade Polychem'],
    isNGO: false
  },
  {
    id: 'gsinfotechvis_pvt',
    name: '5. Gsinfotechvis Pvt Ltd',
    tag: 'IT Services, Digital Marketing & Coal Trading',
    location: 'Pune, India',
    est: 'Est. 2021',
    website: 'https://www.gsinfotechvis.com',
    desc: 'Founded by Girish Sir at age 24 in the IT & services sector. Delivers enterprise IT solutions, digital marketing growth services, and coal import & export trading operations.',
    metrics: ['Enterprise IT Solutions', 'Coal Import/Export Trading', 'Digital Marketing Vision'],
    isNGO: false
  },
  {
    id: 'gsinfotechvis_global_llc',
    name: '6. Gsinfotechvis Global LLC',
    tag: 'USA Arm for Global IT Recruitment & Tech',
    location: 'Wyoming, USA',
    est: 'Est. 2025',
      website: 'https://www.gsinfotechvis.com',
    desc: 'The US arm of Gsinfotechvis Pvt Ltd established to strengthen the group’s international presence, delivering specialized IT staffing and technology-driven workforce solutions.',
    metrics: ['USA Headquarters', 'Global IT Staffing', 'Scalable Tech Models'],
    isNGO: false
  },
  {
    id: 'gils_global_llc',
    name: '7. GILS Global LLC (Dubai, UAE & Europe)',
    tag: 'Middle East and Europe Overseas Staffing',
    location: 'Dubai, UAE • Middle East & Europe',
    est: 'Est. 2025',
      website: 'https://www.gilspvtltd.com',
    desc: 'Established to expand group workforce operations into Middle East and Europe markets, specializing in global manpower solutions, overseas recruitment, and cross-border staffing.',
    metrics: ['Dubai UAE & Europe Headquarters', 'Middle East & Europe Deployment', 'Cross-Border Operations'],
    isNGO: false
  },
  {
    id: 'talentic360ai_llp',
    name: '8. Talentic360.AI LLP',
    tag: 'AI-Powered Education & Workforce Development',
    location: 'Global AI Skilling Entity',
    est: 'Est. 2025',
    website: 'https://www.talentic360ai.in',
    desc: 'An AI-powered platform focused on education, skills, and career growth. Built to connect learning with real-world opportunities.',
    metrics: ['AI EdTech Innovation', 'Youth Skill Platform', 'Career Growth Solutions'],
    isNGO: false
  },
  {
    id: 'givesmile_foundation',
    name: '9. GIVE SMILE FOUNDATION (NGO)',
    tag: 'Non-Profit Philanthropic & CSR Social Upliftment Arm',
    location: 'Baramati & Rural Maharashtra, India',
    est: 'Est. 2024',
    desc: 'The 9th entity and esteemed NGO of Girish Group, envisioned by Girish Sir for social impact across children education, 10,480+ ZP school desks, senior healthcare, and women empowerment.',
    metrics: ['10,480+ ZP School Desks', 'Child Healthcare & Meals', 'Women Empowerment'],
    isNGO: true
  }
];



export default function GirishMemorialPortal({ onNavigate, activeSubTab = 'overview', onTabChange }) {
  const [internalTab, setInternalTab] = useState(activeSubTab);
  const [selectedCategory, setSelectedCategory] = useState('dubai');
  const [selectedCampusFolder, setSelectedCampusFolder] = useState('baramati');
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxNotice, setLightboxNotice] = useState(null);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const bioTrackRef = useRef(null);

  const scrollBioTrack = (direction) => {
    if (bioTrackRef.current) {
      bioTrackRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };
  const [is3DScrollPortalOpen, setIs3DScrollPortalOpen] = useState(false);
  const [isSplitStoryOpen, setIsSplitStoryOpen] = useState(false);
  const [isFullDeckOpen, setIsFullDeckOpen] = useState(false);
  const [activeMobileChapter, setActiveMobileChapter] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('girish_portal_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('girish_portal_theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  const desktopTimelineRef = useRef(null);
  const [timelineScrollProgress, setTimelineScrollProgress] = useState(0);
  const [revealedChapters, setRevealedChapters] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!desktopTimelineRef.current) return;
      const rect = desktopTimelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const startPos = windowHeight * 0.75;
      const currentScroll = startPos - rect.top;
      
      let progress = (currentScroll / totalHeight) * 100;
      progress = Math.max(0, Math.min(100, progress));
      setTimelineScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [internalTab]);

  useEffect(() => {
    if (internalTab !== 'overview' && internalTab !== 'journey') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute('data-chapter-idx');
            if (idx !== null) {
              setRevealedChapters((prev) => ({ ...prev, [idx]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const chapterEls = document.querySelectorAll('.timeline-reveal-card');
    chapterEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [internalTab]);

  useEffect(() => {
    if (activeSubTab) {
      setInternalTab(activeSubTab);
      if (activeSubTab === 'gallery') {
        setIsFullDeckOpen(true);
      } else {
        setIsFullDeckOpen(false);
      }
    }
  }, [activeSubTab]);

  const switchTab = (tabId) => {
    setInternalTab(tabId);
    if (tabId === 'gallery') {
      setIsFullDeckOpen(true);
    }
    if (onTabChange) {
      onTabChange(tabId);
    } else if (onNavigate) {
      onNavigate(`girish-memorial/${tabId}`);
    }
  };

  // Top 8 Featured Photos for Overview Home Page Showcase
  const featuredHomePhotos = [
    CATEGORIZED_MEMORIAL_PHOTOS[2],  // #1: Singapore International Academic Exchange
    CATEGORIZED_MEMORIAL_PHOTOS[9],  // #2: Corporate Leadership
    CATEGORIZED_MEMORIAL_PHOTOS[0],  // #3: NEW - Girish Sir with BMW Executive Portrait
    CATEGORIZED_MEMORIAL_PHOTOS[1],  // #4: NEW - Girish Sir Skyline Executive Armchair
    CATEGORIZED_MEMORIAL_PHOTOS[17], // #5: Coaltrans Asia Landmark
    CATEGORIZED_MEMORIAL_PHOTOS[23], // #6: Youth Skill Development
    CATEGORIZED_MEMORIAL_PHOTOS[28], // #7: Campus Recruitment Landmark
    CATEGORIZED_MEMORIAL_PHOTOS[29]  // #8: Official Executive Portrait
  ].filter(Boolean);

  // Auto rotate hero photo spotlight every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroPhotoIndex((prev) => (prev + 1) % HERO_COOL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Active photo list for Lightbox navigation based strictly on selected photo's category, campus folder, or chapter section photos
  let currentLightboxPhotos = [];

  if (selectedPhoto?.chapterPhotos && selectedPhoto.chapterPhotos.length > 0) {
    // Strictly use ONLY the photos of this specific section/chapter!
    currentLightboxPhotos = selectedPhoto.chapterPhotos.map((cp, idx) => {
      let existing = CATEGORIZED_MEMORIAL_PHOTOS.find(p => p.src === cp.src);
      if (!existing) {
        const fileName = cp.src.split('/').pop().toLowerCase();
        existing = CATEGORIZED_MEMORIAL_PHOTOS.find(p => p.src.split('/').pop().toLowerCase() === fileName);
      }
      if (existing) {
        return {
          ...existing,
          title: cp.title || existing.title,
            desc: cp.desc || existing.desc,
          categoryLabel: selectedPhoto.categoryLabel || existing.categoryLabel,
          year: selectedPhoto.year || existing.year,
          chapterPhotos: selectedPhoto.chapterPhotos
        };
      }
      return {
        id: 99100 + idx,
        src: cp.src,
        title: cp.title || 'Landmark Visual Moment',
        categoryLabel: selectedPhoto.categoryLabel || 'Life Chronicle',
        year: selectedPhoto.year || '2024',
        desc: cp.desc || cp.title || 'Landmark visual memory.',
        category: 'milestone',
        chapterPhotos: selectedPhoto.chapterPhotos
      };
    });
  } else {
    const activeCategoryForLightbox = selectedPhoto?.category;
    const activeCampusFolderForLightbox = selectedPhoto?.campusFolderId || selectedCampusFolder;

    let lightboxPhotos = CATEGORIZED_MEMORIAL_PHOTOS;
    if (activeCategoryForLightbox && activeCategoryForLightbox !== 'milestone') {
      const filtered = CATEGORIZED_MEMORIAL_PHOTOS.filter(p => {
        if (p.category !== activeCategoryForLightbox) return false;
        if (activeCategoryForLightbox === 'campus' && activeCampusFolderForLightbox && activeCampusFolderForLightbox !== 'all' && selectedPhoto?.campusFolderId) {
          return p.campusFolderId === activeCampusFolderForLightbox;
        }
        return true;
      });
      if (filtered.length > 0) {
        lightboxPhotos = filtered;
      }
    }

    currentLightboxPhotos = [...lightboxPhotos];
    if (selectedPhoto) {
      const exists = currentLightboxPhotos.some(p => p.id === selectedPhoto.id || p.src === selectedPhoto.src);
      if (!exists) {
        currentLightboxPhotos = [selectedPhoto, ...currentLightboxPhotos];
      }
    }
  }

  // Auto dismiss lightbox notice toast after 2.5 seconds
  useEffect(() => {
    if (!lightboxNotice) return;
    const timer = setTimeout(() => {
      setLightboxNotice(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [lightboxNotice]);

  const safeLightboxIndex = currentLightboxPhotos.findIndex(
    p => p.id === selectedPhoto?.id || p.src === selectedPhoto?.src
  );
  const currentLightboxIdx = safeLightboxIndex >= 0 ? safeLightboxIndex : 0;
  const isFirstLightboxPhoto = currentLightboxIdx === 0;
  const isLastLightboxPhoto = currentLightboxIdx === currentLightboxPhotos.length - 1;

  const handlePrevPhoto = () => {
    if (currentLightboxIdx > 0) {
      setSelectedPhoto(currentLightboxPhotos[currentLightboxIdx - 1]);
      setLightboxNotice(null);
    } else {
      setLightboxNotice(`Beginning of Section • Photo 1 of ${currentLightboxPhotos.length}`);
    }
  };

  const handleNextPhoto = () => {
    if (currentLightboxIdx < currentLightboxPhotos.length - 1) {
      setSelectedPhoto(currentLightboxPhotos[currentLightboxIdx + 1]);
      setLightboxNotice(null);
    } else {
      setLightboxNotice(`End of Section Archives • Unable to move forward (${currentLightboxPhotos.length} of ${currentLightboxPhotos.length} viewed)`);
    }
  };

  // Keyboard navigation listener for Photo Lightbox (Esc, Left Arrow, Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        setLightboxNotice(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentLightboxIdx, currentLightboxPhotos]);

  // Filter photos for Gallery tab (strictly section-wise & subfolder display)
  const filteredPhotos = (CATEGORIZED_MEMORIAL_PHOTOS || []).filter(p => {
    if (!p) return false;
    if (p.category !== selectedCategory) return false;
    if (selectedCategory === 'campus' && selectedCampusFolder !== 'all') {
      return p.campusFolderId === selectedCampusFolder;
    }
    return true;
  });

  const getCategoryCount = (catId) => {
    return (CATEGORIZED_MEMORIAL_PHOTOS || []).filter(p => p && p.category === catId).length;
  };

  const getCampusSubCount = (subId) => {
    if (subId === 'all') {
      return (CATEGORIZED_MEMORIAL_PHOTOS || []).filter(p => p && p.category === 'campus').length;
    }
    return (CATEGORIZED_MEMORIAL_PHOTOS || []).filter(p => p && p.category === 'campus' && p.campusFolderId === subId).length;
  };

  const activeCategoryObj = (PHOTO_CATEGORIES || []).find(c => c && c.id === selectedCategory) || {
    name: 'Photo Archives Vault',
    desc: 'Curated visual archives'
  };

  const handlePhotoClick = (photoSrc, title, categoryLabel, year, chapterPhotos = null) => {
    // 1. Try exact src match
    let existing = CATEGORIZED_MEMORIAL_PHOTOS.find(p => p.src === photoSrc);
    // 2. Try filename basename match fallback
    if (!existing) {
      const fileName = photoSrc.split('/').pop().toLowerCase();
      existing = CATEGORIZED_MEMORIAL_PHOTOS.find(p => p.src.split('/').pop().toLowerCase() === fileName);
    }

    if (existing) {
      const isVid = existing.isVideo || (typeof photoSrc === 'string' && (photoSrc.toLowerCase().endsWith('.mp4') || photoSrc.toLowerCase().endsWith('.mov') || photoSrc.toLowerCase().includes('vid-')));
      setSelectedPhoto({
        ...existing,
        isVideo: isVid,
        title: title || existing.title,
        categoryLabel: categoryLabel || existing.categoryLabel,
        year: year || existing.year,
        chapterPhotos: chapterPhotos || null
      });
    } else {
      const isVid = typeof photoSrc === 'string' && (photoSrc.toLowerCase().endsWith('.mp4') || photoSrc.toLowerCase().endsWith('.mov') || photoSrc.toLowerCase().includes('vid-'));
      setSelectedPhoto({
        id: 99000 + Math.floor(Math.random() * 1000),
        src: photoSrc,
        title: title || 'Milestone Item',
        categoryLabel: categoryLabel || 'Life Chronicle',
        year: year || '2024',
        desc: title || 'Milestone memorial visual memory.',
        category: 'milestone',
        isVideo: isVid,
        chapterPhotos: chapterPhotos || null
      });
    }
  };

  return (
    <div className={`min-h-screen font-sans select-none selection:bg-red-600 selection:text-white relative transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* VIRGIN / BRANSON EXACT 2-TIER EXECUTIVE HEADER (MATCHING USER SCREENSHOT 3) */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
      }`}>
        {/* Top Crimson Accent Line */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

        {/* Tier 1: MENU button on left with Slant Cut Background, Signature Red Emblem in center (Matching Screenshot 3) */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between border-b transition-colors ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          {/* Left: MENU button inside Virgin Slant-Cut Light Grey Shape */}
          <div className="flex items-center h-full">
            <button
              onClick={() => setDrawerOpen(true)}
              className={`transition-all pr-8 pl-4 py-2.5 flex items-center gap-2.5 cursor-pointer border-r ${
                isDarkMode 
                  ? 'bg-slate-800/90 hover:bg-slate-700 border-slate-700' 
                  : 'bg-slate-100/90 hover:bg-red-50 border-slate-200/50'
              }`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
            >
              <Menu className="w-5 h-5 text-red-600 stroke-[2.5]" />
              <span className="text-xs font-black uppercase text-red-600 tracking-widest pr-2">MENU</span>
            </button>
          </div>

          {/* Center: Red Signature Script Emblem Logo (Matching Virgin Logo Style) */}
          <div 
            onClick={() => { switchTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group flex items-center gap-1.5"
          >
            <span className="font-serif italic font-black text-2xl sm:text-3xl text-red-600 tracking-tighter hover:scale-105 transition-transform">
              Girish
            </span>
            <span className={`text-[10px] font-black uppercase tracking-widest border-l pl-2 hidden sm:inline-block ${
              isDarkMode ? 'text-slate-400 border-slate-700' : 'text-slate-400 border-slate-300'
            }`}>
              PORTFOLIO
            </span>
          </div>

          {/* Right: Theme Toggle & Quick Return to Give Smile NGO Portal */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center hover:scale-105 shadow-sm ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700" />
              )}
            </button>

            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
              title="Return to Give Smile NGO Homepage"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span className="hidden sm:inline">Give Smile NGO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tier 2: Clean Uppercase Sub-Navigation Links (Matching Screenshot 3) */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-center gap-6 sm:gap-12 overflow-x-auto text-[11px] sm:text-[12px] font-extrabold uppercase tracking-widest whitespace-nowrap ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {PORTFOLIO_NAV_TABS.map((tab) => {
            const isActive = internalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  switchTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:text-red-600 transition-colors py-1.5 border-b-2 cursor-pointer ${
                  isActive ? 'text-red-600 border-red-600 font-black' : 'border-transparent text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>


      {/* VIRGIN EXACT FULLSCREEN HAMBURGER MENU OVERLAY (MATCHING USER SCREENSHOT 2) */}
      {drawerOpen && (
        <div className={`fixed inset-0 z-50 animate-fadeIn flex flex-col overflow-hidden transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-950/95 backdrop-blur-2xl text-slate-100' : 'bg-[#FAFAFA]/95 backdrop-blur-2xl text-slate-900'
        }`}>
          
          {/* EPIC HALF-SCREEN FADED BACKGROUND IMAGE */}
          <div 
            className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0 pointer-events-none transition-opacity duration-700"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)'
            }}
          >
            <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-slate-950/20' : 'bg-white/10'}`}></div>
            <img
              src="/assets/girish_memorial/girish_photo_01.jpeg"
              alt="Late Mr. Girish Sodmise Backdrop"
              className="w-full h-full object-cover object-[35%_15%] opacity-40 sm:opacity-70 lg:opacity-100 scale-[1.02] transform-gpu"
            />
          </div>

          {/* Top Bar with RED CLOSE BUTTON inside Slant Container & CENTER VIRGIN RED LOGO */}
          <div className={`relative max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between border-b z-30 transition-colors ${
            isDarkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <button
              onClick={() => setDrawerOpen(false)}
              className={`transition-all pr-8 pl-4 py-2.5 flex items-center gap-2.5 cursor-pointer ${
                isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100/90 hover:bg-rose-50'
              }`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
            >
              <X className="w-5 h-5 text-rose-500 stroke-[2.5]" />
              <span className="text-xs font-black uppercase text-rose-500 tracking-widest pr-2">CLOSE</span>
            </button>
  
            <div className="flex items-center gap-1.5 backdrop-blur-sm px-4 py-1 rounded-full">
              <span className="font-serif italic font-black text-2xl sm:text-3xl text-rose-600 tracking-tighter drop-shadow-md">
                Girish
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest border-l pl-2 hidden sm:inline-block ${
                isDarkMode ? 'text-slate-400 border-slate-700' : 'text-slate-400 border-slate-300'
              }`}>
                PORTFOLIO
              </span>
            </div>
  
            <div className="w-24 hidden sm:block" />
          </div>
  
          {/* Main Menu Body */}
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 py-10 flex-1 flex flex-col z-20 overflow-y-auto lg:overflow-visible">
            
            {/* Constrained Left Container (Prevents overlap with his face) */}
            <div className="w-full lg:w-[60%] flex flex-col xl:flex-row gap-10 xl:gap-16">
              
              {/* Left Column: Primary Menu Items */}
              <div className="w-full xl:w-[45%] space-y-6 shrink-0">
                {[
                  { id: 'overview', num: '01', label: 'Home' },
                  { id: 'enterprises', num: '02', label: 'Companies & Enterprises' },
                  { id: 'journey', num: '03', label: 'Life Journey' },
                  { id: 'gallery', num: '04', label: 'Photo Archives' },
                  { id: 'ngo', num: '05', label: 'Give Smile NGO Initiative', isNGO: true }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isNGO) {
                        setDrawerOpen(false);
                        if (onNavigate) onNavigate('home');
                      } else {
                        switchTab(item.id);
                        setDrawerOpen(false);
                      }
                    }}
                    className={`group w-full flex items-center gap-4 text-left transition-all cursor-pointer font-sans hover:translate-x-2`}
                  >
                    <span className={`text-xs sm:text-sm font-extrabold font-serif italic tracking-widest transition-colors ${
                      internalTab === item.id 
                        ? (item.isNGO ? 'text-rose-500' : 'text-amber-500')
                        : (isDarkMode ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-500')
                    }`}>{item.num}</span>
                    
                    <span className={`block text-2xl sm:text-3xl lg:text-4xl font-extrabold transition-colors drop-shadow-sm ${
                      internalTab === item.id 
                        ? (item.isNGO ? 'text-rose-500' : (isDarkMode ? 'text-amber-400' : 'text-amber-600')) 
                        : (isDarkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950')
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
    
              {/* Middle Column: Ecosystem Links & Theme Toggle */}
              <div className="w-full xl:w-[55%] space-y-8 shrink-0">
                <div className="space-y-3">
                  <div className={`pb-3 border-b font-extrabold text-xs tracking-widest uppercase transition-colors ${
                    isDarkMode ? 'text-white border-white/20' : 'text-slate-900 border-slate-300'
                  }`}>
                    Girish Group Ecosystem
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1">
                    {[
                      { label: 'Girish Industrial Labour Services', action: () => switchTab('enterprises') },
                      { label: 'GILS Pvt Ltd', link: 'https://www.gilspvtltd.com' },
                      { label: 'Techvis', action: () => switchTab('enterprises') },
                      { label: 'Girish Polychem Industries', action: () => switchTab('enterprises') },
                      { label: 'Gsinfotechvis Pvt Ltd', link: 'https://www.gsinfotechvis.com' },
                      { label: 'Gsinfotechvis Global LLC', link: 'https://www.gsinfotechvis.com' },
                      { label: 'GILS Global LLC (Dubai, UAE)', link: 'https://www.gilspvtltd.com' },
                      { label: 'Talentic360.AI LLP', link: 'https://www.talentic360ai.in' },
                      { label: 'Give Smile Foundation (NGO)', action: () => { if (onNavigate) onNavigate('home'); }, isNGO: true }
                    ].map((eco, idx) => (
                      <div 
                        key={idx}
                        className="group flex items-center justify-between py-2 cursor-pointer transition-all duration-300 hover:translate-x-1"
                        onClick={() => {
                          if (eco.link) window.open(eco.link, '_blank');
                          else if (eco.action) eco.action();
                          setDrawerOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                            eco.isNGO ? 'bg-rose-500' : 'bg-amber-500'
                          }`} />
                          <span className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                            isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'
                          }`}>
                            {eco.label}
                          </span>
                        </div>
                        {eco.link && (
                          <ExternalLink className={`w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${
                            eco.isNGO ? 'text-rose-400' : 'text-amber-400'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
    
                {/* Theme Toggle */}
                <div className={`p-1.5 rounded-2xl border backdrop-blur-md transition-all duration-300 max-w-sm ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                    : 'bg-white/80 border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                }`}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { if (isDarkMode) toggleTheme(); }}
                      className={`flex-1 py-2 px-3 rounded-xl font-black text-[10px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        !isDarkMode 
                          ? 'bg-slate-100 text-slate-900 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Sun className={`w-3.5 h-3.5 transition-transform duration-300 ${!isDarkMode ? 'text-amber-500 fill-amber-400' : 'text-slate-500'}`} />
                      <span className="tracking-widest">LIGHT</span>
                    </button>
                    <button
                      onClick={() => { if (!isDarkMode) toggleTheme(); }}
                      className={`flex-1 py-2 px-3 rounded-xl font-black text-[10px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-md ring-1 ring-white/10' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Moon className={`w-3.5 h-3.5 transition-transform duration-300 ${isDarkMode ? 'text-amber-300 fill-amber-300' : 'text-slate-400'}`} />
                      <span className="tracking-widest">DARK</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Floating Elegant Glass Caption */}
          <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-30 hidden sm:block pointer-events-none">
            <div className={`backdrop-blur-xl rounded-2xl p-4 sm:px-6 sm:py-4 border shadow-2xl transition-colors ${
              isDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/70 border-white shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
            }`}>
              <p className={`text-xs sm:text-sm font-bold tracking-wide ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>
                Late Mr. Girish Dattatray Sodmise
              </p>
              <p className={`text-[10px] font-extrabold tracking-widest mt-1 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>
                1999 &mdash; 2026
              </p>
            </div>
          </div>

        </div>
      )}

      <main className={`w-full space-y-16 transition-all duration-300 ${
        internalTab === 'gallery' ? 'px-3 sm:px-6 lg:px-10 py-6 sm:py-10 max-w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'
      }`}>

        {/* ========================================================================= */}
        {/* VIEW 1: OVERVIEW & VIRGIN BRANSON OVERLAPPING HERO CARD VIEW (MATCHING SCREENSHOT 1) */}
        {/* ========================================================================= */}
        {internalTab === 'overview' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* HERO EXECUTIVE SPOTLIGHT SHOWCASE (0% TEXT CROPPING & 0% FACE CROPPING) */}
            <section className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
              {/* Left Column (5 Cols): Dynamic Title Card */}
              <div className={`lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10 border-b lg:border-b-0 lg:border-r relative transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${
                    isDarkMode ? 'bg-red-950/80 border-red-800 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    <Flame className="w-3.5 h-3.5 text-red-600" />
                    <span>GIRISH DATTATRAY SODMISE</span>
                  </div>

                  <h1 className={`text-2xl sm:text-4xl lg:text-4xl font-extrabold font-serif leading-tight ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    From Corporate Prodigy to Global Tech Leader
                  </h1>

                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    Explore the extraordinary journey of Girish Sir, who led 60 professionals at age 22, founded Gsinfotechvis at 24, and expanded across the USA, Dubai UAE, AI EdTech, and Give Smile NGO.
                  </p>

                  <div className={`text-xs font-bold pt-2 border-t flex items-center gap-2 ${
                    isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}>
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    <span>15 March 1999 — 21 June 2026</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => { switchTab('journey'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Read Biography</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://www.linkedin.com/in/mr-girish-sodmise-%E2%80%8E-219538161/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isDarkMode 
                        ? 'bg-white hover:bg-slate-100 text-slate-900 border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.45)]'
                    }`}
                  >
                    <span>LinkedIn Profile</span>
                    <Linkedin className={`w-4 h-4 ${isDarkMode ? 'text-blue-600' : 'text-white'}`} />
                  </a>
                </div>
              </div>

              {/* Right Column (7 Cols): Dedicated Un-overlapped Cool Image Container */}
              <div className="lg:col-span-7 relative bg-slate-950 flex flex-col justify-between overflow-hidden group min-h-[380px] lg:min-h-full">
                {/* Image element with object-contain to ensure zero text cropping and zero face cropping */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-2 sm:p-4">
                  <img
                    src={HERO_COOL_IMAGES[heroPhotoIndex].src}
                    alt={HERO_COOL_IMAGES[heroPhotoIndex].title}
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-700 rounded-2xl drop-shadow-2xl"
                  />
                </div>

                {/* Top Badge: Image Title & Category */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold border border-amber-500/30 z-20 shadow-lg flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{HERO_COOL_IMAGES[heroPhotoIndex].title}</span>
                </div>

                {/* Bottom Bar: Thumbnail Selector Bar */}
                <div className="absolute bottom-4 right-4 left-4 lg:left-auto flex items-center justify-center lg:justify-end gap-2 bg-black/80 backdrop-blur-md p-2 rounded-2xl border border-white/20 z-20 shadow-2xl overflow-x-auto max-w-full">
                  {HERO_COOL_IMAGES.map((imgItem, idx) => (
                    <button
                      key={imgItem.id}
                      onClick={() => setHeroPhotoIndex(idx)}
                      className={`relative w-14 h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        heroPhotoIndex === idx 
                          ? 'border-red-500 scale-110 shadow-lg shadow-red-600/50 ring-2 ring-red-500/50' 
                          : 'border-white/30 opacity-60 hover:opacity-100'
                      }`}
                      title={imgItem.title}
                    >
                      <img 
                        src={imgItem.src} 
                        alt={imgItem.title} 
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>



            {/* HIGH-IMPACT 8-PHOTO VISUAL MOMENTS MOSAIC GRID */}
            <section className="space-y-6">
              <div className={`flex items-center justify-between border-b pb-3 transition-colors ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div>
                  <h2 className={`text-xl sm:text-2xl font-extrabold font-serif flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Film className="w-5 h-5 text-red-600" />
                    <span>Featured Visual Moments Showcase</span>
                  </h2>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Curated spotlight gallery displaying 8 landmark photos of Girish Sir.
                  </p>
                </div>

                <button
                  onClick={() => { switchTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-extrabold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>See All Photo Archives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 8-Photo Interactive Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                {featuredHomePhotos.map((photo, pIdx) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`group relative rounded-2xl overflow-hidden border hover:border-red-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-900 aspect-[4/3] hover:-translate-y-1 ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase shadow-md">
                      #{pIdx + 1} • {photo.year}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                      <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                        {photo.categoryLabel}
                      </div>
                      <h3 className="text-xs font-bold leading-snug line-clamp-1">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>




            {/* FULL-WIDTH SECTION 1: GIRISH GROUP ENTERPRISES & ECOSYSTEM (10 ENTITIES) */}
            <section className={`space-y-6 pt-6 border-t transition-colors ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200/80'
            }`}>
              <div className="p-6 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
                {/* Background Accent Gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-red-500" />
                      <span>10 ENTITIES • 9 COMMERCIAL COMPANIES + 1 NGO</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase font-serif tracking-tight text-white">
                      Girish Group Enterprises & Ecosystem
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-3xl">
                      From founding GILS Industrial Labour Services in 1998 to establishing Gsinfotechvis, GILS Global Dubai, Talentic360.AI, and Give Smile Foundation NGO.
                    </p>
                  </div>

                  <button
                    onClick={() => { switchTab('enterprises'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Full Enterprise Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>




          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: LIFE JOURNEY VIEW (FEATURED ON HOME PAGE) */}
        {/* ========================================================================= */}
        {internalTab === 'journey' && (
          <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto">
            {/* LUXURY PAGE HEADER */}
            <div className={`text-center space-y-4 border-b pb-8 transition-colors ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <span className={`text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full border ${
                isDarkMode ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                Official Documented Chronicle (1999 – 2026)
              </span>
              <h2 className={`text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                LIFE STORY & 3D CHRONICLE
              </h2>
              <p className={`text-xs sm:text-base max-w-3xl mx-auto font-sans leading-relaxed ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                Explore the extraordinary life story of Late Mr. Girish Dattatray Sodmise — from academic distinction at Panchgani and VIT Pune to corporate leadership at TIAA, founding Gsinfotechvis, GILS Global Dubai, Talentic360.AI, and Give Smile NGO.
              </p>
            </div>

            {/* 3D NARRATIVE & MILESTONES SHOWCASE */}
            <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl space-y-8 transition-colors ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-white border-slate-200 text-slate-800 shadow-xl'
            }`}>
              {/* Header Box with Gradient Accent & Controls */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-700 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm border border-white/20">
                      <Flame className="w-3.5 h-3.5 text-amber-300" />
                      <span>OFFICIAL BIOGRAPHY SYNOPSIS • 1999 – 2026</span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-black font-serif tracking-tight">
                      Late Mr. Girish Dattatray Sodmise
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100 font-sans max-w-2xl leading-relaxed">
                      Entrepreneur, technology professional, and visionary business leader whose work spanned information technology, workforce solutions, overseas manpower, digital services, and educational technology.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                    <button
                      onClick={() => setBioModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-amber-100 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-red-600" />
                      <span>Full Bio</span>
                    </button>
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm p-1 rounded-xl border border-white/20">
                      <button
                        onClick={() => scrollBioTrack('left')}
                        className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Scroll Left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollBioTrack('right')}
                        className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Scroll Right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Interactive Milestone Reel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pivotal Chapters at a Glance (Scroll & Swipe)</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    6 Interactive Milestones
                  </span>
                </div>

                <div
                  ref={bioTrackRef}
                  className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 custom-portal-scrollbar snap-x scroll-smooth select-none"
                >
                  {[
                    {
                      num: '01',
                      title: 'Academic Excellence',
                      period: '1999 – 2021',
                      badge: 'Panchgani & VIT Pune',
                      icon: GraduationCap,
                      color: 'from-blue-600/20 via-cyan-600/10 to-transparent border-cyan-500/40 text-cyan-400',
                      badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
                      text: 'Schooling at New Era High School, Panchgani, and B.Tech from VIT Pune, cultivating technical discipline, problem-solving, and a lifelong passion for innovation.'
                    },
                    {
                      num: '02',
                      title: 'Corporate Stewardship',
                      period: 'Age 22 • 2021–2023',
                      badge: 'TIAA Technology Leader',
                      icon: Briefcase,
                      color: 'from-amber-600/20 via-yellow-600/10 to-transparent border-amber-500/40 text-amber-400',
                      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
                      text: 'Joined global financial giant TIAA as Technology Trainee, promoted to Analyst, and swiftly rose to lead a team of nearly 60 experienced professionals with dedication and pride.'
                    },
                    {
                      num: '03',
                      title: 'The Entrepreneurial Leap',
                      period: 'Age 24 • 2021',
                      badge: 'Gsinfotechvis (India & USA)',
                      icon: Building2,
                      color: 'from-rose-600/20 via-red-600/10 to-transparent border-rose-500/40 text-rose-400',
                      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
                      text: 'Stepped away from corporate security to establish Gsinfotechvis Pvt. Ltd., later expanding internationally with Gsinfotechvis Global LLC in Wyoming, USA.'
                    },
                    {
                      num: '04',
                      title: 'Girish Group Ecosystem',
                      period: 'Global Manpower',
                      badge: 'GILS Global LLC (Dubai)',
                      icon: Globe,
                      color: 'from-emerald-600/20 via-teal-600/10 to-transparent border-emerald-500/40 text-emerald-400',
                      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
                      text: 'Strengthened the Girish Group by scaling GILS Pvt. Ltd. from domestic manpower into overseas recruitment, establishing GILS Global LLC in Dubai, UAE.'
                    },
                    {
                      num: '05',
                      title: 'AI & EdTech Platform',
                      period: 'Emerging Tech',
                      badge: 'Talentic360.AI LLP',
                      icon: Cpu,
                      color: 'from-purple-600/20 via-indigo-600/10 to-transparent border-purple-500/40 text-purple-400',
                      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
                      text: 'Conceptualized and built Talentic360.AI, an AI-driven workforce and educational platform bridging students and institutions with modern career opportunities.'
                    },
                    {
                      num: '06',
                      title: 'Philanthropic Mission',
                      period: 'Enduring Impact',
                      badge: 'Give Smile Foundation (NGO)',
                      icon: Heart,
                      color: 'from-pink-600/20 via-rose-600/10 to-transparent border-pink-500/40 text-pink-400',
                      badgeBg: 'bg-pink-500/15 text-pink-300 border-pink-400/30',
                      text: 'Believed success becomes meaningful when shared with others, envisioning Give Smile NGO to uplift underprivileged youth, healthcare, education, and community welfare.'
                    }
                  ].map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <div
                        key={idx}
                        className={`w-[290px] sm:w-[320px] shrink-0 snap-center rounded-2xl p-5 border transition-all duration-300 transform-gpu hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl flex flex-col justify-between space-y-4 ${
                          isDarkMode
                            ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50 hover:shadow-[0_15px_30px_rgba(245,158,11,0.18)]'
                            : 'bg-[#FFFDF8] border-slate-200 hover:border-amber-400 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${card.badgeBg}`}>
                              {card.badge}
                            </span>
                            <span className={`text-xs font-serif font-black italic ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>
                              #{card.num}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${card.color}`}>
                              <CardIcon className="w-5 h-5 shrink-0" />
                            </div>
                            <div>
                              <h4 className={`text-sm sm:text-base font-black font-serif tracking-tight leading-snug ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {card.title}
                              </h4>
                              <p className="text-[10px] font-bold text-slate-400">
                                {card.period}
                              </p>
                            </div>
                          </div>

                          <p className={`text-xs leading-relaxed font-sans line-clamp-4 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            {card.text}
                          </p>
                        </div>

                        <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider ${
                          isDarkMode ? 'border-slate-800 text-amber-400' : 'border-slate-100 text-amber-600'
                        }`}>
                          <span>Vision Landmark</span>
                          <span>Chapter {card.num}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Family Tribute Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-red-950 text-white space-y-3 shadow-xl border border-red-500/30">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                  PERSONAL CHARACTER & VALUES
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  Those who knew Girish remember him not only as an entrepreneur and leader, but also as a <strong className="text-white">devoted son, caring brother, loving husband, mentor, and a dedicated friend</strong>. His vision lives on through the organizations he built, the lives he touched, and the countless dreams he encouraged others to pursue.
                </p>
                <div className="pt-2 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-amber-300 font-bold">
                  <span>"Investment of time, 100% effort, dedication and consistency"</span>
                  <span className="text-slate-400">— Girish Sodmise</span>
                </div>
              </div>
            </div>

            {/* 3D CHRONOLOGICAL TIMELINE (PDF PAGES 2, 3, 4 EXPLICIT MILESTONES) */}
            <div className="space-y-8 pt-6">
              <div className="text-center space-y-2">
                <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                  isDarkMode ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  Interactive 3D Milestone Timeline
                </span>
                <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Chronological Life Journey (1999 – 2026)
                </h3>
              </div>

              {/* MOBILE INTERACTIVE YEAR-WISE POINTERS & CHAPTER SPOTLIGHT (md:hidden) */}
              <div className="md:hidden space-y-5">
                <div className={`rounded-3xl p-5 border shadow-2xl space-y-4 relative overflow-hidden transition-colors ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  {/* Top Crimson Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

                  {/* Top Header Pill & Navigation Controls */}
                  <div className={`flex items-center justify-between gap-2 border-b pb-3 pt-1 transition-colors ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
                        {activeMobileChapter + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">CHAPTER #{activeMobileChapter + 1} OF {LIFE_TIMELINE_STORY.length}</span>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{LIFE_TIMELINE_STORY[activeMobileChapter].year}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={activeMobileChapter === 0}
                        onClick={() => setActiveMobileChapter(prev => Math.max(0, prev - 1))}
                        className={`p-2 rounded-xl border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 shadow-sm transition-colors ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                        aria-label="Previous Chapter"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                      </button>
                      <button
                        disabled={activeMobileChapter === LIFE_TIMELINE_STORY.length - 1}
                        onClick={() => setActiveMobileChapter(prev => Math.min(LIFE_TIMELINE_STORY.length - 1, prev + 1))}
                        className="p-2 rounded-xl bg-red-600 border border-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 shadow-md hover:bg-red-700"
                        aria-label="Next Chapter"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Year-Wise Pointers Bar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x">
                    {LIFE_TIMELINE_STORY.map((item, idx) => {
                      const isSelected = activeMobileChapter === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveMobileChapter(idx)}
                          className={`snap-center shrink-0 px-3.5 py-2 rounded-2xl border text-xs font-black transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                            isSelected
                              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-md scale-105'
                              : (isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-red-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50')
                          }`}
                        >
                          <span className="text-[9px] opacity-75 font-mono">#{String(idx + 1).padStart(2, '0')}</span>
                          <span className="whitespace-nowrap font-extrabold">{item.year}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Mobile Chapter Active Card Content */}
                  {(() => {
                    const item = LIFE_TIMELINE_STORY[activeMobileChapter];
                    return (
                      <div className="space-y-3 pt-1 animate-fadeIn">
                        <div className="space-y-1">
                          <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider inline-block ${
                            isDarkMode ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {item.badge}
                          </span>
                          <h4 className={`text-xl font-black font-serif leading-tight ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {item.title}
                          </h4>
                          <div className="text-xs font-extrabold text-red-600">
                            {item.subtitle}
                          </div>
                        </div>

                        <div className={`text-xs leading-relaxed font-sans p-3.5 rounded-2xl border shadow-sm transition-colors ${
                          isDarkMode ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          {item.desc}
                        </div>

                        {/* Chapter Photos Grid */}
                        <div className="pt-2 space-y-2">
                          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center justify-between">
                            <span>Visual Gallery ({item.photos.length})</span>
                            <span className="text-red-600 font-bold">Tap to inspect full screen</span>
                          </div>

                          {item.photos.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                              {item.photos.map((p, pIdx) => (
                                <div
                                  key={pIdx}
                                  onClick={() => handlePhotoClick(p.src, p.title, item.title, item.year, item.photos)}
                                  className={`relative aspect-video rounded-xl overflow-hidden bg-slate-950 border cursor-pointer active:scale-95 transition-all shadow-sm hover:border-red-500 group ${
                                    isDarkMode ? 'border-slate-800' : 'border-slate-200'
                                  }`}
                                >
                                  <img
                                    src={p.src}
                                    alt={p.title}
                                    className={`w-full h-full ${p.objectFit || 'object-cover'} ${p.objectPos || 'object-top'}`}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                                    <span className="text-[9px] font-bold text-white truncate">{p.title}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className={`p-3 rounded-xl border border-dashed text-center text-xs font-bold text-slate-400 italic ${
                              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                            }`}>
                              Childhood & Early Photo Archives Coming Soon
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div ref={desktopTimelineRef} className="hidden md:block space-y-12 relative py-6">
                {/* Custom Inline CSS for Flowing Liquid Neon & Wind Sway Animations */}
                <style>{`
                  @keyframes liquidFlow {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 0% 100%; }
                    100% { background-position: 0% 0%; }
                  }
                  @keyframes windSway {
                    0%, 100% { transform: rotate(0deg) skewX(0deg); }
                    25% { transform: rotate(3deg) skewX(1.5deg); }
                    50% { transform: rotate(-2deg) skewX(-1deg); }
                    75% { transform: rotate(2.5deg) skewX(1deg); }
                  }
                  @keyframes windSwayReverse {
                    0%, 100% { transform: rotate(0deg) skewX(0deg); }
                    25% { transform: rotate(-2.5deg) skewX(-1.5deg); }
                    50% { transform: rotate(3deg) skewX(1.5deg); }
                    75% { transform: rotate(-2deg) skewX(-1deg); }
                  }
                  @keyframes floatPollen {
                    0% { transform: translateY(0px) scale(0.8); opacity: 0; }
                    50% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
                    100% { transform: translateY(-60px) scale(0.6); opacity: 0; }
                  }
                  @keyframes rotateOrbit {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  @keyframes pulseGlowRing {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.15); opacity: 0.85; }
                  }
                  @keyframes starPulseWave {
                    0%, 100% { transform: scale(1); opacity: 0.6; filter: drop-shadow(0 0 10px rgba(251,191,36,0.3)); }
                    50% { transform: scale(1.1); opacity: 0.95; filter: drop-shadow(0 0 25px rgba(251,191,36,0.7)); }
                  }
                  @keyframes shimmerText {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                  .animate-liquid-neon-dark {
                    background: linear-gradient(180deg, #ff0055 0%, #ff00aa 25%, #00f0ff 50%, #ffb700 75%, #ff0055 100%);
                    background-size: 100% 300%;
                    animation: liquidFlow 4s linear infinite;
                    box-shadow: 0 0 16px rgba(255,0,85,0.85), 0 0 32px rgba(255,0,170,0.65), 0 0 48px rgba(0,240,255,0.45);
                  }
                  .animate-liquid-neon-light {
                    background: linear-gradient(180deg, #e11d48 0%, #f97316 25%, #eab308 50%, #f43f5e 75%, #dc2626 100%);
                    background-size: 100% 300%;
                    animation: liquidFlow 4s linear infinite;
                    box-shadow: 0 0 14px rgba(225,29,72,0.85), 0 0 28px rgba(249,115,22,0.6);
                  }
                  .animate-wind-bush {
                    transform-origin: bottom center;
                    animation: windSway 5.5s ease-in-out infinite;
                  }
                  .animate-wind-bush-delay {
                    transform-origin: bottom center;
                    animation: windSwayReverse 7s ease-in-out infinite;
                  }
                  @keyframes float3D {
                    0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(-15deg); }
                    50% { transform: translateY(-12px) rotateX(25deg) rotateY(-25deg); }
                  }
                  @keyframes shadowPulse {
                    0%, 100% { transform: scale(1); opacity: 0.35; }
                    50% { transform: scale(0.65); opacity: 0.15; }
                  }
                  @keyframes crystalGlowPulse {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(245,158,11,0.4)) drop-shadow(0 0 20px rgba(0,240,255,0.3)); }
                    50% { filter: drop-shadow(0 0 25px rgba(245,158,11,0.85)) drop-shadow(0 0 40px rgba(0,240,255,0.7)); }
                  }
                  .animate-float-3d {
                    animation: float3D 4.5s ease-in-out infinite;
                  }
                  .animate-shadow-pulse {
                    animation: shadowPulse 4.5s ease-in-out infinite;
                  }
                  .animate-crystal-glow {
                    animation: crystalGlowPulse 3.5s ease-in-out infinite;
                  }
                  .animate-shimmer-badge {
                    background: linear-gradient(90deg, currentColor 0%, #fbbf24 50%, currentColor 100%);
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    animation: shimmerText 4s linear infinite;
                  }
                `}</style>

                {/* Dynamic Scroll Track Line & Aligned Laser Pointer Dot */}
                <div className="absolute top-6 bottom-14 left-1/2 -translate-x-1/2 w-6 pointer-events-none z-0">
                  {/* Background Track Line & Liquid Neon Fill */}
                  <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2.5 rounded-full overflow-hidden z-0 transition-colors ${
                    isDarkMode ? 'bg-slate-900 border border-slate-700/60 shadow-[0_0_12px_rgba(0,240,255,0.15)]' : 'bg-slate-200/90 border border-slate-300 shadow-inner'
                  }`}>
                    <div
                      className={`w-full rounded-full transition-all duration-150 ease-out ${
                        isDarkMode ? 'animate-liquid-neon-dark' : 'animate-liquid-neon-light'
                      }`}
                      style={{ height: `${timelineScrollProgress}%` }}
                    />
                  </div>

                  {/* Glowing Pulse Laser Pointer centered directly at tip of moving line */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white z-10 transition-all duration-150 ease-out flex items-center justify-center ${
                      isDarkMode 
                        ? 'bg-cyan-400 shadow-[0_0_25px_#00f0ff,0_0_50px_#ff00aa]' 
                        : 'bg-red-600 shadow-[0_0_25px_#f97316,0_0_40px_#e11d48]'
                    }`}
                    style={{
                      top: `${timelineScrollProgress}%`,
                      opacity: timelineScrollProgress > 1 && timelineScrollProgress < 99 ? 1 : 0
                    }}
                  >
                    <div className={`w-full h-full rounded-full animate-ping opacity-85 ${
                      isDarkMode ? 'bg-pink-500' : 'bg-amber-400'
                    }`} />
                  </div>
                </div>

                {LIFE_TIMELINE_STORY.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const isRevealed = revealedChapters[idx];
                  const itemThreshold = ((idx + 0.3) / LIFE_TIMELINE_STORY.length) * 100;
                  const isPassedByLine = timelineScrollProgress >= itemThreshold;

                  return (
                    <div
                      key={idx}
                      data-chapter-idx={idx}
                      className={`timeline-reveal-card relative flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ease-out ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } ${
                        isRevealed
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-12 scale-95'
                      }`}
                    >
                      {/* Timeline Year Marker Circle (Positioned ON TOP of line with Liquid Neon styling when passed) */}
                      <div
                        className={`absolute left-1/2 w-11 h-11 rounded-full text-white border-4 border-white shadow-2xl flex items-center justify-center text-xs font-black -translate-x-1/2 z-30 shrink-0 transition-all duration-500 ${
                          isPassedByLine
                            ? (isDarkMode 
                                ? 'bg-slate-950 text-cyan-300 border-cyan-400 ring-4 ring-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.9),0_0_15px_rgba(255,0,170,0.7)] scale-110' 
                                : 'bg-gradient-to-tr from-red-600 via-amber-600 to-red-700 text-white border-white ring-4 ring-red-500/40 shadow-[0_0_25px_rgba(225,29,72,0.85)] scale-110')
                            : (isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-300 text-slate-600 border-slate-200')
                        }`}
                      >
                        {idx + 1}
                      </div>

                      {/* Content Card (3D Elevated Reveal Styling) */}
                      <div className={`w-full md:w-[calc(50%-2.5rem)] p-6 sm:p-8 rounded-3xl border shadow-xl hover:shadow-[0_20px_45px_-15px_rgba(220,38,38,0.25)] hover:border-red-500 hover:-translate-y-2 transition-all duration-300 space-y-4 group border-t-4 border-t-red-600 relative overflow-hidden ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                      }`}>
                        {/* Ambient Glow Accent */}
                        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-red-500/10 blur-2xl group-hover:bg-red-500/20 transition-all pointer-events-none" />

                        <div className={`flex items-center justify-between border-b pb-3 relative z-10 transition-colors ${
                          isDarkMode ? 'border-slate-800' : 'border-slate-100'
                        }`}>
                          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md flex items-center gap-1.5">
                            <Flame className="w-3 h-3 text-amber-200" />
                            <span>{item.year}</span>
                          </span>
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {item.badge}
                          </span>
                        </div>

                        <div className="relative z-10">
                          <h4 className={`text-lg sm:text-xl font-black font-serif group-hover:text-red-600 transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {item.title}
                          </h4>
                          <div className="text-xs font-extrabold text-red-600 mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed font-sans relative z-10 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-800'
                        }`}>
                          {item.desc}
                        </p>

                        {/* Real Photos Grid */}
                        <div className={`pt-3 border-t space-y-2 relative z-10 transition-colors ${
                          isDarkMode ? 'border-slate-800' : 'border-slate-100'
                        }`}>
                          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center justify-between">
                            <span>Landmark Visual Moments ({item.photos.length})</span>
                            <span className="text-red-600 font-black flex items-center gap-1">
                              <span>Chapter #{idx + 1}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                            </span>
                          </div>

                          {item.photos.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2.5">
                              {item.photos.map((p, pIdx) => {
                                const isVid = p.isVideo || (typeof p.src === 'string' && (p.src.toLowerCase().endsWith('.mp4') || p.src.toLowerCase().endsWith('.mov') || p.src.toLowerCase().includes('vid-')));
                                return (
                                   <div
                                     key={pIdx}
                                     onClick={() => handlePhotoClick(p.src, p.title, item.title, item.year, item.photos)}
                                     className={`relative aspect-video rounded-xl overflow-hidden bg-slate-950 border hover:border-red-500 cursor-pointer group/img shadow-sm hover:shadow-lg transition-all ${
                                       isDarkMode ? 'border-slate-800' : 'border-slate-200'
                                     }`}
                                   >
                                     {isVid ? (
                                       <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                                         <video
                                           src={`${p.src}#t=4.0`}
                                           className={`w-full h-full object-cover ${p.objectPos || 'object-center'} group-hover/img:scale-110 transition-transform duration-500`}
                                           muted
                                           preload="metadata"
                                           playsInline
                                         />
                                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/img:bg-black/20 transition-colors">
                                           <div className="p-2 rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-md group-hover/img:scale-110 transition-transform">
                                             <Film className="w-4 h-4 fill-white" />
                                           </div>
                                         </div>
                                       </div>
                                     ) : (
                                       <img
                                         src={p.src}
                                         alt={p.title}
                                         className={`w-full h-full ${p.objectFit || 'object-cover'} ${p.objectPos || 'object-center'} group-hover/img:scale-110 transition-transform duration-500`}
                                       />
                                     )}
                                   </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs font-bold text-slate-400 italic">
                              Childhood & Early Photo Archives Coming Soon
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* 3D LEVITATING GLASSMORPHIC MEMORIAL CRYSTAL SHRINE */}
                {/* ROYAL GLASSMORPHIC CHRONICLE MILESTONE CAPSULE */}
                <div className="relative pt-6 pb-2 flex flex-col items-center justify-center text-center z-20">
                  
                  {/* Integrated Golden Star Receiver Notch (Plugs Vertical Laser Line Seamlessly into Capsule Top) */}
                  <div className="relative z-30 mb-[-12px] flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(245,158,11,0.9)] flex items-center justify-center transition-transform hover:scale-110">
                      <Flame className="w-3.5 h-3.5 text-slate-950 animate-bounce" style={{ animationDuration: '1.4s' }} />
                    </div>
                  </div>

                  {/* Luxury Glassmorphic Pill Capsule */}
                  <div className={`relative z-20 px-7 py-3.5 rounded-full border-2 shadow-2xl backdrop-blur-2xl flex items-center gap-3.5 transition-all duration-300 hover:scale-105 group cursor-default ${
                    isDarkMode
                      ? 'bg-slate-950/95 text-amber-300 border-amber-400/90 shadow-[0_0_45px_rgba(245,158,11,0.4)] ring-1 ring-amber-400/40'
                      : 'bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-amber-400/90 shadow-[0_20px_45px_rgba(15,23,42,0.45),0_0_30px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/40'
                  }`}>
                    {/* Glowing Star Icon Badge */}
                    <div className="p-1.5 rounded-full bg-gradient-to-tr from-amber-400/30 to-amber-500/30 border border-amber-400/50 text-amber-400 group-hover:rotate-180 transition-transform duration-700">
                      <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                    </div>

                    <div className="text-left">
                      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest block animate-shimmer-badge ${
                        isDarkMode ? 'text-amber-400' : 'text-amber-300'
                      }`}>
                        ✦ END OF TIMELINE CHRONICLE ✦
                      </span>
                      <span className={`text-xs sm:text-sm font-black tracking-tight block ${
                        isDarkMode ? 'text-amber-200' : 'text-slate-100'
                      }`}>
                        1999 — 2026 • Eternal Legacy & Living Spirit
                      </span>
                    </div>

                    {/* Live Pulse Beacon */}
                    <div className="flex items-center gap-1 pl-1 border-l border-white/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {internalTab === 'enterprises' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className={`text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border ${
                isDarkMode ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                Corporate & Social Portfolio Page
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold font-serif ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Girish Group of Companies
              </h2>
              <p className={`text-xs sm:text-base ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                Explore the international businesses, AI technology platforms, and non-profit social organizations established under Girish Sir's vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ENTERPRISES.map((ent, idx) => (
                <div
                  key={idx}
                  className={`relative group card-liquid-border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                    ent.isNGO 
                      ? `ngo-glow hover:shadow-[0_0_40px_rgba(225,29,72,0.4)] ${isDarkMode ? 'dark-liquid-visible' : ''}` 
                      : `corp-glow hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] ${isDarkMode ? 'dark-liquid-visible' : ''}`
                  }`}
                >
                  {/* FROSTED GLASS INNER CARD */}
                  <div className={`card-liquid-inner transition-colors duration-500 ${
                    isDarkMode 
                      ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                      : 'bg-[#FCFBF8] border border-slate-200 shadow-sm'
                  }`}></div>
                  
                  <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 space-y-6 h-full w-full">
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md ${
                          ent.isNGO 
                            ? (isDarkMode ? 'bg-white/10 text-rose-300 border-rose-400/30' : 'bg-rose-50 text-rose-700 border-rose-200')
                            : (isDarkMode ? 'bg-white/10 text-amber-300 border-amber-400/30' : 'bg-amber-50 text-amber-700 border-amber-200')
                        }`}>
                          Enterprise #{idx + 1} &bull; {ent.est}
                        </span>
                        <span className={`text-[10px] sm:text-xs font-bold flex items-center gap-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                          <MapPin className={`w-3.5 h-3.5 ${ent.isNGO ? (isDarkMode ? 'text-rose-400' : 'text-rose-600') : (isDarkMode ? 'text-amber-400' : 'text-amber-600')}`} />
                          {ent.location}
                        </span>
                      </div>
  
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-black font-serif tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {ent.isNGO && <Heart className={`w-5 h-5 ${isDarkMode ? 'text-rose-400 fill-rose-400/30' : 'text-rose-600 fill-rose-600'}`} />}
                          <span>{ent.name}</span>
                        </h3>
                        <div className={`text-xs font-extrabold mt-1 ${ent.isNGO ? (isDarkMode ? 'text-rose-300' : 'text-rose-600') : (isDarkMode ? 'text-amber-300' : 'text-amber-600')}`}>
                          {ent.tag}
                        </div>
                      </div>
  
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {ent.desc}
                      </p>
  
                      <div className="space-y-2 pt-2">
                        <div className={`text-[10px] font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          Key Operational Capabilities:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ent.metrics.map((m, mIdx) => (
                            <span key={mIdx} className={`px-3 py-1 rounded-lg border text-[10px] sm:text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm ${
                              ent.isNGO 
                                ? (isDarkMode ? 'bg-black/40 border-white/10 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-700')
                                : (isDarkMode ? 'bg-black/40 border-white/10 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700')
                            }`}>
                              <CheckCircle2 className={`w-3.5 h-3.5 ${ent.isNGO ? (isDarkMode ? 'text-rose-400' : 'text-rose-600') : (isDarkMode ? 'text-amber-400' : 'text-amber-600')}`} />
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
  
                    <div className={`pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-xs font-extrabold transition-colors ${
                      isDarkMode ? 'border-white/10' : 'border-slate-200'
                    }`}>
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Active Operational Enterprise</span>
                      {ent.isNGO && onNavigate ? (
                        <button
                          onClick={() => onNavigate('home')}
                          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                            isDarkMode 
                              ? 'bg-rose-500/10 border-rose-400/40 hover:bg-rose-500 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] backdrop-blur-md text-rose-100 hover:text-white'
                              : 'bg-gradient-to-r from-rose-600 to-red-500 shadow-md border-transparent text-white hover:from-rose-500 hover:to-red-400'
                          }`}
                        >
                          <span>Explore Give Smile NGO</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      ) : ent.website ? (
                        <a
                          href={ent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer inline-flex border ${
                            isDarkMode
                              ? 'bg-amber-500/10 border-amber-400/40 hover:bg-amber-500 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] backdrop-blur-md text-amber-100 hover:text-white'
                              : 'bg-gradient-to-r from-amber-600 to-orange-500 shadow-md border-transparent text-white hover:from-amber-500 hover:to-orange-400'
                          }`}
                        >
                          <span>Visit Official Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <CheckCircle2 className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* VIEW 4: 100VH FULL-SCREEN 3-SECTION CINEMATIC LAUNCHER STAGE */}
        {/* ========================================================================= */}
        {internalTab === 'gallery' && (
          <div className="w-full min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] flex flex-col justify-center animate-fadeIn py-2 sm:py-4">
            {/* Inline CSS Keyframe Animations for Golden Shimmer & Pulsing Glow Aura */}
            <style>{`
              @keyframes goldShimmer {
                0% { transform: translateX(-100%) rotate(25deg); }
                100% { transform: translateX(250%) rotate(25deg); }
              }
              @keyframes pulseGlowAura {
                0%, 100% {
                  box-shadow: 0 0 25px rgba(245,158,11,0.65), 0 0 50px rgba(239,68,68,0.45), 0 0 75px rgba(245,158,11,0.25);
                }
                50% {
                  box-shadow: 0 0 50px rgba(245,158,11,0.95), 0 0 90px rgba(239,68,68,0.75), 0 0 130px rgba(245,158,11,0.5);
                }
              }
              .animate-gold-shimmer-bar {
                animation: goldShimmer 3s infinite linear;
              }
              .animate-pulse-glow-aura {
                animation: pulseGlowAura 2.5s infinite ease-in-out;
              }
            `}</style>

            {/* FULL SCREEN 3-SECTION CONTAINER CARD */}
            <div className="w-full rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#160618] to-[#6b0920] text-white border-2 border-amber-500/50 shadow-[0_25px_60px_-15px_rgba(151,18,55,0.6)] flex flex-col justify-center">
              
              {/* Dynamic Ambient Background Light Orbs */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

              {/* 3-SECTION GRID LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10 my-auto">

                {/* ========================================================================= */}
                {/* SECTION 1 (LEFT - 4 COLS): Photo of Girish Sir holding mirror slices */}
                {/* ========================================================================= */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3 group/imgcard">
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-3xl p-2.5 bg-gradient-to-b from-amber-500/40 via-red-600/20 to-slate-900 border border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)] backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-amber-400 hover:shadow-[0_0_60px_rgba(245,158,11,0.4)]">
                    
                    {/* Glowing Accent Ring */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-red-500/10 pointer-events-none" />

                    {/* Image Element - dynamic hero portrait for Dark & Light modes */}
                    <div className="relative aspect-[791/1024] w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                      <img
                        src={isDarkMode ? "/assets/girish_memorial/girish_portrait_neon_dark.jpg" : "/assets/girish_memorial/girish_portrait_cream_light.jpg"}
                        alt="Late Mr. Girish Dattatray Sodmise Executive Portrait"
                        className="w-full h-full object-cover object-top rounded-2xl group-hover/imgcard:scale-105 transition-all duration-700 filter drop-shadow-2xl"
                      />
                      
                      {/* Sub-badge over image bottom */}
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-amber-400/40 shadow-xl flex items-center justify-between text-left">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                            <span>FOUNDER & VISIONARY</span>
                          </div>
                          <div className="text-xs font-bold text-white tracking-tight">
                            Girish Dattatray Sodmise
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                          1999–2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* SECTION 2 (MIDDLE - 5 COLS): 150 Words Tribute on Girish Sir */}
                {/* ========================================================================= */}
                <div className="lg:col-span-5 space-y-4 text-left flex flex-col justify-center">
                  
                  {/* Top Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500/20 via-red-950/80 to-amber-500/20 text-amber-300 border border-amber-400/40 shadow-lg shrink-0 w-fit">
                    <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                    <span>THE VISIONARY LEGACY</span>
                  </div>

                  {/* Title & Subheading */}
                  <div className="space-y-1">
                    <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
                      Late Mr. <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">Girish Sodmise</span>
                    </h2>
                    <div className="text-xs sm:text-sm font-extrabold text-amber-400/90 tracking-wide flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>15 March 1999 — 21 June 2026 • Eternal Impact</span>
                    </div>
                  </div>

                  {/* ~150 Words Inspiring Biography Text */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-md shadow-xl text-xs sm:text-sm leading-relaxed text-slate-200 font-sans space-y-3">
                    <p>
                      Late Mr. Girish Dattatray Sodmise (15 March 1999 – 21 June 2026) was an extraordinary visionary, technology innovator, and compassionate business leader whose inspiring legacy transcends boundaries. Beginning his journey at <strong className="text-amber-300 font-bold">New Era High School, Panchgani</strong> and earning his B.Tech in Engineering from <strong className="text-amber-300 font-bold">VIT Pune</strong>, Girish demonstrated rare maturity and foresight from a young age.
                    </p>
                    <p>
                      By age 22, he achieved corporate distinction at <strong className="text-amber-300 font-bold">TIAA</strong> as the youngest leader managing over 60 experienced professionals. Driven by unyielding ambition, he founded <strong className="text-amber-300 font-bold">Gsinfotechvis Pvt Ltd</strong> at 24, expanding into <strong className="text-amber-300 font-bold">Gsinfotechvis Global USA</strong> and <strong className="text-amber-300 font-bold">GILS Global Dubai</strong>.
                    </p>
                    <p>
                      A pioneer in empowerment, he launched <strong className="text-amber-300 font-bold">Talentic360.AI</strong> to connect education with career development, and conceptualized <strong className="text-amber-300 font-bold">Give Smile NGO</strong> to uplift underprivileged youth. His life remains an enduring symbol of dedication, leadership, and transformational social impact.
                    </p>
                  </div>

                  {/* Key Highlights Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                      ⚡ Youngest TIAA Leader at 22
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                      🌐 Gsinfotechvis USA & Dubai
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                      🤖 Talentic360.AI EdTech
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                      ❤️ Give Smile NGO Founder
                    </span>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* SECTION 3 (RIGHT - 3 COLS): ULTRA-COOL HIGH-TECH PORTAL CONTROL PANEL */}
                {/* ========================================================================= */}
                <div className="lg:col-span-3 flex flex-col items-center justify-between p-6 sm:p-7 rounded-3xl bg-slate-950/85 border-2 border-amber-500/50 backdrop-blur-2xl shadow-[0_20px_50px_rgba(151,18,55,0.4)] text-center relative overflow-hidden group min-h-[460px]">
                  
                  {/* Rotating Neon Arc Gradient Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18),transparent_70%)] pointer-events-none" />
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-all pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-600/25 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Status Badge & Pulsing Radar Dot */}
                  <div className="space-y-2 relative z-10 w-full">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/50 text-[10px] font-black uppercase tracking-widest text-amber-300 shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                      </span>
                      <span>CINEMATIC SAGA DECK</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                      Explore Girish's Life
                    </h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed max-w-xs mx-auto font-sans">
                      An epic visual chronicle celebrating the life, global vision, and unstoppable spirit of Girish Sir.
                    </p>
                  </div>

                  {/* MAIN ULTRA-COOL CTA BUTTON */}
                  <div className="w-full relative z-10 my-4 space-y-3">
                    <button
                      onClick={() => setIsFullDeckOpen(true)}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse-glow-aura hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-amber-200 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                      title="Explore Girish's Life 3D Cinematic Experience"
                    >
                      {/* Animated Shimmer Bar overlay */}
                      <div className="absolute inset-0 w-1/3 bg-white/40 skew-x-12 animate-gold-shimmer-bar pointer-events-none" />

                      <Flame className="w-5 h-5 fill-slate-950 text-slate-950 group-hover/btn:rotate-90 transition-transform duration-500" />
                      <span className="tracking-wide text-sm sm:text-base font-black uppercase">Explore Girish's Life</span>
                      <ArrowRight className="w-5 h-5 stroke-[3] group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </button>

                    <div className="text-[10px] font-extrabold text-amber-300/80 uppercase tracking-widest animate-pulse">
                      ✦ Tap Button to Enter Full Screen ✦
                    </div>
                  </div>

                  {/* ULTRA-COOL SPEC CARDS */}
                  <div className="w-full relative z-10 grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 backdrop-blur-md text-left flex flex-col justify-between group/spec hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-black text-amber-400">
                        <span>JOURNEY</span>
                        <Film className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-xs font-black text-white mt-1">73+ Photos</div>
                      <div className="text-[9px] text-slate-400">Iconic Moments</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 backdrop-blur-md text-left flex flex-col justify-between group/spec hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-black text-amber-400">
                        <span>CHAPTERS</span>
                        <Compass className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-xs font-black text-white mt-1">1999 — 2026</div>
                      <div className="text-[9px] text-slate-400">Milestone Saga</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 backdrop-blur-md text-left flex flex-col justify-between group/spec hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-black text-amber-400">
                        <span>CHRONICLES</span>
                        <Layers className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-xs font-black text-white mt-1">Cinematic Deck</div>
                      <div className="text-[9px] text-slate-400">Interactive Story</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 backdrop-blur-md text-left flex flex-col justify-between group/spec hover:border-amber-400 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-black text-amber-400">
                        <span>HERITAGE</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="text-xs font-black text-white mt-1">Global Impact</div>
                      <div className="text-[9px] text-slate-400">Eternal Spirit</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* FULL OFFICIAL BIOGRAPHY LIGHTBOX MODAL */}
      {bioModalOpen && (
        <div 
          onClick={() => setBioModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-4xl w-full max-h-[90vh] border rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-10 space-y-6 select-text transition-colors ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <button
              onClick={() => setBioModalOpen(false)}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors z-20 ${
                isDarkMode ? 'bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white' : 'bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner */}
            <div className={`border-b pb-4 space-y-2 transition-colors ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest ${
                isDarkMode ? 'bg-red-950/80 text-red-400 border-red-800' : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                <Flame className="w-3.5 h-3.5" />
                <span>Official Biography Chronicle</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-black font-serif ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Late Mr. Girish Dattatray Sodmise
              </h2>
              <div className="text-xs font-bold text-red-600 tracking-wider uppercase">
                15 March 1999 — 21 June 2026 • Entrepreneur, Technology Professional & Visionary Leader
              </div>
            </div>

            {/* Document Content */}
            <div className={`space-y-4 text-xs sm:text-sm leading-relaxed font-sans ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <p className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
                <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Late Mr. Girish Dattatray Sodmise (15 March 1999 – 21 June 2026)</strong> was an entrepreneur, technology professional, and visionary business leader whose work spanned information technology, workforce solutions, overseas manpower, digital services, and educational technology.
              </p>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <GraduationCap className="w-4 h-4 text-red-600" />
                  <span>Academic Excellence & Formative Years</span>
                </h4>
                <p>
                  Girish completed his schooling at <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>New Era High School, Panchgani</strong>, and later pursued a <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Bachelor of Technology (B.Tech)</strong> from <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Vishwakarma Institute of Technology (VIT), Pune</strong>. His sharp analytical capability, technical discipline, and natural leadership set him apart from an early age.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Briefcase className="w-4 h-4 text-red-600" />
                  <span>Corporate Stewardship at TIAA (Age 22)</span>
                </h4>
                <p>
                  At the age of 22, he began his professional journey with global financial services giant <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>TIAA</strong>, where his leadership capabilities quickly set him apart. Despite being one of the youngest professionals in his role, he successfully led a team of <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>nearly 60 employees</strong>, a responsibility he carried with immense pride and dedication.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Globe className="w-4 h-4 text-red-600" />
                  <span>Founding Gsinfotechvis & USA Expansion (Age 24)</span>
                </h4>
                <p>
                  Driven by a desire to build solutions of his own, Girish took a bold step at the age of 24 by leaving his full-time corporate career to pursue entrepreneurship. This vision led to the establishment of <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Gsinfotechvis Pvt. Ltd. in 2021</strong>, a company focused on delivering IT services, digital solutions, staffing, recruitment, consulting, and emerging technology services. Under his leadership, Gsinfotechvis expanded beyond India and established its international presence through <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Gsinfotechvis Global LLC, USA</strong>, enabling the organization to serve clients across global markets and strengthen international IT recruitment capabilities.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span>Girish Group Ecosystem & GILS Global LLC Dubai (UAE)</span>
                </h4>
                <p>
                  Alongside building Gsinfotechvis, Girish played a pivotal role in managing and strengthening the businesses operating under the <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Girish Group ecosystem</strong>. He contributed significantly to the growth of <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>GILS Pvt. Ltd.</strong>, helping expand its workforce solutions from domestic manpower services into overseas manpower deployment and international recruitment. Further strengthening the organization’s global presence, he also established <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>GILS Global LLC, Dubai</strong>, creating new opportunities for international workforce solutions and cross-border business expansion.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Cpu className="w-4 h-4 text-red-600" />
                  <span>AI & EdTech Innovation — Talentic360.AI</span>
                </h4>
                <p>
                  Passionate about the transformative power of education and technology, he founded <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Talentic360.AI</strong>, an AI-powered educational and workforce development platform created to support students and institutions through technology-driven learning and career development solutions. From conceptualization and product planning to platform development and execution, he remained deeply involved in bringing the vision to life.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <h4 className={`font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Heart className="w-4 h-4 text-red-600" />
                  <span>Give Smile NGO Philanthropic Vision</span>
                </h4>
                <p>
                  Despite achieving professional success at a young age, Girish believed that true growth carried a responsibility to give back to society. Inspired by this belief, he envisioned <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Give Smile NGO</strong>, an initiative dedicated to creating meaningful social impact through education, community development, skill enhancement, healthcare support, and opportunities for those in need. The organization reflects his conviction that <em>success becomes meaningful when it is shared with others</em>.
                </p>
              </div>

              {/* Personal Attributes & Famous Quote */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-900 to-slate-900 text-white space-y-3 shadow-lg">
                <h4 className="font-extrabold uppercase tracking-widest text-amber-300 text-xs">
                  Personal Tribute & Guiding Principle
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Those who knew Girish remember him not only as an entrepreneur and leader, but also as a <strong>devoted son, caring brother, loving husband, mentor, and a dedicated friend</strong>. His vision lives on through the organizations he built, the lives he touched, and the countless dreams he encouraged others to pursue.
                </p>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-base font-extrabold italic text-amber-300 font-serif">
                    "Investment of time, 100% effort, dedication and consistency"
                  </p>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">— Late Mr. Girish Dattatray Sodmise</span>
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t flex justify-end transition-colors ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                onClick={() => setBioModalOpen(false)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  isDarkMode ? 'bg-slate-800 text-white hover:bg-red-600' : 'bg-slate-900 text-white hover:bg-red-600'
                }`}
              >
                Close Biography
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LUXURY 3D PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none overflow-hidden"
        >
          {/* Top Bar Header */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-3 px-2 z-30 shrink-0"
          >
            <div className="space-y-0.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800/60">
                  {selectedPhoto.categoryLabel} • {selectedPhoto.year}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-amber-300 font-serif line-clamp-1">
                {selectedPhoto.title}
              </h3>
            </div>

            {/* Counter & Close Button */}
            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border shadow-md transition-colors ${
                isLastLightboxPhoto
                  ? 'bg-red-950/80 text-amber-300 border-red-700/80'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}>
                {isLastLightboxPhoto
                  ? `End of Section (${currentLightboxIdx + 1}/${currentLightboxPhotos.length})`
                  : `${currentLightboxIdx + 1} / ${currentLightboxPhotos.length}`}
              </span>
              <button
                onClick={() => { setSelectedPhoto(null); setLightboxNotice(null); }}
                className="p-2.5 rounded-full bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-lg hover:scale-110"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Animated Status Notice Banner */}
          {lightboxNotice && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
              <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-amber-300 font-black text-xs shadow-2xl border border-red-500/60 backdrop-blur-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>{lightboxNotice}</span>
              </div>
            </div>
          )}

          {/* Main 3D Stage Photo/Video Display Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex-1 w-full h-full flex items-center justify-center relative my-2 min-h-0 overflow-hidden"
          >
            {/* Left Chevron Button */}
            <button
              onClick={handlePrevPhoto}
              disabled={isFirstLightboxPhoto}
              className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl border backdrop-blur-md shadow-2xl transition-all z-40 ${
                isFirstLightboxPhoto
                  ? 'bg-slate-900/40 text-slate-600 border-slate-800/60 cursor-not-allowed opacity-40'
                  : 'bg-slate-900/90 hover:bg-red-600 text-white border-slate-700/80 cursor-pointer hover:scale-110'
              }`}
              title={isFirstLightboxPhoto ? "Beginning of section — Unable to move previous" : "Previous Item (←)"}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* 3D Stage: 5-Photo Cover Flow Cluster */}
            <div className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto">
              {[-2, -1, 0, 1, 2].map((offset) => {
                const totalPhotos = currentLightboxPhotos.length;
                if (totalPhotos === 0) return null;

                const targetIdx = currentLightboxIdx + offset;
                if (targetIdx < 0 || targetIdx >= totalPhotos) return null;

                const photo = currentLightboxPhotos[targetIdx];
                if (!photo) return null;

                const isMain = offset === 0;
                const isNearLeft = offset === -1;
                const isNearRight = offset === 1;
                const isFarLeft = offset === -2;
                const isFarRight = offset === 2;

                let positionClasses = '';
                let imageMaxStyle = '';

                if (isMain) {
                  positionClasses = 'z-30 scale-100 opacity-100 shadow-[0_0_60px_rgba(239,68,68,0.35)] border-2 border-red-500/80 ring-4 ring-red-500/20 rounded-2xl relative';
                  imageMaxStyle = 'max-h-[74vh] max-w-[85vw] sm:max-w-[55vw] lg:max-w-[45vw]';
                } else if (isNearLeft) {
                  positionClasses = 'z-20 scale-[0.85] opacity-75 hover:opacity-100 border border-slate-700/80 brightness-75 hover:brightness-100 cursor-pointer hidden sm:flex absolute left-[14%] lg:left-[20%] -translate-x-1/2 transition-all duration-500 rounded-2xl hover:scale-[0.88] shadow-2xl';
                  imageMaxStyle = 'max-h-[60vh] max-w-[32vw] sm:max-w-[25vw]';
                } else if (isNearRight) {
                  positionClasses = 'z-20 scale-[0.85] opacity-75 hover:opacity-100 border border-slate-700/80 brightness-75 hover:brightness-100 cursor-pointer hidden sm:flex absolute right-[14%] lg:right-[20%] translate-x-1/2 transition-all duration-500 rounded-2xl hover:scale-[0.88] shadow-2xl';
                  imageMaxStyle = 'max-h-[60vh] max-w-[32vw] sm:max-w-[25vw]';
                } else if (isFarLeft) {
                  positionClasses = 'z-10 scale-[0.68] opacity-40 hover:opacity-80 border border-slate-800 brightness-50 hover:brightness-90 cursor-pointer hidden lg:flex absolute left-[3%] lg:left-[7%] -translate-x-1/2 transition-all duration-500 rounded-xl hover:scale-[0.72] shadow-xl';
                  imageMaxStyle = 'max-h-[46vh] max-w-[20vw] lg:max-w-[15vw]';
                } else if (isFarRight) {
                  positionClasses = 'z-10 scale-[0.68] opacity-40 hover:opacity-80 border border-slate-800 brightness-50 hover:brightness-90 cursor-pointer hidden lg:flex absolute right-[3%] lg:right-[7%] translate-x-1/2 transition-all duration-500 rounded-xl hover:scale-[0.72] shadow-xl';
                  imageMaxStyle = 'max-h-[46vh] max-w-[20vw] lg:max-w-[15vw]';
                }

                return (
                  <div
                    key={`${photo.id}-${offset}`}
                    onClick={() => {
                      if (!isMain) setSelectedPhoto(photo);
                    }}
                    className={`flex items-center justify-center transition-all duration-500 ease-out overflow-hidden bg-slate-950 ${positionClasses}`}
                  >
                    {(photo.isVideo || (typeof photo.src === 'string' && (photo.src.toLowerCase().endsWith('.mp4') || photo.src.toLowerCase().endsWith('.mov') || photo.src.toLowerCase().includes('vid-')))) ? (
                      <video
                        src={photo.src}
                        controls={isMain}
                        autoPlay={isMain}
                        playsInline
                        className={`object-contain transition-all duration-500 rounded-2xl ${imageMaxStyle}`}
                      />
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.title}
                        style={isMain ? {
                          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)',
                          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)'
                        } : {}}
                        className={`object-contain transition-all duration-500 rounded-2xl ${imageMaxStyle}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={handleNextPhoto}
              disabled={isLastLightboxPhoto}
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl border backdrop-blur-md shadow-2xl transition-all z-40 ${
                isLastLightboxPhoto
                  ? 'bg-slate-900/40 text-slate-600 border-slate-800/60 cursor-not-allowed opacity-40'
                  : 'bg-slate-900/90 hover:bg-red-600 text-white border-slate-700/80 cursor-pointer hover:scale-110'
              }`}
              title={isLastLightboxPhoto ? "End of section — Unable to move next" : "Next Item (→)"}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip & Description */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="space-y-3 z-30 shrink-0 border-t border-slate-800/80 pt-3"
          >
            <div className="text-center text-xs text-slate-400 font-sans max-w-2xl mx-auto line-clamp-1 px-4">
              {selectedPhoto.desc}
            </div>

            {/* Horizontal Scrollable Thumbnail Selector */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full px-4 scrollbar-thin">
              {currentLightboxPhotos.map((p) => {
                const isActive = p.id === selectedPhoto.id || p.src === selectedPhoto.src;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPhoto(p)}
                    className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      isActive 
                        ? 'border-red-500 scale-110 shadow-lg shadow-red-600/50 ring-2 ring-red-500/50 opacity-100' 
                        : 'border-slate-800 opacity-40 hover:opacity-100 hover:border-slate-600'
                    }`}
                  >
                    {(p.isVideo || (typeof p.src === 'string' && (p.src.toLowerCase().endsWith('.mp4') || p.src.toLowerCase().endsWith('.mov') || p.src.toLowerCase().includes('vid-')))) ? (
                      <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                        <video src={`${p.src}#t=0.5`} className="w-full h-full object-cover" muted preload="metadata" />
                        <Film className="w-3.5 h-3.5 text-red-500 absolute" />
                      </div>
                    ) : (
                      <img src={p.src} alt={p.title} className="w-full h-full object-cover object-top" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3D CINEMATIC SCROLL PORTAL MODAL */}
      <Cinematic3DScrollPortal isOpen={is3DScrollPortalOpen} onClose={() => setIs3DScrollPortalOpen(false)} />

      {/* 50/50 SPLIT SCREEN STORYLINE PAGE MODAL */}
      <CinematicSplitStoryPage isOpen={isSplitStoryOpen} onClose={() => setIsSplitStoryOpen(false)} />

      {/* 100VH CINEMATIC FULL PAGE SLIDE DECK MODAL */}
      <CinematicFullPageDeck isOpen={isFullDeckOpen} onClose={() => setIsFullDeckOpen(false)} />

      {/* FOOTER */}
      <footer className={`border-t py-8 text-center space-y-2 transition-colors ${
        isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-200 bg-white text-slate-900'
      }`}>
        <div className={`flex items-center justify-center gap-2 text-xs font-bold ${
          isDarkMode ? 'text-slate-200' : 'text-slate-800'
        }`}>
          <Flame className="w-4 h-4 text-red-600" />
          <span>Late Mr. Girish Dattatray Sodmise Leadership & Portfolio Vault (1999 — 2026)</span>
        </div>
        <p className={`text-xs ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Gsinfotechvis Pvt Ltd • Gsinfotechvis Global LLC (USA) • GILS Pvt Ltd • GILS Global LLC (Dubai) • Talentic360.AI LLP • Give Smile NGO
        </p>
      </footer>
    </div>
  );
}
