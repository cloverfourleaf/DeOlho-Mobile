import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

declare var google;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  linha: any [];
  //directionsService = new google.maps.DirectionsService();
  //directionsDisplay = new google.maps.DirectionsRenderer();
  //map: any;
  //inicia o mapa na ETEC
  //startPosition = new google.maps.LatLng(-23.552994,-46.399617);
  //originPosition: string;
  //destinationPosition: string;
  //localAtual: string;

  originPosition: any[];
  ionViewDidLoad() {
    
  }

  constructor(public navCtrl: NavController ,private geolocation: Geolocation,public alertCtrl: AlertController,public service: ServiceProvider) {
    this.getLinha();
  }


  getLinha(){
    this.service.getInfo().subscribe(
      data=> console.log(this.linha=data),
      err=>console.log(err)
    )
  }
  
  showRadio(originPosition){


   
      let alert = this.alertCtrl.create();
    alert.setTitle('Sentido');
      alert.addInput({
        type: 'radio',
        label: this.linha[originPosition].descricaoPonto,
        name:'Ida',
        value: this.linha[originPosition].codPonto,
        checked: true
      });
      alert.addInput({
        type: 'radio',
        name:'volta',
        label: this.linha[originPosition-1].descricaoPonto,
         value: this.linha[originPosition-1].codPonto,
        checked: false
      });

    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(alert.data.inputs[0].checked == false){
        (this.linha[originPosition-1].codPonto);
        }else if(alert.data.inputs[0].checked == true){
          (this.linha[originPosition].codPonto);
          console.log(this.linha)
        }
          
    //    this.testRadioOpen = false;
  //      this.testRadioResult = data;
        //this.navCtrl.setRoot(HelloIonicPage);
        
        // if(){
          
        // }
  
      }
      
    }
  );
    alert.present();

      }


}
