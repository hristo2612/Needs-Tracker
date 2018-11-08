import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StoreProvider {
  public showPercent: boolean;

  constructor(private storage: Storage) {
  }

  togglePercent() {
    this.storage.set('togglePercent', !this.showPercent).then((value) => {
      this.showPercent = value;
    });
  }

  getCurrentDate() {
    return this.storage.get('currentDate');
  }

  setCurrentDate(date) {
    return this.storage.set('currentDate', date);
  }

  getProgress() {
    return this.storage.get('progressBars');
  }

  setProgress(bar) {
    return this.storage.set('progressBars', bar);
  }

  getAllProgress() {
    return this.storage.get('allProgress');
  }

  setAllProgress(progressBarsArray) {
    return this.storage.set('allProgress', progressBarsArray);
  }

}
