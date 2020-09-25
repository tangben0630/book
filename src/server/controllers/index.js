const BooksController = require('./bookCtroller')
const IndexController = require('./indexCtroller')

const router = require('koa-router')()
const booksController = new BooksController()
const indexController = new IndexController()
module.exports = app => {
  router.get('/', async (ctx, next) => {
    await indexController.actionIndex(ctx, next)
  })
  router.get('/books/list', async (ctx, next) => {
    await booksController.actionIndex(ctx, next)
  })


  app.use(router.routes())
}