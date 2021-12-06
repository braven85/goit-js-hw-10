import Notiflix from "notiflix";

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(res => {
      if (!res.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return res.json();
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}