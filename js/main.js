let language = 'en';

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";

  let child = document.createElement('div');
  child.class = 'drink';
  child.innerHTML = `<p>${items.drinks.coke.price}</p>`;
  parent.appendChild(child);
}
