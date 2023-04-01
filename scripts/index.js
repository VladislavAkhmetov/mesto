let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__button-edit');
let closePopupButton = document.querySelector('.popup__button-close');
let titleInput = document.querySelector('.popup__text-input_type_title');
let subtitleInput = document.querySelector('.popup__text-input_type_subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formSave = document.querySelector('.popup__form');

function popupOpen() {
    popup.classList.add('active');
    titleInput.value = profileTitle.textContent;
    subtitleInput.value = profileSubtitle.textContent;
};
openPopupButton.addEventListener('click', popupOpen);

function popupClose() {
    popup.classList.remove('active');
};
closePopupButton.addEventListener('click', popupClose);

function formSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileSubtitle.textContent = subtitleInput.value;
    popupClose();
};

formSave.addEventListener('submit', formSubmit);