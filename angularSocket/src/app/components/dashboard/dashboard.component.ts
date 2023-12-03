import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { WebsocketService } from 'src/app/services/websocket.service';
import { BackendService } from 'src/app/services/backend.service';
import { sensorParamNames } from 'src/app/models/config';
import { Observable, interval } from 'rxjs';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  @ViewChild('sideDrawer') sideDrawer !: MatSidenav;
  sideNavBarOptions: any = [];
  subscription !: any
  loggedInUser !: any;
  graphOptions: any = ['line', 'bar', 'number'];
  firstTimeChange: boolean = false;
  maxDate = new Date();
  constructor(private socketService: WebsocketService, private service: BackendService) { }

  ngOnInit(): void {

    this.loggedInUser = this.service.loggedInUser;
    const source = interval(3000);
    this.sidebarInit();
    this.subscription = source.subscribe(() => {
      this.updateDashboard("data");
    });
    //this.socketService.listen('chat').subscribe((data: any) => this.updateDashboard(data));
  }
  ngAfterViewInit() {
    for (let item of this.sideNavBarOptions) {
      if (item.graphType === 'line')
        item.lineChart = new Chart(item.id + 'line', {
          type: 'line',
          data: { labels: [], datasets: [{ data: [], borderWidth: 1, },], },
          options: { scales: { y: { beginAtZero: true, }, }, plugins: { legend: { display: false }, } },
        });
      if (item.graphType === 'bar')
        item.barChart = new Chart(item.id + 'bar', {
          type: 'bar',
          data: { labels: [], datasets: [{ data: [], borderWidth: 1, },], },
          options: { scales: { y: { beginAtZero: true, }, }, plugins: { legend: { display: false }, } },
        });
    }
  }

  sidebarInit() {
    for (let param of sensorParamNames) {
      this.sideNavBarOptions.push({
        'id': param.id,
        'name': param.name,
        'state': true,
        'graphType': this.graphOptions[Math.floor(Math.random() * this.graphOptions.length)],
        'data': []
      })
    }
  }

  updateDashboard(data: any) {
    if (!!!data) return;
    data = {
      "J01": Math.random() * 100,
      "J02": Math.random() * 100,
      "J03": Math.random() * 100,
      "J04": Math.random() * 100,
      "J05": Math.random() * 100,
      "J06": Math.random() * 100,
      "J07": Math.random() * 100,
      "J08": Math.random() * 100,
      "J09": Math.random() * 100,
      "J10": Math.random() * 100,
      "J11": Math.random() * 100
    }
    //data = this.dataFromater(data.message)
    Object.keys(data).forEach((key: any) => {
      this.sideNavBarOptions.forEach((item: any) => {
        if (item.id === key) {
          item.data.push(data[key]);
          if (item.graphType === 'line') {
            item.lineChart.data.labels = [...Array(item.data.length).keys()];
            item.lineChart.data.datasets[0].data = item.data;
            item.lineChart.update();
          }
          if (item.graphType === 'bar') {
            item.barChart.data.labels = [...Array(item.data.length).keys()];
            item.barChart.data.datasets[0].data = item.data;
            item.barChart.update();
          }
        }
      });
    })
  }

  graphTypeSetter(graphType: string, index: number) {
    let sideNavItem = this.sideNavBarOptions[index];
    sideNavItem.graphType = graphType;
    if (graphType === 'bar') {
      setTimeout(() => {
        sideNavItem.barChart = new Chart(sideNavItem.id + 'bar', {
          type: 'bar',
          data: { labels: [...Array(sideNavItem.data.length).keys()], datasets: [{ data: sideNavItem.data, borderWidth: 1, },], },
          options: { scales: { y: { beginAtZero: true, }, }, plugins: { legend: { display: false }, } },
        });
      }, 1)
    }
    if (graphType === 'line') {
      setTimeout(() => {
        sideNavItem.lineChart = new Chart(sideNavItem.id + 'line', {
          type: 'line',
          data: { labels: [...Array(sideNavItem.data.length).keys()], datasets: [{ data: sideNavItem.data, borderWidth: 1, },], },
          options: { scales: { y: { beginAtZero: true, }, }, plugins: { legend: { display: false }, } },
        });
      }, 1)
    }
  }

  dataFromater(data: any) {
    return JSON.parse(data.replace(/'/g, '"'))
  }

  // ngOnDestroy() {
  //   // Unsubscribe to avoid memory leaks
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
