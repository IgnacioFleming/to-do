import { TASK, TaskId, TODO, TodoID } from "../types/todo";
import { STATUS } from "../enums/enums";
import { renderTasks } from "./renderTodos";
import { todos } from "./todos";

export const createTask = (text: string, id: TodoID) => {
  if (!text.trim()) return;
  const todoTarget: TODO | undefined = todos.find((todo: TODO) => todo.id === id);
  if (todoTarget) {
    const task: TASK = {
      id: crypto.randomUUID(),
      status: STATUS.PENDING,
      text,
    };
    todoTarget.tasks.push(task);
    const tasks = todos.find((el) => el.id === id)?.tasks;
    if (tasks) renderTasks(id);
  }
};

export const handleTaskCheck = (todoId: TodoID, taskId: TaskId) => {
  const taskTarget: TASK | undefined = todos.find((todo) => todo.id === todoId)?.tasks.find((el) => el.id === taskId);
  if (taskTarget) {
    if (taskTarget.status === STATUS.PENDING) taskTarget.status = STATUS.COMPLETED;
    else taskTarget.status = STATUS.PENDING;
  }
  return;
};
