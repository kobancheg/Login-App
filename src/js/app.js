import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notification';
import { getNews } from './services/news.servise';
import { signUp } from './services/signup.service';

const { form, inputEmail, inputPassword, signUpForm } = UI;
const inputs = [inputEmail, inputPassword];

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
  // const isValidForm = inputs.every(el => {
  //   const isValidInput = validate(el);
  //   if (!isValidInput) {
  //     showInputError(el);
  //   }
  //   return isValidInput;
  // });

  // if (!isValidForm) return;

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

  console.log(signUpValue)

  try {
    await signUp(signUpValue);
    form.reset();
    // show success notify
    // notify({ msg: 'Login success', className: 'alert-success' })
  } catch (err) {
    // show alert notify
    // notify({ msg: 'Login faild', className: 'alert-danger' })
  }
}