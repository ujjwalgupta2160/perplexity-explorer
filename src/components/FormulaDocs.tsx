import React from 'react';
import { SequenceMetrics, TokenEvaluation } from '../types';
import { Calculator, Zap } from 'lucide-react';

interface FormulaDocsProps {
  metrics: SequenceMetrics;
  tokens: TokenEvaluation[];
  temperature: number;
}

export const FormulaDocs: React.FC<FormulaDocsProps> = ({
  metrics,
  tokens,
  temperature
}) => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-[#e8eee9] p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-wide font-sans">
                Formulas & Mathematical Documentation
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Rigorous mathematical definitions, proofs, and live calculations powering the Perplexity Explorer
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            N = {tokens.length} Tokens Evaluated
          </span>
        </div>
      </div>

      {/* Live Calculation Walkthrough */}
      <div className="bg-white rounded-2xl border border-[#e8eee9] p-6 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#d96b43]" />
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Live Calculation Walkthrough for Your Current Input
          </h3>
        </div>

        <div className="p-4 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs space-y-2.5 leading-relaxed">
          <div className="text-slate-600 flex items-center justify-between flex-wrap gap-2">
            <span>1. Token Count (N): <strong className="text-slate-900">{metrics.totalTokens}</strong></span>
            <span>2. Avg Negative Log-Likelihood: <strong className="text-emerald-700">{metrics.crossEntropyLoss.toFixed(4)} nats</strong></span>
            <span>3. Sequence Perplexity: <strong className="text-[#d96b43]">{metrics.perplexity.toFixed(2)}</strong></span>
            <span>4. Avg Surprisal: <strong className="text-blue-700">{metrics.avgSurprisalBits.toFixed(2)} bits/token</strong></span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] text-slate-800 text-[11px] overflow-x-auto shadow-sm">
            <span className="text-slate-500 block mb-1">Step-by-step Perplexity Formula Application:</span>
            <code>
              PPL = exp( - (1 / {metrics.totalTokens || 1}) · ∑ ln P(w_i | ctx) )
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;= exp( {metrics.crossEntropyLoss.toFixed(4)} )
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;= <strong className="text-emerald-700 font-bold">{metrics.perplexity.toFixed(2)}</strong>
            </code>
          </div>
        </div>
      </div>

      {/* Grid of Detailed Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formula 1: Token Probability & Softmax */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Formula 1</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Sampling & Next Word
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Softmax with Temperature P(w<sub>i</sub> | w<sub>&lt;i</sub>)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-emerald-800 font-bold mb-3 overflow-x-auto">
              P(w_i) = exp( z_i / T ) / ∑_j exp( z_j / T )
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Converts raw language model logits z_i into a normalized probability distribution summing to 1.
            </p>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside font-sans">
              <li><strong>z_i</strong>: Unnormalized logit score for candidate token i.</li>
              <li><strong>T (Temperature = {temperature.toFixed(2)})</strong>: Controls sharpness. As T &rarr; 0, distribution approaches greedy argmax; as T increases, distribution flattens uniformly.</li>
            </ul>
          </div>
        </div>

        {/* Formula 2: Individual Token Perplexity */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#d96b43] uppercase">Formula 2</span>
              <span className="text-[10px] bg-orange-50 text-[#d96b43] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                Surprise Measure
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Individual Token Perplexity (PPL<sub>i</sub>)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-[#d96b43] font-bold mb-3 overflow-x-auto">
              PPL(w_i) = 1 / P(w_i | w_&lt;i) = exp( - ln P(w_i) )
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Measures how surprised the model was to see word w_i.
            </p>
            <p className="text-[11px] text-slate-600 leading-snug font-sans">
              <strong>Intuitive meaning:</strong> If a token has probability P = 0.20 (20%), its perplexity is 1 / 0.2 = 5. This means observing that token was as surprising as picking 1 out of 5 equally likely random choices.
            </p>
          </div>
        </div>

        {/* Formula 3: Sequence Perplexity */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-800 uppercase">Formula 3</span>
              <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                Global Evaluation
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Sequence-Level Perplexity (PPL<sub>seq</sub>)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-blue-800 font-bold mb-3 overflow-x-auto">
              PPL(W) = exp( - (1 / N) ∑_&#123;i=1&#125;^N ln P(w_i | w_&lt;i) )
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              The exponentiated cross-entropy loss over the entire sequence of N tokens.
            </p>
            <p className="text-[11px] text-slate-600 leading-snug font-sans">
              Equivalently, it is the geometric mean of the inverse probabilities. Lower values signify a more fluent, predictable, and natural sentence.
            </p>
          </div>
        </div>

        {/* Formula 4: Cross-Entropy Loss */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-800 uppercase">Formula 4</span>
              <span className="text-[10px] bg-purple-50 text-purple-800 font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
                Loss Function
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Cross-Entropy Loss (L<sub>CE</sub>)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-purple-800 font-bold mb-3 overflow-x-auto">
              L_&#123;CE&#125; = - (1 / N) ∑_&#123;i=1&#125;^N ln P(w_i | w_&lt;i)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Standard training loss function for causal language models. Direct mathematical bridge: PPL = exp( L_&#123;CE&#125; ).
            </p>
          </div>
        </div>

        {/* Formula 5: Shannon Surprisal */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-800 uppercase">Formula 5</span>
              <span className="text-[10px] bg-rose-50 text-rose-800 font-bold px-2.5 py-0.5 rounded-full border border-rose-200">
                Information Theory
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Shannon Self-Information / Surprisal (Bits)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-rose-800 font-bold mb-3 overflow-x-auto">
              I(w_i) = - log_2 P(w_i | w_&lt;i)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Quantifies information content conveyed by token w_i measured in binary bits.
            </p>
            <p className="text-[11px] text-slate-600 leading-snug font-sans">
              A word with P = 0.5 has I = -log₂(0.5) = 1 bit. A rare word with P = 0.001 has I = -log₂(0.001) &approx; 9.97 bits.
            </p>
          </div>
        </div>

        {/* Formula 6: Distribution Entropy */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-800 uppercase">Formula 6</span>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                Uncertainty Metric
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Entropy of Next-Token Distribution H(X)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-teal-800 font-bold mb-3 overflow-x-auto">
              H(X) = - ∑_&#123;k&#125; P(w_k) · log_2 P(w_k)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Measures the model's uncertainty at that specific position. Low entropy (&lt;1 bit) means high confidence; high entropy indicates branching ambiguity.
            </p>
          </div>
        </div>

        {/* Formula 7: Multi-Step Lookahead Path Probability */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Formula 7</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Chain Rule & Tree
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Joint Path Probability (Lookahead Tree)
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-emerald-800 font-bold mb-3 overflow-x-auto">
              P(w_&#123;t+1&#125;, w_&#123;t+2&#125;, ..., w_&#123;t+k&#125;) = ∏_&#123;j=1&#125;^k P(w_&#123;t+j&#125; | w_&#123;&lt;t+j&#125;)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Multiplies conditional probabilities down each branch of the lookahead tree to score multi-token trajectories.
            </p>
            <p className="text-[11px] text-slate-600 leading-snug font-sans">
              For example: P("is") · P("a" | "is") · P("model" | "is a") = Path Probability.
            </p>
          </div>
        </div>

        {/* Formula 8: Top-P Nucleus Sampling */}
        <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#d96b43] uppercase">Formula 8</span>
              <span className="text-[10px] bg-orange-50 text-[#d96b43] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                Truncation
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-sans">
              Top-P (Nucleus) Probability Mass Threshold
            </h4>
            <div className="p-3 bg-[#f8faf8] rounded-xl border border-[#e8eee9] font-mono text-xs text-[#d96b43] font-bold mb-3 overflow-x-auto">
              ∑_&#123;w &isin; V^(p)&#125; P(w | ctx) &ge; p
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2 font-sans">
              Selects the smallest subset of vocabulary V<sup>(p)</sup> whose cumulative probability exceeds threshold p (e.g. 0.90).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
