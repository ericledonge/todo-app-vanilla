import ky from "ky";

// models
import { Todo, TodoId, Todos } from "../../models";

// services
import { TodoService } from "./todo.service.ts";

// store
import { useStore } from "../../store";

// TODO: add Zod with a schema for the response

// TODO: Video 1h40

const BACKEND_URL = "http://localhost:8000/todos";

const mapTodoFromServerFormatToClientFormat = (todo: any): Todo => ({
  id: todo.id,
  userId: todo.user_id,
  description: todo.title,
  isDone: todo.is_done,
});

const mapTodoFromClientFormatToServerFormat = (todo: Todo): any => ({
  user_id: todo.userId,
  title: todo.description,
  is_done: todo.isDone,
});

export class TodoNodeService implements TodoService {
  async fetchTodos(): Promise<Todo[]> {
    console.log("Service: fetchTodos - TodoNodeService");

    const userId = useStore.getState().user.id;
    const accessToken = useStore.getState().user.accessToken;

    if (!userId || !accessToken) {
      throw new Error("User ID not found or access token not found");
    }

    const url = new URL(`${BACKEND_URL}/${userId}`);

    const todos: Todos = await ky
      .get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
      .json();

    return todos.map((todo) => mapTodoFromServerFormatToClientFormat(todo));
  }

  async addTodo(todo: Todo): Promise<Response> {
    console.log("Service: addTodo - TodoNodeService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL(`${BACKEND_URL}`);

    const response = await ky.post(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      json: mapTodoFromClientFormatToServerFormat(todo),
    });

    return response.json();
  }

  async toggleTodo(todo: Todo): Promise<Response> {
    console.log("Service: updateTodo - TodoNodeService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL(`${BACKEND_URL}/${todo.id}`);

    const response = await ky.patch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      json: mapTodoFromClientFormatToServerFormat(todo),
    });

    return response;
  }

  async deleteTodo(todoId: TodoId): Promise<Response> {
    console.log("Service: deleteTodo - TodoNodeService");

    const accessToken = useStore.getState().user.accessToken;

    const url = new URL(`${BACKEND_URL}/${todoId}`);

    const response = await ky.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }
}
