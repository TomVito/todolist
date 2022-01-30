import { Component, OnInit } from '@angular/core';

import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public tasks : Task[] = [];

  constructor(private _taskService : TaskService) {
    this._taskService.getTasks().subscribe((data : Task[]) => {
      this.tasks = data;
    });
  }

  ngOnInit(): void {
  }

}
