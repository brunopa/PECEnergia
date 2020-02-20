import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessagesComponent } from '../directives/messages/messages.component';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AppCommonsService {

  httpErrorsInfo = {
    "DbUpdateException": {
      "DELETE": "Erro ao excluir o registro. Registro pode estar sendo usado em outra tabela"
    },
    "DbConflictException": {
      "GET": "Erro de conflito no banco de dados."
    },    
    "InvalidUserException": {
      "DELETE": "Sua sessão expirou. Por Favor faça logoff em seguida login.",
      "POST": "Sua sessão expirou. Por Favor faça logoff em seguida login.",
      "PUT": "Sua sessão expirou. Por Favor faça logoff em seguida login.",
      "GET": "Sua sessão expirou. Por Favor faça logoff em seguida login."
    }
  };

  constructor(private messageService: MessagesComponent) { }

  private getExceptionInfo(error: any): string {

    var message = "Ocorreu um erro";

    if (error.status == 401) {
      message = this.httpErrorsInfo["InvalidUserException"].GET;
    } 
    else if (error.status == 409) {
      message = this.httpErrorsInfo["DbConflictException"].GET;
    }
    else if (error.error && this.httpErrorsInfo[error.error.exceptionType]) {
      if (this.httpErrorsInfo[error.error.exceptionType][error.error.originalMethod]) {
        message = this.httpErrorsInfo[error.error.exceptionType][error.error.originalMethod];
      }
    }
    else if (error.error) {
      message = "Ocorreu um erro:" + error.message;
    }
    return message;
  }

  public handleError<T>() {
    return (error: any): Observable<T> => {
      let info = this.getExceptionInfo(error);
      this.messageService.alert(info);
      console.log(error);
      return of(null as T);
    };
  }
}

export const DATA_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    //dateInput: 'LL',
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

