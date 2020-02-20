const flags = require('yargs').argv
const path = require('path')
const glob = require('glob')

module.exports = {
  entry: {
    main: glob.sync('./scripts/main/*.js'),
  },
  output: {
    path: path.resolve(__dirname, flags.mode === 'production' ? '.build' : '.dev'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
}
