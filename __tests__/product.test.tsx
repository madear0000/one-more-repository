import React from 'react'; 
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Product from '../src/components/Product';

describe('Product component', () => {

    afterEach(() => {
        cleanup();
    })

    it('renders product correctly', () => {
        render(
            <Product 
                value="Test Product" 
                onDelete={vi.fn()} 
                onToggle={vi.fn()} 
                isBought={false} 
            />
        );

        expect(screen.getByText('Test Product')).not.toBeNull();
    });

    it('toggles strike-through when clicked', async () => {
        const handleToggle = vi.fn();

        render(
            <Product 
                value="Test Product" 
                onDelete={vi.fn()} 
                onToggle={handleToggle} 
                isBought={false} 
            />
        );

        const toggleButton = screen.getAllByTestId('toggle-button')[0] as HTMLButtonElement;
        await userEvent.click(toggleButton);

        expect(handleToggle).toHaveBeenCalledWith('Test Product');
    });

    it('deletes product when delete button is clicked', async () => {
        const handleDelete = vi.fn();

        render(
            <Product 
                value="Test Product" 
                onDelete={handleDelete} 
                onToggle={vi.fn()} 
                isBought={false} 
            />
        );

        const deleteButton = screen.getByTestId('delete-button');
        await userEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalledWith('Test Product');
    });

    it('applies strike-through style when product is bought', () => {
        render(
            <Product 
                value="Test Product" 
                onDelete={vi.fn()} 
                onToggle={vi.fn()} 
                isBought={true} 
            />
        );

        const productText = screen.getByText('Test Product');
        const style = getComputedStyle(productText);
        expect(style.textDecoration).toBe('line-through');
    });
});
