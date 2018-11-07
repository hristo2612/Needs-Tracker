import { Injectable } from '@angular/core';

@Injectable()
export class StoreProvider {
  public currentProgress: any;

  constructor() {
  }

  getProgress() {
    this.currentProgress = 'Wow we have some good progress';
  }

}
