// import scss
import '../scss/home.scss';
// import compontents
import Article from '../components/article/article.js';
import Foot from '../components/foot/foot.js';
import Nav from '../components/nav/nav.js';

Nav.init();
// $('body').append(
//   '<div style="width: 100%; height: 200vh;"></div>'
// );
Article.init();
Foot.init();
