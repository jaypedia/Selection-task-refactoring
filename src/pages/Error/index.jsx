import { useNavigate, useRouteError } from 'react-router-dom';
import { useMovePage } from 'hooks/useMovePage';
import { USER_TOKEN_KEY } from 'constants';
import { PATH_ROUTE } from 'constants';

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const userToken = localStorage.getItem(USER_TOKEN_KEY);
  const [goSignIn, goSignUp, goTodo] = useMovePage([
    PATH_ROUTE.signIn,
    PATH_ROUTE.signUp,
    PATH_ROUTE.todo,
  ]);
  console.error(error);

  return (
    <div>
      <h2>{error.status}</h2>
      <h4>{error.statusText || error.message}</h4>
      <h5>에러가 발생했어요!</h5>
      {userToken ? (
        <button onClick={goTodo}>할 일 보러 가기</button>
      ) : (
        <>
          <button onClick={goSignIn}>로그인하러 가기</button>
          <button onClick={goSignUp}>회원가입하러 가기</button>
        </>
      )}
      <button onClick={() => navigate(-1)}>이전 페이지로 가기</button>
    </div>
  );
};
