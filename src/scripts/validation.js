const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`);


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible')
    
}
// Функция удаляющая класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__error_visible')
    errorElement.textContent ="";
    
}

// Функция проверяющая валидность поля

export const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("")
    }

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
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement,addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement)
            isValid(formElement, inputElement)
        })
    })
} 


//Добавим обработчики формам

export const enableValidation = (formConfig) => {
 //   const formList = Array.from(document.querySelectorAll('.popup__form'));
 const { formSelector, inputSelector, submitButtonSelector} = formConfig
 const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement,{inputSelector, submitButtonSelector});
    })
}



function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState (inputList, buttonElement)  {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive')
    } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive')
    }
}

export function clearValidation () {
    const errorElements = document.querySelectorAll('.form__input-error')
    errorElements.forEach(element => {
        element.textContent = '';
        
    })
    
    const inputElements = document.querySelectorAll('.popup__input_type_error')
    inputElements.forEach(element => { 
        element.classList.remove('popup__input_type_error')
    })
}

