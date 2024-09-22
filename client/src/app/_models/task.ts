import { Subtask } from "./subtask";
import { ToDoList } from "./toDoList";

export interface CreateTaskParams {
    description: string;    
    endDate?: Date;
}

interface OtherTaskProperties  {
    id: number;
    toDoListId: number;
    createDate: Date;
    completed: boolean;
    toDoList: ToDoList;
    subtasks: Subtask[];
}

export type Task = CreateTaskParams & OtherTaskProperties;