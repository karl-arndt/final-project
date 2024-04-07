let language = 'en';
let cart = {};

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";
  for (const drink in DRINKS) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="drinks"><img src="${DRINKS[drink].img}" class="drink-img">
      <p>${DRINKS[drink].name}</p><p>$${Number(DRINKS[drink].price).toFixed(2)}</p>
      <button id="${drink}" onClick="addDrinkClicked(this.id)">Add</button></div>`;
    parent.appendChild(child);
  }
}

function sidesClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";
  for (const side in SIDES) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="sides"><img src="${SIDES[side].img}" class="sides-img">
      <p>${SIDES[side].name}</p><p>$${Number(SIDES[side].price).toFixed(2)}</p>
      <button id="${side}" onClick="addSideClicked(this.id)">Add</button></div>`;
    parent.appendChild(child);
  }
}

function cartClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ='';
  for (const item in cart) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="cart"><img src="${cart[item].img}" class="cart-img"><p>${cart[item].name}</p><p>x${cart[item].amount}</p>
    <p>$${(Number(cart[item].price) * Number(cart[item].amount)).toFixed(2)}</p></div>`
    parent.appendChild(child);
  }
}

function addDrinkClicked(buttonID) {
  if (cart.hasOwnProperty(buttonID)) {
    let amount = Number(cart[buttonID].amount);
    amount += 1;
    cart[buttonID].amount = amount;
  } else {
    cart[buttonID] = {};
    cart[buttonID].img = DRINKS[buttonID].img;
    cart[buttonID].name = DRINKS[buttonID].name;
    cart[buttonID].price = DRINKS[buttonID].price;
    cart[buttonID].amount = 1;
  }
}

function addSideClicked(buttonID) {
  if (cart.hasOwnProperty(buttonID)) {
    let amount = Number(cart[buttonID].amount);
    amount += 1;
    cart[buttonID].amount = amount;
  } else {
    cart[buttonID] = {};
    cart[buttonID].img = SIDES[buttonID].img;
    cart[buttonID].name = SIDES[buttonID].name;
    cart[buttonID].price = SIDES[buttonID].price;
    cart[buttonID].amount = 1;
  }
}


