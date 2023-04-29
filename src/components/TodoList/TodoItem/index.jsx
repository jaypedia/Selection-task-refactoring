import { useTodoItem } from './useTodoItem';

export const TodoItem = ({
  id,
  todo,
  isCompleted,
  onCheckBoxChange,
  onDelete,
  setIsUpdated,
  isUpdated,
}) => {
  const { isEdit, onTodoChange, todoValue, handleUpdateTodo, changeEditState, todoItemRef } =
    useTodoItem(id, setIsUpdated, isUpdated, todo, isCompleted);

  return (
    <li>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={onCheckBoxChange} />
        {isEdit ? (
          <>
            <input
              data-testid='modify-input'
              onChange={onTodoChange}
              value={todoValue}
              ref={todoItemRef}
            />
            <button data-testid='submit-button' onClick={handleUpdateTodo}>
              제출
            </button>
            <button data-testid='cancel-button' onClick={changeEditState}>
              취소
            </button>
          </>
        ) : (
          <>
            <span>{todo}</span>
            <button data-testid='modify-button' onClick={changeEditState}>
              수정
            </button>
            <button data-testid='delete-button' onClick={onDelete}>
              삭제
            </button>
          </>
        )}
      </label>
    </li>
  );
};
