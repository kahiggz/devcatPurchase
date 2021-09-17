import { Component } from '@angular/core';
import { Purchases } from '@ionic-native/purchases/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Offerings: any;

  constructor(
    private purchases: Purchases,
    public loadingController: LoadingController,
    public toastController: ToastController) {
  }

  ionViewDidEnter() {
    this.getOfferings();
  }

  refresh(event) {
    this.getOfferings().then(() => {
      event.target.complete();
    });
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

  async payment(offering) {

    const purchaseMade = await this.purchases.purchasePackage(offering);
   if(purchaseMade.purchaserInfo.entitlements.active.my_entitlement_identifier ){
     this.success();
   }

  }

  async success() {
    const toast = await this.toastController.create({
      message: 'You are now a paid Subscriber!.',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

}
