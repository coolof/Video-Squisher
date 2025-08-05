import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { compressVideo } from './ffmpeg/compressor';

const isDev = !app.isPackaged;

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
    //resizable: false,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // win.loadFile(path.join(__dirname, '../renderer/index.html'));

  // if (isDev) {
  //   win.loadURL('http://localhost:5173'); // Open vite server
  //   win.webContents.openDevTools();
  // } else {
  //   win.loadFile(path.join(__dirname, '../renderer/index.html'));
  // }

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
