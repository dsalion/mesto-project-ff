const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`);


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active')
    
}
// Функция удаляющая класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__input-error_active')
    errorElement.textContent ="";
    console.log('srabotalo')
}

// Функция проверяющая валидность поля

export const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement)
    }  
}

//добавляем слушатель всем полям ввода

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement,addEventListener('input', () => {
            isValid(formElement, inputElement)
        })
    })
}

//Добавим обработчики формам

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    })
}

enableValidation();
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive')
    } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive')
    }
}


