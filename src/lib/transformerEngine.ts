// In-browser Neural Engine using @xenova/transformers
// Runs lightweight ONNX GPT-2 or DistilGPT-2 right in the browser

export interface TransformerProgress {
  status: 'idle' | 'loading' | 'ready' | 'evaluating' | 'error';
  progress: number;
  message: string;
}

class TransformerEngineManager {
  private generator: any = null;
  private tokenizer: any = null;
  private isInitializing: boolean = false;
  private progressCallback: ((progress: TransformerProgress) => void) | null = null;

  public setProgressCallback(cb: (progress: TransformerProgress) => void) {
    this.progressCallback = cb;
  }

  private updateStatus(status: TransformerProgress['status'], progress: number, message: string) {
    if (this.progressCallback) {
      this.progressCallback({ status, progress, message });
    }
  }

  public async loadModel(modelId: string = 'Xenova/gpt2') {
    if (this.generator) return;
    if (this.isInitializing) return;

    this.isInitializing = true;
    this.updateStatus('loading', 10, 'Initializing WebAssembly / WebGPU runtime...');

    try {
      // Dynamic import to avoid blocking on startup
      const { pipeline, env } = await import('@xenova/transformers');
      
      // Allow browser cache
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      this.updateStatus('loading', 30, `Loading ${modelId} weights into browser cache...`);

      this.generator = await pipeline('text-generation', modelId, {
        progress_callback: (data: any) => {
          if (data && typeof data.progress === 'number') {
            this.updateStatus('loading', Math.round(data.progress), `Downloading weights: ${Math.round(data.progress)}%`);
          }
        }
      });

      this.updateStatus('ready', 100, `Model ${modelId} ready for local inference!`);
      this.isInitializing = false;
    } catch (err: any) {
      console.warn('Transformer WebAssembly model failed to load:', err);
      this.updateStatus('error', 0, err?.message || 'Failed to load model weights. Using instant statistical engine.');
      this.isInitializing = false;
    }
  }

  public isReady(): boolean {
    return this.generator !== null;
  }

  public async generateNextTokens(prompt: string, maxNewTokens: number = 5): Promise<string[]> {
    if (!this.generator) return [];
    try {
      const output = await this.generator(prompt, {
        max_new_tokens: maxNewTokens,
        temperature: 0.8,
        do_sample: true,
        top_k: 20
      });
      if (Array.isArray(output) && output[0]?.generated_text) {
        return [output[0].generated_text.slice(prompt.length)];
      }
      return [];
    } catch (e) {
      console.error('Inference error:', e);
      return [];
    }
  }
}

export const transformerEngine = new TransformerEngineManager();

