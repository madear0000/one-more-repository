import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import '../../vitest.setup';
import setupProductList from "../app/setupProductList";
import mainLayout from "../app/mainLayout";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

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

    it('should delete all products', async () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const buttonDeleteAll = screen.getByRole('button', { name: /удалить все/i });
        const addButton = screen.getByRole('button', { name: /добавить/i })

        await userEvent.type(input, 'Apple');
        await userEvent.click(addButton);
        await userEvent.click(buttonDeleteAll);

        const productsList = screen.getByTestId('productsList');
        expect(productsList).toBeEmptyDOMElement();
    });

    it('should increment and decrement quantity', async () => {
        const quantityUpButton = screen.getByRole('button', { name: /увеличить/i });
        const quantityDownButton = screen.getByRole('button', { name: /уменьшить/i });
        const quantityDisplay = screen.getByTestId('quantityForUser');

        await userEvent.click(quantityUpButton)
        expect(quantityDisplay).toHaveTextContent('2');

        await userEvent.click(quantityDownButton)
        expect(quantityDisplay).toHaveTextContent('1');
    });

    it('should reload and save products on window reload', async () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const addButton = screen.getByRole('button', { name: /добавить/i })

        await userEvent.type(input, 'Apple');
        await userEvent.click(addButton);

        setupProductList();

        const productsList = screen.getByTestId('productsList');
        expect(productsList).toHaveTextContent('Apple');
    });
});
