const content = require('./modules/content')
const classLists = require('./modules/classlists')
const subheader = require('./modules/subheader.js')
const articles = require('./modules/articles.js')
const layout = require('./modules/layout.js')
const pg10 = require('./modules/pg10.js')
const pg15 = require('./modules/pg15.js')

const data = {
  content,
  classLists,
  subheader,
  articles,
  layout,
  pg10,
  pg15,
}

module.exports = data
