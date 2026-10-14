import React from 'react';

export const EldercareIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`}>
    <image
      href="/assets/eldercare-icon.png"
      width="24"
      height="24"
      style={{ filter: 'brightness(0)' }}
    />
  </svg>
);

export const EducationIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`}>
    <image
      href="/assets/education-icon.png"
      width="24"
      height="24"
      style={{ filter: 'brightness(0)' }}
    />
  </svg>
);

export const WomenSkillsIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 scale-110 ${className}`}>
    <image
      href="/assets/women-skills-icon.png"
      width="24"
      height="24"
      style={{ filter: 'brightness(0)' }}
    />
  </svg>
);

export const GreeneryIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 scale-110 ${className}`}>
    <image
      href="/assets/greenery-icon.png"
      width="24"
      height="24"
      style={{ filter: 'brightness(0)' }}
    />
  </svg>
);

export const SupportHeartIcon = ({ className = 'w-5 h-5', style }) => {
  const hasWidth = /\bw-\[\d+px\]|\bw-\d+/.test(className);
  return (
    <img
      src="/assets/support-heart-logo-transparent.png?v=cropped1"
      alt="Support Logo"
      className={`${hasWidth ? '' : 'w-5 h-5 '}inline-block object-contain shrink-0 ${className}`}
      style={style}
    />
  );
};
