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
  anonymous: boolean;
  userId: string;
  subscriptionActive: any;

  constructor(
    private purchases: Purchases,
    public loadingController: LoadingController,
    public toastController: ToastController) {
  }

  ionViewDidEnter() {
    this.getOfferings();
  }

  //PULLDOWN REFRESH//
  refresh(event) {
    this.getOfferings().then(() => {
      event.target.complete();
    });
  }


  //GET OFFERINGS FROM REVENUE CAT & ASSIGN THEM TO ARRAY  //
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
    };
  }


  //PAYMENT FUNCTIONALITY ON CLICKING A SUBSCRIPTION OFFERING CARD//
  async payment(offering) {
    const purchaseMade = await this.purchases.purchasePackage(offering);
    if (purchaseMade.purchaserInfo.entitlements.active.my_entitlement_identifier != undefined) {
      this.success();
    }
  }


  //SUCCESS TOAST ON SUCCESSFUL PAYMENT//
  async success() {
    const toast = await this.toastController.create({
      message: 'You are now a paid Subscriber!.',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }



  //**ADDITIONAL FUNCTIONALITY TIED TO REVENUECAT**//

  //GET USER SUBSCRIPTION STATUS//
  async checkStatus() {
    const purchaserStatus = await this.purchases.getPurchaserInfo();
    if (purchaserStatus.entitlements.active) {
      //user is pro and can do something
    } else {
      //tell user is not pro 
    }
  }


  //RESTORE PAYMENTS//
  async restorePurchases() {
    const restore = await this.purchases.restoreTransactions();
  }


  //IDENTIFY USER, USEFULL FRO REGISTARTION//
  async getUserData() {
    this.anonymous = await this.purchases.isAnonymous();
    this.userId = await this.purchases.getAppUserID();

    const purchaser = await this.purchases.getPurchaserInfo();
    this.subscriptionActive = purchaser.entitlements.active ;

  }


}
