let language = 'en';
let cart = {};

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";
  for (const drink in DRINKS) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="drinks"><img src="${DRINKS[drink].img}" class="drink-img">
      <p>${DRINKS[drink].name}</p><p>$${(DRINKS[drink].price).toFixed(2)}</p>
      <button id="${drink}" onClick="addDrinkClicked(this.id)">Add</button></div>`;
    parent.appendChild(child);
  }
}

function ramenClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = '';
  let form = document.createElement('form');
  parent.appendChild(form);
  for (const ramen in RAMEN) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="ramen-radio"><input type="radio" id="${ramen}" name="ramen" value="${ramen}"
      onclick="ramenRadioClicked(this.id)" checked>
      <label for="${ramen}"><p>${RAMEN[ramen].name}</p><p>$${(RAMEN[ramen].price).toFixed(2)}</p></label></div>`;
    form.appendChild(child);
  }
  for (const topping in TOPPINGS) {
    let child = document.createElement('div');
    child.innerHTML = `<input type="checkbox" id="${topping}" name="topping">
      <label for="${topping}">${TOPPINGS[topping].name}</label>`;
    form.appendChild(child);
  }
  let submit = document.createElement('div');
  submit.innerHTML = '<button id="ramen-submit" onclick="ramenSubmitClicked()">Submit</button>'
  parent.appendChild(submit);
}

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

function cartClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML = '';
  for (const item in cart) {
    let child = document.createElement('div');
    child.innerHTML = `<div class="cart"><img src="${cart[item].img}" class="cart-img">
      <p>${cart[item].name}</p><p>x${cart[item].amount}</p>
      <p>$${(cart[item].price * cart[item].amount).toFixed(2)}</p></div>`
    parent.appendChild(child);

    if (RAMEN.hasOwnProperty(item)) {
      let grandchild = document.createElement('div');
      for (index = 1; true; index += 1) {
        if (!cart[item].hasOwnProperty(String(index))) {
          break;
        } else {
          let arr = cart[item][String(index)];
          for (let i = 0; i < arr.length; i++) {
            grandchild.innerHTML += `<div class="cart-ramen-topping">${TOPPINGS[arr[i]].name}</div>`;
          }
          child.appendChild(grandchild);
        }
      }
    }
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

function ramenRadioClicked(radioID) {

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

function getTotalPrice() {
  let price = 0;
  for (const item in cart) {
    if (DRINKS.hasOwnProperty(item)) {
      price += DRINKS[item].price;
    }
  }
}

