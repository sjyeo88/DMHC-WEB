import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureManualComponent } from './lecture-manual.component';

describe('LectureManualComponent', () => {
  let component: LectureManualComponent;
  let fixture: ComponentFixture<LectureManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
