let language = 'en';
let cart = {};

// https://stackoverflow.com/questions/5024056/how-to-pass-parameters-on-onchange-of-html-select
function languageChanged(selectObject) {
  language = selectObject.value;
  refreshPropertyNameValues();
  drinksClicked();
}

function refreshPropertyNameValues() {
  for (const item in DRINKS) {
    DRINKS[item].name = TEXT[language][item];
  }
  for (const item in SIDES) {
    SIDES[item].name = TEXT[language][item];
  }
  for (const item in RAMEN) {
    RAMEN[item].name = TEXT[language][item];
  }
  for (const item in TOPPINGS) {
    TOPPINGS[item].name = TEXT[language][item];
  }
}

// DRINKS FUNCTIONS

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = "";
  for (const drink in DRINKS) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="drinks"><img src="${DRINKS[drink].img}" class="drink-img">
      <p>${DRINKS[drink].name}</p><p>$${(DRINKS[drink].price).toFixed(2)}</p>
      <button id="${drink}" onClick="addDrinkClicked(this.id)">Add</button></div>`;
    parent.appendChild(child);
  }
}

function addDrinkClicked(buttonID) {
  if (cart.hasOwnProperty(buttonID)) {
    let count = cart[buttonID].amount;
    count += 1;
    cart[buttonID].amount = count;
  } else {
    cart[buttonID] = {};
    cart[buttonID].img = DRINKS[buttonID].img;
    cart[buttonID].name = DRINKS[buttonID].name;
    cart[buttonID].price = DRINKS[buttonID].price;
    cart[buttonID].amount = 1;
  }
}

// RAMEN FUNCTIONS

function ramenClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = '';
  let ramenImage = document.createElement('div');
  ramenImage.innerHTML = `<img class="ramen-image" src="${RAMEN.chapagetti.img}">`;
  parent.appendChild(ramenImage);
  let form = document.createElement('form');
  parent.appendChild(form);
  for (const ramen in RAMEN) {
    let child = document.createElement('div');
    child.innerHTML = `<span class="ramen-radio"><input type="radio" id="${ramen}" name="ramen" value="${ramen}"
      onClick="ramenRadioClicked(this.id)" checked>
      <label for="${ramen}">${RAMEN[ramen].name} $${(RAMEN[ramen].price).toFixed(2)}</label></span>`;
    form.appendChild(child);
  }
  for (const topping in TOPPINGS) {
    let child = document.createElement('div');
    child.innerHTML = `<input type="checkbox" id="${topping}" name="topping">
      <label for="${topping}">${TOPPINGS[topping].name} $${TOPPINGS[topping].price.toFixed(2)}</label>`;
    form.appendChild(child);
  }
  let submit = document.createElement('div');
  submit.innerHTML = '<button id="ramen-submit" onclick="ramenSubmitClicked()">Submit</button>'
  parent.appendChild(submit);
}

function ramenSubmitClicked() {
  // https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
  let ramenRadio = document.getElementsByName('ramen');
  let newRamen;
  for (let index = 0; index < ramenRadio.length; index += 1) {
    if (ramenRadio[index].checked) {
      newRamen = ramenRadio[index].id;
      if (cart.hasOwnProperty(newRamen)) {
        let count = cart[newRamen].amount;
        count += 1;
        cart[newRamen].amount = count;
        cart[newRamen][count] = setRamenToppings();
      } else {
        cart[newRamen] = {};
        cart[newRamen].img = RAMEN[newRamen].img;
        cart[newRamen].name = RAMEN[newRamen].name;
        cart[newRamen].price = RAMEN[newRamen].price;
        cart[newRamen]["1"] = setRamenToppings();
        cart[newRamen].amount = 1;
      }
    }
  }
}

function setRamenToppings() {
  let toppingsCheckbox = document.getElementsByName('topping');
  let toppings = [];
  for (let index = 0; index < toppingsCheckbox.length; index += 1) {
    if (toppingsCheckbox[index].checked) {
      toppings.push(toppingsCheckbox[index].id);
    }
  }
  return toppings;
}

function ramenRadioClicked(id) {
  let imageDestination = document.querySelector('.ramen-image');
  imageDestination.src = RAMEN[id].img;
}

// SIDES FUNCTIONS

function sidesClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = "";
  for (const side in SIDES) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="sides"><img src="${SIDES[side].img}" class="sides-img">
      <p>${SIDES[side].name}</p><p>$${(SIDES[side].price).toFixed(2)}</p>
      <button id="${side}" onClick="addSideClicked(this.id)">Add</button></div>`;
    parent.appendChild(child);
  }
}

function addSideClicked(buttonID) {
  if (cart.hasOwnProperty(buttonID)) {
    let count = cart[buttonID].amount;
    count += 1;
    cart[buttonID].amount = count;
  } else {
    cart[buttonID] = {};
    cart[buttonID].img = SIDES[buttonID].img;
    cart[buttonID].name = SIDES[buttonID].name;
    cart[buttonID].price = SIDES[buttonID].price;
    cart[buttonID].amount = 1;
  }
}

// CART FUNCTIONS

function cartClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = '';
  for (const item in cart) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="cart"><img src="${cart[item].img}" class="cart-img">
      <p>${cart[item].name}</p><p>x${cart[item].amount}</p>
      <p>$${(cart[item].price * cart[item].amount).toFixed(2)}</p>`;
    if (!(RAMEN.hasOwnProperty(item))) {
      child.innerHTML += `<button id="${item}" onclick="removeClicked(this.id)">Remove</button></div>`;
    }  
    parent.appendChild(child);

    if (RAMEN.hasOwnProperty(item)) {
      let grandchild = document.createElement('div');
      for (let index = 1; true; index += 1) {
        if (!cart[item].hasOwnProperty(String(index))) {
          break;
        } else {
          let arr = cart[item][String(index)];
          for (let i = 0; i < arr.length; i++) {
            grandchild.innerHTML += `<div class="cart-ramen-topping">${TOPPINGS[arr[i]].name} $${TOPPINGS[arr[i]].price.toFixed(2)}</div>`;
          }
          grandchild.innerHTML += `<button id="${index}-${item}" class="remove-ramen" onclick="removeClicked(this.id)">Remove</button>`;
          child.appendChild(grandchild);
        }
      }
    }
  }
   // https://www.freecodecamp.org/news/check-if-an-object-is-empty-in-javascript/
  if (Object.keys(cart).length !== 0) {
    let totalPrice = document.createElement('div');
    totalPrice.innerHTML = `<div id="total-price">Total: $${(getTotalPrice()).toFixed(2)}</div>`;
    parent.appendChild(totalPrice);
    let submitOrder = document.createElement('div');
    submitOrder.innerHTML = `<button id="submit-order-button" onclick="submitOrder()">${TEXT[language].submit_order}</button>`;
    parent.appendChild(submitOrder);
  } else {
    let emptyCart = document.createElement('div');
    emptyCart.innerHTML = `<div id ="empty-cart">${TEXT[language].empty_cart}</div>`;
    parent.appendChild(emptyCart);
  }
}

function removeClicked(id) {
  if (id.includes('-')) {
    // https://stackoverflow.com/questions/573145/get-everything-after-the-dash-in-a-string-in-javascript
    let ramenType = id.substring(id.indexOf('-') + 1);
    id = id.substring(0, id.indexOf('-'));
    delete cart[ramenType][id];
    cart[ramenType].amount -= 1;
    if (cart[ramenType].amount === 0) {
      delete cart[ramenType];
    } else {
      shiftRamenInCart(ramenType, id);
    }
  } else {
    delete cart[id];
  }
  cartClicked();
}

function shiftRamenInCart(ramenType, removedRamenID) {
  removedRamenID = Number(removedRamenID);
  let nextRamen = removedRamenID + 1;
  while(cart[ramenType].hasOwnProperty(nextRamen)) {
    cart[ramenType][(nextRamen - 1)] = cart[ramenType][nextRamen];
    delete cart[ramenType][nextRamen];
    nextRamen += 1;
  }
}

function getTotalPrice() {
  let cost = 0;
  for (const item in cart) {
    if (DRINKS.hasOwnProperty(item)) {
      cost += (DRINKS[item].price * cart[item].amount);
    } else if (SIDES.hasOwnProperty(item)) {
      cost += (SIDES[item].price * cart[item].amount);
    } else if (RAMEN.hasOwnProperty(item)) {
      for (let index = 1; true; index++) {
        if (!cart[item].hasOwnProperty(String(index))) {
          break;
        } else {
          let arr = cart[item][String(index)];
          for (let i = 0; i < arr.length; i++) {
            cost += TOPPINGS[arr[i]].price;
          }
        }
      }
      cost += RAMEN[item].price * cart[item].amount;
    }
  }
  return cost;
}

function submitOrder() {
  let parent = document.querySelector('#content');
  parent.innerHTML = '';
  document.querySelector('#navbar').style.display = "none";

  let submittedText = document.createElement('div');
  submittedText.innerHTML = `<p>${TEXT[language].submitted_text}</p>`;
  parent.appendChild(submittedText);

  for (const item in cart) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="cart"><img src="${cart[item].img}" class="cart-img">
        <p>${cart[item].name}</p><p>x${cart[item].amount}</p>
        <p>$${(cart[item].price * cart[item].amount).toFixed(2)}</p></div>`;
    parent.appendChild(child);

    if (RAMEN.hasOwnProperty(item)) {
      let grandchild = document.createElement('div');
      for (index = 1; true; index += 1) {
        if (!cart[item].hasOwnProperty(String(index))) {
          break;
        } else {
          let arr = cart[item][String(index)];
          for (let i = 0; i < arr.length; i++) {
            grandchild.innerHTML += `<div class="cart-ramen-topping">${TOPPINGS[arr[i]].name} $${TOPPINGS[arr[i]].price.toFixed(2)}</div>`;
          }
          child.appendChild(grandchild);
        }
      }
    }
  }
  let totalPrice = document.createElement('div');
  totalPrice.innerHTML = `<div id="total-price">Total: $${(getTotalPrice()).toFixed(2)}</div>`;
  parent.appendChild(totalPrice);
}
