import { Todo, TodoId } from "../../models";

export interface TodoService {
  fetchTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => Promise<Response>;
  toggleTodo: (todo: Todo) => Promise<Response>;
  deleteTodo: (todoId: TodoId) => Promise<Response>;
}
