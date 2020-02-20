import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { LayoutMessagesComponent } from './layout-messages/layout-messages.component';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './MessageService';

@Injectable()
export class MessagesComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }
  snackRef: MatSnackBarRef<LayoutMessagesComponent>;
  static subject = new BehaviorSubject<string[]>([]);
  timeoutId = 0;
  timeoutDuration = 2500;


  alert(message: string) {


    this.snackRef = this.snackBar.openFromComponent(LayoutMessagesComponent, {
      duration: this.timeoutDuration,
    });

    MessageService.setMessage(message);

    if (this.timeoutId > 0) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      MessageService.resetMessages();
      this.timeoutId = 0;
    }, this.timeoutDuration);
  }

  ngOnInit() {
  }
}
