import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users : User[] = [];
  public showUserDetails : boolean = false;
  public selectedUser : User | null = null;

  constructor(private _userService : UserService) {
    this.getUsers();
  }

  toggleUserDetails(user: User | null, close: boolean = false) {

    if ((this.selectedUser == user || this.showUserDetails == false) || this.selectedUser == null) {
      this.showUserDetails = !this.showUserDetails;
    }
    if (close) {
      this.showUserDetails = false;
    }
    this.selectedUser = user;
    if (this.showUserDetails == false) {
      this.selectedUser = null;
    }
  }

  ngOnInit(): void {
  }

  getUsers() {
    this._userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  deleteUser(user: User) {
    let userAction = confirm("Do you really want to delete user " + user.name + "?");

    if(userAction) {
      this._userService.deleteUser(user).subscribe(data => {
        this.getUsers();
      });
    }
  }
}