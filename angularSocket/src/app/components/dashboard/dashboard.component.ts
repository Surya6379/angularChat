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
  constructor(private socketService: WebsocketService, private service: BackendService) { }

  ngOnInit(): void {

    this.loggedInUser = this.service.loggedInUser;

    const source = interval(3000);
    this.sidebarInit();
    // this.subscription = source.subscribe(() => {
    //   this.updateDashboard("data");
    // });
    this.socketService.listen('chat').subscribe((data: any) => this.updateDashboard(data));
  }
  ngAfterViewInit() {
    for (let item of this.sideNavBarOptions) {
      item.chart = new Chart(item.id, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false
            },
          }
        },
      });
    }
  }

  sidebarInit() {
    for (let param of sensorParamNames) {
      this.sideNavBarOptions.push({
        'id': param.id,
        'name': param.name,
        'state': true,
        'chart': {}
      })
    }
  }

  updateDashboard(data: any) {
    if (!!!data) return;
    // data = {
    //   "J01": Math.random() * 100,
    //   "J02": Math.random() * 100,
    //   "J03": Math.random() * 100,
    //   "J04": Math.random() * 100,
    //   "J05": Math.random() * 100,
    //   "J06": Math.random() * 100,
    //   "J07": Math.random() * 100,
    //   "J08": Math.random() * 100,
    //   "J09": Math.random() * 100,
    //   "J10": Math.random() * 100,
    //   "J11": Math.random() * 100
    // }
    console.log(data.message)
    data = this.dataFromater(data.message)
    Object.keys(data).forEach((key: any) => {
      this.sideNavBarOptions.forEach((item: any) => {
        if (item.id === key) {
          let lastLabelCount = item.chart.data.labels.length + 1;
          item.chart.data.labels.push(lastLabelCount);
          item.chart.data.datasets[0].data.push(data[key]);
          item.chart.update();
        }
      });
    })
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
