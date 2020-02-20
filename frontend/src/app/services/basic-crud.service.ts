import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppCommonsService } from './app-commons.service';
import { MessagesComponent } from '../directives/messages/messages.component';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { RequestCacheService } from 'src/app/services/cache/RequestCacheService';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService {
  private _path: string;


  get path(): string {
    return this._path;
  }
  set path(_path: string) {
    this._path = _path;
  }

  setPath(_path: string) {
    this.path = _path;
    return this;
  }

  constructor(
    private http: HttpClient,
    private commons: AppCommonsService,
    private messageService: MessagesComponent,
    private auth: AuthenticationService,
    private _cacheSlots: RequestCacheService) { }


  search<T>(terms: {}): Observable<T> {
    var params = new HttpParams();

    for (let key in terms) {
      params = params.set(key, terms[key]);
    }

    var header = this.auth.getHeader();

    const options =
    {
      params: params,
      headers: header.headers
    };

    return this.http.get<T>(environment.urlBase + this.path, options);
  }

  post<T>(object: T): Observable<T> {
    return this.http.post<T>(environment.urlBase + /*"Post" +*/ this.path, object, this.auth.getHeader());
  }

  put<T>(id: string, object: T): Observable<T> {
    return this.http.put<T>(environment.urlBase + this.path + "/" + id, object, this.auth.getHeader());
  }

  get<T>(id: string): Observable<T> {
    return this.http.get<T>(environment.urlBase + /*"Get" +*/ this.path + "/" + id, this.auth.getHeader());
  }

  delete<T>(id: string): Observable<T> {
    return this.http.delete<T>(environment.urlBase + /*"Delete" +*/ this.path + "/" + id, this.auth.getHeader());
  }

  public SendBinary(data: FormData, url: string) {
    var id= "0"
    var type="type" ;
    var auth = this.auth.getHeader();
    auth["reportProgress"] = true;
    const uploadReq = new HttpRequest('POST', environment.urlBase + url, 
    data, auth);

    return this.http.request(uploadReq);

    //return this.http.post(environment.urlBase + 'helper/SendBinary', data);
  }

  getGenericPath<T>(path: string) {
    return this.http
      .get<T>(environment.urlBase + path, this.auth.getHeader());
  }


  getGenericPathParams<T>(_params: Object): Observable<T> {
    var params = new HttpParams();

    for (let key in _params) {
      params = params.set(key, _params[key]);
    }

    var header = this.auth.getHeader();

    const options =
    {
      params: params,
      headers: header.headers
    };

    return this.http.get<T>(environment.urlBase + this.path, options);
  }


  getGenericPathCache<T>(path: string): ReplaySubject<T> {
    var cacheSlot = this._cacheSlots.get<ReplaySubject<T>>(path);

    if (!(cacheSlot)) {
      this._cacheSlots.set(path, new ReplaySubject<T>());
      cacheSlot = this._cacheSlots.get<ReplaySubject<T>>(path);
      this.getGenericPath<T>(path).subscribe(e => {
        cacheSlot.next(e);
      });
    }
    return cacheSlot;
  }
}
