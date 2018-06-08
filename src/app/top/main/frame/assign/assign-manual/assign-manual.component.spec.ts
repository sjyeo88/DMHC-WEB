import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignManualComponent } from './assign-manual.component';

describe('AssignManualComponent', () => {
  let component: AssignManualComponent;
  let fixture: ComponentFixture<AssignManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
