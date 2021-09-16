import { Component } from '@angular/core';
import { Purchases } from '@ionic-native/purchases/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  offerings: any;
  show: any;

  constructor(private purchases: Purchases) {
    this.getOfferings();
  }

  getOfferings() {
    this.offerings = this.purchases.getOfferings();
    if (this.offerings.current != null) {
      this.show = this.offerings.current;
      console.log('yes!', this.show);
    } else {
      console.log('somethinsg missing');
    }


  }

}
