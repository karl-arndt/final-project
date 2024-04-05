function populateText(language = 'en') {
  document.querySelector('.name').innerHTML = TEXT[language].name;
  document.querySelector('#order').innerHTML = TEXT [language].order;
}

function orderNowClicked() {
  location.href = 'html/menu.html';
}

// populateText();
