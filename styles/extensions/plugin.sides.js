/**
  * # Creates fluid-scaling side margin classes.
  *
  * Theme values:
  *
  * - `scaledSidesRange` - is a string range of viewport sizes in pixels, expressed unitlessly. For example,
  *   `"scaledSidesRange": '12-40'`
  * - `scaleRange` is a string range of viewport sizes in pixels, expressed unitlessly. For example,
  *   `"scaleRange": "400-800"`
  *   Note: This config value is shared with the scaled-text plugin.
  *
  */

const { rem } = require('./functions.js')

module.exports = ({ addUtilities, theme }) => {
  const sidesRange = theme('scaledSidesRange').split('-')
  const [lower, upper] = theme('scaleRange').split('-')
  const difference = +upper - (+lower)
  addUtilities({
    [`@media (width < ${lower}px)`]: {
      '.px-sides': {
        'padding-left': rem(sidesRange[0]),
        'padding-right': rem(sidesRange[0]),
      },
    },
    [`@media (${lower}px <= width < ${upper}px)`]: {
      '.px-sides': {
        'padding-left': `calc(${sidesRange[0]}px + ${sidesRange[1] - sidesRange[0]} * ((100vw - ${lower}px) / ${difference}))`,
        'padding-right': `calc(${sidesRange[0]}px + ${sidesRange[1] - sidesRange[0]} * ((100vw - ${lower}px) / ${difference}))`,
      },
    },
    [`@media (width >= ${upper}px)`]: {
      '.px-sides': {
        'padding-left': rem(sidesRange[1]),
        'padding-right': rem(sidesRange[1]),
      },
    },
  }
  )
}
