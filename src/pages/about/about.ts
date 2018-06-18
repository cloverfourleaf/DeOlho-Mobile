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
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  //inicia o mapa na ETEC
  startPosition = new google.maps.LatLng(-23.552994,-46.399617);
  originPosition: string;
  destinationPosition: string;
  localAtual: string;

  
  ionViewDidLoad() {
    
  }

  constructor(public navCtrl: NavController ,private geolocation: Geolocation,public alertCtrl: AlertController,public service: ServiceProvider) {
    this.initializeMap();
    this.getLinha();
  }
  pegarLocalizacao(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.originPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      //troca a posiinicial inicia do mapa para a localização atual
      this.startPosition = this.originPosition;
      
      this.initializeMap();

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }
  
  initializeMap() {
    const mapOptions = {
      zoom: 17,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }

  getLinha(){
    this.service.getLinha().subscribe(
      data=> this.linha=data,
      err=>console.log(err)
    )

    
  }

  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'TRANSIT',
        transitOptions: {
          modes: ['BUS'],
          trafficModel: 'best_guess' 
        },
      } ;
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  showRadio(num,codigo){


   
      let alert = this.alertCtrl.create();
    alert.setTitle('Sentido');
      alert.addInput({
        type: 'radio',
        label: this.linha[num].descricaoPonto,
        name:'Ida',
        value: this.linha[num].codPonto,
        checked: true
      });
      alert.addInput({
        type: 'radio',
        name:'volta',
        label: this.linha[num-1].descricaoPonto,
         value: this.linha[num-1].codPonto,
        checked: false
      });

    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(alert.data.inputs[0].checked == false){
          this.postDados(this.linha[num-1].codPonto,codigo);
        }else if(alert.data.inputs[0].checked == true){
          this.postDados(this.linha[num].codPonto,codigo);
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



  private newMethod() {
    postDados(this.destinationPosition);
    {
    }
  }
}
