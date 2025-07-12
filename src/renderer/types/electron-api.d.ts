// src/renderer/global.d.ts (eller src/global.d.ts beroende på din struktur)

export {};

declare global {
  interface Window {
    electronAPI: {
      selectFile: () => Promise<string | null>;
      selectMultipleFiles: () => Promise<string[]>;
      selectOutputDir: () => Promise<string | null>;
      compress: (args: { inputPath: string; outputDir?: string; suffix: string }) => Promise<void>;
      onProgress: (callback: (data: { file: string; percent: number }) => void) => void;
      removeProgressListener: () => void;
    };
  }
}
