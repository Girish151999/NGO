import React, { useState } from 'react';
import { Building2, ShieldCheck, Award, Globe, Heart, Sparkles, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { SupportHeartIcon } from '../components/CustomIcons';

const ALL_PARTNERS = [
  {
    id: 'girish-group',
    name: 'GIRISH GROUP OF COMPANIES',
    fullName: 'Girish Group of Companies (Est. 1998)',
    category: 'Parent Conglomerate & Founder',
    categoryCode: 'group',
    description: 'Multi-sector parent conglomerate established in 1998, providing strategic leadership, corporate governance, and multi-disciplinary operational backing for Give Smile NGO.',
    impact: 'Parent Group Founder Entity',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-black border border-slate-700 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/girish_group.png" alt="Girish Group of Companies" className="h-full w-auto max-w-[170px] object-contain" />
      </div>
    )
  },
  {
    id: 'gils-industrial',
    name: 'GILS (INDUSTRIAL)',
    fullName: 'Girish Industrial Labour Services (Est. 1998)',
    category: 'Industrial Labour & Operations',
    categoryCode: 'group',
    description: 'The founding pioneer of Girish Group established in 1998. Provides industrial labor support, workforce deployment, shop-floor operations, and material handling for manufacturing plants.',
    impact: 'Group Founding Pioneer (Est. 1998)',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gils.png" alt="GILS Industrial" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'gils-pvt',
    name: 'GILS PVT LTD',
    fullName: 'Gils Pvt Ltd (Est. 2006)',
    category: 'Manpower Supply & Overseas Recruitment',
    categoryCode: 'group',
    description: 'Prominent member of Girish Group established in 2006. Leading force in manpower supply and specialized overseas recruitment services, delivering comprehensive workforce solutions.',
    impact: 'Manpower & Overseas Recruitment Flagship',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gils.png" alt="GILS Pvt Ltd" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'gils-global',
    name: 'GILS GLOBAL LLC',
    fullName: 'GILS Global LLC (Est. 2025 • UAE & Europe)',
    category: 'Middle East and Europe Overseas Staffing',
    categoryCode: 'group',
    description: 'International Middle East and Europe workforce and recruitment arm. Connects skilled talent with industry requirements across Middle East, Europe, and international markets.',
    impact: 'Global Middle East & Europe Recruitment Arm',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gils.png" alt="GILS Global LLC" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'techvis-facility',
    name: 'TECHVIS',
    fullName: 'Techvis Solutions (Est. 2010)',
    category: 'Facility Management',
    categoryCode: 'group',
    description: 'Trailblazer in facility sector established in 2010. Manpower supply entity with specialized focus on facility management and operations.',
    impact: 'Facility Management',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/techvis.jpg" alt="Techvis" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'girish-polychem',
    name: 'GIRISH POLYCHEM',
    fullName: 'Girish Polychem Industries (Est. 2012)',
    category: 'Manufacturing (Mulching & Industrial Films)',
    categoryCode: 'group',
    description: 'Flagship manufacturing company established in 2012. Delivers high-quality agricultural mulching films, protective covers, and industrial polymer films.',
    impact: 'Polymer & Agricultural Film Manufacturing',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gpi-clean.png" alt="Girish Polychem Industries" className="h-full w-auto max-w-[170px] object-contain" />
      </div>
    )
  },
  {
    id: 'gsinfotechvis-pvt',
    name: 'Gsinfotechvis Pvt Ltd',
    fullName: 'Gsinfotechvis Pvt Ltd (Est. 2023)',
    category: 'IT Services, Software & Coal Trading',
    categoryCode: 'group',
    description: 'Key player in IT and services sector established in 2023. Offers software solutions, IT staffing, digital marketing, and expanding into coal import/export trading services.',
    impact: 'Parent Corporate IT & Trading Flagship',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gsinfotechvis.png" alt="Gsinfotechvis Pvt Ltd" className="h-full w-auto max-w-[170px] object-contain transform scale-110" />
      </div>
    )
  },
  {
    id: 'gsinfotechvis-global',
    name: 'Gsinfotechvis Global LLC',
    fullName: 'Gsinfotechvis Global LLC (Est. 2025 • USA)',
    category: 'US International IT Staffing & Tech Solutions',
    categoryCode: 'group',
    description: 'US arm of Gsinfotechvis established in 2025 to strengthen global service capabilities. Delivers specialized IT staffing and technology solutions to international clients.',
    impact: 'US International Tech Staffing Arm',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/group/gsinfotechvis.png" alt="Gsinfotechvis Global LLC" className="h-full w-auto max-w-[170px] object-contain transform scale-110" />
      </div>
    )
  },
  {
    id: '360-tianfu-ai',
    name: 'TALENTIC.360 AI LLP',
    fullName: 'Talentic.360 AI LLP (Est. 2025)',
    category: 'Global AI & Skilling Entity',
    categoryCode: 'group',
    description: 'An AI-powered platform focused on education, skills, and career growth. Built to connect learning with real-world opportunities, it offers a comprehensive ecosystem of academic, vocational, corporate, government, and professional development programs.',
    impact: 'Global AI Skilling Entity',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-black border border-slate-700 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/360-tianfu-clean.png" alt="TALENTIC.360 AI LLP" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'give-smile-foundation-arm',
    name: 'GIVE SMILE FOUNDATION',
    fullName: 'Give Smile Foundation (Est. 2024)',
    category: 'Social Impact & Philanthropic Arm',
    categoryCode: 'group',
    description: 'Official CSR non-profit social impact organization of Girish Group. Dedicated to empowering underprivileged school children, young girls, and senior citizens across rural Maharashtra.',
    impact: 'Official CSR & Social Impact Entity',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/logo.jpg" alt="Give Smile Foundation" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'samsung',
    name: 'SAMSUNG',
    fullName: 'Samsung Electronics Co., Ltd.',
    category: 'Global Corporate Partner',
    categoryCode: 'global',
    description: 'Global technology leader partner driving consumer electronics, innovation, and digital skilling drives.',
    impact: 'Global Technology Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/samsung-clean.png" alt="Samsung" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'symantec',
    name: 'SYMANTEC',
    fullName: 'Symantec Enterprise Cloud Security',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Cybersecurity partner providing enterprise threat protection, cloud security, and data privacy solutions.',
    impact: 'Enterprise Security Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/symantec-clean.png" alt="Symantec" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'sap-labs',
    name: 'SAP LABS',
    fullName: 'SAP Labs India Pvt Ltd',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Enterprise ERP software and cloud innovation partner enabling business process automation.',
    impact: 'Enterprise Software Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/sap-clean.png" alt="SAP Labs" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'pubmatic',
    name: 'PUBMATIC',
    fullName: 'PubMatic Inc.',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Digital advertising supply chain platform delivering programmatic technology solutions globally.',
    impact: 'Digital Infrastructure Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/pubmatic-clean.png" alt="PubMatic" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'vi',
    name: 'VI (VODAFONE IDEA)',
    fullName: 'Vodafone Idea Limited',
    category: 'Corporate Social Responsibility (CSR)',
    categoryCode: 'csr',
    description: 'Telecom provider partner connecting rural communities through digital network infrastructure and mobile services.',
    impact: 'Telecom & Connectivity Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/vi-clean.png" alt="Vodafone Idea VI" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'informatica',
    name: 'INFORMATICA',
    fullName: 'Informatica Business Solutions',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Leader in AI-powered enterprise cloud data management and digital integration.',
    impact: 'Cloud Data & AI Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/informatica-clean.png" alt="Informatica" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'techvis',
    name: 'TECHVIS',
    fullName: 'Techvis Solutions',
    category: 'Facility Management',
    categoryCode: 'tech',
    description: 'Facility management, industrial operations, and manpower solutions partner.',
    impact: 'Facility Management',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/techvis-clean.png" alt="Techvis" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'tech-mahindra',
    name: 'TECH MAHINDRA',
    fullName: 'Tech Mahindra Limited',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Global IT consulting, digital engineering, and business re-engineering services partner.',
    impact: 'IT & Digital Consulting Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/techmahindra-clean.png" alt="Tech Mahindra" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'jcb',
    name: 'JCB',
    fullName: 'JCB India Limited',
    category: 'Global Corporate Partner',
    categoryCode: 'global',
    description: 'Global heavy equipment and construction machinery manufacturing leader supporting community infrastructure.',
    impact: 'Industrial & Infrastructure Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/jcb-clean.png" alt="JCB" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'thermax',
    name: 'THERMAX GLOBAL',
    fullName: 'Thermax Limited',
    category: 'Global Corporate Partner',
    categoryCode: 'global',
    description: 'Environmental and energy engineering conglomerate partner providing clean technology solutions.',
    impact: 'Clean Energy & Environment Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/partners/thermax-clean.png" alt="Thermax" className="h-full w-auto max-w-[160px] object-contain" />
      </div>
    )
  },
  {
    id: 'gsinfotechvis',
    name: 'Gsinfotechvis',
    fullName: 'Gsinfotechvis Pvt Ltd',
    category: 'Strategic Technology Partner',
    categoryCode: 'tech',
    description: 'Parent corporate entity providing IT staffing, digital portal development, cloud hosting, and technical mentorship for Give Smile NGO.',
    impact: 'Parent Corporate Technology Partner',
    logoSvg: (
      <div className="h-14 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden shrink-0">
        <img src="/assets/gsinfotechvis.png" alt="Gsinfotechvis" className="h-full w-auto max-w-[170px] object-contain transform scale-110" />
      </div>
    )
  },
  {
    id: 'nabard',
    name: 'NABARD',
    fullName: 'National Bank for Agriculture and Rural Development',
    category: 'Government & Apex Financial Institution',
    categoryCode: 'govt',
    description: 'Co-funding rural watershed development, farm producer organizations, and women self-help group capacity building across Maharashtra.',
    impact: '12,000+ Rural Women & Farmers Supported',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#00875A"/>
        <path d="M50 18L78 35V72L50 88L22 72V35L50 18Z" stroke="#FFFFFF" strokeWidth="6" fill="none"/>
        <path d="M50 32L66 42V62L50 72L34 62V42L50 32Z" fill="#F4C430"/>
        <circle cx="50" cy="52" r="7" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 'sidbi',
    name: 'SIDBI',
    fullName: 'Small Industries Development Bank of India',
    category: 'Government & Apex Financial Institution',
    categoryCode: 'govt',
    description: 'Promoting micro-enterprise development, vocational skill development centers, and financial inclusion for rural youth.',
    impact: '4,500+ Youth Micro-Entrepreneurs',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0284C7"/>
        <path d="M30 70L50 30L70 70H30Z" stroke="#FFFFFF" strokeWidth="7" fill="none"/>
        <circle cx="50" cy="55" r="8" fill="#F59E0B"/>
      </svg>
    )
  },
  {
    id: 'tata-trusts',
    name: 'TATA TRUSTS',
    fullName: 'Sir Dorabji Tata Trust & Allied Trusts',
    category: 'Global Philanthropic Grantor',
    categoryCode: 'global',
    description: 'Strategic philanthropic partner providing multi-year grant support for Zilla Parishad school infrastructure upgrade & digital classrooms.',
    impact: '45+ ZP Schools Transformed',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0A2540"/>
        <path d="M20 30H80V40H56V80H44V40H20V30Z" fill="#0066CC"/>
        <path d="M26 30H74V36H53V76H47V36H26V30Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 'hdfc-parivartan',
    name: 'HDFC BANK PARIVARTAN',
    fullName: 'HDFC Bank Corporate Social Responsibility',
    category: 'Corporate Social Responsibility (CSR)',
    categoryCode: 'csr',
    description: 'Flagship CSR partner supporting classroom furniture distribution, drinking water purification units, and desk distribution in Baramati.',
    impact: '10,480+ School Desks & Kits',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#004B87"/>
        <rect x="20" y="20" width="60" height="60" rx="8" stroke="#ED232A" strokeWidth="8" fill="none"/>
        <rect x="42" y="42" width="16" height="16" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 'axis-bank',
    name: 'AXIS BANK FOUNDATION',
    fullName: 'Axis Bank Foundation',
    category: 'Corporate Social Responsibility (CSR)',
    categoryCode: 'csr',
    description: 'Empowering landless rural families through sustainable agricultural livelihoods, poultry farming, and market linkages.',
    impact: '8,200+ Families Supported',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#971237"/>
        <polygon points="50,20 80,78 62,78 50,52 38,78 20,78" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 'hsbc-india',
    name: 'HSBC INDIA',
    fullName: 'HSBC Electronic Data Processing India',
    category: 'Corporate Social Responsibility (CSR)',
    categoryCode: 'csr',
    description: 'Supporting vocational skill training, financial literacy for rural women, and rainwater harvesting structures in drought-prone areas.',
    impact: '3,100+ Skilled Graduates',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1A1A1A"/>
        <polygon points="20,20 80,20 80,80 20,80" fill="#DB0011"/>
        <polygon points="20,20 50,50 20,80" fill="#FFFFFF"/>
        <polygon points="80,20 50,50 80,80" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 'bajaj-allianz',
    name: 'BAJAJ ALLIANZ',
    fullName: 'Bajaj Allianz Life Insurance CSR',
    category: 'Corporate Social Responsibility (CSR)',
    categoryCode: 'csr',
    description: 'Providing health screening camps, vision checkups, and free prescription glasses for rural senior citizens across Baramati region.',
    impact: '2,800+ Senior Citizens Screened',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#003366"/>
        <circle cx="35" cy="50" r="16" fill="#006699"/>
        <text x="35" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900">B</text>
        <path d="M55 35H85V65H55V35Z" fill="#006699"/>
      </svg>
    )
  },
  {
    id: 'std-chartered',
    name: 'STANDARD CHARTERED',
    fullName: 'Standard Chartered Bank India CSR',
    category: 'Global Philanthropic Grantor',
    categoryCode: 'global',
    description: 'Funding Seeing is Believing eye-care initiatives and empowering adolescent girls with STEM digital education kits.',
    impact: '1,500+ Girls Mentored',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0E7490"/>
        <path d="M25 35C35 25 65 25 75 35C65 45 35 45 25 35Z" fill="#10B981"/>
        <path d="M25 65C35 55 65 55 75 65C65 75 35 75 25 65Z" fill="#0284C7"/>
      </svg>
    )
  },
  {
    id: 'indigo-reach',
    name: 'INDIGO REACH',
    fullName: 'InterGlobe Foundation (IndiGo Reach)',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Community development partner for environmental conservation, tree plantation drives, and rural solid waste management.',
    impact: '15,000+ Saplings Planted',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1E3A8A"/>
        <path d="M20 60L50 25L80 60H20Z" fill="#60A5FA"/>
        <circle cx="50" cy="65" r="10" fill="#F59E0B"/>
      </svg>
    )
  },
  {
    id: 'falconx',
    name: 'FALCONX',
    fullName: 'FalconX Global Social Impact Program',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Tech sponsor funding digital computer labs, e-learning software licenses, and internet connectivity for ZP primary schools.',
    impact: '18 Computer Labs Equipped',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#111827"/>
        <polygon points="30,25 70,25 50,75" fill="#F43F5E"/>
      </svg>
    )
  },
  {
    id: 'ford-foundation',
    name: 'FORD FOUNDATION',
    fullName: 'Ford Foundation International',
    category: 'Global Philanthropic Grantor',
    categoryCode: 'global',
    description: 'Supporting gender equality initiatives, micro-entrepreneurship training, and advocacy for rural women leadership.',
    impact: '6,400+ Women Leaders',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1A365D"/>
        <circle cx="50" cy="50" r="28" stroke="#E2E8F0" strokeWidth="6" fill="none"/>
        <path d="M35 50H65M50 35V65" stroke="#3182CE" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'gates-foundation',
    name: 'BILL & MELINDA GATES',
    fullName: 'Bill & Melinda Gates Foundation',
    category: 'Global Philanthropic Grantor',
    categoryCode: 'global',
    description: 'Grantor funding research and grassroots execution in maternal health, child nutrition, and sanitation hygiene kits.',
    impact: '9,500+ Mothers & Children',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#2A2F35"/>
        <path d="M25 30H75V42H25V30Z" fill="#F59E0B"/>
        <path d="M25 48H75V60H25V48Z" fill="#FFFFFF"/>
        <path d="M25 66H55V78H25V66Z" fill="#F59E0B"/>
      </svg>
    )
  },
  {
    id: 'accenture',
    name: 'ACCENTURE',
    fullName: 'Accenture Corporate Citizenship',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Skills to Succeed initiative partner equipping rural youth with digital literacy, coding basics, and job readiness training.',
    impact: '2,200+ Certified Youth',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0F172A"/>
        <path d="M25 70L55 25L65 35L45 70H25Z" fill="#A100FF"/>
        <path d="M50 45L75 70H60L42 52L50 45Z" fill="#C084FC"/>
      </svg>
    )
  },
  {
    id: 'ikea-foundation',
    name: 'IKEA FOUNDATION',
    fullName: 'IKEA Foundation Netherlands',
    category: 'Global Philanthropic Grantor',
    categoryCode: 'global',
    description: 'Supporting economic empowerment programs for rural women handicraft artisans and sustainable solar lighting for schools.',
    impact: '1,800+ Women Artisans',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0051BA"/>
        <ellipse cx="50" cy="50" rx="36" ry="24" fill="#FFDA1A"/>
        <text x="50" y="56" textAnchor="middle" fill="#0051BA" fontSize="18" fontWeight="900" fontFamily="sans-serif">IKEA</text>
      </svg>
    )
  },
  {
    id: 'edelgive',
    name: 'EDELGIVE FOUNDATION',
    fullName: 'EdelGive Foundation (Edelweiss Group)',
    category: 'Technology & Implementation Partner',
    categoryCode: 'tech',
    description: 'Strategic capacity-building partner providing financial management training, impact evaluation, and organizational governance.',
    impact: '100% Audited Governance',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#047857"/>
        <circle cx="50" cy="50" r="26" stroke="#34D399" strokeWidth="6" fill="none"/>
        <path d="M50 24V76M24 50H76" stroke="#FFFFFF" strokeWidth="6"/>
      </svg>
    )
  },
  {
    id: 'sbi-foundation',
    name: 'SBI FOUNDATION',
    fullName: 'State Bank of India Foundation',
    category: 'Government & Apex Financial Institution',
    categoryCode: 'govt',
    description: 'SBI Sanjeevani mobile health van partner delivering free healthcare and diagnostic tests to remote rural villages.',
    impact: '14,000+ Patient Screenings',
    logoSvg: (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1E3A8A"/>
        <circle cx="50" cy="50" r="28" fill="#2563EB"/>
        <circle cx="50" cy="42" r="10" fill="#FFFFFF"/>
        <rect x="45" y="42" width="10" height="30" fill="#FFFFFF"/>
      </svg>
    )
  }
];

export default function PartnersPage({ theme = 'dark', onOpenDonate, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const isLight = theme === 'light';

  const categories = [
    { id: 'all', label: 'All Strategic Partners' },
    { id: 'group', label: 'Girish Group of Companies' },
    { id: 'tech', label: 'Tech & Implementation' },
    { id: 'csr', label: 'Corporate CSR Donors' },
    { id: 'govt', label: 'Apex & Govt Banks' },
    { id: 'global', label: 'Global Philanthropies' }
  ];

  const filteredPartners = activeCategory === 'all'
    ? ALL_PARTNERS
    : ALL_PARTNERS.filter(p => p.categoryCode === activeCategory);

  return (
    <div className={`min-h-screen pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 space-y-6 relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-slate-100 text-slate-900' 
        : 'bg-[#070a10] text-slate-100'
    }`}>
      {/* Ambient Light Bulb Glow Effect */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isLight
          ? 'bg-gradient-to-b from-amber-300/30 via-rose-200/20 to-transparent'
          : 'bg-gradient-to-b from-[#971237]/30 via-amber-500/10 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* 1. Page Header Hero Section */}
        <section className="text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all ${
            isLight
              ? 'bg-white/90 text-[#971237] border-amber-300 shadow-amber-200/50'
              : 'bg-gradient-to-r from-[#971237]/40 via-amber-500/20 to-[#971237]/40 text-amber-400 border-amber-500/40 shadow-lg'
          }`}>
            <Building2 className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Institutional Partners & Donors</span>
          </div>

          <h1 className={`text-3xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Our Strategic & Institutional{' '}
            <span className="inline-block pb-2 pt-1 px-1 leading-normal bg-gradient-to-r from-[#971237] via-amber-600 to-[#971237] bg-clip-text text-transparent italic">
              Partners
            </span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Give Smile NGO collaborates with National Apex Banks, Global Foundations, and Leading Corporate CSR Partners to drive sustainable, 100% transparent grassroots impact across Maharashtra.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25 scale-105'
                    : isLight
                      ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'glass-panel text-slate-300 hover:text-white border border-slate-700/80 hover:border-amber-500/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

      {/* 2. Partner Cards Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border-slate-300 hover:border-amber-500 text-slate-900 shadow-slate-200/60'
                  : 'bg-[#121824] border-slate-800 hover:border-amber-500/50 text-slate-100'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-shrink-0">
                    {partner.logoSvg}
                  </div>
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                    isLight 
                      ? 'bg-amber-100 text-amber-950 border-amber-300/80' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {partner.category}
                  </span>
                </div>

                <div>
                  <h3 className={`text-lg font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {partner.name}
                  </h3>
                  <div className={`text-xs font-extrabold mt-0.5 ${isLight ? 'text-slate-800' : 'text-amber-300/90'}`}>
                    {partner.fullName}
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}`}>
                  {partner.description}
                </p>
              </div>

              <div className={`pt-4 mt-4 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={`text-[11px] font-extrabold flex items-center gap-1.5 ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {partner.impact}
                </span>
                {partner.id === 'give-smile-foundation-arm' && (
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Verified CSR
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Become a Partner CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 p-8 sm:p-10 text-black shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Partner With Give Smile NGO
            </h2>
            <p className="text-black/80 font-medium text-xs sm:text-sm leading-relaxed">
              Are you an institutional foundation or corporate entity seeking verified CSR partnership opportunities with audited field execution? Connect with our partnership board today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenDonate}
              className="px-6 py-3 rounded-xl bg-black text-white font-extrabold text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <SupportHeartIcon className="w-5 h-5 bg-white/90 p-0.5 rounded-full shadow-sm" />
              <span>Sponsor a CSR Drive</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white/30 backdrop-blur-md text-black font-extrabold text-xs sm:text-sm hover:bg-white/50 transition-all text-center cursor-pointer"
            >
              <span>Contact CSR Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
);
}
