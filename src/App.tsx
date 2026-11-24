import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { InputArea } from './components/InputArea';
import { TokenStreamView } from './components/TokenStreamView';
import { NextWordDistribution } from './components/NextWordDistribution';
import { LookaheadTree } from './components/LookaheadTree';
import { SamplingControls } from './components/SamplingControls';
import { DesignRuleModal } from './components/DesignRuleModal';
import { SentenceTypeCard } from './components/SentenceTypeCard';
import { WordProbabilityTable } from './components/WordProbabilityTable';
import { TypeNextWordPredictor } from './components/TypeNextWordPredictor';
import { PerplexityGraph } from './components/PerplexityGraph';
import { FormulaDocs } from './components/FormulaDocs';
import { PhotoHeroSection } from './components/PhotoHeroSection';
import { UjjwalGuptaLogo, UjjwalGuptaTrademarkBadge } from './components/UjjwalGuptaLogo';
import {
  evaluateFullSequence,
  predictNextTokenDistribution,
  buildLookaheadTree,
  tokenizeText
} from './lib/ngramEngine';
import { analyzeSentenceStructure } from './lib/sentenceAnalyzer';
import { transformerEngine } from './lib/transformerEngine';
import { ModelMode, SamplingConfig, TokenEvaluation } from './types';
import {
  LayoutGrid,
  Table,
  Network,
  Calculator
} from 'lucide-react';

type ActiveTab = 'overview' | 'word-table' | 'lookahead-tree' | 'formula-docs';

export function App() {
  const [inputText, setInputText] = useState<string>(
    "The mystery behind artificial intelligence is"
  );
  const [modelMode, setModelMode] = useState<ModelMode>('fast-ngram');
  const [samplingConfig, setSamplingConfig] = useState<SamplingConfig>({
    temperature: 1.0,
    topK: 15,
    topP: 0.95
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedToken, setSelectedToken] = useState<TokenEvaluation | null>(null);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState<boolean>(false);
  const [onnxProgress, setOnnxProgress] = useState<number>(0);
  const [onnxStatus, setOnnxStatus] = useState<string>('');

  const workstationRef = useRef<HTMLDivElement>(null);

  const handleModelModeChange = (mode: ModelMode) => {
    setModelMode(mode);
    if (mode === 'gpt2-onnx' && !transformerEngine.isReady()) {
      transformerEngine.setProgressCallback((p) => {
        setOnnxProgress(p.progress);
        setOnnxStatus(p.message);
      });
      transformerEngine.loadModel('Xenova/gpt2');
    }
  };

  const evaluationResult = useMemo(() => {
    return evaluateFullSequence(inputText, samplingConfig);
  }, [inputText, samplingConfig]);

  const currentTokens = useMemo(() => {
    return tokenizeText(inputText);
  }, [inputText]);

  const nextCandidates = useMemo(() => {
    return predictNextTokenDistribution(currentTokens, samplingConfig);
  }, [currentTokens, samplingConfig]);

  const lookaheadTree = useMemo(() => {
    return buildLookaheadTree(currentTokens, samplingConfig, 3, 3);
  }, [currentTokens, samplingConfig]);

  const sentenceAnalysis = useMemo(() => {
    return analyzeSentenceStructure(inputText);
  }, [inputText]);

  const handleAppendToken = (token: string) => {
    setInputText((prev) => prev + token);
    setSelectedToken(null);
  };

  const handleAppendPath = (tokens: string[]) => {
    setInputText((prev) => prev + tokens.join(''));
    setSelectedToken(null);
  };

  const handleClear = () => {
    setInputText('');
    setSelectedToken(null);
  };

  const scrollToWorkstation = () => {
    workstationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-950">
      {/* Light Navbar with Ujjwal Gupta™ Logo */}
      <Header
        modelMode={modelMode}
        onModelModeChange={handleModelModeChange}
        onOpenDesignModal={() => setIsDesignModalOpen(true)}
        onnxStatus={onnxStatus}
        onnxProgress={onnxProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Editorial Photo Hero Section */}
        <PhotoHeroSection
          onExploreClick={scrollToWorkstation}
          metrics={evaluationResult.metrics}
        />

        {/* Interactive Lab Workstation Anchor */}
        <div ref={workstationRef} className="pt-2 space-y-6">
          {/* Top Metric Cards */}
          <MetricsBar metrics={evaluationResult.metrics} />

          {/* Navigation Tabs for All 5 Core Capabilities + Formula Docs */}
          <div className="flex items-center justify-between border-b border-[#eef2ee] pb-3 gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#f8faf8] p-1.5 rounded-2xl border border-[#e2e8f0] text-xs flex-wrap">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white text-emerald-950 shadow-sm border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
                <span>Explorer & Type Next Word</span>
              </button>
              <button
                onClick={() => setActiveTab('word-table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === 'word-table'
                    ? 'bg-white text-emerald-950 shadow-sm border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5 text-blue-600" />
                <span>Each Word Probability & Trajectory</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {evaluationResult.tokens.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('lookahead-tree')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === 'lookahead-tree'
                    ? 'bg-white text-purple-950 shadow-sm border border-purple-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-purple-600" />
                <span>Lookahead Tree (Branches)</span>
              </button>
              <button
                onClick={() => setActiveTab('formula-docs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === 'formula-docs'
                    ? 'bg-white text-orange-950 shadow-sm border border-orange-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-[#d96b43]" />
                <span>Formula Docs (Math & Definitions)</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2 font-sans font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span>
                {sentenceAnalysis.type} • {sentenceAnalysis.wordCount} words
              </span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & NEXT WORD INTERACTION */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Input, Sentence Type, Token Stream, Type Next Word */}
                <div className="lg:col-span-2 space-y-5">
                  <InputArea
                    text={inputText}
                    onChange={setInputText}
                    onClear={handleClear}
                    tokenCount={evaluationResult.tokens.length}
                  />

                  {/* 1. Type of Sentence (Requirement #1) */}
                  <SentenceTypeCard analysis={sentenceAnalysis} />

                  {/* 4. Type the Next Word (Requirement #4) */}
                  <TypeNextWordPredictor
                    contextTokens={currentTokens}
                    config={samplingConfig}
                    onAppendWord={handleAppendToken}
                    topCandidates={nextCandidates}
                  />

                  {/* Token-by-Token Perplexity Stream & Heatmap */}
                  <TokenStreamView
                    tokens={evaluationResult.tokens}
                    selectedToken={selectedToken}
                    onSelectToken={setSelectedToken}
                  />
                </div>

                {/* Right Column: Sampling Controls & Next Word Probability */}
                <div className="space-y-5 flex flex-col">
                  <SamplingControls
                    config={samplingConfig}
                    onChange={setSamplingConfig}
                  />

                  {/* 2. Probability of Next Word (Requirement #2) */}
                  <div className="flex-1">
                    <NextWordDistribution
                      candidates={nextCandidates}
                      onAppendToken={handleAppendToken}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EACH WORD PROBABILITY TABLE & TRAJECTORY GRAPH */}
          {activeTab === 'word-table' && (
            <div className="space-y-6">
              {/* Perplexity Line Trajectory Graph */}
              <PerplexityGraph
                tokens={evaluationResult.tokens}
                onSelectToken={setSelectedToken}
                selectedToken={selectedToken}
              />

              {/* 3. Each Word Probability Table (Requirement #3) */}
              <WordProbabilityTable
                tokens={evaluationResult.tokens}
                onSelectToken={setSelectedToken}
                selectedToken={selectedToken}
              />
            </div>
          )}

          {/* TAB 3: LOOKAHEAD TREE */}
          {activeTab === 'lookahead-tree' && (
            <div className="space-y-6">
              <LookaheadTree
                rootNode={lookaheadTree}
                onAppendPath={handleAppendPath}
              />
            </div>
          )}

          {/* TAB 4: FORMULA DOCS */}
          {activeTab === 'formula-docs' && (
            <FormulaDocs
              metrics={evaluationResult.metrics}
              tokens={evaluationResult.tokens}
              temperature={samplingConfig.temperature}
            />
          )}
        </div>
      </main>

      {/* Light Clean Footer with Trademark Accreditation */}
      <footer className="border-t border-[#e8eee9] bg-[#f8faf8] py-8 text-xs text-slate-500 mt-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <UjjwalGuptaLogo showSubtitle={false} />

            <div className="flex items-center gap-3">
              <UjjwalGuptaTrademarkBadge />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDesignModalOpen(true)}
                className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-800 transition-colors font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>50 / 30 / 20 Light Rule Active</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[#e8eee9] pt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} <strong className="text-slate-700 font-serif">Ujjwal Gupta™</strong>. All Rights Reserved. Perplexity Explorer is a trademark of Ujjwal Gupta.
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span>Next-Word Probability Engine</span>
              <span>•</span>
              <span>PPL = exp(L<sub>CE</sub>)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Design System Modal */}
      <DesignRuleModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}

export default App;
