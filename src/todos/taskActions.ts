import { TASK, TODO, TodoID } from "../types/todo";
import { STATUS } from "../enums/enums";
import { renderTasks } from "./renderTodos";

export const createTask = (text: string, id: TodoID, todos: TODO[]) => {
  const todoTarget: TODO | undefined = todos.find((todo: TODO) => todo.id === id);
  if (todoTarget) {
    const task: TASK = {
      id: crypto.randomUUID(),
      status: STATUS.PENDING,
      text,
    };
    todoTarget.tasks.push(task);
    const todo = document.getElementById(id) as HTMLDivElement;
    const tasks = todos.find((el) => el.id === id)?.tasks;
    if (tasks) renderTasks(tasks, todo);
  }
};
