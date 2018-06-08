import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLectureComponent } from './edit-lecture.component';

describe('EditLectureComponent', () => {
  let component: EditLectureComponent;
  let fixture: ComponentFixture<EditLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
