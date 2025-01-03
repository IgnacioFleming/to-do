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
  renderTodos(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const deleteAll = () => {
  const todosSection = document.getElementById("todos") as HTMLDivElement;
  console.log(todosSection);
  todosSection.classList.add("growOut");
  setTimeout(() => {
    todosSection.classList.remove("growOut");
    todos.splice(0);
    todosSection.innerHTML = "";
    localStorage.setItem("todos", JSON.stringify(todos));
  }, 950);
};

export const deleteTodo = (todoId: TodoID) => {
  const todoIndex: number = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex > -1) {
    const todo = document.getElementById(todoId) as HTMLDivElement;
    todo.classList.add("growOut");
    todo.addEventListener(
      "animationend",
      () => {
        todo.remove();
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      },
      { once: true }
    );
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

const setTitle = (e: KeyboardEvent, todoId: TodoID) => {
  const todoIndex: number = todos.findIndex((el) => el.id === todoId);
  if (todoIndex > -1) {
    const target = e.target as HTMLInputElement;
    const updatedTodo = { ...todos[todoIndex] };
    updatedTodo.title = target.value;
    todos.splice(todoIndex, 1, updatedTodo);
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const cancelTitleEdit = (todoId: TodoID) => {
  const todo = todos.find((el) => el.id === todoId);
  if (todo) {
    const titleContainer = document.getElementById(todoId)?.querySelector(".container header div") as HTMLDivElement;
    titleContainer.innerHTML = `
    <h1>${todo.title}</h1>
    <div class="deleteTodo">
      <img src="/icons/deleteIcon.svg" alt="icon" />
    </div>
    `;
    const heading = titleContainer.querySelector("h1") as HTMLHeadingElement;
    heading.addEventListener("click", () => setTitleEditable(todoId));
    const deleteTodoIcon = titleContainer.querySelector(".deleteTodo img") as HTMLSpanElement;
    deleteTodoIcon.addEventListener("click", () => deleteTodo(todo.id));
  }
};

export const setTitleEditable = (todoId: TodoID) => {
  const titleContainer = document.getElementById(todoId)?.querySelector(".container header div") as HTMLDivElement;
  const title = titleContainer?.querySelector("h1")?.textContent as string;
  titleContainer.innerHTML = `
    <input type="text" class="titleInput" placeholder="Press Enter to set a new Title" value="${title}" / >
  `;
  const input = titleContainer.querySelector(".titleInput") as HTMLInputElement;
  input.focus();
  input.selectionEnd = input.value.length;
  input.addEventListener("keydown", (e) => e.key === "Enter" && setTitle(e, todoId));
  input.addEventListener("focusout", () => cancelTitleEdit(todoId));
  input.addEventListener("keydown", (e) => e.key === "Escape" && cancelTitleEdit(todoId));
};
