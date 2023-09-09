import "./dashboard.page.styles.css";

// components
import { Error, Loading, TodoCreate, TodoList } from "../../components";

// custom hooks
import { useTodos } from "../../hooks";

export const DashboardPage = () => {
  const { todos, isLoading, error, addTodo, toggleTodo, removeTodo } =
    useTodos();

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <TodoCreate onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onRemoveTodo={removeTodo}
      />
    </div>
  );
};
