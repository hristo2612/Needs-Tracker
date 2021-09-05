import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { delay } from 'rxjs';
import { IProgressHistory } from '../store/store';
import { GlobalQuery } from '../store/store.query';
import { Destroyable } from '../util/destroyable';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends Destroyable implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  lineChart: any;

  allLabels: string[] = [];
  selectedLabel: string = '';

  history: IProgressHistory[] = [];

  constructor(private query: GlobalQuery) {
    super();
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.initData();
  }

  onLabelChange(label) {
    this.selectedLabel = label;
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    if (this.barChart) {
      this.barChart.destroy();
    }
    setTimeout(() => {
      this.lineChart = this.renderLineChart(this.history);
      this.barChart = this.renderBarChart(this.history);
      this.barCanvas.nativeElement.style.height = '240px';
      this.lineCanvas.nativeElement.style.height = '240px';
    }, 200);
  }

  renderBarChart(history: IProgressHistory[]) {
    const labels = this.getHistoryDates(history);
    const values = this.getHistoryValuesByNeed(history, this.selectedLabel);
    const backgroundColors = this.renderColors(values, 0.2);
    const borderColors = this.renderColors(values, 0.8);

    return new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: this.selectedLabel,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderLineChart(history: IProgressHistory[]) {
    const labels = this.getHistoryDates(history);
    const values = this.getHistoryValuesByNeed(history, this.selectedLabel);

    return new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: this.selectedLabel,
          data: values,
          fill: false,
          borderColor: 'rgb(30, 193, 7)',
          tension: 0.1,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private getHistoryDates(history: IProgressHistory[]) {
    return history.map((target) => target.date);
  }

  private getHistoryValuesByNeed(history: IProgressHistory[], need: string) {
    return history.map((target) => {
      return target.progress.find((progress) => {
        return progress.need === need;
      }).percent;
    });
  }

  private initData() {
    const todaysNeedsSub = this.query.todaysNeeds$.subscribe(labels => { 
      this.allLabels = labels;
      this.selectedLabel = labels[0];
    });
    const historySub = this.query.history$.pipe(delay(100)).subscribe(history => {
      this.history = history;
      this.onLabelChange(this.selectedLabel);
    });
    this.subscriptions.push(todaysNeedsSub, historySub);
  }

  renderColors(values: number[], opacity) {
    return values.map((target) => {
      let color = null;
      if (target > 75) {
        color = `rgb(30, 193, 7, ${opacity})`;
      } else if (target > 59) {
        color = `rgb(213,219,33, ${opacity})`;
      } else if (target > 29) {
        color = `rgb(219, 108, 34, ${opacity})`;
      } else {
        color = `rgb(199, 35, 17, ${opacity})`;
      }
      return color;
    });
  }

}
