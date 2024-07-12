import "../pages/index.css";
import {
  createCard,
  removeHandler,
  likeCard,
  del,
  openedPopup,
} from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, closePopupByOverley } from "./modal.js";
import { isValid, enableValidation, clearValidation } from "./validation.js";
import {
  getUserData,
  getInitialCards,
  cfg,
  loadNewDataProfile,
  loadNewAvatar,
  loadNewCard,
  deleteCard,
} from "./api.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");
const inputTypeName = document.querySelector(".popup__input_type_name");
const inputTypeJob = document.querySelector(".popup__input_type_description");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");
const avatarImage = document.querySelector(".profile__image");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const profileAvatarBtn = document.querySelector(".profile__load-button");
const popupAvatar = document.querySelector(".popup_type_avatar");
const closeBtns = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const formTypePlace = document.querySelector(".popup_form_type_place");
const formTypeAvatar = document.querySelector(".popup_form_type_avatar");
const formTypeProfile = document.querySelector(".popup_form_type_profile");

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// закрытие попапа крестиком
closeBtns.forEach((el) => {
  el.addEventListener("click", () => {
    const popup = el.closest(".popup");
    closePopup(popup);
  });
});

// закрытие попапа кликом на оверлей
popups.forEach(closePopupByOverley);

// функция добавления карточки
function openAddCard() {
  openPopup(popupAdd);
  formTypePlace.reset();
  clearValidation(formTypePlace, formConfig);
}

function openModalNewAvatar() {
  openPopup(popupAvatar);
  formTypeAvatar.reset();
  clearValidation(formTypeAvatar, formConfig);
}

// функция редактирования профиля
function openEditProfile() {
  clearValidation(formTypeProfile, formConfig);
  openPopup(editProfile);
  inputTypeName.value = nameInput.textContent;
  inputTypeJob.value = jobInput.textContent;
}

buttonAddCard.addEventListener("click", () => {
  changingButtonStatus(formTypePlace, false);
  openAddCard();
});
editProfileButton.addEventListener("click", () => {
  changingButtonStatus(formTypeProfile, false);
  openEditProfile();
});
profileAvatarBtn.addEventListener("click", () => {
  changingButtonStatus(formTypeAvatar, false);
  openModalNewAvatar();
});

// @todo: Вывести карточки на страницу:
/*initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeHandler, likeCard, openImg));
});*/

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  changingButtonStatus(formTypeProfile, true);
  nameInput.textContent = inputTypeName.value;
  jobInput.textContent = inputTypeJob.value;
  const data = { name: inputTypeName.value, about: inputTypeJob.value };
  loadNewDataProfile(data)
    .then((newData) => {
      nameInput.textContent = newData.name;
      jobInput.textContent = newData.about;
      changingButtonStatus(formTypeProfile, false);
      closePopup(popupProfile);
    })
    .catch((error) => console.log("Ошибка при обновлении профиля:", error));
}

formTypeProfile.addEventListener("submit", handleFormProfileSubmit);
//добавление карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  changingButtonStatus(formTypePlace, true);
  const data = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  loadNewCard(data)
    .then((newData) => {
      changingButtonStatus(formTypePlace, false);
      const cardOptions = {
        card: newData,
        deleteCallback: removeHandler,
        likeCard: likeCard,
        openImg: openImg,
        currentUserId: newData.owner._id,
      };
      placesList.prepend(createCard(cardOptions));
      closePopup(popupAddCard);
    })
    .catch((error) => console.log("Ошибка при добавлении карточки:", error));
}
//слушатель для кнопки сохранить при добавлении карты
formTypePlace.addEventListener("submit", handleFormSubmitCard);
//функция для загрузки аватара
function handleAvatarLoad(evt) {
  evt.preventDefault();
  changingButtonStatus(formTypeAvatar, true);
  const data = {
    avatar: avatarInput.value,
  };
  loadNewAvatar(data)
    .then((userInfo) => {
      avatarImage.style.backgroundImage = `url("${userInfo.avatar}")`;
      changingButtonStatus(formTypeAvatar, false);
      closePopup(popupAvatar);
    })
    .catch((error) => console.log("Ошибка при обновлении аватарки:", error));
}
//слушатель для загрузки аватара
formTypeAvatar.addEventListener("submit", handleAvatarLoad);

//функция открытия карточки на весь экран
function openImg(imgSrc, imgAlt) {
  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt;
  openPopup(popupTypeImage);
}
//функция загрузки данных с сервера
function loadProfileData(userInfo) {
  avatarImage.style.backgroundImage = `url("${userInfo.avatar}")`;
  nameInput.textContent = userInfo.name;
  jobInput.textContent = userInfo.about;
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getInitialCards(), getUserData()])
    .then(([cards, userInfo]) => {
      console.log(userInfo);

      cards.forEach(function (cardItem) {
        const cardOptions = {
          card: cardItem,
          likeCard: likeCard,
          openImg: openImg,
          currentUserId: userInfo._id,
          likes: cardItem.likes,
        };

        placesList.append(createCard(cardOptions));
      });

      loadProfileData(userInfo);
      //debugger;
    })

    .catch((error) => {
      console.log(error);
    });
});

//включение валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

function changingButtonStatus(form, load) {
  const button = form.querySelector(".button");
  const textWhileSaving = "Сохранение...";
  const mainText = "Сохранить";
  button.textContent = load ? textWhileSaving : mainText;
}
