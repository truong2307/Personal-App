import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { QuizzManage } from 'src/shared/model/quizz-manage';
import { GetAllQuizzAction } from 'src/stores/quizz-manage/quizz-manaage.action';
import { quizzManageSelector } from 'src/stores/quizz-manage/quizz-manage.selector';

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  pageSize = 12;
  pageIndex = 0;
  pageTotalOption = [12, 24, 36];
  quizzList : QuizzManage[] = [];
  totalQuizz :number = 0;
  openFormCreateQuizz: boolean = false;
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetAllQuizzAction(this.pageIndex, this.pageSize))
    this.store.pipe(select(quizzManageSelector)).subscribe((result) => {
      this.quizzList = result.items;
      this.totalQuizz = result.totalItem;
    });
  }

  createQuizz(){
    this.openFormCreateQuizz = true;
  }

  backFromCreateForm(event : any){
    this.openFormCreateQuizz = event;
  }

  changePageEvent(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex
    this.store.dispatch(new GetAllQuizzAction(this.pageIndex,this.pageSize));
  }

  testLoadImageEvent(event: any){
    console.log(event);

  }

}
