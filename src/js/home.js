// import scss
import '../scss/home.scss';
// import compontents
import Nav from '../components/nav/nav.js';
import Foot from '../components/foot/foot.js';

Nav.init();
$('body').append(
  '<div style="width: 100%; height: 200vh;"></div>'
);
Foot.init();
