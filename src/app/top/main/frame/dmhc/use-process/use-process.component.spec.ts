import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseProcessComponent } from './use-process.component';

describe('UseProcessComponent', () => {
  let component: UseProcessComponent;
  let fixture: ComponentFixture<UseProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
