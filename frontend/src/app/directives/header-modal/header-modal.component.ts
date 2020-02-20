import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.css']
})
export class HeaderModalComponent implements OnInit {

  constructor() { }

  @Input() text: string;

  ngOnInit() {
  }

}
