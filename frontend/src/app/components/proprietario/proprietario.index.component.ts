import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicCrudService } from '../../services/basic-crud.service';
import { IndexBaseContainerComponent } from '../../directives/index-container/list-search.base';
import { MessagesComponent } from '../../directives/messages/messages.component';
@Component({
  selector: 'app-proprietario-index',
  templateUrl: './proprietario.index.component.html',
  styleUrls: ['./proprietario.component.css']
})
export class ProprietarioIndexComponent extends IndexBaseContainerComponent implements OnInit {
  nome: string;

  constructor(public crudService: BasicCrudService, public router: Router, public message: MessagesComponent) {
    super(
      "/proprietarios/0",
      "proprietarios",
      router,
      crudService,
      message,
      () => { return { nome: this.nome } }
    );
  }

  ngOnInit() {
  }
  
}
