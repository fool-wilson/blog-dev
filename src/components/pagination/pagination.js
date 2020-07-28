import pagination from './pagination.html';
import './pagination.scss';

let Pagination = {
  data: new Object(),
  init: init,
  onChangeHash: onChangeHash,
  tail: new Number()
}

/**
 * Change list of view
 * @param {Object} data list data
 * @param {String} page now hash of URL
 */
async function changeListData(data, page) {
  return data[page];
}

/**
 * Initial pagination component
 * @param {Object} data total data of list
 */
async function init(data = new Object()) {
  let pages = Object.keys(data);
  this.data = data;
  this.tail = pages.length;
  if(pages.length <= 1) {
    return null;
  } else {
    let paginationBar = $(pagination).contents();
    paginationBar.find('#pageButtons').append(
      `<a id="prev" class="pagination pagination__bar__button">Prev</a>`+
      `<span>...</span>`
    );
    for(let page of pages) {
      paginationBar.find('#pageButtons').append(`<a id="${page}" href="#${page}" class="pagination pagination__bar__button">${page.split('-')[1]}</a>`);
    }
    paginationBar.find('#pageButtons').append(
      `<span>...</span>`+
      `<a id="next" class="pagination pagination__bar__button">Next</a>`
    );
    $(paginationBar).find('#prev').on('click', turnPage);
    $(paginationBar).find('#next').on('click', turnPage);
    return paginationBar;
  }
}

/**
 * When URL hash has be changed
 */
function onChangeHash() {
  const page = location.hash;
  $('.pagination__bar__button--active').removeClass('pagination__bar__button--active');
  $(page).addClass('pagination__bar__button--active');
  return changeListData(this.data, page.split('#')[1]);
}

function turnPage() {
  const action = this.innerText;
  const page = location.hash.split('-');
  switch(action) {
    case 'Prev':
      location.hash = `${page[0]}-${parseInt(page[1])-1 || 1}`;
      break;
    case 'Next':
      let next = parseInt(page[1])+1 > Pagination.tail ? Pagination.tail : parseInt(page[1])+1;
      location.hash = `${page[0]}-${next}`;
      break;
    default:
  }
}

export default Pagination;