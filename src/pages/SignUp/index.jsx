import { postSignUp } from 'apis/authApi';
import { PATH_ROUTE } from 'constants';
import { useAuthForm } from 'hooks/useAuthForm';
import { useMovePage } from 'hooks/useMovePage';

export const SignUp = () => {
  const { emailRef, passwordRef, userAccount, handleAccountChange, isValidAccount } = useAuthForm();

  const [goSignIn] = useMovePage(PATH_ROUTE.signIn);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await postSignUp(userAccount);
      goSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
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
        <button type='submit' data-testid='signup-button' disabled={!isValidAccount()}>
          회원가입하기
        </button>
      </form>
      <button onClick={goSignIn}>로그인하러 가기</button>
    </>
  );
};
