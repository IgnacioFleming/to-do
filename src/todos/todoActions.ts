import { TODO } from "../types/todo";
import { renderTodos } from "./renderTodos";
import { todos } from "./todos";

export const createTodo = () => {
  const todo: TODO = {
    id: crypto.randomUUID(),
    tasks: [],
  };
  todos.push(todo);
  renderTodos();
};
