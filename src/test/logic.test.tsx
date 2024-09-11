import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../components/Layout';
import userEvent from '@testing-library/user-event';

// Mock hook
jest.mock('../hooks/useProduct', () => {
    let productMap = new Map();

    return {
        useProducts: jest.fn(() => ({
            productMap,
            addProduct: jest.fn(),
            deleteProduct: jest.fn(),
            validationNotPass: false,
            deleteAll: jest.fn(() => {
                productMap.clear();
            }),
            handleAddNewProductButtonClick: jest.fn((product) => {
                productMap.set(product, { name: product, check: false });
            }),
            validationInput: true,
            setValidationInput: jest.fn(),
            crossOut: jest.fn(),
        })),
    };
});

describe('Layout component', () => {
    test('user can add a product', async () => {
        const user = userEvent.setup();
        const { useProducts } = require('../hooks/useProduct');
        const { productMap } = useProducts();

        render(<Layout />);

        const input = screen.getByLabelText(/Product/i) as HTMLInputElement;
        const addButton = screen.getByText(/Add Product/i) as HTMLButtonElement;

        await user.type(input, 'Test Product');
        await user.click(addButton);

        await waitFor(() => {
            expect(productMap.has('Test Product')).toBe(true);
            expect(productMap.get('Test Product')).toEqual({ name: 'Test Product', check: false });
        });
    });

    test('user can delete all products', async () => {
        const user = userEvent.setup();
        const { useProducts } = require('../hooks/useProduct');

        render(<Layout />);

        const { productMap, deleteAll } = useProducts();
        const deleteButton = screen.getByText(/Delete All/i) as HTMLButtonElement;

        productMap.set('1', {name: 'Test Product One', check: false});
        productMap.set('2', {name: 'Test Product Two', check: false});

        await user.click(deleteButton);

        await waitFor(() => {
            expect(productMap.size).toBe(0);
        });

    });
});
