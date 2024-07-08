import "../pages/index.css";
import { createCard, removeHandler, likeCard, del, openedPopup} from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, closePopupByOverley } from "./modal.js";
import {isValid} from "./validation.js"
import { getUserData, getInitialCards, cfg, loadNewDataProfile, loadNewAvatar, loadNewCard, deleteCard } from "./api.js";


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
const avatarImage = document.querySelector('.profile__image')
const avatarInput = document.querySelector('.popup__input_type_avatar')

const profileAvatarBtn = document.querySelector(".profile__load-button")
const popupAvatar = document.querySelector('.popup_type_avatar')

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

function openModalNewAvatar() {
  openPopup(popupAvatar)
}

// функция редактирования профиля
function openEditProfile() {
   openPopup(editProfile);
   inputTypeName.value = nameInput.textContent;
   inputTypeJob.value = jobInput.textContent;
}

buttonAddCard.addEventListener("click", openAddCard);
editProfileButton.addEventListener("click", openEditProfile);
profileAvatarBtn.addEventListener('click', openModalNewAvatar);


// @todo: Вывести карточки на страницу:
/*initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeHandler, likeCard, openImg));
});*/

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    nameInput.textContent = inputTypeName.value 
    jobInput.textContent =  inputTypeJob.value 
    const data = { name: inputTypeName.value,
      about: inputTypeJob.value
    }
    loadNewDataProfile(data)
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 
//ручное добавление карты (не сервер)
function handleFormSubmitCard(evt) {
    evt.preventDefault(); 
    const data = {
      name: inputCardName.value,
      link: inputCardLink.value
    }
    loadNewCard(data)
    placesList.prepend(createCard(data, removeHandler, likeCard, openImg));
    evt.target.reset();
    closePopup();
}
//слушатель для кнопки сохранить при добавлении карты
formElementAddCard.addEventListener('submit', handleFormSubmitCard); 
//функция для загрузки аватара
function handleAvatarLoad(evt) {
  evt.preventDefault();
  const data = {
    avatar: avatarInput.value
  }
  loadNewAvatar(data);
  reloadData()
  closePopup();
  
}
//слушатель для загрузки аватара
popupAvatar.addEventListener('submit',handleAvatarLoad)


//функция открытия карточки на весь экран
function openImg (imgSrc, imgAlt) {
  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt; 
  openPopup(popupTypeImage);
}
//функция загрузки данных с сервера
function loadProfileData (userInfo) {
  avatarImage.style.backgroundImage = `url("${userInfo.avatar}")`;
  nameInput.textContent = userInfo.name
  jobInput.textContent = userInfo.about
}




/*document.addEventListener("DOMContentLoaded", () => {
 Promise.all([getInitialCards(), getUserData()])
  .then(([cards, userInfo]) => {
   // currentUserId = userInfo._id;
    cards.forEach(function (cardItem) {
      const cardOptions = {
        card: item,
        deleteCallback: removeHandler,
        likeCallback: likeCard,
        imageClickCallback: openImg,
        
      };

      placesList.append(createCard(cardOptions));
    });
    updateProfileForm(userInfo);
  })
  .catch((error) => {
    console.log(error);
  });
}); */

let currentUserId;

document.addEventListener("DOMContentLoaded", () => {
 
  Promise.all([getInitialCards(), getUserData()])
    .then(([cards, userInfo]) => {
      console.log(userInfo)
      currentUserId = userInfo._id; // Убедитесь, что эта строка не закомментирована

      cards.forEach(function (cardItem) {
        const cardOptions = {
          card: cardItem,
          deleteCallback: (cardId, cardElement) => {
            // Здесь должна быть логика удаления карточки
            removeHandler(cardId).then(() => {
              cardElement.remove();
            }).catch(error => console.error('Error removing card:', error));
          },
          likeCard: (cardId, updateLikes) => {
            // Здесь должна быть логика лайка/дизлайка
            likeCard(cardId).then(updatedCard => {
              updateLikes(updatedCard.likes);
            }).catch(error => console.error('Error liking card:', error));
          },
          openImg: (src, alt) => {
            openImg(src, alt);
          },
          currentUserId: userInfo._id
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

//функция обновления данных
function reloadData() {
  getUserData()
  .then((userinfo) => {
    loadProfileData(userinfo)
  })
}