import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { error } from 'console';
import { Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister: any = new EventEmitter();
  model: any = {};
  authForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  register() {
    console.log(this.model);
    console.log(this.authForm.get('username')?.value);
    console.log(this.authForm.get('password')?.value);

    const username = this.authForm.get('username')?.value;
    const password = this.authForm.get('password')?.value;
    const credentials = { username, password };
    console.log(credentials);

    const observer: Observer<any> = {
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (error) => this.toastr.error(error.error),
      complete: () => {}, // Możesz dodać logikę, jeśli potrzebujesz obsługi zdarzenia complete
    };

    this.accountService.register(credentials).subscribe(observer);
  }

  cancel() {
    console.log('cancel');
    this.cancelRegister.emit(false);
  }
}
