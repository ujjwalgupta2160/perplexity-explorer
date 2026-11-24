import React from 'react';
import { SequenceMetrics } from '../types';
import { Activity, Flame, ShieldCheck, Gauge, Clock } from 'lucide-react';

interface MetricsBarProps {
  metrics: SequenceMetrics;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ metrics }) => {
  const getPerplexityColor = (ppl: number) => {
    if (ppl < 10) return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Highly Fluent' };
    if (ppl < 35) return { text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', label: 'Expected & Natural' };
    if (ppl < 90) return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Moderate Surprise' };
    return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', label: 'High Perplexity / Rare' };
  };

  const pplStatus = getPerplexityColor(metrics.perplexity);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Sequence Perplexity */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8eee9] shadow-card transition-all hover:border-emerald-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
            Sequence Perplexity
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold border ${pplStatus.bg} ${pplStatus.text} ${pplStatus.border}`}>
            {pplStatus.label}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold font-mono ${pplStatus.text}`}>
            {metrics.perplexity.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400 font-mono">PPL</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-sans">
          Geometric mean branching factor
        </p>
      </div>

      {/* Cross-Entropy Loss */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8eee9] shadow-card transition-all hover:border-blue-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            Cross-Entropy Loss
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            -ln(P)
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-blue-700">
            {metrics.crossEntropyLoss.toFixed(3)}
          </span>
          <span className="text-xs text-slate-400 font-mono">nats</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-sans">
          Average negative log-likelihood
        </p>
      </div>

      {/* High Surprise Tokens */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8eee9] shadow-card transition-all hover:border-orange-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Flame className="w-3.5 h-3.5 text-[#d96b43]" />
            Surprise Tokens
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {metrics.totalTokens} tokens
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-[#d96b43]">
            {metrics.highSurpriseCount}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({metrics.totalTokens > 0 ? Math.round((metrics.highSurpriseCount / metrics.totalTokens) * 100) : 0}%)
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-sans">
          Tokens with perplexity &gt; 25
        </p>
      </div>

      {/* Compute Speed & Efficiency */}
      <div className="bg-white rounded-2xl p-4 border border-[#e8eee9] shadow-card transition-all hover:border-emerald-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Engine Latency
          </span>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            0ms
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-emerald-700">
            {metrics.executionTimeMs}
          </span>
          <span className="text-xs text-slate-400 font-mono">ms</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-sans">
          Instantaneous evaluation
        </p>
      </div>
    </div>
  );
};
