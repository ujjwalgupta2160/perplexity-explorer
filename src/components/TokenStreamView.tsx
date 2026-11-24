import React from 'react';
import { TokenEvaluation } from '../types';
import { cleanToken } from '../lib/ngramEngine';
import { BarChart2, X } from 'lucide-react';

interface TokenStreamViewProps {
  tokens: TokenEvaluation[];
  selectedToken: TokenEvaluation | null;
  onSelectToken: (token: TokenEvaluation | null) => void;
}

export const TokenStreamView: React.FC<TokenStreamViewProps> = ({
  tokens,
  selectedToken,
  onSelectToken
}) => {
  const getTokenStyle = (perplexity: number) => {
    if (perplexity < 4) return 'token-prob-emerald';
    if (perplexity < 25) return 'token-prob-amber';
    if (perplexity < 100) return 'token-prob-rose';
    return 'token-prob-purple';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-wide font-sans">
            Token-by-Token Perplexity Heatmap
          </h2>
          <span className="text-[11px] text-slate-500 font-sans">
            (Click any token to inspect alternative model predictions)
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-[10px] font-mono">
          <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>&lt;4 Fluent</span>
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>4–25 Natural</span>
          </span>
          <span className="flex items-center gap-1.5 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>25–100 Surprise</span>
          </span>
          <span className="flex items-center gap-1.5 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 text-purple-800">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>&gt;100 Rare</span>
          </span>
        </div>
      </div>

      {/* Stream of tokens */}
      {tokens.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm font-sans">
          No tokens to evaluate. Type in the prompt box above to begin.
        </div>
      ) : (
        <div className="p-4 bg-[#f8faf8] rounded-xl border border-[#e2e8f0] flex flex-wrap gap-2 items-center leading-relaxed">
          {tokens.map((tok) => {
            const isSelected = selectedToken?.index === tok.index;
            const styleClass = getTokenStyle(tok.perplexity);
            return (
              <button
                key={tok.index}
                onClick={() => onSelectToken(isSelected ? null : tok)}
                className={`group relative px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${styleClass} ${
                  isSelected ? 'ring-2 ring-emerald-600 scale-105 z-10 shadow-md' : 'shadow-sm'
                }`}
                title={`Token: "${tok.token}" | PPL: ${tok.perplexity.toFixed(1)} | P: ${(tok.prob * 100).toFixed(2)}% | Rank: #${tok.rank}`}
              >
                <span>{cleanToken(tok.token)}</span>
                <span className="ml-1 text-[9px] opacity-75 group-hover:opacity-100 font-normal">
                  {tok.perplexity < 100 ? tok.perplexity.toFixed(0) : '99+'}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Detailed Token Inspection Card */}
      {selectedToken && (
        <div className="mt-4 p-5 bg-[#f8faf8] rounded-xl border border-emerald-300 relative shadow-card animate-fadeIn">
          <button
            onClick={() => onSelectToken(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-200"
            title="Close inspection"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-3 pb-3 border-b border-[#e2e8f0]">
            <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-mono text-sm font-bold rounded-xl border border-emerald-300 shadow-sm">
              "{cleanToken(selectedToken.token)}"
            </span>
            <span className="text-xs text-slate-600 font-sans">
              Position: <strong className="text-slate-900 font-mono">#{selectedToken.index + 1}</strong>
            </span>
            <span className="text-xs text-slate-600 font-sans">
              Probability: <strong className="text-emerald-700 font-mono font-bold">{(selectedToken.prob * 100).toFixed(2)}%</strong>
            </span>
            <span className="text-xs text-slate-600 font-sans">
              Perplexity (1/P): <strong className="text-slate-900 font-mono font-bold">{selectedToken.perplexity.toFixed(2)}</strong>
            </span>
            <span className="text-xs text-slate-600 font-sans">
              Surprisal: <strong className="text-blue-700 font-mono font-bold">{selectedToken.surprisalBits.toFixed(2)} bits</strong>
            </span>
            <span className="text-xs text-slate-600 font-sans">
              Model Rank: <strong className="text-orange-700 font-mono font-bold">#{selectedToken.rank}</strong>
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2 font-sans">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
                Top Competing Alternatives Considered by Model
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Other words the model considered before this token was chosen
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedToken.topAlternatives.map((alt, idx) => {
                const isChosen = alt.token.trim().toLowerCase() === selectedToken.token.trim().toLowerCase();
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 shadow-sm ${
                      isChosen
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-white border-[#e2e8f0] text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono text-slate-400 w-5">
                        #{alt.rank}
                      </span>
                      <span className="font-mono font-semibold truncate">
                        "{cleanToken(alt.token)}"
                      </span>
                      {isChosen && (
                        <span className="text-[9px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isChosen ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          style={{ width: `${Math.min(100, Math.max(4, alt.prob * 100))}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-700 w-12 text-right">
                        {(alt.prob * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
