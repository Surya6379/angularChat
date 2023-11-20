import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  @ViewChild('sideDrawer') sideDrawer !: MatSidenav;

  charVar: any = {
    animationEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'line',
        dataPoints: [],
      },
    ],
  };

  sideNavBarOptions: any = [
    { 'name': '🔆Ambient light brightness', 'state': true, 'chart': this.charVar, 'keyName': 'J01' },
    { 'name': ' 🌡️Ambient Temperature', 'state': true, 'chart': this.charVar, 'keyName': 'J02' },
    { 'name': ' 🌡️Glashaus Temperatur', 'state': true, 'chart': this.charVar, 'keyName': 'J03' },
    { 'name': '🔆Glashaus light brightness', 'state': true, 'chart': this.charVar, 'keyName': 'J04' },
    { 'name': '🪴Plant moisture level', 'state': false, 'chart': this.charVar, 'keyName': 'J05' },
    { 'name': '🌱Plant ph level', 'state': false, 'chart': this.charVar, 'keyName': 'J06' },
    { 'name': '🪟Glashaus Windows Open or closed', 'state': false, 'chart': this.charVar, 'keyName': 'J07' },
    { 'name': '🚿Water tank water level', 'state': false, 'chart': this.charVar, 'keyName': 'J08' },
    { 'name': '🔋Batterie charge status', 'state': false, 'chart': this.charVar, 'keyName': 'J09' },
    { 'name': '🚪Garden main door open or closed', 'state': false, 'chart': this.charVar, 'keyName': 'J10' },
    { 'name': '🚿On/Off water spray system', 'state': false, 'chart': this.charVar, 'keyName': 'J11' },
  ];

  lineChartOptions = {
    animationEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'line',
        dataPoints: [
          { label: 1, y: 10 },
          { label: 2, y: 15 },
          { label: 3, y: 25 },
          { label: 4, y: 30 },
          { label: 5, y: 28 },
        ],
      },
    ],
  };

  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    //this.socketService.listen('chat').subscribe((data: any) => this.updateDashboard(data));

    this.updateDashboard("data");
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
      "J11": Math.random() * 100,
      "J12": Math.random() * 100,
    }
    Object.keys(data).forEach((key: any) => {
      console.log(key)
      let sideNavItem = this.sideNavBarOptions.find((item: any) => {
        String(item.keyName) === String(key)
      });
      console.log(sideNavItem)
    })


  }

}
