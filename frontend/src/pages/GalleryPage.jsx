import React, { useState, useEffect, useRef } from 'react';
import Card3D from '../components/Card3D';
import CinematicParallaxFilmstrip from '../components/CinematicParallaxFilmstrip';
import { 
  Image as ImageIcon, 
  Play, 
  Film, 
  X, 
  Sparkles, 
  Filter, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Maximize2,
  Layers,
  Grid,
  Video as VideoIcon,
  Utensils,
  Newspaper,
  GraduationCap,
  Flag,
  Check,
  FolderOpen,
  Gift,
  Lock,
  Clock,
  Flame,
  Radio,
  Heart
} from 'lucide-react';
import { AUG_26_GALLERY_ITEMS } from '../data/ngoData';

// Legacy Video Archive
const LEGACY_VIDEOS = [
  {
    id: 'zp-1',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'Baramati ZP School Uniform & Desk Distribution Drive (Part 1)',
    subtitle: 'On-Ground Zilla Parishad Classroom Infrastructure Handover',
    url: '/assets/videos/video-zp1.mp4',
    poster: '/assets/zp/zp-1.jpeg',
    duration: '3:14',
    category: 'ZP School Infrastructure'
  },
  {
    id: 'zp-2',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'ZP School Classroom Benches & Dignity Kit Handover (Part 2)',
    subtitle: 'Equipping Rural School Students with Benches & Educational Kits',
    url: '/assets/videos/video-zp2.mp4',
    poster: '/assets/zp/zp-2.jpeg',
    duration: '1:45',
    category: 'ZP School Infrastructure'
  },
  {
    id: 'zp-3',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'ZP School On-Ground Student Joy & Impact Footage (Part 3)',
    subtitle: 'Restoring Student Dignity & Excitement in Rural Classrooms',
    url: '/assets/videos/video-zp3.mp4',
    poster: '/assets/zp/zp-3.jpeg',
    duration: '3:14',
    category: 'ZP School Infrastructure'
  },
  {
    id: 'zp-4',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'Baramati Rural School Field Outreach & Verification (Part 4)',
    subtitle: 'Direct Grassroots Verification Drive with Community Leaders',
    url: '/assets/videos/video-zp4.mp4',
    poster: '/assets/zp/zp-5.jpeg',
    duration: '1:20',
    category: 'ZP School Infrastructure'
  },
  {
    id: 'zp-doc-vid',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'ZP School On-Ground Field Transformation Full Documentary Video',
    subtitle: 'Comprehensive Video Recording of ZP School Desk & Uniform Handover',
    url: '/assets/zp-video.mp4',
    poster: '/assets/zp/zp-students-group.jpg',
    duration: '4:15',
    category: 'ZP School Infrastructure'
  },
  {
    id: 'cartoon-intro-vid',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'Give Smile NGO Animated Mission & Beneficiary Impact Video',
    subtitle: 'Interactive Animated Overview of Foundation Programs & Vision',
    url: '/assets/videos/cartoon-intro.mp4',
    poster: '/assets/videos/cartoon-cover.png',
    duration: '2:10',
    category: 'Foundation Milestones'
  },
  {
    id: 'launch',
    type: 'video',
    date: '24 January 2024',
    fullDate: '24 January 2024',
    title: 'Give Smile NGO Official Launch & Foundation Inauguration',
    subtitle: 'Girish Group of Companies Community Foundation Launch Event',
    url: '/assets/videos/video-launch.mp4',
    poster: '/assets/hero-bg2.jpg',
    duration: '3:14',
    category: 'Foundation Milestones'
  }
];

// Legacy Photo Archive
const LEGACY_PHOTOS = [
  // 23 Sept 2026 Nutrition, Eldercare & Greenery
  { id: 'greenery-1', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/greenery/greenery_01.jpg", title: "Students & Volunteers Sapling Tree Plantation Drive", category: "23 September 2026 Drive" },
  { id: 'greenery-2', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/greenery/greenery_02.jpg", title: "Greener Communities Brighter Futures Garden Plantation", category: "23 September 2026 Drive" },
  { id: 'greenery-3', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/greenery/greenery_03.jpg", title: "Organic Compost & Native Tree Sapling Planting", category: "23 September 2026 Drive" },
  { id: 'greenery-4', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/greenery/greenery_04.jpg", title: "School Children Sapling Watering & Adoption Care", category: "23 September 2026 Drive" },
  { id: 'sep23-1', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM.jpeg", title: "Mid-Day Meal Distribution Drive for School Children", category: "23 September 2026 Drive" },
  { id: 'sep23-2', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (1).jpeg", title: "Students Enjoying Wholesome Nutrition in School Veranda", category: "23 September 2026 Drive" },
  { id: 'sep23-3', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/blogs/WhatsApp Image 2026-09-23 at 7.27.04 PM (2).jpeg", title: "Healthy Children Stronger Tomorrow Meal Station", category: "23 September 2026 Drive" },
  { id: 'sep23-4', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM.jpeg", title: "Free Health Camp for the Elderly - Consultation Desk", category: "23 September 2026 Drive" },
  { id: 'sep23-5', type: 'image', date: '23 September 2026', fullDate: '23 September 2026', url: "/assets/blogs/WhatsApp Image 2026-09-23 at 7.39.35 PM (1).jpeg", title: "Blood Pressure & Health Diagnostic Checkup for Seniors", category: "23 September 2026 Drive" },

  // 19 Aug 2026 Press News Scans & Outbound Outreach
  { id: 'aug19-1', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-rokhathok-front.png", title: "Dainik Rokhathok Vision: Special Page 3 Coverage", category: "19 August 2026 Press" },
  { id: 'aug19-2', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-janmat-front.jpg", title: "Dainik Janmat: Front Page ZP School Adoption Release", category: "19 August 2026 Press" },
  { id: 'aug19-3', type: 'image', date: '18 August 2026', fullDate: '18 August 2026', url: "/assets/press/press-sthairya-social.png", title: "Dainik Sthairya: Breaking Feature Coverage", category: "19 August 2026 Press" },
  { id: 'aug19-4', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-somthali.jpg", title: "Somthali ZP School Nameplate Unveiling Ceremony", category: "19 August 2026 Press" },
  { id: 'press-1-img', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-1.jpeg", title: "Somthali ZP School Adoption Community Gathering & Press Drive", category: "19 August 2026 Press" },
  { id: 'press-2-img', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-2.jpeg", title: "On-Ground Community Tree Plantation & Environmental Leadership", category: "19 August 2026 Press" },
  { id: 'press-3-img', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-3.jpeg", title: "Digital E-Learning & Interactive Classroom Mentorship", category: "19 August 2026 Press" },
  { id: 'press-4-img', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-4.jpeg", title: "Rural Community Leaders & Grassroots Volunteers Assembly", category: "19 August 2026 Press" },
  { id: 'press-5-img', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/press/press-5.jpeg", title: "Baramati ZP Education Upliftment & Dignity Handover", category: "19 August 2026 Press" },

  // 15 August 2026 Independence Day Drive
  { id: 'aug15-1', type: 'image', date: '15 August 2026', fullDate: '15 August 2026', url: "/assets/aug15/aug15-1.jpg", title: "Somthali ZP School 15th August Swatantryadin Ceremony", category: "15 August 2026 Drive" },
  { id: 'aug15-2', type: 'image', date: '15 August 2026', fullDate: '15 August 2026', url: "/assets/aug15/aug15-2.jpg", title: "Somthali Water Tank Community Village Gathering", category: "15 August 2026 Drive" },
  { id: 'aug15-3', type: 'image', date: '15 August 2026', fullDate: '15 August 2026', url: "/assets/aug15/aug15-3.jpg", title: "Baramati Rural Community 15th August Celebration", category: "15 August 2026 Drive" },
  { id: 'aug15-4', type: 'image', date: '15 August 2026', fullDate: '15 August 2026', url: "/assets/aug15/aug15-4.jpg", title: "ZP Primary School Students Cultural Drill Performance", category: "15 August 2026 Drive" },

  // ZP School Infrastructure & Event Photo Vault
  { id: 'zp-img-1', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-students-group.jpg", title: "Baramati ZP School Student & Bench Handover", category: "ZP School Infrastructure" },
  { id: 'zp-img-2', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-event-26.jpg", title: "ZP Primary School Education Upliftment Event", category: "ZP School Infrastructure" },
  { id: 'zp-img-3', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-1.jpeg", title: "ZP Primary School Desk-Bench Classroom Distribution", category: "ZP School Infrastructure" },
  { id: 'zp-img-4', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-2.jpeg", title: "Uniform Kit & Educational Stationery Distribution", category: "ZP School Infrastructure" },
  { id: 'zp-img-5', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-3.jpeg", title: "Interactive E-Learning Board Handover to ZP Teachers", category: "ZP School Infrastructure" },
  { id: 'zp-img-6', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-4.jpeg", title: "Student Dignity Kit & Learning Supplies Presentation", category: "ZP School Infrastructure" },
  { id: 'zp-img-7', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-5.jpeg", title: "Somthali ZP Primary School Courtyard Assembly", category: "ZP School Infrastructure" },
  { id: 'zp-img-8', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-6.jpeg", title: "Classroom Solar Panel Installation & Electrical Inspection", category: "ZP School Infrastructure" },
  { id: 'zp-img-9', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/zp/zp-7.jpeg", title: "Community Field Verification & School Facilities Tour", category: "ZP School Infrastructure" },

  // Field Engagements & Events
  { id: 'event-img-1', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/events/event-1.jpeg", title: "Rural Community Health & Educational Outreach Station", category: "Field Engagements" },
  { id: 'event-img-2', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/events/event-2.jpeg", title: "Student Uniform Distribution & Dignity Kit Drive", category: "Field Engagements" },
  { id: 'event-img-3', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/events/event-3.jpeg", title: "Generational Eldercare & Senior Companion Health Camp", category: "Field Engagements" },
  { id: 'event-img-4', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/events/event-4.jpeg", title: "Youth Mentorship & Girl Child Empowerment Workshop", category: "Field Engagements" },

  // Women Vocational Tailoring Photos
  { id: 'women-img-1', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.55 AM.jpeg", title: "Rural Women Vocational Tailoring & Sewing Machine Training", category: "Women Empowerment" },
  { id: 'women-img-2', type: 'image', date: '19 August 2026', fullDate: '19 August 2026', url: "/assets/blogs/WhatsApp Image 2026-08-19 at 8.34.56 AM.jpeg", title: "Artisan Pattern Making & Garment Fabrication Certification", category: "Women Empowerment" },
  { id: 'women-img-3', type: 'image', date: '18 August 2026', fullDate: '18 August 2026', url: "/assets/blogs/imgi_35_IMG-20260818-WA0132.jpg", title: "Micro-Entrepreneurship Machine Handover for Self-Reliance", category: "Women Empowerment" },
  { id: 'women-upskill-img-1', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0112~2.jpg", title: "Rural Women Vocational Tailoring & Skill Incubation Drive", category: "Women Empowerment" },
  { id: 'women-upskill-img-2', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0113~2.jpg", title: "Garment Fabrication & Pattern Machine Training Workshop", category: "Women Empowerment" },
  { id: 'women-upskill-img-3', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0114~2.jpg", title: "Artisan Embroidery & Sewing Machine Practical Session", category: "Women Empowerment" },
  { id: 'women-upskill-img-4', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0117~2.jpg", title: "Women Entrepreneurship & Micro-Business Machine Handover", category: "Women Empowerment" },
  { id: 'women-upskill-img-5', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0118~2.jpg", title: "Self-Reliance Certification & Tailoring Mentorship Assembly", category: "Women Empowerment" },
  { id: 'women-upskill-img-6', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0119.jpg", title: "Community Women Vocational Upskilling Workshop Session A", category: "Women Empowerment" },
  { id: 'women-upskill-img-7', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0119~2.jpg", title: "Community Women Vocational Upskilling Workshop Session B", category: "Women Empowerment" },
  { id: 'women-upskill-img-8', type: 'image', date: '3 October 2026', fullDate: '3 October 2026', url: "/assets/women_upskilling/IMG-20261003-WA0121~2.jpg", title: "Heavy-Duty Tailoring Equipment Handover for Rural Women", category: "Women Empowerment" },

  // Brand & Milestones
  { id: 'mile-1', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/hero-start.jpg", title: "School Infrastructure Ribbon Cutting Inauguration", category: "Foundation Milestones" },
  { id: 'mile-2', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/hero-bg1.jpeg", title: "Give Smile NGO Community Sanctuary Gathering", category: "Foundation Milestones" },
  { id: 'mile-3', type: 'image', date: '24 January 2024', fullDate: '24 January 2024', url: "/assets/in-memory.jpg?v=3", title: "In Loving Memory & Dedicated Inspiration Banner", category: "Foundation Milestones" }
];

// Combine all media into unified date-wise archive
const MASTER_MEDIA_ARCHIVE = [
  ...AUG_26_GALLERY_ITEMS,
  ...LEGACY_PHOTOS,
  ...LEGACY_VIDEOS
];

const EVENT_DRIVE_CATEGORIES = [
  '15oct_upcoming',
  '26 September 2026 Drive',
  '23 September 2026 Drive',
  '19 August 2026 Press',
  '15 August 2026 Drive',
  'ZP School Infrastructure',
  'Field Engagements',
  'Women Empowerment',
  'Foundation Milestones'
];

const EVENT_DRIVES_CONFIG = [
  {
    id: '15oct_upcoming',
    label: '15 October — Celebrating Founder\'s Birthday & Food Carnival (Upcoming 🔒)',
    shortLabel: '15 Oct — Founder Birthday & Food Carnival 🔒',
    icon: Gift,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    isUpcoming: true
  },
  {
    id: '26 September 2026 Drive',
    label: '26 Sept — Student Games & Activity Day',
    shortLabel: '26 Sept — Student Games & Activity Day',
    icon: Calendar,
    color: 'text-[#971237]',
    bgColor: 'bg-rose-500/10'
  }, {
    id: '23 September 2026 Drive',
    label: '23 September — Plantation & School Development Drive',
    shortLabel: '23 Sept — Plantation & School Development',
    icon: Utensils,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  }, {
    id: '19 August 2026 Press',
    label: '19 August — Press & Media Outreach',
    shortLabel: '19 Aug — Press & Media Outreach',
    icon: Newspaper,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  }, {
    id: '15 August 2026 Drive',
    label: '15 August — Independence Day Celebration',
    shortLabel: '15 Aug — Independence Day Celebration',
    icon: Flag,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'ZP School Infrastructure',
    label: '24 January — ZP School Infrastructure & Desks',
    shortLabel: 'ZP School Infrastructure & Desks',
    icon: GraduationCap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'Field Engagements',
    label: 'Field Engagements & On-Ground Outreach',
    shortLabel: 'Field Engagements Outreach',
    icon: Sparkles,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'Women Empowerment',
    label: 'Women Skills & Vocational Tailoring',
    shortLabel: 'Women Vocational Tailoring',
    icon: GraduationCap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'Foundation Milestones',
    label: '24 January — Foundation Milestones',
    shortLabel: 'Foundation Milestones',
    icon: Flag,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  }
];

const CALENDAR_ARCHIVE_TREE = [
  {
    year: '2026',
    label: '2026 Drives & Events Archive',
    totalItems: 48,
    months: [
      {
        monthName: 'October 2026',
        shortMonth: 'Oct 2026',
        events: [
          {
            id: '15oct_upcoming',
            dateDisplay: '15 Oct',
            title: "15 October — Celebrating Founder's Birthday & Food Carnival",
            desc: "Founder's Birthday, Food Carnival, Heartiest Charity Drive & Celebration for Kids",
            itemCount: '🔒 UPCOMING',
            isUpcoming: true,
            icon: Gift,
            dots: [
              { color: 'bg-amber-500', name: 'Founder Birthday' },
              { color: 'bg-emerald-500', name: 'Food Carnival' },
              { color: 'bg-rose-500', name: 'Charity Drive' }
            ]
          }
        ]
      },
      {
        monthName: 'September 2026',
          shortMonth: 'Sept 2026',
          events: [
            {
              id: '26 September 2026 Drive',
              dateDisplay: '26 Sept',
              title: '26 September � Student Games & Activity Day',
              desc: 'Somthali ZP School Desk Handover, Student Games & Activity Day',
              itemCount: 35,
              icon: Calendar,
              dots: [
                { color: 'bg-purple-500', name: 'ZP Education' },
                { color: 'bg-emerald-500', name: 'Greenery Plantation' }
              ]
            },
            {
              id: '23 September 2026 Drive',
              dateDisplay: '23 Sept',
              title: '23 September � Plantation & School Development Drive',
              desc: 'Tree Plantation, Mid-Day Meals & Eldercare Diagnostic Camp',
              itemCount: 5,
              icon: Utensils,
              dots: [
                { color: 'bg-emerald-500', name: 'Plantation & Nutrition' },
                { color: 'bg-rose-500', name: 'Eldercare Health' }
              ]
            }
          ]
        },
        {
          monthName: 'August 2026',
        shortMonth: 'Aug 2026',
        events: [
          {
            id: '19 August 2026 Press',
            dateDisplay: '19 Aug',
            title: '19 August — Press & Media Outreach',
            desc: 'Dainik Rokhathok Vision & Janmat Front Page News Outreach',
            itemCount: 4,
            icon: Newspaper,
            dots: [
              { color: 'bg-blue-500', name: 'Press Coverage' }
            ]
          },
          {
            id: '15 August 2026 Drive',
            dateDisplay: '15 Aug',
            title: '15 August — Independence Day Celebration',
            desc: 'Somthali ZP School Swatantryadin Ceremony & Student Parade',
            itemCount: 4,
            icon: Flag,
            dots: [
              { color: 'bg-amber-500', name: 'Independence Day' }
            ]
          }
        ]
      }
    ]
  },
  {
    year: '2024',
    label: '2024 Launch Archive',
    totalItems: 11,
    months: [
      {
        monthName: 'January 2024',
        shortMonth: 'Jan 2024',
        events: [
          {
            id: 'ZP School Infrastructure',
            dateDisplay: '24 Jan',
            title: '24 January — ZP School Infrastructure & Desks',
            desc: 'Baramati ZP School Benches & Uniform Kits Handover',
            itemCount: 6,
            icon: GraduationCap,
            dots: [
              { color: 'bg-purple-500', name: 'ZP Education' }
            ]
          },
          {
            id: 'Foundation Milestones',
            dateDisplay: '24 Jan',
            title: '24 January — Foundation Milestones',
            desc: 'Give Smile NGO Inauguration & Sanctuary Gathering',
            itemCount: 5,
            icon: Flag,
            dots: [
              { color: 'bg-amber-500', name: 'Foundation Milestones' }
            ]
          }
        ]
      }
    ]
  }
];

export default function GalleryPage({ onOpenVideo, theme = "dark" }) {
  const [selectedFilter, setSelectedFilter] = useState(() => sessionStorage.getItem('ngo_gallery_filter') || '26 September 2026 Drive');
  const [layoutMode, setLayoutMode] = useState('masonry'); // 'masonry' or 'grid'
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isDriveDropdownOpen, setIsDriveDropdownOpen] = useState(false);
  const [expandedYears, setExpandedYears] = useState(() => {
    const initFilter = sessionStorage.getItem('ngo_gallery_filter') || '26 September 2026 Drive';
    const foundYear = CALENDAR_ARCHIVE_TREE.find(y => y.months.some(m => m.events.some(e => e.id === initFilter)));
    return foundYear ? [foundYear.year] : ['2026'];
  });
  const [expandedMonths, setExpandedMonths] = useState(() => {
    const initFilter = sessionStorage.getItem('ngo_gallery_filter') || '26 September 2026 Drive';
    for (const y of CALENDAR_ARCHIVE_TREE) {
      const foundMonth = y.months.find(m => m.events.some(e => e.id === initFilter));
      if (foundMonth) return [foundMonth.monthName];
    }
    return ['September 2026'];
  }); // Collapsible month accordions

  const filmstripRef = useRef(null);
  const driveDropdownRef = useRef(null);
  const isLight = theme === 'light';

  const toggleYearExpand = (yearStr) => {
    setExpandedYears(prev => prev.includes(yearStr) ? [] : [yearStr]);
  };

  const toggleMonthExpand = (monthName) => {
    setExpandedMonths(prev => prev.includes(monthName) ? [] : [monthName]);
  };

  // Close custom drive dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (driveDropdownRef.current && !driveDropdownRef.current.contains(event.target)) {
        setIsDriveDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter media based on selection & enforce 100% unique 1-for-1 URLs (no duplicate news scans or photos)
  const filteredMedia = MASTER_MEDIA_ARCHIVE
    .filter((item) => {
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Photos') return item.type === 'image';
      if (selectedFilter === 'Videos') return item.type === 'video';
      return item.category === selectedFilter;
    })
    .filter((item, index, self) => index === self.findIndex((t) => t.url === item.url));

  // Fullscreen Lightbox keyboard shortcuts & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredMedia.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredMedia.length]);

  // Scroll active filmstrip thumbnail into view
  useEffect(() => {
    if (lightboxIndex !== null && filmstripRef.current) {
      const activeEl = filmstripRef.current.children[lightboxIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [lightboxIndex]);

  const currentItem = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  // Dynamically calculate grid and masonry columns to prevent dangling whitespace for 2 or 4 item sets
  let masonryCols = "columns-1 sm:columns-2 lg:columns-3";
  let masonryMaxWidth = "w-full";
  if (filteredMedia.length === 1) {
    masonryCols = "columns-1";
    masonryMaxWidth = "max-w-2xl mx-auto";
  } else if (filteredMedia.length === 2) {
    masonryCols = "columns-1 sm:columns-2";
    masonryMaxWidth = "max-w-4xl mx-auto";
  } else if (filteredMedia.length === 4) {
    masonryCols = "columns-1 sm:columns-2 lg:columns-2";
    masonryMaxWidth = "max-w-5xl mx-auto";
  }

  let gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  let gridMaxWidth = "w-full";
  if (filteredMedia.length === 1) {
    gridCols = "grid-cols-1";
    gridMaxWidth = "max-w-2xl mx-auto";
  } else if (filteredMedia.length === 2) {
    gridCols = "grid-cols-1 sm:grid-cols-2";
    gridMaxWidth = "max-w-4xl mx-auto";
  } else if (filteredMedia.length === 4) {
    gridCols = "grid-cols-1 sm:grid-cols-2";
    gridMaxWidth = "max-w-5xl mx-auto";
  }

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-6 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Ambient Light Bulb Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header Title & Date Info */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <ImageIcon className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Field Engagements • Official Photo & Video Archive</span>
          </div>

          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Field Engagements{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Photo & Video Vault
            </span>
          </h1>

          <p className={`text-xs sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Explore high-definition photo documentation, press release news cuttings, inaugural ZP school ceremonies, tree plantation drives, and video recordings. All on-ground field media is safely preserved here under <strong>Field Engagements</strong>. Click any media item to enter <strong>Fullscreen Viewer Mode with Filmstrip Navigation</strong>.
          </p>
        </div>

        {/* ORGANIZED FILTER BAR: QUICK TYPE PILLS + EVENT DRIVES DROPDOWN */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-700/40">
            
            {/* Quick Type Pills + Event Drive Dropdown */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* All Media Pill */}
              <button
                onClick={() => setSelectedFilter('All')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedFilter === 'All'
                    ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                      : 'glass-panel text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Media ({MASTER_MEDIA_ARCHIVE.length})</span>
              </button>

              {/* Photos Only Pill */}
              <button
                onClick={() => setSelectedFilter('Photos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedFilter === 'Photos'
                    ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                      : 'glass-panel text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos Only ({MASTER_MEDIA_ARCHIVE.filter(m => m.type === 'image').length})</span>
              </button>

              {/* Videos Only Pill */}
              <button
                onClick={() => setSelectedFilter('Videos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedFilter === 'Videos'
                    ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold scale-105'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                      : 'glass-panel text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Videos Only ({MASTER_MEDIA_ARCHIVE.filter(m => m.type === 'video').length})</span>
              </button>

              {/* ORGANIZED SLEEK YEAR & MONTH EVENT CALENDAR ARCHIVE SELECTOR */}
              <div className="relative inline-block text-left" ref={driveDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDriveDropdownOpen(!isDriveDropdownOpen)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 shadow-lg select-none ${
                    EVENT_DRIVE_CATEGORIES.includes(selectedFilter)
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-gold scale-105'
                      : isLight
                        ? 'bg-white text-slate-800 border-slate-300 hover:border-amber-400'
                        : 'glass-panel text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <Calendar className={`w-3.5 h-3.5 ${EVENT_DRIVE_CATEGORIES.includes(selectedFilter) ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>
                    {EVENT_DRIVES_CONFIG.find(d => d.id === selectedFilter)?.shortLabel || 'Filter by Event Drive'}
                  </span>
                  {selectedFilter && EVENT_DRIVE_CATEGORIES.includes(selectedFilter) && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                      EVENT_DRIVE_CATEGORIES.includes(selectedFilter) ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {MASTER_MEDIA_ARCHIVE.filter(m => m.category === selectedFilter).length}
                    </span>
                  )}

                  {/* Active Event Dots Summary on Trigger Button */}
                  {(() => {
                    const activeEvent = CALENDAR_ARCHIVE_TREE.flatMap(y => y.months).flatMap(m => m.events).find(e => e.id === selectedFilter);
                    if (activeEvent && activeEvent.dots) {
                      return (
                        <div className="flex items-center gap-1 ml-0.5">
                          {activeEvent.dots.map((dot, idx) => (
                            <span key={idx} className={`w-2 h-2 rounded-full ${dot.color} shadow-sm`} title={dot.name} />
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDriveDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Custom Year & Month Calendar Dropdown Menu */}
                {isDriveDropdownOpen && (
                  <div className={`absolute left-0 mt-2 w-[300px] max-w-[90vw] sm:w-[380px] rounded-2xl shadow-2xl p-2.5 z-50 ring-1 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 ${
                    isLight
                      ? 'bg-white/95 text-slate-900 border border-amber-300/80 shadow-amber-200/50 ring-amber-400/20'
                      : 'bg-[#0a0f1d]/95 text-slate-100 border border-amber-500/30 ring-black/80'
                  }`}>
                    
                    {/* Pinned Header Title & Legend Bar */}
                    <div className={`p-2.5 rounded-xl border mb-2.5 sticky top-0 z-10 ${
                      isLight ? 'bg-amber-50/95 border-amber-200/80 shadow-sm' : 'bg-[#0e1424]/95 border-slate-800 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2 mb-2 border-slate-700/30">
                        <span className={`text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5 ${
                          isLight ? 'text-[#971237]' : 'text-amber-400'
                        }`}>
                          <FolderOpen className="w-3.5 h-3.5" />
                          Calendar Event Archive
                        </span>
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          Year & Month Wise
                        </span>
                      </div>

                      {/* Color Dots Category Legend */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-extrabold">
                        <div className="flex items-center gap-1" title="Food Drives & Greenery">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Food & Greenery</span>
                        </div>
                        <div className="flex items-center gap-1" title="ZP School Education & Desks">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm" />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>ZP Education</span>
                        </div>
                        <div className="flex items-center gap-1" title="Press Release Scans">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Press Release</span>
                        </div>
                        <div className="flex items-center gap-1" title="Swatantryadin & Milestones">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Milestones</span>
                        </div>
                        <div className="flex items-center gap-1" title="Senior Citizen Health Camps">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Eldercare</span>
                        </div>
                      </div>
                    </div>

                    {/* Year-Wise & Month-Wise Calendar Accordion List (Scrollable Area with Fixed Height) */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-dropdown-scrollbar pr-1">
                      {CALENDAR_ARCHIVE_TREE.map((yearGroup) => {
                        const isYearExpanded = expandedYears.includes(yearGroup.year);

                        return (
                          <div
                            key={yearGroup.year}
                            className={`rounded-xl border transition-all overflow-hidden ${
                              isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/80 bg-slate-900/40'
                            }`}
                          >
                            {/* Year Group Header Row */}
                            <button
                              type="button"
                              onClick={() => toggleYearExpand(yearGroup.year)}
                              className={`w-full px-3 py-2 text-xs font-black flex items-center justify-between transition-colors cursor-pointer select-none ${
                                isLight
                                  ? 'bg-slate-100/80 hover:bg-amber-100/60 text-slate-800'
                                  : 'bg-slate-900/80 hover:bg-slate-800/90 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-200 ${isYearExpanded ? 'rotate-90' : ''}`} />
                                <span className="font-extrabold tracking-tight">{yearGroup.label}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                                  isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {yearGroup.totalItems} Media Items
                                </span>
                              </div>
                            </button>

                            {/* Months and Events inside Expanded Year */}
                            {isYearExpanded && (
                              <div className="p-2 space-y-2">
                                {yearGroup.months.map((month) => {
                                  const isMonthExpanded = expandedMonths.includes(month.monthName);

                                  return (
                                    <div key={month.monthName} className="rounded-lg overflow-hidden space-y-1">
                                      {/* Month Collapsible Accordion Header */}
                                      <button
                                        type="button"
                                        onClick={() => toggleMonthExpand(month.monthName)}
                                        className={`w-full px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer select-none rounded-lg border ${
                                          isMonthExpanded
                                            ? isLight
                                              ? 'bg-amber-100/90 text-[#971237] border-amber-300'
                                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                                            : isLight
                                              ? 'bg-slate-100/70 hover:bg-amber-50 text-slate-700 border-slate-200'
                                              : 'bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 border-slate-800'
                                        }`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <ChevronRight className={`w-3.5 h-3.5 ${isMonthExpanded ? 'rotate-90 text-amber-400' : 'text-slate-400'} transition-transform duration-200`} />
                                          <span>📅 {month.monthName}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            isMonthExpanded
                                              ? 'bg-amber-500/30 text-amber-200'
                                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                                          }`}>
                                            {month.events.length} {month.events.length === 1 ? 'Event' : 'Events'}
                                          </span>
                                        </div>
                                      </button>

                                      {/* Event Cards inside Expanded Month */}
                                      {isMonthExpanded && (
                                        <div className="space-y-1 p-1 animate-in fade-in duration-150">
                                          {month.events.map((eventItem) => {
                                            const EventIcon = eventItem.icon;
                                            const isSelected = selectedFilter === eventItem.id;
                                            const isUpcoming = eventItem.isUpcoming;

                                            return (
                                              <button
                                                key={eventItem.id}
                                                type="button"
                                                onClick={() => {
                                                  setSelectedFilter(eventItem.id);
                                                  setIsDriveDropdownOpen(false);
                                                }}
                                                className={`w-full p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
                                                  isUpcoming
                                                    ? isSelected
                                                      ? 'bg-amber-500/20 text-amber-300 font-black border-amber-400/90 shadow-md scale-[1.01]'
                                                      : 'bg-slate-900/60 text-slate-400 border-slate-700/60 opacity-80 hover:opacity-100 hover:border-amber-400/60'
                                                    : isSelected
                                                      ? isLight
                                                        ? 'bg-amber-500/15 text-[#971237] font-black border-amber-400 shadow-sm scale-[1.01]'
                                                        : 'bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-transparent text-amber-300 font-extrabold border-amber-500/50 shadow-sm scale-[1.01]'
                                                      : isLight
                                                        ? 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                                                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2.5">
                                                  {/* Date Badge */}
                                                  <div className={`px-2 py-1 rounded-lg text-center font-black text-[10px] shrink-0 border ${
                                                    isUpcoming
                                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                      : isSelected
                                                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                                                        : isLight
                                                          ? 'bg-amber-100/80 text-[#971237] border-amber-200'
                                                          : 'bg-slate-800 text-amber-400 border-slate-700'
                                                  }`}>
                                                    {eventItem.dateDisplay}
                                                  </div>

                                                  {/* Event Title & Description */}
                                                  <div className="text-left leading-tight">
                                                    <div className="font-bold flex items-center gap-1.5 flex-wrap">
                                                      <EventIcon className={`w-3 h-3 shrink-0 ${isUpcoming ? 'text-amber-400 animate-pulse' : 'text-amber-500'}`} />
                                                      <span className={isUpcoming ? 'text-amber-300' : ''}>{eventItem.title}</span>
                                                    </div>
                                                    <div className={`text-[10px] line-clamp-1 mt-0.5 ${
                                                      isLight ? 'text-slate-500' : 'text-slate-400'
                                                    }`}>
                                                      {eventItem.desc}
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Right Side: Category Color Indicator Dots + Count */}
                                                <div className="flex items-center gap-2 shrink-0">
                                                  <div className="flex items-center gap-1">
                                                    {eventItem.dots.map((dot, dIdx) => (
                                                      <span
                                                        key={dIdx}
                                                        className={`w-2.5 h-2.5 rounded-full ${dot.color} shadow-sm ring-1 ring-black/20`}
                                                        title={dot.name}
                                                      />
                                                    ))}
                                                  </div>

                                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                                    isUpcoming
                                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                                      : isSelected
                                                        ? 'bg-amber-500 text-slate-950 font-black'
                                                        : isLight
                                                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                                                          : 'bg-slate-800 text-slate-400'
                                                  }`}>
                                                    {eventItem.itemCount}
                                                  </span>

                                                  {isSelected && (
                                                    <Check className={`w-3.5 h-3.5 stroke-[3] ${isLight ? 'text-[#971237]' : 'text-amber-400'}`} />
                                                  )}
                                                </div>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Masonry vs Uniform Grid Switch */}
            <div className={`flex items-center gap-1.5 backdrop-blur-md p-1 rounded-xl border self-center ${
              isLight
                ? 'bg-white/90 border-slate-300 shadow-sm'
                : 'bg-black/40 border-slate-800'
            }`}>
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'masonry'
                    ? 'bg-amber-500 text-black shadow-md'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                }`}
                title="Masonry View (Preserves Natural Aspect Ratios)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Masonry</span>
              </button>

              <button
                onClick={() => setLayoutMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-amber-500 text-black shadow-md'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                }`}
                title="Uniform Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Uniform</span>
              </button>
            </div>

          </div>

          <div className="text-center text-xs font-bold text-amber-500 tracking-wider uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              Showing {filteredMedia.length} Items for "{EVENT_DRIVES_CONFIG.find(d => d.id === selectedFilter)?.shortLabel || selectedFilter}" • Click any item to open Fullscreen Lightbox + Filmstrip
            </span>
          </div>
        </div>

        {/* Media Layout Rendering (Upcoming Event Vault Notice vs Masonry vs Grid) */}
        {selectedFilter === '15oct_upcoming' ? (
          <div className="p-8 sm:p-12 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-[#1a142e] via-[#0f172a] to-[#0a0f1d] text-center space-y-6 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 animate-pulse" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/40 animate-pulse">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>UPCOMING EVENT MEDIA VAULT • OCT 15TH</span>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-100 bg-clip-text text-transparent">
                  Celebrating Mr. Dattatray Laxman Sodmise's Birthday
                </span>
              </h2>
              <p className="text-sm sm:text-lg font-serif italic text-amber-300 font-bold">
                "{`Turning one life's milestone into many little comebacks.`}"
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                🎉 <strong>Tune in with us to our founder's birthday turned into a food carnival, heartiest charity drive, and celebration for kids!</strong> High-resolution photos, classroom desk handovers, solar inauguration clips, and video records will be uploaded live on <strong>October 15, 2026</strong>.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setSelectedFilter('All')}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black border border-slate-700 transition-all cursor-pointer"
              >
                ← View All Completed Drive Archives
              </button>
            </div>
          </div>
        ) : layoutMode === 'masonry' ? (
          /* MASONRY LAYOUT: Natural Height for Portrait HEIC & Wide Photos */
          <div className={`${masonryCols} ${masonryMaxWidth} gap-6 space-y-6`}>
            {filteredMedia.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-slate-700/60 bg-slate-950 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50"
              >
                {/* Media Image */}
                <img
                  src={item.type === 'video' ? (item.poster || item.url) : item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-black shadow-glow-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                      <Play className="w-7 h-7 fill-black ml-1" />
                    </div>
                  </div>
                )}

                {/* Top Badges: Date & Aspect-Ratio / Resolution Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-amber-500/40 shadow-lg">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{item.date}</span>
                  </span>

                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg ${
                    item.type === 'video' 
                      ? 'bg-blue-600 text-white border border-blue-400/40' 
                      : 'bg-amber-500 text-black border border-amber-400/40'
                  }`}>
                    {item.type === 'video' ? <VideoIcon className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    <span>{item.type === 'video' ? `HD Video ${item.duration || ''}` : '4K Photo'}</span>
                  </span>
                </div>

                {/* Bottom Overlay Details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent px-4 pt-10 pb-3.5 flex flex-col justify-end z-20 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="pt-1 flex items-center justify-between text-[11px] font-extrabold text-amber-400 group-hover:underline">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Click for Fullscreen Mode</span>
                    </span>
                    {item.duration && (
                      <span className="font-mono text-[10px] text-slate-200 bg-black/80 px-2 py-0.5 rounded border border-slate-700/60">
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* UNIFORM GRID LAYOUT */
          <div className={`grid ${gridCols} ${gridMaxWidth} gap-6`}>
            {filteredMedia.map((item, index) => (
              <Card3D key={item.id} theme={theme} className="h-80 sm:h-84 overflow-hidden group border border-slate-700/50 flex flex-col justify-between">
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="relative w-full h-full cursor-pointer bg-slate-950 overflow-hidden flex flex-col justify-between"
                >
                  <img
                    src={item.type === 'video' ? (item.poster || item.url) : item.url}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500 text-black shadow-glow-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                        <Play className="w-7 h-7 fill-black ml-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-amber-500/40 shadow-lg">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{item.date}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg ${
                      item.type === 'video' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-amber-500 text-black'
                    }`}>
                      {item.type === 'video' ? <VideoIcon className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      <span>{item.type === 'video' ? 'Video' : 'Photo'}</span>
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent px-4 pt-8 pb-3.5 flex flex-col justify-end z-20 space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="pt-1 flex items-center justify-between text-[11px] font-extrabold text-amber-400 group-hover:underline">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Click for Fullscreen Mode</span>
                      </span>
                      {item.duration && (
                        <span className="font-mono text-[10px] text-slate-200 bg-black/80 px-2 py-0.5 rounded border border-slate-700/60">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH BOTTOM FILMSTRIP THUMBNAIL NAVIGATION */}
      {currentItem && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 overflow-hidden select-none"
        >
          {/* Top Control Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 text-white z-10"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-amber-500 text-black text-xs font-black uppercase tracking-wider">
                Item {lightboxIndex + 1} of {filteredMedia.length}
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-amber-400 text-xs font-bold border border-slate-700">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentItem.date}</span>
              </span>

              <span className="hidden md:inline-block text-xs font-semibold text-slate-400">
                {currentItem.category}
              </span>
            </div>

            {/* Close X Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black transition-all text-white cursor-pointer border border-white/20 shadow-xl"
              title="Close Fullscreen (Esc)"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Center Stage: Fullscreen Media + Floating Prev/Next Buttons */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-7xl mx-auto my-2 flex items-center justify-center overflow-hidden bg-slate-950/90 rounded-2xl border border-slate-800 p-2 shadow-2xl"
          >
            {/* Floating Previous Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length)}
              className="absolute left-3 sm:left-6 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white border border-slate-700 transition-all shadow-2xl hover:scale-110 cursor-pointer"
              title="Previous Item (Left Arrow)"
            >
              <ChevronLeft className="w-7 h-7 stroke-[3]" />
            </button>

            {/* Media Content Display (Photo vs Video) */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden p-1">
              {currentItem.type === 'video' ? (
                <video
                  key={currentItem.id}
                  ref={(el) => {
                    if (el) {
                      const globalMuted = localStorage.getItem('portal_global_video_muted') === 'true';
                      el.muted = globalMuted;
                    }
                  }}
                  src={currentItem.url}
                  poster={currentItem.poster}
                  controls
                  autoPlay
                  onVolumeChange={(e) => {
                    const currentMuted = e.target.muted || e.target.volume === 0;
                    localStorage.setItem('portal_global_video_muted', currentMuted ? 'true' : 'false');
                  }}
                  className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  key={currentItem.id}
                  src={currentItem.url}
                  alt={currentItem.title}
                  className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
                />
              )}
            </div>

            {/* Floating Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredMedia.length)}
              className="absolute right-3 sm:right-6 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white border border-slate-700 transition-all shadow-2xl hover:scale-110 cursor-pointer"
              title="Next Item (Right Arrow)"
            >
              <ChevronRight className="w-7 h-7 stroke-[3]" />
            </button>
          </div>

          {/* BOTTOM FILMSTRIP THUMBNAIL NAVIGATION STRIP */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl mx-auto py-1 z-20"
          >
            <div 
              ref={filmstripRef}
              className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-1 px-2 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-slate-900"
            >
              {filteredMedia.map((thumbItem, thumbIdx) => {
                const isSelected = thumbIdx === lightboxIndex;
                return (
                  <button
                    key={thumbItem.id || thumbIdx}
                    onClick={() => setLightboxIndex(thumbIdx)}
                    className={`relative shrink-0 w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 scale-110 shadow-glow-gold z-10'
                        : 'border-slate-800 opacity-50 hover:opacity-100 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={thumbItem.type === 'video' ? (thumbItem.poster || thumbItem.url) : thumbItem.url}
                      alt={thumbItem.title}
                      className="w-full h-full object-cover"
                    />
                    {thumbItem.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-3 h-3 text-amber-400 fill-amber-400 ml-0.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Info Bar & Shortcuts */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800 pt-2 text-xs text-slate-300 z-10"
          >
            <div className="space-y-0.5 text-center sm:text-left">
              <h2 className="text-sm font-extrabold text-white">
                {currentItem.title}
              </h2>
              <div className="text-[11px] text-amber-400 font-medium">
                {currentItem.subtitle || currentItem.category} • Date: {currentItem.fullDate || currentItem.date}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-white font-extrabold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="hidden lg:inline-block text-[10px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-black/60 border border-slate-800">
                [ ← / → Arrow Keys to Browse | Esc to Close ]
              </span>

              <button
                onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredMedia.length)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-white font-extrabold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
