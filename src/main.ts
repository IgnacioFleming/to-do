import { renderTodos } from "./todos/renderTodos.ts";
import { createTodo } from "./todos/todoActions.ts";
import { todos } from "./todos/todos.ts";

renderTodos(todos);

// const handleAddTask = (id: TodoID) => {
//   const todo = document.getElementById(id) as HTMLDivElement;
//   const taskInput = todo.querySelector<HTMLInputElement>(".newTask input");
//   if (taskInput) return createTask(taskInput.value, id);
// };

const addToDo = document.getElementById("addToDo") as HTMLButtonElement;

addToDo.addEventListener("click", () => createTodo(todos));
// createTask();
