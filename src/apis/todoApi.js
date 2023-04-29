import axios from 'axios';
import { PATH_API } from 'constants';
import { getUserToken } from 'utils';

const axiosConfig = {
  baseURL: `${process.env.REACT_APP_API_URL}${PATH_API.todos}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const todoInstance = axios.create(axiosConfig);

todoInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getUserToken();
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export const createTodo = (newTodo) => {
  return todoInstance.post(PATH_API.root, newTodo);
};

export const getTodos = () => {
  return todoInstance.get(PATH_API.root);
};

export const updateTodo = (id, updatedTodo) => {
  return todoInstance.put(`/${id}`, updatedTodo);
};

export const deleteTodo = (id) => {
  return todoInstance.delete(`/${id}`);
};
