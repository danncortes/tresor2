export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  pwa: {
    manifest: {
      name: 'Tresor App',
      lang: 'en-US'
    },
    icon: {
      iconSrc: './static/icon.png'
    },
    meta: {
      /* meta options */
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/filters.js', '~/plugins/fontawesome.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */

  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    '@nuxtjs/dayjs'
  ],
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4040/api'
        : 'https://secretvault-api.herokuapp.com/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenType: 'Bearer'
      }
    }
  },
  router: {
    middleware: 'auth'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
