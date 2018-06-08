import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEmailComponent } from './find-email.component';

describe('FindEmailComponent', () => {
  let component: FindEmailComponent;
  let fixture: ComponentFixture<FindEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
