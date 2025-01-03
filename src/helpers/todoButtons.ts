import { SetToggleButton } from "../types/todo";

export const setToggleClass = ({ todoId, settings }: SetToggleButton) => {
  const todoElement = document.getElementById(todoId) as HTMLDivElement;
  settings.forEach(({ selector, toggle = false }) => {
    const button = todoElement.querySelector(selector) as HTMLButtonElement;
    toggle ? button.classList.add("toggled") : button.classList.remove("toggled");
  });
};
