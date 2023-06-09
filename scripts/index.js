// элементы editProfilePopup:
const editProfilePopup = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const editProfileTitleInput = editProfilePopup.querySelector('.popup__text-input_type_title'); //поле ввода в профиле
const editProfileSubtitleInput = editProfilePopup.querySelector('.popup__text-input_type_subtitle'); //поле ввода в профиле
const editProfilePopupForm = document.querySelector('.popup__form_edit-profile');
const editProfileButtonClose = document.querySelector('.popup__close-button_profile'); //кнопка закрытия

// элементы секции profile:
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля

// элементы addCardPopup:
const addCardButton = document.querySelector('.profile__button-add'); //кнопка создания новой карточки
const addCardPopup = document.querySelector('.popup_type_add'); //попап добавления новой карточки
const addCardPopupNameInput = addCardPopup.querySelector('.popup__text-input_card-name'); //инпут названия новой карточки
const addCardPopupLinkInput = addCardPopup.querySelector('.popup__text-input_card-link'); //инпут ссылки для обложки новой карточки
const addCardPopupForm = document.querySelector('.popup__form_add-card'); //форма добавления новой карточки
const addCardPopupButtonClose = document.querySelector('.popup__close-button_card'); //кнопка закрытия попапа добавления карточки

// элементы cards:
const cardsList = document.querySelector('.elements__cards'); //список карточек
const cardTemplate = document.querySelector('.card-template'); // шаблон карточки

// элементы showLargePicture:
const showLargePicturePopupButtonClose = document.querySelector('.popup__close-button_large-image');
const showLargePicturePopup = document.querySelector('.popup_type_large-image');
const showLargePictureImage = document.querySelector('.popup__image');
const showLargePicturePopupCaption = document.querySelector('.popup__image-caption');

// другие элементы:
const popups = document.querySelectorAll('.popup')

//загрузка начального массив карточек:
initialCards.forEach(function (element) {
    cardsList.append(createCard(element.name, element.link))
});

//ФУНКЦИИ:
//универсальная функция открытия попапа:
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

//универсальная функция закрытия попапа:
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

// закрытие всех попапов по кнокпе или клику на фон:
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
});

//редактирование профиля:
function handleEditButton() {
    editProfileTitleInput.value = profileTitle.textContent;
    editProfileSubtitleInput.value = profileSubtitle.textContent;
    openPopup(editProfilePopup);
};

//и сохранение внесенных данных:
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editProfileTitleInput.value;
    profileSubtitle.textContent = editProfileSubtitleInput.value;
    closePopup(editProfilePopup);
};

//открытие попапа добавления карточки:
function handleAddCardButton() {
    openPopup(addCardPopup);
};

//создание карточки и расстановка слушателей: 
function createCard(cardNameInput, cardLinkInput) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardCover = cardElement.querySelector('.card__cover');
    const cardDeleteButton = cardElement.querySelector('.card__button-delete');
    const cardLikeButton = cardElement.querySelector('.card__button-like');
    cardCover.alt = cardNameInput;
    cardElement.querySelector('.card__title').textContent = cardNameInput;
    cardCover.src = cardLinkInput;

    //слушатель для большого изображения:
    cardCover.addEventListener('click', function () {
        showLargePictureImage.src = cardLinkInput;
        showLargePictureImage.alt = cardNameInput;
        showLargePicturePopupCaption.textContent = cardNameInput;
        openPopupLargeImage();
    });

    //слушатель для удаления карточек:
    cardDeleteButton.addEventListener('click', evt => {
        deleteCard(evt);
    });

    //слушатель для лайков:
    cardLikeButton.addEventListener('click', function (evt) {
        likeCard(evt);
    });

    return cardElement;
};

//обработка кнопки submit и добавление новой карточки
function handleAddCardForm(evt) {
    evt.preventDefault();
    cardsList.prepend(createCard(addCardPopupNameInput.value, addCardPopupLinkInput.value));
    closePopup(addCardPopup);
    evt.target.reset();
};

//удаление карточек
function deleteCard(event) {
    if (event.target.classList.contains('card__button-delete')) {
        const cardRemove = event.target.closest('.card');
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
    openPopup(showLargePicturePopup);
};

//функция закрытия попапа по нажатию на Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

//обработчики событий:
profileButtonEdit.addEventListener('click', handleEditButton);
addCardButton.addEventListener('click', handleAddCardButton);
editProfilePopupForm.addEventListener('submit', handleProfileFormSubmit);
addCardPopupForm.addEventListener('submit', handleAddCardForm);