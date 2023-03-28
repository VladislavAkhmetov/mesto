let popupBg = document.querySelector('.popup__bg'); // Тёмный фон
let popup = document.querySelector('.popup'); // Окно
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
        popupBg.classList.add('active');
        popup.classList.add('active');
        titleInput.value = profileTitle.textContent;
        subtitleInput.value = profileSubtitle.textContent;
    })
});

closePopupButton.addEventListener('click', () => { // При клике на крестик попап закрывается
    popupBg.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => { // При клике на фоне попап закрывается
    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});

function popupClose() {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
}

function formSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileSubtitle.textContent = subtitleInput.value;
    popupClose();
};

saveButton.addEventListener('click', formSubmit);