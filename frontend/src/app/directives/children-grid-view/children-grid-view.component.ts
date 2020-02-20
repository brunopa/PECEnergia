import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { DBEntityState, IEntityBase } from "../../models/IEntityBase";

@Component({
  selector: 'children-grid-view',
  templateUrl: './children-grid-view.component.html',
  styleUrls: ['./children-grid-view.component.css']
})
export class ChildrenGridViewComponent implements OnInit {


  @Input() displayedColumns: any[] = [];
  @Input() dataSource: any[];
  @Output() onRowTrash = new EventEmitter<boolean>();

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumnsFlatTools = [];
  displayedColumnsFlat = [];

  constructor() { }


  ngOnInit() {
    this.displayedColumnsFlat = this.displayedColumns
      .map(function (i) { return i.field; })

    this.displayedColumnsFlatTools = this.displayedColumnsFlat.concat('tools');
  }

  renderRows() {
    if (this.table)
      this.table.renderRows();
  }

  doneAll(){

  }
}


