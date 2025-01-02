import { STATUS } from "../enums/enums";
import { TODO } from "../types/todo";

export const todos: TODO[] = [
  {
    id: crypto.randomUUID(),
    tasks: [
      {
        id: crypto.randomUUID(),
        status: STATUS.COMPLETED,
        text: "Primer tarea",
      },
      {
        id: crypto.randomUUID(),
        status: STATUS.PENDING,
        text: "Segunda tarea",
      },
    ],
  },
];
