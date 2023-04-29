import { useNavigate } from 'react-router-dom';

export const useMovePage = (path) => {
  const navigate = useNavigate();

  if (typeof path === 'string') {
    path = [path];
  }

  return path.map((p) => () => navigate(p));
};
