import axios from 'axios';
import { PATH_API } from 'constants';

import { USER_TOKEN_KEY } from 'constants';

const axiosConfig = {
  baseURL: `${process.env.REACT_APP_API_URL}${PATH_API.auth}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const loginInstance = axios.create(axiosConfig);

export const postSignUp = (userAccount) => {
  return loginInstance.post(PATH_API.signUp, userAccount);
};

export const postSignIn = (userAccount) => {
  return loginInstance.post(PATH_API.signIn, userAccount);
};

export const postSignOut = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
};
