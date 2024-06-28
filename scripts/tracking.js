import { orders, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDateString, dateTimeDiff } from "./utils/date.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

  function calProgressPercent(){
    const orderTime = order.orderTime;
    const deliveryTime = orderItem.estimatedDeliveryTime;
    const currentTime = dayjs();
    // const currentTime = dayjs().add(1, 'day');

    const progressPercent = dateTimeDiff(currentTime, orderTime) / dateTimeDiff(deliveryTime, orderTime);

    return progressPercent;
  }

  const progressPercent = calProgressPercent();
  const progressStatus = 
    (progressPercent >= 1)? 'Delivered'
    : (progressPercent >= 0.5)? 'Shipped'
    : 'Preparing';

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
      <div class="progress-label">
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
  document.querySelector('.progress-bar').style.width = (progressPercent * 100) + '%';
  document.querySelectorAll('.progress-label').forEach((status) => {
    if (status.innerText === progressStatus){
      status.classList.add('current-status');
    }
  })
}
