import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  private _progress: string;

  get progress(): string {
    return this._progress;
  }

  @Input()
  set progress(progress: string) {
    console.log('prev value: ', this._progress);
    console.log('got progress: ', progress);
    this._progress = progress;
  }

  constructor() {
  }

}
