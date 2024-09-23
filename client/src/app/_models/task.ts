import { Subtask } from "./subtask";
import { ToDoList } from "./toDoList";

export interface CreateTaskParams {
    description: string;    
    endDate?: Date;
}

interface OtherUpdateTaskProperties {
    completed: boolean;
}

type AllUpdatableTaskProperties = CreateTaskParams & OtherUpdateTaskProperties;

interface OtherTaskProperties  {
    id: number;
    toDoListId: number;
    createDate: Date;
    toDoList: ToDoList;
    subtasks: Subtask[];
}

export type Task = CreateTaskParams & OtherTaskProperties & AllUpdatableTaskProperties;

export type UpdateTaskParams = Partial<AllUpdatableTaskProperties>;

