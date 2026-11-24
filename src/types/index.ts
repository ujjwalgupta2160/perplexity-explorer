export interface TokenPrediction {
  token: string;
  prob: number; // 0 to 1
  logprob: number; // ln(prob)
  rank: number;
  perplexity: number; // 1 / prob
  surprisalBits?: number; // -log2(prob) in bits of information
}

export interface TokenEvaluation {
  index: number;
  token: string;
  prob: number;
  logprob: number;
  perplexity: number;
  surprisalBits: number; // -log2(P)
  rank: number;
  posTag?: string;
  topAlternatives: TokenPrediction[];
  entropy: number;
}

export interface SequenceMetrics {
  totalTokens: number;
  averageLogProb: number;
  perplexity: number;
  crossEntropyLoss: number;
  entropy: number;
  highSurpriseCount: number;
  executionTimeMs: number;
  jointProbability: number;
  avgSurprisalBits: number;
}

export interface BranchNode {
  id: string;
  token: string;
  prob: number;
  cumulativeProb: number;
  depth: number;
  children: BranchNode[];
}

export type ModelMode = 'fast-ngram' | 'gpt2-onnx';

export interface SamplingConfig {
  temperature: number;
  topK: number;
  topP: number;
}

export interface SentenceAnalysis {
  type: 'Declarative' | 'Interrogative' | 'Imperative' | 'Exclamatory' | 'Conditional' | 'Hypothetical';
  typeDescription: string;
  complexity: 'Simple' | 'Compound' | 'Complex' | 'Compound-Complex' | 'Fragment';
  completeness: 'Complete Sentence' | 'Open-Ended Clause / Fragment';
  tone: 'Technical & Academic' | 'Explanatory & Informative' | 'Inquisitive & Curious' | 'Poetic & Narrative' | 'Conversational';
  wordCount: number;
  characterCount: number;
  readabilityScore: number; // 0 - 100 Flesch Reading Ease
  readabilityGrade: string;
  likelyNextPOS: {
    category: string;
    probability: number;
    examples: string[];
  }[];
}

export interface CustomWordResult {
  word: string;
  prob: number;
  logprob: number;
  perplexity: number;
  surprisalBits: number;
  rank: number;
  category: 'Top Candidate' | 'Likely' | 'Uncommon' | 'Surprising / Anomaly';
}
