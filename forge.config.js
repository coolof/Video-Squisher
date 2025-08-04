module.exports = {
  packagerConfig: {
    icon: './assets/Icon',
    asar: true,
    prune: true,
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
