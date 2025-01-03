import { STATUS } from "../enums/enums";
import { TODO, TodoID } from "../types/todo";
import { renderTasks, renderTodos } from "./rendering";
import { todos } from "./todos";

export const createTodo = () => {
  const todo: TODO = {
    id: crypto.randomUUID(),
    tasks: [],
  };
  todos.push(todo);
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const deleteAll = () => {
  todos.splice(0);
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const deleteTodo = (todoId: TodoID) => {
  const todoIndex: number = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
export const filterPendingTasks = (todoId: TodoID) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    const filteredTasks = todoTarget.tasks.filter((task) => task.status === STATUS.PENDING);
    const todoElement = document.getElementById(todoId) as HTMLDivElement;
    const filterPendingBtn = todoElement.querySelector("#pending-btn") as HTMLButtonElement;
    const filterAllBtn = todoElement.querySelector("#all-btn") as HTMLButtonElement;
    filterAllBtn.classList.remove("toggled");
    filterPendingBtn.classList.add("toggled");
    renderTasks(todoId, filteredTasks);
  }
};

export const showAllTasks = (todoId: TodoID) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    renderTasks(todoId);
    const todoElement = document.getElementById(todoId) as HTMLDivElement;
    const filterAllBtn = todoElement.querySelector("#all-btn") as HTMLButtonElement;
    const filterPendingBtn = todoElement.querySelector("#pending-btn") as HTMLButtonElement;
    filterAllBtn.classList.add("toggled");
    filterPendingBtn.classList.remove("toggled");
  }
};

export const emptyTasks = (todoId: TodoID) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    todoTarget.tasks = [];
    renderTasks(todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
