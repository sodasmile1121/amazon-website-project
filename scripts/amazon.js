import { addToCart, getCartQuantity } from '../data/cart.js'
import { products, loadProductsFetch } from '../data/products.js';

renderProductsGrid();

async function renderProductsGrid(){

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const searchItem = url.searchParams.get('search');

  let filterProducts = products;
  if (searchItem){
    filterProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchItem.toLowerCase()) 
        || product.keywords.some(keyword => keyword.toLowerCase().includes(searchItem.toLowerCase()));
    })
  }

  let productsHTML = '';

  if (filterProducts.length === 0){
    productsHTML += `
      <div class="empty-result-message">No products matched your search.</div>
    `
  }
  else{
    filterProducts.forEach((product) => {
      productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          ${product.getPrice()}
        </div>
  
        <div class="product-quantity-container">
          <select class="js-quantity-select-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
  
        ${product.extraInfoHTML()}
        
        <div class="product-spacer"></div>
  
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>  
    `;
    }
  )};

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const addTimes = document.querySelector(`.js-quantity-select-${productId}`).value;
      for (let i=0; i<addTimes; i++){
        addToCart(productId);
      }
      document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();

      document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 1;
      setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 0;
      }, 1000);
    })
  })

  function handleSearhch(){
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
  }

  document.querySelector('.js-search-button').addEventListener('click', handleSearhch);
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
      handleSearhch();
    }
  })

  document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();
}


