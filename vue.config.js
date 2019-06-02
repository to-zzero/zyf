/* eslint-disable prefer-destructuring */
const path = require('path')

module.exports = {
  devServer: {
    port:8081,
    proxy: {
      '/api': {
        target: 'http://103.200.114.146:8082/', // 线上环境
        // target: 'http://127.0.0.1:8082/', // 线上环境
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/global.scss')
      ]
    }
  }
};
