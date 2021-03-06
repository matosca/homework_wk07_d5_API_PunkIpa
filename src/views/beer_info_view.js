const PubSub = require('../helpers/pub_sub.js');

const BeerInfoView = function (container) {
  this.container = container;
};

BeerInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:selected-beer-ready', (event) => {
    const beerDetails = event.detail;
    this.render(beerDetails);
  });
};

BeerInfoView.prototype.render = function (beer) {
  this.container.innerHTML = '';

  const beerName = this.createElement('h2', `${beer.name} |  alc. ${beer.abv}%`);
  this.container.appendChild(beerName);

  const beerImage = this.createElement('img', beer.image_url);
  beerImage.src = beer.image_url;
  beerImage.classList.add('beer-img');
  this.container.appendChild(beerImage);

  const tagline = this.createElement('h3', beer.tagline);
  this.container.appendChild(tagline);

  const descriptionTitle = this.createElement('h4', 'Description ');
  this.container.appendChild(descriptionTitle);

  const beerDescription = this.createElement('p', beer.description);
  this.container.appendChild(beerDescription);

  const foodTitle = this.createElement('h4', 'Food paring ');
  this.container.appendChild(foodTitle);

  const foodList = this.createMealsList(beer.food_pairing);
  this.container.appendChild(foodList);

};

BeerInfoView.prototype.createMealsList = function (meals) {
  const mealsList = document.createElement('ul');
  mealsList.classList.add('food-pairing');

  meals.forEach( (meal) => {
    const listItem = document.createElement('li');
    listItem.textContent = meal;
    mealsList.appendChild(listItem);
  });

  return mealsList;

};

BeerInfoView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = BeerInfoView;
