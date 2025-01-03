import { STATUS } from "../enums/enums";
import { setDisabledClassToButton, setToggleClasstoTodo } from "../helpers/todoButtons";
import { TODO, TodoID } from "../types/todo";
import { renderTasks, renderTodos } from "./rendering";
import { todos } from "./todos";

export const createTodo = () => {
  const todo: TODO = {
    id: crypto.randomUUID(),
    title: "New To Do",
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
    setToggleClasstoTodo({ todoId, settings: [{ selector: "#all-btn" }, { selector: "#pending-btn", toggle: true }] });
    renderTasks(todoId, filteredTasks);
  }
};

export const showAllTasks = (todoId: TodoID) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    setToggleClasstoTodo({ todoId, settings: [{ selector: "#all-btn", toggle: true }, { selector: "#pending-btn" }] });
    renderTasks(todoId);
  }
};

export const emptyTasks = (todoId: TodoID) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    setToggleClasstoTodo({ todoId, settings: [{ selector: "#all-btn", toggle: true }, { selector: "#pending-btn" }] });
    todoTarget.tasks = [];
    setDisabledClassToButton({
      todoId,
      settings: [
        { selector: "#pending-btn", disabled: true },
        { selector: "#empty-btn", disabled: true },
      ],
    });
    renderTasks(todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

export const checkTodoHasTasks = (todo: TODO): boolean => {
  if (!todo) return false;
  return todo.tasks.length <= 0 ? false : true;
};

const setTitle = (todoId: TodoID, title: string) => {
  const todoTarget: TODO | undefined = todos.find((el) => el.id === todoId);
  if (todoTarget) {
    todoTarget.title = title;
  }
};

export const setTitleEditable = (todoId: TodoID) => {
  console.log("double click");
  const titleContainer = document.getElementById(todoId)?.querySelector(".container header div") as HTMLDivElement;
  titleContainer.innerHTML = `
    <input type="text" class="titleInput" placeholder="Title" / >
  `;
};
