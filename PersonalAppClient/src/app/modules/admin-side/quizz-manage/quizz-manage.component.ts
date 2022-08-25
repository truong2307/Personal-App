import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  openFormCreateQuizz: boolean = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  createQuizz(){
    this.openFormCreateQuizz = true;
  }

  backFromCreateForm(event : any){
    this.openFormCreateQuizz = event;
  }

}
