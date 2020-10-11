import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDataEditErrorsComponent } from './member-data-edit-errors.component';

describe('MemberDataEditErrorsComponent', () => {
  let component: MemberDataEditErrorsComponent;
  let fixture: ComponentFixture<MemberDataEditErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDataEditErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDataEditErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
