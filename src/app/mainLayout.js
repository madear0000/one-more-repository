function mainLayoutBody() { 
    return `<div class="container">
    <h1 class="text-light mt-5 ">Список покупок</h1>
    <form action="submit" id="form-to-add-products">
        <div class="form-add d-flex">
            <input type="text" placeholder="Название продукта" id="addNew" class="rounded border border-2">
            <div class="quantity position-absolute border border-2 rounded-end d-flex">
                <p id="quantityForUser" class="quntity_text position-absolute">1</p>
                <div class="quantity_button d-flex flex-column">
                    <button id="quantityUp" type="button" class="button_for_quantiy border border-2 up"><i class="fa-solid fa-caret-up"></i></button>
                    <button id="quantityDown" type="button" class="button_for_quantiy border border-2 down"><i class="fa-solid fa-caret-down"></i></button>
                </div>
            </div>
        </div>
        
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