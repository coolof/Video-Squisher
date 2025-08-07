import { ChildProcess, spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';

let isCancelled = false;
let currentProcess: ChildProcess | null = null;

export function cancelCompression() {
  isCancelled = true;
  currentProcess?.kill('SIGKILL');
}

export const getFfmpegPath = () => {
  const isDev = !app.isPackaged;

  if (isDev) {
    const ffmpegStatic = require('ffmpeg-static');
    return ffmpegStatic?.replace('app.asar', 'app.asar.unpacked') || 'ffmpeg';
  }

  return path.join(process.resourcesPath, 'ffmpeg');
};

const ffmpegPath = getFfmpegPath();

export async function compressVideo(
  input: string,
  outputDir = '',
  suffix = '-squished',
  format = 'mp4',
  onProgress?: (percent: number) => void
): Promise<string> {
  isCancelled = false;

  const ext = path.extname(input);
  const base = path.basename(input, ext);
  const filename = `${base}${suffix}.${format}`;
  const dir = outputDir || path.dirname(input);
  const output = path.join(dir, filename);

  const args =
    format === 'mp4'
      ? [
          '-y',
          '-i',
          input,
          '-vf',
          "scale='min(1920,iw)':-2",
          '-vcodec',
          'libx264',
          '-preset',
          'medium',
          '-crf',
          '23',
          '-movflags',
          '+faststart',
          '-an',
          output,
        ]
      : [
          '-y',
          '-i',
          input,
          '-vf',
          "scale='min(1920,iw)':-2",
          '-c:v',
          'libvpx-vp9',
          '-b:v',
          '0',
          '-crf',
          '32',
          '-deadline',
          'good',
          '-movflags',
          '+faststart',
          '-f',
          'webm',
          '-an',
          output,
        ];

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegPath, args);
    currentProcess = ffmpeg;

    let duration = 0;
    let ffmpegErrors: string[] = [];

    ffmpeg.stderr.on('data', data => {
      const msg = data.toString();

      console.error('[ffmpeg]', msg);
      ffmpegErrors.push(msg);

      const durMatch = msg.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
      if (durMatch) {
        const [_, h, m, s] = durMatch;
        duration = +h * 3600 + +m * 60 + +s;
      }

      const timeMatch = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (timeMatch && duration > 0) {
        const [_, h, m, s] = timeMatch;
        const time = +h * 3600 + +m * 60 + +s;
        const percent = Math.min((time / duration) * 100, 100);
        onProgress?.(percent);
      }
    });

    ffmpeg.on('close', code => {
      currentProcess = null;

      if (isCancelled) {
        reject(new Error('Cancelled by user'));
      } else if (code === 0) {
        resolve(output);
      } else {
        const errorMessage = ffmpegErrors.join('\n') || `ffmpeg exited with code ${code}`;
        reject(new Error(errorMessage));
      }
    });
  });
}
