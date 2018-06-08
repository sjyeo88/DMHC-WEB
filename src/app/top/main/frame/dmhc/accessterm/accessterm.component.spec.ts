import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesstermComponent } from './accessterm.component';

describe('AccesstermComponent', () => {
  let component: AccesstermComponent;
  let fixture: ComponentFixture<AccesstermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesstermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesstermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
