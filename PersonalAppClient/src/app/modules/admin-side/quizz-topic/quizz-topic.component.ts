import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import { QuizzTopic } from 'src/shared/model/quizz-topic.interface';
import { GetQuizzTopicsAction } from 'src/stores/quizz-topic/quizz-topic.action';

import { quizzTopicSelector } from "../../../../stores/quizz-topic/quizz-topic.selector";
import { QuizzTopicDetailComponent } from './quizz-topic-detail/quizz-topic-detail.component';

@Component({
  selector: 'app-quizz-topic',
  templateUrl: './quizz-topic.component.html',
  styleUrls: ['./quizz-topic.component.scss']
})
export class QuizzTopicComponent implements OnInit {

  quizzTopic : QuizzTopic[] = [];
  totalItem = 0;
  pageSize = 10;
  pageIndex = 0;
  pageTotalOption = [10, 20, 30];

  constructor(
    private store: Store,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetQuizzTopicsAction(this.pageIndex,this.pageSize));

    this.store.pipe(select(quizzTopicSelector)).subscribe(
      result => {
        this.quizzTopic = result.items;
        this.totalItem = result.totalItem
      }
    );
  }

  changePageEvent(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex

    this.store.dispatch(new GetQuizzTopicsAction(this.pageIndex,this.pageSize));
  }

  addQuizzTopic(){
    this.modalService.open(QuizzTopicDetailComponent, {size: 'md'})
  }

  openDialog(){
    var modalRef = this.modalService.open(ConfirmDialogComponent, {size: 'md'})

    modalRef.result.then((result) => {
      console.log("Close");
    }, (reason) => {
      console.log("Dismiss");
    })
  }

}
