import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  serverMessage?: string;
  error: any;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  registerTogle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http
      .get('https://localhost:5001/api/users', { observe: 'response' }) // Ustawienie opcji observe na 'response'
      .pipe(
        tap((response: HttpResponse<any>) => {
          // Odczytaj wiadomość z nagłówka lub treści odpowiedzi
          this.serverMessage =
            response.body?.message ||
            response.headers.get('custom-header') ||
            'Brak wiadomości z serwera';
        }),
        catchError((error) => {
          this.error = error;
          console.log('Wystąpił błąd:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe((data) => {
        console.log(data);
        console.log(data.body);
        this.users = data.body;
      });
  }

  cancelRegisterMethod(e: any) {
    console.log(e);
    this.registerMode = e;
  }
}
