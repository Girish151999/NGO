import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Eye,
  GraduationCap,
  Utensils,
  Leaf,
  Users,
  Maximize2,
  MapPin,
  Heart,
  Quote,
  ArrowDown
} from 'lucide-react';

const CATEGORIES = [
  { id: "All", label: "All Chapters", icon: Sparkles },
  { id: "Childhood", label: "I. The Little Years", icon: Sparkles },
  { id: "School Days", label: "II. The School Years", icon: Sparkles },
  { id: "VIT Pune", label: "III. The College Years", icon: Sparkles },
  { id: "TIAA Corporate", label: "IV. TIAA Years", icon: Sparkles },
  { id: "NATCON 23", label: "V. NATCON'23", icon: Sparkles },
  { id: "Job Fair 24", label: "VI. Job Fair'24", icon: Sparkles },
  { id: "Coaltrans Asia 24", label: "VII. Coaltrans Conferences Asia'24", icon: Sparkles },
  { id: "Dubai UAE 26", label: "IX. Dubai'26", icon: Sparkles }
];


const STORY_ITEMS = [
  {
    "id": "1_childhood_photos-1",
    "title": "1. A Little Heart, A Big Smile",
    "subtitle": "Where his beautiful story began.",
    "category": "Childhood",
    "categoryCode": "1_childhood_photos",
    "date": "1999 - 2011",
    "location": "Phaltan & Family Roots",
    "url": "/assets/girish_memorial/childhood/1.jpg",
    "desc": "Three years old, and already lighting up every frame.",
    "impact": [
      "Childhood Memory"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "1_childhood_photos-2",
    "title": "2. Little Gentleman",
    "subtitle": "Where his beautiful story began.",
    "category": "Childhood",
    "categoryCode": "1_childhood_photos",
    "date": "1999 - 2011",
    "location": "Phaltan & Family Roots",
    "url": "/assets/girish_memorial/childhood/2.jpg",
    "desc": "Small in size, unforgettable in charm.",
    "impact": [
      "Childhood Memory"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "1_childhood_photos-3",
    "title": "3. A Winner Even Then",
    "subtitle": "Where his beautiful story began.",
    "category": "Childhood",
    "categoryCode": "1_childhood_photos",
    "date": "1999 - 2011",
    "location": "Phaltan & Family Roots",
    "url": "/assets/girish_memorial/childhood/3.jpg",
    "desc": "A little boy, a proud moment, the first of many dreams.",
    "impact": [
      "Childhood Memory"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "1_childhood_photos-4",
    "title": "4. That Million-Dollar Smile",
    "subtitle": "Where his beautiful story began.",
    "category": "Childhood",
    "categoryCode": "1_childhood_photos",
    "date": "1999 - 2011",
    "location": "Phaltan & Family Roots",
    "url": "/assets/girish_memorial/childhood/4.jpg",
    "desc": "The kind of smile that made everything brighter.",
    "impact": [
      "Childhood Memory"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "1_childhood_photos-5",
    "title": "5. Born to Be Fearless",
    "subtitle": "Where his beautiful story began.",
    "category": "Childhood",
    "categoryCode": "1_childhood_photos",
    "date": "1999 - 2011",
    "location": "Phaltan & Family Roots",
    "url": "/assets/girish_memorial/childhood/5.jpg",
    "desc": "A tiny adventurer with a world of possibilities ahead.",
    "impact": [
      "Childhood Memory"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "2_school_photos-1",
    "title": "1. The Very First Chapter",
    "subtitle": "Where little dreams grew into big ambitions.",
    "category": "School Days",
    "categoryCode": "2_school_photos",
    "date": "2011 - 2017",
    "location": "New Era High School Panchgani",
    "url": "/assets/girish_memorial/school/1.png",
    "desc": "Four years old, beginning his journey at Pinewoods International School, Panchgani.",
    "impact": ["Student Council President", "Moral Dept President"],
    "quote": "MAJOR SCHOOL ACHIEVEMENTS\n\nGirish's school years were marked by leadership, discipline, and a passion for excellence. \nHe served as Student Council President and President of the Moral Department, represented his school as a Player in the Inter-School Cricket Team and a Member of the Chess Team, captained the District-Level Basketball Team, and served as Vice President of the Debate Team. \nEven during his school days, Girish was building the qualities of a leader, a team player, and a confident voice that would continue to define his journey. ??"
  },
  {
    "id": "2_school_photos-2",
    "title": "2. A Voice in the Choir",
    "subtitle": "Where little dreams grew into big ambitions.",
    "category": "School Days",
    "categoryCode": "2_school_photos",
    "date": "2011 - 2017",
    "location": "New Era High School Panchgani",
    "url": "/assets/girish_memorial/school/2.jpg",
    "desc": "Standing together, singing together, growing together.",
    "impact": ["Inter-School Cricket Team", "Chess Team Member"],
    "quote": "MAJOR SCHOOL ACHIEVEMENTS\n\nGirish's school years were marked by leadership, discipline, and a passion for excellence. \nHe served as Student Council President and President of the Moral Department, represented his school as a Player in the Inter-School Cricket Team and a Member of the Chess Team, captained the District-Level Basketball Team, and served as Vice President of the Debate Team. \nEven during his school days, Girish was building the qualities of a leader, a team player, and a confident voice that would continue to define his journey. ??"
  },
  {
    "id": "2_school_photos-3",
    "title": "3. Between the Classes",
    "subtitle": "Where little dreams grew into big ambitions.",
    "category": "School Days",
    "categoryCode": "2_school_photos",
    "date": "2011 - 2017",
    "location": "New Era High School Panchgani",
    "url": "/assets/girish_memorial/school/3.png",
    "desc": "A candid moment captured with his familiar, heartwarming smile.",
    "impact": ["District Basketball Captain", "Debate Vice President"],
    "quote": "MAJOR SCHOOL ACHIEVEMENTS\n\nGirish's school years were marked by leadership, discipline, and a passion for excellence. \nHe served as Student Council President and President of the Moral Department, represented his school as a Player in the Inter-School Cricket Team and a Member of the Chess Team, captained the District-Level Basketball Team, and served as Vice President of the Debate Team. \nEven during his school days, Girish was building the qualities of a leader, a team player, and a confident voice that would continue to define his journey. ??"
  },
  {
    "id": "2_school_photos-4",
    "title": "4. Memories in the Making",
    "subtitle": "Where little dreams grew into big ambitions.",
    "category": "School Days",
    "categoryCode": "2_school_photos",
    "date": "2011 - 2017",
    "location": "New Era High School Panchgani",
    "url": "/assets/girish_memorial/school/4.png",
    "desc": "Friendships, shared laughter, and memories that stayed long after the school days ended",
    "impact": ["Leadership & Discipline", "Passion for Excellence"],
    "quote": "MAJOR SCHOOL ACHIEVEMENTS\n\nGirish's school years were marked by leadership, discipline, and a passion for excellence. \nHe served as Student Council President and President of the Moral Department, represented his school as a Player in the Inter-School Cricket Team and a Member of the Chess Team, captained the District-Level Basketball Team, and served as Vice President of the Debate Team. \nEven during his school days, Girish was building the qualities of a leader, a team player, and a confident voice that would continue to define his journey. ??"
  },
  {
    "id": "2_school_photos-5",
    "title": "5. The Final Bell",
    "subtitle": "Where little dreams grew into big ambitions.",
    "category": "School Days",
    "categoryCode": "2_school_photos",
    "date": "2011 - 2017",
    "location": "New Era High School Panchgani",
    "url": "/assets/girish_memorial/school/5.png",
    "desc": "One last class photo, a thousand memories, and a new chapter waiting to unfold.",
    "impact": ["Confident Voice", "A True Team Player"],
    "quote": "MAJOR SCHOOL ACHIEVEMENTS\n\nGirish's school years were marked by leadership, discipline, and a passion for excellence. \nHe served as Student Council President and President of the Moral Department, represented his school as a Player in the Inter-School Cricket Team and a Member of the Chess Team, captained the District-Level Basketball Team, and served as Vice President of the Debate Team. \nEven during his school days, Girish was building the qualities of a leader, a team player, and a confident voice that would continue to define his journey. ??"
  },
  {
    "id": "3_vit_pune-1",
      "title": "1. Ideas in Progress",
      "subtitle": "Engineering & Global Academic Exchange",
      "category": "VIT Pune",
      "categoryCode": "3_vit_pune",
      "date": "2017 - 2021",
      "location": "Vishwakarma Institute of Technology, Pune",
      "url": "/assets/girish_memorial/vit_pune/1.png",
      "desc": "A project presentation at Vishwakarma Institute of Technology, Pune, with his teammates by his side.",
      "impact": [
        "Publicity Team",
        "Social Team"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "3_vit_pune-2",
      "title": "2. Atmabodh",
      "subtitle": "Engineering & Global Academic Exchange",
      "category": "VIT Pune",
      "categoryCode": "3_vit_pune",
      "date": "2017 - 2021",
      "location": "Vishwakarma Institute of Technology, Pune",
      "url": "/assets/girish_memorial/vit_pune/2.png",
      "desc": "A college event to help elders learn to use smartphones and laptops, making technology more accessible.",
      "impact": [
        "Publicity Team",
        "Social Team"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "3_vit_pune-3",
      "title": "3. A Winter of Global Learning",
      "subtitle": "Engineering & Global Academic Exchange",
      "category": "VIT Pune",
      "categoryCode": "3_vit_pune",
      "date": "Winter 2017",
      "location": "Nanyang Technological University, Singapore",
      "url": "/assets/girish_memorial/vit_pune/3.jpg",
      "desc": "Student Exchange Program | Nanyang Technological University, Singapore| Winter 2017",
      "impact": [
        "Publicity Team",
        "Social Team"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
    },
  {
      "id": "4_tiaa_photos-1",
      "title": "1. Aloha April'23",
      "subtitle": "60-Member Executive Team Leadership at Age 22",
      "category": "TIAA Corporate",
      "categoryCode": "4_tiaa_photos",
      "date": "2021 - 2023",
      "location": "TIAA Corporate Headquarters",
      "url": "/assets/girish_memorial/corporate/1.jpg",
      "desc": "An employee engagement event where families visited the workplace. Girish with Mom and Dad by his side.",
      "impact": [
        "Corporate Leadership"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
    },
    {
      "id": "4_tiaa_photos-2",
      "title": "2. The People Along the Way",
      "subtitle": "60-Member Executive Team Leadership at Age 22",
      "category": "TIAA Corporate",
      "categoryCode": "4_tiaa_photos",
      "date": "2021 - 2023",
      "location": "TIAA Corporate Headquarters",
      "url": "/assets/girish_memorial/corporate/tiaa_team_wetnjoy.jpg",
      "desc": "A memorable trip with colleagues who became family at TIAA",
      "impact": [
        "Corporate Leadership"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
    },
    {
      "id": "14_natcon_23-1",
      "title": "1. A Gathering of HR Leaders",
      "subtitle": "National Convention Leadership",
      "category": "NATCON 23",
      "categoryCode": "14_natcon_23",
      "date": "2023",
      "location": "National Convention Center",
      "url": "/assets/girish_memorial/natcon/1.jpg",
      "desc": "A national conference bringing HR professionals together to exchange knowledge, explore HR excellence, and shape the future of work.",
      "impact": [
        "National Convention"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "14_natcon_23-2",
      "title": "2. Meeting an Inspiration",
      "subtitle": "National Convention Leadership",
      "category": "NATCON 23",
      "categoryCode": "14_natcon_23",
      "date": "2023",
      "location": "National Convention Center",
      "url": "/assets/girish_memorial/natcon/2.jpg",
      "desc": "A memorable moment with Mr. Om Prakash Singh, Former Director of ONGC, someone Girish looked up to.",
      "impact": [
        "National Convention"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "14_natcon_23-3",
      "title": "3. Poised & Professional",
      "subtitle": "National Convention Leadership",
      "category": "NATCON 23",
      "categoryCode": "14_natcon_23",
      "date": "2023",
      "location": "National Convention Center",
      "url": "/assets/girish_memorial/natcon/3.jpg",
      "desc": "Just Girish reflecting the confidence he carried into every room.",
      "impact": [
        "National Convention"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "14_natcon_23-4",
      "title": "4. Sharing the Stage",
      "subtitle": "National Convention Leadership",
      "category": "NATCON 23",
      "categoryCode": "14_natcon_23",
      "date": "2023",
      "location": "National Convention Center",
      "url": "/assets/girish_memorial/natcon/4.jpg",
      "desc": "Girish alongside Mr. Sadashiv Patil, Ex-Officio Chairman, NIPM.",
      "impact": [
        "National Convention"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "14_natcon_23-5",
      "title": "5. Conversations & Connections",
      "subtitle": "National Convention Leadership",
      "category": "NATCON 23",
      "categoryCode": "14_natcon_23",
      "date": "2023",
      "location": "National Convention Center",
      "url": "/assets/girish_memorial/natcon/5.jpg",
      "desc": "One with attendees, capturing the network he made along the way.",
      "impact": [
        "National Convention"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "5_job_fair_24_photos-1",
      "title": "1. A Meeting with Jay Pawar",
      "subtitle": "Youth Employment Initiative",
      "category": "Job Fair 24",
      "categoryCode": "5_job_fair_24_photos",
      "date": "2024",
      "location": "Statewide Hiring Expos",
      "url": "/assets/girish_memorial/job_fair/1.jpg",
      "desc": "An interaction with Jay Pawar during the job fair, building connections and opportunities.",
      "impact": [
        "Youth Employment"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "5_job_fair_24_photos-2",
      "title": "2. The Heart of the Team",
      "subtitle": "Youth Employment Initiative",
      "category": "Job Fair 24",
      "categoryCode": "5_job_fair_24_photos",
      "date": "2024",
      "location": "Statewide Hiring Expos",
      "url": "/assets/girish_memorial/job_fair/2.jpg",
      "desc": "Girish sharing a frame with the team, bringing energy and warmth to the occasion.",
      "impact": [
        "Youth Employment"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "5_job_fair_24_photos-3",
      "title": "3. Connecting Talent with Opportunity",
      "subtitle": "Youth Employment Initiative",
      "category": "Job Fair 24",
      "categoryCode": "5_job_fair_24_photos",
      "date": "2024",
      "location": "Statewide Hiring Expos",
      "url": "/assets/girish_memorial/job_fair/3.jpg",
      "desc": "Representing the team at the Maharashtra government�s employment initiative, bringing people and opportunities together.",
      "impact": [
        "Youth Employment"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "5_job_fair_24_photos-4",
      "title": "4. Felicitating Mr. S. T. Jadhav",
      "subtitle": "Youth Employment Initiative",
      "category": "Job Fair 24",
      "categoryCode": "5_job_fair_24_photos",
      "date": "2024",
      "location": "Statewide Hiring Expos",
      "url": "/assets/girish_memorial/job_fair/4.jpg",
      "desc": "Honouring Mr. S. T. Jadhav, Assistant Commissioner, during the event.",
      "impact": [
        "Youth Employment"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "5_job_fair_24_photos-5",
      "title": "5. Among Dignitaries & Delegates",
      "subtitle": "Youth Employment Initiative",
      "category": "Job Fair 24",
      "categoryCode": "5_job_fair_24_photos",
      "date": "2024",
      "location": "Statewide Hiring Expos",
      "url": "/assets/girish_memorial/job_fair/5.jpg",
      "desc": "A moment shared with officials and attendees who were part of the occasion.",
      "impact": [
        "Youth Employment"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "6_coaltrans_asia_24-1",
      "title": "1. A Global Industry Conference",
      "subtitle": "International Energy Summit",
      "category": "Coaltrans Asia 24",
      "categoryCode": "6_coaltrans_asia_24",
      "date": "September 2024",
      "location": "Bali, Indonesia",
      "url": "/assets/girish_memorial/coaltrans/1.jpg",
      "desc": "Girish attending Coaltrans Asia from 7th to 9th September 2024 in Bali, Indonesia.",
      "impact": [
        "Global Summit Keynote"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "6_coaltrans_asia_24-2",
      "title": "2. Business, Beyond Generations",
      "subtitle": "International Energy Summit",
      "category": "Coaltrans Asia 24",
      "categoryCode": "6_coaltrans_asia_24",
      "date": "September 2024",
      "location": "Bali, Indonesia",
      "url": "/assets/girish_memorial/coaltrans/2.jpg",
      "desc": "Attending the conference alongside his father & Chairman Mr. Dattatray Laxman Sodmise, sharing the experience of a global business event.",
      "impact": [
        "Global Summit Keynote"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "6_coaltrans_asia_24-3",
      "title": "3. A Visit to PUTRA PERKASA",
      "subtitle": "International Energy Summit",
      "category": "Coaltrans Asia 24",
      "categoryCode": "6_coaltrans_asia_24",
      "date": "September 2024",
      "location": "Bali, Indonesia",
      "url": "/assets/girish_memorial/coaltrans/3.jpg",
      "desc": "Exploring the PUTRA PERKASA booth and connecting with industry representatives.",
      "impact": [
        "Global Summit Keynote"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "6_coaltrans_asia_24-4",
      "title": "4. In the Company of Entrepreneurs",
      "subtitle": "International Energy Summit",
      "category": "Coaltrans Asia 24",
      "categoryCode": "6_coaltrans_asia_24",
      "date": "September 2024",
      "location": "Bali, Indonesia",
      "url": "/assets/girish_memorial/coaltrans/4.jpg",
      "desc": "Girish alongside fellow entrepreneurs, building connections within the global business community.",
      "impact": [
        "Global Summit Keynote"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "6_coaltrans_asia_24-5",
      "title": "5. At the Meeting Table",
      "subtitle": "International Energy Summit",
      "category": "Coaltrans Asia 24",
      "categoryCode": "6_coaltrans_asia_24",
      "date": "September 2024",
      "location": "Bali, Indonesia",
      "url": "/assets/girish_memorial/coaltrans/5.jpg",
      "desc": "Girish engaged in a meeting at the conference, opening doors to new perspectives and possibilities.",
      "impact": [
        "Global Summit Keynote"
      ],
      "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "7_dubai__25-1",
    "title": "Advancing New Opportunities",
    "subtitle": "GILS Global LLC UAE Operations",
    "category": "Dubai UAE 26",
    "categoryCode": "7_dubai__25",
    "date": "2026",
    "location": "Dubai, UAE International Headquarters",
    "url": "/assets/girish_memorial/dubai/1.jpg",
    "desc": "Girish in Dubai from 22 to 27 February 2026, working towards finalizing a raw sulphur shipment deal for Gsinfotechvis's commodity trading services.",
    "impact": [
      "UAE Global Office"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "7_dubai__25-2",
    "title": "Becoming Who He Envisioned",
    "subtitle": "GILS Global LLC UAE Operations",
    "category": "Dubai UAE 26",
    "categoryCode": "7_dubai__25",
    "date": "2026",
    "location": "Dubai, UAE International Headquarters",
    "url": "/assets/girish_memorial/dubai/2.jpg",
    "desc": "Never one to settle for the ordinary. A little glimpse of the ambition, character, and individuality that made Girish who he was.",
    "impact": [
      "UAE Global Office"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "7_dubai__25-3",
    "title": "Business Discussions",
    "subtitle": "GILS Global LLC UAE Operations",
    "category": "Dubai UAE 26",
    "categoryCode": "7_dubai__25",
    "date": "2026",
    "location": "Dubai, UAE International Headquarters",
    "url": "/assets/girish_memorial/dubai/3.jpg",
    "desc": "Girish with a business contact during one of his meetings in Dubai.",
    "impact": [
      "UAE Global Office"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "7_dubai__25-4",
    "title": "Building Business Connections",
    "subtitle": "GILS Global LLC UAE Operations",
    "category": "Dubai UAE 26",
    "categoryCode": "7_dubai__25",
    "date": "2026",
    "location": "Dubai, UAE International Headquarters",
    "url": "/assets/girish_memorial/dubai/4.jpg",
    "desc": "Girish with two business associates during his visit, strengthening professional relationships.",
    "impact": [
      "UAE Global Office"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  },
  {
    "id": "7_dubai__25-5",
    "title": "His Signature Briefcase",
    "subtitle": "GILS Global LLC UAE Operations",
    "category": "Dubai UAE 26",
    "categoryCode": "7_dubai__25",
    "date": "2026",
    "location": "Dubai, UAE International Headquarters",
    "url": "/assets/girish_memorial/dubai/5.jpg",
    "desc": "Always by his side, a small but unmistakable part of Girish everyday professional life.",
    "impact": [
      "UAE Global Office"
    ],
    "quote": "Preserving the inspiring journey and social impact of Girish Sir."
  }
];


export default function CinematicSplitStoryPage({ isOpen, onClose, inline = false }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = STORY_ITEMS.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (!inline && isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('hide-scrollbar');
      document.documentElement.classList.add('hide-scrollbar');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('hide-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('hide-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
    };
  }, [isOpen, inline]);

  // Preload adjacent split-screen images for locked 60fps transitions
  useEffect(() => {
    if (!filteredItems.length) return;
    const nextIdx = (activeIndex + 1) % filteredItems.length;
    const prevIdx = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    const nextNextIdx = (activeIndex + 2) % filteredItems.length;
    
    [nextIdx, prevIdx, nextNextIdx].forEach((idx) => {
      if (filteredItems[idx]?.url) {
        const img = new Image();
        img.src = filteredItems[idx].url;
      }
    });
  }, [activeIndex, filteredItems]);

  if (!inline && !isOpen) return null;

  const currentItem = filteredItems[activeIndex] || filteredItems[0] || STORY_ITEMS[0];

  const content = (
    <div 
      className={inline 
        ? "relative w-full rounded-3xl bg-[#050811] text-white flex flex-col overflow-hidden select-none border-2 border-amber-500/30 shadow-2xl h-[800px]" 
        : "fixed inset-0 z-[100] bg-[#050811] text-white flex flex-col overflow-hidden select-none"}
    >
        {/* FIXED HEADER NAVBAR WITH CATEGORY FILTER PILLS */}
        <div className="relative z-30 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-3 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif leading-none text-white">
                50/50 Split-Screen Storyline
              </h2>
              <p className="text-[11px] text-amber-400 font-medium">
                Scroll right panel to transition left image • {filteredItems.length} Visual Moments
              </p>
            </div>
          </div>

          {/* CATEGORY FILTER TABS FOR ALL FOLDERS */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 custom-portal-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Close Button (only when in modal mode) */}
          {!inline && (
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all border border-rose-500/40 shrink-0"
            >
              <X className="w-4 h-4" />
              <span>Close Storyline</span>
            </button>
          )}
        </div>

        {/* MAIN SPLIT SCREEN BODY */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
          
          {/* LEFT COLUMN: 50% STICKY PINNED IMAGE FRAME */}
          <div className="lg:col-span-6 h-[40vh] lg:h-full relative overflow-hidden bg-slate-950 border-r border-slate-800/80 flex items-center justify-center p-4 lg:p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#971237]/30 via-slate-950 to-amber-500/20 blur-3xl pointer-events-none transform-gpu" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'opacity, transform' }}
                className="w-full h-full max-h-[75vh] rounded-3xl overflow-hidden relative group transform-gpu bg-[#050811]"
              >
                <img 
                  src={currentItem.url} 
                  alt={currentItem.title}
                  style={{
                    maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%)'
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                />

                {/* 4-Side Soft Inset Edge Blend Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_60px_25px_#050811]" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/20 to-transparent opacity-70 z-10" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950/90 text-amber-400 border border-amber-500/40 backdrop-blur-md shadow-lg">
                    {currentItem.category}
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-slate-950/90 text-white border border-slate-800 backdrop-blur-md">
                    {activeIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1 z-10 text-left">
                  <span className="text-[11px] font-extrabold text-amber-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> {currentItem.location}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold font-serif text-white line-clamp-1">
                    {currentItem.title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: 50% SCROLLING DEFINING TEXT STREAM */}
          <div className="lg:col-span-6 h-[60vh] lg:h-full overflow-y-auto custom-portal-scrollbar px-6 sm:px-12 py-12 space-y-24 sm:space-y-36">
            
            <div className="text-center space-y-2 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-slate-900 text-amber-400 border border-amber-500/30 shadow-lg">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>Scroll Down to Transition Images</span>
              </div>
            </div>

            {filteredItems.map((story, idx) => (
              <StoryTextSection 
                key={story.id} 
                story={story} 
                index={idx} 
                isActive={activeIndex === idx} 
                onFocus={() => setActiveIndex(idx)} 
              />
            ))}

            <div className="h-24" />
          </div>

        </div>
    </div>
  );

  if (inline) return content;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#040711] h-full w-full h-[100dvh] w-[100dvw] overscroll-none overflow-hidden"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

function StoryTextSection({ story, index, isActive, onFocus }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onFocus();
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [onFocus]);

  return (
    <motion.div 
      ref={sectionRef}
      initial={{ opacity: 0.4, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onFocus}
      className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 cursor-pointer space-y-5 ${
        isActive 
          ? 'bg-slate-900/90 border-amber-400 shadow-2xl shadow-amber-500/10 scale-[1.02]' 
          : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {story.category}
        </span>
        <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-amber-500" /> {story.date}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className={`text-xl sm:text-3xl font-extrabold font-serif ${isActive ? 'text-white' : 'text-slate-300'}`}>
          {story.title}
        </h3>
        <p className="text-xs font-extrabold text-rose-400 tracking-wide">
          {story.subtitle}
        </p>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
          {story.desc}
        </p>

        {story.impact && story.impact.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {story.impact.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-400 rounded shadow-md">
                {tag}
              </span>
            ))}
          </div>
        )}


    </motion.div>
  );
}
