import { Component } from '@angular/core';
import { Purchases } from '@ionic-native/purchases/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Offerings: any;

  constructor(private purchases: Purchases) {
    this.getOfferings();
  }

  async getOfferings() {
    const offerings = await this.purchases.getOfferings();
    if (offerings.current !== null) {
      this.Offerings = offerings.current.availablePackages;
      console.log('yes!', offerings.current.availablePackages);
    } else {
      console.log('somethinsg missing');
    }


  }

}
