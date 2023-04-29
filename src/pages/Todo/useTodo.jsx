import { useLoaderData } from 'react-router-dom';
import { useInput } from 'hooks/useInput';
import { createTodo, getTodos, updateTodo, deleteTodo } from 'apis/todoApi';
import { useEffect, useState, useCallback } from 'react';
import { validator } from 'utils';

export const useTodo = () => {
  const { data: loadedTodoData } = useLoaderData();
  const [todos, setTodos] = useState(loadedTodoData);
  const [isUpdated, setIsUpdated] = useState(false);
  const { value: todoValue, onReset: resetTodo, onChange: onTodoChange } = useInput();

  const refetchTodos = async () => {
    try {
      const { data: refetchedTodos } = await getTodos();
      setTodos(refetchedTodos);
      setIsUpdated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetchTodos();
  }, [isUpdated]);

  const handleCreateTodo = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (validator.checkTodo(todoValue)) {
          await createTodo({ todo: todoValue });
          setIsUpdated(true);
          resetTodo();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [todoValue],
  );

  const handleCheckBoxChange = useCallback(async (id, todo, isCompleted) => {
    try {
      await updateTodo(id, { todo, isCompleted: !isCompleted });
      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteClick = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    todos,
    todoValue,
    isUpdated,
    setIsUpdated,
    onTodoChange,
    handleCreateTodo,
    handleCheckBoxChange,
    handleDeleteClick,
  };
};
