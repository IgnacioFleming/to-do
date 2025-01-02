import { TASK, TODO } from "../types/todo";

export const renderTasks = (tasks: TASK[], todo: HTMLDivElement) => {
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
    <input type="checkbox" />
    <div class="taskText">${task.text}</div>
    `;
    todo.appendChild(taskDiv);
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
  });
};
