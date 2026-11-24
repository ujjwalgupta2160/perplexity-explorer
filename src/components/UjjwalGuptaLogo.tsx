import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Custom Trademark Vector Monogram & Wordmark for "Ujjwal Gupta™"
 */
export const UjjwalGuptaLogo: React.FC<LogoProps> = ({
  className = "",
  showSubtitle = true
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Trademark Monogram Seal "UG™" */}
      <div className="relative group">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#d96b43] p-[1.5px] shadow-md shadow-emerald-950/10 transition-transform duration-300 group-hover:scale-105">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
            {/* Subtle background monogram watermark */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-orange-50/50" />
            
            {/* Stylized Vector SVG Monogram "UG" */}
            <svg viewBox="0 0 40 40" className="w-8 h-8 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ugGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1b4332" />
                  <stop offset="70%" stopColor="#2d6a4f" />
                  <stop offset="100%" stopColor="#d96b43" />
                </linearGradient>
              </defs>
              
              {/* Outer decorative orbit ring */}
              <circle cx="20" cy="20" r="18" stroke="url(#ugGrad)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
              
              {/* Letter U */}
              <path
                d="M11 11 V22 C11 26.5 14.5 29 18.5 29 C22.5 29 26 26.5 26 22 V18"
                stroke="url(#ugGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Letter G interwoven with U */}
              <path
                d="M29 15 C28 12.5 25.5 11 22 11 C17 11 14 15 14 20 C14 25 17 29 22 29 C27 29 29.5 26 29.5 22 H21.5"
                stroke="url(#ugGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Trademark Dot Accent */}
              <circle cx="31.5" cy="11.5" r="1.5" fill="#d96b43" />
            </svg>
          </div>
        </div>

        {/* Small floating TM Pill */}
        <span className="absolute -top-1 -right-1 text-[8px] font-mono font-extrabold bg-[#d96b43] text-white px-1 py-0.2 rounded-full shadow-sm">
          TM
        </span>
      </div>

      {/* Trademark Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-tight">
            Ujjwal Gupta
          </span>
          <span className="text-[10px] font-sans font-black text-[#d96b43] align-top tracking-normal">
            ™
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-[#2d6a4f] uppercase">
              Perplexity Explorer
            </span>
            <span className="text-[9px] text-slate-400 font-mono">•</span>
            <span className="text-[9px] font-mono text-slate-500">Official TM</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Official Trademark Verification Seal Badge
 */
export const UjjwalGuptaTrademarkBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 via-white to-orange-50 border border-[#e2e8f0] shadow-sm text-xs font-sans">
      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-sm">
        <ShieldCheck className="w-3 h-3" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-slate-600 font-medium">Trademark by</span>
        <strong className="text-slate-900 font-serif font-bold">Ujjwal Gupta™</strong>
      </div>
      <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-orange-100 text-[#d96b43]">
        Verified
      </span>
    </div>
  );
};

