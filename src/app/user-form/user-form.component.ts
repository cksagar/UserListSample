import { User } from './../models/user';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  langArr = ["German", "Spanish", "French", "English(UK)", "English(US)"];
  user: User;
  tomorrow = new Date();

// creating userForm using Reactive way.
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    lang: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
  });

  get name() {
    return this.userForm.get('name');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get lang() {
    return this.userForm.get('lang');
  }


  constructor(private service: UserService,
    private router: Router) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit() {
  }

  // submitting form
  submitForm() {
    this.user = this.userForm.value;
    this.service.addUser(this.user);
    this.router.navigate(['user-list']);
    this.userForm.reset();
  }
}
