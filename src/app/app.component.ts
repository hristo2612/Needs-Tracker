import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.storage.set('name', 'Max');
    this.storage.set('age', '69').then(() => {
      this.storage.get('age').then((val) => {
        console.log('Your age is', val);
      });
    });
  }

  openPage(page): void {
    if (page === 'home') {
      this.nav.goToRoot({});
    } else if (page === 'history') {
      if (!(this.nav.getActive().name === "HistoryPage")) {
        this.nav.push(HistoryPage);
      }
    }
  }
}

