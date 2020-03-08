var path = require('path');

module.exports = {
 // Configure devServer to proxy our IIS endpoint and enable hot module reloading
 devServer: {
    proxy: {
       'api/*': {
          target: 'http://localhost:3000', // This is the IIS-express site url
          changeOrigin: true
       },
       'static/*': {
          target: 'http://localhost:3000', // This is the IIS-express site url
          changeOrigin: true
       }
    },
 },

  "transpileDependencies": [
    "vuetify"
  ]
}