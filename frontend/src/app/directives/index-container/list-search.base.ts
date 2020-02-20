import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { Router } from "@angular/router";
import { BasicCrudService } from "../../services/basic-crud.service";
import { FormGroup } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MessagesComponent } from '../messages/messages.component';


export class IndexBaseContainerComponent {
  public carregadoSubject: BehaviorSubject<boolean>;
  lista: any[]

  @Output() dataSubject: BehaviorSubject<any[]>;


  constructor(
    public newPath: string,
    public path: string,
    public router: Router,
    public crudService: BasicCrudService,
    public message: MessagesComponent,    
    public searchParameters: () => {}
  ) {
    this.dataSubject = new BehaviorSubject<any[]>(null);
  }

  search(): void {
    this.crudService
      .setPath(this.path)
      .search<any[]>(this.searchParameters())
      .subscribe(lista => this.dataSubject.next(lista));
  }

  _new(): void {
    this.router.navigate([this.newPath]);
  }

  delete(id: number): void {
    this.crudService
      .setPath(this.path)
      .delete(id.toString())
      .pipe(
        tap(data => {
          this.message.alert("Registro excluido com sucesso");
          this.search();
        }),
        catchError((error: HttpResponse<any>) => { return of(error); })
      )
      .subscribe(); 
  }

  edit(id: number): void {
    this.router.navigate([this.path + "/" + id.toString()]); 
  }
}
