import { renderTodos } from "./todos/rendering.ts";
import { createTodo, deleteAll } from "./todos/todoActions.ts";

renderTodos();
const addToDo = document.getElementById("addToDo") as HTMLButtonElement;
addToDo.addEventListener("click", createTodo);

const deleteButton = document.getElementById("deleteAll") as HTMLButtonElement;
deleteButton.addEventListener("click", deleteAll);
