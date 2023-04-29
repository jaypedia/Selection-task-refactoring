import { useAuthForm } from 'hooks/useAuthForm';
import { useMovePage } from 'hooks/useMovePage';
import { postSignIn } from 'apis/authApi';
import { PATH_ROUTE, USER_TOKEN_KEY } from 'constants';

export const SignIn = () => {
  const { emailRef, passwordRef, userAccount, handleAccountChange, isValidAccount } = useAuthForm();

  const [goTodo, goSignUp] = useMovePage([PATH_ROUTE.todo, PATH_ROUTE.signUp]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await postSignIn(userAccount);
      const { access_token: accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem(USER_TOKEN_KEY, accessToken);
        goTodo();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSignIn}>
        <input
          name='email'
          data-testid='email-input'
          ref={emailRef}
          value={userAccount.email}
          onChange={handleAccountChange}
        />
        <input
          name='password'
          data-testid='password-input'
          ref={passwordRef}
          value={userAccount.password}
          onChange={handleAccountChange}
          type='password'
          autoComplete='off'
        />
        <button type='submit' data-testid='signin-button' disabled={!isValidAccount()}>
          로그인하기
        </button>
      </form>
      <button onClick={goSignUp}>회원가입하러 가기</button>
    </>
  );
};
