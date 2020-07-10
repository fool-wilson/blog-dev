import './nav.scss';
import nav from './nav.html';

let navDom = $(nav).contents();
$('body').append(navDom);
let navbarH = navDom.find('.nav__bar').height();
let navBottomY = navDom.find('.nav__bar').offset().top + navbarH;
let lastScrollY = new Number();

var showNavbarWithMouse = function(e) {
  if(e.clientY < navbarH) {
    $('.nav__bar').removeClass('nav__bar--hidden');
  } else {
    $('.nav__bar').addClass('nav__bar--hidden');
  }
}

window.onscroll = function() {
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