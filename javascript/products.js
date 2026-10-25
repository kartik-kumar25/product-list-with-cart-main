import products from "../data.json" with { type: "json" };
import { cartSummary } from "./cart.js";
import { multiplyProduct,removeItemFromCart } from "./other.js";
console.log(products);

console.log(products[0].image.desktop);
let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container js-product-container" data-dessert-id="${product.id}">
            <img class="dessert-img" src="${product.image.desktop}" alt="${product.category} image">
            <div class="add-to-cart-button js-add-to-cart-button" data-dessert-id="${product.id}">
                <img src="assets/images/icon-add-to-cart.svg" alt="">
                <h3>Add to Cart</h3>
            </div>
            <div class="active-add-to-cart-button js-active-${product.id}">
                <img class="decrease-class js-decrease-qty js-decrease-qty-${product.id}" data-dessert-id="${product.id}" src="assets/images/icon-decrement-quantity.svg" alt="icon-decrement-quantity"> 
                <div class="qty js-qty js-qty-${product.id}">1</div>
                <img class="increase-qty js-increase-qty js-increase-qty-${product.id}" data-dessert-id="${product.id}" src="assets/images/icon-increment-quantity.svg" alt="icon-increment-quantity">
            </div>
            <div class="category">${product.category}</div>
            <div class="dessert-name">${product.name}</div>
            <div class="dessert-price">$${(product.price).toFixed(2)}</div>
        </div>
    `;
});

document.querySelector('.js-product-grid')
    .innerHTML = productsHTML;

const productGrid = document.querySelector('.js-product-grid');

function activeAddToCartButton(dessertId, productContainer){
    productContainer.classList.add('product-added');
}


//GET DESSERT ID FROM THIS BELOW Fn
document.querySelectorAll(`.js-add-to-cart-button`)
    .forEach((button) => {
        button.addEventListener('click', () => {
            const dessertId = Number(button.dataset.dessertId);
            const productContainer = button.closest('.js-product-container');

            activeAddToCartButton(dessertId, productContainer);
            cartSummary(dessertId);
            multiplyProduct(dessertId);
            removeItem();
        });
    });

function increasingElementProcess(){
    document.querySelectorAll('.js-increase-qty')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const dessertId = Number(button.dataset.dessertId);

                let qtyElement = document.querySelector(`.js-qty-${dessertId}`);
                let qty = Number(qtyElement.innerHTML);
                let incrementQtyElement = document.querySelector(`.js-qty-${dessertId}`)
                let incrementQty = Number(incrementQtyElement.innerHTML) + 1;
                qty++;

                qtyElement.innerHTML = qty;

                document.querySelector(`.js-cart-item-quantity-${dessertId}`)
                    .innerHTML = `${Number(incrementQty)}x`;

                multiplyProduct(dessertId);
            })
        });
};
function decreasingElementProcess(){
    document.querySelectorAll('.js-decrease-qty')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const dessertId = Number(button.dataset.dessertId);

                let qtyElement = document.querySelector(`.js-qty-${dessertId}`);
                let qty = Number(qtyElement.innerHTML);

                if(qty <= 1){
                    alert("Quantity should be above 0");
                } else{
                    qty--;

                    qtyElement.innerHTML = qty;

                    let decreaseQtyElement = document.querySelector(`.js-qty-${dessertId}`)
                    let decreaseQty = Number(decreaseQtyElement.innerHTML);
                    document.querySelector(`.js-cart-item-quantity-${dessertId}`)
                    .innerHTML = `${Number(decreaseQty)}x`;

                    multiplyProduct(dessertId);
                }
            })
        })
}

function removeItem(){
    document.querySelectorAll('.js-remove-icon')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const cartItem = button.closest('.dessert-in-cart');
                const dessertId = button.dataset.dessertId;
                const productCard = document.querySelector(`.js-product-container[data-dessert-id="${dessertId}"]`);

                if (cartItem) {
                    cartItem.remove();
                }

                if (productCard) {
                    productCard.classList.remove('product-added');
                    document.querySelector(`.js-qty-${dessertId}`).innerHTML = 1;
                }

                removeItemFromCart();
            });
    });
}

increasingElementProcess();
decreasingElementProcess();