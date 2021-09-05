import { Component, Input, OnInit } from '@angular/core';
import { IProgress } from 'src/app/models/progress';
import { StorageService } from 'src/app/providers/storage.service';
import { GlobalQuery } from 'src/app/store/store.query';
import { GlobalService } from 'src/app/store/store.service';
import { Destroyable } from 'src/app/util/destroyable';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent extends Destroyable implements OnInit {
  className: string;
  showPercent: boolean = true;

  @Input()
  set progress(progress: any) {
    this.setProgress(progress);
  }
  get progress(): any {
    return this._progress;
  }
  private _progress: any;

  constructor(private service: GlobalService, private query: GlobalQuery) {
    super();
  }

  ngOnInit() {
    this.initSubscribers();
  }

  setProgress(progress: IProgress) {
    this._progress = progress;
    const percent = progress.percent;
    if (percent > 75) {
      this.className = 'good';
    } else if (percent > 59) {
      this.className = 'decent';
    } else if (percent > 29) {
      this.className = 'warning';
    } else {
      this.className = 'danger';
    }
  }

  swipe(event) {
    if (event.direction === 4 && this._progress.percent !== 100) {
      // swiped forward
      this.setProgress({ ...this._progress, percent: this._progress.percent + 1 });
    } else if (event.direction === 2 && this._progress.percent !== 0) {
      // swiped backward
      this.setProgress({ ...this._progress, percent: this._progress.percent - 1 });
    }
    // swipe (pan) is final
    if (event.isFinal) {
      this.saveProgress();
    }
  }

  saveProgress() {
    this.service.updateProgressBar(this._progress);
  }

  private initSubscribers() {
    const settingsSub = this.query.settings$.subscribe((settings) => {
      this.showPercent = settings.showPercentage;
    });

    this.subscriptions.push(settingsSub);
  }
}
