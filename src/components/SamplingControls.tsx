import React from 'react';
import { Sliders, Thermometer, Filter, Layers } from 'lucide-react';
import { SamplingConfig } from '../types';

interface SamplingControlsProps {
  config: SamplingConfig;
  onChange: (newConfig: SamplingConfig) => void;
}

export const SamplingControls: React.FC<SamplingControlsProps> = ({
  config,
  onChange
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-4 shadow-card transition-all">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Sliders className="w-3.5 h-3.5 text-[#2d6a4f]" />
          Model Sampling Parameters
        </span>
        <span className="text-[11px] text-slate-500 font-mono">
          T: {config.temperature} | K: {config.topK} | P: {config.topP}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Temperature */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 flex items-center gap-1 font-sans font-medium">
              <Thermometer className="w-3 h-3 text-[#d96b43]" />
              Temperature (T)
            </span>
            <span className="font-mono font-bold text-[#d96b43]">
              {config.temperature.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.05"
            value={config.temperature}
            onChange={(e) => onChange({ ...config, temperature: parseFloat(e.target.value) })}
            className="w-full accent-[#d96b43] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-sans">
            <span>Sharp (0.1)</span>
            <span>Balanced (1.0)</span>
            <span>Flat (2.0)</span>
          </div>
        </div>

        {/* Top-K */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 flex items-center gap-1 font-sans font-medium">
              <Filter className="w-3 h-3 text-emerald-600" />
              Top-K Truncation
            </span>
            <span className="font-mono font-bold text-emerald-800">
              {config.topK}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={config.topK}
            onChange={(e) => onChange({ ...config, topK: parseInt(e.target.value) })}
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-sans">
            <span>Greedy (1)</span>
            <span>Focused (15)</span>
            <span>Broad (40)</span>
          </div>
        </div>

        {/* Top-P (Nucleus) */}
        <div className="bg-[#f8faf8] p-3 rounded-xl border border-[#e8eee9]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 flex items-center gap-1 font-sans font-medium">
              <Layers className="w-3 h-3 text-blue-600" />
              Top-P (Nucleus)
            </span>
            <span className="font-mono font-bold text-blue-800">
              {(config.topP * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={config.topP}
            onChange={(e) => onChange({ ...config, topP: parseFloat(e.target.value) })}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-sans">
            <span>20%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
