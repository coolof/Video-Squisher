const fs = require('fs');
const path = require('path');
const { chmodSync, copyFileSync, existsSync, mkdirSync } = require('fs');

const ffmpegPath = require('ffmpeg-static');
const targetDir = path.join(__dirname, '..', 'resources', 'ffmpeg');
const target = path.join(targetDir, 'ffmpeg');

if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

copyFileSync(ffmpegPath, target);
chmodSync(target, 0o755); // Viktigt! Gör filen körbar på Mac/Linux

console.log('✓ Copied ffmpeg binary to:', target);
