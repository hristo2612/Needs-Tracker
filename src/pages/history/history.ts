import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";
import { StoreProvider } from "../../providers/store/store";

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

  selectedTimeFrame: string = 'Today';

  progressForToday: any = [];
  progressForPreviousDays: any = [];
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

  ionViewDidLoad() {
    this.store.getAllProgress().then((allProgress) => {
      if (allProgress) {
        console.log(allProgress);
        this.progressForPreviousDays = allProgress;
      }
      this.store.getProgress().then((progress) => {
        this.progressForToday = progress;
        this.barChart = this.renderBarChart();
      });
    });

    this.lineChart = this.renderLineChart();
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

  renderLineChart() {
    return new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
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
            data: [65, 59, 80, 81, 56, 55, 40],
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
