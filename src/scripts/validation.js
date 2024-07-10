//const form = document.querySelector('.popup__form');
//const formInput = form.querySelector('.popup__input');
//const formError = form.querySelector(`.${formInput.id}-error`);


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, formConfig) => {
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass  } = formConfig
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(formConfig.inputErrorClass)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass)
    
}
// Функция удаляющая класс с ошибкой
const hideInputError = (formElement, inputElement, formConfig) => {
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass  } = formConfig
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass)
    errorElement.classList.remove(formConfig.errorClass)
    errorElement.textContent ="";
    
}

// Функция проверяющая валидность поля

export const isValid = (formElement, inputElement, formConfig) => {
    //debugger
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass  } = formConfig
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("")
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
        hideInputError(formElement, inputElement, formConfig)
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
            isValid(formElement, inputElement, formConfig)
        })
    })
} 


//Добавим обработчики формам

export const enableValidation = (formConfig) => {
 const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass  } = formConfig
 const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement,{formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
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

