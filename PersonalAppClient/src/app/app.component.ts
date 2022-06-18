import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalAppClient';
  defaultLang : string = 'en';
  constructor(
    private translate: TranslateService
  ){
    if(localStorage.getItem('currLanguage')){
      translate.setDefaultLang(localStorage.getItem('currLanguage') as any);
      translate.use(localStorage.getItem('currLanguage') as any);
    }else {
        translate.setDefaultLang('en');
        translate.use('en');
        localStorage.setItem("currLanguage","en");
    }
  }
}
