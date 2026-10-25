import products from "../data.json" with { type: "json" };
import { cartSummary } from "./cart.js";

export function getDessert(dessertId){
  let matchingDessert;

  products.forEach((dessert) => {
      if (dessert.id === dessertId){
          matchingDessert = dessert
      }
  });

  return matchingDessert;
};

let quantity = 0;

// export function updateQuantity(){
//     quantity++
    
//     document.querySelector('.js-cart-quantity span').innerHTML = quantity;

//     cartSummary(quantity);

// };

export function multiplyProduct(dessertId){
    const qty = Number(document.querySelector(`.js-qty-${dessertId}`).innerHTML);

    products.forEach((dessert) => {
        if (dessert.id === dessertId) {
            const itemTotal = document.querySelector(`.js-qty-price-${dessert.id}`);
            itemTotal.innerHTML = `$${(qty * dessert.price).toFixed(2)}`;
        }
    });

    let total = 0;
    document.querySelectorAll('.js-qty-price-1, .js-qty-price-2, .js-qty-price-3, .js-qty-price-4, .js-qty-price-5, .js-qty-price-6').forEach((priceBox) => {
        total += Number(priceBox.innerHTML.replace('$', ''));
    });

    document.querySelector('.total-order div').innerHTML = `$${total.toFixed(2)}`;
}

export function removeItemFromCart(){
    let total = 0;
    document.querySelectorAll('.js-qty-price-1, .js-qty-price-2, .js-qty-price-3, .js-qty-price-4, .js-qty-price-5, .js-qty-price-6').forEach((priceBox) => {
        total += Number(priceBox.innerHTML.replace('$', ''));
    });

    document.querySelector('.total-order div').innerHTML = `$${total.toFixed(2)}`;
}