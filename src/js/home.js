// import scss
import '../scss/home.scss';
// import compontents
import Article from '../components/article/article.js';
import Foot from '../components/foot/foot.js';
import Nav from '../components/nav/nav.js';
import Pagination from '../components/pagination/pagination.js';

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
function appendArticleList(list) {
  $('#view').html('');
  for(let l of list) {
    Article.create({
      date: l.date,
      link: l.link,
      text: l.text,
      title: l.title
    })
    .then( article => {
      $('#view').append(article) 
    })
    .catch( error => console.log(error) );
  }
}

/**
 * Create pagination
 * @param {Object} lists 
 */
function appendPagination(lists) {
  Pagination.init(lists)
  .then( pagination => {
    if(pagination) {
      $('#view').append(pagination);
      location.hash = 'p-1';
    } else {
      appendArticleList(lists['p-1']);
    }
  })
  .catch( error => console.log(error) );
}

/**
 * Get article list from google sheet.
 * GET https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json
 */
function getArticleList() {
  let lists = new Object();
  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/1aEcM7Lo2HyBkwmqdvQsmuc06RWX6CB8vCsj8tFT1GRs/1/public/values?alt=json',
    method: 'GET',
    success: sheet => {
      // let page = new Number();
      sheet.feed.entry.forEach( (data, index) => {
        // if(index % 10 === 0) {
        //   page = Math.floor((index/10)+1);
          lists[`p-${index+1}`] = new Array();
        // }
        lists[`p-${index+1}`].unshift({
          date: new Date(data.gsx$date.$t).toDateString().substring(4, 15),
          title: data.gsx$title.$t,
          text: `${data.gsx$text.$t}...`,
          link: data.gsx$link.$t
        });
      });
    },
    error: err => console.log(err)
  })
  .then(() => {
    appendPagination(lists);
  });
}

init();
getArticleList();
