// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;





// @todo: Функция создания карточки: клонировать шаблон, установить значение элементов, добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
export function createCard(card, removeHandler, likeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', () => removeHandler(cardElement)); 

    const cardLikeButton = cardElement.querySelector('.card__like-button')
    cardLikeButton.addEventListener('click', () => likeCard(cardElement)) 
    return cardElement;

    
  };
 // @todo: Функция удаления карточки
 export function removeHandler (cardElement) {
 cardElement.remove();
 }; 

export function likeCard (cardElement) {
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  cardLikeButton.classList.toggle('card__like-button_is-active');
} 