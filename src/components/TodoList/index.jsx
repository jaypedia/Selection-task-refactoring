import { memo } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = memo(function TodoList({
  todos,
  isUpdated,
  setIsUpdated,
  onCheckBoxChange,
  onDeleteClick,
}) {
  return (
    <ul>
      {todos.map(({ id, todo, isCompleted }) => {
        return (
          <TodoItem
            key={id}
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            onCheckBoxChange={() => onCheckBoxChange(id, todo, isCompleted)}
            onDelete={() => onDeleteClick(id)}
          />
        );
      })}
    </ul>
  );
});
