import { User } from './models/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

  users: User[] = [];
  maleCountSubject = new Subject<number[]>();
  userSubject = new Subject<User[]>();

  constructor() { }

  // adding user to users array;
  addUser(userObj: User) {
    this.users.push(userObj);
    this.userSubject.next(this.users.slice());
    this.calculateGenderCount();
  }

  // passing values to subject.
  triggerSub(maleCount, femaleCount) {
    let countArray = [maleCount, femaleCount]
    this.maleCountSubject.next(countArray);
  }

  // calculate male, female count
  calculateGenderCount() {
    let maleCount = 0;
    let femaleCount = 0;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].gender === "female") {
        femaleCount++
      } else {
        maleCount++
      }
    }
    this.triggerSub(maleCount, femaleCount);
  }

  getUser() {
    return this.users.slice();
  }
}