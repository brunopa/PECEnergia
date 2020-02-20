import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import { BasicCrudService } from '../../services/basic-crud.service';
import { MatSelect } from '@angular/material';
import { NgModel, FormControl, NgControl, NgForm, AbstractControl } from '@angular/forms';


@Component({
  selector: 'list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css'],
  exportAs: 'ngForm'
})
export class ListSearchComponent implements OnInit {


  listTerms$: Observable<{}>;
  @Input() fixedObservable: Observable<{}>;
  private searchTerms = new Subject<string>();
  @Output() onSelect = new EventEmitter<{}>();
  //selectedItemInner: {};
  @Input() display: string;
  @Input() idprop: string;
  @Input() path: string;
  @Input() placeholder: string;
  @Input() canInsertNew: boolean = false;
  @Input() required: boolean = false;
  @Input() needsReview = false;
  searchParameters = {}
  hasItens = false;
  @ViewChild("select") select: MatSelect;
  @ViewChild('formRef') formRef: NgForm;
  searchModel: string;


  _selectedItem: {};

  get selectedItem(): {} {
    return this._selectedItem;
  }

  @Input('selectedItem')
  set selectedItem(value: {}) {
    this._selectedItem = value;
    this.searchModel = (this._selectedItem || null) != null ? (this._selectedItem[this.display] || "") : "";
  }

  constructor(private service: BasicCrudService) {
  }

  get invalid(): boolean {
    return !((this.canInsertNew) || ((this._selectedItem || {})[this.idprop] > 0));
  }

  get controls(): { [key: string]: AbstractControl; } {
    return this.formRef.controls;
  }

  resetEntity() {

    if (this._selectedItem || null == null) {
      this._selectedItem = {};
      this.onSelect.emit(this._selectedItem);
    }

    this._selectedItem[this.idprop] = 0;
    this._selectedItem[this.display] = "";
  }

  // Push a search term into the observable stream.
  search(term: string, event): void {

    if (event.key == "Tab") {
      return;
    }

    this.resetEntity();
    //this.onSelect.emit(null);
    this._selectedItem[this.display] = term;
    this.searchTerms.next(term);
  }

  blur() {
    this.hasItens = false;

    if (this._selectedItem == null) {
      return;
    }

    setTimeout(() => {

      if (!this.canInsertNew && this._selectedItem[this.idprop] == 0) {
        this.resetEntity();
        this.onSelect.emit(null);
        this.searchModel = "";
      }

      if (this._selectedItem[this.display] == "") {
        this.resetEntity();
        this.onSelect.emit(null);
        this.searchModel = "";
      }
    }, 200);
  }

  selectItem(item) {

    if (this._selectedItem || null == null) {
      this.resetEntity()
    }
    
    for (let [key, value] of Object.entries(item)) {
      this._selectedItem[key] = value;
    }

    this.searchModel = item[this.display];
    this.configureObservable();
    this.hasItens = false;
  }

  configureObservable() {

    this.listTerms$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((data) => {
        //console.log(data);
      }),
      switchMap((term: string) => {
        this.searchParameters[this.display] = term;
        return this.getObservable();
      })
    );

    this.listTerms$.subscribe(itens => {
      this.hasItens = ((itens || []) as {}[]).length > 0;
      setTimeout(() => { this.select.open(); }, 100);
    });
  }

  getObservable(): Observable<{}> {

    if (this.fixedObservable) {
      return this.fixedObservable;
    }

    return this.service.setPath(this.path)
      .search(this.searchParameters)
  }

  clearInput() {
    this.configureObservable();
  }

  ngOnInit(): void {
    this.configureObservable();
    this.service.path = this.path;
  }
}
