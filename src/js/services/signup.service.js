import axios from '../plugins/axios';

export async function getCountries() {
  try {
    const response = await axios.get(`/location/get-countries`);

    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getCities(index) {
  try {
    const response = await axios.get(`location/get-cities/${index}`);

    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function signUp({
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  gender_orientation,
  city,
  country,
  date_of_birth_day,
  date_of_birth_month,
  date_of_birth_year
}) {

  try {
    const response = await axios.post(`/auth/signup`,
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year
      }),
    )

    return response;

  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}