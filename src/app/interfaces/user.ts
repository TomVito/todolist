import { Task } from "./task";

export interface User {
    id?: number,
    name: string,
    email: string,
    picture?: string,
    tasks?: Task
}
