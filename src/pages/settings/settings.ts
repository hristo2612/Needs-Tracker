import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StoreProvider } from '../../providers/store/store';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  provideNotifications: boolean = false;
  providePercents: boolean = false;
  reminderTime: string = '19:00';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private store: StoreProvider) {
  }

  onToggleChange(value) {
    this.storage.set('showNotifications', value).then((val) => {
    });
  }

  onTogglePercentChange() {
    this.store.togglePercent();
  }

  ionViewDidLoad() {
    this.providePercents = this.store.showPercent;
    this.storage.get('showNotifications').then((value) => {
      if (value) {
        this.provideNotifications = value;
      } else {
        this.provideNotifications = false;
      }
    });
  }

}
