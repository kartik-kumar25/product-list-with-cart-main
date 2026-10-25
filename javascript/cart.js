import products from "../data.json" with { type: "json" };
import { getDessert } from "./other.js";

// if(!cart){
//     cart = [{
//         dessertId: 1,
//         quantity: 4,
//     },{
//         dessertId: 3,
//         quantity: 2,
//     }]
// }


export function cartSummary(dessertId){
    let cartSummaryHTML = '';
    let cartPaymentSummaryHTML = ''
    const dessert = getDessert(dessertId);

    cartSummaryHTML +=  `
        <div class="dessert-in-cart dessert-id-${dessert.id}">
            <div class="left-side">
                <h4 class="dessert-item-name js-dessert-item-name-${dessertId}">${dessert.name}</h4>
                <div class="other">
                    <h5 class="cart-item-quantity js-cart-item-quantity-${dessertId}">1x</h5>
                    <div class="price">
                    @$${(dessert.price).toFixed(2)}  <span class="js-qty-price-${dessert.id}">$${(dessert.price).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <img class="remove-icon js-remove-icon js-remove-icon-${dessert.id}" data-dessert-id="${dessert.id}" src="assets/images/icon-remove-item.svg" alt="icon-remove-item">
        </div>
        `

    cartPaymentSummaryHTML += `
        <h5>Order Total</h5>
        <div>$0.00</div>
    `

        document.querySelector('.js-cart-qty-final').innerHTML += cartSummaryHTML;

};
