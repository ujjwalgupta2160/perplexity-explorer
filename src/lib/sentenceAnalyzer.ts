import { SentenceAnalysis } from '../types';

/**
 * Analyzes sentence type (Declarative, Interrogative, Imperative, Exclamatory, Conditional),
 * grammatical complexity, tone, readability, and predicts expected next Part-of-Speech.
 */
export function analyzeSentenceStructure(text: string): SentenceAnalysis {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      type: 'Declarative',
      typeDescription: 'Empty input',
      complexity: 'Fragment',
      completeness: 'Open-Ended Clause / Fragment',
      tone: 'Conversational',
      wordCount: 0,
      characterCount: 0,
      readabilityScore: 100,
      readabilityGrade: 'N/A',
      likelyNextPOS: []
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const characterCount = trimmed.length;

  // 1. Identify Sentence Type
  let type: SentenceAnalysis['type'] = 'Declarative';
  let typeDescription = 'Conveys a factual assertion, idea, or description.';

  const lower = trimmed.toLowerCase();
  const endsWithQuestion = trimmed.endsWith('?');
  const endsWithExclamation = trimmed.endsWith('!');
  const startsWithQuestionWord = /^(who|what|where|when|why|how|which|whose|whom|is|are|can|could|would|should|do|does|did)\b/i.test(trimmed);
  const startsWithImperativeVerb = /^(find|show|give|explain|compute|calculate|predict|generate|explore|write|build|open|create|consider|imagine|tell|listen)\b/i.test(trimmed);
  const startsWithCondition = /^(if|unless|provided|assuming|suppose|whether|in case)\b/i.test(trimmed);

  if (endsWithQuestion || startsWithQuestionWord) {
    type = 'Interrogative';
    typeDescription = 'Asks a question seeking clarification, information, or analysis.';
  } else if (startsWithCondition || /\b(if\s+.+\bthen\b)/i.test(trimmed)) {
    type = 'Conditional';
    typeDescription = 'Establishes a condition or hypothetical premise for a resulting clause.';
  } else if (endsWithExclamation) {
    type = 'Exclamatory';
    typeDescription = 'Expresses strong surprise, emphasis, urgency, or heightened emotion.';
  } else if (startsWithImperativeVerb) {
    type = 'Imperative';
    typeDescription = 'Directs action, issues a command, or gives instructions to an agent or listener.';
  } else if (/\b(might|could|possibly|hypothetically|perhaps|theoretically)\b/i.test(trimmed)) {
    type = 'Hypothetical';
    typeDescription = 'Expresses a speculative hypothesis or theoretical scenario.';
  }

  // 2. Identify Completeness
  const endsWithTerminalPunctuation = /[.?!]$/.test(trimmed);
  const completeness: SentenceAnalysis['completeness'] = endsWithTerminalPunctuation
    ? 'Complete Sentence'
    : 'Open-Ended Clause / Fragment';

  // 3. Complexity: Simple, Compound, Complex, Compound-Complex
  const coordinatingConjunctions = /\b(and|but|or|so|yet|for|nor)\b/gi;
  const subordinatingConjunctions = /\b(because|although|since|while|where|whereas|though|unless|until|before|after|which|that)\b/gi;

  const hasCoordinating = (trimmed.match(coordinatingConjunctions) || []).length > 0;
  const hasSubordinating = (trimmed.match(subordinatingConjunctions) || []).length > 0;

  let complexity: SentenceAnalysis['complexity'] = 'Simple';
  if (!endsWithTerminalPunctuation && wordCount < 4) {
    complexity = 'Fragment';
  } else if (hasCoordinating && hasSubordinating) {
    complexity = 'Compound-Complex';
  } else if (hasSubordinating) {
    complexity = 'Complex';
  } else if (hasCoordinating) {
    complexity = 'Compound';
  }

  // 4. Tone Detection
  let tone: SentenceAnalysis['tone'] = 'Explanatory & Informative';
  if (/\b(quantum|neural|algorithm|perplexity|probability|entropy|distribution|parameter|comput|matrix|tensor|asymptotic)\b/i.test(trimmed)) {
    tone = 'Technical & Academic';
  } else if (/\b(why|how|wonder|mystery|curious|explore|perhaps|question)\b/i.test(trimmed)) {
    tone = 'Inquisitive & Curious';
  } else if (/\b(beauty|whisper|shadow|ancient|deep|night|silence|heart|journey|dream)\b/i.test(trimmed)) {
    tone = 'Poetic & Narrative';
  } else if (/\b(yeah|cool|hey|ok|well|actually|pretty|stuff|awesome)\b/i.test(trimmed)) {
    tone = 'Conversational';
  }

  // 5. Readability Estimation (Flesch-Kincaid proxy)
  const syllables = countTotalSyllables(trimmed);
  const avgWordsPerSentence = wordCount;
  const avgSyllablesPerWord = wordCount > 0 ? syllables / wordCount : 1;
  const rawFlesch = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const readabilityScore = Math.max(10, Math.min(100, Math.round(rawFlesch)));

  let readabilityGrade = 'Easy (6th - 8th grade)';
  if (readabilityScore < 30) readabilityGrade = 'College Graduate / Academic';
  else if (readabilityScore < 50) readabilityGrade = 'College Level';
  else if (readabilityScore < 65) readabilityGrade = 'High School (10th - 12th)';
  else if (readabilityScore < 80) readabilityGrade = 'Middle School (7th - 9th)';

  // 6. Predict likely Next Part-of-Speech based on ending word
  const lastWord = words.length > 0 ? words[words.length - 1].toLowerCase().replace(/[^\w]/g, '') : '';
  const likelyNextPOS = determineNextPOSLikelihood(lastWord, completeness);

  return {
    type,
    typeDescription,
    complexity,
    completeness,
    tone,
    wordCount,
    characterCount,
    readabilityScore,
    readabilityGrade,
    likelyNextPOS
  };
}

/**
 * Heuristic syllable counter for words
 */
function countTotalSyllables(text: string): number {
  const clean = text.toLowerCase().replace(/[^a-z ]/g, '');
  const words = clean.split(/\s+/).filter(Boolean);
  let total = 0;
  for (const w of words) {
    if (w.length <= 3) {
      total += 1;
      continue;
    }
    const syllables = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '')
      .replace(/^y/, '')
      .match(/[aeiouy]{1,2}/g);
    total += syllables ? syllables.length : 1;
  }
  return Math.max(1, total);
}

/**
 * Predicts the part-of-speech distributions for the upcoming word
 */
function determineNextPOSLikelihood(
  lastWord: string,
  completeness: SentenceAnalysis['completeness']
): SentenceAnalysis['likelyNextPOS'] {
  if (completeness === 'Complete Sentence') {
    return [
      { category: 'Subject / Pronoun / Determiner', probability: 0.45, examples: ['The', 'It', 'This', 'We', 'However'] },
      { category: 'Coordinating / Transition Adverb', probability: 0.30, examples: ['Moreover', 'Furthermore', 'Thus', 'In addition'] },
      { category: 'Subordinate Conjunction', probability: 0.25, examples: ['Although', 'Because', 'While', 'When'] }
    ];
  }

  // Articles & Determiners (e.g. "the", "a", "an", "this", "every")
  if (['the', 'a', 'an', 'this', 'that', 'these', 'those', 'every', 'each', 'all'].includes(lastWord)) {
    return [
      { category: 'Noun Phrase / Noun', probability: 0.64, examples: ['model', 'system', 'probability', 'future', 'data'] },
      { category: 'Adjective / Modifier', probability: 0.28, examples: ['next', 'artificial', 'deep', 'optimal', 'complex'] },
      { category: 'Adverb', probability: 0.08, examples: ['most', 'very', 'intrinsically'] }
    ];
  }

  // Copula / Auxiliary Verbs (e.g. "is", "are", "was", "were", "has", "have", "will")
  if (['is', 'are', 'was', 'were', 'am', 'be', 'been', 'being'].includes(lastWord)) {
    return [
      { category: 'Determiner / Article', probability: 0.38, examples: ['a', 'the', 'an', 'one'] },
      { category: 'Adjective / Predicate', probability: 0.32, examples: ['capable', 'crucial', 'complex', 'defined', 'responsible'] },
      { category: 'Adverb / Negation', probability: 0.18, examples: ['not', 'often', 'intrinsically', 'rarely'] },
      { category: 'Present Participle (Verb-ing)', probability: 0.12, examples: ['learning', 'growing', 'changing', 'expanding'] }
    ];
  }

  // Prepositions (e.g. "of", "in", "to", "for", "with", "by", "from", "behind")
  if (['of', 'in', 'to', 'for', 'with', 'by', 'from', 'behind', 'under', 'over', 'into'].includes(lastWord)) {
    if (lastWord === 'to') {
      return [
        { category: 'Base Verb (Infinitive)', probability: 0.65, examples: ['be', 'understand', 'generate', 'predict', 'learn'] },
        { category: 'Determiner / Object', probability: 0.25, examples: ['the', 'this', 'a', 'our'] },
        { category: 'Proper Noun / Destination', probability: 0.10, examples: ['researchers', 'computers', 'models'] }
      ];
    }
    return [
      { category: 'Determiner / Article', probability: 0.52, examples: ['the', 'a', 'this', 'each'] },
      { category: 'Noun / Concept', probability: 0.34, examples: ['artificial intelligence', 'data', 'computation', 'truth'] },
      { category: 'Gerund (-ing)', probability: 0.14, examples: ['minimizing', 'learning', 'optimizing', 'predicting'] }
    ];
  }

  // Modals (e.g. "can", "will", "would", "should", "could", "must")
  if (['can', 'will', 'would', 'should', 'could', 'must', 'might'].includes(lastWord)) {
    return [
      { category: 'Base Verb', probability: 0.82, examples: ['be', 'allow', 'solve', 'learn', 'predict', 'generate'] },
      { category: 'Adverb (Modifier)', probability: 0.18, examples: ['easily', 'significantly', 'only', 'never'] }
    ];
  }

  // General default fallback
  return [
    { category: 'Verb / Action', probability: 0.40, examples: ['learns', 'is', 'allows', 'generates', 'scales'] },
    { category: 'Preposition / Conjunction', probability: 0.32, examples: ['in', 'and', 'with', 'that', 'by'] },
    { category: 'Punctuation / Terminator', probability: 0.28, examples: ['.', ',', ';', ':'] }
  ];
}

