import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import '../../vitest.setup';
import setupProductList from "../app/setupProductList";
import mainLayout from "../app/mainLayout";

describe('checkingApplicationLogic-test', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        mainLayout();
        setupProductList();
    });

    it('should add a product to the list', async () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /добавить/i })

        await userEvent.type(input, 'Apple');
        await userEvent.click(addButton);

        const productsList = screen.getByTestId('productsList');
        expect(productsList).toHaveTextContent('Apple');
    });

    it('should delete all products', () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const form = screen.getByRole('form');
        const buttonDeleteAll = screen.getByRole('button', { name: /удалить все/i });

        input.value = 'Apple';
        fireEvent.submit(form);
        fireEvent.click(buttonDeleteAll);

        const productsList = screen.getByTestId('productsList');
        expect(productsList).toBeEmptyDOMElement();
    });

    it('should increment and decrement quantity', () => {
        const quantityUpButton = screen.getByRole('button', { name: /увеличить/i });
        const quantityDownButton = screen.getByRole('button', { name: /уменьшить/i });
        const quantityDisplay = screen.getByTestId('quantityForUser');

        fireEvent.click(quantityUpButton);
        expect(quantityDisplay).toHaveTextContent('2');

        fireEvent.click(quantityDownButton);
        expect(quantityDisplay).toHaveTextContent('1');
    });

    it('should reload and save products on window reload', () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const form = screen.getByRole('form');

        input.value = 'Apple';
        fireEvent.submit(form);

        setupProductList();

        const productsList = screen.getByTestId('productsList');
        expect(productsList).toHaveTextContent('Apple');
    });
});
