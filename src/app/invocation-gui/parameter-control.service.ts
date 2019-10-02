import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ParameterBase } from './parameter/parameter-base';

@Injectable()
export class ParameterControlService {
  constructor() { }

  toFormGroup(parameters: ParameterBase<any>[] ) {
    let group: any = {};

    parameters.forEach(parameter => {
      group[parameter.id] = parameter.required ? new FormControl(parameter.value || '', Validators.required)
                                            	: new FormControl(parameter.value || '');
    });
    return new FormGroup(group);
  }
}