import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import formatDateString from "./utils/date.js";
import formatCurrency from "./utils/money.js";

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
        ${productsListHTML(order.products)} 
      </div>
    </div>
  `
  })

  function productsListHTML(orderItems){

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
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=123&productId=456">
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
}