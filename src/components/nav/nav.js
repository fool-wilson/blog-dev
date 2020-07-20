import nav from './nav.html';
import './nav.scss';

let [navbarH, navBottomY, lastScrollY] = [new Number(), new Number(), new Number()];

/**
 * Control navbar whether to show with scroll
 */
function hideNavbarWithScroll() {
  let currentScrollY = this.scrollY;
  if(currentScrollY >= (navBottomY + navbarH)) {
    if(currentScrollY > lastScrollY) {
      $('.nav__bar').addClass('nav__bar--hidden');
      this.addEventListener('mousemove', showNavbarWithMouse);
    } else {
      $('.nav__bar').removeClass('nav__bar--hidden');
      this.removeEventListener('mousemove', showNavbarWithMouse);
    }
  } else if(currentScrollY >= navBottomY) {
    $('.nav__bar').addClass('nav__bar--sticky');
  } else {
    $('.nav__bar').removeClass('nav__bar--sticky');
  }
  lastScrollY = currentScrollY;
}

/**
 * initiate the navbar
 */
function init() {
  let navDom = $(nav).contents();
  $('body').append(navDom);
  navbarH = navDom.find('.nav__bar').height();
  navBottomY = navDom.find('.nav__bar').offset().top;
  window.onscroll = hideNavbarWithScroll;
}

/**
 * Control navbar whether to show with mouse
 * @param {*} e Mouse event
 */
function showNavbarWithMouse(e) {
  if(e.clientY < navbarH) {
    $('.nav__bar').removeClass('nav__bar--hidden');
  } else {
    $('.nav__bar').addClass('nav__bar--hidden');
  }
}

export default {
  init: init
};