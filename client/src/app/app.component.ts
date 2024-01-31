import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: any;
  error: any;
  serverMessage?: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
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

  title = 'client';
}
