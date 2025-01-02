import { STATUS } from "../enums/enums";
import { TODO, TodoID } from "../types/todo";
import { createTask, deleteTask, handleTaskCheck } from "./taskActions";
import { todos } from "./todos";

export const renderTasks = (id: TodoID) => {
  const tasksSection = document.getElementById(id)?.querySelector(".tasks") as HTMLDivElement;
  tasksSection.innerHTML = "";
  const todo: TODO | undefined = todos.find((el) => el.id === id);
  if (todo) {
    todo.tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.id = task.id;
      taskDiv.innerHTML = `
      <input type="checkbox" ${task.status === STATUS.COMPLETED ? "checked" : ""} />
      <div class="textContainer">
      <div class="taskText">
      <p>${task.text}</p>
      </div>
      </div>
      <div class="deleteIcon" >
      <img src="/icons/icon-delete.svg" />
      </div>
      `;
      tasksSection.appendChild(taskDiv);
      const checkbox = taskDiv.querySelector(`input`) as HTMLInputElement;
      checkbox.addEventListener("click", () => handleTaskCheck(id, task.id));
      const deleteIcon = taskDiv.querySelector(".deleteIcon") as HTMLDivElement;
      deleteIcon.addEventListener("click", () => deleteTask(task.id));
    });
  }
  console.log(todos);
};

export const renderTodos = () => {
  const todosSection = document.getElementById("todos") as HTMLDivElement;
  todosSection.innerHTML = "";
  todos.forEach((todo: TODO) => {
    const newTodo = document.createElement("div") as HTMLDivElement;
    newTodo.className = "todo";
    newTodo.id = todo.id;
    newTodo.innerHTML = `
                <div class="newTask">
                    <input type="text" />
                </div>
                <div class="tasks"></div>
                    `;
    todosSection.appendChild(newTodo);
    renderTasks(todo.id);
    const input = document.getElementById(todo.id)?.querySelector(".newTask input") as HTMLInputElement;
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement;
          createTask(target?.value, todo.id);
        }
      });
    }
  });
};
