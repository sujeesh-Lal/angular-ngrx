import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitMinMaxComponent } from './benefit-min-max.component';

describe('BenefitMinMaxComponent', () => {
  let component: BenefitMinMaxComponent;
  let fixture: ComponentFixture<BenefitMinMaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitMinMaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
