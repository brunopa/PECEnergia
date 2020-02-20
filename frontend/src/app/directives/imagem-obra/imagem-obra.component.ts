import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'imagem-obra',
  templateUrl: './imagem-obra.component.html',
  styleUrls: ['./imagem-obra.component.css']
})
export class ImagemObraComponent implements OnInit {

  @Input() filename = "";
  @Input() type = "mini";
  constructor() { }

  ngOnInit() {
  }


  pathImage() {
    //this.filename = "Snapchat-1043984919.jpg";
    return environment.urlImages + '/' + this.filename;
  }

  get cssClass(): String {
    if (this.type == "mini")
      return "miniImgObra";
    return "standardImgObra";
  }

  public errorHandler(event) {
    var target = event.target;
    setTimeout(() => {
      target.src = environment.urlImages + '/no-image.png';
    }, 200);
  }
}
