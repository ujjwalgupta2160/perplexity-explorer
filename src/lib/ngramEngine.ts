import {
  TokenPrediction,
  TokenEvaluation,
  SequenceMetrics,
  BranchNode,
  SamplingConfig,
  CustomWordResult
} from '../types';

// Rich contextual vocabulary transitions simulating realistic language distributions
const UNIGRAM_PRIORS: Record<string, number> = {
  " the": 0.065, " of": 0.038, " and": 0.033, " to": 0.031, " a": 0.028,
  " in": 0.024, " is": 0.019, " that": 0.016, " for": 0.014, " it": 0.013,
  " with": 0.012, " as": 0.011, " was": 0.010, " on": 0.009, " are": 0.009,
  " by": 0.008, " this": 0.008, " an": 0.007, " at": 0.007, " from": 0.007,
  " model": 0.005, " data": 0.005, " system": 0.004, " world": 0.004, " intelligence": 0.003,
  " learning": 0.003, " human": 0.003, " information": 0.003, " time": 0.003, " new": 0.003,
  " can": 0.006, " will": 0.005, " be": 0.008, " have": 0.007, " has": 0.006,
  ".": 0.045, ",": 0.038, "?": 0.005, "!": 0.004
};

// Realistic conditional transitions based on bigrams and trigrams
const BIGRAM_CONTEXTS: Record<string, Record<string, number>> = {
  "the": {
    " model": 0.12, " world": 0.09, " system": 0.08, " future": 0.06, " universe": 0.05,
    " same": 0.05, " next": 0.04, " only": 0.04, " first": 0.06, " human": 0.05,
    " best": 0.04, " power": 0.03, " process": 0.03, " mystery": 0.04, " internet": 0.03,
    " data": 0.04, " truth": 0.03, " question": 0.04, " probability": 0.05, " concept": 0.03
  },
  "artificial": {
    " intelligence": 0.82, " neural": 0.06, " general": 0.04, " agents": 0.03,
    " life": 0.02, " systems": 0.01, " networks": 0.02
  },
  "intelligence": {
    " is": 0.28, " has": 0.14, " will": 0.12, " can": 0.09, " systems": 0.08,
    " research": 0.07, " and": 0.06, ",": 0.06, ".": 0.05, " in": 0.05
  },
  "neural": {
    " networks": 0.68, " network": 0.15, " architecture": 0.06, " models": 0.04,
    " representations": 0.04, " pathways": 0.03
  },
  "deep": {
    " learning": 0.55, " neural": 0.22, " understanding": 0.06, " inside": 0.04,
    " space": 0.03, " thought": 0.03, " into": 0.03, " within": 0.04
  },
  "learning": {
    " algorithms": 0.22, " models": 0.16, " process": 0.14, " representations": 0.11,
    " from": 0.12, " rate": 0.08, " systems": 0.07, " curve": 0.05, " to": 0.05
  },
  "quantum": {
    " computing": 0.48, " computers": 0.18, " mechanics": 0.14, " physics": 0.08,
    " supremacy": 0.04, " state": 0.04, " entanglement": 0.04
  },
  "computing": {
    " power": 0.24, " systems": 0.18, " will": 0.12, " allows": 0.11,
    " enables": 0.09, " is": 0.08, " technology": 0.07, " at": 0.05, ",": 0.06
  },
  "perplexity": {
    " is": 0.35, " of": 0.25, " score": 0.14, " measures": 0.12,
    " explorer": 0.06, " reflects": 0.04, " in": 0.04
  },
  "probability": {
    " of": 0.42, " distribution": 0.24, " that": 0.12, " is": 0.08,
    " mass": 0.06, " table": 0.04, " theory": 0.04
  },
  "language": {
    " model": 0.54, " models": 0.22, " processing": 0.11, " understanding": 0.06,
    " translation": 0.04, " structure": 0.03
  },
  "is": {
    " a": 0.22, " the": 0.19, " an": 0.08, " not": 0.08, " designed": 0.06,
    " capable": 0.05, " one": 0.05, " based": 0.05, " defined": 0.04,
    " considered": 0.04, " growing": 0.03, " becoming": 0.04, " intrinsically": 0.02
  },
  "to": {
    " be": 0.24, " understand": 0.09, " generate": 0.08, " predict": 0.07,
    " solve": 0.07, " create": 0.06, " optimize": 0.05, " learn": 0.05,
    " explore": 0.04, " process": 0.04, " find": 0.04, " develop": 0.04
  },
  "in": {
    " the": 0.44, " a": 0.16, " order": 0.08, " this": 0.07, " modern": 0.05,
    " which": 0.05, " terms": 0.04, " real": 0.04, " addition": 0.04, " parallel": 0.03
  },
  "allows": {
    " computers": 0.26, " researchers": 0.18, " users": 0.16, " models": 0.14,
    " us": 0.12, " systems": 0.08, " for": 0.06
  },
  "computers": {
    " to": 0.46, " can": 0.14, " are": 0.12, " process": 0.10,
    " solve": 0.08, " operate": 0.06, " learn": 0.04
  },
  "that": {
    " is": 0.22, " the": 0.18, " can": 0.14, " we": 0.09, " it": 0.09,
    " allows": 0.07, " will": 0.06, " enables": 0.05, " generates": 0.04, " represents": 0.04
  },
  "how": {
    " many": 0.46, " much": 0.18, " it": 0.12, " the": 0.08,
    " to": 0.07, " tokens": 0.05, " language": 0.04
  },
  "many": {
    " tokens": 0.28, " parameters": 0.18, " words": 0.14, " possibilities": 0.12,
    " layers": 0.10, " steps": 0.08, " aspects": 0.06, " applications": 0.04
  },
  "learn": {
    " representations": 0.24, " patterns": 0.22, " from": 0.18, " features": 0.12,
    " how": 0.09, " complex": 0.08, " internal": 0.05
  },
  "mystery": {
    " behind": 0.48, " of": 0.32, " is": 0.08, " lies": 0.06, " remains": 0.06
  },
  "behind": {
    " artificial": 0.34, " the": 0.28, " human": 0.12, " this": 0.10,
    " modern": 0.08, " neural": 0.08
  },
  "representations": {
    " of": 0.42, " by": 0.18, " from": 0.14, " through": 0.12,
    " that": 0.08, " in": 0.06
  },
  "by": {
    " minimizing": 0.22, " learning": 0.18, " predicting": 0.16, " analyzing": 0.12,
    " mapping": 0.10, " adjusting": 0.09, " using": 0.08, " optimizing": 0.05
  }
};

const TRIGRAM_CONTEXTS: Record<string, Record<string, number>> = {
  "artificial intelligence": {
    " is": 0.38, " has": 0.18, " will": 0.16, " can": 0.11, " models": 0.07,
    " research": 0.05, " algorithms": 0.05
  },
  "deep learning": {
    " models": 0.34, " algorithms": 0.22, " has": 0.16, " enables": 0.12,
    " revolutionized": 0.09, " frameworks": 0.07
  },
  "neural networks": {
    " learn": 0.36, " are": 0.22, " process": 0.16, " can": 0.12,
    " have": 0.08, " optimize": 0.06
  },
  "quantum computing": {
    " allows": 0.38, " leverages": 0.21, " promises": 0.15, " relies": 0.12,
    " represents": 0.08, " enables": 0.06
  },
  "probability of": {
    " the": 0.32, " next": 0.28, " an": 0.14, " each": 0.12,
    " observing": 0.08, " a": 0.06
  },
  "how many": {
    " tokens": 0.35, " possibilities": 0.22, " parameters": 0.16,
    " words": 0.14, " branches": 0.08, " options": 0.05
  },
  "to be": {
    " or": 0.45, " able": 0.18, " considered": 0.12, " learned": 0.09,
    " expected": 0.08, " solved": 0.08
  },
  "that is": {
    " the": 0.44, " why": 0.18, " not": 0.14, " capable": 0.10,
    " considered": 0.08, " what": 0.06
  },
  "learn representations": {
    " by": 0.46, " of": 0.24, " from": 0.18, " through": 0.12
  }
};

export function tokenizeText(text: string): string[] {
  if (!text) return [];
  const regex = /([ \t]+[^\s\p{P}]+|[^\s\p{P}]+|[.,!?;:()\[\]{}"'\\/-]|[ \t]+|\n)/gu;
  const matches = text.match(regex);
  return matches ? matches : [text];
}

export function cleanToken(token: string): string {
  return token.replace(/\n/g, '↵');
}

function pseudoHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function predictNextTokenDistribution(
  contextTokens: string[],
  config: SamplingConfig = { temperature: 1.0, topK: 15, topP: 0.95 }
): TokenPrediction[] {
  const tokenLength = contextTokens.length;
  const lastToken = tokenLength > 0 ? contextTokens[tokenLength - 1].trim().toLowerCase() : "";
  const secondLast = tokenLength > 1 ? contextTokens[tokenLength - 2].trim().toLowerCase() : "";
  const trigramKey = `${secondLast} ${lastToken}`.trim();

  const candidateScores: Record<string, number> = {};

  if (trigramKey && TRIGRAM_CONTEXTS[trigramKey]) {
    for (const [cand, prob] of Object.entries(TRIGRAM_CONTEXTS[trigramKey])) {
      candidateScores[cand] = (candidateScores[cand] || 0) + prob * 4.5;
    }
  }

  if (lastToken && BIGRAM_CONTEXTS[lastToken]) {
    for (const [cand, prob] of Object.entries(BIGRAM_CONTEXTS[lastToken])) {
      candidateScores[cand] = (candidateScores[cand] || 0) + prob * 2.2;
    }
  }

  for (const [cand, prob] of Object.entries(UNIGRAM_PRIORS)) {
    candidateScores[cand] = (candidateScores[cand] || 0) + prob * 0.45;
  }

  if ([" the", " a", " an", " of", " in", " for", " by"].includes(lastToken) || ["the", "a", "an", "of", "in", "for", "by"].includes(lastToken)) {
    candidateScores[" model"] = (candidateScores[" model"] || 0) + 0.15;
    candidateScores[" system"] = (candidateScores[" system"] || 0) + 0.12;
    candidateScores[" data"] = (candidateScores[" data"] || 0) + 0.11;
    candidateScores[" process"] = (candidateScores[" process"] || 0) + 0.09;
    candidateScores[" probability"] = (candidateScores[" probability"] || 0) + 0.08;
    candidateScores[" world"] = (candidateScores[" world"] || 0) + 0.08;
  }

  const normalizedScores: Record<string, number> = {};
  for (const [token, score] of Object.entries(candidateScores)) {
    const formattedToken = token.startsWith(" ") || [".", ",", "?", "!"].includes(token) ? token : ` ${token}`;
    normalizedScores[formattedToken] = (normalizedScores[formattedToken] || 0) + score;
  }

  const temp = Math.max(0.05, config.temperature || 1.0);
  const tokenList = Object.entries(normalizedScores).map(([token, score]) => ({ token, rawScore: score }));

  const expScores = tokenList.map(item => {
    const logit = Math.log(Math.max(item.rawScore, 1e-6));
    return {
      token: item.token,
      val: Math.exp(logit / temp)
    };
  });

  const sumExp = expScores.reduce((acc, curr) => acc + curr.val, 0) || 1.0;
  
  const sorted = expScores
    .map(item => {
      const prob = item.val / sumExp;
      return {
        token: item.token,
        prob,
        logprob: Math.log(Math.max(prob, 1e-12)),
        perplexity: 1 / Math.max(prob, 1e-12),
        surprisalBits: -Math.log2(Math.max(prob, 1e-12))
      };
    })
    .sort((a, b) => b.prob - a.prob);

  let cumulativeProb = 0;
  const filtered: TokenPrediction[] = [];
  const topKLimit = config.topK || 15;
  const topPLimit = config.topP || 0.95;

  for (let i = 0; i < sorted.length; i++) {
    if (i >= topKLimit && cumulativeProb >= topPLimit) break;
    cumulativeProb += sorted[i].prob;
    filtered.push({
      token: sorted[i].token,
      prob: sorted[i].prob,
      logprob: sorted[i].logprob,
      rank: i + 1,
      perplexity: sorted[i].perplexity,
      surprisalBits: sorted[i].surprisalBits
    });
  }

  const totalFilteredProb = filtered.reduce((acc, c) => acc + c.prob, 0) || 1.0;
  return filtered.map(item => {
    const p = item.prob / totalFilteredProb;
    return {
      ...item,
      prob: p,
      logprob: Math.log(Math.max(p, 1e-12)),
      perplexity: 1 / Math.max(p, 1e-12),
      surprisalBits: -Math.log2(Math.max(p, 1e-12))
    };
  });
}

/**
 * Checks a specific user-typed word against current context:
 * Returns exact probability, rank, perplexity, and surprisal bits.
 */
export function evaluateCustomWord(
  contextTokens: string[],
  word: string,
  config: SamplingConfig
): CustomWordResult {
  const cleanWord = word.trim().toLowerCase();
  const distribution = predictNextTokenDistribution(contextTokens, config);

  const matched = distribution.find(
    d => d.token.trim().toLowerCase() === cleanWord
  );

  if (matched) {
    let category: CustomWordResult['category'] = 'Top Candidate';
    if (matched.rank > 5 && matched.rank <= 15) category = 'Likely';
    else if (matched.rank > 15) category = 'Uncommon';

    return {
      word,
      prob: matched.prob,
      logprob: matched.logprob,
      perplexity: matched.perplexity,
      surprisalBits: matched.surprisalBits || -Math.log2(matched.prob),
      rank: matched.rank,
      category
    };
  }

  // Not in top candidates: estimate realistic tail probability
  const hashVal = pseudoHash(cleanWord) % 1000;
  const tailProb = Math.max(0.0005, (hashVal / 1000) * 0.008);
  const tailLogprob = Math.log(tailProb);
  const tailPerplexity = 1 / tailProb;
  const surprisalBits = -Math.log2(tailProb);
  const estimatedRank = distribution.length + 15 + (hashVal % 300);

  return {
    word,
    prob: tailProb,
    logprob: tailLogprob,
    perplexity: tailPerplexity,
    surprisalBits,
    rank: estimatedRank,
    category: tailPerplexity > 150 ? 'Surprising / Anomaly' : 'Uncommon'
  };
}

export function evaluateFullSequence(text: string, config: SamplingConfig): {
  tokens: TokenEvaluation[];
  metrics: SequenceMetrics;
} {
  const startTime = performance.now();
  const rawTokens = tokenizeText(text);

  if (rawTokens.length === 0) {
    return {
      tokens: [],
      metrics: {
        totalTokens: 0,
        averageLogProb: 0,
        perplexity: 1.0,
        crossEntropyLoss: 0,
        entropy: 0,
        highSurpriseCount: 0,
        executionTimeMs: 0,
        jointProbability: 1.0,
        avgSurprisalBits: 0
      }
    };
  }

  let totalLogProb = 0;
  let totalEntropy = 0;
  let totalSurprisal = 0;
  let highSurpriseCount = 0;
  let jointProb = 1.0;
  const evaluatedTokens: TokenEvaluation[] = [];

  for (let i = 0; i < rawTokens.length; i++) {
    const currentToken = rawTokens[i];
    const context = rawTokens.slice(0, i);
    
    const distribution = predictNextTokenDistribution(context, config);

    const stepEntropy = -distribution.reduce(
      (acc, d) => acc + (d.prob > 0 ? d.prob * Math.log2(d.prob) : 0),
      0
    );
    totalEntropy += stepEntropy;

    const matched = distribution.find(
      d => d.token.trim().toLowerCase() === currentToken.trim().toLowerCase()
    );

    let tokenProb: number;
    let tokenRank: number;

    if (matched) {
      tokenProb = matched.prob;
      tokenRank = matched.rank;
    } else {
      const hashVal = pseudoHash(currentToken) % 1000;
      tokenProb = Math.max(0.001, (hashVal / 1000) * 0.015);
      tokenRank = distribution.length + 10 + (hashVal % 200);
    }

    const logprob = Math.log(tokenProb);
    const perplexity = Math.exp(-logprob);
    const surprisalBits = -Math.log2(tokenProb);

    if (perplexity > 25) {
      highSurpriseCount++;
    }

    totalLogProb += logprob;
    totalSurprisal += surprisalBits;
    jointProb *= tokenProb;

    evaluatedTokens.push({
      index: i,
      token: currentToken,
      prob: tokenProb,
      logprob,
      perplexity,
      surprisalBits,
      rank: tokenRank,
      topAlternatives: distribution.slice(0, 8),
      entropy: stepEntropy
    });
  }

  const N = evaluatedTokens.length;
  const avgLogProb = N > 0 ? totalLogProb / N : 0;
  const crossEntropyLoss = -avgLogProb;
  const sequencePerplexity = Math.exp(crossEntropyLoss);
  const avgEntropy = N > 0 ? totalEntropy / N : 0;
  const avgSurprisal = N > 0 ? totalSurprisal / N : 0;
  const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;

  return {
    tokens: evaluatedTokens,
    metrics: {
      totalTokens: N,
      averageLogProb: avgLogProb,
      perplexity: Math.min(sequencePerplexity, 9999),
      crossEntropyLoss,
      entropy: avgEntropy,
      highSurpriseCount,
      executionTimeMs,
      jointProbability: Math.max(jointProb, 1e-15),
      avgSurprisalBits: avgSurprisal
    }
  };
}

export function buildLookaheadTree(
  contextTokens: string[],
  config: SamplingConfig,
  maxDepth: number = 3,
  branchFactor: number = 3
): BranchNode {
  const rootNode: BranchNode = {
    id: "root",
    token: contextTokens.length > 0 ? contextTokens[contextTokens.length - 1] : "<s>",
    prob: 1.0,
    cumulativeProb: 1.0,
    depth: 0,
    children: []
  };

  function expand(node: BranchNode, currentContext: string[], currentDepth: number) {
    if (currentDepth >= maxDepth) return;

    const candidates = predictNextTokenDistribution(currentContext, config).slice(0, branchFactor);

    for (let idx = 0; idx < candidates.length; idx++) {
      const cand = candidates[idx];
      const cumProb = node.cumulativeProb * cand.prob;
      const childNode: BranchNode = {
        id: `${node.id}_${currentDepth}_${idx}`,
        token: cand.token,
        prob: cand.prob,
        cumulativeProb: cumProb,
        depth: currentDepth + 1,
        children: []
      };

      node.children.push(childNode);
      expand(childNode, [...currentContext, cand.token], currentDepth + 1);
    }
  }

  expand(rootNode, contextTokens, 0);
  return rootNode;
}
