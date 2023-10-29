import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxComponent, Message } from './chatbox.component';
import { InputboxComponent } from '../inputbox/inputbox.component';

describe('ChatboxComponent', () => {
  let component: ChatboxComponent;
  let fixture: ComponentFixture<ChatboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatboxComponent, InputboxComponent]
    });
    fixture = TestBed.createComponent(ChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should handle messages.", () =>{
    const testMessage :Message = {text: "Test message", sender: "User", isUser: true};
    component.handleMessage(testMessage.text);
    expect(component.messages).toContain(testMessage);
    
    const testMessage2 :Message = {text: "Test message 2", sender: "User", isUser: true}
    component.handleMessage(testMessage2.text);
    expect(component.messages).toContain(testMessage2);
  })
});
