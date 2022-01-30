import { User } from "./user";

export interface Task {
    id?: number,
    title: string,
    author: string,
    completed: boolean,
    priority?: string,
    user_id: number,
    userId? : number,
    user?: User
}
