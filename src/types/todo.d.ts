import { STATUS } from "./todos/enums";

export type TodoID = `${string}-${string}-${string}-${string}-${string}`;
export type TaskId = TodoID;

export type TASK = {
  id: UUID;
  status: (typeof STATUS)[keyof typeof STATUS];
  text: string;
};

export type TODO = {
  id: UUID;
  title: string;
  tasks: TASK[];
};

type ButtonSettings = {
  selector: string;
  toggle?: boolean;
  disabled?: boolean;
};

export type SetClassToButton = {
  todoId: TodoID;
  settings: ButtonSettings[];
};

export type RenderTodoOptions = {
  todo: TODO;
  animate?: boolean;
};
