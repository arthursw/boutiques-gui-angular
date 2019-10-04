import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl }        from '@angular/forms';
import { ParameterBase }     from './parameter-base';

@Component({
  selector: 'parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent {

  @Input() parameter: ParameterBase<any>;
  @Input() formGroup: FormGroup;
  @ViewChild('parameterInput', { static: false }) parameterInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  get isValid() { return this.formGroup.controls[this.parameter.id].valid; }

  selectData() {
  	return;
  }

  onUnset() {
    let activeControl = this.formGroup.get(this.parameter.id) as FormControl;
    this.formGroup.controls[this.parameter.id].markAsPristine();
    // activeControl.setValue(activeControl.value);
    activeControl.setValue(this.parameter.type != 'Flag' ? null : false);
    this.parameterInput.nativeElement.checked = false;
  }

  onChange(eventTarget: any) {
    if(this.parameter.type != 'Flag') {
      return;
    }
    let activeControl = this.formGroup.get(this.parameter.id) as FormControl;
    activeControl.setValue(eventTarget.checked);
  }
}
