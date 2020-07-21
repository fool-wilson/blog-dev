import article from './article.html';
import './article.scss';

function init() {
  $('body').append($(article).contents());
}

export default {
  init: init
}