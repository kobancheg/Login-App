import { getCountries, getCities } from '../services/signup.service';

export async function autocompleteCountries() {
  const autocompleteData = await getCountries();
  let countries = Object.values(autocompleteData);
  autocomplete(country, countries);
}

export async function autocompleteCities() {
  if (!country.value) return;
  const autocompleteData = await getCountries();
  let cityIndex = Object.entries(autocompleteData).filter(([, value]) => value === country.value);
  const index = cityIndex[0][0];
  const cities = await getCities(index);
  autocomplete(city, cities);
}

export function removeDisabled() {
  if (country.value) {
    city.removeAttribute('disabled');
  } else {
    city.setAttribute('disabled', 'disabled');
  }
}

export function autocomplete(tags, availableTags) {
  $(function () {
    $(tags).autocomplete({
      source: availableTags
    });
  });
}