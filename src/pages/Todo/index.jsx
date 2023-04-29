import { TodoList } from 'components/TodoList';
import { useTodo } from 'pages/Todo/useTodo';

export const Todo = () => {
  const {
    todos,
    todoValue,
    isUpdated,
    setIsUpdated,
    onTodoChange,
    handleCreateTodo,
    handleCheckBoxChange,
    handleDeleteClick,
  } = useTodo();

  return (
    <>
      <h1>✅ Todo List</h1>
      <form onSubmit={handleCreateTodo}>
        <h3>➕ 새로운 할 일 추가하기</h3>
        <input data-testid='new-todo-input' value={todoValue} onChange={onTodoChange} />
        <button type='submit' data-testid='new-todo-add-button'>
          추가
        </button>
      </form>
      <h3>📄 나의 할 일 목록</h3>
      <TodoList
        todos={todos}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        onCheckBoxChange={handleCheckBoxChange}
        onDeleteClick={handleDeleteClick}
      />
    </>
  );
};
