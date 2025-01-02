import { renderTodos } from "./todos/rendering.ts";
import { createTodo } from "./todos/todoActions.ts";

renderTodos();
const addToDo = document.getElementById("addToDo") as HTMLButtonElement;
addToDo.addEventListener("click", createTodo);
