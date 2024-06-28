import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import formatDateString from "./utils/date.js";
import formatCurrency from "./utils/money.js";
import { addToCart, updateCartQuantity} from "../data/cart.js";

renderOrdersGrid();

async function renderOrdersGrid(){

  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDate = formatDateString(order.orderTime);
    const totalCost = formatCurrency(order.totalCostCents);
    ordersHTML += `
     <div class="order-container">
      
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${totalCost}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">  
        ${productsListHTML(order)} 
      </div>
    </div>
  `
  })

  function productsListHTML(order){

    const orderItems = order.products;

    let productsListHTML = '';

    orderItems.forEach((orderItem) => {
      const deliveryDate = formatDateString(orderItem.estimatedDeliveryTime);
      const product = getProduct(orderItem.productId);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${orderItem.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${product.id}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>      
      `
    })

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      button.innerHTML = '&#10003; Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `
      }, 1000);
      
    });
  });
}