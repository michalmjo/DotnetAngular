import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authForm!: FormGroup;

  // currentUser$: Observable<User | null> = of(null);

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

    this.accountService.login(userModel).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl('/members');
      },
      (error) => this.toastr.error(error.error)
    );
  }
  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
