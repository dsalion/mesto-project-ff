import "../pages/index.css";
import { createCard, removeHandler, likeCard, del, openedPopup} from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, closePopupByOverley } from "./modal.js";
import {isValid} from "./validation.js"

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector(".popup_type_image");
const formElement = document.querySelector('.popup_type_edit');
const formElementAddCard = document.querySelector('.popup_type_new-card'); 
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const inputTypeName = document.querySelector('.popup__input_type_name');
const inputTypeJob = document.querySelector('.popup__input_type_description');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');

const closeBtns = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");



// закрытие попапа крестиком
closeBtns.forEach((el) => el.addEventListener("click", closePopup));

// закрытие попапа кликом на оверлей
popups.forEach(closePopupByOverley);   

// функция добавления карточки
function openAddCard() {
  openPopup(popupAdd);
}

// функция редактирования профиля
function openEditProfile() {
   openPopup(editProfile);
   inputTypeName.value = nameInput.textContent;
   inputTypeJob.value = jobInput.textContent;
}

buttonAddCard.addEventListener("click", openAddCard);
editProfileButton.addEventListener("click", openEditProfile);

// @todo: Вывести карточки на страницу:
initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeHandler, likeCard, openImg));
});


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    nameInput.textContent = inputTypeName.value 
    jobInput.textContent =  inputTypeJob.value 
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 

function handleFormSubmitCard(evt) {
    evt.preventDefault(); 
    const item = {
      name: inputCardName.value,
      link: inputCardLink.value
    }
    placesList.prepend(createCard(item, removeHandler, likeCard, openImg));
    evt.target.reset();
    closePopup();
}

formElementAddCard.addEventListener('submit', handleFormSubmitCard); 

function openImg (imgSrc, imgAlt) {
  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt; 
  openPopup(popupTypeImage);
}


