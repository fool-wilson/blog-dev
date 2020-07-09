import './navbar.scss';
import navbar from './navbar.html';

console.log($(navbar));
console.log($(navbar).contents().find('li'));

$('body').append($(navbar).contents());