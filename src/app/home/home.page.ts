import { Component } from '@angular/core';
import { Purchases } from '@ionic-native/purchases/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Offerings: any;

  constructor(
    private purchases: Purchases,
    public loadingController: LoadingController) {
  }

  ionViewDidEnter(){
    this.getOfferings();
  }

  async getOfferings() {

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    const offerings = await this.purchases.getOfferings();
    if (offerings.current !== null) {
      this.Offerings = offerings.current.availablePackages;
      console.log('yes!', offerings.current.availablePackages);
      loading.dismiss();

    } else {
      console.log('somethinsg missing');
      loading.dismiss();

    }


  }

}
