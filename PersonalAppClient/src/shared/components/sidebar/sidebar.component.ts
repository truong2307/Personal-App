import { Component, OnInit, Renderer2 } from '@angular/core';
import { SignalRService } from 'src/services/signalr-services.service';
import optionSidebar from 'src/shared/constants/option-sidebar';

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
    private renderer: Renderer2
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
