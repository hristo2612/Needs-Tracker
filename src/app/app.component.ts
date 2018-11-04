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
  initialProgressBars:object[] = [
    {
      need: 'Work',
      percent: 80,
      description: 'How is work today? Good? Bad?'
    },
    {
      need: 'Social',
      percent: 70,
      description: 'How recently have you seen your friends?'
    },
    {
      need: 'Mental Health',
      percent: 60,
      description: 'How is your mental state for today? Are you happy, anxious or perhaps stressed?'
    },
    {
      need: 'Family',
      percent: 50,
      description: 'How much time have you spent with your family members, just enough, too little?'
    },
    {
      need: 'Environment',
      percent: 40,
      description: 'How do you feel about the state of your home place? Maybe a little bit dirty or dusty, or shining like a diamond?'
    },
    {
      need: 'Energy',
      percent: 10,
      description: 'How much power do you think you have. Are you feeling a bit tired, sick or just great!?'
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Platform ready...
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.set('progressBars', this.initialProgressBars);
      this.storage.get('shownIntro').then((shown) => {
        if(!shown) {
          this.openPage('intro');
          this.storage.set('shownIntro', true);
          // Fill in our progressBars with default info, for when the user is presented with the Intro Page
          this.storage.set('progressBars', this.initialProgressBars);
        }
      });
    });
  }

  ngOnInit() {
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

