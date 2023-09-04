import { useCallback, useEffect, useState } from "react";

// models
import { Todo, TodoId } from "../../models";

// services
import {
  addTodoService,
  deleteTodoService,
  fetchTodosService,
  updateTodoService,
} from "../../services";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    fetchTodosService()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchTodos().then();
  }, [fetchTodos]);

  // use case
  const addTodo = useCallback(
    async (todo: Todo) => {
      try {
        await addTodoService(todo);
        await fetchTodos();
      } catch (error) {
        setError(new Error("Failed to add a new todo."));
      }
    },
    [fetchTodos],
  );

  const toggleTodo = useCallback(
    async (todoId: TodoId) => {
      const updatedTodo = todos.find((todo) => todo.id === todoId);

      if (!updatedTodo) {
        return;
      }

      updatedTodo.isDone = !updatedTodo.isDone;

      try {
        await updateTodoService(updatedTodo);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to toggle todo id: ${todoId}`));
      }
    },
    [todos, fetchTodos],
  );

  const removeTodo = useCallback(
    async (todoId: TodoId) => {
      try {
        await deleteTodoService(todoId);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to remove todo id: ${todoId}`));
      }
    },
    [fetchTodos],
  );

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};
