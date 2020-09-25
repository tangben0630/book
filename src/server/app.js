const koa = require('koa')
const path = require('path')
const moduleAlias = require('module-alias')
const serve = require('koa-static');
const errorHandle = require('./middleware/errorHandles')

moduleAlias.addAliases({
  '@root': __dirname,
  '@views': __dirname + '/web/views',
  '@config': __dirname + '/config',
  '@controllers': __dirname + '/controllers',
  '@middleware': __dirname + '/middleware',
  '@components': __dirname + '/web/components',
  '@assets': __dirname + '/web/assets',
})
const router = require('@controllers/index')
const {
  historyApiFallback
} = require('koa2-connect-history-api-fallback');
const {
  port
} = require('@config/index')
const co = require('co')
const swig = require('koa-swig')
const app = new koa()
errorHandle.error(app)
let path1 = path.join(__dirname, '../web/assets')
app.use(serve(path1));
app.use(historyApiFallback({
  index: '/',
  whiteList: ['/books']
}));
let path2 = path.join(__dirname, '../web/views')
console.log(path2, '5555555555', path1);
app.context.render = co.wrap(
  swig({
    root: path2,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
  })
)


router(app)
app.listen(port)