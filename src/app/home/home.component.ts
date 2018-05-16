import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  isShowWelcome: boolean = false;

  chartOptions: any = {
    responsive: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  chartColors: Array <any> = [{ // grey
    backgroundColor: '#7986cb',
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: '#eeeeee',
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];;
  timeChartLabels: string[] = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];
  timeChartType = 'line';
  timeChartLegend = true;
  timeChartData: any[] = [{
    data: [6, 125, 8, 8, 5, 5, 4],
    label: '加班小时数',
    borderWidth: 0
  }];
  timeChartOptions: any = Object.assign({
    elements: {
      line: {
        tension: 0,  // disables bezier curves
        fill: false
      }
    }
  }, this.chartOptions);

  constructor() {
  }

  ngOnInit() {
  }
}
