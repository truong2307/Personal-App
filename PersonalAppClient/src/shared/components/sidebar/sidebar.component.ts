import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
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
  languages : string[] = ['Tiếng Việt', 'English'];
  totalOnlineUser: any;

  constructor(
    private translate: TranslateService,
    private router : Router,
    private toastr: ToastrService,
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

  changeLang(lang: string){
    if(lang === this.languages[1]){
    this.translate.use('en');
    localStorage.setItem("currLanguage","en");
    return;
    }
    this.translate.use('vi');
    localStorage.setItem("currLanguage","vi");
  }

  logOut(){
    localStorage.removeItem('token');
    this.toastr.success(
      'Log out success'
    )
    this.router.navigate(['/login']);
  }

}
