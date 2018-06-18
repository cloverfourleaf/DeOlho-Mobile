import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/map';

@Injectable()
export class ServiceProvider {
  api : string ='http://f20-preview.agilityhoster.com/cloverprojetos.cf/api/';
  constructor(public http: Http) {}

    getPonto(){
      return this.http.get(this.api+'apiPontoUsuario.php').map(res=> res.json());
    }    

    getInfo(){
      return this.http.get(this.api+'apiHorario.php').map(res=> res.json());
    }

}
