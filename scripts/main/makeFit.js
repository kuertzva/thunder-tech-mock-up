const $ = require('jquery');

/*
 *This is a script to make the text of an element fill the defined
 *width. This is not an AMAZING script as it relies on magic numbers
 *determined through playing around. These are stored in the element
 *itself as a data attribute.
 */

function fontFill() {
  const elems = $('.fit'); // elements to be filled
  // console.log(elems.length);
  const container = $('#primary-container').width();// width of container
  const windowWidth = $(window).width();

  /*
   *note: past a given width, it will look odd to make the
   *container and the header the full width of the viewport
   *so I am tying it the the width of the container
   */
  if (container < windowWidth) {
    let i;
    for (i = 0; i < elems.length; i += 1) {
      // console.log(i);
      const el = elems[i];
      // console.log(el);
      const percent = parseFloat($(el).attr('data-font')); // get percent of screen width for font size
      const fontSize = container * percent; // pixel size for font
      $(el).css('font-size', `${fontSize}px`); // apply
    }
  } else {
    console.log('fontFill untripped')
  }
}

// fill font on load
$(fontFill());

// fill font on resize
$(' #primary-container ').resize(fontFill());
