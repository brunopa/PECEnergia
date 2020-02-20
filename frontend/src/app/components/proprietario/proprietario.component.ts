import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Proprietario } from '../../models/proprietario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ViewChild } from '@angular/core';
import { MatTable, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BasicCrudService } from '../../services/basic-crud.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged,
} from 'rxjs/operators';
import { FormBaseContainerComponent } from '../../directives/form-container/form-container.base';
import { WebHelperService } from '../../services/web-helper.service';
import { MessagesComponent } from '../../directives/messages/messages.component';
import { Ficha } from 'src/app/models/ficha';

@Component({
  selector: 'app-proprietario',
  templateUrl: './proprietario.component.html',
  styleUrls: ['./proprietario.component.css']
})
export class ProprietarioComponent extends FormBaseContainerComponent<Proprietario> implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public crudService: BasicCrudService,
    public webHelper: WebHelperService,
    public message: MessagesComponent,
    public dialogRef: MatDialogRef<ProprietarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { proprietario: Proprietario}) {
    super(
      router,
      crudService,
      "/proprietarios",
      "proprietarios",
      () => this.entity,
      () => new Proprietario(),
      () => this.entity.id,
      +route.snapshot.paramMap.get('id'),
      message
    );
    this.entity = this.dialogData.proprietario;
  }


  buscaCep(cep: string, endereco: Proprietario) {
    event.stopPropagation();
    event.preventDefault();

    this.webHelper
      .ConsultarCEP(cep)
      .subscribe(
        (consulta) => {
          endereco.estado = consulta.estado;
          endereco.cidade = consulta.cidade;
          endereco.bairro = consulta.bairro;
          endereco.endereco = consulta.endereco;
          endereco.numero = "";
          endereco.complemento = consulta.complemento;
        },
        e => { });
    return false;
  }


  return_() {

    var ret ={};


    this.dialogRef.close({
      novo: ((this.entity.id || 0) == 0),
      obraSetor: ret
    });
  }

  cancel() {
    this.dialogRef.close();
    //super.cancel();
  }
}
