import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { cancelCompression, compressVideo } from './ffmpeg/compressor';

app.whenReady().then(() => {
  console.log('howdy from main');

  const win = new BrowserWindow({
    width: 960,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    titleBarStyle: 'hiddenInset',
    fullscreenable: false,
    backgroundColor: '#0e0f15',
    title: 'Video Squisher',
    resizable: false,
    webPreferences: {
      //contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
});

//Select file
ipcMain.handle('select-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'MP4', extensions: ['mp4'] }],
    properties: ['openFile'],
  });
  if (canceled || filePaths.length === 0) return null;
  return filePaths[0];
});

//Select multiple files
ipcMain.handle('select-multiple-files', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Video files', extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm'] }],
  });
  return canceled ? null : filePaths;
});

//Handle save location
ipcMain.handle('select-outdir', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return canceled ? null : filePaths[0];
});

//Handle compression of videos
ipcMain.handle('compress', async (_event, args) => {
  const { inputPath, outputDir, suffix, format } = args;
  return await compressVideo(inputPath, outputDir, suffix, format, percent => {
    _event.sender.send('compress-progress', { file: inputPath, percent });
  });
});

//Open file location (folder)
ipcMain.handle('show-in-folder', (_event, filePath: string) => {
  shell.showItemInFolder(filePath);
});

//Open file or folder
ipcMain.handle('open-path', (_event, path: string) => {
  shell.openPath(path);
});

//Open url in browser
ipcMain.handle('open-url', (_event, path: string) => {
  shell.openExternal(path);
});

//Cancel current job
ipcMain.handle('cancel-compression', () => {
  cancelCompression();
});
