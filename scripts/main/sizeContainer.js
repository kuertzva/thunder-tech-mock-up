const $ = require('jquery');

/*
 * This makes the container height a function of its width,
 * thus allowing objects to be moved by absolute positioning
 * while ensuring the proportions are correct within the div.
 */

function resize() {
  // gather vars
  const container = $('#primary-container');
  const viewHeight = parseInt($(window).height(), 10);
  const containerWidth = parseInt($(container).width(), 10);
  const proposedHeight = containerWidth * 1.32;

  // ensure we don't get a result that doesn't fill screen
  if (viewHeight < proposedHeight) {
    $(container).height(`${proposedHeight}px`);
  }
}

$(resize());
