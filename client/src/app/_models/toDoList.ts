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

export const tagPairs: [Tag, string][] = Object.entries(Tag).filter(keyValue => !isNaN(Number(keyValue[0]))).map(rawKeyValue => [Number(rawKeyValue[0]), rawKeyValue[1] as string])

export const tagMap = new Map<Tag, string>(tagPairs);

export interface CreateToDoListParams {
    title: string;
    description?: string;
    tag?: Tag | undefined;
    endDate?: Date;
}

interface OtherToDoListProperties {
    id: number;
    tasks: Task[];
}

interface OtherUpdateToDoListProperties {
    completed: boolean;
}

export type ToDoList = CreateToDoListParams & OtherToDoListProperties & OtherUpdateToDoListProperties;

export type UpdateToDoListParams = Partial<CreateToDoListParams & OtherUpdateToDoListProperties>;