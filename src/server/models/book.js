class Books {
  constructor(app) {
    this.app = app
  }
  getData(opt) {
    return Promise.resolve({
      data: [{
          name: "卡罗拉",
          price: '2298'
        },
        {
          name: "普拉多",
          price: '3120'
        },
      ]
    })

  }
}


module.exports = Books