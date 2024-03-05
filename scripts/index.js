const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    }, 
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    }, 
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    }, 
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    }, 
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
    ]; 

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */ 
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeEditButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input"); 
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");


const addNewCardButton = document.querySelector(".profile__add-button"); 
const profileAddCardModal = document.querySelector("#profile-add-modal");
const addCardModalCloseButton = profileAddCardModal.querySelector(".modal__close");
const ModalCardTitleInput = document.querySelector("#add-card-title-input");
const ModalCardURLInput = document.querySelector("#add-card-url-input");

const addCardForm = profileAddCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelectorAll(".cards__list");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalClose = previewImageModal.querySelector(".modal__close");


 /* -------------------------------------------------------------------------- */
/*                                  Functions                                  */
/* -------------------------------------------------------------------------- */

function closePopup(modal) {
    modal.classList.remove("modal_opened");
}

function openModal (modal) {
    modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true); 
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const previewImageEl = document.querySelector(".card__preview-image");
    const previewNameEl = document.querySelector(".modal__preview-name");

    
    cardImageEl.setAttribute("src", cardData.link);
    cardImageEl.setAttribute("alt", cardData.name);
    // cardImage.src = data.link; 
    // cardImage.alt = data.name; 
    
    cardTitleEl.textContent = cardData.name;


    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
      });

    const deleteButton = cardElement.querySelector(".card__delete-button");
      deleteButton.addEventListener("click", () => {
        cardElement.remove();
      });
    
      cardImageEl.addEventListener("click", () => {
        openModal(previewImageModal);
        previewNameEl.textContent = cardData.name;
        previewImageEl.alt = cardData.name;
        previewImageEl.src = cardData.link;
      });
    
    // previewModalClose.addEventListener("click", () => closePopup(previewImageModal));


    return cardElement; 
    }

    function renderCard(cardData, wrapper) {
        const cardElement = getCardElement(cardData);
        wrapper.prepend(cardElement);
      }
/* -------------------------------------------------------------------------- */
/*                                  Event Handlers                        */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
};

function handleAddCardFormSubmit (evt) {
    evt.preventDefault(); 
    const name=ModalCardTitleInput.value;
    const link=ModalCardURLInput.value;
    renderCard({name, link}, cardListEl);
    closePopup(profileAddCardModal);
};


/* -------------------------------------------------------------------------- */
/*                                  Event Listeners                           */
/* -------------------------------------------------------------------------- */


profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened"); 
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
closeEditButton.addEventListener("click", () => closePopup (profileEditModal));


addNewCardButton.addEventListener("click", () => {
    profileAddCardModal.classList.add("modal_opened"); 
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addCardModalCloseButton.addEventListener("click", () => closePopup (profileAddCardModal));

// find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  // find the closest popup 
  const popup = button.closest(".modal__close");
  // set the listener
  button.addEventListener('click', () => closePopup(popup));
});

/* -------------------------------------------------------------------------- */
/*                                 Initializer                                */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));