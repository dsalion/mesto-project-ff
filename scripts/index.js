// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки: клонировать шаблон, установить значение элементов, добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
function createCard(card, removeHandler) {
   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   cardImage.src = card.link;
   cardImage.alt = card.name;
   cardTitle.textContent = card.name;
   const removeButton = cardElement.querySelector('.card__delete-button');
   removeButton.addEventListener('click', () => removeHandler(cardElement)); 
   return cardElement;
 };
// @todo: Функция удаления карточки
function removeHandler (cardElement) {
cardElement.remove();
};
// @todo: Вывести карточки на страницу: 
initialCards.forEach(function(item) { placesList.append(createCard(item,removeHandler));
});