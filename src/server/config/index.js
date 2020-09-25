const _ = require('lodash')
let config = {}
if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    port: 6001
  }
  config = _.extend(localConfig)
}

if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    port: 80
  }
  config = _.extend(prodConfig)
}

module.exports = config