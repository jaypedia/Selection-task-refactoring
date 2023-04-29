import { redirect } from 'react-router-dom';

import { USER_TOKEN_KEY } from 'constants';
import { todoInstance } from 'apis/todoApi';
import { PATH_ROUTE, PATH_API } from 'constants';

export const todoLoader = () => {
  const userToken = localStorage.getItem(USER_TOKEN_KEY);
  if (!userToken) {
    return redirect(PATH_ROUTE.signIn);
  }
  return todoInstance.get(PATH_API.root);
};
