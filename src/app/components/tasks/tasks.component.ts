import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public tasks : Task[] = [];
  public showTaskDetails : boolean = false;
  public selectedTask : Task | null = null;

  constructor(private _taskService : TaskService, private _userService : UserService) {
   this.getTasks();
  }

  toggleTaskDetails(task: Task | null, close: boolean = false) {

    if ((this.selectedTask == task || this.showTaskDetails == false) || this.selectedTask == null) {
      this.showTaskDetails = !this.showTaskDetails;
    }
    if (close) {
      this.showTaskDetails = false;
    }
    this.selectedTask = task;
    if (this.showTaskDetails == false) {
      this.selectedTask = null;
    }
  }

  ngOnInit(): void {
  }

  getTasks() {
    forkJoin([
      this._taskService.getTasks(),
      this._userService.getUsers()
    ])
    .pipe(
      map(([ tasks, users ]) => {
        return tasks.map(task => {
          task.title = task.title.toUpperCase();
          task.user = users.filter(user => user.id == task.user_id)[0];
          return task;
        });
      })
    )
    .subscribe((tasks : Task[]) => {
      this.tasks = tasks;
    });
    // this._taskService
    //   .getTasks(true)
    //   .subscribe((data: Task[]) => {
    //     this.tasks = data;
    //   });
  }

  toggleTask(task : Task) {
    task.completed = !task.completed;
    this._taskService.toggleTask(task).subscribe((data : any) => {
    });
  }

  deleteTask(task: Task) {
    let userAction = confirm("Do you realy want to delete " + task.title + "?");

    if(userAction) {

   
    this._taskService.deleteTask(task).subscribe(data => {
        this.getTasks();
      });
    }
  }
}
