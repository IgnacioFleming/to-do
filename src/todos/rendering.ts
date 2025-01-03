import { STATUS } from "../enums/enums";
import { setDisabledClassToButton } from "../helpers/todoButtons";
import { TASK, TODO, TodoID } from "../types/todo";
import { createTask, deleteTask, handleTaskCheck } from "./taskActions";
import { deleteTodo, emptyTasks, filterPendingTasks, setTitleEditable, showAllTasks } from "./todoActions";
import { todos } from "./todos";

export const renderTasks = (id: TodoID, filteredTasks?: TASK[]) => {
  const tasksSection = document.getElementById(id)?.querySelector(".tasks") as HTMLDivElement;
  tasksSection.innerHTML = "";
  const todo: TODO | undefined = todos.find((el) => el.id === id);
  if (todo) {
    const tasks = filteredTasks || todo.tasks;
    tasks.forEach((task) => {
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
      <img src="/icons/deleteIcon.svg" alt="icon" />
      </div>
      `;
      tasksSection.appendChild(taskDiv);
      const checkbox = taskDiv.querySelector(`input`) as HTMLInputElement;
      checkbox.addEventListener("click", () => handleTaskCheck(id, task.id));
      const deleteIcon = taskDiv.querySelector(".deleteIcon") as HTMLDivElement;
      deleteIcon.addEventListener("click", () => deleteTask(task.id));
    });
  }
};

export const renderTodos = () => {
  const todosSection = document.getElementById("todos") as HTMLDivElement;
  todosSection.innerHTML = "";
  todos.forEach((todo: TODO) => {
    const newTodo = document.createElement("div") as HTMLDivElement;
    newTodo.className = "todo";
    newTodo.id = todo.id;
    newTodo.innerHTML = `   
      <div class="container">
        <header>
          <div>
          <h1>${todo.title}</h1>
          <div class="deleteTodo">
           <img src="/icons/deleteIcon.svg" alt="icon" />
          </div>
          </div>
          <div class="newTask">
          <input type="text" />
          </div>
        </header>
        <section class="tasksContainer">
          <div class="tasks"></div>
          <div>
        </section>
        <footer>
          <button class="toggled" id="all-btn">All</button>
          <button id="pending-btn">Pending</button>
          <button id="empty-btn">Empty All</button>
        </footer>
      </div>
                    `;
    todosSection.appendChild(newTodo);
    if (todo.tasks.length <= 0)
      setDisabledClassToButton({
        todoId: todo.id,
        settings: [
          { selector: "#pending-btn", disabled: true },
          { selector: "#empty-btn", disabled: true },
        ],
      });
    renderTasks(todo.id);
    const todoDiv = document.getElementById(todo.id) as HTMLDivElement;
    const input = todoDiv.querySelector(".newTask input") as HTMLInputElement;
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement;
          createTask(target?.value, todo.id);
          target.value = "";
        }
      });
    }
    const pendingButton = todoDiv.querySelector("#pending-btn") as HTMLButtonElement;
    pendingButton.addEventListener("click", () => filterPendingTasks(todo.id));
    const showAllTasksButton = todoDiv.querySelector("#all-btn") as HTMLButtonElement;
    showAllTasksButton.addEventListener("click", () => showAllTasks(todo.id));
    const emptyAllTasksButton = todoDiv.querySelector("#empty-btn") as HTMLButtonElement;
    emptyAllTasksButton.addEventListener("click", () => emptyTasks(todo.id));
    const deleteTodoIcon = todoDiv.querySelector(".deleteTodo img") as HTMLSpanElement;
    deleteTodoIcon.addEventListener("click", () => deleteTodo(todo.id));
    const heading = todoDiv.querySelector(".container header div h1") as HTMLHeadingElement;
    console.log(heading);
    heading.addEventListener("dblclick", () => setTitleEditable(todo.id));
  });
};
