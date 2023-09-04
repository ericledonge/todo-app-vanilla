import { Todo, TodoId } from "../models";

import { useStore } from "../store";

export const fetchTodosService = async (): Promise<Todo[]> => {
  console.log("Service: fetchTodosService");

  const userId = useStore.getState().user.id;
  const accessToken = useStore.getState().user.accessToken;

  const url = new URL("http://localhost:4000/600/todos");
  url.searchParams.append("userId", userId.toString()); // ?userId=1 because JSON Server uses query params

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  return await response.json();
};

export const addTodoService = async (todo: Todo): Promise<Todo> => {
  console.log("Service: addTodoService");

  const accessToken = useStore.getState().user.accessToken;

  const url = new URL("http://localhost:4000/600/todos");
  url.searchParams.append("userId", todo.userId.toString()); // ?userId=2 because JSON Server uses query params

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(`Failed to add todo: ${response.statusText}`);
  }

  return await response.json();
};

export const updateTodoService = async (todo: Todo): Promise<Todo> => {
  console.log("Service: updateTodoService");

  const accessToken = useStore.getState().user.accessToken;

  const response = await fetch(`http://localhost:4000/660/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
};

export const deleteTodoService = async (todoId: TodoId) => {
  console.log("Service: deleteTodoService");

  const accessToken = useStore.getState().user.accessToken;

  const response = await fetch(`http://localhost:4000/660/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }

  return response.json();
};
