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

// store
import { useGetAccessToken, useGetUserId } from "../../store";

export const useTodos = () => {
  const userId = useGetUserId();
  const accessToken = useGetAccessToken();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    fetchTodosService({ accessToken, userId })
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [accessToken, userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // use case
  const addTodo = useCallback(
    async (todo: Todo) => {
      try {
        await addTodoService({ todo, accessToken });
        await fetchTodos();
      } catch (error) {
        setError(error as Error);
      }
    },
    [accessToken, fetchTodos],
  );

  const toggleTodo = useCallback(
    async (todoId: TodoId) => {
      const updatedTodo = todos.find((todo) => todo.id === todoId);

      if (!updatedTodo) {
        return;
      }

      updatedTodo.isDone = !updatedTodo.isDone;

      try {
        await updateTodoService({ todo: updatedTodo, accessToken });
        await fetchTodos();
      } catch (error) {
        setError(error as Error);
      }
    },
    [todos, accessToken, fetchTodos],
  );

  const removeTodo = useCallback(
    async (todoId: TodoId) => {
      try {
        await deleteTodoService({ todoId, accessToken });
        await fetchTodos();
      } catch (error) {
        setError(error as Error);
      }
    },
    [accessToken, fetchTodos],
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
