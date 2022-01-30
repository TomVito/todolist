import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl : string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http : HttpClient) { }

  getPosts() : Observable<Task[]> {
    let uri = this.apiUrl
    return this.http.get<Task[]>(uri);
  }
}