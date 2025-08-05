import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectMultipleFiles: () => ipcRenderer.invoke('select-multiple-files'),
  selectOutputDir: () => ipcRenderer.invoke('select-outdir'),
  compress: (args: { inputPath: string; outputDir?: string; suffix: string; format?: string }) =>
    ipcRenderer.invoke('compress', args),
  onProgress: (callback: (data: { file: string; percent: number }) => void) => {
    ipcRenderer.removeAllListeners('compress-progress');
    ipcRenderer.on('compress-progress', (_event, data) => callback(data));
  },
  showInFolder: (filePath: string) => ipcRenderer.invoke('show-in-folder', filePath),
  openPath: (path: string) => ipcRenderer.invoke('open-path', path),
  openUrl: (path: string) => ipcRenderer.invoke('open-url', path),
  cancelCompression: () => ipcRenderer.invoke('cancel-compression'),
});
