console.log("开发环境====》》》");
const CopyPlugin = require('copy-webpack-plugin');
const {
  join
} = require('path')
module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: join(__dirname, '../', 'src/web/views/layouts/layout.html'),
        to: '../views/layouts/layout.html'
      }],
    }),
    new CopyPlugin({
      patterns: [{
        from: join(__dirname, '../', 'src/web/components'),
        to: '../components'
      }],
    }),
  ]
}