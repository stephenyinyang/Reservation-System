import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberviewComponent } from './memberview.component';

describe('MemberviewComponent', () => {
  let component: MemberviewComponent;
  let fixture: ComponentFixture<MemberviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
