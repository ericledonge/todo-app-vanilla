import { useCallback, useEffect, useMemo, useState } from "react";

// models
import { Todo, TodoId } from "../../models";

// repositories
import { TodoRepository } from "../../repositories";

// services
import {
  TodoFetchJsonServerService,
  TodoKyJsonServerService,
  TodoNodeService,
} from "../../services";

// store
import { useGetSystemUsed } from "../../store";

export const useTodos = () => {
  const systemUsed = useGetSystemUsed();

  const todoRepository: TodoRepository = useMemo(() => {
    if (systemUsed === "KY_JSON_SERVER") {
      return new TodoRepository(new TodoKyJsonServerService());
    }
    if (systemUsed === "FETCH_JSON_SERVER") {
      return new TodoRepository(new TodoFetchJsonServerService());
    }
    if (systemUsed === "NODE") {
      return new TodoRepository(new TodoNodeService());
    }
    throw new Error("Invalid systemUsed value");
  }, [systemUsed]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const todos = await todoRepository.fetchTodos();
      setTodos(todos);
      console.log(todos);
    } catch (error) {
      console.error(error);
      setError(new Error("Failed to fetch todos."));
    }
    setIsLoading(false);
  }, [todoRepository]);

  const addTodo = useCallback(
    async (todo: Todo) => {
      setIsLoading(true);
      try {
        const response = await todoRepository.addTodo(todo);
        console.log(response);
        await fetchTodos();
      } catch (error) {
        console.error(error);
        setError(new Error(`Failed to add new todo id: ${todo.id}`));
      }
      setIsLoading(false);
    },
    [fetchTodos, todoRepository],
  );

  const toggleTodo = useCallback(
    async (todoId: TodoId) => {
      setIsLoading(true);
      const updatedTodo = todos.find((todo) => todo.id === todoId);

      if (!updatedTodo) {
        return;
      }

      updatedTodo.isDone = !updatedTodo.isDone;

      try {
        await todoRepository.toggleTodo(updatedTodo);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to toggle todo id: ${todoId}`));
      }
      setIsLoading(false);
    },
    [todos, todoRepository, fetchTodos],
  );

  const removeTodo = useCallback(
    async (todoId: TodoId) => {
      setIsLoading(true);
      try {
        await todoRepository.deleteTodo(todoId);
        await fetchTodos();
      } catch (error) {
        setError(new Error(`Failed to remove todo id: ${todoId}`));
      }
      setIsLoading(false);
    },
    [fetchTodos, todoRepository],
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};
