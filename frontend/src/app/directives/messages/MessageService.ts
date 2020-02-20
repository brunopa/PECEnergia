import { BehaviorSubject } from 'rxjs';

export class MessageService{

  constructor() { }

  static subject = new BehaviorSubject<string[]>([]);

  public static messages: string[] = [];

  static getMessages() {
    return MessageService.messages;
  }

  static setMessage(message: string) {
    MessageService.messages.unshift(message);
    MessageService.subject.next(MessageService.messages);
  }

  static resetMessages() {
    MessageService.messages = [];
    MessageService.subject.next(MessageService.messages);
  }
}
