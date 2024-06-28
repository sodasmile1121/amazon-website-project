import { orders, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDateString } from "./utils/date.js";

renderTrackPackage();

async function renderTrackPackage(){

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let orderItem;
  order.products.forEach((product) => {
    if (product.productId === productId){
      orderItem = product;
    }
  })

  let trackPackageHTML = '';

  trackPackageHTML += `
    <div class="delivery-date">
      Arriving on ${formatDateString(orderItem.estimatedDeliveryTime, 'dddd, MMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${orderItem.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.js-render-track-package').innerHTML = trackPackageHTML;
}
