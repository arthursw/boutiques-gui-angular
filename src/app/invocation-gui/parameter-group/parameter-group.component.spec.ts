import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroupComponent } from './parameter-group.component';

describe('ParameterGroupComponent', () => {
  let component: ParameterGroupComponent;
  let fixture: ComponentFixture<ParameterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
