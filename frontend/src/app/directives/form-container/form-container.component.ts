import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, NgModel, NgForm, AbstractControl } from '@angular/forms';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  @Input() header: string;
  @Input() loadingSubject: BehaviorSubject<boolean>;
  @Input() controlsRef: NgModel[];//deletar
  @Input() subFormRef: any[];
  @Input() formRef: NgForm;
  @Input() public showMasterPage: boolean = true;
  @Input() public needsReview: boolean = false;
  @Output() onOk = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<boolean>();

  constructor(private message: MessagesComponent) {
  }

  ngOnInit() {
    this.loadingSubject
      .subscribe(
        () => { },
        e => {
          this.message.alert((e || { message: "Ocorreu um erro" }).message);
        });

    this.formRef.ngSubmit.subscribe((event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      this.validateForm();
    });
  }

  validate() {
    return true;
  }

  doSave(formRef: any) {
    event.stopPropagation();
    event.preventDefault();
    this.validateForm();
  }

  doReturn(formRef: any) {
    if (formRef.dirty) {
      if (confirm("Algumas altereção não foram salva, confirma a saida da tela?")) {
        this.onCancel.emit()
      }
    }
    else {
      this.onCancel.emit()
    }
  }

  validateForm() {
    var valid = this.formRef.valid;
    for (var i in this.formRef.controls) {
        this.formRef.controls[i].markAsTouched();
    }

    for (var i2 in (this.subFormRef || [])) {
      var valid0 = this.subFormRef[i2].formRef.valid;
      valid = valid && valid0;
      for (var c in this.subFormRef[i2].controls) {
          this.subFormRef[i2].controls[c].markAsTouched();
      }
    }

    if (valid) {
      this.onOk.emit();
    }
    else {
      this.message.alert("Um ou mais campos estão com valores inválidos");
    }
  }
}
