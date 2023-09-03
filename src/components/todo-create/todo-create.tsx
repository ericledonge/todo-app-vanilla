import { FormEvent, useState } from "react";

// models
import { Todo } from "../../models";
import { useGetUserId } from "../../store";

type TodoCreateProps = {
  onAddTodo: (todo: Todo) => void;
};

export const TodoCreate = ({ onAddTodo }: TodoCreateProps) => {
  const userId = useGetUserId();

  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(event.currentTarget[0] as HTMLInputElement).value) {
      return;
    }

    const newTodo: Todo = {
      id: Math.random(),
      description: (event.currentTarget[0] as HTMLInputElement).value,
      isDone: false,
      userId,
    };

    onAddTodo?.(newTodo);

    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};
