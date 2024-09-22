import { Task } from "./task";

export enum Tag {
    Education,
    Emergency,
    Financial,
    Fun,
    General,
    Health,
    Hobby,
    Holidays,
    Social,
    Travel,
    Work,
}

export interface CreateToDoListParams {
    title: string;
    description?: string;
    tag?: Tag | undefined;
    endDate?: Date;
}

interface OtherToDoListProperties {
    id: number;
    tasks: Task[];
    completed: boolean;
}

export type ToDoList = CreateToDoListParams & OtherToDoListProperties;