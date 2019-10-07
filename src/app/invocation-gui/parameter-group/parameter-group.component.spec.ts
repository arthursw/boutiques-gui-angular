import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroupComponent } from './parameter-group.component';
import { ParameterGroupBase } from './parameter-group-base';
import { ParameterBase } from '../parameter/parameter-base';
import { ParameterComponent } from '../parameter/parameter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({ selector: 'parameter', template: '', providers: [{ provide: ParameterComponent, useClass: ParameterStubComponent }] })
class ParameterStubComponent {
  @Input() parameter: ParameterBase<any> = new ParameterBase<any>({});
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
    component.parameterGroup = new ParameterGroupBase({ id: 'fake_group', name: 'fake group', description: 'fake group description' });
    component.parameterGroup.members = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
