import React from 'react';

export function CompanyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arch background/swoosh */}
      <path d="M 120 100 C 180 50, 300 60, 340 180" stroke="#F15A24" strokeWidth="20" strokeLinecap="round" />
      <path d="M 340 180 C 360 250, 330 320, 280 350" stroke="#ED1E79" strokeWidth="20" strokeLinecap="round" />
      
      {/* Three figures */}
      {/* Left Orange */}
      <circle cx="150" cy="180" r="15" fill="#F15A24" />
      <path d="M 120 280 C 120 230, 180 230, 180 280" stroke="#F15A24" strokeWidth="20" strokeLinecap="round" />
      
      {/* Center Blue */}
      <circle cx="200" cy="150" r="18" fill="#29ABE2" />
      <path d="M 160 270 C 160 200, 240 200, 240 270" stroke="#29ABE2" strokeWidth="25" strokeLinecap="round" />
      
      {/* Right Pink */}
      <circle cx="250" cy="180" r="15" fill="#ED1E79" />
      <path d="M 220 280 C 220 230, 280 230, 280 280" stroke="#ED1E79" strokeWidth="20" strokeLinecap="round" />

      {/* Hand cradling them */}
      <path d="M 80 280 C 80 350, 180 380, 240 340 C 270 320, 250 300, 240 310 C 200 340, 100 320, 100 280" fill="#29ABE2" />
      <path d="M 80 250 C 120 330, 250 320, 270 280" stroke="#29ABE2" strokeWidth="20" strokeLinecap="round" />

      {/* Text ESS */}
      <text x="200" y="60" fontFamily="sans-serif" fontSize="50" fontWeight="900" fill="#2E3192" textAnchor="middle">ESS</text>
      
      {/* Circular text path for bottom */}
      <path id="curve" style={{ width: 'auto' }} d="M 60 240 A 140 140 0 0 0 340 240" fill="transparent" />
      <text fill="#2E3192" fontFamily="sans-serif" fontSize="24" fontWeight="bold">
        <textPath href="#curve" startOffset="50%" textAnchor="middle">
          EXPERT STANDARD SOLUTION
        </textPath>
      </text>
    </svg>
  );
}
