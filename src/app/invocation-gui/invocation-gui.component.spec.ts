import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocationGuiComponent } from './invocation-gui.component';

describe('InvocationGuiComponent', () => {
  let component: InvocationGuiComponent;
  let fixture: ComponentFixture<InvocationGuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvocationGuiComponent ]
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
