function openPopup (element) {
    element.classList.add('popup_is-opened');

    };

function closePopup (element) {
    element.classList.remove('.popup_is-opened');
}
    

export {openPopup, closePopup};
