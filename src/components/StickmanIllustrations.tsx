import React from 'react';

/**
 * Stickman typing on a modern laptop with a floating next-word probability bubble
 */
export const StickmanLaptop: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Floating Thought / Probability Bubble */}
    <g className="animate-bounce" style={{ animationDuration: '3s' }}>
      <rect x="75" y="10" width="75" height="28" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="83" y="24" fill="#065f46" fontSize="9" fontFamily="monospace" fontWeight="bold">P(next) = 86%</text>
      <text x="83" y="34" fill="#10b981" fontSize="8" fontFamily="monospace">"intelligence"</text>
      <path d="M85 38 L80 44 L92 38 Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
    </g>

    {/* Desk Line */}
    <line x1="20" y1="110" x2="145" y2="110" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

    {/* Stickman Head */}
    <circle cx="50" cy="50" r="14" stroke="#1e293b" strokeWidth="2.5" fill="#ffffff" />
    {/* Smile & Eyes */}
    <circle cx="46" cy="48" r="1.5" fill="#1e293b" />
    <circle cx="54" cy="48" r="1.5" fill="#1e293b" />
    <path d="M47 54 Q50 58 53 54" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />

    {/* Stickman Body */}
    <line x1="50" y1="64" x2="55" y2="95" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Chair */}
    <path d="M38 75 L38 105 L30 120" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="95" x2="58" y2="95" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="95" x2="45" y2="120" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

    {/* Stickman Legs */}
    <path d="M55 95 L65 98 L65 110" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Stickman Arms typing */}
    <path d="M52 74 L68 85 L84 86" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Laptop Base & Screen */}
    <rect x="80" y="87" width="30" height="3" rx="1.5" fill="#64748b" />
    <path d="M86 87 L102 66 L118 66 L108 87 Z" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
    <rect x="91" y="69" width="20" height="13" rx="1" fill="#10b981" opacity="0.85" />
    {/* Code lines on screen */}
    <line x1="94" y1="73" x2="105" y2="73" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <line x1="94" y1="76" x2="108" y2="76" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <line x1="94" y1="79" x2="101" y2="79" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

    {/* Coffee Mug on desk */}
    <rect x="122" y="96" width="10" height="14" rx="2" fill="#d96b43" />
    <path d="M132 100 Q136 103 132 107" stroke="#d96b43" strokeWidth="1.5" fill="none" />
    {/* Steam */}
    <path d="M125 92 Q127 89 125 86" stroke="#fdba74" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * CPU Core Processor illustration with silicon pins, trace circuits, and logic core
 */
export const CpuCoreIllustration: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Pins on top & bottom */}
    {[30, 45, 60, 75, 90, 105].map((x) => (
      <React.Fragment key={`pin-${x}`}>
        <line x1={x} y1="12" x2={x} y2="24" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={x} y1="116" x2={x} y2="128" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1={x} x2="24" y2={x} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="116" y1={x} x2="128" y2={x} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      </React.Fragment>
    ))}

    {/* CPU Body */}
    <rect x="24" y="24" width="92" height="92" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="3" />

    {/* Inner Heat Spreader Plate */}
    <rect x="36" y="36" width="68" height="68" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />

    {/* Silicon Neural Core Center */}
    <rect x="48" y="48" width="44" height="44" rx="6" fill="#1b4332" />

    {/* Glowing Circuit Node in Core */}
    <circle cx="70" cy="70" r="10" fill="#10b981" opacity="0.3" className="animate-ping" style={{ animationDuration: '2.5s' }} />
    <circle cx="70" cy="70" r="6" fill="#34d399" />

    {/* Trace Lines */}
    <line x1="48" y1="58" x2="38" y2="58" stroke="#10b981" strokeWidth="1.5" />
    <line x1="48" y1="82" x2="38" y2="82" stroke="#10b981" strokeWidth="1.5" />
    <line x1="92" y1="58" x2="102" y2="58" stroke="#10b981" strokeWidth="1.5" />
    <line x1="92" y1="82" x2="102" y2="82" stroke="#10b981" strokeWidth="1.5" />

    {/* Label */}
    <text x="70" y="86" textAnchor="middle" fill="#d1fae5" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
      LM CORE
    </text>
  </svg>
);

/**
 * Stickman with magnifying glass inspecting a high-surprise token
 */
export const StickmanInspector: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ground line */}
    <line x1="15" y1="125" x2="125" y2="125" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

    {/* Token block being inspected */}
    <rect x="75" y="80" width="45" height="42" rx="8" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2" />
    <text x="97" y="98" textAnchor="middle" fill="#9f1239" fontSize="9" fontFamily="monospace" fontWeight="bold">
      PPL
    </text>
    <text x="97" y="112" textAnchor="middle" fill="#f43f5e" fontSize="12" fontFamily="monospace" fontWeight="bold">
      42.8
    </text>

    {/* Stickman Head */}
    <circle cx="40" cy="40" r="14" stroke="#1e293b" strokeWidth="2.5" fill="#ffffff" />
    {/* Curious Eye looking through lens */}
    <circle cx="45" cy="38" r="2" fill="#1e293b" />
    <path d="M38 46 Q42 43 46 47" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />

    {/* Stickman Body leaning forward */}
    <path d="M40 54 L48 85" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Stickman Legs */}
    <path d="M48 85 L35 125" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 85 L58 105 L65 125" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Arms holding Magnifying Glass */}
    <path d="M43 66 L62 60 L78 68" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Magnifying Glass */}
    <circle cx="85" cy="74" r="12" stroke="#d96b43" strokeWidth="3" fill="#ffedd5" fillOpacity="0.4" />
    <line x1="77" y1="67" x2="68" y2="58" stroke="#d96b43" strokeWidth="3.5" strokeLinecap="round" />
    {/* Glass shine */}
    <path d="M80 67 Q85 64 89 68" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * Floating badge matching the exact visual style of the reference photo's "Bistro Royale, NY" card
 */
export const FloatingPhotoHeroBadge: React.FC<{
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}> = ({
  title = "Perplexity Lab, Active",
  subtitle = "Next-Word & PPL Engine",
  onClick
}) => (
  <div
    onClick={onClick}
    className="inline-flex items-center gap-3 p-2 pr-4 bg-gradient-to-r from-[#d96b43] to-[#e77a54] hover:from-[#c85e37] hover:to-[#d96b43] text-white rounded-2xl shadow-float cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-white/20 select-none"
  >
    {/* Thumbnail card matching the reference photo */}
    <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-7 h-7 text-white" fill="none">
        <rect x="6" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.2)" />
        <path d="M10 21 L16 14 L22 18 L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="12" r="1.5" fill="currentColor" />
        <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div>
      <div className="text-[11px] font-bold tracking-tight text-white/90">
        {title}
      </div>
      <div className="text-[12px] font-medium text-white/95 flex items-center gap-1 font-sans">
        <span>{subtitle}</span>
        <span className="text-[10px]">&rarr;</span>
      </div>
    </div>
  </div>
);

