const UI = {
  form: document.forms['loginForm'],
  inputEmail: document.getElementById('email'),
  inputPassword: document.getElementById('password'),

  signUpForm: document.forms['signUpForm'],
  signUpEmail: document.getElementById('signUpEmail'),
  signUpPassword: document.getElementById('signUpPassword'),
  nickName: document.getElementById('nickname'),
  firstName: document.getElementById('firstname'),
  lastName: document.getElementById('lastname'),
  phone: document.getElementById('phone'),
  gender: document.getElementById('gender'),
  country: document.getElementById('country'),
  city: document.getElementById('city'),
  birthday: document.querySelector('input[type="date"]'),
};

export default UI;