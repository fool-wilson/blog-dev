import article from './article.html';
import './article.scss';

/**
 * Create article block
 * @param {Document} block The html bolck document tree whitch to append the article block
 * @param {Object} data The article title、text and url link
 */
function create(block = $('body'), data) {
  let articleBox = $(article).contents();
  initArticleBox(articleBox, data)
  .then( () => block.append(articleBox) )
  .catch( error => console.log(error) );
}

/**
 * Initial the article title、content text and button link
 * @param {Document} dom The article template document tree
 * @param {Object} data The article title、text and url link
 */
async function initArticleBox(dom, data) {
  dom.find('#articleTitle').text(data.title);
  dom.find('#articleText').text(data.text);
  dom.find('#readMore').attr('href', data.link);
}

export default {
  create: create
}