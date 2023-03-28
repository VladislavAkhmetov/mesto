let popup = document.querySelector('.popup'); // Тёмный фон
let popupBody = document.querySelector('.popup__body'); // Окно
let openPopupButton = document.querySelectorAll('.profile__button-edit'); // Кнопка редактирования
let closePopupButton = document.querySelector('.popup__button-close'); // Кнопка закрытия
let titleInput = document.querySelector('.popup__input_title'); // Присваиваем имя переменной введенной информации
let subtitleInput = document.querySelector('.popup__input_subtitle'); // Присваиваем имя переменной введенной информации
let profileTitle = document.querySelector('.profile__title'); // Присваиваем имя переменной полю profile__title
let profileSubtitle = document.querySelector('.profile__subtitle'); // Присваиваем имя переменной полю profile__subtitle
let saveButton = document.querySelector('.popup__button-submit'); // Имя переменной кнопки Сохранить

openPopupButton.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (event) => { // Для каждой вешаем обработчик событий на клик
        event.preventDefault();
        popup.classList.add('active');
        popupBody.classList.add('active');
        titleInput.value = profileTitle.textContent;
        subtitleInput.value = profileSubtitle.textContent;
    })
});

closePopupButton.addEventListener('click', () => { // При клике на крестик попап закрывается
    popup.classList.remove('active');
    popupBody.classList.remove('active');
});

document.addEventListener('click', (e) => { // При клике на фоне попап закрывается
    if (e.target === popup) {
        popup.classList.remove('active');
        popupBody.classList.remove('active');
    }
});

function popupClose() {
    popup.classList.remove('active');
    popupBody.classList.remove('active');
}

function formSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileSubtitle.textContent = subtitleInput.value;
    popupClose();
};

saveButton.addEventListener('click', formSubmit);