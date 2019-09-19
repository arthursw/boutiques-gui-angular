import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolsComponent } from './search-tools.component';

describe('SearchToolsComponent', () => {
  let component: SearchToolsComponent;
  let fixture: ComponentFixture<SearchToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
