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
  hi:any;
  hf:any;
  pr:any;
  nlinha:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider) {
    this.apresenta();
    this.getDados();
    this.getInfo();
  }   

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusaoPage');
  }

  getInfo(){
    this.service.getInfo().subscribe(
      data=> console.log(this.info=data),
      err=>console.log(err)
    )
  }
  getDados(){
    this.numero = this.navParams.get('numero');
    console.log(this.navParams.get('numero'));
    this.apresenta();
  }
  
   apresenta(){

    for(var user in this.info){
      if(this.info[user].numLinha == this.numero ){
        this.nlinha = this.info[user].numLinha;
        this.hi = this.info[user].horaFuncionamento;
        this.hf = this.info[user].horaTermino;
        this.pr = this.info[user].tarifaLinha;
     // this.pr = this.info[user].descricaoPonto;
      console.log(this.info[user].numLinha);
    }
    
  }
  console.log(this.info[1]);

}
  

}
