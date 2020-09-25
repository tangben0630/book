const Books = require("../models/book")
class IndexController {
  constructor() {

  }
  async actionIndex(ctx, next) {
    const book = new Books()
    let res = await book.getData()
    res = "nihao"
    await ctx.render('index/index-vue', {
      res: res
    })
  }
}



module.exports = IndexController