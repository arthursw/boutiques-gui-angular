import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { ParameterBase }     from './parameter-base';

@Component({
  selector: 'parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent {

  constructor() { }

  ngOnInit() {
  }

  @Input() parameter: ParameterBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.parameter.id].valid; }

  selectData() {
  	return;
  }
}
