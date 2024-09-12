import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from '../src/components/Layout';

describe('Layout component', () => {
    it('renders all elements correctly', () => {
        render(<Layout />);
        
        expect(screen.getByText(/Shopping List/i)).toBeTruthy();
        expect(screen.getByLabelText(/Product/i)).toBeTruthy();
        expect(screen.getByText(/Add Product/i)).toBeTruthy();
        expect(screen.getByText(/Delete All/i)).toBeTruthy();
        expect(screen.getByText(/Please enter the product/i)).toBeTruthy();
    });
});
