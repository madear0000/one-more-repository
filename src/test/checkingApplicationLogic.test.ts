import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/dom";
import '@testing-library/jest-dom';
import setupProductList from "../app/setupProductList";
import mainLayout from "../app/mainLayout";

describe('checkingApplicationLogic-test', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        mainLayout();
        setupProductList();
    });

    it('should add a product to the list', () => {
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const form = screen.getByRole('form');

        input.value = 'Apple';
        fireEvent.submit(form);

        // Assert
        const productsList = screen.getByTestId('productsList');
        expect(productsList).toHaveTextContent('Apple');
    });

    it('should delete all products', () => {
        // Arrange
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const form = screen.getByRole('form');
        const buttonDeleteAll = screen.getByRole('button', { name: /удалить все/i });

        // Act
        input.value = 'Apple';
        fireEvent.submit(form);
        fireEvent.click(buttonDeleteAll);

        // Assert
        const productsList = screen.getByTestId('productsList');
        expect(productsList).toBeEmptyDOMElement();
    });

    it('should increment and decrement quantity', () => {
        // Arrange
        const quantityUpButton = screen.getByRole('button', { name: /увеличить/i });
        const quantityDownButton = screen.getByRole('button', { name: /уменьшить/i });
        const quantityDisplay = screen.getByTestId('quantityForUser');

        // Act & Assert
        fireEvent.click(quantityUpButton);
        expect(quantityDisplay).toHaveTextContent('2');

        fireEvent.click(quantityDownButton);
        expect(quantityDisplay).toHaveTextContent('1');
    });

    it('should reload and save products on window reload', () => {
        // Arrange
        const input = screen.getByPlaceholderText('Название продукта') as HTMLInputElement;
        const form = screen.getByRole('form');

        // Act
        input.value = 'Apple';
        fireEvent.submit(form);

        // Simulate page reload
        setupProductList();

        // Assert
        const productsList = screen.getByTestId('productsList');
        expect(productsList).toHaveTextContent('Apple');
    });
});
