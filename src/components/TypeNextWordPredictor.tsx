import React, { useState, useMemo } from 'react';
import { evaluateCustomWord, cleanToken } from '../lib/ngramEngine';
import { SamplingConfig, CustomWordResult, TokenPrediction } from '../types';
import { Keyboard, ArrowRight, Sparkles } from 'lucide-react';

interface TypeNextWordPredictorProps {
  contextTokens: string[];
  config: SamplingConfig;
  onAppendWord: (word: string) => void;
  topCandidates: TokenPrediction[];
}

export const TypeNextWordPredictor: React.FC<TypeNextWordPredictorProps> = ({
  contextTokens,
  config,
  onAppendWord,
  topCandidates
}) => {
  const [typedWord, setTypedWord] = useState<string>('');

  const evaluation: CustomWordResult | null = useMemo(() => {
    if (!typedWord.trim()) return null;
    return evaluateCustomWord(contextTokens, typedWord, config);
  }, [contextTokens, typedWord, config]);

  const handleAppend = () => {
    if (!typedWord.trim()) return;
    const formatted = typedWord.startsWith(' ') ? typedWord : ` ${typedWord.trim()}`;
    onAppendWord(formatted);
    setTypedWord('');
  };

  const getCategoryStyle = (cat: CustomWordResult['category']) => {
    switch (cat) {
      case 'Top Candidate':
        return { text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'Likely':
        return { text: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'Uncommon':
        return { text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200' };
      default:
        return { text: 'text-rose-800', bg: 'bg-rose-50', border: 'border-rose-200' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans">
            <Keyboard className="w-4 h-4 text-[#2d6a4f]" />
            Type the Next Word (Interactive Prediction Tester)
          </h2>
          <p className="text-[11px] text-slate-500 font-sans">
            Type any candidate word to test what probability and rank the model assigns to it
          </p>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Live Model Check
        </span>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={typedWord}
            onChange={(e) => setTypedWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && typedWord.trim()) handleAppend();
            }}
            placeholder="Type a word (e.g. 'learning', 'computed', 'not', 'easily')..."
            className="w-full bg-[#f8faf8] border border-[#e2e8f0] focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-inner"
          />
        </div>

        <button
          onClick={handleAppend}
          disabled={!typedWord.trim()}
          className="px-4 py-2.5 bg-[#d96b43] hover:bg-[#c85e37] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-orange-900/10"
        >
          <span>Append Word</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Live Model Evaluation Result */}
      {evaluation ? (
        <div className="p-4 bg-[#f8faf8] rounded-xl border border-[#e8eee9] mb-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-slate-900">
                "{typedWord.trim()}"
              </span>
              {(() => {
                const s = getCategoryStyle(evaluation.category);
                return (
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                    {evaluation.category}
                  </span>
                );
              })()}
            </div>
            <span className="text-xs text-slate-600 font-mono">
              Model Rank: <strong className="text-slate-900">#{evaluation.rank}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block">Probability P:</span>
              <span className="font-bold text-emerald-700 text-sm">
                {(evaluation.prob * 100).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Perplexity (1/P):</span>
              <span className="font-bold text-slate-800 text-sm">
                {evaluation.perplexity.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Information Bits:</span>
              <span className="font-bold text-blue-700 text-sm">
                {evaluation.surprisalBits.toFixed(2)} bits
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Logprob:</span>
              <span className="font-bold text-slate-700 text-sm">
                {evaluation.logprob.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-slate-500 mb-3 font-sans">
          Or try clicking one of the model's top predicted candidate words below:
        </div>
      )}

      {/* Quick suggestions chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-[#d96b43] font-bold flex items-center gap-1 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#d96b43]" />
          Quick Test:
        </span>
        {topCandidates.slice(0, 6).map((c, i) => (
          <button
            key={i}
            onClick={() => setTypedWord(c.token.trim())}
            className="px-2.5 py-1 bg-[#f4f7f4] hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-mono rounded-xl border border-[#e2e8f0] hover:border-emerald-300 transition-all font-medium"
          >
            "{cleanToken(c.token).trim()}" ({(c.prob * 100).toFixed(1)}%)
          </button>
        ))}
      </div>
    </div>
  );
};
