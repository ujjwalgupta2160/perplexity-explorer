import React, { useState } from 'react';
import { TokenEvaluation } from '../types';
import { cleanToken } from '../lib/ngramEngine';
import { LineChart } from 'lucide-react';

interface PerplexityGraphProps {
  tokens: TokenEvaluation[];
  onSelectToken: (token: TokenEvaluation) => void;
  selectedToken: TokenEvaluation | null;
}

export const PerplexityGraph: React.FC<PerplexityGraphProps> = ({
  tokens,
  onSelectToken,
  selectedToken
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (tokens.length === 0) return null;

  const width = 800;
  const height = 180;
  const padding = { top: 20, right: 25, bottom: 35, left: 45 };

  const maxPerplexity = Math.min(
    150,
    Math.max(25, ...tokens.map(t => Math.min(t.perplexity, 200)))
  );

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const getX = (idx: number) => {
    if (tokens.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (idx / (tokens.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.min(val, maxPerplexity);
    return padding.top + innerHeight - (clamped / maxPerplexity) * innerHeight;
  };

  const points = tokens.map((t, i) => `${getX(i)},${getY(t.perplexity)}`);
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${getX(0)},${padding.top + innerHeight} L ${points.join(' L ')} L ${getX(tokens.length - 1)},${padding.top + innerHeight} Z`;

  const avgPpl = tokens.reduce((acc, t) => acc + t.perplexity, 0) / tokens.length;
  const avgY = getY(avgPpl);

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-[#2d6a4f]" />
          <h2 className="text-sm font-bold text-slate-900 tracking-wide font-sans">
            Sequence Perplexity & Surprisal Trajectory
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-600" />
            <span>Token PPL</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-t border-dashed border-[#d96b43]" />
            <span>Avg ({avgPpl.toFixed(1)})</span>
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-[#f8faf8] rounded-xl p-3 border border-[#e8eee9]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[500px] overflow-visible"
        >
          <defs>
            <linearGradient id="pplLightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding.left}
            y1={getY(0)}
            x2={width - padding.right}
            y2={getY(0)}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          <line
            x1={padding.left}
            y1={getY(maxPerplexity / 2)}
            x2={width - padding.right}
            y2={getY(maxPerplexity / 2)}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1={padding.left}
            y1={getY(maxPerplexity)}
            x2={width - padding.right}
            y2={getY(maxPerplexity)}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Y Axis Labels */}
          <text x={padding.left - 8} y={getY(0) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
            0
          </text>
          <text x={padding.left - 8} y={getY(maxPerplexity / 2) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
            {Math.round(maxPerplexity / 2)}
          </text>
          <text x={padding.left - 8} y={getY(maxPerplexity) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
            {Math.round(maxPerplexity)}+
          </text>

          {/* Avg line */}
          <line
            x1={padding.left}
            y1={avgY}
            x2={width - padding.right}
            y2={avgY}
            stroke="#d96b43"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />

          {/* Area Fill & Curve Line */}
          <path d={areaD} fill="url(#pplLightGradient)" />
          <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {tokens.map((tok, i) => {
            const cx = getX(i);
            const cy = getY(tok.perplexity);
            const isHovered = hoveredIndex === i;
            const isSelected = selectedToken?.index === tok.index;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectToken(tok)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6 : isHovered ? 5 : 3.5}
                  fill={tok.perplexity < 5 ? '#10b981' : tok.perplexity < 25 ? '#f59e0b' : '#f43f5e'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />

                <text
                  x={cx}
                  y={height - 10}
                  textAnchor="middle"
                  className={`text-[9px] font-mono transition-colors ${
                    isSelected || isHovered ? 'fill-emerald-800 font-bold' : 'fill-slate-500'
                  }`}
                >
                  {cleanToken(tok.token).slice(0, 7)}
                </text>

                {(isHovered || isSelected) && (
                  <g>
                    <rect
                      x={Math.max(10, Math.min(width - 130, cx - 60))}
                      y={Math.max(5, cy - 35)}
                      width="120"
                      height="24"
                      rx="6"
                      fill="#1e293b"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    <text
                      x={Math.max(10, Math.min(width - 130, cx - 60)) + 60}
                      y={Math.max(5, cy - 35) + 16}
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-white font-semibold"
                    >
                      "{cleanToken(tok.token)}" ({tok.perplexity.toFixed(1)} PPL)
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
