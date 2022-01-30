import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Output() userDetailsCloseEvent : EventEmitter<boolean> = new EventEmitter();
  @Input() user : User | null = null;
  private userId : string | null = null;
  public userTasks : Task[] | null = null;

  constructor(private _userService : UserService, private _taskService : TaskService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this._userService.getUser(this.userId).subscribe((data : User) =>{
      this.user = data;
      this.getUserTasks();
    });
  }

  getUserTasks() {
    this._taskService.getTasks()
    .pipe(
      map((tasks) => {
        return tasks.filter(task => task.user_id == this.user?.id)
      })
    )
    .subscribe(( tasks : Task[]) => {
      this.userTasks = tasks;
    });
  }

  closeUserDetails() {
    this.userDetailsCloseEvent.emit(true);
  }

}
