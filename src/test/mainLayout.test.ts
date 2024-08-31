import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import mainLayout from '../app/mainLayout';

describe('mainLayout', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root" data-testid="root"></div>';
  });

  it('should render the main layout correctly', () => {
    mainLayout();

    const rootElement = screen.getByTestId('root');
    const formElement = screen.getByRole('form');
    const addNewInput = screen.getByPlaceholderText('Название продукта');
    const deleteAllButton = screen.getByRole('button', { name: /удалить все/i });

    expect(rootElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
    expect(addNewInput).toBeInTheDocument();
    expect(deleteAllButton).toBeInTheDocument();
  });
});

