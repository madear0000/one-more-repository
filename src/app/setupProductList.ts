type Product = {
    id: number;
    name: string;
    check: boolean;
};

export default function setupProductList(): void {

    const deleteAllProductsButton = document.getElementById("deleteAllProductsButton") as HTMLButtonElement;  
    const productsList = document.getElementById("productsList") as HTMLDivElement;  
    const inputForAddProducts = document.getElementById("addNew") as HTMLInputElement;  
    const validationAreaProduct = document.getElementById("validation") as HTMLDivElement;
    const formToAddProducts = document.getElementById('form-to-add-products') as HTMLFormElement;
    const localStorageKey = 'productList';
    const quantityForUser = document.getElementById('quantityForUser') as HTMLSpanElement;
    const quantityUp = document.getElementById('quantityUp') as HTMLButtonElement;
    const quantityDown = document.getElementById('quantityDown') as HTMLButtonElement;
    let quantityNumber = 1;
    let check = false;

    let productList = new Map<number, Product>();
    let productIdCounter = 1;

    const productTemplate = (product: Product): string => `
        <div class="product d-flex rounded mt-3" id="${product.id}">
            <input class="form-check-input" name="bought-products" type="checkbox" value="" data-index="${product.id}" ${product.check ? "checked" : ''}>
            <label for="check" class="ms-2 name">${product.name}</label>
            <button type="button" class="btn btn-danger remove-product" id="deleteOneProduct" data-id="${product.id}"></button>
        </div>`.trim();

    function rerender(): void {
        const html = Array.from(productList.values()).map(product => productTemplate(product)).join('\n');
        productsList.innerHTML = html;
        inputForAddProducts.value = "";
        removeOnePointProduct();
    }

    function removeOnePointProduct(): void {
        const deleteOneProductButtons = document.querySelectorAll(".remove-product");
        deleteOneProductButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const id = (button as HTMLElement).getAttribute('data-id');
                if (id) removeProduct(Number(id));
            });
        });
    }

    function outputToTheScreenQuantity(): string {
        return quantityNumber > 1 ? ' x' + String(quantityNumber) : '';
    }

    function generateProductId(): number {
        return productIdCounter++;
    }

    function validationNotPass(): void {
        validationAreaProduct.style.opacity = "1";
        validationAreaProduct.style.position = "relative";
    }

    function validationPass(): void {
        validationAreaProduct.style.opacity = "0";
        validationAreaProduct.style.position = "absolute";
    }

    function refreshQuantityNumber(): void {
        quantityNumber = 1;
        quantityForUser.textContent = "1";
    }

    function handleAddNewProductButtonClick(): void {
        const name = inputForAddProducts.value.trim() + outputToTheScreenQuantity();
        if (name) {
            const id = generateProductId();
            addProduct({ id, name, check });
        } else {
            validationNotPass();
        }
    }

    function addProduct(product: Product): void {
        productList.set(product.id, product);
        refreshQuantityNumber();
        saveProductsToCache();
        rerender();
    }

    function removeProduct(id: number): void {
        productList.delete(id);
        saveProductsToCache();
        rerender();
    }

    function saveProductsToCache(): void {
        localStorage.setItem(localStorageKey, JSON.stringify(Array.from(productList.entries())));
    }

    function removeAllProducts(): void {
        productList.clear();
        saveProductsToCache();
        rerender();
    }

    function checkboxTextDirectionLineThrough(block: Event): void {
        const target = block.target as HTMLInputElement;
        if (target.checked) {
            productList.forEach((value, key) => {
                if (Number(target.dataset.index) === key) {
                    value.check = true;
                    localStorage.setItem(`product-${key}`, JSON.stringify(value));
                }
            });
        } else if (!target.checked) {
            productList.forEach((value, key) => {
                if (Number(target.dataset.index) === key) {
                    value.check = false;
                    localStorage.setItem(`product-${key}`, JSON.stringify(value));
                }
            });
        }
        rerender();
    }

    function loadProductsFromLocalStorage(): void {
        const storedProducts = localStorage.getItem(localStorageKey);
        if (storedProducts) {
            const productsArray: [number, Product][] = JSON.parse(storedProducts);
            productList = new Map(productsArray);
            productIdCounter = Math.max(0, ...Array.from(productList.keys())) + 1;
        }
        rerender();
    }

    formToAddProducts.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        handleAddNewProductButtonClick();
    });

    inputForAddProducts.addEventListener('keyup', () => {
        if (inputForAddProducts.value.trim() !== "") {
            validationPass();
        }
    });

    deleteAllProductsButton.addEventListener('click', () => {
        removeAllProducts();
    });

    productsList.addEventListener('click', (block: MouseEvent) => {
        checkboxTextDirectionLineThrough(block);
    });

    window.addEventListener('load', () => {
        loadProductsFromLocalStorage();
    });

    function upQuantityNumber(): void {
        quantityNumber++;
        quantityForUser.textContent = String(quantityNumber);
    }

    function downQuantityNumber(): void {
        if (quantityNumber > 1) {
            quantityNumber--;
            quantityForUser.textContent = String(quantityNumber);
        }
    }

    quantityUp.addEventListener('click', () => {
        upQuantityNumber();
    });

    quantityDown.addEventListener('click', () => {
        downQuantityNumber();
    });
}
