const webpack = require('webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
// configureWebpack 是Vue CLI3.0 中用于配置 webpack 插件参数的地方，你在这里设置，会新建或者覆盖 webpack 默认配置。
// webpack ProvidePlugin 的含义是创建一个全局的变量，使这个变量在 webpack 各个模块内都可以使用。这里的配置含义是创建 '$'、'jQuery'、'window.jQuery' 三个变量指向 jquery 依赖，创建 'Popper' 变量指向 popper.js 依赖。
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default']
      }),
      new MomentLocalesPlugin()
    ]
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/images': {
        target: 'http://localhost:8081',
        changeOrigin: true
        // pathRewrite: {
        //   '^/pic': ''
        // }
      }
    }
  }
}
