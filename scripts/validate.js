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
function setEventListeners (formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
        checkInputValidity (formEl, inputEl, options);
        toggleButtonState(formEl, inputEls, options);
          });
        });
      }
// disabled / enabled button
function toggleButtonState(formEl, inputEls, options) {
    console.log(formEl, inputEls, options);
    const button = formEl.querySelector(".modal__button");
    const hasValidInput = inputEls.every((inputEl) =>
      checkInputValidity(formEl, inputEl, options.inactiveButtonClass)
    );
    if (hasValidInput) {
      button.classList.remove(options.inactiveButtonClass);
    } else {
      button.classList.add(options.inactiveButtonClass);
    }
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