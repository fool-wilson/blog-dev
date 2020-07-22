// import scss
import '../scss/home.scss';
// import compontents
import Article from '../components/article/article.js';
import Foot from '../components/foot/foot.js';
import Nav from '../components/nav/nav.js';

function init() {
  Nav.init();
  $('body').append('<div id="view" class="home"></div>');
  Foot.init();
}

function appendArticle() {
  for(let i = 0; i < 5; i++) {
    Article.create($('#view'), {
      title: `Test Title-${i}`,
      text: `學習當頁面往下滾動後如何讓 Navbar 黏著在視窗上方；其他當滾動滑鼠滾輪時可顯示、隱藏 Navbar ，最後當 Navbar 隱藏時透過監聽滑鼠行為，靠近時顯示及離開時隱藏。`,
      link: `/test/${i}`
    });
  }
}

function getArticleList() {}

init();
appendArticle();
