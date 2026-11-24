# Perplexity Explorer™

> **An interactive Neural Language Model Lab & Linguistic Explorer created by Ujjwal Gupta™**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-10b981?style=for-the-badge&logo=vercel)](https://perplexity-explorer-ujjwal.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ujjwalgupta2160/perplexity-explorer)
[![License](https://img.shields.io/badge/Trademark-Ujjwal_Gupta™-d96b43?style=for-the-badge)](https://github.com/ujjwalgupta2160/perplexity-explorer)

---

## 🌐 Live Website & Links

* **Live Web App**: [https://perplexity-explorer-ujjwal.vercel.app/](https://perplexity-explorer-ujjwal.vercel.app/)
* **GitHub Repository**: [https://github.com/ujjwalgupta2160/perplexity-explorer](https://github.com/ujjwalgupta2160/perplexity-explorer)
* **Author / Trademark**: **Ujjwal Gupta™**

---

## 📖 About The Website

**Perplexity Explorer** is an interactive, real-time linguistic and language model laboratory designed to demystify how causal language models (such as GPT-2, LLaMA, and Gemini) evaluate text, predict upcoming words, measure surprise, and branch into multi-token futures.

Built with an editorial **Light & Pastel Green design system** governed by the **50-30-20 visual rule**, the application combines mathematical rigor with playful vector stickmen, silicon CPU core illustrations, and live interactive calculators.

---

## 🚀 Key Features

### 1. 📝 Type of Sentence & Linguistic Architecture
* **Sentence Mood Detection**: Classifies whether a sentence is **Declarative**, **Interrogative**, **Conditional**, **Imperative**, **Exclamatory**, or **Hypothetical**.
* **Grammatical Complexity**: Identifies **Simple**, **Compound**, **Complex**, **Compound-Complex**, or **Fragments**.
* **Discourse Tone & Readability**: Evaluates the **Flesch Reading Ease score** (0–100) and conversational vs. academic registers.
* **Next Part-of-Speech Prediction**: Syntactic transition model predicting the probability distribution for what grammatical category follows (e.g. *Noun Phrase: 64%*, *Adjective: 28%*).

### 2. 🔮 Probability of Next Word
* **Real-Time Distribution**: Displays the model's candidate next words ranked by probability ($P$), log-probability ($\ln P$), and perplexity ($1/P$).
* **Nucleus (Top-p) Mass Gauges**: Dynamically calculates how many vocabulary tokens account for **50%**, **80%**, and **90%** of the probability mass.
* **One-Click Append**: Click `+ Append` on any candidate word to continue the text sequence.

### 3. 📊 Each Word Probability & Surprisal Table
* **Word-by-Word Table**:
  * Position (#)
  * Token string
  * Conditional probability $P(w_i \mid w_{<i})$ with visual mini-bars
  * Perplexity contribution $1/P$
  * Surprisal in binary bits ($-\log_2 P$)
  * Vocabulary model rank (#1, #2, #5, etc.)
  * Competing alternative word considered by the model
* **Sorting & Extremes**: Sort by probability, perplexity, or rank; instantly highlights the **Highest Surprise Word** and **Most Fluent Word**.

### 4. ⌨️ Type the Next Word (Interactive Prediction Tester)
* Type any word you are considering.
* The model instantly evaluates your typed word against the context:
  * Computes exact probability $P$
  * Surprisal in bits ($-\log_2 P$)
  * Vocabulary ranking (e.g., `#1 Top Candidate`, `#14 Uncommon`, `#180 High Surprise`)
  * One-click button or <kbd>Enter</kbd> to append your word directly to the prompt.

### 5. 🌲 Lookahead Branching Tree (*"How Many After It"*)
* Multi-step lookahead decision tree mapping conditional token trajectories across **Depth 1 $\to$ Depth 2 $\to$ Depth 3**.
* Computes joint chain probabilities using the multiplication rule:
  $$P(w_{t+1}, w_{t+2}, w_{t+3}) = P(w_{t+1}) \times P(w_{t+2} \mid w_{t+1}) \times P(w_{t+3} \mid w_{t+1}, w_{t+2})$$
* Click any branch in the tree to automatically append that entire multi-word continuation.

### 6. 📐 Formula Docs (Math & Proofs Tab)
* Full interactive mathematical documentation explaining all formulas:
  * **Temperature Softmax**: $P(w_i) = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}$
  * **Token Perplexity**: $PPL(w_i) = \frac{1}{P(w_i)} = \exp(-\ln P(w_i))$
  * **Sequence Perplexity**: $PPL = \exp\left(-\frac{1}{N}\sum_{i=1}^N \ln P(w_i)\right)$
  * **Cross-Entropy Loss**: $\mathcal{L}_{CE} = -\frac{1}{N}\sum_{i=1}^N \ln P(w_i)$
  * **Shannon Surprisal**: $I(w_i) = -\log_2 P(w_i)$ (bits)
  * **Distribution Entropy**: $H(X) = -\sum P(w_k) \log_2 P(w_k)$
  * **Live Arithmetic Walkthrough**: Automatically computes the exact math for your current prompt.

---

## 🎨 The 50-30-20 Light Design Framework

Inspired by modern editorial typography and clean culinary menu layouts:

| Weight | Role | Description & Palette |
| :--- | :--- | :--- |
| **50% Canvas** | Base Space | Pure crisp white (`#ffffff`) providing generous breathing margins |
| **30% Structural** | Containers & Cards | Delicate sage & off-white cards (`#f8faf8`, border `#e8eee9`) |
| **20% Accents** | Focal Points | Warm terracotta (`#d96b43`), pastel mint (`#10b981`), peach & lilac |

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS with custom editorial typography (*Newsreader* + *Plus Jakarta Sans*)
* **ML Engines**:
  * **Instant Statistical & N-Gram Neural Engine (0ms)**: Zero-lag subword tokenizer and smoothed conditional language distributions.
  * **In-Browser ONNX GPT-2**: WebAssembly runtime (`@xenova/transformers`) running neural weights client-side.
* **Vector Graphics**: Hand-crafted SVG stickman illustrations, silicon CPU core, and magnifying inspector.

---

## 💻 Local Setup & Development

```bash
# 1. Clone repository
git clone https://github.com/ujjwalgupta2160/perplexity-explorer.git
cd perplexity-explorer

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

---

## 📜 Trademark & Attribution

**Perplexity Explorer™** is an original creation and trademark of **Ujjwal Gupta™**.  
All rights reserved © 2026 Ujjwal Gupta.

