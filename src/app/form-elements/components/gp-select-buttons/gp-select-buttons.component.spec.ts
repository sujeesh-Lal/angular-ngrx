import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpSelectButtonsComponent } from './gp-select-buttons.component';

describe('GpSelectButtonsComponent', () => {
  let component: GpSelectButtonsComponent;
  let fixture: ComponentFixture<GpSelectButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpSelectButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpSelectButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
