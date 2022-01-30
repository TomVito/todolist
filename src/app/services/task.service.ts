import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl : string = 'http://localhost:3000/tasks/';
  constructor(private http : HttpClient) { }

  getTasks(withUserData : boolean = false) : Observable<Task[]> {
    let uri = this.apiUrl;

    // if(withUserData) {
    //   // uri += "?_expand=user";
    // }
    return this.http.get<Task[]>(uri);
  }

  getTask(id: string | null) {

    let data = this.http.get(this.apiUrl + "/" + id);

    return data;

  }

  toggleTask(task : Task) {
    let uri = this.apiUrl + "/" + task.id;
    uri = `${this.apiUrl}/${task.id}`;
    // let body = { completed: task.completed }
    return this.http.patch(uri, task);
    // return this.http.patch(uri, body);
  }

  createTask(task : Task) {
    let uri = this.apiUrl

    return this.http.post(uri, task);

  }

  updateTask() {

  }

  deleteTask(task: Task) {
    let uri = this.apiUrl + "/" + task.id;

    return this.http.delete(uri)
  }

}
