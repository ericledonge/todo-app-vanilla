import "./todo-item.styles.css";

// models
import { Todo, TodoId } from "../../models";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (todoId: TodoId) => void;
  onRemoveTodo: (todoId: TodoId) => void;
};

export const TodoItem = ({
  todo,
  onToggleTodo,
  onRemoveTodo,
}: TodoItemProps) => {
  return (
    <li>
      <div className="text">
        <input
          type="checkbox"
          value={todo.description}
          onChange={() => onToggleTodo(todo.id)}
          checked={todo.isDone}
          className="checkbox"
        />

        <p className={todo.isDone ? "done" : ""}>{todo.description}</p>
      </div>

      <div>
        {todo.isDone && (
          <button onClick={() => onRemoveTodo(todo.id)} className="button">
            <p className="cross">&#10005;</p>
          </button>
        )}
      </div>
    </li>
  );
};
