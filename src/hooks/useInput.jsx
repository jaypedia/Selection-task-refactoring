import { useState, useCallback } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onReset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, setValue, onChange, onReset };
};
