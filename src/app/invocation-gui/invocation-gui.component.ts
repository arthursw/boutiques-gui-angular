import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl }                 from '@angular/forms';
import { ParameterControlService }    from './parameter-control.service';
import { ParameterGroup }    from './parameter-group/parameter-group';

@Component({
  selector: 'invocation-gui',
  templateUrl: './invocation-gui.component.html',
  styleUrls: ['./invocation-gui.component.css'],
  providers: [ ParameterControlService ]
})
export class InvocationGuiComponent implements OnInit {
  
  @Output() invocationChanged = new EventEmitter<any>();
  parameterGroups = {
    required: new Map<string, ParameterGroup>(),
    optional: new Map<string, ParameterGroup>()
  };
  form: FormGroup = null;

  constructor(private pcs: ParameterControlService) { }

  ngOnInit() {
  }

  @Input()
  set descriptor(descriptor: any) {
    this.form = this.pcs.createFormGroupFromDescriptor(descriptor, this.parameterGroups);
    if(this.form != null) {
      this.form.valueChanges.subscribe((value)=>this.onChange(value));
    }
  }

  onChange(value: any) {
    let invocation = this.pcs.generateInvocation(this.form);
    this.invocationChanged.emit(invocation);
  }
}
