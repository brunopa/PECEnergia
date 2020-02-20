import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicCrudService } from '../../services/basic-crud.service';
import { IndexBaseContainerComponent } from '../../directives/index-container/list-search.base';
import { MessagesComponent } from '../../directives/messages/messages.component';
@Component({
  selector: 'app-ficha-index',
  templateUrl: './ficha.index.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaIndexComponent extends IndexBaseContainerComponent implements OnInit {
  nome: string;

  constructor(public crudService: BasicCrudService, public router: Router, public message: MessagesComponent) {
    super(
      "/fichas/0",
      "fichas",
      router,
      crudService,
      message,
      () => { return { nome: this.nome } }
    );
  }

  ngOnInit() {
  }
  
}
