import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManualComponent } from './manage-manual.component';

describe('ManageManualComponent', () => {
  let component: ManageManualComponent;
  let fixture: ComponentFixture<ManageManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
