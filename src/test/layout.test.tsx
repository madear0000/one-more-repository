import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../components/Layout';

describe('layout test', () => {
    test('renders all elements correctly', () => {
        render(<Layout />);
    
        expect(screen.getByText(/Shopping List/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Product/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete All/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter the product/i)).toBeInTheDocument();
    });
});





