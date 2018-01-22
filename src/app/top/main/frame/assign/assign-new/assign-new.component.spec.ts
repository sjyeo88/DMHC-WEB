import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNewComponent } from './assign-new.component';

describe('AssignNewComponent', () => {
  let component: AssignNewComponent;
  let fixture: ComponentFixture<AssignNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
