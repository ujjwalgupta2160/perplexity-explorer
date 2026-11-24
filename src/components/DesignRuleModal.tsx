import React from 'react';
import { X, Palette, Sparkles } from 'lucide-react';

interface DesignRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignRuleModal: React.FC<DesignRuleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#e8eee9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#d96b43]">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              50 / 30 / 20 Light Theme Design Framework
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Visual hierarchy & proportion balance inspired by clean editorial design
            </p>
          </div>
        </div>

        {/* Visual Proportion Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-mono mb-2 font-bold">
            <span className="text-slate-600">50% Crisp White Canvas</span>
            <span className="text-emerald-700">30% Structural Soft Cards</span>
            <span className="text-[#d96b43]">20% Terracotta & Pastel Accents</span>
          </div>
          <div className="w-full h-4 rounded-full overflow-hidden flex border border-[#e2e8f0] shadow-inner">
            <div className="h-full bg-white border-r border-[#e2e8f0] w-1/2 flex items-center justify-center text-[10px] font-mono text-slate-500 font-bold">
              50%
            </div>
            <div className="h-full bg-[#f8faf8] border-r border-[#e2e8f0] w-[30%] flex items-center justify-center text-[10px] font-mono text-emerald-800 font-bold">
              30%
            </div>
            <div className="h-full bg-gradient-to-r from-[#d96b43] to-emerald-500 w-[20%] flex items-center justify-center text-[10px] font-mono text-white font-bold">
              20%
            </div>
          </div>
        </div>

        {/* 3 Pillars Breakdown */}
        <div className="space-y-3.5">
          {/* 50% Canvas */}
          <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#e8eee9] flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-lg bg-white border border-[#cbd5e1] flex-shrink-0 mt-0.5 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-sans">50% — Dominant Canvas & Space (Pure White)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">#FFFFFF</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                Forms the airy, luminous backdrop, generous breathing margins, and readable serif/sans typography foundation.
              </p>
            </div>
          </div>

          {/* 30% Structural Surface */}
          <div className="p-4 rounded-2xl bg-[#f8faf8] border border-[#e8eee9] flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-lg bg-[#f1f5f2] border border-[#cbd5e1] flex-shrink-0 mt-0.5 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-sans">30% — Structural Surfaces & Cards (Soft Sage / Off-White)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200">#F8FAF8</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                Card containers, input trays, formula boxes, and token stream bounds with gentle rounded corners and subtle dropshadows.
              </p>
            </div>
          </div>

          {/* 20% Accent & High-Value Focal Points */}
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d96b43] to-emerald-500 flex-shrink-0 mt-0.5 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-sans">20% — High-Salience Accents (Terracotta & Pastel Mint)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-[#d96b43] border border-orange-200">Terracotta / Mint</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                Floating hero badges, token thermal chips (emerald, amber, rose, purple), probability meters, and active branch indicators.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#d96b43] hover:bg-[#c85e37] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-900/10"
          >
            Close & Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
