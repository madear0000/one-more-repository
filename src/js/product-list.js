export default function setupProductList() {
    
    const deleteAllProductsButton = document.getElementById("deleteAllProductsButton");  
    const productsList = document.getElementById("productsList");  
    const inputForAddProducts = document.getElementById("addNew");  
    const validationAreaProduct = document.getElementById("validation");
    const formToAddProducts = document.getElementById('form-to-add-products');
    let check = false;


    // let allProducts

    let productList = new Map();
    let productIdcounter = 1;

    /**
     *
     * @param {Product} product
     * @return {string}
 */

    
    const productTemplate = (product) => `
            <div class="product d-flex rounded mt-3" id=${product.id}>
                <input class="form-check-input" name="bought-products" type="checkbox" value="" data-index=${product.id} ${product.check ? "checked" : ''}>
                <label for="check" class="ms-2} name">${product.name}</label>
                <button type="button" class="btn btn-danger remove-product" id="deleteOneProduct" data-id=${product.id}></button>
            </div>`.trim()

    function rerender() {
        const html = Array.from(productList.values()).map(product => productTemplate(product)).join('\n');
        productsList.innerHTML = html;
        inputForAddProducts.value = "";
        removeOnePointProduct();
    
    }
    
    
    function removeOnePointProduct() {
        const deleteOneProductButton = document.querySelectorAll(".remove-product");
    
        deleteOneProductButton.forEach((button) => {
            button.addEventListener('click', () => {
                removeProduct(button.getAttribute('data-id'));
            });
        });   
    }
    
    function generateProductId() {
        return productIdcounter++;
    }
    
    function validationNotPass() {
        validationAreaProduct.style.opacity = "1";
        validationAreaProduct.style.position = "relative";
    }
    
    
    function validationPass() {
        validationAreaProduct.style.opacity = "0";
        validationAreaProduct.style.position = "absolute";
    }
    
    function handleAddNewProductButtonClick() {
        const name = inputForAddProducts.value.trim();
        
        if (name) {
          const id = generateProductId();
      
          addProduct({
            id,
            name,
            check
          })
          
        } else {
           validationNotPass();
        }
      }
    
    function saveProductstoCache(product) {
        localStorage.setItem(`product-${product.id}`, JSON.stringify(product));
    }

    function removeProductsFromCache(id) {
        localStorage.removeItem(`product-${id}`);
    }

    function removeAllProductsFromCache() {
        localStorage.clear();
        productIdcounter = 1;
    }
    
    /**
     *
     * @param {Product} product
     */
    
    function addProduct(product) {
            productList.set(product.id, product);
            saveProductstoCache(product);
            rerender();
    }
    
    /**
     *
     * @param {string} id
     */
    function removeProduct(id) {
        productList.delete(Number(id));
        removeProductsFromCache(id);
        rerender();
    }
    
    function removeAllProducts() {
        productList.clear();
        removeAllProductsFromCache();
        rerender();
    }
    
    function checkboxTextDerectionLineThrough(block) {
        if (block.target.checked) {
            productList.forEach((value, key) => {
                if (Number(block.target.dataset.index) == key) {
                    value.check = true;
                    localStorage.setItem(`product-${key}`, JSON.stringify(value));
                }
            })
        } else if(!block.target.checked) {
            productList.forEach((value, key) => {
                if (Number(block.target.dataset.index) == key) {
                    value.check = false;
                    localStorage.setItem(`product-${key}`, JSON.stringify(value));
                }
            })
        }
        rerender();
    }
    
    function loadProductsFromLocalStorage() {
        let checkId = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('product-')) {
            const productString = localStorage.getItem(key);
            const product = JSON.parse(productString);
            checkId.push(product.id);
            addProduct(product);
            
          }
        }
        productIdcounter = Math.max.apply(null, checkId) + 1;
        if (productIdcounter == -Infinity) {
            productIdcounter = 1;
        }
    }
    
    formToAddProducts.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddNewProductButtonClick();
    })
    
    inputForAddProducts.addEventListener('keyup', () => {
        if (inputForAddProducts.value.trim() != "") {
            validationPass();
        }
    })
    
    deleteAllProductsButton.addEventListener('click', () => {
        removeAllProducts();
    })
    
    
    productsList.addEventListener('click', (block) => {
        checkboxTextDerectionLineThrough(block);
    });
    
    
    window.addEventListener('load', () => {
        loadProductsFromLocalStorage();
    });
    
}