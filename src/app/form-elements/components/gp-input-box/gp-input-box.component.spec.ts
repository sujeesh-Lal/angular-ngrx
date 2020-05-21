import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpInputBoxComponent } from './gp-input-box.component';

describe('GpInputBoxComponent', () => {
  let component: GpInputBoxComponent;
  let fixture: ComponentFixture<GpInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
