import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';

export async function compressVideo(
  input: string,
  outputDir = '',
  suffix = '-squished',
  onProgress?: (percent: number) => void
): Promise<string> {
  const ext = path.extname(input);
  const base = path.basename(input, ext);
  const filename = `${base}${suffix}${ext}`;
  const dir = outputDir || path.dirname(input);
  const output = path.join(dir, filename);

  if (!input || typeof input !== 'string') {
    return Promise.reject(new TypeError(`Ogiltig input: ${input}`));
  }

  return new Promise((resolve, reject) => {
    const args = ['-y', '-i', input, '-vcodec', 'libx264', '-crf', '28', '-an', output];
    const ffmpeg = spawn(ffmpegPath!, args);

    let duration = 0;

    ffmpeg.stderr.on('data', data => {
      const msg = data.toString();

      // Hämta total varaktighet (endast en gång)
      const durMatch = msg.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
      if (durMatch) {
        const [_, h, m, s] = durMatch;
        duration = +h * 3600 + +m * 60 + +s;
      }

      // Progress
      const timeMatch = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (timeMatch && duration > 0) {
        const [_, h, m, s] = timeMatch;
        const time = +h * 3600 + +m * 60 + +s;
        const percent = Math.min((time / duration) * 100, 100);
        onProgress?.(percent);
      }
    });

    ffmpeg.on('close', code => {
      if (code === 0) resolve(output);
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}
