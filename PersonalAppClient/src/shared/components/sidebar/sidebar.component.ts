import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  languages : string[] = ['Tiếng Việt', 'English'];

  constructor(
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
  }


  selectOption(option: string): void{
    this.optionIsSelecting = option;
  }

  toggleSideBar(): void{
    this.closeSidebar = !this.closeSidebar;
  }

  changeLang(lang: string){
    if(lang === this.languages[1]){
    this.translate.use('en');
    localStorage.setItem("currLanguage","en");
    return;
    }
    this.translate.use('vi');
    localStorage.setItem("currLanguage","vi");
  }

}
