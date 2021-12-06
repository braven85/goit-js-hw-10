import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

function clearResults() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

inputField.addEventListener(
  'input',
  debounce(() => {
    if (inputField.value.trim() !== '') {
      fetchCountries(inputField.value.trim())
        .then(res => {
          if (res.length > 10) {
            clearResults();
            Notiflix.Notify.info(res.length + ' matches found. Please enter a more specific name.');
          } else if (res.length <= 10 && res.length > 1) {
            clearResults();
            res.forEach(function (v) {
              const addCountryToList = document.createElement('li');
              countryList.appendChild(addCountryToList);
              addCountryToList.className = 'country-list-item';
              addCountryToList.innerHTML = `<img class="country-flag" src="${v.flags.svg}"> &nbsp ${v.name.official}`;
            });
          } else if (res.length === 1) {
            clearResults();
            const countries = {};
            countries.languages = [];
            for (let lang in res[0].languages) {
              countries.languages.push(res[0].languages[lang]);
            }
            countryInfo.innerHTML = `<div class="country-title">
      <img class="country-flag" src="${res[0].flags.svg}"> &nbsp <h1>${res[0].name.official}</h1></div>
      <p class="country-details"><strong>Capital: </strong>${res[0].capital}</p>
      <p class="country-details"><strong>Population: </strong>${res[0].population}</p>
      <p class="country-details"><strong>Languages: </strong>${countries.languages}</p>`;
          } else {
            clearResults();
          }
        })
        .catch(error => {
          clearResults();
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    } else {
      clearResults();
    }
  }, DEBOUNCE_DELAY),
);
