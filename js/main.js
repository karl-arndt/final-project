let language = 'en';

function drinksClicked() {
  let parent = document.querySelector('#content');
  parent.innerHTML ="";

  let child = document.createElement('div');
  child.class = 'drink';
  child.innerHTML = `<img src="${drinks.coke.img}"><p>${drinks.coke.name}</p>
    <p>$${Number(drinks.coke.price).toFixed(2)}</p>`;
  parent.appendChild(child);
}
