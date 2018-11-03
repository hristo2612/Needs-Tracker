import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { IntroPage } from '../pages/intro/intro';

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

      this.storage.get('shownIntro').then((shown) => {
        if(shown) {
          this.openPage('home');
        } else {
          this.openPage('intro');
          this.storage.set('shownIntro', true);
        }
      });
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
    } else if (page === 'intro') {
        this.nav.push(IntroPage);
    }
  }
}

