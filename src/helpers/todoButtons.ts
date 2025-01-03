import { SetClassToButton } from "../types/todo";

export const setToggleClasstoTodo = ({ todoId, settings }: SetClassToButton) => {
  const todoElement = document.getElementById(todoId) as HTMLDivElement;
  settings.forEach(({ selector, toggle = false }) => {
    const button = todoElement.querySelector(selector) as HTMLButtonElement;
    return toggle ? button.classList.add("toggled") : button.classList.remove("toggled");
  });
};

export const setDisabledClassToButton = ({ todoId, settings }: SetClassToButton) => {
  const todoElement = document.getElementById(todoId) as HTMLDivElement;
  settings.forEach(({ selector, disabled = false }) => {
    const button = todoElement.querySelector(selector) as HTMLButtonElement;
    return disabled ? button.setAttribute("disabled", "") : button.removeAttribute("disabled");
  });
};
