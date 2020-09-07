import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import 'webpack-jquery-ui/autocomplete';
import 'webpack-jquery-ui/css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError, autocomplete } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notification';
import { getNews } from './services/news.servise';
import { signUp, getCountries, getCities } from './services/signup.service';

const {
  form,
  inputEmail,
  inputPassword,
  signUpForm,
  signUpEmail,
  signUpPassword,
  nickName,
  firstName,
  lastName,
  phone,
  gender,
  country,
  city,
  birthday
} = UI;

const inputs = [inputEmail, inputPassword];
const inputsSignUp = [
  signUpEmail,
  signUpPassword,
  nickName,
  firstName,
  lastName,
  phone,
  gender,
  country,
  city,
  birthday
];

// Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmitLogin();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  onSubmitSignUp();
});
inputsSignUp.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

country.addEventListener('focus', async el => {
  const autocompleteData = await getCountries();
  let countries = Object.values(autocompleteData);
  autocomplete(country, countries);
});

city.addEventListener('focus', async el => {
  const autocompleteData = await getCountries();
  let cityIndex = Object.entries(autocompleteData).filter(([, value]) => value === country.value);
  const index = cityIndex[0][0];
  const cities = await getCities(index);
  autocomplete(city, cities);
});

// Handlers
async function onSubmitLogin() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    // show success notify
    notify({ msg: 'Login success', className: 'alert-success' })
  } catch (err) {
    // show alert notify
    notify({ msg: 'Login faild', className: 'alert-danger' })
  }
}

async function onSubmitSignUp() {
  const isValidForm = inputsSignUp.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    let date = UI.birthday.value.split('-')

    const signUpValue = {
      email: UI.signUpEmail.value,
      password: UI.signUpPassword.value,
      nickname: UI.nickName.value,
      first_name: UI.firstName.value,
      last_name: UI.lastName.value,
      phone: UI.phone.value,
      gender_orientation: UI.gender.value,
      city: UI.city.value,
      country: UI.country.value,
      date_of_birth_day: +date[2],
      date_of_birth_month: +date[1],
      date_of_birth_year: +date[0]
    }

    console.log(signUpValue);

    await signUp(signUpValue);
    form.reset();
    // show success notify
    // notify({ msg: 'Login success', className: 'alert-success' })
  } catch (err) {
    // show alert notify
    // notify({ msg: 'Login faild', className: 'alert-danger' })
  }
}