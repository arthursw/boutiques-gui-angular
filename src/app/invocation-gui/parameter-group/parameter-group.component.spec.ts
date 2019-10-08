import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroupComponent } from './parameter-group.component';
import { ParameterGroup } from './parameter-group';
import { Parameter } from '../parameter/parameter';
import { ParameterComponent } from '../parameter/parameter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({ selector: 'parameter', template: '', providers: [{ provide: ParameterComponent, useClass: ParameterStubComponent }] })
class ParameterStubComponent {
  @Input() parameter: Parameter<any> = new Parameter<any>();
  @Input() formGroup: any = null
}

describe('ParameterGroupComponent', () => {
  let component: ParameterGroupComponent;
  let fixture: ComponentFixture<ParameterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGroupComponent, ParameterStubComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroupComponent);
    component = fixture.componentInstance;
    component.parameterGroup = new ParameterGroup({ id: 'fake_group', name: 'fake group', description: 'fake group description', members: [] });
    component.parameterGroup.members = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
