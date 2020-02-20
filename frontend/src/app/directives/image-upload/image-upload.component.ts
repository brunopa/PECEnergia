import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebHelperService } from 'src/app/services/web-helper.service';
import { HttpEventType } from '@angular/common/http';
import { AppCommonsService } from 'src/app/services/app-commons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @Input() default: string;
  private originalDefault: string;
  @Input() imageId: 0;
  @Output() onLoaded = new EventEmitter<any>();
  public loading = false;
  imagemData: FormData;
  spinnerProgress: number = 0;

  get src(): string {
    if ((this.imageId || "") == "") {
      return this.default;
    } else {
      return environment.urlImages + this.imageId.toString();
    }
  }
  constructor(private webHelper: WebHelperService, private commons: AppCommonsService) { }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {

      this.spinnerProgress = 0;
      this.loading = true;

      let file = event.target.files[0];

      var reader = new FileReader();
      reader.onload = (events: ProgressEvent) => { // called once readAsDataURL is completed
        var url = events.target["result"];
        this.default = url;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.imagemData = new FormData();
      this.imagemData.append('file', file);


      this.webHelper.SendBinary(this.imagemData).subscribe(//todo retirar 
        (event) => {

          if ((event || "") == "") {
            return;
          }

          if (event.type === HttpEventType.UploadProgress) {
            this.spinnerProgress = Math.round(100 * event.loaded / event.total);
          }
          else if (event.type === HttpEventType.Response) {
            this.loading = false;//todo: e erro?
            this.onLoaded.emit(event.body);
          }
        },
        (err) => {
          this.default = this.originalDefault;
          this.loading = false;
        },
        () => {
          this.loading = false;
        });
    }
  }

  ngOnInit() {
    this.originalDefault = this.default;
  }
}
