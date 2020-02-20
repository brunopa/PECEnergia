import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'revise-command',
  templateUrl: './revise-command.component.html',
  styleUrls: ['./revise-command.component.css']
})
export class ReviseCommandComponent implements OnInit {
  @Input('revisedmodel') revisedModel: NgModel;

  private _isRevised: boolean;

  get IsRevised(): boolean {
    return this._isRevised;
  }

  set IsRevised(_isRevised: boolean) {
    this._isRevised = _isRevised;
  }

  constructor() { }

  ngOnInit() {

  }

  public review() {
    this.IsRevised = true;
    //this.revisedModel.control.setValue(this.revisedModel.control.value);
    this.revisedModel.control.markAsTouched();
    this.revisedModel.control.markAsDirty();
    this.revisedModel.control.patchValue(this.revisedModel.control.value);


    event.stopPropagation();
    event.preventDefault();
    return false;
  }

}
