const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  nickname: /^[0-9a-zA-Z]{4,15}$/,
  firstname: /^[a-zA-Z]{4,}$/,
  lastname: /^[a-zA-Z]{4,}$/,
  phone: /^(\d{3})?[\s-]?(\d{3})?[\s-]?(\d{2})?[\s-]?(\d{2})$/, //050-123-11-12
  gender: /^(male|female|unknown)$/,
  city: /^(([a-zA-Z]{1,})+[\s-]?([a-zA-Z]{1,}))+$/,
  country: /^(([a-zA-Z]{1,})+[\s-]?([a-zA-Z]{1,}))+$/,
  birthday: /^\d{4}[./-]\d{2}[./-]\d{2}$/
};

/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesn't has data-required attr
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}