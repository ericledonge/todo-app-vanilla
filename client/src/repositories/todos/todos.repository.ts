// models
import { Todo, TodoId, Todos } from "../../models";

// services
import { TodoService } from "../../services";

export interface ITodoRepository {
  fetchTodos(): Promise<Todos>;
  addTodo(todo: Todo): Promise<Response>;
  toggleTodo(todo: Todo): Promise<Response>;
  deleteTodo(todoId: TodoId): Promise<Response>;
}

export class TodoRepository implements ITodoRepository {
  constructor(private todoServ: TodoService) {}

  async fetchTodos(): Promise<Todos> {
    const todos = await this.todoServ.fetchTodos();
    // mapping
    return todos;
  }

  async addTodo(todo: Todo): Promise<Response> {
    const response = await this.todoServ.addTodo(todo);
    // mapping
    return response;
  }

  async toggleTodo(todo: Todo): Promise<Response> {
    const response = await this.todoServ.toggleTodo(todo);
    // mapping
    return response;
  }

  async deleteTodo(todoId: TodoId): Promise<Response> {
    const response = await this.todoServ.deleteTodo(todoId);
    // mapping
    return response;
  }
}
