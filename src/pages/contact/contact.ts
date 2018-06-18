import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { BusaoPage } from '../busao/busao';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  searchQuery: string = '';
  items: string[];
  numLinha: any[];
  constructor(public navCtrl: NavController,public service: ServiceProvider) {
    this.initializeItems();
    this.getPonto();
  }

  getPonto(){
    this.service.getPonto().subscribe(
      data=> this.numLinha=data,
      err=>console.log(err)
    )
  }

  initializeItems() {
    this.items = [
      'João Pedro',
      'Bagriel'
      
    ];
  }
  
  openBus(numLinha){
     this.navCtrl.push(BusaoPage,{
      numero: numLinha,
     });
     //return this.numLinha;
     //alert(numLinha);
  }
  

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim()!= '') {
      this.numLinha = this.numLinha.filter((item) => {
        return (item.numLinha.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
