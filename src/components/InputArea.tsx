import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface InputAreaProps {
  text: string;
  onChange: (val: string) => void;
  onClear: () => void;
  tokenCount: number;
}

const PRESETS = [
  "The mystery behind artificial intelligence is",
  "Quantum computing allows computers to",
  "Deep neural networks learn representations by",
  "The probability of observing the next word is",
  "How many tokens are getting after it in"
];

export const InputArea: React.FC<InputAreaProps> = ({
  text,
  onChange,
  onClear,
  tokenCount
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 font-sans">
          <span>Prompt Input</span>
          <span className="font-mono text-[11px] text-emerald-800 font-semibold lowercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {tokenCount} tokens detected
          </span>
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-xl hover:bg-slate-100"
            title="Clear prompt"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste any text to inspect token-by-token perplexity and next-word probabilities..."
          rows={3}
          className="w-full bg-[#f8faf8] border border-[#e2e8f0] focus:border-emerald-500 focus:bg-white rounded-xl p-3.5 text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y transition-all shadow-inner"
        />
      </div>

      {/* Preset Pills */}
      <div className="mt-3.5 flex items-center gap-2 flex-wrap">
        <span className="text-[11px] text-[#d96b43] flex items-center gap-1 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#d96b43]" />
          Presets:
        </span>
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onChange(preset)}
            className="text-xs bg-[#f4f7f4] hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 px-3 py-1 rounded-xl border border-[#e2e8f0] hover:border-emerald-300 transition-all text-left truncate max-w-[220px] font-sans font-medium"
            title={preset}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};
