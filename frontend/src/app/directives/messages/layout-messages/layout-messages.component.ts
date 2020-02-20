import { Component, OnInit } from '@angular/core';
import { MessageService } from '../MessageService';

@Component({
  selector: 'app-layout-messages',
  templateUrl: './layout-messages.component.html',
  styleUrls: ['./layout-messages.component.css']
})
export class LayoutMessagesComponent implements OnInit {
  messages: string[] = [];
  
  constructor() {
    MessageService.subject.subscribe(lst => this.messages = lst);
  }

  ngOnInit() {
  }
}
