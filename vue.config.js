const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    overlay: {
      warning: false,
      error: true
    }
  },
  pages: {
    index: {
      entry: 'demo/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
