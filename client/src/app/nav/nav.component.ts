import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authForm!: FormGroup;

  // currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;

    // this.getCurrentUser();
    this.authForm = new FormGroup({
      userDataGroup: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(null, Validators.required),
      }),
    });
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe((res) => {
  //     console.log(`CurrentUserGET ${res}`);
  //     console.log(`CurrentUserGET ${!!res}`);
  //     this.loggedIn = !!res;
  //   });
  // }

  login() {
    const userModel = this.authForm.value.userDataGroup;
    const username = this.authForm.get('userDataGroup.username')?.value;
    const password = this.authForm.get('userDataGroup.password')?.value;
    console.log(this.authForm.value.userDataGroup);
    console.log(username);
    console.log(password);
    this.accountService.login(userModel).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => console.log(error)
    );
  }
  logOut() {
    this.accountService.logout();
  }
}
