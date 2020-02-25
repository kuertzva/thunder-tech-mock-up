const topMargin = '4em';
const rightMargin = '4em';
const trendHeight = '.875';


const layout = {
  header: {
    inset: {
      x: rightMargin,
      y: topMargin,
    },
    fontSize: {
      line1: '12.25em',
      line2: '28em',
      line3: '2.3em',
    },
    lineHeight: {
      line1: '1',
      logo: '1',
      line2: trendHeight,
      line3: 'notYetNeeded',
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
}

module.exports = layout
