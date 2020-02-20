import { tap, catchError, map } from 'rxjs/operators';
import { Router, ParamMap } from '@angular/router';
import { BasicCrudService } from '../../services/basic-crud.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MessagesComponent } from '../messages/messages.component';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
export class FormBaseContainerComponent<T> implements OnInit {
  public carregadoSubject: BehaviorSubject<boolean>;
  public entityPostedSubject: BehaviorSubject<T>;
  @Input()
  public entity: T;
  errorMessage: string;

  constructor(
    public router: Router,
    public crudService: BasicCrudService,
    public returnUrl: string,
    public servicePath: string,
    public getEntity: () => T,
    public getNewEntity: () => T,
    public getEntityId: () => number,
    public currentId: number,
    public message: MessagesComponent
  ) {
    this.carregadoSubject = new BehaviorSubject<boolean>(false);
    this.entityPostedSubject = new BehaviorSubject<T>(null);
    this.entity = getNewEntity();
  }


  cancel(): void {
    this.return_();
  }

  return_():void{
    this.entity = this.getNewEntity();//todo: /entity/0 >> voltar >> incluir >> controles ja preenchidos continuavam preenchidos
    this.router.navigate([this.returnUrl]); 
  }

  validate(){
    return [];
  }
 
  save(): void {
    let erros = this.validate();

    if((erros||[]).length>0){
      erros.forEach((t,i,a)=>
        this.message.alert(t)
      );
      return;
    }

    this.errorMessage = "";
    if (this.getEntityId() > 0) {
      this.crudService
        .setPath(this.servicePath)
        .put<T>(this.getEntityId().toString(), this.getEntity())
        .pipe(
          tap(data => {
            this.message.alert("Registro alterado com sucesso");
            this.entityPostedSubject.next(data);
            this.return_();
          }),
          catchError((error: HttpResponse<any>) => { return of(error); })
        )
        .subscribe();
    }
    else {
      this.crudService
        .setPath(this.servicePath)
        .post<T>(this.getEntity())
        .pipe(
          tap(data => {
            this.message.alert("Registro inserido com sucesso");
            this.entityPostedSubject.next(data);
            this.return_();
          }),
          catchError((error: HttpResponse<any>) => { return of(error); })
        )
        .subscribe();
    }
  }

  ngOnInit() {
    this.errorMessage = "Carregando...";

    if (this.currentId > 0) {
      this
        .crudService
        .setPath(this.servicePath)
        .get<T>(this.currentId.toString())
        .subscribe(
          entity => {
            this.entity = entity;
            this.carregadoSubject.next(true);
          },
          err => {
            this.carregadoSubject.error(err.message);
            this.errorMessage = err.message;
          },
        );
    }
    else {
      this.entity = this.getNewEntity();
      this.carregadoSubject.next(true);
    }
  }

  public carregarId(id: number){
    
  }

}
