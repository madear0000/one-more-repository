function mainLayoutBody() { 
    return `<div class="container">
        <h1 class="text-light mt-5 ">Список покупок</h1>
        <form action="submit" id="form-to-add-products">
            <input type="text" placeholder="Название продукта" id="addNew" class="rounded">
            <p class="text-danger mt-2 validation" id="validation"> &#9746; Пожалуйста введите продукт</p>     
            <div class="buttons d-flex justify-content-between mt-3">
                <button type="submit" class="btn btn-primary top-buttons" id="addNewProductButton">Добавить</button>
                <button type="button" class="btn btn-danger top-buttons" id="deleteAllProductsButton">Удалить все</button>
            </div>
        </form>
        <div class="for-products" id="productsList">
        </div>
    </div>`.trim();
}

export default function mainLayout() {
    const body = document.getElementById('root');
    body.innerHTML = mainLayoutBody();
}