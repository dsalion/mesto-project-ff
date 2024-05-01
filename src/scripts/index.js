import '../pages/index.css';
import { createCard} from './card.js';
import {initialCards} from './cards.js';
import { openPopup, closePopup } from './modal.js';



// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_edit')
const editProfileButton = document.querySelector('.profile__edit-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

const popupClose = document.querySelector('.popup__close')

// @todo: Функция удаления карточки
function removeHandler (cardElement) {
cardElement.remove();
}; 
// @todo: Вывести карточки на страницу: 
initialCards.forEach(function(item) { placesList.append(createCard(item,removeHandler));
});

// функция добавления карточки
function openAddCard () {
  openPopup(popupAdd); 
}

// функция редактирования профиля
function openEditProfile () {
  openPopup(editProfile);
}





buttonAddCard.addEventListener('click', openAddCard);
editProfileButton.addEventListener('click', openEditProfile);

