import { useCallback, useEffect, useMemo, useState } from "react";

// models
import { Todo, TodoId } from "../../models";

// repositories
import { TodoRepository } from "../../repositories";

// services
import {
  TodoFetchJsonServerService,
  TodoKyJsonServerService,
} from "../../services";

// store
import { useGetSystemUsed } from "../../store";

export const useTodos = () => {
  const systemUsed = useGetSystemUsed();

  const todoRepositoryKy: TodoRepository = useMemo(() => {
    if (systemUsed === "KY_JSON_SERVER") {
      return new TodoRepository(new TodoKyJsonServerService());
    }
    if (systemUsed === "FETCH_JSON_SERVER") {
      return new TodoRepository(new TodoFetchJsonServerService());
    }
    throw new Error("Invalid systemUsed value");
  }, [systemUsed]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    todoRepositoryKy
      .fetchTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [todoRepositoryKy]);

  useEffect(() => {
    fetchTodos().then();
  }, [fetchTodos]);

  // use case
  const addTodo = useCallback(
    async (todo: Todo) => {
      try {
        await todoRepositoryKy.addTodo(todo);
        await fetchTodos();
      } catch (error) {
        setError(new Error("Failed to add a new todo."));
      }
    },
    [fetchTodos, todoRepositoryKy],
  );

  const toggleTodo = useCallback(
    async (todoId: TodoId) => {
      const updatedTodo = todos.find((todo) => todo.id === todoId);

      if (!updatedTodo) {
        return;
      }

      updatedTodo.isDone = !updatedTodo.isDone;

      try {
        await todoRepositoryKy.toggleTodo(updatedTodo);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to toggle todo id: ${todoId}`));
      }
    },
    [todos, todoRepositoryKy, fetchTodos],
  );

  const removeTodo = useCallback(
    async (todoId: TodoId) => {
      try {
        await todoRepositoryKy.deleteTodo(todoId);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to remove todo id: ${todoId}`));
      }
    },
    [fetchTodos, todoRepositoryKy],
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
