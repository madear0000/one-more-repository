/**
 * @typedef Product
 * @property {number} id
 * @property {string} name
 */


const headForStyle = document.getElementsByTagName('head')[0];
const deleteAllProductsButton = document.getElementById("deleteAllProductsButton");  
const productsList = document.getElementById("productsList");  
const inputForAddProducts = document.getElementById("addNew");  
const validationAreaProduct = document.getElementById("validation");
const formToAddProducts = document.getElementById('form-to-add-products');

// let allProducts;

let productList = new Map();
let productIdcounter = 1;

/**
 *
 * @param {Product} product
 * @return {string}
 */
const productTemplate = (product) => `
            <div class="product d-flex rounded mt-3" id=${product.id}>
                <input class="form-check-input" name="bought-products" type="checkbox" value="" data-index=${product.id}>
                <label for="check" class="ms-2 productLabel">${product.name}</label>
                <button type="button" class="btn btn-danger remove-product" id="deleteOneProduct" data-id=${product.id}></button>
            </div>
`.trim()

function rerender() {
    const html = Array.from(productList.values()).map(product => productTemplate(product)).join('\n');

    productsList.innerHTML = html;

    inputForAddProducts.value = "";

     removeOnePointProduct();
}



//to Styles
function addBootstrapScssToHTML() {
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'src/main.scss';
    headForStyle.appendChild(link);
}

function addCssToHTML() {
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'src/style.css';
    headForStyle.appendChild(link);
}

addBootstrapScssToHTML();
addCssToHTML();
//



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
    localStorage.setItem(`product-${product.id}`, JSON.stringify(product));
    rerender();
}

/**
 *
 * @param {string} id
 */
function removeProduct(id) {
    productList.delete(Number(id));
    localStorage.removeItem(`product-${id}`);
    rerender();
}

function removeAllProducts() {
    productList.clear();
    localStorage.clear();
    rerender();
}

function loadProductsFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('product-')) {
        const productString = localStorage.getItem(key);
        const product = JSON.parse(productString);
        addProduct(product);
      }
    }
}

formToAddProducts.addEventListener('submit', (event) => {
    handleAddNewProductButtonClick();
    event.preventDefault();
})

inputForAddProducts.addEventListener('keyup', () => {
    if (inputForAddProducts.value.trim() != "") {
        validationPass();
    }
})

deleteAllProductsButton.addEventListener('click', () => {
    removeAllProducts();
})

window.addEventListener('load', () => {
    loadProductsFromLocalStorage();
});
