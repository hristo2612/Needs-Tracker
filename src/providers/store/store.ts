import { Injectable } from '@angular/core';

@Injectable()
export class StoreProvider {
  public currentProgress: any;
  public showPercent: boolean = false;

  constructor() {
  }

  togglePercent() {
    this.showPercent = !this.showPercent;
  }

  getProgress() {
    this.currentProgress = 'Wow we have some good progress';
  }

}
