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
  tasks: TASK[];
};

type ButtonSettings = {
  selector: string;
  toggle?: boolean;
};

export type SetToggleButton = {
  todoId: TodoID;
  settings: ButtonSettings[];
};
