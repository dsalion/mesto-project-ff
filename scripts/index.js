// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки: клонировать шаблон, установить значение элементов, добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
function createCard(card, removeHandler) {
   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__image').alt = card.alt;
   cardElement.querySelector('.card__title').textContent = card.name;
   cardElement.setAttribute('id', card.id);
   const removeButton = cardElement.querySelector('.card__delete-button');
   removeButton.addEventListener('click', removeHandler);
   removeButton.dataset.id= card.id; 
   return cardElement;
 };
// @todo: Функция удаления карточки
function removeHandler (event) {
const getId = event.target.getAttribute('data-id');
document.getElementById(getId).remove();
};
// @todo: Вывести карточки на страницу: 
initialCards.forEach(function(item) { placesList.append(createCard(item,removeHandler));
});