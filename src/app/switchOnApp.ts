import mainLayout from './mainLayout';
import '../main.scss';
import setupProductList from './setupProductList';

/**
 * @typedef Product
 * @property {number} id
 * @property {string} name
 * @property {boolean} check
 */

export default function switchOnApp(): void {
    mainLayout();
    setupProductList();
}
