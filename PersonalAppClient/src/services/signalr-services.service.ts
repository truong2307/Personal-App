import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { tokenGetter } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  connection! : HubConnection;
  @Output() totalUserOnline = new EventEmitter();
  token: any;

  constructor(
  ) {
   }


  connectHub(){
    this.token = tokenGetter();

    this.connection = new HubConnectionBuilder()
    .withUrl(environment.signalRUri + 'hubs/userCount', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => this.token,
    }).build();

    this.connection.start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('error white starting connection: '+ err))

    this.countTotalUserOnline();
  }

   countTotalUserOnline(){
    this.connection.on('updateTotalUsers', (data) => {
      this.totalUserOnline.emit(data);
    })
  }

  public disconnectHub(){
    this.connection.stop();
  }

}
