import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { JwtHelpService } from 'src/services/jwt-help.service';
import { SignalRService } from 'src/services/signalr-services.service';
import { NotificationModel } from 'src/shared/model/notification.interface';
import { GetNotificationsAction, RemoveNotificationAction, SeenNotificationAction } from 'src/stores/notification/notification.action';
import { notificationSelector } from '../../../stores/notification/notification.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications: Array<NotificationModel> = [];
  totalNewNotify!: number;
  userName!: string;

  constructor(
    private toastr: ToastrService,
    private router : Router,
    private signalRservice : SignalRService,
    private store: Store,
    private jwtHelpService : JwtHelpService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetNotificationsAction())
    this.store.pipe(select(notificationSelector)).subscribe(
      (result) => {
        this.notifications = result.items
        this.totalNewNotify = result.items.filter(c => !c.seen).length;
      }
    )

    this.userName = (this.jwtHelpService.getUserInfo()).userName;
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

  removeNotify(id: any){
    this.store.dispatch(new RemoveNotificationAction(id));
    setTimeout(() => this.load(), 200);
  }

  toggleSidebar(): void{
    var sidebarEle = document.getElementsByClassName("sidebar")[0];
    if(document.body.classList.contains("sidebar-toggled")
      && sidebarEle.classList.contains("toggled") ){
      this.renderer.removeClass(document.body, 'sidebar-toggled');
      sidebarEle.classList.remove("toggled");
    }
    else{
      this.renderer.addClass(document.body, 'sidebar-toggled');
      sidebarEle.classList.add("toggled");
    }
  }
}
