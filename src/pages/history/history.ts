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

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            data: [88, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
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

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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

  renderBarChart() {

  }

  renderLineChart() {

  }
}
