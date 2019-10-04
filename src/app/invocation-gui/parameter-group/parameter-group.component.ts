import { Component, OnInit, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { ParameterBase }     from '../parameter/parameter-base';
import { ParameterGroupBase }     from './parameter-group-base';

@Component({
  selector: 'parameter-group',
  templateUrl: './parameter-group.component.html',
  styleUrls: ['./parameter-group.component.css']
})
export class ParameterGroupComponent implements OnInit {

  @Input() parameterGroup: ParameterGroupBase;
  @Input() formGroup: FormGroup;
  selectedParameterId: string = null;

  constructor() { }

  ngOnInit() {
  }

}
