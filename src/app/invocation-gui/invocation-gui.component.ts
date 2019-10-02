import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { ParameterBase, StringParameter, FileParameter, NumberParameter } from './parameter/parameter-base';
import { ParameterControlService }    from './parameter-control.service';

@Component({
  selector: 'invocation-gui',
  templateUrl: './invocation-gui.component.html',
  styleUrls: ['./invocation-gui.component.css'],
  providers: [ ParameterControlService ]
})
export class InvocationGuiComponent implements OnInit {

  parameters: ParameterBase<any>[] = [];
  form: FormGroup;
  resultingInvocation: string

  constructor(private pcs: ParameterControlService) { }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.parameters);
  }

  // get descriptor(): any {
  //   return {};
  // }

  @Input()
  set descriptor(descriptor: any) {
    if(descriptor == null) {
      return;
    }
    for(let input of descriptor.inputs) {
      this.parameters.push(new ParameterBase(input))
    }
    this.form = this.pcs.toFormGroup(this.parameters);
  }

  onSubmit() {
    this.resultingInvocation = JSON.stringify(this.form.value);
  }
}
