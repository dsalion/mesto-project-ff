import {clearValidation } from "./validation"
function openPopup (element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup () {
    const del = document.querySelector('.popup.popup_is-opened'); 
    del.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc)
    
    clearValidation ()
    
};

function closePopupByOverley (el) {
    el.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup_is-opened")) {
          closePopup();
        }
      })
};

function closeByEsc (e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

 export {openPopup, closePopup, closePopupByOverley}; 



