import {describe, it, expect, beforeEach} from "vitest";
import mainLayout from "../app/mainLayout";

describe ('mainLayout', () => {
    
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should render the main layout correctly', () => {

        mainLayout();

        const rootElement = document.getElementById('root');
        expect(rootElement).toBeDefined();
        expect(rootElement?.innerHTML).toContain('Список покупок');
        expect(rootElement?.querySelector('#form-to-add-products')).not.toBeNull();
        expect(rootElement?.querySelector('#addNew')).not.toBeNull();
        expect(rootElement?.querySelector('#deleteAllProductsButton')).not.toBeNull();
    });
});