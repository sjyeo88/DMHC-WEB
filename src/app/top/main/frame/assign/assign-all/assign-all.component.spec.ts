import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAllComponent } from './assign-all.component';

describe('AssignAllComponent', () => {
  let component: AssignAllComponent;
  let fixture: ComponentFixture<AssignAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
