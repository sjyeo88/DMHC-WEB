import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLectureComponent } from './all-lecture.component';

describe('AllLectureComponent', () => {
  let component: AllLectureComponent;
  let fixture: ComponentFixture<AllLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
