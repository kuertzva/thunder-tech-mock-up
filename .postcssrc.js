const MODE = process.env.NODE_ENV === 'production'
const purge = {
  content: ['**/*.html', '**/*.njk'],
  extractors: [{
    extractor: value => value.match(/[A-z0-9-:%/]+/g) || [],
    extensions: ['html', 'njk'],
  }],
}

module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss')('./styles/tailwind.js'),
    require('postcss-hexrgba'),
    require('postcss-preset-env'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...MODE
    ? [
      require('@fullhuman/postcss-purgecss')(purge),
      require('postcss-clean')
    ]
    : [],
  ]
}
