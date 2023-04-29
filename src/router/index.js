import { PATH_ROUTE } from 'constants';
import { SignIn, SignUp, Todo, Error, Root } from 'pages';
import { createBrowserRouter } from 'react-router-dom';
import { authLoader, rootLoader, todoLoader } from './loaders';

const routes = [
  {
    path: PATH_ROUTE.root,
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
  },
  {
    path: PATH_ROUTE.signIn,
    element: <SignIn />,
    errorElement: <Error />,
    loader: authLoader,
  },
  {
    path: PATH_ROUTE.signUp,
    element: <SignUp />,
    errorElement: <Error />,
    loader: authLoader,
  },
  {
    path: PATH_ROUTE.todo,
    element: <Todo />,
    errorElement: <Error />,
    loader: todoLoader,
  },
];

export const router = createBrowserRouter(routes, {
  basename: '/wanted-pre-onboarding-frontend-week1',
});
