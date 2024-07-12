
function openPopup (element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup (element) {
    //const del = document.querySelector('popup_is-opened'); 
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc)
    
   
 };

function closePopupByOverley (el) {
    el.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup_is-opened")) {
          closePopup(el);
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



