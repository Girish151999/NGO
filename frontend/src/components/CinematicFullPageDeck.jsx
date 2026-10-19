import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  MapPin,
  Quote,
  Play,
  Pause,
  Filter,
  Film,
  ChevronUp,
  ChevronDown,
  Maximize2
} from 'lucide-react';

const CATEGORIES = [
  { id: "Childhood", label: "I. The Little Years" },
  { id: "School Days", label: "II. The School Years" },
  { id: "VIT Pune", label: "III. The College Years" },
  { id: "TIAA Corporate", label: "IV. TIAA Years" },
  { id: "NATCON 23", label: "V. NATCON'23" },
  { id: "Job Fair 24", label: "VI. Job Fair'24" },
  { id: "Coaltrans Asia 24", label: "VII. Coaltrans Conferences Asia'24" },
  { id: "Dubai UAE 26", label: "IX. Dubai'26" }
];

const TORN_PAPER_POLYGON = 'polygon(0% 12px, 3% 2px, 6% 14px, 9% 0px, 12% 10px, 15% 3px, 18% 15px, 21% 1px, 24% 12px, 27% 2px, 30% 14px, 33% 0px, 36% 11px, 39% 3px, 42% 15px, 45% 1px, 48% 12px, 51% 2px, 54% 14px, 57% 0px, 60% 10px, 63% 3px, 66% 15px, 69% 1px, 72% 12px, 75% 2px, 78% 14px, 81% 0px, 84% 11px, 87% 3px, 90% 15px, 93% 1px, 96% 12px, 100% 0px, calc(100% - 2px) 4%, 100% 8%, calc(100% - 14px) 12%, 100% 16%, calc(100% - 3px) 20%, 100% 24%, calc(100% - 15px) 28%, 100% 32%, calc(100% - 2px) 36%, 100% 40%, calc(100% - 14px) 44%, 100% 48%, calc(100% - 3px) 52%, 100% 56%, calc(100% - 15px) 60%, 100% 64%, calc(100% - 2px) 68%, 100% 72%, calc(100% - 14px) 76%, 100% 80%, calc(100% - 3px) 84%, 100% 88%, calc(100% - 15px) 92%, 100% 96%, calc(100% - 2px) 100%, 97% calc(100% - 12px), 94% 100%, 91% calc(100% - 3px), 88% 100%, 85% calc(100% - 15px), 82% 100%, 79% calc(100% - 2px), 76% 100%, 73% calc(100% - 14px), 70% 100%, 67% calc(100% - 3px), 64% 100%, 61% calc(100% - 15px), 58% 100%, 55% calc(100% - 2px), 52% 100%, 49% calc(100% - 14px), 46% 100%, 43% calc(100% - 3px), 40% 100%, 37% calc(100% - 15px), 34% 100%, 31% calc(100% - 2px), 28% 100%, 25% calc(100% - 14px), 22% 100%, 19% calc(100% - 3px), 16% 100%, 13% calc(100% - 15px), 10% 100%, 7% calc(100% - 2px), 4% 100%, 0% calc(100% - 12px), 2px 96%, 14px 92%, 0px 88%, 10px 84%, 3px 80%, 15px 76%, 1px 72%, 12px 68%, 2px 64%, 14px 60%, 0px 56%, 11px 52%, 3px 48%, 15px 44%, 1px 40%, 12px 36%, 2px 32%, 14px 28%, 0px 24%, 10px 20%, 3px 16%, 15px 12%, 1px 8%, 12px 4%)';

const VERTICAL_ZIGZAG_RIGHT = 'polygon(0% 0%, calc(100% - 18px) 0%, 100% 2.5%, calc(100% - 18px) 5%, 100% 7.5%, calc(100% - 18px) 10%, 100% 12.5%, calc(100% - 18px) 15%, 100% 17.5%, calc(100% - 18px) 20%, 100% 22.5%, calc(100% - 18px) 25%, 100% 27.5%, calc(100% - 18px) 30%, 100% 32.5%, calc(100% - 18px) 35%, 100% 37.5%, calc(100% - 18px) 40%, 100% 42.5%, calc(100% - 18px) 45%, 100% 47.5%, calc(100% - 18px) 50%, 100% 52.5%, calc(100% - 18px) 55%, 100% 57.5%, calc(100% - 18px) 60%, 100% 62.5%, calc(100% - 18px) 65%, 100% 67.5%, calc(100% - 18px) 70%, 100% 72.5%, calc(100% - 18px) 75%, 100% 77.5%, calc(100% - 18px) 80%, 100% 82.5%, calc(100% - 18px) 85%, 100% 87.5%, calc(100% - 18px) 90%, 100% 92.5%, calc(100% - 18px) 95%, 100% 97.5%, calc(100% - 18px) 100%, 0% 100%)';

const VERTICAL_ZIGZAG_LEFT = 'polygon(18px 0%, 0% 2.5%, 18px 5%, 0% 7.5%, 18px 10%, 0% 12.5%, 18px 15%, 0% 17.5%, 18px 20%, 0% 22.5%, 18px 25%, 0% 27.5%, 18px 30%, 0% 32.5%, 18px 35%, 0% 37.5%, 18px 40%, 0% 42.5%, 18px 45%, 0% 47.5%, 18px 50%, 0% 52.5%, 18px 55%, 0% 57.5%, 18px 60%, 0% 62.5%, 18px 65%, 0% 67.5%, 18px 70%, 0% 72.5%, 18px 75%, 0% 77.5%, 18px 80%, 0% 82.5%, 18px 85%, 0% 87.5%, 18px 90%, 0% 92.5%, 18px 95%, 0% 97.5%, 18px 100%, 100% 100%, 100% 0%)';

const STORY_SLIDES = [
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


export default function CinematicFullPageDeck({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('Childhood');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [mobileLightboxIndex, setMobileLightboxIndex] = useState(null);
  const [showMobileCategoryPicker, setShowMobileCategoryPicker] = useState(false);
  const [stopperNotice, setStopperNotice] = useState(null);
  const timelineRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const timelineDrawerRef = useRef(null);
  const timelineToggleBtnRef = useRef(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  const filteredSlides = STORY_SLIDES.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Handle click outside for Category Filter Menu & Timeline Drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      // 1. Close Category Filter Dropdown if clicking outside categoryMenuRef
      if (
        showCategoryMenu &&
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(e.target)
      ) {
        setShowCategoryMenu(false);
      }

      // 2. Close Timeline Drawer if clicking outside timelineDrawerRef and timelineToggleBtnRef
      if (
        showTimeline &&
        timelineDrawerRef.current &&
        !timelineDrawerRef.current.contains(e.target) &&
        timelineToggleBtnRef.current &&
        !timelineToggleBtnRef.current.contains(e.target)
      ) {
        setShowTimeline(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, showCategoryMenu, showTimeline]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsPlaying(true);
      setStopperNotice(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setCurrentIndex(0);
    setStopperNotice(null);
  }, [activeCategory]);

  useEffect(() => {
    if (!stopperNotice) return;
    const timer = setTimeout(() => {
      setStopperNotice(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [stopperNotice]);

  const triggerStopperNotice = (msg) => {
    setStopperNotice(msg);
  };

  const goToNextSlide = () => {
    if (currentIndex < filteredSlides.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStopperNotice(null);
    } else {
      setIsPlaying(false);
      triggerStopperNotice(`End of Section Archives — This is the last photo in this section (${filteredSlides.length} of ${filteredSlides.length})`);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setStopperNotice(null);
    } else {
      triggerStopperNotice(`Beginning of Section Archives — This is the first photo in this section (1 of ${filteredSlides.length})`);
    }
  };

  useEffect(() => {
    if (showTimeline && timelineRef.current) {
      const activeElem = timelineRef.current.children[currentIndex];
      if (activeElem) {
        activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex, showTimeline]);

  useEffect(() => {
    let interval;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < filteredSlides.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            triggerStopperNotice(`End of Section Archives — Autoplay finished (${filteredSlides.length} of ${filteredSlides.length})`);
            return prev;
          }
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, filteredSlides.length]);

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 450);

    if (e.deltaY > 20) {
      goToNextSlide();
    } else if (e.deltaY < -20) {
      goToPrevSlide();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, filteredSlides.length, onClose]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // Preload adjacent images for instantaneous 60fps transitions
  useEffect(() => {
    if (!filteredSlides.length) return;
    const nextIdx = (currentIndex + 1) % filteredSlides.length;
    const prevIdx = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
    const nextNextIdx = (currentIndex + 2) % filteredSlides.length;
    
    [nextIdx, prevIdx, nextNextIdx].forEach((idx) => {
      if (filteredSlides[idx]?.url) {
        const img = new Image();
        img.src = filteredSlides[idx].url;
      }
    });
  }, [currentIndex, filteredSlides]);


  // Auto-scroll active thumbnail card into view when currentIndex or showTimeline changes
  useEffect(() => {
    if (showTimeline && timelineRef.current) {
      const activeChild = timelineRef.current.children[currentIndex];
      if (activeChild) {
        activeChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex, showTimeline]);

  // Handle horizontal mouse wheel scrolling on timeline strip
  const handleTimelineWheel = (e) => {
    e.stopPropagation();
    if (timelineRef.current) {
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      timelineRef.current.scrollLeft += delta * 1.5;
    }
  };

  // Sync current slide index when scrolling timeline strip
  const handleTimelineScroll = () => {
    if (!timelineRef.current || !filteredSlides.length) return;
    const container = timelineRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex >= 0 && closestIndex < filteredSlides.length && closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const currentSlide = filteredSlides[currentIndex] || filteredSlides[0] || STORY_SLIDES[0];

  // Alternating Layout: Even slides -> Image Left + Text Right; Odd slides -> Image Right + Text Left
  const isEven = currentIndex % 2 === 0;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 z-[100] bg-[#040711] text-white overflow-hidden select-none h-full w-full h-[100dvh] w-[100dvw] overscroll-none no-scrollbar"
      >
        {/* TOP STOPPER TOAST POPUP NOTIFICATION (APPEARS ON BROWSER TOP WHEN ATTEMPTING TO SCROLL PAST FIRST/LAST PHOTO) */}
        <AnimatePresence>
          {stopperNotice && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] pointer-events-auto"
            >
              <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-amber-400 font-black text-xs sm:text-sm shadow-[0_15px_40px_rgba(245,158,11,0.35)] border-2 border-amber-500/60 backdrop-blur-2xl flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span className="font-serif tracking-wide">{stopperNotice}</span>
                <button
                  onClick={() => setStopperNotice(null)}
                  className="ml-2 p-1 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* MOBILE FLOATING HEADER WITH CLOSE BUTTON (NO TOPIC REEL BUTTONS) */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 font-serif">Girish Memorial Archives</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white border border-slate-700 transition-all shrink-0 cursor-pointer"
            title="Close Memorial Explorer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* DESKTOP FLOATING CLOSE BUTTON (TOP RIGHT) */}
        <div className="hidden lg:block absolute top-8 right-8 z-50">
          <button 
            onClick={onClose}
            className="p-3.5 rounded-full bg-slate-950/80 hover:bg-rose-600 text-white font-black shadow-2xl backdrop-blur-xl border border-slate-700/80 hover:border-rose-400 transition-all cursor-pointer group scale-105"
            title="Close Fullscreen Deck"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* DESKTOP FLOATING CATEGORY SELECTOR BUTTON (TOP LEFT) */}
        <div ref={categoryMenuRef} className="hidden lg:block absolute top-8 left-8 z-50">
          <div className="relative">
            <button 
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="px-4 py-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-amber-400 font-extrabold text-xs flex items-center gap-2 border border-amber-500/40 shadow-2xl backdrop-blur-xl transition-all cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>{CATEGORIES.find(c => c.id === activeCategory)?.label || 'I. The Little Years'}</span>
            </button>

            {/* Category Dropdown Menu */}
            {showCategoryMenu && (
              <div 
                onWheel={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                className="absolute top-12 left-0 w-64 max-h-72 overflow-y-auto bg-slate-950/95 border border-amber-500/30 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 space-y-1 custom-portal-scrollbar animate-in fade-in zoom-in-95"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {activeCategory === cat.id && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FULL BLEED BACKGROUND & MERGED SEAMLESS STAGE (DESKTOP & MOBILE INTEGRATED) */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-[#971237]/20 via-amber-500/15 to-[#971237]/20 rounded-full blur-[160px] pointer-events-none transform-gpu" />

          {/* PHOTO STAGE (Hidden on Mobile | 58% width alternating on Desktop with Vertical Zigzag Interlocked Seam) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                clipPath: isEven ? VERTICAL_ZIGZAG_RIGHT : VERTICAL_ZIGZAG_LEFT, 
                willChange: 'opacity, transform' 
              }}
              className={`hidden lg:block absolute inset-y-0 lg:w-[58%] z-10 overflow-hidden transform-gpu ${
                isEven ? 'lg:left-0' : 'lg:right-0'
              }`}
            >
              {/* Inner Full Bleed Stage (100% Half Page Covered by Photo Atmosphere — Zero Navy Blue Background) */}
              <div 
                className="relative w-full h-full bg-[#040711] flex items-center justify-center overflow-hidden p-2 lg:p-6"
              >
                {/* Full Half-Page Stage Background Fill (Eliminates Navy Blue — 100% Photo Environment) */}
                <img 
                  src={currentSlide.url} 
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-65 blur-2xl scale-115 pointer-events-none transform-gpu transition-all duration-700"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[#040711]/25 pointer-events-none z-0" />

                {/* Main Frameless Photo (4-Side Soft Edge Blend — Blends into Photo Stage Atmosphere) */}
                <motion.img 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  src={currentSlide.url} 
                  alt={currentSlide.title}
                  style={{
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 95%)'
                  }}
                  className="max-w-full max-h-[85vh] object-contain object-center transform-gpu relative z-10 drop-shadow-2xl"
                  decoding="async"
                />

                {/* Protective Shield Overlay & Click to open Fullscreen Lightbox on Desktop */}
                <div 
                  className="absolute inset-0 z-25 pointer-events-auto select-none cursor-zoom-in"
                  onClick={() => setMobileLightboxIndex(currentIndex)}
                  title="Click to view full photo and details"
                  onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                />

                {/* 4-Side Soft Edge Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_30px_#040711]" />

                {/* Top & Bottom Soft Fade Overlay into #040711 */}
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#040711]/80 to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#040711]/80 to-transparent pointer-events-none z-20" />

                {/* Inner Side Soft Gradient Blend Overlay */}
                <div 
                  className={`hidden lg:block absolute inset-y-0 w-72 pointer-events-none z-20 ${
                    isEven 
                      ? 'right-0 bg-gradient-to-r from-transparent via-[#040711]/70 to-[#040711]' 
                      : 'left-0 bg-gradient-to-l from-transparent via-[#040711]/70 to-[#040711]'
                  }`} 
                />

                {/* Vertical Zigzag Teeth Seam Overlay (Blends both background colors with interlocked zigzag points) */}
                <div className={`hidden lg:block absolute inset-y-0 z-25 pointer-events-none w-8 ${isEven ? 'right-0' : 'left-0'}`}>
                  <svg 
                    className="w-8 h-full" 
                    viewBox="0 0 30 1000" 
                    preserveAspectRatio="none" 
                    fill="#040711"
                    style={{ transform: isEven ? 'none' : 'scaleX(-1)' }}
                  >
                    <path d="M 30 0 L 0 20 L 30 40 L 0 60 L 30 80 L 0 100 L 30 120 L 0 140 L 30 160 L 0 180 L 30 200 L 0 220 L 30 240 L 0 260 L 30 280 L 0 300 L 30 320 L 0 340 L 30 360 L 0 380 L 30 400 L 0 420 L 30 440 L 0 460 L 30 480 L 0 500 L 30 520 L 0 540 L 30 560 L 0 580 L 30 600 L 0 620 L 30 640 L 0 660 L 30 680 L 0 700 L 30 720 L 0 740 L 30 760 L 0 780 L 30 800 L 0 820 L 30 840 L 0 860 L 30 880 L 0 900 L 30 920 L 0 940 L 30 960 L 0 980 L 30 1000 L 30 1000 L 30 0 Z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* MOBILE 1-PAGE NON-SCROLLING CENTER-TOPIC MOSAIC SCREEN (EXCLUSIVE FOR PHONE DISPLAY) */}
          <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 p-2 overflow-hidden z-40 pointer-events-auto flex flex-col justify-between gap-1.5 bg-[#040711] select-none">
            
            {/* Row 1: Top Hero Photo (#1) */}
            {filteredSlides[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileLightboxIndex(0)}
                className="w-full flex-1 max-h-[22vh] relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
              >
                <img 
                  src={filteredSlides[0].url} 
                  alt={filteredSlides[0].title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />

                <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[9px] font-black">
                  #1
                </div>

                <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                  <div className="text-[8px] font-extrabold text-amber-300 uppercase tracking-wider line-clamp-1">
                    {filteredSlides[0].category}
                  </div>
                  <h4 className="text-[10px] font-bold text-white line-clamp-1 font-serif">
                    {filteredSlides[0].title}
                  </h4>
                </div>
              </motion.div>
            )}

            {/* Row 2: Side-by-Side Photos (#2 & #3) */}
            <div className="w-full flex-1 max-h-[19vh] grid grid-cols-2 gap-1.5">
              {filteredSlides[1] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.25 }}
                  onClick={() => setMobileLightboxIndex(1)}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
                >
                  <img 
                    src={filteredSlides[1].url} 
                    alt={filteredSlides[1].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-[9px] font-black">
                    #2
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                    <h4 className="text-[9px] font-bold text-white line-clamp-1 font-serif">
                      {filteredSlides[1].title}
                    </h4>
                  </div>
                </motion.div>
              )}

              {filteredSlides[2] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  onClick={() => setMobileLightboxIndex(2)}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
                >
                  <img 
                    src={filteredSlides[2].url} 
                    alt={filteredSlides[2].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-[9px] font-black">
                    #3
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                    <h4 className="text-[9px] font-bold text-white line-clamp-1 font-serif">
                      {filteredSlides[2].title}
                    </h4>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Row 3: CENTER SECTION TITLE / TOPIC CARD (In the Middle Red Box Position!) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.25 }}
              onClick={() => setShowMobileCategoryPicker(true)}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl border border-amber-300 flex flex-col justify-center items-center text-center cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-900/80 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-950 animate-pulse" />
                <span>ACTIVE SECTION ({filteredSlides.length} PHOTOS)</span>
              </div>
              <div className="text-xs sm:text-sm font-black font-serif uppercase tracking-tight text-slate-950 flex items-center justify-center gap-1.5">
                <span>{CATEGORIES.find(c => c.id === activeCategory)?.label || 'I. The Little Years'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </div>
            </motion.div>

            {/* Row 4: Bottom Wide Photo (#4) */}
            {filteredSlides[3] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                onClick={() => setMobileLightboxIndex(3)}
                className="w-full flex-1 max-h-[19vh] relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
              >
                <img 
                  src={filteredSlides[3].url} 
                  alt={filteredSlides[3].title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-[9px] font-black">
                  #4
                </div>
                <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                  <h4 className="text-[10px] font-bold text-white line-clamp-1 font-serif">
                    {filteredSlides[3].title}
                  </h4>
                </div>
              </motion.div>
            )}

            {/* Row 5: Bottom Corner Photos (#5 & #6) */}
            <div className="w-full flex-1 max-h-[19vh] grid grid-cols-2 gap-1.5">
              {filteredSlides[4] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  onClick={() => setMobileLightboxIndex(4)}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
                >
                  <img 
                    src={filteredSlides[4].url} 
                    alt={filteredSlides[4].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-[9px] font-black">
                    #5
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                    <h4 className="text-[9px] font-bold text-white line-clamp-1 font-serif">
                      {filteredSlides[4].title}
                    </h4>
                  </div>
                </motion.div>
              )}

              {filteredSlides[5] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.25 }}
                  onClick={() => setMobileLightboxIndex(5)}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-amber-500/35 bg-slate-950 shadow-md cursor-pointer active:scale-95 transition-all group"
                >
                  <img 
                    src={filteredSlides[5].url} 
                    alt={filteredSlides[5].title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-[9px] font-black">
                    #6
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                    <h4 className="text-[9px] font-bold text-white line-clamp-1 font-serif">
                      {filteredSlides[5].title}
                    </h4>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* MOBILE SECTION PICKER POPUP MODAL */}
          {showMobileCategoryPicker && (
            <div 
              onClick={() => setShowMobileCategoryPicker(false)}
              className="lg:hidden fixed inset-0 z-[130] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fadeIn"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-5 space-y-4 shadow-2xl text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Select Memorial Section</span>
                  </div>
                  <button
                    onClick={() => setShowMobileCategoryPicker(false)}
                    className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-portal-scrollbar">
                  {CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    const catSlidesCount = STORY_SLIDES.filter(s => s.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setCurrentIndex(0);
                          setShowMobileCategoryPicker(false);
                        }}
                        className={`w-full p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/30'
                            : 'bg-slate-950/80 text-slate-200 border-slate-800 hover:border-amber-500/40'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {catSlidesCount} photos
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* FULLSCREEN 3D LIGHTBOX VIEWER WITH BLURRED BACKGROUND PHOTOS & SIDE NAV BUTTONS (DESKTOP & MOBILE) */}
          {mobileLightboxIndex !== null && filteredSlides[mobileLightboxIndex] && (
            <div 
              onClick={() => setMobileLightboxIndex(null)}
              className="fixed inset-0 z-[120] bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none overflow-hidden animate-fadeIn"
            >
              {/* Top Bar Header */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between border-b border-slate-800 pb-2.5 z-30 shrink-0 max-w-5xl mx-auto w-full"
              >
                <div className="space-y-0.5 max-w-[70vw]">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {filteredSlides[mobileLightboxIndex].category} • {filteredSlides[mobileLightboxIndex].date}
                  </span>
                  <h3 className="text-xs font-black text-white font-serif line-clamp-1">
                    {filteredSlides[mobileLightboxIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40">
                    {mobileLightboxIndex + 1} / {filteredSlides.length}
                  </span>
                  <button
                    onClick={() => setMobileLightboxIndex(null)}
                    className="p-2 rounded-full bg-slate-900 hover:bg-rose-600 text-white border border-slate-700 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center 3D Stage with Blurred Background Photos & Side Navigation Chevrons */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex-1 w-full h-full flex items-center justify-center relative my-2 min-h-0 overflow-hidden"
              >
                {/* Left Chevron Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mobileLightboxIndex > 0) setMobileLightboxIndex(mobileLightboxIndex - 1);
                  }}
                  disabled={mobileLightboxIndex === 0}
                  className={`absolute left-1 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all z-50 ${
                    mobileLightboxIndex === 0
                      ? 'bg-slate-900/30 text-slate-700 border-slate-800/40 cursor-not-allowed opacity-30'
                      : 'bg-slate-900/90 text-white border-amber-500/50 cursor-pointer active:scale-90 hover:bg-amber-500 hover:text-slate-950'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[3]" />
                </button>

                {/* 3D Photo Cluster: Left Blurred Photo, Center Crisp Photo, Right Blurred Photo */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Previous Photo (Blurred Background Left) */}
                  {mobileLightboxIndex > 0 && filteredSlides[mobileLightboxIndex - 1] && (
                    <div 
                      onClick={() => setMobileLightboxIndex(mobileLightboxIndex - 1)}
                      className="absolute left-2 z-10 opacity-30 blur-[3px] scale-75 border border-slate-700 rounded-2xl overflow-hidden max-h-[50vh] max-w-[28vw] cursor-pointer transition-all"
                    >
                      <img src={filteredSlides[mobileLightboxIndex - 1].url} alt="Previous memory" className="w-full h-full object-cover object-top" />
                    </div>
                  )}

                  {/* Center Active Photo (Crisp & Zero Crop) */}
                  <div className="z-30 scale-100 opacity-100 shadow-[0_0_50px_rgba(245,158,11,0.3)] border-2 border-amber-500/80 rounded-2xl relative flex items-center justify-center bg-slate-950 max-h-[66vh] max-w-[85vw] p-1 overflow-hidden">
                    <img 
                      src={filteredSlides[mobileLightboxIndex].url} 
                      alt={filteredSlides[mobileLightboxIndex].title}
                      className="max-h-[64vh] max-w-[82vw] object-contain rounded-xl drop-shadow-2xl"
                      decoding="async"
                    />
                  </div>

                  {/* Next Photo (Blurred Background Right) */}
                  {mobileLightboxIndex < filteredSlides.length - 1 && filteredSlides[mobileLightboxIndex + 1] && (
                    <div 
                      onClick={() => setMobileLightboxIndex(mobileLightboxIndex + 1)}
                      className="absolute right-2 z-10 opacity-30 blur-[3px] scale-75 border border-slate-700 rounded-2xl overflow-hidden max-h-[50vh] max-w-[28vw] cursor-pointer transition-all"
                    >
                      <img src={filteredSlides[mobileLightboxIndex + 1].url} alt="Next memory" className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                </div>

                {/* Right Chevron Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mobileLightboxIndex < filteredSlides.length - 1) setMobileLightboxIndex(mobileLightboxIndex + 1);
                  }}
                  disabled={mobileLightboxIndex === filteredSlides.length - 1}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all z-50 ${
                    mobileLightboxIndex === filteredSlides.length - 1
                      ? 'bg-slate-900/30 text-slate-700 border-slate-800/40 cursor-not-allowed opacity-30'
                      : 'bg-slate-900/90 text-white border-amber-500/50 cursor-pointer active:scale-90 hover:bg-amber-500 hover:text-slate-950'
                  }`}
                >
                  <ChevronRight className="w-6 h-6 stroke-[3]" />
                </button>
              </div>

              {/* Bottom Caption Info */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1 z-30 shrink-0 text-left max-w-4xl mx-auto w-full shadow-2xl"
              >
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 font-serif">
                  {filteredSlides[mobileLightboxIndex].title}
                </h4>
                <p className="text-[10px] sm:text-xs font-bold text-rose-400 flex items-center gap-1.5 flex-wrap">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span>{filteredSlides[mobileLightboxIndex].subtitle}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-300 font-semibold">{filteredSlides[mobileLightboxIndex].location}</span>
                </p>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {filteredSlides[mobileLightboxIndex].desc}
                </p>
              </div>
            </div>
          )}

          {/* TEXT CONTENT STAGE (DESKTOP ONLY 50/50 SPLIT) */}
          <div className="hidden lg:flex relative z-30 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 items-center justify-between pointer-events-none">
            
            {/* 100% EVEN OR ODD ALIGNMENT */}
            <div className={`w-full max-w-xl pointer-events-auto max-h-[38vh] sm:max-h-[42vh] lg:max-h-none overflow-y-auto custom-portal-scrollbar ${
              isEven ? 'lg:ml-auto text-left' : 'lg:mr-auto text-left'
            }`}>
              <AnimatePresence mode="wait">
                {/* ULTRA-LUXURY GLASS CARD (Sleek Glass on Mobile | Iconic Torn Paper Poster on Desktop) */}
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={isDesktop ? { clipPath: TORN_PAPER_POLYGON, willChange: 'opacity, transform' } : { willChange: 'opacity, transform' }}
                  className={isDesktop 
                    ? "relative p-2 sm:p-3.5 bg-slate-100/90 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transform-gpu w-full"
                    : "relative p-0.5 rounded-[2rem] bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-slate-800/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transform-gpu w-full"
                  }
                >
                  <div 
                    style={isDesktop ? { clipPath: TORN_PAPER_POLYGON } : {}}
                    className={isDesktop
                      ? "px-6 py-5 sm:px-9 sm:py-7 lg:px-10 lg:py-8 bg-slate-950/95 space-y-3 sm:space-y-5 text-left relative overflow-hidden"
                      : "p-5 sm:p-7 rounded-[1.9rem] bg-slate-950/90 backdrop-blur-2xl space-y-3 text-left relative overflow-hidden"
                    }
                  >

                    {/* Header Tag & Date */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 sm:pb-3">
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" /> {currentSlide.category}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-300 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" /> {currentSlide.date}
                      </span>
                    </div>

                    {/* Big Animated Title & Subtitle */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <motion.h3 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.35 }}
                        className="text-base sm:text-2xl lg:text-4xl font-extrabold font-serif text-white leading-tight"
                      >
                        {currentSlide.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35 }}
                        className="text-[10px] sm:text-xs font-extrabold text-rose-400 tracking-wide uppercase flex items-center gap-2 flex-wrap"
                      >
                        <span>{currentSlide.subtitle}</span>
                        {currentSlide.location && (
                          <>
                            <span className="text-slate-500">•</span>
                            <span className="flex items-center gap-1 text-amber-300 normal-case font-semibold">
                              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              {currentSlide.location}
                            </span>
                          </>
                        )}
                      </motion.p>
                    </div>

                    <div className="border-t border-slate-800/80 pt-3 sm:pt-4 mt-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.35 }}
                        className="space-y-4 sm:space-y-5"
                      >
                        <p className="text-[11px] sm:text-xs lg:text-base text-slate-200 leading-normal sm:leading-relaxed font-sans whitespace-pre-wrap">
                          {currentSlide.desc}
                        </p>
                        {currentSlide.impact && currentSlide.impact.length > 0 && (
                          <div className="pt-2 flex flex-wrap items-center gap-2">
                            {currentSlide.impact.map((tag, idx) => (
                              <span key={idx} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-950 bg-amber-400 rounded shadow-md pointer-events-auto">
                                {tag}
                              </span>
                            ))}
                            <button
                              onClick={() => setMobileLightboxIndex(currentIndex)}
                              className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-amber-300 hover:text-white bg-slate-900 hover:bg-amber-600/80 border border-amber-500/40 rounded shadow-md pointer-events-auto transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                              title="Open Fullscreen Lightbox (Desktop & Mobile)"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>View Full Lightbox</span>
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* DESKTOP PHOTO TIMELINE HORIZONTAL STRIP DRAWER */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div 
              ref={timelineDrawerRef}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex fixed bottom-24 inset-x-8 z-50 flex-col gap-2 p-3.5 rounded-3xl bg-slate-950/95 border-2 border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl pointer-events-auto select-none"
            >
              {/* Header Bar inside Timeline Drawer */}
              <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider font-serif">
                    {CATEGORIES.find(c => c.id === activeCategory)?.label || 'I. The Little Years'} • Visual Photo Timeline ({filteredSlides.length} Photos)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold text-slate-400">
                    Scroll mouse wheel horizontally or click thumbnails to jump
                  </span>
                  <button 
                    onClick={() => setShowTimeline(false)}
                    className="p-1 rounded-full bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                    title="Hide Timeline"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scrollable Thumbnail Strip */}
              <div 
                ref={timelineRef}
                onWheel={handleTimelineWheel}
                onScroll={handleTimelineScroll}
                className="flex items-center gap-3 overflow-x-auto py-1 px-1 custom-portal-scrollbar scroll-smooth"
              >
                {filteredSlides.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={slide.id || idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowTimeline(false);
                      }}
                      className={`relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer group ${
                        isActive
                          ? 'border-amber-400 scale-105 shadow-xl shadow-amber-500/30 ring-2 ring-amber-400/50 opacity-100 z-10'
                          : 'border-slate-800/90 opacity-50 hover:opacity-100 hover:border-amber-500/60 hover:scale-102'
                      }`}
                    >
                      <img 
                        src={slide.url} 
                        alt={slide.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 pointer-events-none" />
                      
                      {/* Top Left Number Badge */}
                      <div className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-black backdrop-blur-md ${
                        isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/80 text-amber-400 border border-amber-500/30'
                      }`}>
                        #{idx + 1}
                      </div>

                      {/* Bottom Caption */}
                      <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none space-y-0.5">
                        <div className="text-[8px] font-black uppercase text-amber-300 tracking-wider line-clamp-1">
                          {slide.category}
                        </div>
                        <h5 className="text-[10px] font-bold text-white line-clamp-1 font-serif">
                          {slide.title}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING BOTTOM OVERLAY NAVIGATION BAR (DESKTOP ONLY) */}
        <div className="hidden lg:flex absolute bottom-8 right-8 left-8 z-50 items-center justify-between pointer-events-none">
          
          {/* Slide Progress Counter Badge */}
          <div className="pointer-events-auto px-4 py-2 rounded-full bg-slate-950/80 border border-amber-500/30 backdrop-blur-xl text-amber-400 text-xs font-black shadow-2xl flex items-center gap-2">
            <span>{String(currentIndex + 1).padStart(2, '0')} / {String(filteredSlides.length).padStart(2, '0')}</span>
            <div className="w-16 sm:w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* SHOW PHOTO TIMELINE BUTTON (CENTER) */}
          <div ref={timelineToggleBtnRef} className="pointer-events-auto">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className={`px-4 py-2 rounded-full border font-extrabold text-xs flex items-center gap-2 transition-all shadow-2xl backdrop-blur-xl cursor-pointer ${
                showTimeline
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-950/85 hover:bg-slate-900 text-amber-400 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              <Film className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Show Photo Timeline</span>
              {showTimeline ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Controls: Prev, Autoplay, Next */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-slate-950/85 p-1.5 sm:p-2 rounded-full border border-slate-700/80 backdrop-blur-2xl shadow-2xl">
            <button
              onClick={goToPrevSlide}
              className="p-2.5 sm:px-4 sm:py-2 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-md cursor-pointer flex items-center gap-1 font-bold text-xs"
              title="Previous Slide (Up / Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 sm:px-4 sm:py-2 rounded-full border font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isPlaying
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Autoplay'}</span>
            </button>

            <button
              onClick={goToNextSlide}
              className="p-2.5 sm:px-4 sm:py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-400 font-extrabold transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs"
              title="Next Slide (Down / Right Arrow)"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}
