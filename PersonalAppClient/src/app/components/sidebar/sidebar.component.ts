import { Component, OnInit } from '@angular/core';
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

  constructor() { }


  ngOnInit(): void {
  }


  selectOption(option: string): void{
    this.optionIsSelecting = option;
  }

  toggleSideBar(): void{
    this.closeSidebar = !this.closeSidebar;
  }

}
