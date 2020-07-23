// import scss
import '../scss/home.scss';
// import compontents
import Article from '../components/article/article.js';
import Foot from '../components/foot/foot.js';
import Nav from '../components/nav/nav.js';

/**
 * Initial home page view
 */
function init() {
  Nav.init();
  $('body').append('<div id="view" class="home"></div>');
  Foot.init();
}

/**
 * Create article list
 */
function appendArticle(list) {
  for(let l of list) {
    Article.create($('#view'), {
      date: l.date,
      title: l.title,
      text: l.text,
      link: l.link
    });
  }
}

/**
 * Get article list from google sheet.
 * GET https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json
 */
function getArticleList() {
  let googleSheet = new Array();
  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/1aEcM7Lo2HyBkwmqdvQsmuc06RWX6CB8vCsj8tFT1GRs/1/public/values?alt=json',
    method: 'GET',
    success: sheet => {
      for(let data of sheet.feed.entry) {
        googleSheet.push({
          date: new Date(data.gsx$date.$t).toDateString().substring(4, 15),
          title: data.gsx$title.$t,
          text: `${data.gsx$text.$t}...`,
          link: data.gsx$link.$t
        });
      }
      console.table(googleSheet);
    },
    error: err => console.log(err)
  })
  .then(() => {
    appendArticle(googleSheet.reverse());
  });
}

init();
getArticleList();
