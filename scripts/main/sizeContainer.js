const $ = require('jquery');

function factorHeadlines() {
  /*
   * Makes the headlines largeer if there is dead space when the
   * height is significantly larger than the width
   *
   */

  const viewHeight = parseInt($(window).height(), 10);
  const headerHeight = parseInt($('#header').height(), 10);
  console.log(headerHeight);
  const coverArtHeight = parseInt($('#coverArt ').height(), 10);
  const featureBox = $('#featureBox');
  const featureBoxHeight = parseInt($(featureBox).height(), 10);

  const deadSpace = viewHeight - (headerHeight + coverArtHeight + featureBoxHeight);
  console.log(deadSpace);

  const newTop = headerHeight + 50;
  console.log(newTop);

  if (deadSpace > -30) {
    console.log('triggered')
    $(featureBox).css('font-size', '');
    $(featureBox).css('top', '');
    $(featureBox).css('font-size', '6px');
    $(featureBox).css('top', `${newTop}px`);
  } else if (deadSpace > -50) {
    $(featureBox).css('font-size', '');
    $(featureBox).css('top', '');
    $(featureBox).css('font-size', '5px');
    $(featureBox).css('top', `${newTop}px`);
  } else if (deadSpace > -150) {
    $(featureBox).css('font-size', '');
    $(featureBox).css('top', '');
    $(featureBox).css('font-size', '4px');
    $(featureBox).css('top', `${newTop}px`);
  }
}

function resize() {
  /*
 * This makes the container height a function of its width,
 * thus allowing objects to be moved by absolute positioning
 * while ensuring the proportions are correct within the div.
 */

  // gather vars
  const container = $('#primary-container');
  const viewHeight = parseInt($(window).height(), 10);
  const containerWidth = parseInt($(container).width(), 10);
  const proposedHeight = containerWidth * 1.32;

  // ensure we don't get a result that doesn't fill screen
  if (viewHeight < proposedHeight) {
    console.log('resize')
    $(container).height(`${proposedHeight}px`);
  } else {
    factorHeadlines();
    console.log('factor')
  }
}

$(resize());
