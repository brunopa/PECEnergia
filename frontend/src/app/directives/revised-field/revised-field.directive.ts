import { Directive, ViewContainerRef, TemplateRef, Input, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { ReviseCommandComponent } from './revise-command/revise-command.component';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';

@Directive({
  selector: '[needsReview]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RevisedFieldDirective, multi: true }]
})
export class RevisedFieldDirective /*implements Validator*/ {
  /*  */
  //@HostBinding('class') componentCssClass; fica colocando borda de focus

  _control: AbstractControl;

  @Input() needsReview: boolean = true;

  constructor(private el: ElementRef,
    private renderer: Renderer,
    public overlayContainer: OverlayContainer) {
  }

  @HostListener('focus', ['$event.target'])
  focusin(btn: AbstractControl) {
    this._control.markAsTouched();
    //this.renderer.setElementClass(this.el.nativeElement, 'revised', true);
    this.renderer.setElementStyle(this.el.nativeElement, 'background-color', "initial");
    //this._control.validator(this._control);
    this._control.patchValue(this._control.value);

  }

  validate(control: AbstractControl): { [key: string]: any } | null {

    this._control = control;
    if (this.needsReview && this._control.untouched) {
      //this.renderer.setElementClass(this.el.nativeElement, 'mat-warn', true);
      this.renderer.setElementStyle(this.el.nativeElement, 'background-color', "rgba(255, 34, 34, 0.1)");
      return { 'revisedField': { value: "Campo não revisado" } };
    }
    else {
      return null;
    }
    /*
        if (this.revisedfield && (!control.touched && !this.revisedfield.IsRevised)) {
          return { 'revisedField': { value: "Campo não revisado" } };
        }
        return null;
        */
  }
}
