let language = 'en';

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";

  for (const drink in drinks) {
    let child = document.createElement('div');
    child.class = 'drink';
    child.innerHTML = `<div class="drinks"><img src="${drinks[drink].img}" class="drink-img"><p>${drinks[drink].name}</p>
      <p>$${Number(drinks[drink].price).toFixed(2)}</p><button>Add</button></div>`;
    parent.appendChild(child);
  }
}
