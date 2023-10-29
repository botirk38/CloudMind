import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxComponent } from './chatbox.component';

describe('ChatboxComponent', () => {
  let component: ChatboxComponent;
  let fixture: ComponentFixture<ChatboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatboxComponent]
    });
    fixture = TestBed.createComponent(ChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should handle messages.", () =>{
    const testMessage = {text: "Test message", sender: "Test sender", isUser: true};
    component.handleMessage(testMessage);
    expect(component.messages).toContain(testMessage);
    
    const testMessage2 = {text: "Test message 2", sender: "Test sender 2", isUser: false}
    component.handleMessage(testMessage2);
    expect(component.messages).toContain(testMessage2);
  })
});
