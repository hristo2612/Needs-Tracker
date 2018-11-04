import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

interface IProgress {
  need?: string;
  description?: string;
  percent?: number;
  className?: string;
}

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  progress: IProgress;
  percent: number = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('progressBars').then((progressData) => {
      this.progress = progressData[this.navParams.get('barIndex')];
      this.setProgressBarClass(this.progress);
      this.percent = this.progress.percent;
    });
  }

  onChange(percent) {
    this.progress.percent = percent;
    this.setProgressBarClass(this.progress);
  }

  setProgressBarClass(target) {
    if (target.percent > 75) {
      target.className = 'good';
    } else if (target.percent > 59) {
      target.className = 'decent';
    } else if (target.percent > 29) {
      target.className = 'warning';
    } else {
      target.className = 'danger';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
