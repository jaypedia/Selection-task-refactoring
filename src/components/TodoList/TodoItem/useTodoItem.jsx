import { updateTodo } from 'apis/todoApi';
import { useInput } from 'hooks/useInput';
import { useCallback, useEffect, useState, useRef } from 'react';
import { validator } from 'utils';

export const useTodoItem = (id, setIsUpdated, isUpdated, todo, isCompleted) => {
  const { value: todoValue, onChange: onTodoChange } = useInput(todo);
  const todoItemRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTodoId, setUpdatedTodoId] = useState(null);

  const changeEditState = useCallback(() => {
    setIsEdit((prev) => !prev);
  });

  const handleUpdateTodo = useCallback(async () => {
    try {
      const todoRefValue = todoItemRef?.current.value;
      if (validator.isSame([todoValue, todoRefValue])) {
        setIsEdit(false);
        throw new Error();
      }
      await updateTodo(id, { todo: todoRefValue, isCompleted });
      setIsUpdated(true);
      setUpdatedTodoId(id);
    } catch (error) {
      console.error(error);
    }
  }, [id, isCompleted]);

  useEffect(() => {
    if (!isUpdated && updatedTodoId === id) {
      setIsEdit(false);
      setUpdatedTodoId(null);
    }
  }, [isUpdated]);

  return {
    isEdit,
    todoItemRef,
    onTodoChange,
    todoValue,
    handleUpdateTodo,
    changeEditState,
  };
};
