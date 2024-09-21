import { Subtask } from "./subtask";

export interface Task {
    description: string;
    endDate: Date;
    completed: boolean;
    subtasks: Subtask[];
}