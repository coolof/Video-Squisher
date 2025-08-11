module.exports = {
  packagerConfig: {
    icon: './assets/Icon3D',
    asar: true,
    prune: true,
    extraResource: ['./resources/ffmpeg/ffmpeg'],
    ignore: [
      // Remove ffmpeg from .app
      /node_modules\/ffmpeg-static(\/.*)?$/,
      // Remove dev scripts from app
      /scripts\/copy-ffmpeg\.js$/,
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     background: './assets/dmg-background.png',
    //     format: 'ULFO',
    //     window: {
    //       size: {
    //         width: 540,
    //         height: 380,
    //         x: 400,
    //         y: 100,
    //       },
    //     },
    //     contents: [
    //       {
    //         x: 0,
    //         y: 0,
    //         type: 'file',
    //         path: './out/Video Squisher-darwin-arm64/Video Squisher.app',
    //       },
    //       {
    //         x: 200,
    //         y: 200,
    //         type: 'link',
    //         path: '/Applications',
    //       },
    //     ],
    //   },
    // },
  ],
};
