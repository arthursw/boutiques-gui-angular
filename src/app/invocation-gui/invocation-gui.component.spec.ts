import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocationGuiComponent } from './invocation-gui.component';
import { ParameterControlService }    from './parameter-control.service';
import { ParameterGroupComponent }    from './parameter-group/parameter-group.component';
      
import { ReactiveFormsModule } from '@angular/forms';

@Component({ selector: 'parameter-group', template: '', providers: [{ provide: ParameterGroupComponent, useClass: ParameterGroupStubComponent }] })
class ParameterGroupStubComponent {
  @Input() parameterGroup: any = null
  @Input() formGroup: any = null
}


describe('InvocationGuiComponent', () => {
  let component: InvocationGuiComponent;
  let fixture: ComponentFixture<InvocationGuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ ParameterControlService ],
      declarations: [ InvocationGuiComponent, ParameterGroupStubComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvocationGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
