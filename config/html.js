const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = "HtmlAfterPlugin"

const assetsHelp = data => {
  let js = []
  const getAssetName = {
    js: item => `<script src="${item}"></script>`
  }

  for (let jsitem of data.js) {
    js.push(getAssetName.js(jsitem))
  }

  return js
}

let jsarr = []

class HtmlAfterPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          const
            js = assetsHelp(data.assets)
          jsarr = js
          cb(null, data)
        }
      )

      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          const aliasReg = /@components/g
          const swigReg = /@layouts/g
          data.html = (data.html).replace('<!-- aaajs -->', jsarr.join(''))
          data.html = (data.html).replace(aliasReg, '../../components')
          data.html = (data.html).replace(swigReg, '../../layouts')
          cb(null, data)
        }
      )
    })
  }
}

module.exports = HtmlAfterPlugin