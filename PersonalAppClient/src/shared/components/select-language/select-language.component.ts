import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  curLang : string = "";
  languages : string[] = ['Tiếng Việt', 'English'];
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    if(this.translate.currentLang == "en"){
      this.curLang = "EN";
    }
    else{
      this.curLang = "VI";
    }
  }

  changeLang(lang: string){
    if(lang === this.languages[1]){
    this.translate.use('en');
    localStorage.setItem("currLanguage","en");
    this.curLang = "EN";
    return;
    }
    this.translate.use('vi');
    localStorage.setItem("currLanguage","vi");
    this.curLang = "VI";
  }

}
