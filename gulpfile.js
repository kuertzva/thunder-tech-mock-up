const browserSync = require('browser-sync').create()
const del = require('del')
const decache = require('decache')
const {
  dest, parallel, series, src, watch: watcher,
} = require('gulp')
const flags = require('yargs').argv
const fontmin = require('gulp-fontmin')
const fs = require('fs').promises
const glob = require('glob')
const imagemin = require('gulp-imagemin')
const njk = require('gulp-nunjucks-render')
const path = require('path')
const postcss = require('gulp-postcss')
const prettyHTML = require('gulp-pretty-html')

const buildFolder = flags.prod ? '.build' : '.dev'

function clean() {
  return del(buildFolder)
}

function css() {
  return src('styles/main.css')
    .pipe(postcss())
    .pipe(dest(buildFolder))
}

async function data() {
  decache('./markup/data/data')
  const newData = require('./markup/data/data')
  const json = JSON.stringify(newData, null, 2)
  const location = path.resolve(__dirname, 'markup', 'data', 'data.reference.json')
  await fs.writeFile(location, json, 'utf8')
}

function render(input, output) {
  decache('./markup/data/data')
  const newData = require('./markup/data/data')
  return src(`./markup/${input}/**/*.njk`)
    .pipe(njk({
      data: newData,
      path: ['./markup'],
    }))
    .pipe(prettyHTML({
      indent_size: 2,
      preserve_newlines: false,
    }))
    .pipe(dest(`${buildFolder}/${output}`))
}

function components() {
  return render('components', 'components', false)
}

function pages() {
  return render('pages', '/', true)
}

function markup(done) {
  return parallel(components, pages)(done)
}

function nothing(done) {
  return done()
}

function root() {
  return src('root/**/*')
    .pipe(dest(buildFolder))
}

function optimize() {
  return src('root/images/**/*')
    .pipe(imagemin())
    .pipe(dest(`${buildFolder}/images`))
}

function forceReload(done) {
  data()
  markup()
  browserSync.reload()
  done()
}

function server() {
  browserSync.init({
    directory: true,
    open: 'external',
    notify: false,
    server: buildFolder,
    watch: true,
  })
  watcher([
    'components/**/*.css',
    'styles/**/*.css',
    'styles/tailwind.js',
  ], css)
  watcher([
    'markup/data/**/*.js',
    'markup/**/*.njk',
  ], forceReload)
  watcher([
    'root/**/*',
  ], root)
}

function build(done) {
  return series(clean, parallel(
    data,
    flags.static ? pages : markup,
    root,
  ),
  css,
  flags.static ? optimize : nothing)(done)
}

module.exports = {
  build, clean, css, data, markup, root, server,
}
