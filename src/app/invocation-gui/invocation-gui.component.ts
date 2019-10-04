import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl }                 from '@angular/forms';

import { ParameterBase, StringParameter, FileParameter, NumberParameter } from './parameter/parameter-base';
import { ParameterGroupBase } from './parameter-group/parameter-group-base';
import { ParameterControlService }    from './parameter-control.service';

@Component({
  selector: 'invocation-gui',
  templateUrl: './invocation-gui.component.html',
  styleUrls: ['./invocation-gui.component.css'],
  providers: [ ParameterControlService ]
})
export class InvocationGuiComponent implements OnInit {
  
  @Output() invocationChanged = new EventEmitter<any>();
  idToParameter: Map<string, ParameterBase<any>> = new Map();
  parameterGroups = {
    required: new Map<string, ParameterGroupBase>(),
    optional: new Map<string, ParameterGroupBase>()
  };

  form: FormGroup;

  readonly defaultGroupId = 'boutiques_gui_default_group';

  constructor(private pcs: ParameterControlService) { }

  ngOnInit() {
    this.form = this.pcs.toFormGroup([]);
  }

  @Input()
  set descriptor(descriptor: any) {
    if(descriptor == null) {
      return;
    }
    let formGroups: any = { 'required': {}, 'optional': {} };

    let ungroupedParameterIds = new Set<string>();
    let idToParameterDescription = new Map<string, any>();
    for(let input of descriptor.inputs) {
      idToParameterDescription.set(input.id, input);
      ungroupedParameterIds.add(input.id);
    }

    let groups = [];
    for(let group of descriptor.groups) {
      for(let member of group.members) {
        ungroupedParameterIds.delete(member);
      }
      groups.push(group);
    }

    let defaultGroupMembers: any = { 'required': [], 'optional': [] };

    for(let parameterId of ungroupedParameterIds) {
      let parameter = idToParameterDescription.get(parameterId);
      defaultGroupMembers[parameter.optional ? 'optional' : 'required'].push(parameterId);
    }

    for(let groupName of ['optional', 'required']) {
      if(defaultGroupMembers[groupName].length > 0) {
        groups.unshift({ id: this.defaultGroupId + '_' + groupName, members: defaultGroupMembers[groupName], optional: groupName == 'optional' });
      }
    }

    let groupIdPrefix = 0;
    for(let group of groups) {
      group.id = groupIdPrefix + group.id;
      groupIdPrefix++;
      let parameterGroup = new ParameterGroupBase(group);
      for(let parameterId of group.members) {
        let parameterDescription = idToParameterDescription.get(parameterId);
        if(parameterDescription == null) {
          console.error('Missing group member in inputs.');
          continue;
        }
        let parameterBase = new ParameterBase(parameterDescription);
        this.idToParameter.set(parameterId, parameterBase);
        parameterGroup.members.push(parameterBase);
        
        if(!parameterDescription.optional) {
          parameterGroup.optional = false;
        }
      }
      let parameterGroupName = parameterGroup.optional ? 'optional' : 'required';
      this.parameterGroups[parameterGroupName].set(group.id, parameterGroup);
      formGroups[parameterGroupName][group.id] = this.pcs.toFormGroup(parameterGroup.members);
    }

    formGroups['required'] = new FormGroup(formGroups['required']);
    formGroups['optional'] = new FormGroup(formGroups['optional']);

    this.form = new FormGroup(formGroups);
    this.form.valueChanges.subscribe((value)=>this.onChange(value));
  }

  onChange(value: any) {
    let invocation = {}
    for(let superGroupName of ['required', 'optional']) {
      for(let groupId in this.form.value[superGroupName]) {
        let group = this.form.value[superGroupName][groupId]
        let formGroup: FormGroup = (this.form.controls[superGroupName] as FormGroup).controls[groupId] as FormGroup
        for(let parameterId in group) {
          let parameterValue = group[parameterId];
          let parameter: ParameterBase<any> = this.idToParameter.get(parameterId);
          let dirty = (formGroup.controls[parameterId] as FormControl).dirty
          if(dirty) {
            console.log(parameterValue);
            invocation[parameterId] = parameter.parseValue(parameterValue);
          }
        }
      }
    }
    this.invocationChanged.emit(invocation);
  }
}
