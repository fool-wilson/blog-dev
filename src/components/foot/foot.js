import foot from './foot.html';
import './foot.scss';

function init() {
  $('body').append($(foot).contents());
  $('.foot > a').hover(function() {
    $(this).addClass('animate__jello');
  }, function() {
    $(this).removeClass('animate__jello');
  });
}

export default {
  init: init
}