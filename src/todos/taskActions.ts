import { TASK, TaskId, TODO } from "../types/todo";
import { STATUS } from "../enums/enums";

export const createTask = (text: string, id: TaskId, todos: TODO[]) => {
  const todoTarget: TODO | undefined = todos.find((todo: TODO) => todo.id === id);
  if (todoTarget) {
    const task: TASK = {
      id: crypto.randomUUID(),
      status: STATUS.PENDING,
      text,
    };
    todoTarget.tasks.push(task);
  }
};
