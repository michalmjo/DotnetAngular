import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  baseURL = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {}

  register(model: any) {
    console.log(model);
    return this.http.post<User>(`${this.baseURL}account/register`, model).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
        console.log(user);
      })
    );
  }

  login(model: any): Observable<any> {
    return this.http.post<User>(`${this.baseURL}account/login`, model).pipe(
      map((res: User) => {
        console.log(`to jest login service, ${res}`);
        const user = res;
        console.log(user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
