import { UserService } from './user.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: any[];
  genderCount: number[];
  @ViewChild('addUserBtn') addUserBtn;

  maleCountSubscription: Subscription;
  userSubscription: Subscription;

  femaleCount = 0;
  maleCount = 0;
  progressValue = 0;
  count = 0;

  constructor(private service: UserService) {
  }

  // getting users from subject  
  ngOnInit() {
  
    this.userSubscription = this.service.userSubject.subscribe(
      res => {
        this.users = res;
        this.progressHandler(this.users.length);
        this.getGenderCount();
      }
    );

    this.users = this.service.getUser();
    this.getGenderCount();
    this.progressHandler(this.users.length);
  }

  // getting the male, female count
  getGenderCount() {
    this.maleCountSubscription = this.service.maleCountSubject.subscribe(res => {
      this.maleCount = res[0];
      this.femaleCount = res[1];
    });
  }

  // calculate progressbar value.
  progressHandler(count: number) {
    if (this.progressValue < 100)
      this.progressValue = count * 2;   // multiplying by 2 to simply increase the progress more.
    else
      this.addUserBtn.nativeElement.disabled = true;  // desabling add user btn after progress reach to 100.
  }

  // unsubscribe the subject.
  ngOnDestroy() {
    this.maleCountSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
