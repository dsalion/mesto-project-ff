const del = document.querySelector('.popup.popup_is-opened') 
const openedPopup = document.querySelector('.popup_is-opened');

function openPopup (element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup () {
    del.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc)
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
    closePopup(openedPopup);
  }
};

 export {openPopup, closePopup, closePopupByOverley}; 



