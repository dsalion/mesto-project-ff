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

const setEventListeners = (formElement, formConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.submitButtonSelector)

    inputList.forEach((inputElement) => {
        inputElement,addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

//Добавим обработчики формам

const enableValidation = (formConfig) => {
 //   const formList = Array.from(document.querySelectorAll('.popup__form'));
 const { formSelector, inputSelector, submitButtonSelector} = formConfig
 const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement,{inputSelector, submitButtonSelector});
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
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


