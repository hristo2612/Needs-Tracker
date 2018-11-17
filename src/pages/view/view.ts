import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
import { IProgress } from '../../app/models/progress';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  progress: IProgress;
  percent: number = 50;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private store: StoreProvider) {
  }

  ionViewDidLoad() {
    this.store.getProgress().then((progressData) => {
      this.progress = progressData[this.navParams.get('barIndex')];
      this.percent = this.progress.percent;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
