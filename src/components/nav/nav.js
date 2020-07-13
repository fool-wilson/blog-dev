import './nav.scss';
import nav from './nav.html';

let navDom = $(nav).contents();
let navbarH, navBottomY, lastScrollY;

var showNavbarWithMouse = function(e) {
  if(e.clientY < navbarH) {
    $('.nav__bar').removeClass('nav__bar--hidden');
  } else {
    $('.nav__bar').addClass('nav__bar--hidden');
  }
}

function hideNavbarWithScroll() {
  let currentScrollY = this.scrollY;
  if(currentScrollY >= navBottomY) {
    $('.nav__bar').addClass('nav__bar--sticky');
    if(currentScrollY > lastScrollY) {
      $('.nav__bar').addClass('nav__bar--hidden');
      this.addEventListener('mousemove', showNavbarWithMouse);
    } else {
      $('.nav__bar').removeClass('nav__bar--hidden');
      this.removeEventListener('mousemove', showNavbarWithMouse);
    }
  } else {
    $('.nav__bar').removeClass('nav__bar--sticky');
  }
  lastScrollY = currentScrollY;
}

export default {
  init: function() {
    $('body').append(navDom);
    navbarH = navDom.find('.nav__bar').height();
    navBottomY = navDom.find('.nav__bar').offset().top + navbarH;
    lastScrollY = new Number();
    window.onscroll = hideNavbarWithScroll;
  }
};