import React, { useState, useMemo } from 'react';
import { TokenEvaluation } from '../types';
import { cleanToken } from '../lib/ngramEngine';
import { Table, ArrowUpDown, Flame, CheckCircle } from 'lucide-react';

interface WordProbabilityTableProps {
  tokens: TokenEvaluation[];
  onSelectToken: (token: TokenEvaluation) => void;
  selectedToken: TokenEvaluation | null;
}

type SortField = 'index' | 'prob' | 'perplexity' | 'surprisalBits' | 'rank';

export const WordProbabilityTable: React.FC<WordProbabilityTableProps> = ({
  tokens,
  onSelectToken,
  selectedToken
}) => {
  const [sortField, setSortField] = useState<SortField>('index');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [filterMode, setFilterMode] = useState<'all' | 'high-surprise' | 'expected'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'index');
    }
  };

  const { mostSurprising, mostExpected } = useMemo(() => {
    if (tokens.length === 0) return { mostSurprising: null, mostExpected: null };
    let highestSurprise = tokens[0];
    let highestProb = tokens[0];
    for (const t of tokens) {
      if (t.perplexity > highestSurprise.perplexity) highestSurprise = t;
      if (t.prob > highestProb.prob) highestProb = t;
    }
    return { mostSurprising: highestSurprise, mostExpected: highestProb };
  }, [tokens]);

  const filteredAndSortedTokens = useMemo(() => {
    let list = [...tokens];
    if (filterMode === 'high-surprise') {
      list = list.filter(t => t.perplexity > 20);
    } else if (filterMode === 'expected') {
      list = list.filter(t => t.perplexity <= 5);
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [tokens, sortField, sortAsc, filterMode]);

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200 flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans">
            <Table className="w-4 h-4 text-[#2d6a4f]" />
            Word-by-Word Probability & Surprisal Table
          </h2>
          <p className="text-[11px] text-slate-500 font-sans">
            Conditional probability P(w<sub>i</sub> | context), logprobs, and information bits for each word
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-[#f8faf8] p-1 rounded-xl border border-[#e2e8f0] text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Words ({tokens.length})
          </button>
          <button
            onClick={() => setFilterMode('high-surprise')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'high-surprise'
                ? 'bg-rose-50 text-rose-800 border border-rose-200 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            High Surprise (&gt;20 PPL)
          </button>
          <button
            onClick={() => setFilterMode('expected')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'expected'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Expected (&le;5 PPL)
          </button>
        </div>
      </div>

      {/* Highlights: Most Surprising & Most Expected */}
      {mostSurprising && mostExpected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-rose-600" />
              <div>
                <span className="text-[10px] text-rose-700 uppercase font-mono font-bold block">Highest Surprise Word</span>
                <span className="text-xs font-mono font-bold text-slate-900">"{cleanToken(mostSurprising.token)}"</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-rose-700 font-bold">{mostSurprising.perplexity.toFixed(1)} PPL</span>
              <span className="text-[10px] text-slate-500 block">{(mostSurprising.prob * 100).toFixed(2)}% prob</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-emerald-700 uppercase font-mono font-bold block">Most Fluent Word</span>
                <span className="text-xs font-mono font-bold text-slate-900">"{cleanToken(mostExpected.token)}"</span>
              </div>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-emerald-700 font-bold">{mostExpected.perplexity.toFixed(1)} PPL</span>
              <span className="text-[10px] text-slate-500 block">{(mostExpected.prob * 100).toFixed(1)}% prob</span>
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#e8eee9]">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead className="bg-[#f8faf8] text-slate-600 text-[11px] border-b border-[#e8eee9] font-bold">
            <tr>
              <th
                onClick={() => handleSort('index')}
                className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-1">
                  <span>#</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5">Word / Token</th>
              <th
                onClick={() => handleSort('prob')}
                className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-1">
                  <span>Probability P(w|ctx)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('perplexity')}
                className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-1">
                  <span>Perplexity (1/P)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('surprisalBits')}
                className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-1">
                  <span>Surprisal (-log₂ P)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('rank')}
                className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-1">
                  <span>Rank</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3.5">Top Alternative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8eee9] bg-white">
            {filteredAndSortedTokens.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-400 font-sans">
                  No tokens match the current filter.
                </td>
              </tr>
            ) : (
              filteredAndSortedTokens.map((tok) => {
                const isSelected = selectedToken?.index === tok.index;
                const topAlt = tok.topAlternatives[0];
                return (
                  <tr
                    key={tok.index}
                    onClick={() => onSelectToken(tok)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                      isSelected ? 'bg-emerald-50 text-emerald-950 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3.5 text-slate-400 font-mono">
                      #{tok.index + 1}
                    </td>
                    <td className="py-2.5 px-3.5 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100">
                        "{cleanToken(tok.token)}"
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              tok.prob > 0.25 ? 'bg-emerald-500' : tok.prob > 0.05 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(4, tok.prob * 100))}%` }}
                          />
                        </div>
                        <span className="font-bold">
                          {(tok.prob * 100).toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3.5">
                      <span className={`font-bold ${
                        tok.perplexity < 4 ? 'text-emerald-700' : tok.perplexity < 25 ? 'text-amber-700' : 'text-rose-700'
                      }`}>
                        {tok.perplexity.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-blue-800 font-bold">
                      {tok.surprisalBits.toFixed(2)} bits
                    </td>
                    <td className="py-2.5 px-3.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-bold">
                        #{tok.rank}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600">
                      {topAlt ? (
                        <span>"{cleanToken(topAlt.token)}" ({(topAlt.prob * 100).toFixed(1)}%)</span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
