import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxComponent } from './chatbox.component';
import { InputboxComponent } from '../inputbox/inputbox.component';
import { FormsModule } from '@angular/forms';
import { SendBtnComponent } from 'src/app/components/buttons/send-btn/send-btn.component';
import { By } from '@angular/platform-browser';
import { MessageComponent } from '../message/message.component';

describe('ChatboxComponent', () => {
  let component: ChatboxComponent;
  let fixture: ComponentFixture<ChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatboxComponent, InputboxComponent, SendBtnComponent, MessageComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a message when handleMessage is called with text', () => {
    const inputText = "Test message";
    component.handleMessage(inputText);
    fixture.detectChanges();

    expect(component.messages.length).toBe(1);
    expect(component.messages[0]).toEqual(jasmine.objectContaining({
      text: inputText,
      sender: 'User',
      isUser: true
    }));
  });

  it('should set isTyping to true when handleIsTyping is called with true', () => {
    component.handleIsTyping(true);
    expect(component.isTyping).toBeTrue();
  });

  it('should set isTyping to false when handleIsTyping is called with false', () => {
    component.handleIsTyping(false);
    expect(component.isTyping).toBeFalse();
  });

  it('should handle input box events', () => {
    const inputBoxDebugEl = fixture.debugElement.query(By.directive(InputboxComponent));
    const inputBoxInstance = inputBoxDebugEl.componentInstance;

    spyOn(component, 'handleMessage');

    const messageText = 'Hello!';
    inputBoxInstance.messageEvent.emit(messageText);

    expect(component.handleMessage).toHaveBeenCalledWith(messageText);
  });

  it('should handle typing status updates', () => {
    const inputBoxDebugEl = fixture.debugElement.query(By.directive(InputboxComponent));
    const inputBoxInstance = inputBoxDebugEl.componentInstance;

    inputBoxInstance.typingEvent.emit(true);
    fixture.detectChanges();

    expect(component.isTyping).toBeTrue();
  });

});
