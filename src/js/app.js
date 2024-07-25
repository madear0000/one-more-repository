import appLayout from './mainLayout';
import '../main.scss';
import setupProductList from './product-list';

appLayout();

/**
* @typedef Product
* @property {number} id
* @property {string} name
* @property {boolean} check
*/


setupProductList();
