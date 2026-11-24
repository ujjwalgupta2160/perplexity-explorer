import React from 'react';
import { Cpu, Palette, Info, Zap } from 'lucide-react';
import { ModelMode } from '../types';
import { UjjwalGuptaLogo } from './UjjwalGuptaLogo';

interface HeaderProps {
  modelMode: ModelMode;
  onModelModeChange: (mode: ModelMode) => void;
  onOpenDesignModal: () => void;
  onnxStatus?: string;
  onnxProgress?: number;
}

export const Header: React.FC<HeaderProps> = ({
  modelMode,
  onModelModeChange,
  onOpenDesignModal,
  onnxStatus,
  onnxProgress
}) => {
  return (
    <header className="border-b border-[#eef2ee] bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Trademark Brand Logo for Ujjwal Gupta™ */}
        <UjjwalGuptaLogo />

        {/* Center / Controls (Preserved exactly as requested) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Model Switcher */}
          <div className="flex items-center bg-[#f8faf8] p-1 rounded-2xl border border-[#e2e8f0] text-xs">
            <button
              onClick={() => onModelModeChange('fast-ngram')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                modelMode === 'fast-ngram'
                  ? 'bg-white text-emerald-900 border border-emerald-200 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Instant zero-latency statistical & neural n-gram hybrid"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Engine (0ms)</span>
            </button>
            <button
              onClick={() => onModelModeChange('gpt2-onnx')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                modelMode === 'gpt2-onnx'
                  ? 'bg-white text-purple-900 border border-purple-200 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Runs ONNX GPT-2 neural network in your browser via WebAssembly"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              <span>ONNX GPT-2</span>
              {onnxProgress !== undefined && onnxProgress > 0 && onnxProgress < 100 && (
                <span className="text-[10px] text-purple-600 animate-pulse font-mono">({onnxProgress}%)</span>
              )}
            </button>
          </div>

          {/* 50-30-20 Rule Badge */}
          <button
            onClick={onOpenDesignModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-[#d96b43]/40"
            title="Inspect the Light 50-30-20 design framework"
          >
            <Palette className="w-3.5 h-3.5 text-[#d96b43]" />
            <span className="font-mono">50 / 30 / 20 Design</span>
            <Info className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
