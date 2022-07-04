import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/services/signalr-services.service';
import optionSidebar from 'src/shared/const/optionSidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  optionIsSelecting: string = optionSidebar.HOME;
  optionConst = optionSidebar;
  closeSidebar : boolean = false;
  totalOnlineUser: any;

  constructor(
    private signalRservice : SignalRService,
  ) {
  }


  ngOnInit(): void {
    this.signalRservice.connectHub();
    this.signalRservice.totalUserOnline.subscribe(data => {
      this.totalOnlineUser = data;
    })
  }


  selectOption(option: string): void{
    this.optionIsSelecting = option;
  }

  toggleSideBar(): void{
    this.closeSidebar = !this.closeSidebar;
  }
}
