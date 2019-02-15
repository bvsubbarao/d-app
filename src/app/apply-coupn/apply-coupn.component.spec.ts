import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCoupnComponent } from './apply-coupn.component';

describe('ApplyCoupnComponent', () => {
  let component: ApplyCoupnComponent;
  let fixture: ComponentFixture<ApplyCoupnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCoupnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCoupnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
