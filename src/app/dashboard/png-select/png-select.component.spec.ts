import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PngSelectComponent } from './png-select.component';

describe('PngSelectComponent', () => {
  let component: PngSelectComponent;
  let fixture: ComponentFixture<PngSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PngSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PngSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
