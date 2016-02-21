import './jquery.timeago.en-short';

// Mobile Navigation
$(document).ready(function() {
  $('.mobile-toggle').click(function() {
    if ($('.menu').hasClass('open-nav')) {
      $('.menu').removeClass('open-nav');
    } else {
      $('.menu').addClass('open-nav');
    }
  });
  
  $('.menu li a').click(function() {
    if ($('.menu').hasClass('open-nav')) {
      $('.navigation').removeClass('open-nav');
      $('.menu').removeClass('open-nav');
    }
  });
});

