const editProfileButton = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля
const addCardButton = document.querySelector('.profile__button-add'); //кнопка создания новой карточки
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const elementsCards = document.querySelector('.elements__cards'); //список карточек
const cardTemplate = document.querySelector('.card-template'); // шаблон карточки

const popupEditProfile = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const titleInput = popupEditProfile.querySelector('.popup__text-input_type_title'); //поле ввода в профиле
const subtitleInput = popupEditProfile.querySelector('.popup__text-input_type_subtitle'); //поле ввода в профиле
const popupAddCard = document.querySelector('.popup_type_add'); //попап добавления новой карточки
const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name'); //инпут названия новой карточки
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_card-link'); //инпут ссылки для обложки новой карточки
const formSave = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card'); //форма добавления новой карточки
const closePopupProfileButton = document.querySelector('.popup__close-button_profile'); //кнопка закрытия
const closePopupAddCardButton = document.querySelector('.popup__close-button_card'); //кнопка закрытия попапа добавления карточки
const closeLargeImageButton = document.querySelector('.popup__close_large-image'); //увеличение изображения
const popupLargeImage = document.querySelector('.popup_type_large-image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

//начальный массив карточек
initialCards.forEach(function (element) {
    elementsCards.append(createCard(element.name, element.link))
});

//универсальная функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

//универсальная функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

// закрытие всех попапов по кнокпе или клику на фон
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        }
    })
});

//редактирование профиля
function handleEditButton() {
    titleInput.value = profileTitle.textContent;
    subtitleInput.value = profileSubtitle.textContent;
    openPopup(popupEditProfile);
};

//и сохранение внесенных данных
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileSubtitle.textContent = subtitleInput.value;
    closePopup(popupEditProfile);
};

//открытие попапа добавления карточки
function handleAddCardButton() {
    openPopup(popupAddCard);
};

//создание карточки и расстановка слушателей 
function createCard(cardNameInput, cardLinkInput) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardCover = cardElement.querySelector('.card__cover');
    const cardDeleteButton = cardElement.querySelector('.card__button-delete');
    const cardLikeButton = cardElement.querySelector('.card__button-like');
    cardCover.alt = cardNameInput;
    cardElement.querySelector('.card__title').textContent = cardNameInput;
    cardCover.src = cardLinkInput;

    //слушатель для большого изображения
    cardCover.addEventListener('click', function () {
        popupImage.src = cardLinkInput;
        popupImage.alt = cardNameInput;
        popupImageCaption.textContent = cardNameInput;
        openPopupLargeImage();
    });

    //слушатель для удаления карточек
    cardDeleteButton.addEventListener('click', evt => {
        deleteCard(evt);
    });

    //слушатель для лайков
    cardLikeButton.addEventListener('click', function (evt) {
        likeCard(evt);
    });

    return cardElement;
};

//обработка кнопки submit и добавление новой карточки
function handleAddCardForm(evt) {
    evt.preventDefault();
    elementsCards.prepend(createCard(cardNameInput.value, cardLinkInput.value));
    closePopup(popupAddCard);
    evt.target.reset();
};

//удаление карточек
function deleteCard(event) {
    if (event.target.classList.contains('card__button-delete')) {
        const cardRemove = event.target.closest('.card');
        console.log('kaef');
        cardRemove.remove();
    }
};

//кнопка лайк
function likeCard(event) {
    if (event.target.matches('.card__button-like')) {
        const cardLike = event.target.closest('.card__button-like');
        cardLike.classList.toggle('card__button-like_active');
    }
};

//функция открытия увеличенного изображения карточки
function openPopupLargeImage() {
    openPopup(popupLargeImage);
};

//обработчики событий
editProfileButton.addEventListener('click', handleEditButton);
addCardButton.addEventListener('click', handleAddCardButton);
formSave.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardForm);

//функция закрытия попапа по нажатию на Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};



