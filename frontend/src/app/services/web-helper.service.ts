import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { AppCommonsService } from './app-commons.service';
import { MessagesComponent } from '../directives/messages/messages.component';
import { environment } from '../../environments/environment';
import { BasicCrudService } from './basic-crud.service';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class WebHelperService {

  constructor(private http: HttpClient, private commons: AppCommonsService, 
    private messageService: MessagesComponent, private httpService: BasicCrudService) {

  }

  public ConsultarCEP(cep: string) {
    return this.httpService.getGenericPath<EnderecoConsultaCep>('helper/ConsultarCEP/?cep=' + cep)
  }

  public SendBinary(data: FormData) {
    return this.httpService.SendBinary(data, `helper/UploadFile/?id=0&type=type`);

    //return this.http.post(environment.urlBase + 'helper/SendBinary', data);
  }

}
export class EnderecoConsultaCep {
  endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: Estado;
}
