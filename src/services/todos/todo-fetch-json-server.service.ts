// models
import { Todo, TodoId } from "../../models";

// services
import { TodoService } from "./todo.service.ts";

// store
import { useStore } from "../../store";

export class TodoFetchJsonServerService implements TodoService {
  async fetchTodos(): Promise<Todo[]> {
    console.log("Service: fetchTodos - TodoFetchJsonServerService");

    const userId = useStore.getState().user.id;
    const accessToken = useStore.getState().user.accessToken;

    if (!userId || !accessToken) {
      throw new Error("User ID not found or access token not found");
    }

    const url = new URL("http://localhost:4000/600/todos");
    url.searchParams.append("userId", userId.toString()); // ?userId=1 because JSON Server uses query params

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    return await response.json();
  }

  async addTodo(todo: Todo): Promise<Response> {
    console.log("Service: addTodo - TodoFetchJsonServerService");

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
  }

  async toggleTodo(todo: Todo): Promise<Response> {
    console.log("Service: updateTodo - TodoFetchJsonServerService");

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
  }

  async deleteTodo(todoId: TodoId): Promise<Response> {
    console.log("Service: deleteTodo - TodoFetchJsonServerService");

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
  }
}
