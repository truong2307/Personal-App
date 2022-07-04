import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  languages : string[] = ['Tiếng Việt', 'English'];
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
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
