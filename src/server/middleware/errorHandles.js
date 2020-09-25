const errorHandles = {
  error(app) {
    app.use(async (ctx, next) => {
      try {
        await next()

      } catch (error) {
        ctx.body = `有问题`

      }
    })
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status !== 404) {
        return
      }

      ctx.status = 404
      ctx.body = `nihao`
    })
  }
}


module.exports = errorHandles