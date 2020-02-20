import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MessagesComponent } from '../messages/messages.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'data-collection',
  styleUrls: ['./data-table.component.css'],
  templateUrl: './data-table.component.html',
})

export class DataCollectionComponent implements OnInit {

  @Input() displayedColumns: any[] = [];
  @Input() showDeleteButton: Boolean = false;
  @Input() showPrintButton: Boolean = false;
  @Input() dataSubject: BehaviorSubject<any[]>;
  @Output() onRowClick = new EventEmitter<boolean>();
  @Output() onRowTrash = new EventEmitter<boolean>();
  @Output() onRowPrint = new EventEmitter<boolean>();
  @Output() onSelectMany = new EventEmitter<any[]>();
  @Input() showSelection = false;


  dataSource: MyDataSource;
  displayedColumnsFlatTools = [];
  displayedColumnsFlat = [];
  hasRows = false;
  selecaoTodos = false;
  dataRef: any[];

  constructor(private message: MessagesComponent) { }


  ngOnInit() {

    this.dataSource = new MyDataSource(this.dataSubject);
    this.displayedColumnsFlat = this.displayedColumns
      .map(function (i) { return i.field; })

    this.displayedColumnsFlatTools = this.displayedColumnsFlat.concat('tools');

    if (this.showSelection)
      this.displayedColumnsFlatTools.unshift('selection');

    this.dataSubject.subscribe((data: any[]) => {
      this.dataRef = data;

      if (data == null)
        return;

      this.hasRows = (data || []).length > 0;
      if (!this.hasRows)
        this.message.alert("Nenhum registro encontrado");
    });
  }

  selecionarTodos() {
    this.dataRef.forEach(i => {
      i.selecionado = this.selecaoTodos;
    });
    //this.dataSource.subject.value.
  }

  doneAll() {
    var sels = (this.dataRef || []).filter(i => i.selected);
    this.onSelectMany.emit(sels);
  }
}



export class MyDataSource extends DataSource<any[]> {

  constructor(public subject: BehaviorSubject<any[]>) {
    super();
  }

  connect(): Observable<any[]> {
    return this.subject.asObservable();
  }

  disconnect(): void {

  }

}

