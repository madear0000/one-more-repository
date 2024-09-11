import React from 'react'; 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from '../components/Product';
import userEvent from '@testing-library/user-event';

describe('Product component', () => {
    test('renders product correctly', () => {
        render(
            <Product 
                value="Test Product" 
                onDelete={jest.fn()} 
                onToggle={jest.fn()} 
                isBought={false} 
            />
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    test('toggles strike-through when clicked', async () => {
        const handleToggle = jest.fn();

        render(
            <Product 
                value="Test Product" 
                onDelete={jest.fn()} 
                onToggle={handleToggle} 
                isBought={false} 
            />
        );

        const toggleButton = screen.getByTestId('toggle-button');
        await userEvent.click(toggleButton);

        expect(handleToggle).toHaveBeenCalledWith('Test Product');
    });

    test('deletes product when delete button is clicked', async () => {
        const handleDelete = jest.fn();

        render(
            <Product 
                value="Test Product" 
                onDelete={handleDelete} 
                onToggle={jest.fn()} 
                isBought={false} 
            />
        );

        const deleteButton = screen.getByTestId('delete-button');
        await userEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalledWith('Test Product');
    });

    test('applies strike-through style when product is bought', () => {
        render(
            <Product 
                value="Test Product" 
                onDelete={jest.fn()} 
                onToggle={jest.fn()} 
                isBought={true} 
            />
        );

        const productText = screen.getByText('Test Product');
        expect(productText).toHaveStyle('text-decoration: line-through');
    });
});
