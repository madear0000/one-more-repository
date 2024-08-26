import { describe, it, expect, beforeEach } from "vitest";
import setupProductList from "../app/setupProductList";
import mainLayout from "../app/mainLayout";

describe('checkingApplicationLogic-test', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        mainLayout();
        setupProductList();
    });

    it('should add a product to the list', () => {
        const input = document.getElementById('addNew') as HTMLInputElement;
        const form = document.getElementById('form-to-add-products') as HTMLFormElement;

        input.value = 'Apple';

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        const productsList = document.getElementById('productsList');
        expect(productsList?.innerHTML).toContain('Apple');
    });

    it('delete all', () => {
        const input = document.getElementById('addNew') as HTMLInputElement;
        const form = document.getElementById('form-to-add-products') as HTMLFormElement;
        const buttonDeleteAll = document.getElementById('deleteAllProductsButton') as HTMLButtonElement;

        input.value = 'Apple';

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        buttonDeleteAll.click();

        const productsList = document.getElementById('productsList');
        expect(productsList?.innerHTML).toBe('');
    });

    it('should increment and decrement quantity', () => {
        const quantityUpButton = document.getElementById('quantityUp') as HTMLButtonElement;
        const quantityDownButton = document.getElementById('quantityDown') as HTMLButtonElement;
        const quantityDisplay = document.getElementById('quantityForUser') as HTMLSpanElement;

        quantityDownButton.click();
        expect(quantityDisplay.textContent).toBe('1');
        
        quantityUpButton.click();
        expect(quantityDisplay.textContent).toBe('2');

        quantityDownButton.click();
        expect(quantityDisplay.textContent).toBe('1');
    });

    it('should reload and save products on window', () => {
        const input = document.getElementById('addNew') as HTMLInputElement;
        const form = document.getElementById('form-to-add-products') as HTMLFormElement;

        input.value = 'Apple';

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        const productsList = document.getElementById('productsList');

        location.reload();

        expect(productsList?.innerHTML).toContain('Apple');
    });
    
});
