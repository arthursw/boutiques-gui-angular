import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Parameter } from './parameter';

import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { ParameterComponent } from './parameter.component';

describe('ParameterComponent', () => {
  let component: ParameterComponent;
  let fixture: ComponentFixture<ParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterComponent);
    component = fixture.componentInstance;
    let fakeId = 'fake_parameter_1';
    component.parameter = new Parameter({ id: fakeId, name: 'fake parameter', description: 'fake parameter descrition', optional: true, type: 'Flag', value: true, 'value-key': 'fake value-key' });
    let group = {};
    group[fakeId] = new FormControl(component.parameter.value);
    component.formGroup = new FormGroup(group);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
