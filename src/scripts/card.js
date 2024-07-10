
import { deleteCard, likeCardSend, likeCardDel } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;





// @todo: Функция создания карточки: клонировать шаблон, установить значение элементов, добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
/*export function createCard(card, removeHandler, likeCard, openImg) {
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

    const imageCard = cardElement.querySelector(".card__image");
    imageCard.addEventListener('click', () => openImg(cardImage.src, cardImage.alt))

    return cardElement;

    
  };
 */
  
   
  export function createCard(options) {
    //debugger
    const { card, deleteCallback, likeCard, openImg, currentUserId } = options;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-count');
    

  
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
  
    
    cardElement.dataset.cardId = card._id;
    cardElement.dataset.ownerId = card.owner._id;
  
    // Обработка кнопки удаления
    if (card.owner._id === currentUserId) {
      removeButton.addEventListener('click', () => removeHandler(cardElement,card._id));
      
    } else {
      removeButton.style.display = 'none';
    }
  
    // Обработка лайков
    function updateLikes(likes) {
      likeCounter.textContent = likes.length;
      const isLiked = likes.some(like => like._id === currentUserId);
      likeButton.classList.toggle('card__like-button_is-active',isLiked);
    }
  
    updateLikes(card.likes);
  
    likeButton.addEventListener('click', () => likeCard(cardElement,card._id), console.log(card._id));
    
    // Обработка клика по изображению
    cardImage.addEventListener('click', () => openImg(cardImage.src, cardImage.alt));
  
    return cardElement;
  }
  
  
 // @todo: Функция удаления карточки
export function removeHandler (cardElement,cardId) {
  cardElement.remove();
  deleteCard(cardId);
 }; 


//Функция лайка карточки
export function likeCard (cardElement, cardId) {
  const likeCounter = cardElement.querySelector('.card__like-count')
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.classList.toggle('card__like-button_is-active');
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    likeCardSend(cardId)
      .then((newlikes) =>  
      likeCounter.textContent = newlikes.likes.length
    )
  } else {likeCardDel(cardId)
    .then((newlikes) =>  
      likeCounter.textContent = newlikes.likes.length)
  }
   
} 



