import "../pages/index.css";
import { createCard, removeHandler, likeCard, openImg} from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, closePopupByOverley } from "./modal.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonAddCard = document.querySelector(".profile__add-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");


// закрытие попапа крестиком
const closeBtns = document.querySelectorAll(".popup__close");
closeBtns.forEach((el) => el.addEventListener("click", closePopup));

// закрытие попапа кликом на оверлей
const popups = document.querySelectorAll(".popup");
popups.forEach(closePopupByOverley);   

// функция добавления карточки
function openAddCard() {
  openPopup(popupAdd);
}

// функция редактирования профиля
function openEditProfile() {
   openPopup(editProfile);
}

buttonAddCard.addEventListener("click", openAddCard);
editProfileButton.addEventListener("click", openEditProfile);

// @todo: Вывести карточки на страницу:
initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeHandler, likeCard, openImg));
});



//  Редактирование имени и информации о себе
const formElement = document.querySelector('.popup_type_edit'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__title')// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__description')// Воспользуйтесь инструментом .querySelector()
const inputTypeName = document.querySelector('.popup__input_type_name')
const inputTypeJob = document.querySelector('.popup__input_type_description')
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameInput.textContent = inputTypeName.value 
    jobInput.textContent =  inputTypeJob.value 
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 




const formElementAddCard = document.querySelector('.popup_type_new-card'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const inputCardName = document.querySelector('.popup__input_type_card-name')
const inputCardLink = document.querySelector('.popup__input_type_url')
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    const item = {
      name: inputCardName.value,
      link: inputCardLink.value
    }
    placesList.prepend(createCard(item, removeHandler, likeCard, openImg));
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAddCard.addEventListener('submit', handleFormSubmitCard); 
