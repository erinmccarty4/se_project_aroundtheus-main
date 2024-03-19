// enabling validation by calling enableValidation()
// pass all the settings on call

//error class for edit modal
function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  //  hide the error message
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.remove(errorClass);
  }
  

function checkInputValidity(formEl, inputEl, options) {
if(!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
} 
hideInputError(formEl, inputEl, options);
}


  function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  //disable
  function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
  
  function setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => { 
       formEl.addEventListener("submit", (e) => {
        e.preventDefault();
       });

       setEventListeners(formEl, options);
    //    look for inputs inside forms
    // loop thru all inputs to see if all valid
    // if input not valid
    // grab validation message
    // add error class to input
    // display error message
    // enable button
    // reset error message
    });
};

const config =   { formSelector: ".modal__form",
inputSelector: ".modal__input",
submitButtonSelector: ".modal__button",
inactiveButtonClass: "modal__button_disabled",
inputErrorClass: "modal__input_type_error",
errorClass: "modal__error_visible"
};

enableValidation(config);