import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  private _progress: string;
  className: string;

  get progress(): string {
    return this._progress;
  }

  @Input()
  set progress(progress: string) {
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

  constructor() {
  }

}
