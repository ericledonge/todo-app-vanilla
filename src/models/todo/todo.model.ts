export type TodoId = number;

export type Todo = {
  id: TodoId;
  description: string;
  isDone: boolean;
  userId: number;
};
