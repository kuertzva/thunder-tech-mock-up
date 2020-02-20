/**
  * # Creates fluid-scaling text size classes.
  *
  * Theme values:
  *
  * - `scaledFontSize` - An array of strings, each representing a scaled font size. For example,
  *   `"scaledFontSize": ['12-16', '18-32', '24-36']` would produce three class names, `text-12-16`, `text-18-32`
  *   and `text-24-36`.
  * - `scaleRange` is a string range of viewport sizes in pixels, expressed unitlessly. For example,
  *   `"scaleRange": "400-800"`
  *   Note: This config value is shared with the sides plugin.
  *
  */

const { rem } = require('./functions.js')

module.exports = ({ addUtilities, theme }) => {
  const scaledFontSizes = theme('scaledFontSize')
  const [lower, upper] = theme('scaleRange').split('-')
  const difference = +upper - (+lower)
  addUtilities({
    [`@media (width < ${lower}px)`]: scaledFontSizes.reduce((accumulator, scaleName) => {
      const scaledText = scaleName.split('-')
      accumulator[`.text-${scaleName}`] = {
        'font-size': rem(scaledText[0]),
      }
      return accumulator
    }, {}),
    [`@media (${lower}px <= width < ${upper}px)`]: scaledFontSizes.reduce((accumulator, scaleName) => {
      const scaledText = scaleName.split('-')
      accumulator[`.text-${scaleName}`] = {
        'font-size': `calc(${scaledText[0]}px + ${scaledText[1] - scaledText[0]} * ((100vw - ${lower}px) / ${difference}))`,
      }
      return accumulator
    }, {}),
    [`@media (width >= ${upper}px)`]: scaledFontSizes.reduce((accumulator, scaleName) => {
      const scaledText = scaleName.split('-')
      accumulator[`.text-${scaleName}`] = {
        'font-size': rem(scaledText[1]),
      }
      return accumulator
    }, {}),
  })
}
