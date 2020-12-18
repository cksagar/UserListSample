import { Subscription } from 'rxjs';
import { User } from './../models/user';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  userSubscription: Subscription;

  constructor(private service: UserService) { }

  ngOnInit(): void {

    // getting usersList data from Subject.
    this.userSubscription = this.service.userSubject.subscribe(
      res => {
        this.users = res;
      }
    );
    this.users = this.service.getUser();
  }
}
