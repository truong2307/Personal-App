import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from 'src/services/signalr-services.service';
import { NotificationModel } from 'src/shared/model/Notification.interface';
import { GetNotificationsAction, SeenNotificationAction } from 'src/stores/notification/notification.action';
import { notificationSelector } from '../../../stores/notification/notification.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications: Array<NotificationModel> = [];
  totalNewNotify!: number;

  constructor(
    private toastr: ToastrService,
    private router : Router,
    private signalRservice : SignalRService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetNotificationsAction())
    this.store.pipe(select(notificationSelector)).subscribe(
      (result) => {
        console.log(result);
        this.notifications = result.items
        this.totalNewNotify = result.items.filter(c => !c.seen).length;
      }
    )
  }

  load(){
    return this.store.dispatch(new GetNotificationsAction())
  }

  logOut(){
    localStorage.removeItem('token');
    this.toastr.success(
      'Log out success'
    )
    this.router.navigate(['/login']);
    this.signalRservice.disconnectHub();
  }

  seenNotify(data: any){
    this.store.dispatch(new SeenNotificationAction(data));
    setTimeout(() => this.load(), 200);
  }
}
