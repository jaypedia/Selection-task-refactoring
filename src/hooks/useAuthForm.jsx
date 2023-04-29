import { useRef } from 'react';
import { useInput } from 'hooks/useInput';
import { validator } from 'utils';

export const useAuthForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { value: userAccount, setValue: setUserAccount } = useInput({ email: '', password: '' });

  const isValidAccount = () => {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const isValid = validator.checkAccount(email, password);
    return isValid;
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setUserAccount({ ...userAccount, [name]: value });
  };

  return {
    emailRef,
    passwordRef,
    userAccount,
    handleAccountChange,
    isValidAccount,
  };
};
