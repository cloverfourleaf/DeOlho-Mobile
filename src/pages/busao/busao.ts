import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-busao',
  templateUrl: 'busao.html',
})
export class BusaoPage {
 
   info: any[];
  numero:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider) {
    this.getInfo();
    this.getDados();
  }   

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusaoPage');
  }

  getInfo(){
    this.service.getInfo().subscribe(
      data=> this.info = data,
      err=>console.log(err)
    )
  }
  getDados(){
    this.numero = this.navParams.get('numero');
    console.log(this.navParams.get('numero'));
  }
}
