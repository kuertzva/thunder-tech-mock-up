/*
 * This is how any positioning/space/sizing that is specific is
 * pulled. Tailwind operates in generalities and this is it's
 * strength. But much of this project is about hyper specificity.
 *
 * Rather than attempt to force tailwind to be something it is not,
 * I opted view the components as functions with imputs. I then
 * made this the origin of all those inputs, allowing me to
 * modify as needed without having to open and navigate a bunch
 * of files.
 *
 * definition of repeated terms below
 *
 * hort & vert: indicate whether an element is positioning itself
 * from the left or right/top or bottom.
 *
 * x & y: the positioning from hort or vert above
 *
 * the rest is mostly camel case versions of css attributes.
 */


const topMargin = '6.5em';
const rightMargin = '4em';
const trendHeight = '.875';


const layout = {
  header: {
    hort: 'right',
    vert: 'top',
    x: rightMargin,
    y: topMargin,
    fontSize: {
      line1: '12.1em',
      line2: '27.45em',
    },
    lineHeight: {
      line1: '1',
      logo: '1',
      line2: trendHeight,
    },
    letterSpacing: {
      line1: '',
      line2: '',
    },
    subheader: {
      fontSize: '2.3em',
    },
  },
  logo: {
    hort: 'right',
    vert: 'top',
    x: rightMargin,
    y: topMargin,
  },
  burst1: {
    height: '95em',
    hort: 'left',
    x: '-25em',
    vert: 'bottom',
    y: '15em',
  },
  burst2: {
    height: '90em',
    hort: 'right',
    x: '-20em',
    vert: 'bottom',
    y: '-45em',
  },
  lady: {
    height: '104em',
    width: '144em',
    hort: 'left',
    x: '-44em',
    vert: 'bottom',
    y: '-4em',
  },
  featureBox: {
    width: '45em',
    hort: 'right',
    x: '4em',
    vert: 'top',
    y: '53em',
    feature: {
      buffer: '4.5em',
      fontSize: {
        line1: '3.95em',
        line2: '2.45em',
        line3: '7.4em',
        line4: '.4em',
      },
      lineHeight: {
        line1: trendHeight,
        line2: '1.4',
        line3: '1.2',
        line4: '2',
      },
    },
  },
  article: {
    hort: 'left',
    vert: 'top',
    x: '4em',
    titleY: '45em',
    textY: '50em',
  },
}

module.exports = layout
