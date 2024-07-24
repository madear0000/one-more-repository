/**
 * @typedef Product
 * @property {number} id
 * @property {string} name
 */

const addNewProductButton = document.getElementById("addNewProductButton");  
const deleteAllProductsButton = document.getElementById("deleteAllProductsButton");  
const productsList = document.getElementById("productsList");  
const inputForAddProducts = document.getElementById("addNew");  
const validationAreaProduct = document.getElementById("validation");


// let allProducts;

let productList = new Map();
let productIdcounter = 0;

/**
 *
 * @param {Product} product
 * @return {string}
 */
const productTemplate = (product) => `
            <div class="product d-flex rounded mt-3" id=${product.id}>
                <input class="form-check-input" name="bought-products" type="checkbox" value="" data-index=${product.id}>
                <label for="check" class="ms-2">${product.name}</label>
                <button type="button" class="btn btn-danger remove-product" id="deleteOneProduct" data-id=${product.id}></button>
            </div>
`.trim()

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
        name
      })
      
    } else {
       validationNotPass();
    }
  }


/**
 *
 * @param {Product} product
 */
function addProduct(product) {
    productList.set(product.id, product);
    rerender();
}

/**
 *
 * @param {string} id
 */
function removeProduct(id) {
    productList.delete(Number(id));
    rerender();
}

function removeAllProducts() {
    productList.clear();
    rerender();
}

inputForAddProducts.addEventListener('keyup', () => {
    if (inputForAddProducts.value.trim() != "") {
        validationPass();
    }
})

addNewProductButton.addEventListener('click', () => {
    handleAddNewProductButtonClick();
})

deleteAllProductsButton.addEventListener('click', () => {
    removeAllProducts();
})