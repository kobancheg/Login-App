import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});

// Handlers
function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);

    return isValidInput;
  });
  console.log(isValidForm);
}