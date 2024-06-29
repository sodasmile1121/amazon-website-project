export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart){
    cart = [];
  }
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })

  if (matchingItem){
    matchingItem.quantity++;
  }
  else{
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    })      
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToStorage(); 
}

export function resetCart(){
  cart = [];
  saveToStorage();
}

export function getCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}