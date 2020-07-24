import pagination from './pagination.html';
import './pagination.scss';

let currentList = new Array();
let lists = new Object();
let tailPage = new Number();

/**
 * Change list of view
 * @param {String} newPage new hash of URL 
 * @param {String} oldPage old hash of URL
 */
function changePage(newPage, oldPage = null) {
  let page = oldPage ? oldPage.split('-') : null;
  switch(newPage) {
    case 'prev':
      location.hash = `${page[0]}-${parseInt(page[1])-1 || 1}`;
      break;
    case 'next':
      let next = parseInt(page[1])+1 > tailPage ? tailPage : parseInt(page[1])+1;
      location.hash = `${page[0]}-${next}`;
      break;
    default:
      currentList = lists[newPage];
  }
}

/**
 * Initial pagination component
 * @param {Object} data total data of list
 */
async function init(data = new Object()) {
  // console.log(pages);
  let pages = Object.keys(data);
  lists = data;
  tailPage = pages.length;
  if(pages.length <= 1) {
    return null;
  } else {
    $(window).on('hashchange', onClick);
    let paginationBar = $(pagination).contents();
    paginationBar.find('#pageButtons').append(
      `<a id="prev" href="#prev" class="pagination pagination__bar__button">Prev</a>`+
      `<span>...</span>`
    );
    for(let page of pages) {
      paginationBar.find('#pageButtons').append(`<a id="${page}" href="#${page}" class="pagination pagination__bar__button">${page.split('-')[1]}</a>`);
    }
    paginationBar.find('#pageButtons').append(
      `<span>...</span>`+
      `<a id="next" href="#next" class="pagination pagination__bar__button">Next</a>`
    );
    return paginationBar;
  }
}

/**
 * When pagination be clicked to get hash of old and new URL
 * @param {Event} e 
 */
function onClick(e) {
  const newPage = e.originalEvent.newURL.split('#')[1];
  const oldPage = e.originalEvent.oldURL.split('#')[1];
  changePage(newPage, oldPage);
}

export default {
  currentList: currentList,
  init: init
}