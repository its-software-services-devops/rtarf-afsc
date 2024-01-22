import materialIcons from 'quasar/icon-set/svg-material-icons'
import materialIconsRound from 'quasar/icon-set/svg-material-icons-round'

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    'nuxt-quasar-ui',
    '@nuxtjs/google-fonts'
  ],
  
  // googleFonts: {
  //   families: {
  //     // Specify the font and its styles
  //     'Noto+Sans+Thai': [100, 300, 400, 500, 700, 900],
  //   },
  //   display: 'swap', // Optional: Use 'swap' to enable font-display: swap
  // },
  // googleFonts: {
  //   families: {
  //     // 'Noto+Sans+Thai':true,
  //     'Noto+Sans+Thai': [100, 300, 400, 500, 700, 900],display: 'swap'
  //   }
  // },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || 'https://api.example.com/',


      // baseURL: 'https://api.example.com/',
    },


    // axios: {
    //   browserBaseURL: process.env.NUXT_PUBLIC_API_BASE || '',
    // },
  },
  css: [
    // ...
    // 'quasar/fonts',
    // Reference the global CSS file
    // './assets/global.css',


    'quasar/animations',
    'quasar/icons',
    'quasar/css',
    'quasar/brand', // If config.brand is used
    // ...
  ],
  quasar: {
    // brand: {
    //   primary: '#fff000',
    // },
    sassVariables: 'assets/quasar-variables.sass',
    plugins: [
      'AppFullscreen',
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
    ],
    iconSet: {
      ...materialIcons,
      colorPicker: materialIconsRound.colorPicker,
    },
    extras: {
      // font: 'roboto-font',
      fontIcons: ['material-icons'],
      animations: 'all',
    },
    config: {
      dark: true,
      brand: {
        // primary: '#a73c24',
      },
    },
    components: {
      defaults: {
        QBtn: {
          glossy: true,
        },
      },
    },
  },
})
