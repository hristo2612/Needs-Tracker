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
      this.percent = this.progress.percent;
    });
  }

  onChange(percent) {
    this.progress.percent = percent;
  }

  getProgressData(): Promise<IProgress[]> {
    return this.storage.get('progressBars');
  }

  setProgressData(data): Promise<IProgress[]> {
    return this.storage.set('progressBars', data);
  }

  dismiss() {
    this.getProgressData().then((progressData) => {
      let currentProgress = progressData;
      currentProgress[this.navParams.get('barIndex')] = this.progress;
      this.setProgressData(currentProgress);
    });
    this.viewCtrl.dismiss();
  }

}
