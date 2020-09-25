const argv = require('yargs-parser')(process.argv.slice(2)).mode
const {
  merge
} = require('webpack-merge')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const html2 = require('./config/html.js')
const _mode = argv.mode || "development"
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const {
  sync
} = require('glob')
const path = require('path')
const files = sync('./src/web/views/**/*.entry.js')
let _entry = {}
let _plugins = []
for (let item of files) {
  const arr = item.split('.en')[0].split('/')
  const name = arr[arr.length - 1]
  const [dist, template] = name.split('-')
  _entry[name] = item
  _plugins.push(new HtmlWebpackPlugin({
    title: name,
    filename: `../views/${dist}/pages/${template}.html`,
    template: `./src/web/views/${dist}/pages/${template}.html`,
    inject: false,
    chunks: ["runtime", name]
  }))
}
_plugins.push(new CleanWebpackPlugin())

let commonConfig = {
  entry: _entry,
  output: {
    filename: "js/[name].bundle.js",
    path: path.join(__dirname, "./dist/assets")
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [..._plugins, new html2(), ]
}
module.exports = merge(commonConfig, _mergeConfig)