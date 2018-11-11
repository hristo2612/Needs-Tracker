import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";
import { StoreProvider } from "../../providers/store/store";
import Avg from 'average-array';

Chart.defaults.global.legend.display = false;
@Component({
  selector: "page-history",
  templateUrl: "history.html"
})
export class HistoryPage {
  @ViewChild("barCanvas")
  barCanvas;
  @ViewChild("lineCanvas")
  lineCanvas;

  barChart: any;
  lineChart: any;

  showBarChart: boolean = true;
  showLineChart: boolean = false;

  selectedBarChartClass: string = 'selected';
  selectedLineChartClass: string = '';

  selectedTimeFrame: string = 'This Week';

  allLabels: string[] = [];
  selectedLabel: string = '';

  yearLength: number = 365;
  monthLength: number = 31;
  weekLength: number = 7;

  progressForToday: any = [];
  allProgressBars: any = [];
  progressBarLabels: any = [];
  progressBarValues: any = [];

  overallProgress: any;
  individualProgress: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StoreProvider) {}

  toggleBarChart() {
    this.showBarChart =  !this.showLineChart ? this.showBarChart : !this.showBarChart;
    if (this.showBarChart) {
      this.selectedBarChartClass = 'selected';
    } else {
      this.selectedBarChartClass = ''
    }
  }

  toggleLineChart() {
    this.showLineChart = !this.showBarChart ? this.showLineChart : !this.showLineChart;
    if (this.showLineChart) {
      this.selectedLineChartClass = 'selected';
    } else {
      this.selectedLineChartClass = '';
    }
  }

  onTimeFrameChange(period) {
    console.log(period);
  }

  onLabelChange(label) {
    this.selectedLabel = label;
    this.renderLineChart();    
  }

  ionViewDidLoad() {
    this.store.getAllProgress().then((allProgress) => {
      if (allProgress) {
        this.allProgressBars = allProgress;
      }
      this.store.getProgress().then((progress) => {
        let currentDate = new Date();
        // push today into all our bars array
        this.allProgressBars.push({ date: { 
          date: {
            day: currentDate.getDate(), 
            month: currentDate.getMonth()
          }
        }, bars: progress });
        this.allProgressBars = this.allProgressBars.slice().reverse();
        this.progressForToday = progress;
        this.allLabels = this.renderLabels(this.progressForToday);
        this.selectedLabel = this.allLabels[0] || '';
        this.barChart = this.renderBarChart();
        this.lineChart = this.renderLineChart();
  });
    });
  }

  averageValuesFor(all, type) {
    return Avg(
      this.store.concatAll(
        all.map((progress) => {
          return progress.bars.filter((item) => {
            return item.need === type;
          }).map((bar) => {
            return bar.percent;
          })
        })
      )
    );
  }

  renderLabels(bars) {
    return bars.map((target) => {
      return target.need;
    });
  }

  renderValues(bars) {
    return bars.map((target) => {
      return target.percent;
    });
  }

  renderColors(bars, opacity) {
    return bars.map((target) => {
      let color = null;
      if (target.percent > 75) {
        color = `rgb(30, 193, 7, ${opacity})`;
      } else if (target.percent > 59) {
        color = `rgb(213,219,33, ${opacity})`;
      } else if (target.percent > 29) {
        color = `rgb(219, 108, 34, ${opacity})`;
      } else {
        color = `rgb(199, 35, 17, ${opacity})`;
      }
      return color;
    });
  }

  checkSelectedTime(selected) {
    if (selected === 'Today') {

    } else if (selected === 'Yesterday') {

    } else if (selected === 'This Week') {

    } else if (selected === 'This Month') {

    } else if (selected === 'This Year') {

    }
  }

  renderBarChart() {
    return new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.renderLabels(this.progressForToday),
        datasets: [
          {
            data: this.renderValues(this.progressForToday),
            backgroundColor: this.renderColors(this.progressForToday, 0.26),
            borderColor: this.renderColors(this.progressForToday, 1),
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 1,
                max: 100
              }
            }
          ]
        }
      }
    });
  }

  mapLineChartData(all, from, to, label) {
    let chartData = {
      labels:[],
      data:[]
    };
    all.forEach((item, index) => {
      if (index >= from && index <= to) {
        chartData.labels.push(item.date.date.day + '/' + item.date.date.month);
        // get percentages for selected label a.k.a need
        item.bars.forEach((bar) => {
          if (label === bar.need) {
            chartData.data.push(bar.percent);
          }
        })
      }
    });
    return chartData;
  }

  renderLineChart() {
    let chartData = this.mapLineChartData(this.allProgressBars, 0,6, this.selectedLabel);
    return new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartData.data,
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 1,
                max: 100
              }
            }
          ]
        }
      }

    });
  }
}
