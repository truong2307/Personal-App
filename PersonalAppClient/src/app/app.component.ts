import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalAppClient';
  constructor(
    private translate: TranslateService
  ){
    if(localStorage.getItem('currLanguage')){
      translate.setDefaultLang(localStorage.getItem('currLanguage') as any);
      translate.use(localStorage.getItem('currLanguage') as any);
    }else {
        var defaultLang = translate.getBrowserLang() as string;
        translate.setDefaultLang(defaultLang);
        translate.use(defaultLang);
        localStorage.setItem("currLanguage", defaultLang);
    }
  }
}
