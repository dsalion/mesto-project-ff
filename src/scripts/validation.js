const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');



// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
    element.classList.add('popup__input_type_error')
    console.log(formInput.id)
}
// Функция удаляющая класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove('popup_input_type_error')
}

// Функция проверяющая валидность поля

export const isValid = () => {
    if (!formInput.validity.valid) {
        showInputError(formInput);
    } else {
        hideInputError(formInput)
    }  
}

