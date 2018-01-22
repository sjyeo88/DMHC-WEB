import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEditComponent } from './assign-edit.component';

describe('AssignEditComponent', () => {
  let component: AssignEditComponent;
  let fixture: ComponentFixture<AssignEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
