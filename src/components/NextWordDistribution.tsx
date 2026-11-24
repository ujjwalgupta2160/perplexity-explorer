import React from 'react';
import { TokenPrediction } from '../types';
import { cleanToken } from '../lib/ngramEngine';
import { TrendingUp, Plus } from 'lucide-react';

interface NextWordDistributionProps {
  candidates: TokenPrediction[];
  onAppendToken: (token: string) => void;
}

export const NextWordDistribution: React.FC<NextWordDistributionProps> = ({
  candidates,
  onAppendToken
}) => {
  let cumulative = 0;
  let tokensFor50 = 0;
  let tokensFor80 = 0;
  let tokensFor90 = 0;

  candidates.forEach((c, idx) => {
    cumulative += c.prob;
    if (cumulative <= 0.50 || (tokensFor50 === 0 && cumulative > 0.50)) {
      tokensFor50 = idx + 1;
    }
    if (cumulative <= 0.80 || (tokensFor80 === 0 && cumulative > 0.80)) {
      tokensFor80 = idx + 1;
    }
    if (cumulative <= 0.90 || (tokensFor90 === 0 && cumulative > 0.90)) {
      tokensFor90 = idx + 1;
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans">
            <TrendingUp className="w-4 h-4 text-[#2d6a4f]" />
            Next-Word Probability Distribution
          </h2>
          <p className="text-[11px] text-slate-500 font-sans">
            Candidate words for the immediate next position
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Top {candidates.length}
        </span>
      </div>

      {/* Nucleus Distribution Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3.5 p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] text-center">
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold tracking-wider">Top-50% Mass</div>
          <div className="text-sm font-bold font-mono text-emerald-700">{tokensFor50 || 1} tokens</div>
        </div>
        <div className="border-x border-[#e2e8f0]">
          <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold tracking-wider">Top-80% Mass</div>
          <div className="text-sm font-bold font-mono text-teal-700">{tokensFor80 || 2} tokens</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold tracking-wider">Top-90% Mass</div>
          <div className="text-sm font-bold font-mono text-orange-700">{tokensFor90 || 3} tokens</div>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1">
        {candidates.map((cand, idx) => {
          const percentage = (cand.prob * 100).toFixed(1);
          return (
            <div
              key={idx}
              className="group p-2.5 bg-[#f8faf8] hover:bg-emerald-50/70 border border-[#e8eee9] hover:border-emerald-300 rounded-xl transition-all flex items-center justify-between gap-3 shadow-sm"
            >
              {/* Left: Token info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 w-5 text-right font-medium">
                  #{cand.rank}
                </span>
                <span className="font-mono text-sm font-bold text-slate-800 group-hover:text-emerald-900 transition-colors truncate">
                  "{cleanToken(cand.token)}"
                </span>
              </div>

              {/* Center: Probability Bar */}
              <div className="flex-1 max-w-[130px] hidden sm:block">
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(4, cand.prob * 100))}%` }}
                  />
                </div>
              </div>

              {/* Right: Probability score and quick-append button */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-700 w-12 text-right">
                  {percentage}%
                </span>
                <button
                  onClick={() => onAppendToken(cand.token)}
                  className="px-2.5 py-1 rounded-lg bg-white group-hover:bg-[#d96b43] text-slate-600 group-hover:text-white text-xs font-bold border border-[#e2e8f0] group-hover:border-[#d96b43] transition-all flex items-center gap-1 shadow-sm"
                  title={`Append "${cleanToken(cand.token)}" to text`}
                >
                  <Plus className="w-3 h-3" />
                  <span className="hidden group-hover:inline text-[11px]">Append</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
