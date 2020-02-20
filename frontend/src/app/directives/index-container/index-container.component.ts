import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, NgModel } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { MessagesComponent } from '../messages/messages.component';


interface IndexGridColumn {
  field: string,
  header: string
}

@Component({
  selector: 'app-index-container',
  templateUrl: './index-container.component.html',
  styleUrls: ['./index-container.component.css']
})
export class IndexContainerComponent implements OnInit {
  @Input() dataSubject = new BehaviorSubject<any[]>(null);
  @Output() onNew = new EventEmitter<boolean>();
  @Output() onSearch = new EventEmitter<boolean>();
  @Output() onEdit = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onPrint = new EventEmitter<boolean>();
  @Output() onSelectMany = new EventEmitter<any[]>();

  @Input() displayedColumns: IndexGridColumn[];
  @Input() header: string;
  @Input() controlsRef: NgModel[];

  @Input() showPrintButton = false;
  @Input() showDeleteButton = false;
  @Input() showHeader = true;
  @Input() showSelection = false;
  @Input() showNewButton = true;

  constructor(private message: MessagesComponent) { }

  ngOnInit() {
  }

  doSearch() {
    var valid = true;
    for (let entry of this.controlsRef) {
      if (entry.invalid) {
        this.message.alert("Um ou mais campos estão com valores inválidos");
        entry.control.markAsTouched();
        valid = false;
      }
    }
    if (valid) {
      this.onSearch.emit();
    }
  }
}
