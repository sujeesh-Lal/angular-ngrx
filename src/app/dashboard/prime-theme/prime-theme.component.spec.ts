import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeThemeComponent } from './prime-theme.component';

describe('PrimeThemeComponent', () => {
  let component: PrimeThemeComponent;
  let fixture: ComponentFixture<PrimeThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
