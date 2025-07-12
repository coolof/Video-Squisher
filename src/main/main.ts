import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { compressVideo } from './ffmpeg/compressor';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 920,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    titleBarStyle: 'hiddenInset',
    title: 'Video Squisher',
    //resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
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
  const { inputPath, outputDir, suffix } = args;
  return await compressVideo(inputPath, outputDir, suffix, percent => {
    _event.sender.send('compress-progress', { file: inputPath, percent });
  });
});
