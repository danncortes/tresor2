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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/style-resources'],
  /*
   ** Nuxt.js modules
   */

  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt'
  ],
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4040'
        : 'https://secretvault-api.herokuapp.com'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post'
          },
          user: {
            url: '/api/auth/user',
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
