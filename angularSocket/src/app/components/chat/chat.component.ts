import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  title = 'Websocket Angular client ';
  userName !: string;
  message !: string;
  output: any[] = [];
  feedback !: string;

  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketService.listen('typing').subscribe((data: any) => this.updateFeedback(data));
    this.socketService.listen('chat').subscribe((data: any) => this.updateMessage(data));
  
  }
  

  sendMessage(): void {
    this.socketService.emit('chat', {
      message: this.message,
      handle: this.userName,
    });
    this.message = "";
  }

  updateMessage(data: any) {
    this.feedback = '';
    if (!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }

}
