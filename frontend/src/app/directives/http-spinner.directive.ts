import { Directive, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable,of } from 'rxjs';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AppCommonsService } from '../services/app-commons.service';

@Directive({
  selector: '[appHttpSpinner]'
})
export class HttpSpinnerDirective {
  constructor(el: ElementRef) {
    //;

    //HttpSpinnerInterceptor.subject.subscribe(visible => {if(visible) el.nativeElement.style.display = !visible ? "block" : "none"; alert(visible); });
    HttpSpinnerInterceptor.subject.subscribe(
      visible => {
        if (visible) {
          el.nativeElement.style.visibility = 'visible';
        }
        else {
          el.nativeElement.style.visibility = 'hidden';
        }

      }
    );
  }
}

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {

  static subject = new BehaviorSubject<boolean>(false);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    HttpSpinnerInterceptor.subject.next(true);

    return next
      .handle(req)
      .pipe(
        tap(data => { 
          if (data.type != 0)
            HttpSpinnerInterceptor.subject.next(false);
        }), 

       catchError((error: HttpResponse<any>) => {
          HttpSpinnerInterceptor.subject.next(false)
          this.commons.handleError()(error);
          return throwError("erro");
          //return of(error);
          //return Observable.of({error: true})
          //return Observable.throw(error);
        }) 
      );
  }
  constructor(private commons: AppCommonsService) {
  }
}
