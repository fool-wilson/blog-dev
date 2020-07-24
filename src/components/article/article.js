import article from './article.html';
import './article.scss';

/**
 * Create article block and insert list data to block
 * @param {Object} list The article title、text and url link
 */
async function create(list) {
  let articleBox = $(article).contents();
  articleBox.find('#articleDate').text(list.date);
  articleBox.find('#articleTitle').text(list.title);
  articleBox.find('#articleText').text(list.text);
  articleBox.find('#readMore').attr('href', list.link);
  return articleBox;
}

export default {
  create: create
}