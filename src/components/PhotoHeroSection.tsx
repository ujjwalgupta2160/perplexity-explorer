import React from 'react';
import {
  StickmanLaptop,
  CpuCoreIllustration,
  StickmanInspector,
  FloatingPhotoHeroBadge
} from './StickmanIllustrations';
import { Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';

interface PhotoHeroSectionProps {
  onExploreClick: () => void;
  metrics: {
    perplexity: number;
    crossEntropyLoss: number;
    totalTokens: number;
  };
}

export const PhotoHeroSection: React.FC<PhotoHeroSectionProps> = ({
  onExploreClick,
  metrics
}) => {
  return (
    <div className="w-full space-y-12 mb-8">
      {/* Top Banner & Floating Badge Row (Styled like top of reference photo) */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#f8faf8] via-[#ffffff] to-[#f4f7f4] border border-[#e6ece7] p-6 sm:p-10 shadow-soft overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Hero Content with Stickman Laptop */}
          <div className="flex items-center gap-6 max-w-xl">
            <div className="flex-shrink-0 p-3 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm">
              <StickmanLaptop className="w-32 h-28 sm:w-36 sm:h-32" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-[#d96b43] uppercase mb-1 block">
                Next-Word Probability & Linguistic Lab
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Where Words Meet <span className="italic font-normal text-[#2d6a4f]">Mathematical Probability</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                Type any sentence to see how a neural language model predicts the next word, calculates surprisal in bits, and evaluates perplexity.
              </p>
            </div>
          </div>

          {/* Right Floating Badge (Exact look of the "Bistro Royale, NY" card in photo) */}
          <div className="flex-shrink-0">
            <FloatingPhotoHeroBadge
              title="Perplexity Engine, Active"
              subtitle="0ms Inference | Logprobs"
              onClick={onExploreClick}
            />
          </div>
        </div>
      </div>

      {/* Numbered 01, 02, 03 Section (Directly matching 01 Premium Ingredients, 02 Chef's Expertise, 03 Warm Hospitality) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto px-4">
        {/* 01 Word Probability */}
        <div className="flex flex-col items-center group">
          <div className="text-4xl sm:text-5xl font-serif font-light text-slate-800 tracking-tight mb-2 transition-transform duration-300 group-hover:-translate-y-1">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight mb-1">
            Word Probability
          </h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
            Temperature-adjusted softmax over vocabulary tokens with exact probability mass and candidate rankings.
          </p>
        </div>

        {/* 02 CPU & Neural Core */}
        <div className="flex flex-col items-center group">
          <div className="text-4xl sm:text-5xl font-serif font-light text-slate-800 tracking-tight mb-2 transition-transform duration-300 group-hover:-translate-y-1">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight mb-1">
            CPU & Neural Engine
          </h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
            Ultra-efficient tokenization, instant cross-entropy loss, and in-browser ONNX GPT-2 neural evaluation.
          </p>
        </div>

        {/* 03 Lookahead Tree */}
        <div className="flex flex-col items-center group">
          <div className="text-4xl sm:text-5xl font-serif font-light text-slate-800 tracking-tight mb-2 transition-transform duration-300 group-hover:-translate-y-1">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight mb-1">
            Lookahead Tree
          </h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
            Multi-token branching paths showing how many possible words expand downstream with cumulative path scores.
          </p>
        </div>
      </div>

      {/* Centered Headline Section (Directly matching "CHEF'S SIGNATURE SELECTION / Discover our signature dishes") */}
      <div className="text-center space-y-3 pt-6 pb-2">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#d96b43] uppercase font-sans">
          NEURAL LANGUAGE MODEL LAB
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 tracking-tight">
          Discover the probability of every word
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
          Inspect token-by-token surprisal, sample next candidate words, and analyze sentence mood in real time.
        </p>
      </div>

      {/* Circular Signature Tokens Showcase (Matching the round dish plates in the reference photo) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {/* Token Plate 1: High probability */}
        <div className="flex flex-col items-center text-center group cursor-pointer">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-2 border-emerald-300 flex flex-col items-center justify-center shadow-card group-hover:scale-105 transition-all duration-300">
            <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">Expected</span>
            <span className="text-lg font-mono font-bold text-emerald-700">86.4%</span>
            <span className="text-[9px] text-emerald-600 font-mono">1.15 PPL</span>
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-800 font-sans">"intelligence"</h4>
            <span className="text-[11px] text-slate-500 font-mono">Rank #1 • 0.21 bits</span>
          </div>
        </div>

        {/* Token Plate 2: CPU Core */}
        <div className="flex flex-col items-center text-center group cursor-pointer">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 flex flex-col items-center justify-center shadow-card group-hover:scale-105 transition-all duration-300">
            <CpuCoreIllustration className="w-16 h-16" />
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-800 font-sans">Neural Silicon Core</h4>
            <span className="text-[11px] text-slate-500 font-mono">0ms Local Latency</span>
          </div>
        </div>

        {/* Token Plate 3: Moderate surprise */}
        <div className="flex flex-col items-center text-center group cursor-pointer">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-50 to-orange-100/60 border-2 border-orange-300 flex flex-col items-center justify-center shadow-card group-hover:scale-105 transition-all duration-300">
            <span className="text-[10px] font-mono text-orange-800 font-bold uppercase">Moderate</span>
            <span className="text-lg font-mono font-bold text-orange-700">12.1%</span>
            <span className="text-[9px] text-orange-600 font-mono">8.26 PPL</span>
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-800 font-sans">"systems"</h4>
            <span className="text-[11px] text-slate-500 font-mono">Rank #2 • 3.05 bits</span>
          </div>
        </div>

        {/* Token Plate 4: Stickman Inspector */}
        <div className="flex flex-col items-center text-center group cursor-pointer">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-rose-50 to-rose-100/60 border-2 border-rose-300 flex flex-col items-center justify-center shadow-card group-hover:scale-105 transition-all duration-300 overflow-hidden">
            <StickmanInspector className="w-20 h-20 -mb-2" />
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-800 font-sans">Surprise Detector</h4>
            <span className="text-[11px] text-slate-500 font-mono">PPL &gt; 25 Tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
};

