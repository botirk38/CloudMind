import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBtnComponent } from './send-btn.component';

describe('SendBtnComponent', () => {
  let component: SendBtnComponent;
  let fixture: ComponentFixture<SendBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendBtnComponent]
    });
    fixture = TestBed.createComponent(SendBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
