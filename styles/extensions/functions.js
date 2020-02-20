/**
  * # Functions to be used from within the Tailwind config file.
  *
  */

const functions = {
  /**
    * @param {number} value The pixel value which will be translated into a rem value (based on 1rem = 16px).
    * @returns {number} A converted rem value
    */
 rem: value => `${value / 16}rem`,
  /**
    * @param {string} unit The unit string of the CSS value such as '%' or 'vw'.
    * @param {Array} value An array of values which are prepended to the unit string.
    * @returns {Object} An object of key-value pairs where the keys are class names and the values are property values
    */
  unitList: (unit, values) => values.reduce((accumulator, value) => {
    accumulator[value + unit] = value + unit
    return accumulator
  }, {}),
}

/**
  * @param {Array} value An array of pixel values which will be translated into rem values (based on 1rem = 16px).
  * @returns {Object} An object of key-value pairs where the keys are class names and the values are property values
  */
functions.remList = pixels => pixels.reduce((accumulator, px) => {
  accumulator[px] = functions.rem(px)
  return accumulator
}, {})

/**
  * @param {Array} value An array of pixel values
  * @returns {Object} An object of key-value pairs where the keys are class names and the values are property values
  */
functions.pxList = pixels => pixels.reduce((accumulator, px) => {
  accumulator[px] = px + 'px'
  return accumulator
}, {})

/**
  * @description Fractional class names using percentages (width as the numerator)
  * @param {Array} value An array of fraction strings, for example ['2/3']
  * @returns {Object} An object of key-value pairs where the keys are class names and the values are property values
  */
functions.fractionList = ratios => ratios.reduce((accumulator, ratio) => {
  const data = ratio.split('/')
  accumulator [ratio] = (Math.floor(100000 * +data[0] / +data[1]) / 1000) + '%'
  return accumulator
}, {})

/**
  * @description Aspect ratio space classes using percentages (height as the numerator)
  * @param {Array} value An array of ratio strings, for example ['2:3']
  * @returns {Object} An object of key-value pairs where the keys are class names and the values are property values
  */
functions.ratioList = ratios => ratios.reduce((accumulator, ratio) => {
  const data = ratio.split(':')
  accumulator [ratio] = (Math.floor(100000 * +data[1] / +data[0]) / 1000) + '%'
  return accumulator
}, {})

module.exports = functions
