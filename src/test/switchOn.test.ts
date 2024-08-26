import { describe, it, expect, beforeEach } from 'vitest';
import switchOnApp from '../app/switchOnApp';

describe('switchOnApp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should initialize the app layout and product list', () => {
    switchOnApp();

    const rootElement = document.getElementById('root');
    expect(rootElement).toBeDefined();
    expect(rootElement?.innerHTML).toContain('Список покупок');
  });
});
