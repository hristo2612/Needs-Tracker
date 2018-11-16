import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { IntroPage } from '../pages/intro/intro';
import { SettingsPage } from '../pages/settings/settings';
import { StoreProvider } from '../providers/store/store';

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
      description: 'Finished work or chores'
    },
    {
      need: 'Social',
      percent: 70,
      description: 'Your social interactions'
    },
    {
      need: 'Mental Health',
      percent: 60,
      description: 'State of your mind, perhaps you might be feeling under the weather or over the moon?'
    },
    {
      need: 'Family',
      percent: 50,
      description: 'Did you interact with your family today?'
    },
    {
      need: 'Environment',
      percent: 40,
      description: 'State of your home place. Is it dusty or clean?'
    },
    {
      need: 'Energy',
      percent: 10,
      description: 'Define your energy levels for today'
    }
  ];

  currentDate: any = {
    date: {
      day: '',
      month: ''
    },
    time: {
      hour: '',
      minute: ''
    }
  };

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private store: StoreProvider) {
    platform.ready().then(() => {
      // Platform ready...
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('shownIntro').then((shown) => {
        if(!shown) {
          this.openPage('intro');
          this.storage.set('shownIntro', true);
          // Fill in our progressBars with default info, for when the user is presented with the Intro Page
          this.store.setProgress(this.initialProgressBars);
        }
      });

      // Get toggle percent setting and set store value to it
      this.storage.get('togglePercent').then((value) => {
        if (value === true || value === false) {
          this.store.showPercent = value;
        } else {
          this.store.showPercent = true;
        }
      });
    });
  }

  ngOnInit() {
    // On init, set date to the Current day/month/hour/minute
    const date = new Date();
    this.currentDate.date.day = date.getDate();
    this.currentDate.date.month = date.getMonth();
    this.currentDate.time.hour = date.getHours();
    this.currentDate.time.minute = date.getMinutes();

    this.store.getCurrentDate().then((current) => {
      if (current) {
        // If date from storage is different than our newly produced date, set new date to current and add old to array
        if ((current.date.day !== this.currentDate.date.day || current.date.month !== this.currentDate.date.month)) {
          let allProgressBarsForEveryDay = null;
          this.store.getAllProgress().then((all) => {
            allProgressBarsForEveryDay = all;
            return this.store.getProgress();
          }).then((progress) => {
            let newAll = allProgressBarsForEveryDay || [];
            newAll.push({date: current, bars: progress});
            this.store.setAllProgress(newAll);
            this.store.setCurrentDate(this.currentDate);
          });
        }
      } else {
        this.store.setCurrentDate(this.currentDate);
      }
    });
  }

  openPage(page): void {
    if (page === 'home') {
      this.nav.goToRoot({});
    } else if (page === 'history') {
      if (!(this.nav.getActive().name === "HistoryPage")) {
        this.nav.push(HistoryPage);
      }
    } else if (page === 'settings') {
      if (!(this.nav.getActive().name === "SettingsPage")) {
        this.nav.push(SettingsPage);
      }
    } else if (page === 'intro') {
        this.nav.push(IntroPage);
    }
  }
}

