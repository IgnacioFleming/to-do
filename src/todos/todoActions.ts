import { TODO } from "../types/todo";
import { renderTodos } from "./renderTodos";

export const createTodo = (todos: TODO[]) => {
  const todo: TODO = {
    id: crypto.randomUUID(),
    tasks: [],
  };
  todos.push(todo);
  renderTodos(todos);
  console.log(todos);
};
