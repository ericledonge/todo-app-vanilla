import ky from "ky";

// models
import { Todo, TodoId, Todos } from "../../models";

// services
import { TodoService } from "./todo.service.ts";

// store
import { useStore } from "../../store";

export class TodoKyJsonServerService implements TodoService {
  async fetchTodos(): Promise<Todo[]> {
    console.log("Service: fetchTodos - TodoKyJsonServerService");

    const userId = useStore.getState().user.id;
    const accessToken = useStore.getState().user.accessToken;

    if (!userId || !accessToken) {
      throw new Error("User ID not found or access token not found");
    }

    const url = new URL("http://localhost:8000/todos");
    url.searchParams.append("userId", userId.toString()); // ?userId=1 because JSON Server uses query params

    const todos: Todos = await ky
      .get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
      .json();

    return todos;
  }

  async addTodo(todo: Todo): Promise<Response> {
    console.log("Service: addTodo - TodoKyJsonServerService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL("http://localhost:4000/600/todos");
    url.searchParams.append("userId", todo.userId.toString()); // ?userId=2 because JSON Server uses query params

    const response = await ky.post(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      json: todo,
    });

    return response.json();
  }

  async toggleTodo(todo: Todo): Promise<Response> {
    console.log("Service: updateTodo - TodoKyJsonServerService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL(`http://localhost:4000/600/todos/${todo.id}`);
    url.searchParams.append("userId", todo.userId.toString()); // ?userId=2 because JSON Server uses query params

    const response = await ky.patch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      json: todo,
    });

    return response;
  }

  async deleteTodo(todoId: TodoId): Promise<Response> {
    console.log("Service: deleteTodo - TodoKyJsonServerService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL(`http://localhost:4000/600/todos/${todoId}`);
    url.searchParams.append("userId", todoId.toString()); // ?userId=2 because JSON Server uses query params

    const response = await ky.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }
}
