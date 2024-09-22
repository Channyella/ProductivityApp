import { Task } from "./task";

export interface CreateSubtaskParams {
    description: string;
    endDate?: Date;
}

interface OtherSubtaskProperties {
    id: number; 
    taskId: number;
    createDate: Date;
    completed: boolean;
    task: Task;
}

export type Subtask = CreateSubtaskParams & OtherSubtaskProperties;