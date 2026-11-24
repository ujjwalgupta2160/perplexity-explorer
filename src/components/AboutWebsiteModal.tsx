import React, { useState } from 'react';
import {
  X,
  Globe,
  BookOpen,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  Heart,
  Code2
} from 'lucide-react';
import { UjjwalGuptaLogo } from './UjjwalGuptaLogo';

interface AboutWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutWebsiteModal: React.FC<AboutWebsiteModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const liveUrl = "https://perplexity-explorer-ujjwal.vercel.app/";
  const repoUrl = "https://github.com/ujjwalgupta2160/perplexity-explorer";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#e8eee9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Heading */}
        <div className="mb-6">
          <UjjwalGuptaLogo />
          <h3 className="text-2xl font-serif font-bold text-slate-900 mt-4 tracking-tight">
            About Perplexity Explorer™
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-sans">
            An interactive neural language model laboratory created by <strong className="text-slate-900">Ujjwal Gupta™</strong> to explore word probabilities, token perplexity, and multi-step trajectories in real time.
          </p>
        </div>

        {/* Official Links Box */}
        <div className="p-4 bg-[#f8faf8] rounded-2xl border border-[#e8eee9] mb-6 space-y-3">
          <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-wider block">
            Official Website & Repository Links
          </span>

          {/* Live Website Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-700">Live Website</div>
                <div className="text-xs font-mono text-emerald-800 truncate">{liveUrl}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 transition-colors"
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* GitHub Repository Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-700">GitHub Source Code</div>
                <div className="text-xs font-mono text-slate-600 truncate">{repoUrl}</div>
              </div>
            </div>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 transition-colors flex-shrink-0"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* What You Can Do in the Website */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Core Modules in This Website
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                1. Sentence Type & Linguistic Mood
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                Classifies whether input is Declarative, Interrogative, Conditional, or Imperative, along with Flesch readability.
              </p>
            </div>

            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                2. Next-Word Probability Distribution
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                Live candidate rankings with exact probabilities and Nucleus (50%, 80%, 90%) mass gauges.
              </p>
            </div>

            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                3. Each Word Probability & Surprisal Table
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                Word-by-word breakdown showing conditional probability P(w), perplexity 1/P, and information in bits.
              </p>
            </div>

            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                4. Type the Next Word Tester
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                Type any candidate word to test how likely or surprising the model considers it before appending.
              </p>
            </div>

            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                5. Lookahead Branching Tree
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                Multi-step lookahead trajectories mapping how possibilities expand across depth 1, 2, and 3.
              </p>
            </div>

            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9]">
              <strong className="text-slate-900 block font-sans font-semibold mb-1">
                6. Mathematical Formula Docs
              </strong>
              <p className="text-slate-600 font-sans leading-relaxed">
                In-depth mathematical proofs and equations with live calculations for your current prompt.
              </p>
            </div>
          </div>
        </div>

        {/* Creator Trademark Seal */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-orange-50 border border-[#e2e8f0] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              UG
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-serif">
                Ujjwal Gupta™
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Creator, Architect & Trademark Owner
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#d96b43] hover:bg-[#c85e37] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-900/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
