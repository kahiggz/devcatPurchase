import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Purchases } from "@ionic-native/purchases/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform, private purchases: Purchases) {
    platform.ready().then(() => {
      this.purchases.setDebugLogsEnabled(true); // Enable to get debug logs
      this.purchases.setup("OwfOWyeozwvRtULwklJlwKZJDjLbhiEK");
    })
  }
}
