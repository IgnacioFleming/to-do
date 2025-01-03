import { TASK, TaskId, TODO, TodoID } from "../types/todo";
import { STATUS } from "../enums/enums";
import { renderNewTask } from "./rendering";
import { todos } from "./todos";
import { setDisabledClassToButton } from "../helpers/todoButtons";

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
    renderNewTask({ id, task, singleRendering: true });
    setDisabledClassToButton({ todoId: id, settings: [{ selector: "#pending-btn" }, { selector: "#empty-btn" }] });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

export const handleTaskCheck = (todoId: TodoID, taskId: TaskId) => {
  const taskTarget: TASK | undefined = todos.find((todo) => todo.id === todoId)?.tasks.find((el) => el.id === taskId);
  if (taskTarget) {
    if (taskTarget.status === STATUS.PENDING) taskTarget.status = STATUS.COMPLETED;
    else taskTarget.status = STATUS.PENDING;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  return;
};

export const deleteTask = (taskId: TaskId) => {
  const todoTarget: TODO | undefined = todos.find((todo) => todo.tasks.some((el) => el.id === taskId));
  if (!todoTarget) return;
  const taskIndex: number = todoTarget.tasks.findIndex((task) => task.id === taskId);
  todoTarget.tasks.splice(taskIndex, 1);
  if (todoTarget.tasks.length <= 0)
    setDisabledClassToButton({
      todoId: todoTarget.id,
      settings: [
        { selector: "#pending-btn", disabled: true },
        { selector: "#empty-btn", disabled: true },
      ],
    });
  const task = document.getElementById(taskId) as HTMLDivElement;
  task.classList.add("fadeOut");
  task.addEventListener("animationend", () => {
    task.remove();
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
