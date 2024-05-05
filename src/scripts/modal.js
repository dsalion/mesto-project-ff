function openPopup (element) {
    element.classList.add('popup_is-opened');

    };

function closePopup () {
    const del = document.querySelector('.popup') 
    del.classList.remove('popup_is-opened');
    
} 

 export {openPopup, closePopup}; 



