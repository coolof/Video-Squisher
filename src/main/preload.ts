import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectMultipleFiles: () => ipcRenderer.invoke('select-multiple-files'),
  selectOutputDir: () => ipcRenderer.invoke('select-outdir'),
  compress: (args: { inputPath: string; outputDir?: string; suffix: string }) =>
    ipcRenderer.invoke('compress', args),
  onProgress: (callback: (data: { file: string; percent: number }) => void) => {
    ipcRenderer.removeAllListeners('compress-progress');
    ipcRenderer.on('compress-progress', (_event, data) => callback(data));
  },
});
