import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public user : User = {
    name: "",
    email: ""
  }

  @Output() newItemEvent = new EventEmitter();

  constructor(private _userService : UserService) { }

  ngOnInit(): void {
  }

  userCreate(form : NgForm) {
    if(form.valid) {
      this._userService.createTask(this.user)
      .subscribe((data : any) =>{
        this.newItemEvent.emit(data);
      });
    } else {
    alert("Please enter your user data")
    }
  }
}