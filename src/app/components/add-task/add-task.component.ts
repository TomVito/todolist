import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public task : Task = {
    title: "",
    author: "",
    completed: false,
    priority: "",
    user_id: 0
  }

  public priorities : string[] = ['low', 'medium', 'high'];

  public users : User[] = [];

  @Output() newItemEvent = new EventEmitter();

  constructor(private _taskService : TaskService, private _userService : UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe((data : any) => {
      this.users = data;
    });
  }

  taskCreate(form : NgForm) {
    if(form.valid){
      this._taskService.createTask(this.task)
      .subscribe((data : any) =>{
        form.resetForm();
        this.newItemEvent.emit(data);
      });
    } else {
      alert("Please enter your task data");
    }
  }
}
