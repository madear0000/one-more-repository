import { describe, it, expect, beforeEach } from 'vitest';
import { getByText, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import switchOnApp from '../app/switchOnApp';

describe('switchOnApp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should initialize the app layout and product list', () => {
    const rootElement = document.getElementById('root');
    
    switchOnApp();
    
    expect(rootElement).toBeDefined();
    expect(screen.getByText('Список покупок')).toBeInTheDocument();
  });
});
