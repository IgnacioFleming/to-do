import { TASK, TODO } from "../types/todo";
import { createTask } from "./taskActions";

export const renderTasks = (tasks: TASK[], todo: HTMLDivElement) => {
  const tasksSection = todo.querySelector(".tasks") as HTMLDivElement;
  tasksSection.innerHTML = "";
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
    <input type="checkbox" />
    <div class="taskText">${task.text}</div>
    `;
    tasksSection.appendChild(taskDiv);
  });
};

export const renderTodos = (todos: TODO[]) => {
  const todosSection = document.getElementById("todos") as HTMLDivElement;
  todosSection.innerHTML = "";
  todos.forEach((todo: TODO) => {
    const newTodo = document.createElement("div");
    newTodo.className = "todo";
    newTodo.id = todo.id;
    newTodo.innerHTML = `
                <div class="newTask">
                    <input type="text" />
                </div>
                <div class="tasks"></div>
                    `;
    todosSection.appendChild(newTodo);
    renderTasks(todo.tasks, newTodo);
    const input = document.querySelector(".newTask input") as HTMLInputElement;
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement;
          createTask(target?.value, todo.id, todos);
          console.log(todos);
          // const targetTodo = document.getElementById(todo.id) as HTMLDivElement;
          // renderTasks(todos[todo.id].tasks, targetTodo);
        }
      });
    }
  });
};
