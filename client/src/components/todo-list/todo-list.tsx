import "./todo-list.styles.css";

// models
import { Todo, TodoId } from "../../models";

// components
import { TodoItem } from "../todo-item";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (todoId: TodoId) => void;
  onRemoveTodo: (todoId: TodoId) => void;
};

export const TodoList = ({
  todos,
  onToggleTodo,
  onRemoveTodo,
}: TodoListProps) => {
  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
};
