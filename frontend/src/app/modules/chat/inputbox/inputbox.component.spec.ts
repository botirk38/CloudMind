import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InputboxComponent } from './inputbox.component';
import { FormsModule } from '@angular/forms';

describe('InputboxComponent', () => {
  let component: InputboxComponent;
  let fixture: ComponentFixture<InputboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputboxComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(InputboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit message and clear input on send.', () => {
    spyOn(component.messageSent, 'emit');
    component.userInput = "Test Input";
    component.sendMessage();
    expect(component.messageSent.emit).toHaveBeenCalledWith("Test Input");
    expect(component.userInput).toBe("");

  });

  it("Should emit typingEvent to be true when the user is typing.", fakeAsync(() =>{
    spyOn(component.typingEvent, 'emit');
    component.userInput = "Test Input";
    component.onTyping();
    tick(201);
    expect(component.typingEvent.emit).toHaveBeenCalledWith(true);
  }));

  it("Should emit typingEvent to be false when the user is not typing.", fakeAsync(() =>{
    spyOn(component.typingEvent, 'emit');
    component.onTyping();
    tick(201);
    expect(component.typingEvent.emit).toHaveBeenCalledWith(false);
  }));

  it("Should emit messageEvent with trimmed message when sendMessage is called." , () =>{
    spyOn(component.messageEvent, 'emit');
    component.userInput = "Test Input ";
    component.sendMessage();
    expect(component.messageEvent.emit).toHaveBeenCalledWith("Test Input");
  })


});
