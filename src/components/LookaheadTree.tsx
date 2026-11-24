import React from 'react';
import { BranchNode } from '../types';
import { cleanToken } from '../lib/ngramEngine';
import { CornerDownRight, ArrowRight, Network } from 'lucide-react';

interface LookaheadTreeProps {
  rootNode: BranchNode;
  onAppendPath: (tokens: string[]) => void;
}

export const LookaheadTree: React.FC<LookaheadTreeProps> = ({
  rootNode,
  onAppendPath
}) => {
  let totalPaths = 0;
  function countLeaves(node: BranchNode): number {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((acc, c) => acc + countLeaves(c), 0);
  }
  totalPaths = countLeaves(rootNode);

  const handleNodeClick = (node: BranchNode, pathTokens: string[]) => {
    onAppendPath(pathTokens);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8eee9] p-5 shadow-card transition-all hover:border-emerald-200 flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans">
            <Network className="w-4 h-4 text-[#2d6a4f]" />
            Next-Token Lookahead Tree ("How Many After It")
          </h2>
          <p className="text-[11px] text-slate-500 font-sans">
            Multi-step branching paths showing conditional next-word trajectories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {totalPaths} Branch Paths
          </span>
        </div>
      </div>

      {/* Visual Tree Explorer */}
      <div className="p-4 bg-[#f8faf8] rounded-xl border border-[#e8eee9] overflow-x-auto min-h-[300px]">
        {(!rootNode.children || rootNode.children.length === 0) ? (
          <div className="p-6 text-center text-slate-400 text-xs font-sans">
            Type text above to compute downstream lookahead tree.
          </div>
        ) : (
          <div className="space-y-4 min-w-[500px]">
            {rootNode.children.map((step1) => {
              const step1Tokens = [step1.token];
              return (
                <div key={step1.id} className="relative pl-3 border-l-2 border-emerald-400">
                  {/* Step 1 Node */}
                  <div className="flex items-center gap-2 group mb-2">
                    <button
                      onClick={() => handleNodeClick(step1, step1Tokens)}
                      className="px-3 py-1 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:ring-2 hover:ring-emerald-400"
                      title="Click to append this token"
                    >
                      <span>"{cleanToken(step1.token)}"</span>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        ({(step1.prob * 100).toFixed(1)}%)
                      </span>
                    </button>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-mono text-slate-500">
                      Step +1 ({step1.children?.length || 0} branches after it)
                    </span>
                  </div>

                  {/* Step 2 Nodes */}
                  <div className="pl-4 space-y-2 border-l border-blue-200 ml-2">
                    {step1.children.map((step2) => {
                      const step2Tokens = [step1.token, step2.token];
                      return (
                        <div key={step2.id} className="relative">
                          <div className="flex items-center gap-2 group mb-1.5">
                            <button
                              onClick={() => handleNodeClick(step2, step2Tokens)}
                              className="px-2.5 py-0.5 rounded-xl bg-white hover:bg-blue-50 border border-blue-300 text-blue-900 font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:ring-2 hover:ring-blue-400"
                              title="Click to append path"
                            >
                              <span>"{cleanToken(step2.token)}"</span>
                              <span className="text-[9px] text-blue-700 font-medium">
                                ({(step2.prob * 100).toFixed(1)}%)
                              </span>
                            </button>
                            <span className="text-[9px] font-mono text-slate-500">
                              Path: {(step2.cumulativeProb * 100).toFixed(1)}%
                            </span>
                          </div>

                          {/* Step 3 Nodes */}
                          {step2.children && step2.children.length > 0 && (
                            <div className="pl-4 flex flex-wrap gap-1.5 pt-1 pb-1">
                              {step2.children.map((step3) => {
                                const step3Tokens = [step1.token, step2.token, step3.token];
                                return (
                                  <button
                                    key={step3.id}
                                    onClick={() => handleNodeClick(step3, step3Tokens)}
                                    className="px-2 py-0.5 rounded-lg bg-white hover:bg-orange-50 border border-[#e2e8f0] hover:border-orange-300 text-slate-700 hover:text-orange-900 font-mono text-[10px] font-medium flex items-center gap-1 transition-all shadow-sm"
                                    title={`Append full trajectory: "${cleanToken(step1.token)} ${cleanToken(step2.token)} ${cleanToken(step3.token)}" | Path: ${(step3.cumulativeProb * 100).toFixed(2)}%`}
                                  >
                                    <CornerDownRight className="w-2.5 h-2.5 text-slate-400" />
                                    <span>"{cleanToken(step3.token)}"</span>
                                    <span className="text-[9px] text-orange-700 font-bold">
                                      {(step3.cumulativeProb * 100).toFixed(1)}%
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-2.5 text-[11px] text-slate-500 flex items-center justify-between font-sans">
        <span>Click any node in the tree to automatically append that path to your prompt.</span>
        <span className="font-mono text-[10px] text-slate-400">Chain rule: P(A,B,C) = P(A) · P(B|A) · P(C|A,B)</span>
      </div>
    </div>
  );
};
