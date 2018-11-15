import { Component, Input } from '@angular/core';
import { StoreProvider } from '../../providers/store/store';
import { IProgress } from '../../app/models/progress';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  private _progress: string;
  className: string;
  @Input() index: number;

  get progress(): string {
    return this._progress;
  }

  @Input()
  set progress(progress: string) {
    this.setProgress(progress);
  }

  constructor(private store: StoreProvider) {
  }

  setProgress(progress: string) {
    this._progress = progress;
    let numberProgress = +progress;
    if (numberProgress > 75) {
      this.className = 'good';
    } else if (numberProgress > 59) {
      this.className = 'decent';
    } else if (numberProgress > 29) {
      this.className = 'warning';
    } else {
      this.className = 'danger';
    }
  }

  swipe(event) {
    if (event.direction === 4 && this._progress !== '100') {
      // swiped forward
      this.setProgress((parseInt(this._progress) + 1) + '');
    } else if (event.direction === 2 && this._progress !== '1') {
      // swiped backward
      this.setProgress((parseInt(this._progress) - 1) + '');
    }
    // swipe (pan) is final
    if (event.isFinal) {
      this.saveProgress();
    }
    console.log(event);
  }

  saveProgress() {
    this.getProgressData().then((progressData) => {
      let currentProgress = progressData;
      currentProgress[this.index].percent = parseInt(this._progress);
      this.setProgressData(currentProgress).then((progress) => {
        //this.dismiss();
        console.log('progress data saved')
      });
    });
  }

  getProgressData(): Promise<IProgress[]> {
    return this.store.getProgress();
  }

  setProgressData(data: IProgress[]): Promise<IProgress[]> {
    return this.store.setProgress(data);
  }
}
