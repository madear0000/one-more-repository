import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Layout from '../src/components/Layout';
import { useProducts } from '../src/hooks/useProduct';

vi.mock('../src/hooks/useProduct', () => {
    let productMap = new Map();

    return {
        useProducts: () => ({
            productMap,
            addProduct: vi.fn(),
            deleteProduct: vi.fn(),
            validationNotPass: false,
            deleteAll: vi.fn(() => {
                productMap.clear();
            }),
            handleAddNewProductButtonClick: vi.fn((product) => {
                productMap.set(product, { name: product, check: false });
            }),
            validationInput: true,
            setValidationInput: vi.fn(),
            crossOut: vi.fn(),
        }),
    };
});

describe('Layout component', () => {
    it('user can add a product', async () => {
        const user = userEvent.setup();
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

    it('user can delete all products', async () => {
        const user = userEvent.setup();

        render(<Layout />);

        const { productMap, deleteAll } = useProducts();
        const deleteButtons = screen.getAllByRole('button', { name: /Delete All/i });
        const deleteButton = deleteButtons[0]; 


        productMap.set('1', { name: 'Test Product One', check: false });
        productMap.set('2', { name: 'Test Product Two', check: false });

        await user.click(deleteButton);

        await waitFor(() => {
            expect(productMap.size).toBe(0);
        });
    });
});
