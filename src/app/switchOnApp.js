import mainLayout from './mainLayout';
import '../main.scss';
import setupProductList from './setupProductList';

export default function swithcOnApp() {
    mainLayout();

    /**
    * @typedef Product
    * @property {number} id
    * @property {string} name
    * @property {boolean} check
    */


    setupProductList();
}


