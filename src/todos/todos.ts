import { TODO } from "../types/todo";

export const todos: TODO[] = JSON.parse(localStorage.getItem("todos") || "[]");
