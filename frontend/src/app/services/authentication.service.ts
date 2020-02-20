import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AppCommonsService } from './app-commons.service';
import { User } from '../models/user';
import { MessagesComponent } from '../directives/messages/messages.component';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  public userSubject = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
    private commons: AppCommonsService,
    private messageService: MessagesComponent) {

  }

  setTheme(userId: number, theme: string) {
    return this.http.get(environment.urlBase + 'users/SetTheme/?userId=' + userId + '&theme=' + theme,
      this.getHeader());
  }


  login(email: string, password: string) {
    return this.http.post<User>(environment.urlBase + 'users/authenticate/', { email: email, password: password })
      .pipe(
        tap((response: User) => {
          let user = response;
          if (user/* && user.token*/) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
          }
        }),
        catchError(this.handleError())
      );
  }

  public getHeader() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var params = new HttpHeaders();
    params = params.set("Authorization", 'Bearer ' + currentUser.token);
    const options = { headers: params };
    return options;
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if ((error as HttpErrorResponse).status == 401) {
          this.messageService.alert("Login ou Senha inválido");
        }
        else {
          this.messageService.alert("Erro:" + error.message);
        }
        console.log(error);
      }
      return of(null as T);
    };
  }

  getCurrentUser(): User {

    //todo: fazer buffer parseado e etc
    if (this.isLogged()) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }

  isLogged() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
}
