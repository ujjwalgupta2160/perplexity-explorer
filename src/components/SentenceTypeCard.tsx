import React from 'react';
import { SentenceAnalysis } from '../types';
import { BookOpen, BarChart3 } from 'lucide-react';

interface SentenceTypeCardProps {
  analysis: SentenceAnalysis;
}

export const SentenceTypeCard: React.FC<SentenceTypeCardProps> = ({ analysis }) => {
  const getTypeBadge = (type: SentenceAnalysis['type']) => {
    switch (type) {
      case 'Declarative':
        return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
      case 'Interrogative':
        return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' };
      case 'Conditional':
        return { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' };
      case 'Imperative':
        return { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' };
      case 'Exclamatory':
        return { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' };
      default:
        return { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' };
    }
  };

  const badgeStyle = getTypeBadge(analysis.type);

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#2d6a4f]" />
          <h2 className="text-sm font-bold text-slate-900 tracking-wide font-sans">
            Sentence Type & Linguistic Architecture
          </h2>
        </div>
        <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
          {analysis.type} Sentence
        </span>
      </div>

      {/* Grid of Linguistic Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Sentence Mood */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block mb-1">
            Sentence Mood
          </span>
          <div className="text-sm font-bold text-slate-900">
            {analysis.type}
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
            {analysis.typeDescription}
          </p>
        </div>

        {/* Clause Complexity */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block mb-1">
            Grammar Complexity
          </span>
          <div className="text-sm font-bold text-blue-900">
            {analysis.complexity}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            {analysis.complexity === 'Simple' && 'Single independent clause'}
            {analysis.complexity === 'Compound' && 'Joined independent clauses'}
            {analysis.complexity === 'Complex' && 'Dependent + independent clause'}
            {analysis.complexity === 'Compound-Complex' && 'Multiple clauses joined'}
            {analysis.complexity === 'Fragment' && 'Partial incomplete clause'}
          </p>
        </div>

        {/* Tone & Style */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block mb-1">
            Discourse Tone
          </span>
          <div className="text-sm font-bold text-emerald-900 truncate">
            {analysis.tone}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Vocabulary & syntactic register
          </p>
        </div>

        {/* Readability Score */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block mb-1">
            Flesch Readability
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono text-orange-700">
              {analysis.readabilityScore}
            </span>
            <span className="text-[10px] text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 truncate" title={analysis.readabilityGrade}>
            {analysis.readabilityGrade}
          </p>
        </div>
      </div>

      {/* Likely Next Part-of-Speech Predictions */}
      <div className="bg-[#f8faf8] p-3.5 rounded-xl border border-[#e8eee9]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-sans">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            Syntactic Transition Model: Expected Next Part-of-Speech
          </span>
          <span className="text-[10px] font-mono font-medium text-slate-500">
            {analysis.completeness}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {analysis.likelyNextPOS.map((pos, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] text-xs shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-800">{pos.category}</span>
                <span className="font-mono text-emerald-700 font-bold">
                  {Math.round(pos.probability * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.round(pos.probability * 100)}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                e.g. {pos.examples.map(e => `"${e}"`).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
