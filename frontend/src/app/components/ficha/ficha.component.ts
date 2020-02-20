import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Proprietario } from '../../models/proprietario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ViewChild } from '@angular/core';
import { MatTable, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
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
import { ProprietarioComponent } from '../proprietario/proprietario.component';
import { WindowRef } from 'src/app/services/WindowRef ';
import { DBEntityState } from 'src/app/models/IEntityBase';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent extends FormBaseContainerComponent<Ficha> implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public crudService: BasicCrudService,
    public webHelper: WebHelperService,
    public message: MessagesComponent,
    public windowRef: WindowRef,
    public dialog: MatDialog
  ) {
    super(
      router,
      crudService,
      "/fichas",
      "fichas",
      () => this.entity,
      () => new Ficha(),
      () => this.entity.id,
      +route.snapshot.paramMap.get('id'),
      message
    );
  }


  openDialogProprietario(prop: Proprietario) {
    const dialogRef = this.dialog.open(ProprietarioComponent, {
      width: '95%',
      data: {
        proprietario: prop,
      },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  excluirProprietario(prop: Proprietario, i: number){
    prop.state = DBEntityState.deleted;
  }
}
