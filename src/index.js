import "./styles.css";
import cards from "./menu.json";
import cardsMarkupTpl from "./templates/cardsMarkupTpl.hbs";


const cardsMarkup = cardsMarkupTpl(cards);

const refs = {
    cards: document.querySelector('.js-menu'),
    checkbox: document.getElementById('theme-switch-toggle'),
    body: document.querySelector('body'),
}

refs.cards.insertAdjacentHTML('beforeend', cardsMarkup);

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const formData = {};

refs.checkbox.addEventListener('change', onCheckboxPress)

populateLocalStorage()

function onCheckboxPress(e) {
    const DARK = refs.body.classList.contains(theme.DARK);
    const LIGHT = refs.body.classList.contains(theme.LIGHT);
    // let currentTheme = refs.body.classList.value; - если делаю через переменную, то не записывается в localStorage

    if (!DARK && !LIGHT) {
        refs.body.classList.add(theme.DARK);
        refs.checkbox.checked = true;
    };
    if (DARK) {
        refs.body.classList.replace(theme.DARK, theme.LIGHT);
        console.log(refs.checkbox.checked);
    };
    
    if (LIGHT) {
        refs.body.classList.replace(theme.LIGHT, theme.DARK);
        refs.checkbox.checked = true;
    };

    formData['theme'] = refs.body.classList.value;
    formData['checked'] = refs.checkbox.checked;

    const stringFormData = JSON.stringify(formData);

    localStorage.setItem('theme', stringFormData);

};

function populateLocalStorage() {
  const savedMessage = localStorage.getItem('theme');
    const getObject = JSON.parse(savedMessage);

  if (savedMessage) {
      refs.body.classList.value = getObject.theme;
      refs.checkbox.checked = getObject.checked;
  }
}
